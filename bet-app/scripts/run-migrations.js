const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env' });

async function runMigrations() {
  console.log('🚀 Running migrations...');
  
  try {
    // Connect to MySQL using env variables
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || undefined,
      database: process.env.DB_DATABASE,
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL');

    // Read the migration file
    const migrationPath = path.join(__dirname, '../drizzle/0000_crazy_legion.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Split by statement breakpoint and execute each statement
    const statements = migrationSQL.split('--> statement-breakpoint');
    
    for (let statement of statements) {
      statement = statement.trim();
      if (statement && !statement.startsWith('--')) {
        console.log('Executing:', statement.substring(0, 50) + '...');
        await connection.execute(statement);
      }
    }

    console.log('✅ All migrations executed successfully');
    await connection.end();
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Please check your MySQL credentials in .env:');
      console.log(`   Host: ${process.env.DB_HOST}`);
      console.log(`   User: ${process.env.DB_USERNAME}`);
      console.log(`   Password: ${process.env.DB_PASSWORD || '(empty)'}`);
      console.log(`   Database: ${process.env.DB_DATABASE}`);
    }
  }
}

runMigrations();