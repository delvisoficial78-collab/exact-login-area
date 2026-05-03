import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Play } from "lucide-react";

export const Route = createFileRoute("/_authenticated/members/curso/$id")({
  component: CoursePage,
});

const lessons = [
  { id: 1, title: "Boas-vindas e visão geral", duration: "04:32" },
  { id: 2, title: "Mentalidade do digital", duration: "12:18" },
  { id: 3, title: "Escolhendo seu nicho", duration: "18:05" },
  { id: 4, title: "Ferramentas essenciais", duration: "09:47" },
  { id: 5, title: "Próximos passos", duration: "06:11" },
];

function CoursePage() {
  const { id } = Route.useParams();

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20">
      <Link
        to="/members"
        className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Voltar
      </Link>

      <div
        className="mt-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-border"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.42 0.18 150 / 0.5) 0%, oklch(0.14 0.012 160) 70%)",
        }}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground/90 text-background">
          <Play className="h-8 w-8 fill-background" />
        </div>
      </div>

      <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">
        Curso: <span className="capitalize text-primary">{id.replace(/-/g, " ")}</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Conteúdo de exemplo. Adicione suas próprias aulas e descrição depois.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Aulas</h2>
        <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {lessons.map((l) => (
            <li
              key={l.id}
              className="flex items-center justify-between px-4 py-3 transition hover:bg-accent/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {l.id}
                </span>
                <span className="text-sm font-medium">{l.title}</span>
              </div>
              <span className="text-xs text-muted-foreground">{l.duration}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
