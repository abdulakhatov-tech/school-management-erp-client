import { z } from "zod";
import { useTranslation } from "react-i18next";

export const useAuthValidation = () => {
  const { t } = useTranslation();

  const validateAuth = z.object({
    username: z.string({ required_error: t("auth.username_required") }),
    password: z.string({ required_error: t("auth.password_required") }),
    rememberMe: z.boolean().optional(),
  });

  return {
    validateAuth,
  };
};
