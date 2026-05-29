export interface Lesson {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  youtubeId: string;
  duration: string;
}

export const lessons: Lesson[] = [
  {
    id: "aula-1",
    number: 1,
    title: "A Habilidade que Paga Mais que Faculdade",
    subtitle: "Aula 1",
    youtubeId: "uZeuqcIVmVs",
    duration: "Aula 01",
  },
  {
    id: "aula-2",
    number: 2,
    title: "A Estratégia que Fatura mais de 200.000 Mensais",
    subtitle: "Aula 2",
    youtubeId: "YTvFc4EzNh4",
    duration: "Aula 02",
  },
];

export const getLesson = (id: string) => lessons.find((l) => l.id === id);
