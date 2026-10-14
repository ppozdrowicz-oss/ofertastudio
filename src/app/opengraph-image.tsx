import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Dobry produkt. Jeszcze lepszy obraz.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f2f2ec",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "65px 80px",
        color: "#171816",
      }}
    >
      <div style={{ fontSize: 29, display: "flex", fontWeight: 700 }}>{site.name}</div>
      <div
        style={{
          fontSize: 87,
          lineHeight: 1.02,
          letterSpacing: "-5px",
          display: "flex",
          flexDirection: "column",
          marginTop: 80,
        }}
      >
        <span>Dobry produkt.</span>
        <span>Jeszcze lepszy obraz.</span>
      </div>
      <div style={{ marginTop: "auto", display: "flex", fontSize: 19, letterSpacing: "3px" }}>
        PACKSHOT / DETAL / PREZENTACJA PRODUKTU
      </div>
    </div>,
    size,
  );
}
