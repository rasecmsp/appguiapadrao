-- CRIAÇÃO DA TABELA DE CONFIGURAÇÕES DO GUIA (Se não existir)

CREATE TABLE IF NOT EXISTS public.guide_settings (
  id bigint primary key generated always as identity,
  app_name text,
  whatsapp text,
  favicon_url text,
  splash_url text,
  app_icon_url text,
  created_at timestamptz default now()
);

-- Habilitar RLS
ALTER TABLE public.guide_settings ENABLE ROW LEVEL SECURITY;

-- Limpar policies antigas
DROP POLICY IF EXISTS "Public Read Guide Settings" ON public.guide_settings;
DROP POLICY IF EXISTS "Admins All Guide Settings" ON public.guide_settings;

-- 1. Leitura pública (para o app carregar o nome/ícone)
CREATE POLICY "Public Read Guide Settings" ON public.guide_settings FOR SELECT USING (true);

-- 2. Admins podem gerenciar
CREATE POLICY "Admins All Guide Settings" ON public.guide_settings
FOR ALL
USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

-- Inserir registro inicial se vazio
INSERT INTO public.guide_settings (app_name)
SELECT 'O Articulador'
WHERE NOT EXISTS (SELECT 1 FROM public.guide_settings);
