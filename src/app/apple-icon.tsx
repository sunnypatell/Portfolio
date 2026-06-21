import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0d0f",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 600,
            letterSpacing: -3,
            color: "#ede8dc",
          }}
        >
          SP
        </div>
        <div
          style={{
            marginTop: 8,
            width: 62,
            height: 8,
            borderRadius: 4,
            background: "#d9663d",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
