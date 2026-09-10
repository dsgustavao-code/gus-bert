import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🗑️ Removendo produtos de teste...')

  const products = await prisma.product.findMany()
  console.log(`Encontrados ${products.length} produtos`)

  for (const product of products) {
    await prisma.product.delete({
      where: { id: product.id }
    })
    console.log(`✅ Produto removido: ${product.name}`)
  }

  console.log('🎉 Todos os produtos de teste foram removidos!')
}

main()
  .catch((e) => {
    console.error('❌ Erro ao remover produtos:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
