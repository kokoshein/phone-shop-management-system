import api from "./api";

export const getReport =
    async () => {

        const response =
            await api.get("/reports");

        return response.data;
    };
export const getAdvancedReport =
    async () => {

        const response =
            await api.get(
                "/reports/advanced"
            );

        return response.data;
    };