import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const { pathname } = useLocation();

    const isActive = (path) => pathname === path || pathname.startsWith(path + "/");

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    🛒 MicroserviceApp
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item dropdown">
                            <button
                                className={`nav-link dropdown-toggle ${isActive("/products") ? "active" : ""}`}
                                data-bs-toggle="dropdown"
                            >
                                Productos
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/products">Listar Productos</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/products/create">Crear Producto</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/products/category">Buscar por Categoría</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <button
                                className={`nav-link dropdown-toggle ${isActive("/baskets") ? "active" : ""}`}
                                data-bs-toggle="dropdown"
                            >
                                Carritos
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/baskets/create">Crear Carrito</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/baskets/search">Buscar por Usuario</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/baskets/delete">Eliminar Carrito</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
