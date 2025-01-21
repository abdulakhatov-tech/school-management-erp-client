import { z } from "zod";
import { useTranslation } from "react-i18next";

const useEventValidation = () => {
  const { t } = useTranslation();

  const validateEvent = z.object({
    name: z.string({
      required_error: t("event_form.name_required"),
    }),
    description: z.string({
      required_error: t("event_form.description_required"),
    }),
    startDate: z.date({
      required_error: t("event_form.startDate_required"),
    }),
    endDate: z.date({
      required_error: t("event_form.endDate_required"),
    }),
    class: z.string({
      required_error: t("event_form.class_required"),
    }),
    status: z.string({
      required_error: t("event_form.status_required"),
    }),
  });

  return {
    validateEvent,
  };
};

export default useEventValidation;
