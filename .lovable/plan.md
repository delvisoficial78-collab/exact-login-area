## Área de Membros — estilo Cakto Members

Recriar o visual das telas enviadas (tema escuro, verde neon, cabeçalho "Cakto Members", banner com curso destaque, grade de cursos abaixo) com autenticação real via Lovable Cloud.

### Tema visual
- Fundo preto (#0a0a0a), texto branco, acento verde neon (oklch verde brilhante).
- Tipografia sans-serif arredondada, títulos grandes em negrito.
- Botão "Assistir Agora" branco com texto preto e ícone play.
- Cards de curso com cantos arredondados, miniatura escura com brilho verde.

### Rotas

```text
/login         -> Tela de login (email + senha)
/signup        -> Tela de cadastro (nome, email, senha) — estilo do 1º print
                  (título grande, subtítulo verde, inputs grandes,
                   botão verde "RESGATAR PRESENTE", aviso de segurança)
/              -> Redireciona para /members se logado, senão /login
/members       -> Área de membros (protegida) — estilo do 2º print:
                   • Header "Cakto Members" com ícone de usuário
                   • Banner do curso destaque "Viver do Digital Academy"
                     (rating, duração, alunos, descrição, botão Assistir Agora)
                   • Seção "Assista Agora ao MiniCurso Gratuito"
                   • Grade de cards de cursos (placeholder)
/members/curso/$id -> Página de curso (placeholder com player + lista de aulas)
```

Rotas protegidas via layout `_authenticated` com `beforeLoad` redirecionando para `/login`.

### Autenticação (Lovable Cloud)
- Email + senha, cadastro aberto.
- Tabela `profiles` ligada a `auth.users` (id, full_name, avatar_url) com trigger de auto-criação no signup e RLS (usuário lê/edita só o próprio).
- `onAuthStateChange` + `getSession` no contexto de auth.
- Logout no menu do ícone de usuário no header.

### Conteúdo (placeholder)
Cursos mockados em um array (título, capa, duração, rating) renderizados nos cards. Pronto para você trocar depois por dados reais do banco.

### Detalhes técnicos
- TanStack Start + rotas em `src/routes/`.
- `_authenticated.tsx` (layout protegido) + `_authenticated/members.tsx` e `_authenticated/members.curso.$id.tsx`.
- Tokens de cor adicionados em `src/styles.css` (verde neon como `--primary`, fundo escuro como padrão da área).
- Validação dos formulários com `zod`.
- Toasts de erro/sucesso via `sonner`.

### Observação sobre direitos
Vou recriar o **layout e a estrutura visual** parecidos com os prints (cores, hierarquia, componentes), mas usando textos, logos e imagens próprios/genéricos — não vou copiar a marca "Cakto" nem o logo "ComissãoBot". Você pode trocar nome, logo e textos depois.