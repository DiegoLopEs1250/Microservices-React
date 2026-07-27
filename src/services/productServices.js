import { productsApi } from "../api/axiosCong";

export const createProduct = async (product) => {
    const response = await productsApi.post("/products", product);
    return response.data;
};

export const getProducts = async (pageNumber = 1, pageSize = 10) => {
    const response = await productsApi.get(
        `/products?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data.products;
};

export const getProductsByCategory = async (category) => {
    const response = await productsApi.get(
        `/products/category/${encodeURIComponent(category)}`
    );
    return response.data.products;
};

export const deleteProduct = async (id) => {
    const response = await productsApi.delete(`/products/${id}`);
    return response.data;
};
