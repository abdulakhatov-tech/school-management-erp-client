import { z } from "zod";
import { useTranslation } from "react-i18next";

const useResultValidation = () => {
  const { t } = useTranslation();

  const validateResult = z.object({
    description: z.string({
      required_error: t("result_form.description_required"),
    }),
    score: z
      .number({
        required_error: t("result_form.score_required"),
      })
      .min(0, t("result_form.score_min_error"))
      .max(100, t("result_form.score_max_error")),
  });

  return {
    validateResult,
  };
};

export default useResultValidation;
