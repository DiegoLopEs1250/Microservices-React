import { useState } from "react";
import Swal from "sweetalert2";
import { getBasketByUserName } from "../services/basketServices";

function BasketByUser() {
    const [userName, setUserName] = useState("");
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const searchBasket = async (e) => {
        e.preventDefault();

        if (!userName.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Campo requerido",
                text: "Ingrese un nombre de usuario."
            });
            return;
        }

        setLoading(true);
        setSearched(true);

        try {
            const response = await getBasketByUserName(userName);
            setCart(response);
        } catch (err) {
            console.error(err);
            setCart(null);
            Swal.fire({
                icon: "error",
                title: "No encontrado",
                text: "No existe un carrito para ese usuario."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="card shadow-sm">
                    <div className="card-header bg-success text-white">
                        Buscar carrito por usuario
                    </div>
                    <div className="card-body">
                        <form onSubmit={searchBasket}>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    placeholder="Nombre del usuario"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
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
                        ) : cart ? (
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="mb-0">
                                        Usuario: <span className="text-primary">{cart.userName}</span>
                                    </h5>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Color</th>
                                                <th>Cantidad</th>
                                                <th>Precio</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.items?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.productName}</td>
                                                    <td>
                                                        <span className="badge" style={{ backgroundColor: item.color }}>
                                                            {item.color}
                                                        </span>
                                                    </td>
                                                    <td>{item.quantity}</td>
                                                    <td>${Number(item.price).toFixed(2)}</td>
                                                    <td className="fw-bold">
                                                        ${(item.quantity * item.price).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr className="table-active">
                                                <th colSpan="4" className="text-end">Total</th>
                                                <th className="text-success">
                                                    ${Number(cart.totalPrice).toFixed(2)}
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        ) : searched ? (
                            <div className="text-center text-muted py-4">
                                No se encontró un carrito para "{userName}".
                            </div>
                        ) : (
                            <div className="text-center text-muted py-4">
                                Ingrese un nombre de usuario para buscar su carrito.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasketByUser;
