import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Flyhigh — Worldwide Freight, Refined.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(ellipse at 70% 100%, rgba(210, 105, 30, 0.35) 0%, transparent 60%), #0B1220",
          color: "#EFE7D6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A876",
          }}
        >
          <span
            style={{
              width: 36,
              height: 1,
              background: "#C9A876",
              display: "inline-block",
            }}
          />
          FLYHIGH · MUMBAI · EST. 2017
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "#EFE7D6",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Worldwide</span>
            <span style={{ color: "#D2691E", fontStyle: "italic" }}>freight,</span>
            <span>refined.</span>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#8B95A7",
              marginTop: 32,
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            A premium freight maison from Mumbai. 92 countries. 180 ports. One ledger.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
