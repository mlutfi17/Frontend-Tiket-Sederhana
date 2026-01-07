"use client";

import { useRouter } from "next/navigation";
import TicketForm from "@/components/admin/TicketForm";
import api from "@/lib/axios";

export default function CreateTicketPage() {
  const router = useRouter();

  const createTicket = async (payload: any) => {
    await api.post("/tickets", payload);
    router.push("/admin/tickets");
  };

  return (
    <TicketForm
      submitLabel="Tambah"
      onSubmit={createTicket}
    />
  );
}
