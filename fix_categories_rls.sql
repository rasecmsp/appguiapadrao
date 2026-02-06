-- -- Habilitar RLS nas tabelas (garantia)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- -- CATEGORIES
-- Remove políticas antigas (para evitar conflitos)
DROP POLICY IF EXISTS "Public Read Categories" ON public.categories;
DROP POLICY IF EXISTS "Admins All Categories" ON public.categories;

-- 1. Leitura pública (todos podem ver)
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);

-- 2. Admins podem fazer tudo (INSERT, UPDATE, DELETE)
-- Verifica se o ID do usuário está na tabela admin_users
CREATE POLICY "Admins All Categories" ON public.categories
FOR ALL
USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);


-- -- SUBCATEGORIES
DROP POLICY IF EXISTS "Public Read Subcategories" ON public.subcategories;
DROP POLICY IF EXISTS "Admins All Subcategories" ON public.subcategories;

-- 1. Leitura pública
CREATE POLICY "Public Read Subcategories" ON public.subcategories FOR SELECT USING (true);

-- 2. Admins podem fazer tudo
CREATE POLICY "Admins All Subcategories" ON public.subcategories
FOR ALL
USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);


-- -- LOCATIONS
DROP POLICY IF EXISTS "Public Read Locations" ON public.locations;
DROP POLICY IF EXISTS "Admins All Locations" ON public.locations;

-- 1. Leitura pública
CREATE POLICY "Public Read Locations" ON public.locations FOR SELECT USING (true);

-- 2. Admins podem fazer tudo
CREATE POLICY "Admins All Locations" ON public.locations
FOR ALL
USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);
