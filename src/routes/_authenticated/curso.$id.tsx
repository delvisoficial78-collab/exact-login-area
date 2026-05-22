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

      {(() => {
        const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
        const next = lessons[currentIndex + 1];
        if (!next) return null;
        return (
          <section className="mt-8 flex justify-end">
            <Link
              to="/curso/$id"
              params={{ id: next.id }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
            >
              Próxima aula
              <Play className="h-4 w-4" />
            </Link>
          </section>
        );
      })()}

      <Comments lessonId={lesson.id} />
    </main>
  );
}
