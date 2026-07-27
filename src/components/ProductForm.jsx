import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createProduct } from "../services/productServices";

function ProductForm() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        category: "",
        imageFiles: "",
        price: ""
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name.trim() || !product.price) {
            Swal.fire({
                icon: "warning",
                title: "Campos requeridos",
                text: "Nombre y Precio son obligatorios."
            });
            return;
        }

        const body = {
            ...product,
            category: product.category.split(",").map(c => c.trim()).filter(Boolean),
            price: parseFloat(product.price)
        };

        setSubmitting(true);

        try {
            const result = await createProduct(body);
            await Swal.fire({
                icon: "success",
                title: "Producto creado",
                text: `Producto creado correctamente. ID: ${result.id}`,
                timer: 2000,
                showConfirmButton: false
            });
            navigate("/products");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.message || "No fue posible crear el producto."
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        Crear Producto
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="3"
                                    value={product.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Categorías</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    placeholder="Electrónica, Computadoras (separadas por coma)"
                                    value={product.category}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Imagen (URL)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="imageFiles"
                                            placeholder="https://ejemplo.com/imagen.jpg"
                                            value={product.imageFiles}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Precio</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="form-control"
                                            name="price"
                                            value={product.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                className="btn btn-success w-100"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Guardando...
                                    </>
                                ) : "Guardar Producto"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
