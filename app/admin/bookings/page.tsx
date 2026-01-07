"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";

type Booking = {
  id: number;
  user_id: number;
  ticket_id: number;
  quantity: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  created_at: string;
  destination?: string;
  date?: string;
  price?: number;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | Booking["status"]>("ALL");

  const fetchBookings = async () => {
    setLoading(true);
    const res = await api.get("/bookings");
    setBookings(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "ALL") return bookings;
    return bookings.filter((b) => b.status === filter);
  }, [bookings, filter]);

  const updateStatus = async (id: number, status: Booking["status"]) => {
    await api.put(`/bookings/${id}`, { status });
    fetchBookings();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Data Booking
        </h1>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="rounded-lg border px-3 py-2 text-sm text-gray-600"
        >
          <option value="ALL">Semua Status</option>
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3">Tujuan</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tanggal Booking</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  Data belum ada...
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  Data booking tidak ditemukan
                </td>
              </tr>
            )}

            {filtered.map((b) => (
              <tr key={b.id} className="border-t text-gray-500">
                <td className="px-4 py-3">{b.id}</td>
                <td className="px-4 py-3 text-center">
                  {b.destination ?? "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  {b.date ? b.date.slice(0, 10) : "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  {b.quantity}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={b.status} />
                </td>
                <td className="px-4 py-3 text-center">
                  {new Date(b.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3 text-center">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      updateStatus(b.id, e.target.value as any)
                    }
                    className="rounded border px-2 py-1 text-xs"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatusBadge({
  status,
}: {
  status: "PENDING" | "PAID" | "CANCELLED";
}) {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        inline-block rounded-full px-3 py-1 text-xs font-medium
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}
