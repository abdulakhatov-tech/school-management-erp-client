import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

import {
  DateField,
  InputField,
  SelectField,
  UploadImageField,
} from "@/components/form";
import { LoadingSpinner } from "@/tools";
import useAdminsFormFeatures from "./features";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import FormSubtitle from "@/components/form/subtitle";
import { useUserValidation } from "@/validations/users";
import useMockData from "@/utils";

const AdminForm: React.FC = () => {
  const {
    loading,
    error,
    initialValues,
    handleFormSubmit,
    isAdminDataLoading,
    isFormChanged,
  } = useAdminsFormFeatures();
  const { t } = useTranslation();
  const { validateAdmin } = useUserValidation();
  const { admin_status_options } = useMockData();
  const { actionType } = useAppSelector((state) => state.userFormModal);

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateAdmin)}
    >
      {(props: any) => {
        const formChanged = isFormChanged(props.values);

        return (
          <Form className='flex flex-col gap-4' autoComplete='true'>
            <FormSubtitle>{t("user_form.user_login_info")}</FormSubtitle>

            <div className='grid md:grid-cols-2 gap-4'>
              <InputField
                type='text'
                name='username'
                label={t("user_form.username")}
                placeholder={t("user_form.enter_your_username")}
                loading={isAdminDataLoading && actionType === "edit"}
              />

              <InputField
                type='password'
                name='password'
                label={t("user_form.password")}
                placeholder={t("user_form.enter_your_password")}
                loading={isAdminDataLoading && actionType === "edit"}
              />
            </div>

            <FormSubtitle>{t("user_form.user_info")}</FormSubtitle>

            <div className='grid md:grid-cols-2 gap-4'>
              <InputField
                type='text'
                name='fullName'
                label={t("user_form.fullName")}
                placeholder={t("user_form.enter_your_fullName")}
                loading={isAdminDataLoading && actionType === "edit"}
              />

              <InputField
                type='text'
                name='phoneNumber'
                label={t("user_form.phoneNumber") + " (+9989)"}
                placeholder={t("user_form.enter_your_phoneNumber")}
                loading={isAdminDataLoading && actionType === "edit"}
              />

              <InputField
                type='email'
                name='email'
                label={t("user_form.email")}
                placeholder={t("user_form.enter_your_email")}
                loading={isAdminDataLoading && actionType === "edit"}
              />

              <SelectField
                name='gender'
                label={t("user_form.gender")}
                value={props.values.gender}
                options={[
                  { label: t("user_form.male"), value: "male" },
                  { label: t("user_form.female"), value: "female" },
                ]}
                placeholder={t("user_form.select_your_gender")}
                loading={isAdminDataLoading && actionType === "edit"}
              />

              <DateField
                name='birthday'
                label={t("user_form.birthday")}
                placeholder={t("user_form.enter_your_birthday")}
                loading={isAdminDataLoading && actionType === "edit"}
              />

              <InputField
                type='text'
                name='address'
                label={t("user_form.address")}
                // placeholder={t("user_form.enter_your_address")}
                placeholder='Beruniy 29, Navruz, Zafarabad, Djizak, Uzbekistan'
                loading={isAdminDataLoading && actionType === "edit"}
              />
            </div>

            <SelectField
                name='status'
                label={t("user_form.status")}
                options={admin_status_options}
                placeholder={t("user_form.select_status")}
                 value={props.values.status}
                loading={isAdminDataLoading && actionType === "edit"}
              />

            <UploadImageField
              name='profilePhoto'
              label={t("user_form.profilePhoto")}
              loading={isAdminDataLoading && actionType === "edit"}
            />

            {props.touched.fullName ||
              props.touched.username ||
              props.touched.password ||
              props.touched.phoneNumber ||
              props.touched.gender ||
              props.touched.birthday ||
              props.touched.address ||
              props.touched.profilePhoto ||
              props.touched.email ||
              (error && <span className='error mx-auto'>{error}</span>)}

            <Button
              type='submit'
              size='sm'
              className={classNames("mt-2", {
                "button-error": !!error,
              })}
              disabled={loading || (actionType === "edit" && !formChanged)}
            >
              {loading ? (
                <LoadingSpinner />
              ) : actionType === "edit" ? (
                t("button.update")
              ) : (
                t("button.submit")
              )}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdminForm;
