import { neon } from "@neondatabase/serverless";

// Default admin credentials requested by user
export const ADMIN_EMAIL = "menuvoraai@gmail.com";
export const ADMIN_PASSWORD = "nonu8198@A";

// Get Neon database connection string from environment
const databaseUrl = process.env.DATABASE_URL || "";

export const sql = databaseUrl ? neon(databaseUrl) : null;

// Neon Database Helper Functions
export async function initializeNeonDatabase() {
  if (!sql) {
    console.log("ℹ️ [Neon DB] DATABASE_URL not set. Running with fallback memory database.");
    return false;
  }

  try {
    // 1. Create Users Table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'USER',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Create Orders Table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(100) UNIQUE NOT NULL,
        plan_name VARCHAR(100) NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'COMPLETED',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Ensure Admin User Exists
    const existingAdmin = await sql`
      SELECT * FROM users WHERE email = ${ADMIN_EMAIL} LIMIT 1;
    `;

    if (existingAdmin.length === 0) {
      await sql`
        INSERT INTO users (name, email, password, role)
        VALUES ('Menuvora Admin', ${ADMIN_EMAIL}, ${ADMIN_PASSWORD}, 'ADMIN');
      `;
      console.log("✅ [Neon DB] Admin user menuvoraai@gmail.com seeded successfully!");
    }

    console.log("✅ [Neon DB] PostgreSQL schema initialized successfully!");
    return true;
  } catch (error) {
    console.error("❌ [Neon DB] Initialization Error:", error);
    return false;
  }
}

// User Authentication against Neon DB
export async function authenticateUser(emailInput: string, passwordInput: string) {
  const cleanEmail = emailInput.toLowerCase().trim();
  const cleanPassword = passwordInput.trim();

  // 1. If Neon DB is connected, query PostgreSQL
  if (sql) {
    try {
      await initializeNeonDatabase();
      const users = await sql`
        SELECT id, name, email, password, role 
        FROM users 
        WHERE LOWER(email) = ${cleanEmail} 
        LIMIT 1;
      `;

      if (users.length > 0) {
        const user = users[0];
        if (user.password === cleanPassword) {
          return {
            success: true,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          };
        }
      }
    } catch (err) {
      console.error("Neon DB query error:", err);
    }
  }

  // 2. Fallback check for specified credentials
  if (cleanEmail === ADMIN_EMAIL && cleanPassword === ADMIN_PASSWORD) {
    return {
      success: true,
      user: {
        name: "Menuvora Admin",
        email: ADMIN_EMAIL,
        role: "ADMIN",
      },
    };
  }

  return {
    success: false,
    message: "Invalid email or password. Please try again.",
  };
}
