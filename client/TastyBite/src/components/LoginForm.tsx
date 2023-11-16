import './LoginForm.css'


export function LoginForm() {
  return (
    <>
      <div className="breadcrumb">
        <a href="#">Tasty Bite</a> &gt; <a href="#">Iniciar sesión</a>
      </div>
      <div className="login-form-container">

        <div className="login-form-container__right-container">
          <h1>Iniciar Sesión</h1>
          <form className="form-login">
            <div className="form-group">
              <input type="email" id="email" placeholder="correo electrónico" />
            </div>
            <div className="form-group">
              <input type="password" id="password" placeholder="contraseña" />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
            <div className="login-form-container__right-container__register">
              <p>¿No tienes cuenta? <a href="#">Registrate</a></p>
            </div>
          </form>
        </div>
        <div className="login-form-container__left-container">
          <img src="../images/Cocodrilo.png" alt="Cocodrilo señalando login" />
        </div>
      </div>
    </>
  )
}