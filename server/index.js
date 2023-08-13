 
const express = require('express')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')

const config = require('./config.js');
const PORT = config.PORT;
const DB_HOST = config.DB_HOST;
const DB_USER = config.DB_USER;
const DB_NAME = config.DB_NAME;
const DB_PORT = config.DB_PORT;
const DB_PASSWORD = config.DB_PASSWORD;

app.use(cors({
  origin: 'http://localhost:5173'
}))

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
})
 

connection.connect((err) => {
  if(err) {
    console.error("Error al conectar con la base de datos", err)
  } else {
    console.log("Conexion exitosa a la base de datos")
  }
})

app.use(express.json())

app.get('/publicaciones', (req, res) => {
  // Realizar una consulta a la base de datos para obtener todas las publicaciones
  const sql = 'SELECT * FROM posts';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener las publicaciones', err);
      res.status(500).json({ error: 'Error al obtener las publicaciones' });
    } else {
      console.log('Publicaciones obtenidas correctamente');
      res.json(result);
    }
  });
});


app.post('/publicaciones', (req, res) => {
  const { title, content } = req.body;



  const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  connection.query(sql, [title, content], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ error: 'Error al insertar en la base de datos' });
    } else {
      res.json({ message: 'Publicación insertada correctamente' });
    }
  });
});

app.post('/login', (req, res) => {
  const { Username, Password } = req.body; // Utiliza req.body en lugar de req.query

  const sql = 'SELECT name, password FROM users WHERE name = ? AND password = ?';

  console.log(Username, Password);
  connection.query(sql, [Username, Password], (err, result) => {
    if (err) {
      console.error('Error al comparar usuarios:', err);
      res.status(500).json({ error: 'Error al consultar en la base de datos' });
    } else {
      if (result.length > 0) {
  
        res.json({ message: 'Inicio de sesión exitoso' });
      } else {
  
        res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }
    }
  });
});
 
 
app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`)
})

