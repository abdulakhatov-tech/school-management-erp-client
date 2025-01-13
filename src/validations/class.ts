import { z } from "zod";
import { useTranslation } from "react-i18next";

const useClassValidation = () => {
  const { t } = useTranslation();

  const validateClass = z.object({
    name: z.string({
      required_error: t("class_form.name_required"),
    }),
    status: z.string({
      required_error: t("class_form.status_required"),
    }),
    teacher: z.string({
      required_error: t("class_form.teacher_required"),
    }),
    room: z.string({
      required_error: t("class_form.room_required"),
    }),
  });

  return {
    validateClass,
  };
};

export default useClassValidation;
