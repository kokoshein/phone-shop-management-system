import api from "./api";

export const getSales = async () => {
    const response =
        await api.get("/sales");

    return response.data;
};

export const createSale = async (
    data: any
) => {
    const response =
        await api.post(
            "/sales",
            data
        );

    return response.data;
};