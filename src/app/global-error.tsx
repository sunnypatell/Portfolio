"use client";

// global-error replaces the root layout, so styles are inline (no tailwind/css).
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0d0f",
          color: "#ede8dc",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <div style={{ fontFamily: "ui-monospace, monospace", color: "#d9663d", fontSize: 14 }}>
            fatal
          </div>
          <h1 style={{ marginTop: 12, fontSize: "2rem", fontWeight: 600 }}>
            Something went wrong.
          </h1>
          <p style={{ marginTop: 12, color: "#c7c3ba", lineHeight: 1.6 }}>
            The app hit an unexpected error. Reloading should fix it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 24,
              border: "1px solid rgba(217,102,61,0.5)",
              background: "rgba(217,102,61,0.1)",
              color: "#ede8dc",
              borderRadius: 8,
              padding: "12px 20px",
              fontFamily: "ui-monospace, monospace",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
