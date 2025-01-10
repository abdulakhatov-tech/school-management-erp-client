import { z } from "zod";
import { useTranslation } from "react-i18next";

export const useUserValidation = () => {
  const { t } = useTranslation();

  const validateAdmin = z.object({
    fullName: z.string({ required_error: t("user_form.fullName_required") }),
    username: z.string({ required_error: t("user_form.username_required") }),
    password: z.string({ required_error: t("user_form.password_required") }),
    phoneNumber: z
      .string({
        required_error: t("user_form.phoneNumber_required"),
      })
      .regex(/^\+998\d{9}$/, {
        message: t("user_form.phoneNumber_invalid_format"),
      }),
    gender: z.string({ required_error: t("user_form.gender_required") }),
    birthday: z.string({ required_error: t("user_form.birthday_required") }),
    address: z.string({ required_error: t("user_form.address_required") }),
    profilePhoto: z
      .string({ required_error: t("user_form.profilePhoto_required") })
      .url({ message: t("user_form.invalid_profilePhoto") }),
    email: z
      .string()
      .email({
        message: t("user_form.invalid_email"),
      })
      .optional(),
  });

  const validateTeacher = z.object({
    fullName: z.string({ required_error: t("user_form.fullName_required") }),
    username: z.string({ required_error: t("user_form.username_required") }),
    password: z.string({ required_error: t("user_form.password_required") }),
    phoneNumber: z
      .string({
        required_error: t("user_form.phoneNumber_required"),
      })
      .regex(/^\+998\d{9}$/, {
        message: t("user_form.phoneNumber_invalid_format"),
      }),
    gender: z.string({ required_error: t("user_form.gender_required") }),
    birthday: z.string({ required_error: t("user_form.birthday_required") }),
    address: z.string({ required_error: t("user_form.address_required") }),
    profilePhoto: z
      .string({ required_error: t("user_form.profilePhoto_required") })
      .url({ message: t("user_form.invalid_profilePhoto") }),
    email: z
      .string()
      .email({
        message: t("user_form.invalid_email"),
      })
      .optional(),
  });

  const validateStudent = z.object({
    fullName: z.string({ required_error: t("user_form.fullName_required") }),
    username: z.string({ required_error: t("user_form.username_required") }),
    password: z.string({ required_error: t("user_form.password_required") }),
    phoneNumber: z
      .string({
        required_error: t("user_form.phoneNumber_required"),
      })
      .regex(/^\+998\d{9}$/, {
        message: t("user_form.phoneNumber_invalid_format"),
      }),
    gender: z.string({ required_error: t("user_form.gender_required") }),
    birthday: z.string({ required_error: t("user_form.birthday_required") }),
    address: z.string({ required_error: t("user_form.address_required") }),
    profilePhoto: z
      .string({ required_error: t("user_form.profilePhoto_required") })
      .url({ message: t("user_form.invalid_profilePhoto") }),
    email: z
      .string()
      .email({
        message: t("user_form.invalid_email"),
      })
      .optional(),
    class: z.string({
      required_error: t("user_form.class_required"),
    }),
  });

  const validateParent = z.object({
    fullName: z.string({ required_error: t("user_form.fullName_required") }),
    username: z.string({ required_error: t("user_form.username_required") }),
    password: z.string({ required_error: t("user_form.password_required") }),
    phoneNumber: z
      .string({
        required_error: t("user_form.phoneNumber_required"),
      })
      .regex(/^\+998\d{9}$/, {
        message: t("user_form.phoneNumber_invalid_format"),
      }),
    email: z
      .string()
      .email({
        message: t("user_form.invalid_email"),
      })
      .optional(),
    children: z
      .array(z.string(), {
        required_error: "users.validation.children",
      })
      .min(1, {
        message: "users.validation.children",
      }),
  });

  return {
    validateAdmin,
    validateParent,
    validateTeacher,
    validateStudent,
  };
};
