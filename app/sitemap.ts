import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vanmath.vercel.app"; // Update this with your actual domain when live

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // If you add more pages (e.g., /about, /guide), add them here
  ];
}
