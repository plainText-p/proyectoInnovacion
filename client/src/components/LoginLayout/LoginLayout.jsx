import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginLayout.css';

function LoginLayout() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ maxWidth: '500px' }}>
        <img src="et7.png" alt="Logo" className="logo-image" />
        <div className="form-floating m-2 position-relative">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="user"
          />
          <label htmlFor="floatingInput">Nombre de usuario</label>
        </div>
        <div className="form-floating m-2">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Contraseña</label>
        </div>
        <button type="submit" className="btn btn-primary mt-3 button-form">
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default LoginLayout;
