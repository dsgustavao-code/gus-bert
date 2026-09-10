import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Migrando dados do SQLite para PostgreSQL...')
  console.log('⚠️  Este script deve ser executado ANTES de mudar para PostgreSQL')
  console.log('⚠️  Certifique de ter backup dos dados do SQLite')
  
  try {
    // Ler dados do SQLite (presumindo que ainda está conectado)
    const categories = await prisma.category.findMany()
    const products = await prisma.product.findMany({
      include: {
        images: true,
        category: true
      }
    })
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
    
    console.log(`✅ Encontrados:`)
    console.log(`   - ${categories.length} categorias`)
    console.log(`   - ${products.length} produtos`)
    console.log(`   - ${orders.length} pedidos`)
    
    // Salvar dados como JSON para migração manual
    const data = {
      categories,
      products,
      orders
    }
    
    const fs = require('fs')
    fs.writeFileSync('migration-data.json', JSON.stringify(data, null, 2))
    console.log('💾 Dados salvados em migration-data.json')
    console.log('📝 Para migrar:')
    console.log('   1. Mude provider para PostgreSQL no schema.prisma')
    console.log('   2. Configure DATABASE_URL com PostgreSQL')
    console.log('   3. Rode: npx prisma migrate dev --name switch-to-postgresql')
    console.log('   4. Use migration-data.json para restaurar os dados')
    
  } catch (error) {
    console.error('❌ Erro na migração:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
