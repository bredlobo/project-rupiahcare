import "./globals.css";

export const metadata = {
  title: "RupiahCare — Bank Indonesia",
  description: "Platform pelaporan uang tidak layak edar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
