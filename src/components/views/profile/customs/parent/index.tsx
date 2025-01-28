import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

import {
  InputField,
  SelectField,
  TextareaField,
  ProfileUploadImageField,
  MultiSelectField,
} from "@/components/form";
import useMockData from "@/utils";
import { LoadingSpinner } from "@/tools";
import useProfilePageFeatures from "./features";
import { Button } from "@/components/ui/button";
import FormSubtitle from "@/components/form/subtitle";
import { useUserValidation } from "@/validations/users";
import { IStudent } from "@/interfaces/user";

const Parents: React.FC = () => {
  const {
    error,
    loading,
    handleCancel,
    initialValues,
    isFormChanged,
    handleFormSubmit,
    isParentDataLoading,
  } = useProfilePageFeatures();
  const { t } = useTranslation();
  const { validateParent } = useUserValidation();

  const { parent_status_options } = useMockData();

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateParent)}
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
                  loading={isParentDataLoading}
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
                    loading={isParentDataLoading}
                  />

                  <InputField
                    type='password'
                    name='password'
                    label={t("user_form.password")}
                    placeholder={t("user_form.enter_your_password")}
                    loading={isParentDataLoading}
                  />
                </div>

                <FormSubtitle>{t("user_form.user_info")}</FormSubtitle>

                <div className='grid md:grid-cols-2 gap-4'>
                  <InputField
                    type='text'
                    name='fullName'
                    label={t("user_form.fullName")}
                    placeholder={t("user_form.enter_your_fullName")}
                    loading={isParentDataLoading}
                  />

                  <InputField
                    type='text'
                    name='phoneNumber'
                    label={t("user_form.phoneNumber") + " (+9989)"}
                    placeholder={t("user_form.enter_your_phoneNumber")}
                    loading={isParentDataLoading}
                  />

                  <InputField
                    type='email'
                    name='email'
                    label={t("user_form.email")}
                    placeholder={t("user_form.enter_your_email")}
                    loading={isParentDataLoading}
                  />

                  <InputField
                    type='email'
                    name='children'
                    label={t("user_form.children")}
                    placeholder={t("user_form.enter_your_children")}
                    value={props.values?.children?.map(
                      (item: IStudent) => `${item.fullName}`
                    )}
                    loading={isParentDataLoading}
                    disabled={true}
                  />
                </div>
                <SelectField
                  name='status'
                  disabled={true}
                  label={t("user_form.status")}
                  options={parent_status_options}
                  placeholder={t("user_form.select_status")}
                  value={props.values.status}
                  loading={isParentDataLoading}
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

export default Parents;
