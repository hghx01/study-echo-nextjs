import "./globals.css"

export default function DashBoardLayout({
  children,
} : {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  )
}