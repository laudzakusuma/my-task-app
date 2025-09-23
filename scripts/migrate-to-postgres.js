const { execSync } = require('child_process')
const fs = require('fs')

async function migrateToPostgreSQL() {
  console.log('🔄 Migrating to PostgreSQL...')
  
  try {
    // Backup current schema
    console.log('📦 Creating schema backup...')
    
    // Update schema for PostgreSQL
    const schemaPath = './prisma/schema.prisma'
    let schema = fs.readFileSync(schemaPath, 'utf8')
    
    schema = schema.replace(
      'provider = "sqlite"',
      'provider = "postgresql"'
    )
    
    fs.writeFileSync(schemaPath, schema)
    
    // Generate new client
    console.log('🔧 Generating Prisma client...')
    execSync('npx prisma generate', { stdio: 'inherit' })
    
    // Run migrations
    console.log('🗄️ Running database migrations...')
    execSync('npx prisma db push', { stdio: 'inherit' })
    
    console.log('✅ Migration completed successfully!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  migrateToPostgreSQL()
}

module.exports = { migrateToPostgreSQL }