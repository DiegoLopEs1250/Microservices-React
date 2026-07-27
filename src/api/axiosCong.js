import axios from "axios";

const productsApi = axios.create({
    baseURL: import.meta.env.VITE_PRODUCTS_API_URL || "http://localhost:8080",
    headers: { "Content-Type": "application/json" }
});

const basketsApi = axios.create({
    baseURL: import.meta.env.VITE_BASKETS_API_URL || "http://localhost:8081",
    headers: { "Content-Type": "application/json" }
});

export { productsApi, basketsApi };
