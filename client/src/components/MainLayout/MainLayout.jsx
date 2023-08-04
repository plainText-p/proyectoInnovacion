import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Sidebar from '../Sidebar/Sidebar';
import SidebarResponsive from '../SidebarResponsive/SidebarResponsive';
import Footer from '../Footer/Footer';

import LoginLayout from '../LoginLayout/LoginLayout';
import Inicio from '../Sections/Inicio/Inicio.jsx';
import Publicaciones from '../Sections/Publicaciones/Publicaciones.jsx';
import NuestraHistoria from '../Sections/NuestraHistoria/NuestraHistoria.jsx';
import Autoridades from '../Sections/Autoridades/Autoridades.jsx';
import Inscripciones from '../Sections/Inscripciones/Inscripciones.jsx';
import Gao from '../Sections/Gao/Gao';
import Computacion from '../Sections/Computacion/Computacion.jsx';
import CicloBasico from '../Sections/CicloBasico/CicloBasico.jsx';
import PreguntasFrecuentes from '../Sections/PreguntasFrecuentes/PreguntasFrecuentes.jsx';
import NotFound from '../Sections/NotFound/NotFound.jsx';

import './LoginButton.css';

function MainLayout() {
  const [isLaptopResolution, setIsLaptopResolution] = useState(
    window.innerWidth <= 1470
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLaptopResolution(window.innerWidth <= 1470);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="grid-container">
      {isLaptopResolution ? <SidebarResponsive /> : <Sidebar />}
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/login" element={<LoginLayout />} />
        <Route exact path="/publicaciones" element={<Publicaciones />} />
        <Route exact path="/nuestra-historia" element={<NuestraHistoria />} />
        <Route exact path="/autoridades" element={<Autoridades />} />
        <Route exact path="/inscripciones" element={<Inscripciones />} />
        <Route exact path="/gao" element={<Gao />} />
        <Route exact path="/computacion" element={<Computacion />} />
        <Route exact path="/ciclo-basico" element={<CicloBasico />} />
        <Route
          exact
          path="/preguntas-frecuentes"
          element={<PreguntasFrecuentes />}
        />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default MainLayout;
