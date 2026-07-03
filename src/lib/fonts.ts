import { Poppins, Roboto, Bebas_Neue } from "next/font/google";

export const fontBody = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const fontMono = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const fontBebas = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas",
  weight: ["400"],
});

export const fontVariables = `${fontBody.variable} ${fontMono.variable} ${fontBebas.variable}`;
