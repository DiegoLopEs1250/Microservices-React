import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createBasket } from "../services/basketServices";
import { getProducts } from "../services/productServices";

function BasketForm() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [basket, setBasket] = useState({
        userName: "",
        quantity: "1",
        color: "",
        price: "",
        productId: "",
        productName: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await getProducts(1, 999);
                setProducts(response.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingProducts(false);
            }
        };
        loadProducts();
    }, []);

    const handleProductSelect = (e) => {
        const productId = e.target.value;
        const product = products.find(p => String(p.id) === productId);
        if (product) {
            setBasket(prev => ({
                ...prev,
                productId: product.id,
                productName: product.name,
                price: product.price
            }));
        } else {
            setBasket(prev => ({
                ...prev,
                productId: "",
                productName: "",
                price: ""
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBasket(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!basket.userName.trim() || !basket.productId) {
            Swal.fire({
                icon: "warning",
                title: "Campos requeridos",
                text: "Usuario y Producto son obligatorios."
            });
            return;
        }

        const body = {
            cart: {
                userName: basket.userName,
                items: [
                    {
                        quantity: Number(basket.quantity),
                        color: basket.color,
                        price: Number(basket.price),
                        productId: basket.productId,
                        productName: basket.productName
                    }
                ]
            }
        };

        setSubmitting(true);

        try {
            const response = await createBasket(body);
            await Swal.fire({
                icon: "success",
                title: "Carrito creado",
                text: `Carrito almacenado para ${response.userName}`,
                timer: 2000,
                showConfirmButton: false
            });
            navigate("/baskets/search");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.message || "No fue posible crear el carrito."
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
                        Crear Carrito
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <input
                                    className="form-control"
                                    name="userName"
                                    placeholder="Nombre del usuario"
                                    value={basket.userName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Producto</label>
                                {loadingProducts ? (
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="spinner-border spinner-border-sm"></span>
                                        Cargando productos...
                                    </div>
                                ) : (
                                    <select
                                        className="form-select"
                                        value={basket.productId}
                                        onChange={handleProductSelect}
                                        required
                                    >
                                        <option value="">-- Seleccione un producto --</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.name} — ${Number(p.price).toFixed(2)}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label className="form-label">Color</label>
                                        <input
                                            className="form-control"
                                            name="color"
                                            placeholder="Ej. Rojo, Azul"
                                            value={basket.color}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label className="form-label">Cantidad</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            name="quantity"
                                            value={basket.quantity}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label className="form-label">Precio</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="form-control"
                                            name="price"
                                            value={basket.price}
                                            onChange={handleChange}
                                            required
                                        />
                                        <small className="text-muted">
                                            Precio tomado del producto seleccionado
                                        </small>
                                    </div>
                                </div>
                            </div>

                            {basket.productName && (
                                <div className="alert alert-info py-2">
                                    Producto seleccionado: <strong>{basket.productName}</strong>
                                </div>
                            )}

                            <button
                                className="btn btn-success w-100 mt-2"
                                disabled={submitting || !basket.productId}
                            >
                                {submitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Guardando...
                                    </>
                                ) : "Guardar Carrito"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasketForm;
