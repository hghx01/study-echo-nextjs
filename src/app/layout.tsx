import type { Metadata } from "next";
import "./globals.css"; // 혹시 파일명이 global.css라면 globals.css를 global.css로 맞춰주세요!

export const metadata: Metadata = {
  title: "공부 일기 | 소모 없는 복습 노트",
  description: "오늘 하루 공부한 내용을 의식의 흐름대로 적으면 AI가 정제해 줍니다.",
};

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col items-center justify-start antialiased">
        {/* 전체 페이지의 중심을 잡아주는 컨테이너 
          w-full: 모바일에서는 꽉 차게
          max-w-2xl: 태블릿/PC에서는 적절한 다이어리 크기로 제한
          px-6: 양옆 여백
          py-12: 위아래 여백
        */}
        <div className="w-full max-w-2xl px-6 py-12 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}