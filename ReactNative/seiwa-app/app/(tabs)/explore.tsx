import React, { useEffect, useMemo, useState } from "react";
import { Text, View, FlatList, Pressable, TextInput, Modal, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, ACCENT, TEXT } from "@/constants/explore.styles";

const API_BASE_URL = "http://192.168.100.21:5143";//Use o IP do seu PC na rede

type Tx = {
  id: string;
  date: string; 
  hospital: string;
  amount: number;
  description: string;
};

type TabKey = "productions" | "repayments";
type SortField = "date" | "amount";
type SortDir = "asc" | "desc";

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });

const formatDateBR = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return new Intl.DateTimeFormat("pt-BR").format(dt);
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function TxItem({ item }: { item: Tx }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemId}>{item.id}</Text>
        <Text style={styles.itemAmount}>{formatBRL(item.amount)}</Text>
      </View>

      <Text style={styles.itemDesc}>{item.description}</Text>

      <Row label="Hospital" value={item.hospital} />
      <Row label="Data" value={formatDateBR(item.date)} />
    </View>
  );
}

export default function ExploreScreen() {
  const [tab, setTab] = useState<TabKey>("productions");
  const [productions, setProductions] = useState<Tx[]>([]);
  const [repayments, setRepayments] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [sortOpen, setSortOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);

        const [prodRes, repRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/financial/productions`),
          fetch(`${API_BASE_URL}/api/financial/repayments`),
        ]);

        const [prodJson, repJson] = await Promise.all([prodRes.json(), repRes.json()]);

        if (!mounted) return;

        setProductions(Array.isArray(prodJson) ? prodJson : []);
        setRepayments(Array.isArray(repJson) ? repJson : []);
      } catch (e) {
        console.log("Erro ao buscar productions/repayments:", e);
        if (!mounted) return;
        setProductions([]);
        setRepayments([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const baseList = useMemo(() => {
    return tab === "productions" ? productions : repayments;
  }, [tab, productions, repayments]);

  const filteredAndSorted = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = q
      ? baseList.filter((x) => {
          const hay = `${x.hospital} ${x.description} ${x.id}`.toLowerCase();
          return hay.includes(q);
        })
      : baseList;

    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0;

      if (sortField === "date") {
        const da = a.date ?? "";
        const db = b.date ?? "";
        cmp = da < db ? -1 : da > db ? 1 : 0;
      } else {
        const aa = Number(a.amount) || 0;
        const bb = Number(b.amount) || 0;
        cmp = aa < bb ? -1 : aa > bb ? 1 : 0;
      }

      return sortDir === "asc" ? cmp : -cmp;
    });

    return sorted;
  }, [baseList, search, sortField, sortDir]);

  const toggleDir = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  const isDateSelected = sortField === "date";
  const isAmountSelected = sortField === "amount";
  const arrowName = sortDir === "asc" ? "arrow-up" : "arrow-down";

  if (loading) {
    return (
      <View style={styles.safe}>
        <View style={styles.screen}>
          <Text style={styles.title}>Financeiro do Médico</Text>
          <Text style={styles.subtitle}>Carregando…</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safe}>
      <View style={styles.screen}>
        <Text style={styles.title}>Financeiro do Médico</Text>
        <Text style={styles.subtitle}>Produções e repasses (detalhado)</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Pressable
            onPress={() => setTab("productions")}
            style={[styles.tab, tab === "productions" && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === "productions" && styles.tabTextActive]}>
              Produções
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setTab("repayments")}
            style={[styles.tab, tab === "repayments" && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === "repayments" && styles.tabTextActive]}>
              Repasses
            </Text>
          </Pressable>
        </View>

        {/* Pesquisa + filtro */}
        <View style={styles.searchCard}>
          <View style={styles.searchRow}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar por hospital, descrição ou ID…"
              placeholderTextColor="rgba(71, 85, 105, 0.7)"
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
            />

            <Pressable onPress={() => setSortOpen(true)} style={styles.filterIconBtn} hitSlop={10}>
              <Ionicons name="filter" size={20} color={ACCENT} />
            </Pressable>
          </View>
        </View>

        {/* Card Lista */}
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.cardTitle}>{tab === "productions" ? "Produções" : "Repasses"}</Text>
          </View>

          <Text style={styles.cardHint}>
            {filteredAndSorted.length} item(ns) • Total{" "}
            {tab === "productions" ? "produzido" : "repassado"}
          </Text>

          <FlatList
            data={filteredAndSorted}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingTop: 12, paddingBottom: 4 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item }) => <TxItem item={item} />}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyText}>Nada encontrado.</Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Bottom Sheet: Ordenar */}
        <Modal
          visible={sortOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setSortOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setSortOpen(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <View style={styles.sheetWrap}>
            <View style={styles.sheet}>
              <Text style={styles.sheetTitle}>Ordenar</Text>

              {/* Data */}
              <Pressable
                onPress={() => setSortField("date")}
                style={[styles.sheetRow, isDateSelected && styles.sheetRowActive]}
              >
                <View style={styles.sheetRowLeft}>
                  <Ionicons name="calendar-outline" size={18} color={TEXT} />
                  <Text style={styles.sheetRowText}>Data</Text>
                </View>

                <Pressable
                  onPress={() => {
                    if (!isDateSelected) setSortField("date");
                    toggleDir();
                  }}
                  style={[styles.dirBtn, isDateSelected && styles.dirBtnActive]}
                  hitSlop={10}
                >
                  <Ionicons name={arrowName} size={18} color={TEXT} />
                </Pressable>
              </Pressable>

              {/* Valor */}
              <Pressable
                onPress={() => setSortField("amount")}
                style={[styles.sheetRow, isAmountSelected && styles.sheetRowActive]}
              >
                <View style={styles.sheetRowLeft}>
                  <Ionicons name="cash-outline" size={18} color={TEXT} />
                  <Text style={styles.sheetRowText}>Valor</Text>
                </View>

                <Pressable
                  onPress={() => {
                    if (!isAmountSelected) setSortField("amount");
                    toggleDir();
                  }}
                  style={[styles.dirBtn, isAmountSelected && styles.dirBtnActive]}
                  hitSlop={10}
                >
                  <Ionicons name={arrowName} size={18} color={TEXT} />
                </Pressable>
              </Pressable>

              <Pressable onPress={() => setSortOpen(false)} style={styles.closeCircle}>
                <Ionicons name="close" size={26} color={TEXT} />
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
