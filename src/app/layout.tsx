import type { Metadata } from 'next';
import './globals.css';

// Sistem fontlarını kullan - build sırasında Google Fonts bağlantı sorunu olmaması için
// Inter'e benzer görünüm için sistem font stack kullanıyoruz

export const metadata: Metadata = {
  title: 'CV Analiz ve Ön Eleme Paneli',
  description: 'İnsan Kaynakları için AI destekli CV analiz ve ön eleme sistemi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

