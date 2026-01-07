"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";

type Payment = {
  id: number;
  booking_id: number;
  amount: number;
  payment_method: string;
  payment_status: "SUCCESS" | "FAILED";
  created_at: string;
  // optional (jika backend join)
  booking_status?: "PAID" | "PENDING" | "CANCELLED";
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | Payment["payment_status"]>("ALL");

  const fetchPayments = async () => {
    setLoading(true);
    const res = await api.get("/payments");
    setPayments(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "ALL") return payments;
    return payments.filter((p) => p.payment_status === filter);
  }, [payments, filter]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Data Payment
        </h1>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="rounded-lg border px-3 py-2 text-sm text-gray-600"
        >
          <option value="ALL">Semua Status</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="FAILED">FAILED</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3">Booking ID</th>
              <th className="px-4 py-3">Metode</th>
              <th className="px-4 py-3">Jumlah</th>
              <th className="px-4 py-3">Status Payment</th>
              <th className="px-4 py-3">Waktu</th>
              <th className="px-4 py-3">Status Booking</th>
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
                  Data payment tidak ditemukan
                </td>
              </tr>
            )}

            {filtered.map((p) => (
              <tr key={p.id} className="border-t text-gray-500">
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3 text-center">{p.booking_id}</td>
                <td className="px-4 py-3 text-center">
                  {p.payment_method}
                </td>
                <td className="px-4 py-3 text-center">
                  Rp {p.amount.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-center">
                  <PaymentBadge status={p.payment_status} />
                </td>
                <td className="px-4 py-3 text-center">
                  {new Date(p.created_at).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-center">
                  {p.booking_status ? (
                    <BookingBadge status={p.booking_status} />
                  ) : (
                    "-"
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

function PaymentBadge({
  status,
}: {
  status: "SUCCESS" | "FAILED";
}) {
  const styles: Record<string, string> = {
    SUCCESS: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
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

function BookingBadge({
  status,
}: {
  status: "PAID" | "PENDING" | "CANCELLED";
}) {
  const styles: Record<string, string> = {
    PAID: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-gray-200 text-gray-700",
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
