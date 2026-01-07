"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

type Ticket = {
  id: number;
};

type Booking = {
  status: "PAID" | "PENDING" | "CANCELLED";
};

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    api.get("/tickets").then((res) => setTickets(res.data));
    api.get("/bookings").then((res) => setBookings(res.data));
  }, []);

  const totalTickets = tickets.length;
  const totalBookings = bookings.length;
  const paidBookings = bookings.filter((b) => b.status === "PAID").length;
  const pendingBookings = bookings.filter((b) => b.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Ringkasan sistem pemesanan tiket
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Tiket" value={totalTickets} />
        <StatCard title="Total Booking" value={totalBookings} />
        <StatCard title="Booking Dibayar" value={paidBookings} />
        <StatCard title="Menunggu Pembayaran" value={pendingBookings} />
      </div>

      {/* Shortcut */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ActionCard
          title="Kelola Tiket"
          description="Tambah, ubah, dan hapus data tiket"
          href="/admin/tickets"
        />
        <ActionCard
          title="Data Booking"
          description="Lihat seluruh pemesanan tiket"
          href="/admin/bookings"
        />
        <ActionCard
          title="Data Payment"
          description="Lihat transaksi pembayaran"
          href="/admin/payments"
        />
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-white shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="
        block rounded-2xl bg-white shadow p-6
        hover:shadow-md transition
      "
    >
      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        {description}
      </p>
    </a>
  );
}
