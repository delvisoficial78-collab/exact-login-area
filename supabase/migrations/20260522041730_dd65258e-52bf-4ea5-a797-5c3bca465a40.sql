CREATE TABLE public.lesson_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id text NOT NULL,
  author_name text NOT NULL CHECK (char_length(author_name) BETWEEN 1 AND 60),
  content text NOT NULL CHECK (char_length(content) BETWEEN 1 AND 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_lesson_comments_lesson_id_created_at
  ON public.lesson_comments (lesson_id, created_at DESC);

ALTER TABLE public.lesson_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read comments"
  ON public.lesson_comments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert comments"
  ON public.lesson_comments FOR INSERT
  WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.lesson_comments;