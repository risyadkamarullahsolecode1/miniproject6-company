import apiClient from "../axiosConfig";

const getAll = async (params) => {
    return await apiClient.get("/Workson", { params });
};

const get = async (empno, projno) => {
    return await apiClient.get(`/Workson/${empno}/${projno}`);
};

const create = async (data) => {
    return await apiClient.post("/Workson", data);
};

const update = async (empno, projno, data) => {
    return await apiClient.put(`/Workson/${empno}/${projno}`, data);
};

const remove = async (empno, projno) => {
    return await apiClient.delete(`/Workson/${empno}/${projno}`);
};

const WorksOnService = {
    getAll,
    get,
    create,
    update,
    remove
};
    
export default WorksOnService;