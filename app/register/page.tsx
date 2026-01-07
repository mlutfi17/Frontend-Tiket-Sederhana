"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("Semua field wajib diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      router.push("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Registrasi gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Daftar Akun
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Buat akun baru untuk menggunakan Tiketku
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              placeholder="Nama lengkap"
              className="
                mt-1 w-full rounded-xl border border-gray-300
                px-4 py-2.5 text-sm text-gray-900
                placeholder-gray-400
                focus:border-blue-500 focus:ring-blue-500
              "
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="contoh@email.com"
              className="
                mt-1 w-full rounded-xl border border-gray-300
                px-4 py-2.5 text-sm text-gray-900
                placeholder-gray-400
                focus:border-blue-500 focus:ring-blue-500
              "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 6 karakter"
                className="
                  w-full rounded-xl border border-gray-300
                  px-4 py-2.5 pr-12 text-sm text-gray-900
                  placeholder-gray-400
                  focus:border-blue-500 focus:ring-blue-500
                "
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-sm text-gray-500 hover:text-gray-700
                "
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="
              w-full rounded-xl bg-blue-600 py-2.5
              text-sm font-semibold text-white
              hover:bg-blue-700 disabled:opacity-60
            "
          >
            {loading ? "Mendaftarkan..." : "Register"}
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
