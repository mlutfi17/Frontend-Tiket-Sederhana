"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import TicketForm from "@/components/admin/TicketForm";
import api from "@/lib/axios";

export default function EditTicketPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    api.get(`/tickets/${id}`).then((res) => {
      setTicket(res.data);
    });
  }, [id]);

  const updateTicket = async (payload: any) => {
    await api.put(`/tickets/${id}`, payload);
    router.push("/admin/tickets");
  };

  if (!ticket) return null;

  return (
    <TicketForm
      submitLabel="Update"
      initialData={{
        destination: ticket.destination,
        date: ticket.date.slice(0, 10),
        price: ticket.price,
        stock: ticket.stock,
        ticket_class_id: ticket.ticket_class_id,
      }}
      onSubmit={updateTicket}
    />
  );
}
