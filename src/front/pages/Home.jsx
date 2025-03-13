import { Link } from "react-router-dom";

export const Home = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body text-center p-5">
              <h1 className="mb-4">Welcome to Auth Demo</h1>
              
              <p className="lead mb-5">
                A simple authentication demo with secure login and protected routes.
              </p>
              
              {isLoggedIn ? (
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">Private Area</h5>
                        <p className="card-text">Access the protected content.</p>
                        <Link to="/private" className="btn btn-primary">
                          Go to Private Area
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">Logout</h5>
                        <p className="card-text">Sign out of your account.</p>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => {
                            sessionStorage.removeItem('token');
                            window.location.reload();
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">Sign Up</h5>
                        <p className="card-text">Create a new account.</p>
                        <Link to="/signup" className="btn btn-primary">
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">Login</h5>
                        <p className="card-text">Access your account.</p>
                        <Link to="/login" className="btn btn-outline-secondary">
                          Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 bg-light p-3 rounded">
                <p className="mb-0">
                  This demo shows JWT authentication with protected routes.
                </p>
              </div>
            </div>
            <div className="card-footer text-center text-muted">
              Auth Demo Project &copy; {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};