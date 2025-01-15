import { z } from "zod";
import { useTranslation } from "react-i18next";

const useLessonValidation = () => {
  const { t } = useTranslation();

  const validateLesson = z.object({
    name: z.string({
      required_error: t("lesson_form.name_required"),
    }),
    class: z.string({
      required_error: t("lesson_form.class_required"),
    }),
    teacher: z.string({
      required_error: t("lesson_form.teacher_required"),
    }),
    subject: z.string({
      required_error: t("lesson_form.subject_required"),
    }),
    day: z.string({
      required_error: t("lesson_form.day_required"),
    }),
    startTime: z.string({
      required_error: t("lesson_form.startTime_required"),
    }),
    endTime: z.string({
      required_error: t("lesson_form.endTime_required"),
    }),
    status: z.string({
      required_error: t("lesson_form.status_required"),
    }),
  });

  return {
    validateLesson,
  };
};

export default useLessonValidation;
