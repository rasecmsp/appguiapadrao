-- -- Habilitar RLS na tabela events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- -- EVENTS
-- Remove políticas antigas (para evitar conflitos)
DROP POLICY IF EXISTS "Public Read Events" ON public.events;
DROP POLICY IF EXISTS "Admins All Events" ON public.events;

-- 1. Leitura pública (todos podem ver)
CREATE POLICY "Public Read Events" ON public.events FOR SELECT USING (true);

-- 2. Admins podem fazer tudo (INSERT, UPDATE, DELETE)
-- Verifica se o ID do usuário está na tabela admin_users
CREATE POLICY "Admins All Events" ON public.events
FOR ALL
USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);
