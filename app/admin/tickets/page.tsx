"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

/* ================= TYPES ================= */

type Ticket = {
  id: number;
  destination: string;
  date: string;
  price: number;
  stock: number;
  ticket_class_id?: number | null;
  category?: string | null;
};

type Category = {
  id: number;
  name: string;
};

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Ticket | null>(null);

  const [form, setForm] = useState({
    destination: "",
    date: "",
    price: "",
    stock: "",
    ticket_class_id: "",
  });

  /* ================= FETCH ================= */

  const fetchTickets = async () => {
    setLoading(true);
    const res = await api.get("/tickets");
    setTickets(res.data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await api.get("/ticket-classes");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchTickets();
    fetchCategories();
  }, []);

  /* ================= ACTIONS ================= */

  const openAdd = () => {
    setEditing(null);
    setForm({
      destination: "",
      date: "",
      price: "",
      stock: "",
      ticket_class_id: "",
    });
    setShowForm(true);
  };

  const openEdit = (ticket: Ticket) => {
    setEditing(ticket);
    setForm({
      destination: ticket.destination,
      date: ticket.date.slice(0, 10),
      price: String(ticket.price),
      stock: String(ticket.stock),
      ticket_class_id: ticket.ticket_class_id
        ? String(ticket.ticket_class_id)
        : "",
    });
    setShowForm(true);
  };

  const submitForm = async () => {
    if (
      !form.destination ||
      !form.date ||
      !form.price ||
      !form.stock
    ) {
      alert("Semua field wajib diisi");
      return;
    }

    const payload = {
      destination: form.destination,
      date: form.date,
      price: Number(form.price),
      stock: Number(form.stock),
      ticket_class_id: form.ticket_class_id
        ? Number(form.ticket_class_id)
        : null,
    };

    if (editing) {
      await api.put(`/tickets/${editing.id}`, payload);
    } else {
      await api.post("/tickets", payload);
    }

    setShowForm(false);
    fetchTickets();
  };

  const deleteTicket = async (id: number) => {
    const ok = confirm("Yakin ingin menghapus tiket ini?");
    if (!ok) return;

    await api.delete(`/tickets/${id}`);
    fetchTickets();
  };

  /* ================= RENDER ================= */

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Kelola Tiket
        </h1>

        <button
          onClick={openAdd}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Tambah Tiket
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Tujuan</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Stok</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && tickets.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  Belum ada tiket
                </td>
              </tr>
            )}

            {tickets.map((t) => (
              <tr key={t.id} className="border-t text-gray-700">
                <td className="px-4 py-3 text-center">
                  {t.destination}
                </td>

                <td className="px-4 py-3 text-center">
                  <CategoryBadge name={t.category} />
                </td>

                <td className="px-4 py-3 text-center">
                  {t.date.slice(0, 10)}
                </td>

                <td className="px-4 py-3 text-center font-medium text-gray-900">
                  Rp {t.price.toLocaleString("id-ID")}
                </td>

                <td className="px-4 py-3 text-center">
                  {t.stock}
                </td>

                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => openEdit(t)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTicket(t.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL FORM ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editing ? "Edit Tiket" : "Tambah Tiket"}
            </h2>

            <div className="space-y-3 text-gray-700">
              <input
                placeholder="Asal - Tujuan"
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={form.destination}
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />

              {/* DROPDOWN KATEGORI */}
              <select
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={form.ticket_class_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ticket_class_id: e.target.value,
                  })
                }
              >
                <option value="">Tanpa Kategori</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Harga"
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Stok"
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg bg-gray-400 px-4 py-2 text-sm text-white"
              >
                Batal
              </button>
              <button
                onClick={submitForm}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= BADGE ================= */

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
