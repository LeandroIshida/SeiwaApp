import { StyleSheet } from "react-native";

export const BG = "#EAF3FA";
export const CARD = "#F7FBFF";
export const TEXT = "#0F172A";
export const MUTED = "#475569";
export const BORDER = "rgba(15, 23, 42, 0.10)";
export const ACCENT = "rgba(120, 185, 230, 1)";
export const ACCENT_BORDER = "rgba(120, 185, 230, 0.65)";

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: BG,
    },
    screen: {
        flex: 1,
        backgroundColor: BG,
        paddingHorizontal: 16,
        paddingTop: 28,
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: TEXT,
    },
    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: MUTED,
    },
    card: {
        marginTop: 14,
        backgroundColor: CARD,
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: ACCENT_BORDER,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: TEXT,
    },
    chart: {
        borderRadius: 14,
    },
    tooltip: {
        position: "absolute",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 10,
        backgroundColor: "rgba(15, 23, 42, 0.92)",
    },
    tooltipText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "800",
    },
});
