import { Pool } from 'pg';

// 创建数据库连接池
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING || 'postgresql://root:eDb8y2t5ZG6W0R4xkdlMpAP7is913QHa@ovh1.clusters.zeabur.com:31263/zeabur',
  ssl: false
});

export async function createWaitlistTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Waitlist table created successfully');
    return { success: true };
  } catch (error) {
    console.error('Error creating waitlist table:', error);
    return { success: false, error };
  }
}

export async function addToWaitlist(email: string) {
  try {
    const result = await pool.query(
      `INSERT INTO waitlist (email)
       VALUES ($1)
       ON CONFLICT (email) DO NOTHING
       RETURNING id;`,
      [email]
    );
    
    if (result.rowCount === 0) {
      return { success: false, error: 'Email already exists in waitlist' };
    }
    
    return { success: true, id: result.rows[0].id };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { success: false, error };
  }
}

export async function getWaitlistCount() {
  try {
    // 使用更明确的查询语句
    const result = await pool.query('SELECT COUNT(id) as total FROM waitlist');
    console.log('Raw waitlist count result:', result);
    console.log('Waitlist count rows:', result.rows);
    console.log('First row:', result.rows[0]);
    
    // 确保我们正确解析计数值
    const count = parseInt(result.rows[0].total, 10);
    console.log('Parsed count:', count);
    
    return { success: true, count };
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return { success: false, error };
  }
} 