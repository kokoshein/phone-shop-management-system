import api from "./api";

export const getRepairs = async () => {
    const response = await api.get("/repairs");
    return response.data;
};

export const createRepair = async (data: any) => {
    const response = await api.post("/repairs", data);
    return response.data;
};
export const updateRepairStatus = async (
    id: number,
    status: string
) => {

    const response = await api.put(
        `/repairs/${id}`,
        { status }
    );

    return response.data;
};

export const deleteRepair = async (
    id: number
) => {

    const response = await api.delete(
        `/repairs/${id}`
    );

    return response.data;
};