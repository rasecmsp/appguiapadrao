-- Script para corrigir permissões (RLS) de tabelas públicas

-- 1. Events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Events" ON public.events;
DROP POLICY IF EXISTS "Admins All Events" ON public.events;
CREATE POLICY "Public Read Events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Admins All Events" ON public.events FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- 2. Tours Sections (Passeios & Atividades)
ALTER TABLE public.tours_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Tours" ON public.tours_sections;
DROP POLICY IF EXISTS "Admins All Tours" ON public.tours_sections;
CREATE POLICY "Public Read Tours" ON public.tours_sections FOR SELECT USING (true);
CREATE POLICY "Admins All Tours" ON public.tours_sections FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- 3. Site Photos (Galeria de Fotos)
ALTER TABLE public.site_photos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Photos" ON public.site_photos;
DROP POLICY IF EXISTS "Admins All Photos" ON public.site_photos;
CREATE POLICY "Public Read Photos" ON public.site_photos FOR SELECT USING (true);
CREATE POLICY "Admins All Photos" ON public.site_photos FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- 4. Site History (Texto Nossa História)
ALTER TABLE public.site_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read History" ON public.site_history;
DROP POLICY IF EXISTS "Admins All History" ON public.site_history;
CREATE POLICY "Public Read History" ON public.site_history FOR SELECT USING (true);
CREATE POLICY "Admins All History" ON public.site_history FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- 5. Site History Images (Galeria Nossa História)
ALTER TABLE public.site_history_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read History Images" ON public.site_history_images;
DROP POLICY IF EXISTS "Admins All History Images" ON public.site_history_images;
CREATE POLICY "Public Read History Images" ON public.site_history_images FOR SELECT USING (true);
CREATE POLICY "Admins All History Images" ON public.site_history_images FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- 6. Useful Info (Informações Úteis)
ALTER TABLE public.useful_info ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Useful Info" ON public.useful_info;
DROP POLICY IF EXISTS "Admins All Useful Info" ON public.useful_info;
CREATE POLICY "Public Read Useful Info" ON public.useful_info FOR SELECT USING (true);
CREATE POLICY "Admins All Useful Info" ON public.useful_info FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- 7. Phone Directory (Telefones Úteis)
ALTER TABLE public.phone_directory ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Phones" ON public.phone_directory;
DROP POLICY IF EXISTS "Admins All Phones" ON public.phone_directory;
CREATE POLICY "Public Read Phones" ON public.phone_directory FOR SELECT USING (true);
CREATE POLICY "Admins All Phones" ON public.phone_directory FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));
