import { useState } from "react";
import Swal from "sweetalert2";
import { deleteBasket } from "../services/basketServices";

function BasketDelete() {
    const [userName, setUserName] = useState("");
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!userName.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Campo requerido",
                text: "Ingrese el nombre del usuario."
            });
            return;
        }

        const result = await Swal.fire({
            title: "¿Eliminar carrito?",
            text: `Se eliminará el carrito de "${userName}".`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!result.isConfirmed) return;

        setDeleting(true);

        try {
            await deleteBasket(userName);
            await Swal.fire({
                icon: "success",
                title: "Carrito eliminado",
                text: "El carrito fue eliminado correctamente.",
                timer: 1800,
                showConfirmButton: false
            });
            setUserName("");
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No fue posible eliminar el carrito."
            });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card shadow-sm">
                    <div className="card-header bg-danger text-white">
                        Eliminar carrito
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleDelete}>
                            <div className="mb-3">
                                <label className="form-label">Nombre del usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ej. Juan"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className="btn btn-danger w-100"
                                disabled={deleting}
                            >
                                {deleting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Eliminando...
                                    </>
                                ) : "Eliminar carrito"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasketDelete;
