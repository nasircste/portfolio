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
          background:
            "radial-gradient(900px 500px at 85% 0%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(700px 400px at 0% 100%, rgba(37,99,235,0.30), transparent 60%), #05060f",
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
            border: "2px solid #1d2040",
            background: "#0b0d1e",
            color: "#9b6bff",
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
              color: "#9b6bff",
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
