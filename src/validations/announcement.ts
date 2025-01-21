import { z } from "zod";
import { useTranslation } from "react-i18next";

const useAnnouncementValidation = () => {
  const { t } = useTranslation();

  const validateAnnouncement = z.object({
    name: z.string({
      required_error: t("announcement_form.name_required"),
    }),
    description: z.string({
      required_error: t("announcement_form.description_required"),
    }),
    date: z.date({
      required_error: t("announcement_form.date_required"),
    }),
    class: z.string({
      required_error: t("announcement_form.class_required"),
    }),
    status: z.string({
      required_error: t("announcement_form.status_required"),
    }),
  });

  return {
    validateAnnouncement,
  };
};

export default useAnnouncementValidation;
