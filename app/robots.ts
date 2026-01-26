import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://camperorcar.co.nz"; // Update with actual domain

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", // Example: protect private routes if any
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
