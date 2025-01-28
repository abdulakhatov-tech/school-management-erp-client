import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

import {
  InputField,
  SelectField,
  TextareaField,
  DatePickerField,
  ProfileUploadImageField,
} from "@/components/form";
import useMockData from "@/utils";
import { LoadingSpinner } from "@/tools";
import useProfilePageFeatures from "./features";
import { Button } from "@/components/ui/button";
import FormSubtitle from "@/components/form/subtitle";
import { useUserValidation } from "@/validations/users";

const Teachers: React.FC = () => {
  const {
    error,
    loading,
    handleCancel,
    initialValues,
    isFormChanged,
    handleFormSubmit,
    isTeacherDataLoading,
  } = useProfilePageFeatures();
  const { t } = useTranslation();
  const { validateTeacherProfile } = useUserValidation();

  const { admin_status_options } = useMockData();

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateTeacherProfile)}
    >
      {(props: any) => {
        const formChanged = isFormChanged(props.values);
        return (
          <Form className='pt-6' autoComplete='true'>
            <div className='grid grid-cols-[auto_1fr] gap-10 px-4'>
              <div className='flex justify-center'>
                <ProfileUploadImageField
                  name='profilePhoto'
                  label={t("user_form.profilePhoto")}
                  loading={isTeacherDataLoading}
                />
              </div>
              <div className='flex flex-col gap-4'>
                <FormSubtitle>{t("user_form.user_login_info")}</FormSubtitle>

                <div className='grid md:grid-cols-2 gap-4'>
                  <InputField
                    type='text'
                    name='username'
                    label={t("user_form.username")}
                    placeholder={t("user_form.enter_your_username")}
                    loading={isTeacherDataLoading}
                  />

                  <InputField
                    type='password'
                    name='password'
                    label={t("user_form.password")}
                    placeholder={t("user_form.enter_your_password")}
                    loading={isTeacherDataLoading}
                  />
                </div>

                <FormSubtitle>{t("user_form.user_info")}</FormSubtitle>

                <div className='grid md:grid-cols-2 gap-4'>
                  <InputField
                    type='text'
                    name='fullName'
                    label={t("user_form.fullName")}
                    placeholder={t("user_form.enter_your_fullName")}
                    loading={isTeacherDataLoading}
                  />

                  <InputField
                    type='text'
                    name='phoneNumber'
                    label={t("user_form.phoneNumber") + " (+9989)"}
                    placeholder={t("user_form.enter_your_phoneNumber")}
                    loading={isTeacherDataLoading}
                  />

                  <InputField
                    type='email'
                    name='email'
                    label={t("user_form.email")}
                    placeholder={t("user_form.enter_your_email")}
                    loading={isTeacherDataLoading}
                  />

                  <SelectField
                    name='gender'
                    label={t("user_form.gender")}
                    value={props.values.gender}
                    disabled={true}
                    options={[
                      { label: t("user_form.male"), value: "male" },
                      { label: t("user_form.female"), value: "female" },
                    ]}
                    placeholder={t("user_form.select_your_gender")}
                    loading={isTeacherDataLoading}
                  />

                  <DatePickerField
                    name='birthday'
                    label={t("user_form.birthday")}
                    placeholder={t("user_form.enter_your_birthday")}
                    loading={isTeacherDataLoading}
                  />

                  <InputField
                    type='text'
                    name='address'
                    label={t("user_form.address")}
                    // placeholder={t("user_form.enter_your_address")}
                    placeholder='Beruniy 29, Navruz, Zafarabad, Djizak, Uzbekistan'
                    loading={isTeacherDataLoading}
                  />
                </div>
                <SelectField
                  name='status'
                  disabled={true}
                  label={t("user_form.status")}
                  options={admin_status_options}
                  placeholder={t("user_form.select_status")}
                  value={props.values.status}
                  loading={isTeacherDataLoading}
                />

                <TextareaField
                  name='bio'
                  label={t("user_form.bio")}
                  placeholder={t("user_form.enter_your_bio")}
                  loading={isTeacherDataLoading}
                  rows={6}
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

                <div className='flex items-center gap-4 justify-end'>
                  <Button
                    onClick={() => handleCancel(props.resetForm)}
                    size='sm'
                    className={classNames("mt-2 px-10", {
                      "button-error": !!error,
                    })}
                    disabled={loading || !formChanged}
                  >
                    {loading ? <LoadingSpinner /> : t("button.cancel")}
                  </Button>

                  <Button
                    type='submit'
                    size='sm'
                    className={classNames("mt-2 px-10", {
                      "button-error": !!error,
                    })}
                    disabled={loading || !formChanged}
                  >
                    {loading ? <LoadingSpinner /> : t("button.save")}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Teachers;
