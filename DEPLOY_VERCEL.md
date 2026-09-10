# 🚀 Guia de Deploy no Vercel - GUS & BERT

## 📋 Checklist Antes do Deploy

- [ ] Criar conta no Cloudinary (gratuito)
- [ ] Criar conta no GitHub (se não tiver)
- [ ] Criar conta no Vercel (gratuito)

## 🎯 Passo 1: Configurar Cloudinary

1. Acesse: https://cloudinary.com/users/register/free
2. Crie sua conta gratuita
3. No Dashboard, anote:
   - **Cloud Name** (nome da sua cloud)
   - **API Key** 
   - **API Secret**

## 🎯 Passo 2: Preparar GitHub

1. Se ainda não fez, inicialize o Git:
```bash
git init
git add .
git commit -m "Initial commit - GUS & BERT E-commerce"
```

2. Crie um repositório no GitHub
3. Conecte o repositório local:
```bash
git remote add origin https://github.com/SEU-USUARIO/gus-bert.git
git push -u origin main
```

## 🎯 Passo 3: Deploy no Vercel

1. Acesse: https://vercel.com/new
2. Clique em "Import a Git Repository"
3. Selecione o repositório que você criou
4. Configure o projeto:
   - **Framework Preset**: Next.js
   - **Root Directory**: Deixe vazio
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

## 🎯 Passo 4: Configurar Variáveis de Ambiente no Vercel

No painel do Vercel, vá em:
Settings > Environment Variables

Adicione estas variáveis:

### Obrigatórias:
```
NEXTAUTH_SECRET=seu-secret-aqui (gerar com: openssl rand -base64 32)
NEXTAUTH_URL=https://seu-projeto.vercel.app
ADMIN_EMAIL=admin@gus-bert.com
ADMIN_PASSWORD=admin123
```

### Cloudinary (para imagens):
```
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=sua-api-secret
```

### Banco de Dados (escolha uma opção):

#### Opção A: Vercel Postgres (Recomendado)
1. No Vercel, vá em Storage > Postgres
2. Crie um banco Postgres (gratuito)
3. O Vercel vai adicionar `DATABASE_URL` automaticamente

#### Opção B: Neon (Gratuito)
1. Acesse: https://neon.tech
2. Crie projeto gratuito
3. Pegue a connection string
4. Adicione `DATABASE_URL` no Vercel

#### Opção C: Supabase (Gratuito)
1. Acesse: https://supabase.com
2. Crie projeto gratuito
3. Settings > Database > Connection string
4. Adicione `DATABASE_URL` no Vercel

## 🎯 Passo 5: Configurar Migrações do Banco

### Se usando Vercel Postgres:
O Vercel vai rodar `prisma migrate deploy` automaticamente após o primeiro deploy.

### Se usando Neon ou Supabase:
1. No Vercel, Settings > Environment Variables
2. Adicione também: `POSTGRES_URL_NON_POOLING` = sua connection string
3. O Vercel vai rodar as migrações automaticamente

## 🎯 Passo 6: Deploy

1. Clique em "Deploy"
2. Aguarde o build completar
3. O Vercel vai mostrar a URL do seu site

## 🎯 Passo 7: Testar

1. Acesse a URL fornecida pelo Vercel
2. Teste a loja pública
3. Acesse `/admin/login`
4. Faça login com as credenciais
5. Teste criar um produto com upload de imagem

## 🔧 Solução de Problemas

### Erro: Database connection failed
- Verifique se `DATABASE_URL` está configurada corretamente
- Verifique se o banco de dados está ativo

### Erro: Upload de imagem falhou
- Verifique as credenciais do Cloudinary
- Verifique se `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` estão corretos

### Erro: Auth error
- Verifique se `NEXTAUTH_SECRET` está configurado
- Verifique se `NEXTAUTH_URL` está correto (https://)

### Erro: Build failed
- Verifique se `package.json` tem os scripts corretos
- Verifique se todas as dependências estão instaladas

## 📌 Notas Importantes

1. **SQLite local:** Você pode continuar usando SQLite localmente para desenvolvimento
2. **PostgreSQL no Vercel:** O Vercel vai usar PostgreSQL automaticamente em produção
3. **Imagens:** O Cloudinary vai armazenar todas as imagens automaticamente
4. **Segurança:** Altere a senha do admin em produção!

## ✅ Após o Deploy

- Seu site estará disponível na URL do Vercel
- Todas as funcionalidades estarão funcionando
- Upload de imagens funcionará via Cloudinary
- Banco de dados será PostgreSQL (não SQLite)
- Sistema estará pronto para produção
