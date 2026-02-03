import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { styles, CARD } from "@/constants/index.styles";

const API_BASE_URL = "http://192.168.100.21:5143"; //Use o IP do seu PC na rede

type MonthlyPoint = { month: number; total: number };
type MonthlyTotals = {
  year: number;
  produced: MonthlyPoint[];
  repaid: MonthlyPoint[];
};

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function monthLabel(month: number) {
  return MONTHS[month - 1] ?? String(month);
}

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

export default function HomeScreen() {
  const [monthlyTotals, setMonthlyTotals] = useState<MonthlyTotals | null>(null);

  const [producedTipIndex, setProducedTipIndex] = useState<number | null>(null);
  const [repaidTipIndex, setRepaidTipIndex] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/financial/monthly-totals`);
        const json = (await res.json()) as MonthlyTotals;
        if (mounted) setMonthlyTotals(json);
      } catch (err) {
        console.log("Erro ao buscar monthly-totals:", err);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const screenWidth = Dimensions.get("window").width;

  const viewportWidth = screenWidth - 32;
  const pointsPerScreen = 6;
  const pointWidth = viewportWidth / pointsPerScreen;

  const getChartWidth = (count: number) => Math.max(viewportWidth, Math.ceil(count * pointWidth));

  const producedSeries = useMemo(() => {
    const points = monthlyTotals?.produced ?? [];
    return {
      labels: points.map((p) => monthLabel(p.month)),
      values: points.map((p) => p.total),
    };
  }, [monthlyTotals]);

  const repaidSeries = useMemo(() => {
    const points = monthlyTotals?.repaid ?? [];
    return {
      labels: points.map((p) => monthLabel(p.month)),
      values: points.map((p) => p.total),
    };
  }, [monthlyTotals]);

  const chartConfig = useMemo(() => {
    const lineColor = (opacity = 1) => `rgba(120, 185, 230, ${opacity})`;
    return {
      backgroundGradientFrom: CARD,
      backgroundGradientTo: CARD,
      decimalPlaces: 0,
      color: lineColor,
      labelColor: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
      fillShadowGradientFrom: "rgba(120, 185, 230, 0.28)",
      fillShadowGradientTo: "rgba(120, 185, 230, 0.06)",
      fillShadowGradientFromOpacity: 1,
      fillShadowGradientToOpacity: 1,
      propsForBackgroundLines: { strokeWidth: 0 },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: CARD,
      },
    };
  }, []);

  if (!monthlyTotals) {
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
        <Text style={styles.subtitle}>Totais mensais para comparação</Text>

        {/* CARD: PRODUZIDO */}
        <View style={styles.card} onTouchStart={() => setProducedTipIndex(null)}>
          <Text style={styles.cardTitle}>Total produzido</Text>

          <View style={{ marginTop: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <LineChart
                data={{
                  labels: producedSeries.labels,
                  datasets: [{ data: producedSeries.values }],
                }}
                width={getChartWidth(producedSeries.values.length)}
                height={220}
                withInnerLines={false}
                withOuterLines={false}
                withDots
                withShadow
                fromZero={false}
                yAxisLabel="R$ "
                chartConfig={chartConfig}
                bezier
                onDataPointClick={({ index }) => setProducedTipIndex(index)}
                renderDotContent={({ x, y, index }) => {
                  if (producedTipIndex !== index) return null;

                  const value = producedSeries.values[index];
                  const label = producedSeries.labels[index];

                  return (
                    <View
                      key={`tip-produced-${index}`}
                      style={[
                        styles.tooltip,
                        {
                          left: Math.max(10, x - 70),
                          top: Math.max(5, y - 55),
                        },
                      ]}
                    >
                      <Text style={styles.tooltipText}>
                        {label}: {formatBRL(value)}
                      </Text>
                    </View>
                  );
                }}
                style={styles.chart}
              />
            </ScrollView>
          </View>
        </View>

        {/* CARD: REPASSADO */}
        <View style={styles.card} onTouchStart={() => setRepaidTipIndex(null)}>
          <Text style={styles.cardTitle}>Total repassado</Text>

          <View style={{ marginTop: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <LineChart
                data={{
                  labels: repaidSeries.labels,
                  datasets: [{ data: repaidSeries.values }],
                }}
                width={getChartWidth(repaidSeries.values.length)}
                height={220}
                withInnerLines={false}
                withOuterLines={false}
                withDots
                withShadow
                fromZero={false}
                yAxisLabel="R$ "
                chartConfig={chartConfig}
                bezier
                onDataPointClick={({ index }) => setRepaidTipIndex(index)}
                renderDotContent={({ x, y, index }) => {
                  if (repaidTipIndex !== index) return null;

                  const value = repaidSeries.values[index];
                  const label = repaidSeries.labels[index];

                  return (
                    <View
                      key={`tip-repaid-${index}`}
                      style={[
                        styles.tooltip,
                        {
                          left: Math.max(10, x - 70),
                          top: Math.max(5, y - 55),
                        },
                      ]}
                    >
                      <Text style={styles.tooltipText}>
                        {label}: {formatBRL(value)}
                      </Text>
                    </View>
                  );
                }}
                style={styles.chart}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
