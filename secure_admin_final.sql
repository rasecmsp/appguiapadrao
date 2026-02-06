-- 1. Reativar a segurança (RLS)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 2. Limpar políticas antigas/confusas
DROP POLICY IF EXISTS "Public Read Admin Users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins Write Admin Users" ON public.admin_users;
DROP POLICY IF EXISTS "Users can read own admin status" ON public.admin_users;

-- 3. CRIAR POLÍTICA DE LEITURA PÚBLICA (Segura para funcionamento do App)
-- Permite que o app consulte a tabela para saber se o usuário logado é admin.
CREATE POLICY "Public Read Admin Users" ON public.admin_users
FOR SELECT
USING (true);

-- IMPORTANTE:
-- Não estamos criando políticas 'FOR INSERT', 'FOR UPDATE' ou 'FOR DELETE'.
-- Isso bloqueia qualquer tentativa de alteração via API do site.
-- A única forma de adicionar novos admins será via este SQL Editor (perfil de superusuário).
