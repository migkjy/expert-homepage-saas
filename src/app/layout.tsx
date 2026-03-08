import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ProSite — 전문직 AI 마케팅 플랫폼',
  description:
    '변호사, 세무사, 변리사를 위한 AI 자동화 홈페이지. 월 2만9천원에 AI 마케터를 고용하세요.',
  openGraph: {
    title: 'ProSite — 전문직 AI 마케팅 플랫폼',
    description:
      '변호사, 세무사, 변리사를 위한 AI 자동화 홈페이지. 전문 콘텐츠 생성부터 SEO, 상담 예약까지.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
