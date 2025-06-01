import QRCodeGenerator from "@/components/QRCodeGenerator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <QRCodeGenerator />
      </div>
    </main>
  )
}
