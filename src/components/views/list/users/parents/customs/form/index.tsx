import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

import {
  InputField,
  SelectField,
  MultiSelectField,
} from "@/components/form";
import useMockData from "@/utils";
import { LoadingSpinner } from "@/tools";
import useAdminsFormFeatures from "./features";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import FormSubtitle from "@/components/form/subtitle";
import { useUserValidation } from "@/validations/users";

const ParentsForm: React.FC = () => {
  const {
    error,
    loading,
    initialValues,
    isFormChanged,
    studentOptions,
    handleFormSubmit,
    isParentDataLoading,
    isStudentsDataLoading,
  } = useAdminsFormFeatures();
  const { t } = useTranslation();
  const { validateParent } = useUserValidation();
  const { parent_status_options } = useMockData();
  const { actionType } = useAppSelector((state) => state.userFormModal);

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
          <Form className='flex flex-col gap-4' autoComplete='true'>
            <FormSubtitle>{t("user_form.user_login_info")}</FormSubtitle>

            <div className='grid md:grid-cols-2 gap-4'>
              <InputField
                type='text'
                name='username'
                label={t("user_form.username")}
                placeholder={t("user_form.enter_your_username")}
                loading={isParentDataLoading && actionType === "edit"}
              />

              <InputField
                type='password'
                name='password'
                label={t("user_form.password")}
                placeholder={t("user_form.enter_your_password")}
                loading={isParentDataLoading && actionType === "edit"}
              />
            </div>

            <FormSubtitle>{t("user_form.user_info")}</FormSubtitle>

            <div className='grid md:grid-cols-2 gap-4'>
              <InputField
                type='text'
                name='fullName'
                label={t("user_form.fullName")}
                placeholder={t("user_form.enter_your_fullName")}
                loading={isParentDataLoading && actionType === "edit"}
              />

              <InputField
                type='text'
                name='phoneNumber'
                label={t("user_form.phoneNumber") + " (+9989)"}
                placeholder={t("user_form.enter_your_phoneNumber")}
                loading={isParentDataLoading && actionType === "edit"}
              />

              <InputField
                type='email'
                name='email'
                label={t("user_form.email")}
                placeholder={t("user_form.enter_your_email")}
                loading={isParentDataLoading && actionType === "edit"}
              />

              <MultiSelectField
                name='children'
                options={studentOptions}
                label={t("user_form.children")}
                placeholder={t("user_form.select_children")}
                loading={isStudentsDataLoading && actionType === "edit"}
              />
            </div>
            <SelectField
              name='status'
              label={t("user_form.status")}
              options={parent_status_options}
              placeholder={t("user_form.select_status")}
              value={props.values.status}
              loading={isParentDataLoading && actionType === "edit"}
            />

            {props.touched.fullName ||
              props.touched.username ||
              props.touched.password ||
              props.touched.phoneNumber ||
              props.touched.email ||
              props.touched.children ||
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

export default ParentsForm;
