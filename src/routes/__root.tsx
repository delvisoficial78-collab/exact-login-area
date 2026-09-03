import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Members — Área de Membros" },
      { name: "description", content: "Acesse seus cursos e conteúdos exclusivos." },
      { property: "og:title", content: "Members — Área de Membros" },
      { name: "twitter:title", content: "Members — Área de Membros" },
      { property: "og:description", content: "Acesse seus cursos e conteúdos exclusivos." },
      { name: "twitter:description", content: "Acesse seus cursos e conteúdos exclusivos." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e0918c6a-28b9-4ac6-923d-98aeec0725e8/id-preview-231b1720--2e8fbfcb-623a-4dfa-8507-8b33bd3c7bcd.lovable.app-1777881848525.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e0918c6a-28b9-4ac6-923d-98aeec0725e8/id-preview-231b1720--2e8fbfcb-623a-4dfa-8507-8b33bd3c7bcd.lovable.app-1777881848525.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster theme="dark" position="top-center" />
    </>
  );
}
