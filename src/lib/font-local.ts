import localFont from "next/font/local";

export const irannastaliq = localFont({
  src: "../../public/fonts/irannastaliq.woff2",
  display: "swap",
  variable: "--font-irannastaliq",
  fallback: ["Vazirmatn", "system-ui", "serif"],
});

export const vazirmatn = localFont({
  src: "../../public/fonts/Vazirmatn-Regular.woff2",
  display: "swap",
  variable: "--font-vazirmatn",
  fallback: ["system-ui", "sans-serif"],
});


