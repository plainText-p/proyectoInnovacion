import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CardPublicacion from '../../CardPublicacion/CardPublicacion';
import { AddPostIcon } from '../../Icons/Icons.jsx';
import './Publicaciones.css';

function PublicacionesSL() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/publicaciones')
      .then((res) => res.json())
      .then((data) => {
        setPublicaciones(data);
      })
      .catch((error) => {
        console.error('Error al obtener las publicaciones: ', error);
      });
  }, []);


  return (
    <section className="content-container">
      <div className="contenedor-titulo">
        <h2 className="titulo-seccion">Publicaciones</h2>
      </div>
       
      <div className="contenedor-grid">
        {publicaciones.map((publicacion) => (
          <div key={publicacion.idPost} className="estilos-div">
            <CardPublicacion
              title={publicacion.title}
              content={publicacion.content}
              dateUploaded={publicacion.dateUploaded}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PublicacionesSL;
