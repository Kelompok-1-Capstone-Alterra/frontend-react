import axios from "axios";
import { useState } from "react";

function useAuth() {
  const [isLoading, setIsLoading] = useState(null);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admins/login`,
        {
          admin_email: email,
          admin_password: password,
        }
      );
      return res;
    } catch (err) {
      return err.response;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
}

export default useAuth;
