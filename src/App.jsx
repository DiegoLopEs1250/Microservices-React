import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import ProductsList from "./components/ProductsList";
import ProductByCategory from "./components/ProductByCategory";
import BasketForm from "./components/BasketForm";
import BasketByUser from "./components/BasketByUser";
import BasketDelete from "./components/BasketDelete";
import "./App.css";

function Home() {
    return (
        <div className="text-center py-5">
            <h1 className="display-4 fw-bold text-primary">MicroserviceApp</h1>
            <p className="lead text-muted">Gestión de productos y carritos de compras</p>
            <div className="row mt-5 justify-content-center g-4">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center py-5">
                            <div className="display-1 mb-3">📦</div>
                            <h3 className="card-title">Productos</h3>
                            <p className="card-text text-muted">Crea, lista y busca productos por categoría</p>
                            <a href="/products" className="btn btn-primary">Ir a Productos</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center py-5">
                            <div className="display-1 mb-3">🛒</div>
                            <h3 className="card-title">Carritos</h3>
                            <p className="card-text text-muted">Crea, consulta y elimina carritos de compras</p>
                            <a href="/baskets/create" className="btn btn-success">Ir a Carritos</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/products/create" element={<ProductForm />} />
                    <Route path="/products/category" element={<ProductByCategory />} />
                    <Route path="/baskets/create" element={<BasketForm />} />
                    <Route path="/baskets/search" element={<BasketByUser />} />
                    <Route path="/baskets/delete" element={<BasketDelete />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
