import { toast } from "react-toastify";
import { get, patch, post } from "./ApiService";

const mainRoute = "/api/account";

export const current = async () => {
  try {
    const [
      userRes, 
      countryRes, 
      categoriesRes,
    ] = await Promise.all([
      get(`${mainRoute}/currentUser`),
      get(`${mainRoute}/currentCountry`),
      get(`${mainRoute}/currentCategories`)
    ]).then((reponse: any) => {
      return reponse.map((res: any) => {
        if (res?.status === 200) {
          return res?.data?.data;
        }
        return null;
      });
    });

    return {
      ...userRes.user,
      country: countryRes.country ?? null,
      categories: categoriesRes.category ?? null,
    };
  } catch (e: any) {  
    // Do Nothing
  }

  return null;
};

export const currentUser = async () => {
  try {
    const response = await get(`${mainRoute}/currentUser`);
    if (response.status === 200) {
      return response.data.data.user;
    }
  } catch (e: any) {  
    // Do Nothing
  }

  return null;
};

export const currentCountry = async () => {
  try {
    const response = await get(`${mainRoute}/currentCountry`);
    if (response.status === 200) {
      return response.data.data.country;
    }
  } catch (e: any) {  
    // Do Nothing
  }

  return null;
};

export const currentCategories = async () => {
  try {
    const response = await get(`${mainRoute}/currentCategories`);
    if (response.status === 200) {
      return response.data.data.categories;
    }
  } catch (e: any) {  
    // Do Nothing
  }

  return null;
};

export const updateUser = async (body: object) => {
  try {
    const response = await patch(`${mainRoute}/updateUser`, body);
    if (response.status === 200) {
      toast.success("Account updated! Changes reflected.");
      return response.data.data.user;
    }
  } catch (e: any) {          
    if (e.response?.data?.errors) {
      Object.entries(e.response?.data?.errors)
        .forEach(([, error]) => {
          toast.error(
            typeof error === "string" ? 
              error : (error as string[])[0]);
        });
    } else {
      toast.error("Updates can't be saved");
    }
  }

  return null;
};

export const updateCountry = async (body: object) => {
  try {
    const response = await patch(`${mainRoute}/updateCountry`, body);
    if (response.status === 200) {
      return response.data.data.user_country;
    }
  } catch (e: any) {  
    toast.error("Country unknown or Not supported");
  }

  return null;
};

export const updateCategory = async (body: object) => {
  try {
    const response = await patch(`${mainRoute}/updateCategory`, body);
    if (response.status === 200) {
      return response.data.data.user_category;
    }
  } catch (e: any) {  
    toast.error("Category unknown or Not supported");
  }

  return null;
};