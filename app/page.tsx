import { Metadata } from "next"

export const metadata: Metadata = {
  title: "CJET",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    
  },
}

export default function Web() {
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="mx-4 max-w-2xl text-center">
        <h1 className="text-9xl font-extrabold text-gray-900 dark:text-white">$CJET</h1>
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Coming Soon</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          We&apos;re working on something great. Check back soon or contact us for more information.
        </p>
      </div>
    </main>
    </>
  )
}
