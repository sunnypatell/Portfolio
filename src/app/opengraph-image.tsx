import { ImageResponse } from "next/og";

export const alt = "Sunny Patel · Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0D0F",
          color: "#EDE8DC",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#7E8893",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "#E0613A",
            }}
          />
          sunny.patel
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -2 }}>
            <span>I build the whole stack,</span>
          </div>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -2 }}>
            <span>from the screen to the&nbsp;</span>
            <span style={{ color: "#E0613A" }}>silicon.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#7E8893",
          }}
        >
          <span>Software Developer · IBM</span>
          <span>sunnypatel.net</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
