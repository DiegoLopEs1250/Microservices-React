import { useEffect, useState, useCallback } from "react";
import { getProducts, deleteProduct } from "../services/productServices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getProducts(pageNumber, pageSize);
            setProducts(response.data);
            setTotalCount(response.totalCount);
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron cargar los productos."
            });
        } finally {
            setLoading(false);
        }
    }, [pageNumber, pageSize]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar producto?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!result.isConfirmed) return;

        try {
            await deleteProduct(id);
            await Swal.fire({
                title: "Eliminado",
                text: "El producto fue eliminado correctamente.",
                icon: "success",
                timer: 1800,
                showConfirmButton: false
            });

            if (products.length === 1 && pageNumber > 1) {
                setPageNumber(pageNumber - 1);
            } else {
                loadProducts();
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error",
                text: "No fue posible eliminar el producto.",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    const renderImage = (src) => {
        if (!src) {
            return (
                <div className="product-img-placeholder">
                    📷
                </div>
            );
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

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <span>Lista de Productos</span>
                <Link to="/products/create" className="btn btn-light btn-sm">
                    + Nuevo
                </Link>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                        <thead className="table-primary">
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Categorías</th>
                                <th>Precio</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map(product => (
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
                                        <td className="text-center">
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted py-4">
                                        No hay productos registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="pagination-info">
                        {totalCount > 0
                            ? `Mostrando ${(pageNumber - 1) * pageSize + 1}-${Math.min(pageNumber * pageSize, totalCount)} de ${totalCount}`
                            : "Sin resultados"}
                    </span>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled={pageNumber === 1}
                            onClick={() => setPageNumber(pageNumber - 1)}
                        >
                            Anterior
                        </button>
                        <span className="align-self-center px-2 fw-semibold">
                            {pageNumber} / {totalPages || 1}
                        </span>
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled={pageNumber === totalPages || totalPages === 0}
                            onClick={() => setPageNumber(pageNumber + 1)}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
