import { basketsApi } from "../api/axiosCong";

export const createBasket = async (basket) => {
    const response = await basketsApi.post("/basket", basket);
    return response.data;
};

export const getBasketByUserName = async (userName) => {
    const response = await basketsApi.get(
        `/basket/${encodeURIComponent(userName)}`
    );
    return response.data.cart;
};

export const deleteBasket = async (userName) => {
    const response = await basketsApi.delete(
        `/basket/${encodeURIComponent(userName)}`
    );
    return response.data;
};
