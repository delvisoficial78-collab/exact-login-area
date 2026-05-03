import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Star, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/_authenticated/members")({
  component: MembersHome,
});

const featured = {
  id: "viver-do-digital",
  title: "Viver do Digital Academy",
  rating: 4.9,
  duration: "+11h 37min de conteúdo",
  students: 686,
  description: "Descubra nossos cursos e treinamentos exclusivos para começar agora.",
};

const courses = [
  { id: "minicurso", title: "MiniCurso Gratuito", subtitle: "Comece por aqui", duration: "1h 20min" },
  { id: "trafego", title: "Tráfego Pago do Zero", subtitle: "Anúncios que vendem", duration: "3h 15min" },
  { id: "copy", title: "Copywriting Persuasivo", subtitle: "Escreva para converter", duration: "2h 40min" },
  { id: "afiliados", title: "Marketing de Afiliados", subtitle: "Sua primeira venda", duration: "4h 10min" },
];

function MembersHome() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20">
      {/* Hero / curso destaque */}
      <section className="relative mt-4 overflow-hidden rounded-3xl border border-border">
        <div
          className="relative aspect-[16/10] w-full sm:aspect-[21/9]"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, oklch(0.42 0.18 150) 0%, oklch(0.16 0.014 160) 70%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">{featured.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/90">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {featured.rating}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {featured.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {featured.students} alunos
              </span>
            </div>
            <p className="mt-3 max-w-xl text-base text-muted-foreground">{featured.description}</p>
            <Link
              to="/members/curso/$id"
              params={{ id: featured.id }}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition hover:bg-foreground/90"
            >
              <Play className="h-4 w-4 fill-background" />
              Assistir Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Grade de cursos */}
      <section className="mt-10">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Assista Agora ao MiniCurso Gratuito
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {courses.map((c) => (
            <Link
              key={c.id}
              to="/members/curso/$id"
              params={{ id: c.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
            >
              <div
                className="relative aspect-[3/4] w-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 80%, oklch(0.42 0.18 150 / 0.6) 0%, oklch(0.18 0.014 160) 65%)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/90 text-background transition group-hover:scale-110">
                    <Play className="h-5 w-5 fill-background" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground">{c.subtitle}</p>
                <h3 className="mt-0.5 line-clamp-2 text-sm font-bold">{c.title}</h3>
                <p className="mt-1 text-[11px] text-muted-foreground">{c.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
