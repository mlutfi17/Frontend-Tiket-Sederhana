import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-700">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">
          Tiketku
        </h1>

        <div className="space-x-3">
          <Link
            href="/login"
            className="rounded-xl border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Pesan Tiket Perjalanan  
            <span className="text-blue-600"> Lebih Mudah</span>
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Tiketku adalah aplikasi pemesanan tiket perjalanan berbasis web
            yang memudahkan pengguna dalam memilih, memesan, dan membayar
            tiket secara online.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>

        {/* Ilustrasi */}
        <div className="hidden md:flex justify-center">
          <div className="h-64 w-64 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="text-6xl">🎫</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Kenapa Memilih Tiketku?
          </h3>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature
              title="Mudah & Cepat"
              desc="Proses pemesanan tiket yang sederhana dan efisien."
              icon="⚡"
            />
            <Feature
              title="Pembayaran Aman"
              desc="Transaksi pembayaran tercatat dan terverifikasi."
              icon="🔒"
            />
            <Feature
              title="Manajemen Booking"
              desc="Pantau status booking dan pembayaran secara real-time."
              icon="📊"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tiketku. All rights reserved.
      </footer>
    </div>
  );
}

function Feature({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm text-center">
      <div className="text-4xl">{icon}</div>
      <h4 className="mt-4 font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
