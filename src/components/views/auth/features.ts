import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";

import { toast } from "@/hooks/use-toast";
import { signInService } from "@/services/auth";

interface IInitialValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: IInitialValues = {
  username: "",
  password: "",
  rememberMe: false,
};

const useAuthFeatures = () => {
  const signIn = useSignIn();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Error Handler
  const extractErrorMessage = (
    error: unknown,
    setFieldError: (field: string, message: string) => void
  ): string => {
    if (axios.isAxiosError(error)) {
      // Check if there are server-side validation errors
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;

        // Map server-side errors to form field errors
        Object.keys(serverErrors).forEach((field) => {
          setFieldError(field, serverErrors[field]);
        });

        // Optionally, return a general message or the first error
        return t("errors.general.validation_error"); // Or customize this message
      }

      // General Axios error handling
      return (
        error.response?.data?.message ||
        t("errors.general.something_went_wrong")
      );
    }

    // Handle unexpected errors
    return t("errors.general.unexpected_error");
  };

  const handleFormSubmit = async (
    values: IInitialValues,
    {
      resetForm,
      setFieldError,
    }: {
      resetForm: () => void;
      setFieldError: (field: string, message: string) => void;
    }
  ) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const body = {
        username: values.username,
        password: values.password,
        ...(values.rememberMe && { sessionType: "rememberMe" }),
      };

      const { success, data, message } = await signInService(body);

      console.log(message, "message");

      if (success && data?.token) {
        const { token, user } = data;

        const signedIn = signIn({
          auth: {
            token,
            type: "Bearer",
          },
          userState: user,
        });

        if (signedIn) {
          toast({
            variant: "default",
            title: message || t("auth.sign_in_success"),
          });
          resetForm();
          navigate("/");
        } else {
          toast({
            variant: "destructive",
            title: t("auth.sign_in_failure"),
          });
        }
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error, setFieldError);
      toast({ variant: "destructive", title: errorMessage });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    initialValues,
    handleFormSubmit,
  };
};

export default useAuthFeatures;
