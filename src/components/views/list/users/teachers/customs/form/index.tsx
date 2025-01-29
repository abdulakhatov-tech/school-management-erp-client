import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

import useMockData from "@/utils";
import { LoadingSpinner } from "@/tools";
import { Button } from "@/components/ui/button";
import useTeachersFormFeatures from "./features";
import { useAppSelector } from "@/hooks/useRedux";
import FormSubtitle from "@/components/form/subtitle";
import { useUserValidation } from "@/validations/users";
import {
  DatePickerField,
  InputField,
  MultiSelectField,
  SelectField,
  UploadImageField,
} from "@/components/form";

const TeacherForm: React.FC = () => {
  const {
    error,
    loading,
    initialValues,
    isFormChanged,
    handleFormSubmit,
    isTeacherDataLoading,
    classOptions,
    isClassesDataLoading,
    subjectOptions,
    isSubjectsDataLoading,
  } = useTeachersFormFeatures();
  const { t } = useTranslation();
  const { admin_status_options } = useMockData();
  const { validateTeacher } = useUserValidation();
  const { actionType } = useAppSelector((state) => state.userFormModal);

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateTeacher)}
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
                loading={isTeacherDataLoading && actionType === "edit"}
              />

              <InputField
                type='password'
                name='password'
                label={t("user_form.password")}
                placeholder={t("user_form.enter_your_password")}
                loading={isTeacherDataLoading && actionType === "edit"}
              />
            </div>

            <FormSubtitle>{t("user_form.user_info")}</FormSubtitle>

            <div className='grid md:grid-cols-2 gap-4'>
              <InputField
                type='text'
                name='fullName'
                label={t("user_form.fullName")}
                placeholder={t("user_form.enter_your_fullName")}
                loading={isTeacherDataLoading && actionType === "edit"}
              />

              <InputField
                type='text'
                name='phoneNumber'
                label={t("user_form.phoneNumber") + " (+9989)"}
                placeholder={t("user_form.enter_your_phoneNumber")}
                loading={isTeacherDataLoading && actionType === "edit"}
              />

              <InputField
                type='email'
                name='email'
                label={t("user_form.email")}
                placeholder={t("user_form.enter_your_email")}
                loading={isTeacherDataLoading && actionType === "edit"}
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
                loading={isTeacherDataLoading && actionType === "edit"}
              />

              <DatePickerField  name='birthday'
                label={t("user_form.birthday")}
                placeholder={t("user_form.select_your_birthday")}
                loading={isTeacherDataLoading && actionType === "edit"} />

              <InputField
                type='text'
                name='address'
                label={t("user_form.address")}
                // placeholder={t("user_form.enter_your_address")}
                placeholder='Beruniy 29, Navruz, Zafarabad, Djizak, Uzbekistan'
                loading={isTeacherDataLoading && actionType === "edit"}
              />

              <MultiSelectField
                name='subjects'
                label={t("user_form.subjects")}
                options={subjectOptions}
                placeholder={t("user_form.select_your_subjects")}
                loading={
                  (isTeacherDataLoading || isSubjectsDataLoading) &&
                  actionType === "edit"
                }
              />

              <SelectField
                name='primaryClass'
                label={t("user_form.primaryClass")}
                options={classOptions}
                placeholder={t("user_form.select_primary_class")}
                value={props.values.primaryClass}
                loading={
                  (isTeacherDataLoading || isClassesDataLoading) &&
                  actionType === "edit"
                }
              />

              <MultiSelectField
                name='assignedClasses'
                label={t("user_form.assignedClasses")}
                options={classOptions}
                placeholder={t("user_form.select_assigned_classes")}
                loading={
                  (isTeacherDataLoading || isClassesDataLoading) &&
                  actionType === "edit"
                }
              />

              <SelectField
                name='status'
                label={t("user_form.status")}
                options={admin_status_options}
                placeholder={t("user_form.select_status")}
                value={props.values.status}
                loading={isTeacherDataLoading && actionType === "edit"}
              />
            </div>

            <UploadImageField
              name='profilePhoto'
              label={t("user_form.profilePhoto")}
              loading={isTeacherDataLoading && actionType === "edit"}
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

export default TeacherForm;
