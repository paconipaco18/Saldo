import { ImageResponse } from "next/og";

export const alt = "Saldo — Cobra tus facturas más rápido";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Hex, not oklch(): Satori (the renderer behind ImageResponse) has limited
// CSS color support and does not resolve modern color functions.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: "#0E1015",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#6C7DFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B0E1C",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: "#6C7DFF" }}>
            Saldo
          </div>
        </div>

        {/* Satori requires an explicit `display` on any element with more
            than one child — hence the flex column instead of a <br />. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 44,
            fontSize: 88,
            fontWeight: 600,
            color: "#F5F6F8",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          <div>Cobra tus facturas</div>
          <div>más rápido</div>
        </div>

        <div style={{ marginTop: 32, fontSize: 32, color: "#9EA2AB" }}>
          Control de facturas pendientes para pequeños negocios.
        </div>
      </div>
    ),
    { ...size }
  );
}
