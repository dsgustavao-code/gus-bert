import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    {
      name: 'Tênis',
      slug: 'tenis',
      description: 'Tênis e calçados esportivos',
      active: true
    },
    {
      name: 'Camisetas',
      slug: 'camisetas',
      description: 'Camisetas e blusas',
      active: true
    },
    {
      name: 'Moletons',
      slug: 'moletons',
      description: 'Moletons e jaquetas',
      active: true
    },
    {
      name: 'Calças',
      slug: 'calcas',
      description: 'Calças e jeans',
      active: true
    },
    {
      name: 'Acessórios',
      slug: 'acessorios',
      description: 'Acessórios e complementos',
      active: true
    }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  console.log('Categories seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })