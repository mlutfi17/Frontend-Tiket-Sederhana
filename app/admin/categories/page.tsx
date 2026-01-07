"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

/* ================= TYPES ================= */

type Category = {
  id: number;
  name: string;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");

  /* ================= FETCH ================= */

  const fetchCategories = async () => {
    setLoading(true);
    const res = await api.get("/ticket-classes");
    setCategories(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= ACTIONS ================= */

  const openAdd = () => {
    setEditing(null);
    setName("");
    setShowForm(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setName(category.name);
    setShowForm(true);
  };

  const submitForm = async () => {
    if (!name.trim()) {
      alert("Nama kategori wajib diisi");
      return;
    }

    if (editing) {
      await api.put(`/ticket-classes/${editing.id}`, { name });
    } else {
      await api.post("/ticket-classes", { name });
    }

    setShowForm(false);
    fetchCategories();
  };

  const deleteCategory = async (id: number) => {
    const ok = confirm(
      "Yakin ingin menghapus kategori ini?\n(Kategori pada tiket akan menjadi kosong)"
    );
    if (!ok) return;

    await api.delete(`/ticket-classes/${id}`);
    fetchCategories();
  };

  /* ================= RENDER ================= */

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Kelola Kategori Tiket
        </h1>

        <button
          onClick={openAdd}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Tambah Kategori
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Nama Kategori</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            )}

            {!loading && categories.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Belum ada kategori
                </td>
              </tr>
            )}

            {categories.map((c) => (
              <tr key={c.id} className="border-t text-gray-700">
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3 text-center space-x-3">
                  <button
                    onClick={() => openEdit(c)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(c.id)}
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
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editing ? "Edit Kategori" : "Tambah Kategori"}
            </h2>

            <input
              placeholder="Nama kategori (contoh: Ekonomi)"
              className="w-full rounded-lg border px-3 py-2 text-sm mb-4 text-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex justify-end gap-3">
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
