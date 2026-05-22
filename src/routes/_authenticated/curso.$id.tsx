import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Play, Check } from "lucide-react";
import { lessons, getLesson } from "@/lib/lessons";
import { Comments } from "@/components/Comments";

export const Route = createFileRoute("/_authenticated/curso/$id")({
  component: CoursePage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Aula não encontrada</h1>
      <Link to="/members" className="mt-4 inline-block text-primary hover:underline">
        Voltar para a área de membros
      </Link>
    </main>
  ),
  loader: ({ params }) => {
    const lesson = getLesson(params.id);
    if (!lesson) throw notFound();
    return { lesson };
  },
});

function CoursePage() {
  const { lesson } = Route.useLoaderData();

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20">
      <Link
        to="/members"
        className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black shadow-[var(--shadow-glow)]">
        <iframe
          key={lesson.id}
          src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
          title={lesson.title}
          className="h-full w-full"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">{lesson.subtitle}</p>
        <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">{lesson.title}</h1>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Todas as aulas</h2>
        <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {lessons.map((l) => {
            const active = l.id === lesson.id;
            return (
              <li key={l.id}>
                <Link
                  to="/curso/$id"
                  params={{ id: l.id }}
                  className={`flex items-center justify-between px-4 py-3 transition hover:bg-accent/40 ${
                    active ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/15 text-primary"
                      }`}
                    >
                      {active ? <Check className="h-4 w-4" /> : l.number}
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {l.subtitle}
                      </p>
                      <p className="text-sm font-medium">{l.title}</p>
                    </div>
                  </div>
                  <Play className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <Comments lessonId={lesson.id} />
    </main>
  );
}
