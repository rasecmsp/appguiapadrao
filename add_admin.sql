INSERT INTO public.admin_users (user_id)
SELECT 'fcf81c88-8f65-4452-bd2a-ea435c3e6b25'
WHERE NOT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = 'fcf81c88-8f65-4452-bd2a-ea435c3e6b25'
);
