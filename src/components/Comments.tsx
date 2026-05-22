import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

type Comment = {
  id: string;
  lesson_id: string;
  author_name: string;
  content: string;
  created_at: string;
};

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "agora mesmo";
  const m = Math.floor(s / 60);
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h}h`;
  const d = Math.floor(h / 24);
  return `há ${d}d`;
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function Comments({ lessonId }: { lessonId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("vod_comment_name") ?? "" : ""
  );
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from("lesson_comments")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) toast.error("Não foi possível carregar os comentários");
        else setComments((data as Comment[]) ?? []);
        setLoading(false);
      });

    const channel = supabase
      .channel(`comments-${lessonId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "lesson_comments",
          filter: `lesson_id=eq.${lessonId}`,
        },
        (payload) => {
          setComments((prev) => {
            const next = payload.new as Comment;
            if (prev.some((c) => c.id === next.id)) return prev;
            return [next, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [lessonId]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const c = content.trim();
    if (n.length < 1 || n.length > 60) {
      toast.error("Indica o teu nome (1-60 caracteres)");
      return;
    }
    if (c.length < 1 || c.length > 1000) {
      toast.error("O comentário deve ter entre 1 e 1000 caracteres");
      return;
    }
    setSubmitting(true);
    localStorage.setItem("vod_comment_name", n);
    const { error } = await supabase
      .from("lesson_comments")
      .insert({ lesson_id: lessonId, author_name: n, content: c });
    setSubmitting(false);
    if (error) {
      toast.error("Erro ao publicar comentário");
      return;
    }
    setContent("");
    toast.success("Comentário publicado");
  };

  return (
    <section className="mt-10">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">
          Comentários {comments.length > 0 && (
            <span className="text-muted-foreground font-normal">({comments.length})</span>
          )}
        </h2>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
      >
        <input
          type="text"
          placeholder="O teu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <textarea
          placeholder="Escreve um comentário..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          rows={3}
          className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{content.length}/1000</span>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {submitting ? "A enviar..." : "Comentar"}
          </button>
        </div>
      </form>

      <ul className="mt-4 space-y-3">
        {loading && (
          <li className="text-sm text-muted-foreground">A carregar comentários...</li>
        )}
        {!loading && comments.length === 0 && (
          <li className="rounded-2xl border border-dashed border-border bg-card/40 p-6 text-center text-sm text-muted-foreground">
            Ainda não há comentários. Sê o primeiro!
          </li>
        )}
        {comments.map((c) => (
          <li
            key={c.id}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {initials(c.author_name) || "?"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{c.author_name}</p>
                  <span className="text-xs text-muted-foreground">
                    · {timeAgo(c.created_at)}
                  </span>
                </div>
                <p className="mt-1 whitespace-pre-wrap break-words text-sm text-foreground/90">
                  {c.content}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
