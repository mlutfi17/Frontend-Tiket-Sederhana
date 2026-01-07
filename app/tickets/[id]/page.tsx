"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function TicketDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH TICKET ================= */

  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then((res) => setTicket(res.data))
      .catch(() => setError("Gagal mengambil data tiket"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= BOOKING ================= */

  const submitBooking = async () => {
    setError("");

    if (!ticket) return;

    if (quantity < 1) {
      setError("Jumlah tiket minimal 1");
      return;
    }

    if (quantity > ticket.stock) {
      setError("Jumlah tiket melebihi stok tersedia");
      return;
    }

    try {
      await api.post("/bookings", {
        ticket_id: ticket.id,
        quantity,
      });

      router.push("/my-bookings");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Gagal melakukan booking"
      );
    }
  };

  /* ================= RENDER ================= */

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (!ticket) {
    return <div className="text-red-600">Tiket tidak ditemukan</div>;
  }

  return (
    <div className="max-w-2xl bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {ticket.destination}
        </h1>
        <CategoryBadge name={ticket.category} />
      </div>

      <div className="space-y-2 text-gray-700 mb-6">
        <p>
          <strong>Tanggal:</strong>{" "}
          {ticket.date.slice(0, 10)}
        </p>
        <p>
          <strong>Harga:</strong>{" "}
          Rp {ticket.price.toLocaleString("id-ID")}
        </p>
        <p>
          <strong>Stok:</strong> {ticket.stock}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form Booking */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jumlah Tiket
          </label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="w-full rounded-lg border px-3 py-2 text-sm text-gray-600"
          />
        </div>

        <div className="flex items-center justify-between text-gray-800">
          <span className="font-medium">Total Harga</span>
          <span className="font-semibold">
            Rp {(ticket.price * quantity).toLocaleString("id-ID")}
          </span>
        </div>

        <button
          onClick={submitBooking}
          disabled={ticket.stock === 0}
          className="
            w-full rounded-lg bg-blue-600 py-2
            text-white font-semibold
            hover:bg-blue-700 disabled:opacity-60
          "
        >
          Pesan Tiket
        </button>
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
