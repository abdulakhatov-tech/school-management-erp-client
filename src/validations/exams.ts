import { z } from "zod";
import { useTranslation } from "react-i18next";

const useExamValidation = () => {
  const { t } = useTranslation();

  const validateExam = z.object({
    name: z.string({
      required_error: t("exam_form.name_required"),
    }),
    lesson: z.string({
      required_error: t("exam_form.lesson_required"),
    }),
    startTime: z.string({
      required_error: t("exam_form.startTime_required"),
    }),
    endTime: z.string({
      required_error: t("exam_form.endTime_required"),
    }),
  });

  return {
    validateExam,
  };
};

export default useExamValidation;
