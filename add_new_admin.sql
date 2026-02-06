-- -- ADICIONAR NOVO ADMINISTRADOR
-- O ID fornecido no chat (99ed0b6...) parecia estar incompleto e igual ao anterior (599ed0b6...).
-- Se você deseja adicionar um SEGUNDO usuário, substitua o ID abaixo pelo ID correto do NOVO usuário.
-- Se for o mesmo usuário, este script apenas garantirá que ele esteja lá.

INSERT INTO public.admin_users (user_id)
SELECT 'fcf81c88-8f65-4452-bd2a-ea435c3e6b25' -- <--- COLOQUE O ID CORRETO AQUI SE FOR DIFERENTE
WHERE NOT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = 'fcf81c88-8f65-4452-bd2a-ea435c3e6b25'
);
