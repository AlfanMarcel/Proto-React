const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000; // Ensure this port matches your backend endpoint

app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prototype_react'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Secret key for JWT
const JWT_SECRET = "Jsj+30lQNEwp1tJBeEY+9j3LrrRLuvi/iojG23skh1g=";

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Register route
app.post('/register', async (req, res) => {
  const { mail, password, username } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO user (mail, password, username) VALUES (?, ?, ?)';
    db.query(query, [mail, hashedPassword, username], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login route
app.post('/login', (req, res) => {
  const { mail, password } = req.body;
  const query = 'SELECT * FROM user WHERE mail = ?';
  db.query(query, [mail], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      const user = results[0];
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

app.get('/edit', (req, res) => {
  const { id } = req.query;
  const query = 'SELECT * FROM audit WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Audit not found' });
    }
  });
});



app.put('/edit', (req, res) => {
  const { id } = req.query;
  const { user_id, judul, area, tanggal_audit, tanggal_close } = req.body;

  const query = 'UPDATE audit SET user_id = ?, judul = ?, area = ?, tanggal_audit = ?, tanggal_close = ? WHERE id = ?';
  db.query(query, [user_id, judul, area, tanggal_audit, tanggal_close, id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Audit not found' });
    } else {
      res.json({ message: 'Audit data updated successfully' });
    }
  });
});

app.get('/hasil_audit', (req, res) => {
  const query = 'SELECT * FROM audit';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST route to insert audit data
app.post('/audit', (req, res) => {
  const { id, user_id, judul, area, tanggal_audit, tanggal_close } = req.body;

  const query = 'INSERT INTO audit (id, user_id, judul, area, tanggal_audit, tanggal_close) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [id, user_id, judul, area, tanggal_audit, tanggal_close], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Audit data inserted successfully' });
  });
});

app.delete('/hasil_audit/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM audit WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Audit not found' });
    } else {
      res.json({ message: 'Audit deleted successfully' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on http://192.168.0.112:${port}`);
});
