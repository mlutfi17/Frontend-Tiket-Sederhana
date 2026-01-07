"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

type Booking = {
  id: number;
  destination: string;
  date: string;
  price: number;
  quantity: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  created_at: string;
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const res = await api.get("/bookings/my");
    setBookings(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const payBooking = async (b: Booking) => {
    await api.post("/payments", {
      booking_id: b.id,
      amount: b.price * b.quantity,
      payment_method: "TRANSFER",
    });
    fetchBookings();
  };

  const cancelBooking = async (id: number) => {
    const ok = confirm("Yakin ingin membatalkan booking ini?");
    if (!ok) return;

    await api.put(`/bookings/${id}/cancel`);
    fetchBookings();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          My Booking
        </h1>
        <p className="text-sm text-gray-600">
          Daftar pemesanan tiket Anda
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Tujuan</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-700">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && bookings.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-600"
                >
                  Belum ada booking
                </td>
              </tr>
            )}

            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-3 text-gray-800">
                  {b.destination}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {b.date.slice(0, 10)}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {b.quantity}
                </td>
                <td className="px-4 py-3 text-center font-medium text-gray-900">
                  Rp {(b.price * b.quantity).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={b.status} />
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  {b.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => payBooking(b)}
                        className="
                          rounded-lg bg-green-600 px-3 py-1.5
                          text-xs font-medium text-white
                          hover:bg-green-700
                        "
                      >
                        Bayar
                      </button>

                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="
                          rounded-lg bg-red-50 px-3 py-1.5
                          text-xs font-medium text-red-600
                          hover:bg-red-100
                        "
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {b.status !== "PENDING" && (
                    <span className="text-xs text-gray-500">
                      -
                    </span>
                  )}
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
        inline-block rounded-full px-3 py-1
        text-xs font-semibold
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}
