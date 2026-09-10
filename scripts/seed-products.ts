import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Criando produtos de teste...')

  // Buscar categorias
  const categories = await prisma.category.findMany()
  
  if (categories.length === 0) {
    console.log('❌ Nenhuma categoria encontrada. Execute seed-categories primeiro.')
    return
  }

  console.log(`✅ Encontradas ${categories.length} categorias`)

  // Criar produtos de teste
  const products = [
    {
      name: 'Tênis Street Classic',
      slug: 'tenis-street-classic',
      categoryId: categories[0].id,
      brand: 'GUS & BERT',
      price: 299.90,
      promotionalPrice: 249.90,
      description: 'Tênis premium com design streetwear exclusivo. Conforto e estilo para o dia a dia.',
      stock: 10,
      shoeSizes: '38,39,40,41,42',
      clothingSizes: null,
      colors: 'Preto,Branco',
      active: true,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
      ],
      purchaseLink: 'https://example.com/supplier/tenis-1'
    },
    {
      name: 'Camiseta Urban Basic',
      slug: 'camiseta-urban-basic',
      categoryId: categories[1]?.id || categories[0].id,
      brand: 'GUS & BERT',
      price: 89.90,
      promotionalPrice: null,
      description: 'Camiseta básica com design minimalista. Algodão premium de alta qualidade.',
      stock: 20,
      shoeSizes: null,
      clothingSizes: 'P,M,G,GG',
      colors: 'Preto,Branco,Cinza',
      active: true,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'
      ],
      purchaseLink: 'https://example.com/supplier/camiseta-1'
    },
    {
      name: 'Jaqueta Bomber',
      slug: 'jaqueta-bomber',
      categoryId: categories[2]?.id || categories[0].id,
      brand: 'GUS & BERT',
      price: 399.90,
      promotionalPrice: 349.90,
      description: 'Jaqueta bomber estilo streetwear. Forro térmico e design exclusivo.',
      stock: 5,
      shoeSizes: null,
      clothingSizes: 'P,M,G,GG',
      colors: 'Preto,Azul',
      active: true,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
      ],
      purchaseLink: 'https://example.com/supplier/jaqueta-1'
    },
    {
      name: 'Boné Snapback',
      slug: 'bone-snapback',
      categoryId: categories[3]?.id || categories[0].id,
      brand: 'GUS & BERT',
      price: 59.90,
      promotionalPrice: null,
      description: 'Boné snapback com bordado GUS & BERT. Ajustável e confortável.',
      stock: 15,
      shoeSizes: null,
      clothingSizes: null,
      colors: 'Preto,Branco',
      active: true,
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'
      ],
      purchaseLink: 'https://example.com/supplier/bone-1'
    },
    {
      name: 'Calça Cargo',
      slug: 'calca-cargo',
      categoryId: categories[4]?.id || categories[0].id,
      brand: 'GUS & BERT',
      price: 199.90,
      promotionalPrice: 179.90,
      description: 'Calça cargo com bolsos funcionais. Design streetwear moderno.',
      stock: 8,
      shoeSizes: null,
      clothingSizes: 'P,M,G,GG',
      colors: 'Preto,Cinza',
      active: true,
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'
      ],
      purchaseLink: 'https://example.com/supplier/calca-1'
    }
  ]

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        categoryId: product.categoryId,
        brand: product.brand,
        price: product.price,
        promotionalPrice: product.promotionalPrice,
        description: product.description,
        stock: product.stock,
        shoeSizes: product.shoeSizes,
        clothingSizes: product.clothingSizes,
        colors: product.colors,
        active: product.active,
        featured: product.featured,
        purchaseLink: product.purchaseLink,
        images: {
          create: product.images.map((url, index) => ({
            url,
            order: index
          }))
        }
      }
    })
    console.log(`✅ Produto criado: ${product.name}`)
  }

  console.log(`🎉 ${products.length} produtos criados com sucesso!`)
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar produtos:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
