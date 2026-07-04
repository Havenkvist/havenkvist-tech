import { ImageResponse } from "next/og";

export const alt = "Havenkvist Tech – Freelance web developer in Haslev, Denmark";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tagline =
    lang === "en"
      ? "Freelance Web Developer in Haslev, Denmark"
      : "Webudvikler i Haslev til håndværkere & små virksomheder";

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
          background: "linear-gradient(135deg, #020617 0%, #0f172a 55%, #1e293b 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 600,
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          Havenkvist
          <span style={{ color: "#60a5fa" }}>Tech</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
