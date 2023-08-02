const express = require('express')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:5173'
}))

// configuracion de la conexion a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usuario_posts',
  password: 'ETN7dolores',
  database: 'posts'
})

// conectar a la base de datos
connection.connect((err) => {
  if(err) {
    //console.error("Error al conectar con la base de datos", err)
  } else {
    //console.log("Conexion exitosa a la base de datos")
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

// Ruta para manejar el insert en la base de datos
app.post('/publicaciones', (req, res) => {
  // Obtener los datos enviados en la solicitud POST desde el cliente
  const { title, content } = req.body;


  // Realizar el insert en la base de datos
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

const port = 3001
app.listen(port, () => {
  console.log(`servidor corriendo en http://localhost:${port}`)
})