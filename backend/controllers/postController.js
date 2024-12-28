const pool = require('../config/database');
const jwt = require('jsonwebtoken');

exports.getPosts = async (req, res) => {
  try {
    const result = await pool.query('SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.writePost = async (req, res) => {
  const { title, content } = req.body;
  const token = req.cookies.token;
  try {
    if (token) {
      const decoded = jwt.verify(token, 'secretkey');
      const result = await pool.query('SELECT id FROM users WHERE username = $1', [decoded.username]);
      const userId = result.rows[0].id;

      await pool.query(
        'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3)',
        [title, content, userId]
      );
      res.status(201).json({ message: 'Post created successfully' });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
