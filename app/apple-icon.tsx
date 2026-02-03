import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          fontWeight: 800,
          background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "32px",
          color: "white",
        }}
      >
        V
      </div>
    ),
    {
      ...size,
    }
  );
}
