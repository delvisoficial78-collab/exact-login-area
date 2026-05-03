import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Senha deve ter ao menos 6 caracteres").max(72),
});

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ full_name: fullName, email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/members`,
        data: { full_name: parsed.data.full_name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Cadastro realizado!");
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
            Finalize sua Inscrição e Acesse a{" "}
            <span className="text-primary">ÁREA DE MEMBROS 100% GRATUITA!</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Crie sua conta e libere todos os conteúdos exclusivos.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Seu Nome"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            type="password"
            placeholder="Crie uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 w-full rounded-2xl border border-border bg-input px-5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="relative h-16 w-full overflow-hidden rounded-2xl text-base font-extrabold uppercase tracking-wide text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            {loading ? "Criando conta..." : "Resgatar Presente"}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-primary" />
          <span>Suas informações estão seguras e não enviamos spam.</span>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
}
