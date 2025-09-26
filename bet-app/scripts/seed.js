const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env' });

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Connect to MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    console.log('✅ Connected to MySQL');

    // Create demo user
    const hashedPassword = await bcrypt.hash("password123", 10);
    const [userResult] = await connection.execute(
      'INSERT INTO users (name, email, password_hash, balance) VALUES (?, ?, ?, ?)',
      ["Demo User", "demo@example.com", hashedPassword, "100.00"]
    );

    console.log('✅ Demo user created:', "demo@example.com");

    // Create demo events
    const demoEvents = [
      {
        name: "Arsenal vs Chelsea",
        startTime: "2025-12-31 18:00:00",
        category: "football"
      },
      {
        name: "Real Madrid vs Fenerbahçe", 
        startTime: "2025-12-31 20:00:00",
        category: "basketball"
      },
      {
        name: "Manchester United vs Liverpool",
        startTime: "2026-01-01 16:00:00",
        category: "football"
      }
    ];

    const createdEvents = [];
    for (const event of demoEvents) {
      const [eventResult] = await connection.execute(
        'INSERT INTO events (name, start_time, category) VALUES (?, ?, ?)',
        [event.name, event.startTime, event.category]
      );
      createdEvents.push({ id: eventResult.insertId, ...event });
      console.log('✅ Event created:', event.name);
    }

    // Create odds for events
    const oddsData = [
      // Arsenal vs Chelsea
      { eventId: createdEvents[0].id, description: "Arsenal fiton", oddValue: "1.90" },
      { eventId: createdEvents[0].id, description: "Barazim", oddValue: "3.40" },
      { eventId: createdEvents[0].id, description: "Chelsea fiton", oddValue: "3.80" },
      { eventId: createdEvents[0].id, description: "Over 2.5 gola", oddValue: "1.95" },
      { eventId: createdEvents[0].id, description: "Under 2.5 gola", oddValue: "1.85" },
      
      // Real Madrid vs Fenerbahçe
      { eventId: createdEvents[1].id, description: "Real Madrid fiton", oddValue: "1.60" },
      { eventId: createdEvents[1].id, description: "Fenerbahçe fiton", oddValue: "2.40" },
      { eventId: createdEvents[1].id, description: "Over 160.5 pikë", oddValue: "1.90" },
      { eventId: createdEvents[1].id, description: "Under 160.5 pikë", oddValue: "1.90" },
      
      // Manchester United vs Liverpool
      { eventId: createdEvents[2].id, description: "Manchester United fiton", oddValue: "2.20" },
      { eventId: createdEvents[2].id, description: "Barazim", oddValue: "3.20" },
      { eventId: createdEvents[2].id, description: "Liverpool fiton", oddValue: "2.80" },
    ];

    for (const odd of oddsData) {
      await connection.execute(
        'INSERT INTO odds (event_id, description, odd_value) VALUES (?, ?, ?)',
        [odd.eventId, odd.description, odd.oddValue]
      );
    }

    console.log('✅ Odds created for all events');
    console.log('🎉 Database seeded successfully!');
    console.log('\n📝 Demo credentials:');
    console.log('Email: demo@example.com');
    console.log('Password: password123');
    
    await connection.end();
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seed().then(() => process.exit(0));