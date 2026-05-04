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
    title: "A Estratégia que Fatura 50 mil Todos os Dias",
    subtitle: "Aula 2",
    youtubeId: "YTvFc4EzNh4",
    duration: "Aula 02",
  },
  {
    id: "aula-3",
    number: 3,
    title: "O que Separa Quem Fatura de Quem Sonha",
    subtitle: "Aula 3",
    youtubeId: "dIQfXmkBWKw",
    duration: "Aula 03",
  },
];

export const getLesson = (id: string) => lessons.find((l) => l.id === id);
