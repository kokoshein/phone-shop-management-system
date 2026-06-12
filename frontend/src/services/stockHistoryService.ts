import api from "./api";

export const getStockHistory = async () => {
    const response = await api.get(
        "/stock-history"
    );

    return response.data;
};