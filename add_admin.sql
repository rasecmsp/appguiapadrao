INSERT INTO public.admin_users (user_id)
SELECT '599ed0b6-eec6-4612-8312-636f5853852a'
WHERE NOT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = '599ed0b6-eec6-4612-8312-636f5853852a'
);
