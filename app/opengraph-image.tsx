import { ImageResponse } from "next/og";

// Image metadata
export const alt = "VanMath - NZ Campervan Cost Calculator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFF5F7 0%, #FEE2E2 50%, #FECACA 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(249, 115, 22, 0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "-50px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(37, 99, 235, 0.1)",
          }}
        />

        {/* Main content card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "48px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: 800,
                color: "white",
              }}
            >
              VM
            </div>
            <span
              style={{
                fontSize: "42px",
                fontWeight: 800,
                color: "#1E293B",
              }}
            >
              VanMath
            </span>
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#1E293B",
              textAlign: "center",
              margin: "0 0 16px 0",
              lineHeight: 1.1,
            }}
          >
            Diesel vs Petrol
          </h1>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 600,
              color: "#64748B",
              textAlign: "center",
              margin: "0 0 32px 0",
            }}
          >
            Campervan Cost Calculator
          </h2>

          {/* Feature badges */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#FEF3C7",
                padding: "12px 20px",
                borderRadius: "999px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#B45309",
              }}
            >
              RUC Fees Included
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#DBEAFE",
                padding: "12px 20px",
                borderRadius: "999px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#1D4ED8",
              }}
            >
              2026 NZ Fuel Prices
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#D1FAE5",
                padding: "12px 20px",
                borderRadius: "999px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#047857",
              }}
            >
              100% Free
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <p
          style={{
            marginTop: "32px",
            fontSize: "24px",
            color: "#64748B",
            fontWeight: 500,
          }}
        >
          Find the cheapest option for your New Zealand road trip
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
