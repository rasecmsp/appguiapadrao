-- -- REMOVE COMPLETAMENTE O RLS DA TABELA ADMIN_USERS
-- Isso é apenas para debug/desbloqueio imediato.
-- Se funcionar, significa que o problema era 100% permissão.

ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;
