import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";

const useComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    sumbitData
  };
};

export default useComponent;
