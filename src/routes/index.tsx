import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(6, "Informe seu telefone").max(30),
});

function LandingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email, phone });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      sessionStorage.setItem(
        "lead",
        JSON.stringify(parsed.data),
      );
    } catch {
      // ignore
    }
    setLoading(false);
    navigate({ to: "/members" });
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center px-6 py-10"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/40">
            <span className="text-2xl font-black text-primary">M</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Finalize sua Inscrição e Acesse o{" "}
            <span className="text-primary">MINICURSO 100% GRATUITO!</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Construa a sua estrutura para faturar mais de 200.000 mensais
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Seu Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-14 w-full rounded-2xl border border-border bg-input px-5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            required
          />
          <input
            type="email"
            placeholder="Seu melhor E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-2xl border border-border bg-input px-5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            required
          />
          <input
            type="tel"
            placeholder="Telefone / WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-14 w-full rounded-2xl border border-border bg-input px-5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="relative h-16 w-full overflow-hidden rounded-2xl text-base font-extrabold uppercase tracking-wide text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            {loading ? "Aguarde..." : "Resgatar Presente"}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-primary" />
          <span>Suas informações estão seguras e não enviamos spam.</span>
        </div>
      </div>
    </main>
  );
}
