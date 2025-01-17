import { z } from "zod";
import { useTranslation } from "react-i18next";

const useSubjectValidation = () => {
  const { t } = useTranslation();

  const validateSubject = z.object({
    name: z.string({
      required_error: t("subject_form.name"),
    }),
    imgUrl: z
      .string({ required_error: t("subject_form.imgUrl_required") })
      .url({ message: t("subject_form.invalid_imgUrl") }),
    description: z.string({
      required_error: t("subject_form.description_required"),
    }),
    status: z.string({ required_error: t("subject_form.status") }),
  });

  return {
    validateSubject,
  };
};

export default useSubjectValidation;
