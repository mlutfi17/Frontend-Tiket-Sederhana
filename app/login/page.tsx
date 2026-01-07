"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/services/authService";

type JwtPayload = {
  id: number;
  email: string;
  role: "admin" | "user";
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);

      // langsung redirect
      router.push("/dashboard");
    } catch {
      setError("Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Silakan masuk untuk melanjutkan
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="contoh@email.com"
            className="
              w-full rounded-xl border border-gray-300
              px-4 py-2.5 text-sm text-gray-900
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
            "
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="
                w-full rounded-xl border border-gray-300
                px-4 py-2.5 pr-12 text-sm text-gray-900
                placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500
              "
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
            />

            {/* Toggle Password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-500 text-sm
                hover:text-gray-700
              "
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full rounded-xl
            bg-blue-600 text-white
            py-2.5 text-sm font-semibold
            hover:bg-blue-700
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Memproses..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
