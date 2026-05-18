import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Star, Clock, Users } from "lucide-react";
import { lessons } from "@/lib/lessons";
import vodLogo from "@/assets/vod-logo.png";

export const Route = createFileRoute("/_authenticated/members")({
  component: MembersHome,
});

const featured = {
  id: lessons[0].id,
  title: "Vendas Online Descomplicadas",
  rating: 4.9,
  duration: "+3 aulas exclusivas",
  students: 686,
  description: "Comece agora pela Aula 1 e destrave a habilidade que paga mais que faculdade.",
};

function MembersHome() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20">
      {/* Header com logo */}
      <header className="mt-4 flex items-center justify-between">
        <img src={vodLogo} alt="VOD - Vendas Online Descomplicadas" className="h-12 w-auto sm:h-14" />
      </header>

      {/* Hero */}
      <section className="relative mt-6 overflow-hidden rounded-3xl border border-border">
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
              to="/curso/$id"
              params={{ id: featured.id }}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition hover:bg-foreground/90"
            >
              <Play className="h-4 w-4 fill-background" />
              Assistir Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Aulas */}
      <section className="mt-10">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Suas Aulas</h2>
        <p className="mt-1 text-sm text-muted-foreground">Assista na ordem para melhores resultados.</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((l) => (
            <Link
              key={l.id}
              to="/curso/$id"
              params={{ id: l.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={`https://i.ytimg.com/vi/${l.youtubeId}/hqdefault.jpg`}
                  alt={l.title}
                  className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition group-hover:scale-110">
                    <Play className="h-6 w-6 fill-primary-foreground" />
                  </div>
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-primary-foreground">
                  {l.duration}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-primary">{l.subtitle}</p>
                <h3 className="mt-1 line-clamp-2 text-base font-bold">{l.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
