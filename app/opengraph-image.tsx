import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} | ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          color: "#fafafa",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 48,
            border: "2px solid #27272a",
            background: "#18181b",
            color: "#818cf8",
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          {profile.initials}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 44,
              color: "#818cf8",
              fontWeight: 600,
            }}
          >
            {profile.title}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#a1a1aa" }}>
            Java · Spring Boot · Microservices · React · Next.js
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#a1a1aa",
          }}
        >
          <span>{profile.location}</span>
          <span>900+ problems solved</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
