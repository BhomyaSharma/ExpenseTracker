const pool = require('../config/db'); // ✅ Ensure database connection

const createUser = async (email, password) => {
  try {
    const [result] = await pool.execute(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, findUserByEmail };
