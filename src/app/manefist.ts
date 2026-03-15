import APP_CONFIG from "@/config/config";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_CONFIG.title,
    short_name: "MSWE",
    description: APP_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/images/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
