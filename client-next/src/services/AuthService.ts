import { clearBearerToken, get, post, setBearerToken } from "./ApiService";
import { toast } from "react-toastify";

export const register = async (form: any) => {
  try {
    let response = await get(`sanctum/csrf-cookie`);
    if (response.status === 204) {
      const payload = {...form};
      response = await post(`api/auth/register`, payload);  
      if (response.status === 200) {
        toast.success("Success! Logging In ...");
        setBearerToken(response.data.data.access_token[0]);
      }
    }
    return response.status;
  } catch (e: any) {          
    Object.entries(e.response?.data?.errors || {})
      .forEach(([, error]) => {
        toast.error(
          typeof error === "string" ? 
            error : (error as string[])[0]);
      });
  }

  return 500;
};

export const login = async (form: any) => {
  try {
    let response = await get(`sanctum/csrf-cookie`);
    if (response.status === 204) {
      if (form?.password_confirmation) {
        const {password_confirmation, ...payload} = form;
        response = await post(`api/auth/login`, payload);
      } else {
        const payload = {...form};
        response = await post(`api/auth/login`, payload);
      }
      if (response.status === 200) {
        toast.success("Logging In ...");
        setBearerToken(response.data.data.access_token[0]);
      }
    }
    return response.status;
  } catch (e: any) {          
    Object.entries(e.response?.data?.errors || {})
      .forEach(([, error]) => {
        toast.error(
          typeof error === "string" ? 
            error : (error as string[])[0]);
      });
  }

  return 500;
};

export const logout = async () => {
  try {
    toast.warn("Logging Out ...");
    const response = await post(`api/auth/logout`);
    if (response.status === 200){
      clearBearerToken();
    }
    return response.status;
  } catch (e: any) {  
    // Do Nothing
  } 

  return 500;
}