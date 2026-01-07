"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/users/me").then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
    });
  }, []);

  const saveProfile = async () => {
    try {
      await api.put("/users/me", { name, email });
      setMessage("Profil berhasil diperbarui");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Gagal update profil");
    }
  };

  return (
    <div className="max-w-lg bg-white rounded-xl shadow p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-4">
        Ubah Profil Saya
      </h1>

      {message && (
        <div className="mb-4 text-sm text-blue-600">
          {message}
        </div>
      )}

      <div className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border px-3 py-2 text-gray-600"
          placeholder="Nama"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2 text-gray-600"
          placeholder="Email"
        />

        <button
          onClick={saveProfile}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
