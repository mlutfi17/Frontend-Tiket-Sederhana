"use client";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function LogoutConfirm({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900">
          Konfirmasi Logout
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Apakah Anda yakin ingin keluar?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
