"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

type Category = {
  id: number;
  name: string;
};

type TicketFormProps = {
  initialData?: {
    destination: string;
    date: string;
    price: number;
    stock: number;
    ticket_class_id: number | null;
  };
  onSubmit: (payload: any) => Promise<void>;
  submitLabel: string;
};

export default function TicketForm({
  initialData,
  onSubmit,
  submitLabel,
}: TicketFormProps) {
  const [destination, setDestination] = useState(
    initialData?.destination || ""
  );
  const [date, setDate] = useState(initialData?.date || "");
  const [price, setPrice] = useState(
    initialData?.price || 0
  );
  const [stock, setStock] = useState(
    initialData?.stock || 0
  );
  const [ticketClassId, setTicketClassId] = useState<number | "">(
    initialData?.ticket_class_id ?? ""
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/ticket-classes").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleSubmit = async () => {
    setError("");

    if (!destination || !date || !price || !stock) {
      setError("Semua field wajib diisi");
      return;
    }

    await onSubmit({
      destination,
      date,
      price: Number(price),
      stock: Number(stock),
      ticket_class_id: ticketClassId || null,
    });
  };

  return (
    <div className="max-w-xl bg-white rounded-xl shadow p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-4">
        {submitLabel} Tiket
      </h1>

      {error && (
        <div className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Tujuan
          </label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="Contoh: Jakarta - Bandung"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Tanggal
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Kategori Tiket
          </label>
          <select
            value={ticketClassId}
            onChange={(e) =>
              setTicketClassId(
                e.target.value ? Number(e.target.value) : ""
              )
            }
            className="mt-1 w-full rounded border px-3 py-2"
          >
            <option value="">Tanpa Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Harga
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Stok
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
