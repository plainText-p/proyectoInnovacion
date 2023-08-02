import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CardPublicacion from '../../CardPublicacion/CardPublicacion';
import { AddPostIcon } from '../../Icons/Icons.jsx';
import './Publicaciones.css';

function Publicaciones() {
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

  const handleAddPostClick = () => {
    Swal.fire({
      title: 'Nueva publicación',
      html:
        '<input type="text" id="title" class="swal2-input" placeholder="Título">' +
        '<textarea id="content" class="swal2-textarea" placeholder="Contenido"></textarea>',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value;
        const content = Swal.getPopup().querySelector('#content').value;
        return { title, content };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, content } = result.value;

        if (!title || !content) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos antes de agregar la publicación.',
          });
          return;
        }

        fetch('http://localhost:3001/publicaciones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(
                'Error al realizar la solicitud POST: ' + response.statusText
              );
            }
          })
          .then((data) => {
            console.log(data.message);
            setPublicaciones((prevPublicaciones) =>
              prevPublicaciones.concat({
                idPost: data.idPost,
                title,
                content,
                dateUploaded: new Date().toISOString(),
              })
            );
          })
          .catch((error) => {
            console.error('Error al realizar la solicitud POST:', error);
          });
      }
    });
  };

  return (
    <section className="content-container">
      <div className="contenedor-titulo">
        <h2 className="titulo-seccion">Publicaciones</h2>
      </div>
      <button className="container-add-delete" onClick={handleAddPostClick}>
        <AddPostIcon />
        <p className="texto-violeta texto-semibold">Nueva publicación</p>
      </button>
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

export default Publicaciones;
