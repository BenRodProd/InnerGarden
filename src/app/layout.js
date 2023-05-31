import './globals.css'


export const metadata = {
  title: 'InnerGarden',
  description: 'Habit Tracker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body>{children}</body>
    </html>
  )
}
