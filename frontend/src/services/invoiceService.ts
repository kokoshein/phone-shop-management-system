import api from "./api";

export const getInvoices = async () => {
    const response =
        await api.get("/invoices");

    return response.data;
};