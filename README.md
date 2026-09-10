# GUS & BERT - E-commerce de Streetwear e Sneakers

Sistema de e-commerce completo e moderno para loja de roupas e tênis, com painel administrativo integrado.

## 🚀 Tecnologias

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Estilização**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite (Prisma ORM)
- **Autenticação**: NextAuth.js
- **Upload de Imagens**: Sistema local
- **Ícones**: Lucide React

## 📋 Funcionalidades

### Área Pública (Cliente)
- ✅ Homepage moderna e responsiva
- ✅ Catálogo de produtos com filtros e busca
- ✅ Página de produto detalhada
- ✅ Sistema de carrinho de compras
- ✅ Checkout completo
- ✅ Design premium estilo streetwear

### Painel Administrativo
- ✅ Login seguro com autenticação
- ✅ Dashboard com métricas
- ✅ CRUD completo de produtos
- ✅ CRUD completo de categorias
- ✅ Gerenciamento de pedidos
- ✅ Controle de estoque
- ✅ Upload de imagens

## 🔧 Instalação e Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
O arquivo `.env` já está configurado com valores padrão para desenvolvimento:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="dev-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@gus-bert.com"
ADMIN_PASSWORD="admin123"
```

### 3. Configurar banco de dados
```bash
# Criar tabelas
npx prisma migrate dev --name init

# Criar usuário admin
npm run seed

# Criar categorias iniciais
npm run seed:categories
```

### 4. Executar em desenvolvimento
```bash
npm run dev
```

Acesse:
- **Loja**: http://localhost:3000
- **Painel Admin**: http://localhost:3000/admin/login

### Credenciais Padrão
- **Email**: admin@gus-bert.com
- **Senha**: admin123

## 📁 Estrutura do Projeto

```
loja/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── migrations/            # Migrações do banco
├── public/
│   └── uploads/              # Imagens uploadadas
├── scripts/
│   ├── seed.ts               # Script para criar admin
│   └── seed-categories.ts    # Script para criar categorias
├── src/
│   ├── app/
│   │   ├── admin/            # Painel administrativo
│   │   ├── api/              # API routes
│   │   ├── carrinho/         # Página do carrinho
│   │   ├── checkout/         # Página de checkout
│   │   ├── produtos/         # Página de produtos
│   │   └── produto/          # Página de produto detalhado
│   ├── components/
│   │   ├── AdminLayout.tsx   # Layout do admin
│   │   ├── Footer.tsx        # Footer
│   │   └── Header.tsx        # Header
│   ├── lib/
│   │   ├── auth.ts           # Configuração NextAuth
│   │   └── prisma.ts         # Cliente Prisma
│   └── middleware.ts         # Middleware de proteção
└── .env                      # Variáveis de ambiente
```

## 🎯 Como Usar

### 1. Acessar o Painel Administrativo
1. Acesse http://localhost:3000/admin/login
2. Faça login com as credenciais padrão
3. Você será redirecionado para o dashboard

### 2. Criar Categorias
1. No painel admin, vá em "Categorias"
2. Clique em "Adicionar Categoria"
3. Preencha nome, slug, descrição e imagem
4. Salve

### 3. Adicionar Produtos
1. No painel admin, vá em "Produtos"
2. Clique em "Adicionar Produto"
3. Preencha todas as informações:
   - Nome e slug automático
   - Selecione a categoria
   - Defina preço e estoque
   - Adicione tamanhos e cores
   - Faça upload das imagens
4. Salve - o produto aparecerá automaticamente na loja

### 4. Gerenciar Pedidos
1. No painel admin, vá em "Pedidos"
2. Veja todos os pedidos com status
3. Clique no ícone de olho para ver detalhes
4. Altere o status do pedido conforme necessário

### 5. Controlar Estoque
1. No painel admin, vá em "Estoque"
2. Veja produtos com estoque baixo ou esgotado
3. Clique em "Editar Estoque" para ajustar quantidades

## 🔒 Segurança

### Para Produção:
1. **Altere as credenciais padrão** no `.env`
2. **Use um NEXTAUTH_SECRET forte** (gerar com: `openssl rand -base64 32`)
3. **Configure um banco de dados PostgreSQL** em produção
4. **Use variáveis de ambiente** para informações sensíveis
5. **Configure HTTPS** com NEXTAUTH_URL correto

### Migração para PostgreSQL:
1. Altere `DATABASE_URL` no `.env`
2. Altere `provider` no `prisma/schema.prisma` de `sqlite` para `postgresql`
3. Rode `npx prisma migrate dev --name init`

## 🎨 Personalização

### Cores e Estilo
- Edite os estilos Tailwind nos componentes
- O design usa um tema preto/branco com acentos cinza

### Logo e Marca
- Altere "URBANSTYLE" nos componentes Header e Footer
- Substitua pelo nome da sua marca

### Categorias Iniciais
- Edite `scripts/seed-categories.ts` para alterar categorias padrão

## 📦 Deploy no Vercel

### Importante: Vercel não suporta SQLite localmente

Para deploy no Vercel, você PRECISA:

1. **Criar conta no Cloudinary** (gratuito)
   - Crie em: https://cloudinary.com/users/register/free
   - Pegue: Cloud Name, API Key, API Secret

2. **Criar banco PostgreSQL**
   - Opção 1: Vercel Postgres (recomendado - integrado, fácil)
   - Opção 2: Neon (gratuito)
   - Opção 3: Supabase (gratuito)

### Passos para Deploy no Vercel

1. **Mudar para PostgreSQL localmente**
   - Edite `prisma/schema.prisma`: mude `provider = "sqlite"` para `provider = "postgresql"`
   - Mude `DATABASE_URL` no `.env` para connection string do PostgreSQL

2. **Gerar novas migrações**
```bash
npx prisma migrate dev --name switch-to-postgresql
```

3. **Push para GitHub**
```bash
git add .
git commit -m "Switch to PostgreSQL for Vercel"
git push
```

4. **Deploy no Vercel**
   - Acesse: https://vercel.com/new
   - Importe do GitHub
   - Configure as variáveis de ambiente

5. **Variáveis de Ambiente no Vercel**
```
DATABASE_URL=postgresql://user:password@host:5432/database
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_EMAIL=admin@gus-bert.com
ADMIN_PASSWORD=admin123
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

6. **Se usando Vercel Postgres**
   - Crie no painel do Vercel (Storage > Postgres)
   - Vercel vai configurar `DATABASE_URL` automaticamente
   - Rodar `prisma migrate deploy` automaticamente

### Cloudinary para Upload de Imagens

1. Crie conta em https://cloudinary.com/users/register/free
2. Pegue suas credenciais no Dashboard
3. Configure as variáveis de ambiente:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### Para continuar usando SQLite localmente

Se quiser continuar usando SQLite localmente e apenas usar PostgreSQL no Vercel:

1. Mantenha `provider = "sqlite"` no schema local
2. No Vercel, o `DATABASE_URL` será PostgreSQL
3. Vercel vai usar PostgreSQL automaticamente

**Importante:** SQLite não funciona no Vercel, então você PRECISA usar PostgreSQL no Vercel.

## 📄 Licença

Este projeto foi desenvolvido para fins demonstrativos.

---

**Desenvolvido com Next.js, TypeScript, Prisma e Tailwind CSS**