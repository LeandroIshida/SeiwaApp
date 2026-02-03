import { StyleSheet } from "react-native";

export const BG = "#EAF3FA";
export const CARD = "#F7FBFF";
export const WHITE = "#FFFFFF";
export const TEXT = "#0F172A";
export const MUTED = "#475569";

export const BORDER = "rgba(15, 23, 42, 0.10)";
export const ACCENT = "rgba(120, 185, 230, 1)";
export const ACCENT_SOFT = "rgba(120, 185, 230, 0.14)";
export const ACCENT_BORDER = "rgba(120, 185, 230, 0.65)";

export const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: BG },
    screen: {
        flex: 1,
        backgroundColor: BG,
        paddingHorizontal: 16,
        paddingTop: 28,
    },

    title: { fontSize: 30, fontWeight: "800", color: TEXT },
    subtitle: { marginTop: 6, fontSize: 14, color: MUTED },

    tabs: { flexDirection: "row", gap: 10, marginTop: 14 },
    tab: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 14,
        backgroundColor: CARD,
        borderWidth: 1,
        borderColor: BORDER,
        alignItems: "center",
    },
    tabActive: {
        borderColor: ACCENT_BORDER,
        backgroundColor: ACCENT_SOFT,
    },
    tabText: { color: MUTED, fontWeight: "800" },
    tabTextActive: { color: TEXT },

    searchCard: {
        marginTop: 14,
        backgroundColor: CARD,
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: ACCENT_BORDER,
    },
    searchRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    input: {
        flex: 1,
        backgroundColor: WHITE,
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: BORDER,
        color: TEXT,
        fontWeight: "700",
    },
    filterIconBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: WHITE,
        borderWidth: 1,
        borderColor: ACCENT_BORDER,
        alignItems: "center",
        justifyContent: "center",
    },

    card: {
        marginTop: 14,
        backgroundColor: CARD,
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: BORDER,
        flex: 1,
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    cardTitle: { fontSize: 22, fontWeight: "800", color: TEXT },

    cardHint: { marginTop: 6, fontSize: 13, color: MUTED },

    item: {
        backgroundColor: WHITE,
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: BORDER,
    },
    itemHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
    itemId: { fontSize: 14, fontWeight: "900", color: TEXT },
    itemAmount: { fontSize: 14, fontWeight: "900", color: ACCENT },
    itemDesc: { marginTop: 6, fontSize: 15, fontWeight: "800", color: TEXT },

    row: { flexDirection: "row", justifyContent: "space-between", marginTop: 6, gap: 12 },
    rowLabel: { color: MUTED, fontSize: 13, fontWeight: "700" },
    rowValue: { color: TEXT, fontSize: 13, fontWeight: "800", flex: 1, textAlign: "right" },

    empty: { paddingVertical: 18, alignItems: "center" },
    emptyText: { color: MUTED, fontWeight: "800" },

    backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.25)" },
    sheetWrap: { position: "absolute", left: 0, right: 0, bottom: 0 },
    sheet: {
        backgroundColor: BG,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 28,
        borderWidth: 1,
        borderColor: BORDER,
    },
    sheetTitle: {
        fontSize: 26,
        fontWeight: "900",
        color: TEXT,
        textAlign: "center",
        marginBottom: 14,
    },
    sheetRow: {
        backgroundColor: CARD,
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: BORDER,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sheetRowActive: {
        borderColor: ACCENT_BORDER,
        backgroundColor: ACCENT_SOFT,
    },
    sheetRowLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    sheetRowText: { fontSize: 16, fontWeight: "900", color: TEXT },

    dirBtn: {
        width: 44,
        height: 44,
        borderRadius: 16,
        backgroundColor: WHITE,
        borderWidth: 1,
        borderColor: BORDER,
        alignItems: "center",
        justifyContent: "center",
    },
    dirBtnActive: { borderColor: ACCENT_BORDER },

    closeCircle: {
        marginTop: 14,
        alignSelf: "center",
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: CARD,
        borderWidth: 1,
        borderColor: BORDER,
        alignItems: "center",
        justifyContent: "center",
    },
});
