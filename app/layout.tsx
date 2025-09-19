import "styles/tailwind.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="/assets/cjet.ico" type="image/x-icon" /></head>
      <body>{children}</body>
    </html>
  )
}
