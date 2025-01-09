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
import useMockData from "@/utils";
import { LoadingSpinner } from "@/tools";
import useAdminsFormFeatures from "./features";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import FormSubtitle from "@/components/form/subtitle";
import { useUserValidation } from "@/validations/users";

const StudentForm: React.FC = () => {
  const {
    loading,
    error,
    initialValues,
    handleFormSubmit,
    isStudentDataLoading,
    isFormChanged,
    classOptions,
    isClassesDataLoading,
  } = useAdminsFormFeatures();
  const { t } = useTranslation();
  const { validateStudent } = useUserValidation();
  const { student_status_option } = useMockData();
  const { actionType } = useAppSelector((state) => state.userFormModal);

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateStudent)}
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
                loading={isStudentDataLoading && actionType === "edit"}
              />

              <InputField
                type='password'
                name='password'
                label={t("user_form.password")}
                placeholder={t("user_form.enter_your_password")}
                loading={isStudentDataLoading && actionType === "edit"}
              />
            </div>

            <FormSubtitle>{t("user_form.user_info")}</FormSubtitle>

            <div className='grid md:grid-cols-2 gap-4'>
              <InputField
                type='text'
                name='fullName'
                label={t("user_form.fullName")}
                placeholder={t("user_form.enter_your_fullName")}
                loading={isStudentDataLoading && actionType === "edit"}
              />

              <InputField
                type='text'
                name='phoneNumber'
                label={t("user_form.phoneNumber") + " (+9989)"}
                placeholder={t("user_form.enter_your_phoneNumber")}
                loading={isStudentDataLoading && actionType === "edit"}
              />

              <InputField
                type='email'
                name='email'
                label={t("user_form.email")}
                placeholder={t("user_form.enter_your_email")}
                loading={isStudentDataLoading && actionType === "edit"}
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
                loading={isStudentDataLoading && actionType === "edit"}
              />

              <DateField
                name='birthday'
                label={t("user_form.birthday")}
                placeholder={t("user_form.enter_your_birthday")}
                loading={isStudentDataLoading && actionType === "edit"}
              />

              <InputField
                type='text'
                name='address'
                label={t("user_form.address")}
                // placeholder={t("user_form.enter_your_address")}
                placeholder='Beruniy 29, Navruz, Zafarabad, Djizak, Uzbekistan'
                loading={isStudentDataLoading && actionType === "edit"}
              />

              <SelectField
                name='class'
                label={t("user_form.class")}
                options={classOptions}
                placeholder={t("user_form.select_class")}
                value={props.values.class}
                loading={isClassesDataLoading && actionType === "edit"}
              />

              <SelectField
                name='status'
                label={t("user_form.status")}
                options={student_status_option}
                placeholder={t("user_form.select_status")}
                value={props.values.status}
                loading={isStudentDataLoading && actionType === "edit"}
              />
            </div>

            <UploadImageField
              name='profilePhoto'
              label={t("user_form.profilePhoto")}
              loading={isStudentDataLoading && actionType === "edit"}
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

export default StudentForm;
