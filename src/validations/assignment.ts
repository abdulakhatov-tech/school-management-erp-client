import { z } from "zod";
import { useTranslation } from "react-i18next";

const useAssignmentValidation = () => {
  const { t } = useTranslation();

  const validateAssignment = z.object({
    name: z.string({
      required_error: t("assignment_form.name_required"),
    }),
    lesson: z.string({
      required_error: t("assignment_form.lesson_required"),
    }),
    startDate: z.string({
      required_error: t("assignment_form.startDate_required"),
    }),
    dueDate: z.string({
      required_error: t("assignment_form.dueDate_required"),
    }),
  });

  return {
    validateAssignment,
  };
};

export default useAssignmentValidation;
