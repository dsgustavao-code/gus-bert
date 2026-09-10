import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting migration...')
  
  // Verificar conexão
  await prisma.$connect()
  console.log('Database connected successfully')
  
  // Testar query simples
  await prisma.category.count()
  console.log('Migration successful!')
}

main()
  .catch((e) => {
    console.error('Migration failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
