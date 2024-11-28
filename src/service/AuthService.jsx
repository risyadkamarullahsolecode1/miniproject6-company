import apiClient from "../axiosConfig";

const register = async (userData) => {
    const response = await apiClient.post("/Employee/Add-employee-user", userData);  
    return response.data;
  };
  
  const login = async (userData) => {
    const response = await apiClient.post("/Auth/login", userData);
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  };
  
  const logout = async () => { 
     await apiClient.post(`Auth/logout`);  
     localStorage.removeItem('user');  
  };
  
  const AuthService = {
    register,
    login,
    logout
  };
  
  export default AuthService;
  