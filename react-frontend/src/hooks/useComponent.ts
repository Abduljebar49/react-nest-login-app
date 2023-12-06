import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

const useComponent = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const sumbitData = <T>(endpoint:string,body: T,navigateTo:string='/login') => {
    setIsLoading(true);
    apiClient
      .post(endpoint, body)
      .then(({ data }) => {
        localStorage.setItem(
          "userToken",
          JSON.stringify({ token: data.access_token })
        );
        navigate(navigateTo);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchData = (endpoint: string) => {
    const controller = new AbortController();
    setIsLoading(true);
    apiClient
      .get<T>(endpoint, { signal: controller.signal })
      .then(({ data }) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setIsLoading(false);
      });
      return () => controller.abort();
  };

  const logOut = () =>{
    localStorage.removeItem("userToken");
    navigate('/login')
  }
  return {
    isLoading,
    setIsLoading,
    error,
    setError,
    showPassword,
    setShowPassword,
    navigate,
    showConfirmPassword,
    setShowConfirmPassword,
    sumbitData,
    data,
    setData,
    fetchData,
    logOut
  };
};

export default useComponent;
