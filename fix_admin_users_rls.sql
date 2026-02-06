-- -- CORREÇÃO DE PERMISSÕES NA TABELA DE ADMINISTRADORES
-- Este script garante que o aplicativo consiga ler a tabela 'admin_users'
-- para verificar se o usuário logado é um administrador.

-- 1. Habilitar RLS (para segurança)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 2. Limpar políticas antigas para evitar conflitos
DROP POLICY IF EXISTS "Users can read own admin status" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;

-- 3. Criar política de LEITURA:
-- "Todo usuário logado pode consultar a tabela admin_users para ver se o SEU PRÓPRIO ID está lá."
CREATE POLICY "Users can read own admin status" ON public.admin_users
FOR SELECT
USING (auth.uid() = user_id);

-- 4. Criar política de GERENCIAMENTO (Opcional, para futuros painéis de super-admin):
-- "Usuários que já são admins podem adicionar/remover outros admins."
CREATE POLICY "Admins can manage admin users" ON public.admin_users
FOR ALL
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));
