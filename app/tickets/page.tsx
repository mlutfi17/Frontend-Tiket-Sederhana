"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

/* ================= TYPES ================= */

type Ticket = {
  id: number;
  destination: string;
  date: string;
  price: number;
  stock: number;
  category?: string | null;
};

export default function UserTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    setLoading(true);
    const res = await api.get("/tickets");
    setTickets(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Daftar Tiket
        </h1>
        <p className="text-sm text-gray-600">
          Pilih tiket perjalanan yang tersedia
        </p>
      </div>

      {/* Ticket List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && (
          <div className="col-span-full text-center text-gray-500">
            Loading...
          </div>
        )}

        {!loading && tickets.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Tidak ada tiket tersedia
          </div>
        )}

        {tickets.map((t) => (
          <div
            key={t.id}
            className="rounded-xl bg-white shadow p-4 flex flex-col"
          >
            <div className="flex items-start justify-between mb-2">
              <h2 className="font-semibold text-gray-900">
                {t.destination}
              </h2>
              <CategoryBadge name={t.category} />
            </div>

            <p className="text-sm text-gray-600 mb-2">
              Tanggal: {t.date.slice(0, 10)}
            </p>

            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-900">
                Rp {t.price.toLocaleString("id-ID")}
              </span>
              <span className="text-sm text-gray-600">
                Stok: {t.stock}
              </span>
            </div>

            <Link
              href={`/tickets/${t.id}`}
              className="mt-auto text-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Pesan Tiket
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= BADGE KATEGORI ================= */

function CategoryBadge({ name }: { name?: string | null }) {
  if (!name) {
    return (
      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
        -
      </span>
    );
  }

  const colors: Record<string, string> = {
    Ekonomi: "bg-green-100 text-green-700",
    Bisnis: "bg-blue-100 text-blue-700",
    VIP: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[name] || "bg-gray-100 text-gray-700"
      }`}
    >
      {name}
    </span>
  );
}
