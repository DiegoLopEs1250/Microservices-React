import { useState } from "react";
import { getProductsByCategory } from "../services/productServices";
import Swal from "sweetalert2";

function ProductByCategory() {
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const searchProducts = async (e) => {
        e.preventDefault();

        if (!category.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Campo requerido",
                text: "Ingrese una categoría para buscar."
            });
            return;
        }

        setLoading(true);
        setSearched(true);

        try {
            const response = await getProductsByCategory(category);
            setProducts(response);
        } catch (err) {
            console.error(err);
            setProducts([]);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No fue posible realizar la búsqueda."
            });
        } finally {
            setLoading(false);
        }
    };

    const renderImage = (src) => {
        if (!src) {
            return <div className="product-img-placeholder">📷</div>;
        }
        return (
            <img
                className="product-img"
                src={src}
                alt="producto"
                onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                }}
            />
        );
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-10">
                <div className="card shadow-sm">
                    <div className="card-header bg-success text-white">
                        Buscar productos por categoría
                    </div>
                    <div className="card-body">
                        <form onSubmit={searchProducts}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ej. Electrónica, Ropa..."
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                                <button
                                    className="btn btn-success"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    ) : "Buscar"}
                                </button>
                            </div>
                        </form>

                        <hr />

                        {loading ? (
                            <div className="spinner-container">
                                <div className="spinner-border text-success"></div>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-striped table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Categorías</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.id}>
                                                <td className="text-center">
                                                    {renderImage(product.imageFiles)}
                                                </td>
                                                <td className="fw-semibold">{product.name}</td>
                                                <td>{product.description || product.descripcion}</td>
                                                <td>
                                                    {product.category?.map((cat, i) => (
                                                        <span key={i} className="badge-category">{cat}</span>
                                                    ))}
                                                </td>
                                                <td className="fw-bold text-success">
                                                    ${Number(product.price).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : searched ? (
                            <div className="text-center text-muted py-4">
                                No se encontraron productos para la categoría "{category}".
                            </div>
                        ) : (
                            <div className="text-center text-muted py-4">
                                Ingrese una categoría y presione Buscar.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductByCategory;
