import api from "./api";

export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

export const createProduct = async (data: any) => {
    const response = await api.post("/products", data);
    return response.data;
};
export const getLowStockProducts =
    async () => {

        const response =
            await api.get(
                "/products/low-stock"
            );

        return response.data;
    };