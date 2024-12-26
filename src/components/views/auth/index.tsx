// External imports
import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

// Internal imports
import useAuthFeatures from "./features";
import { LoadingSpinner } from "@/tools";
import { Button } from "@/components/ui/button";
import { AuthAction, AuthHeader } from "./customs";
import { useAuthValidation } from "@/validations/auth";
import { CheckboxField, InputField } from "@/components/form";

const AuthPageView: React.FC = () => {
  const { t } = useTranslation();
  const { validateAuth } = useAuthValidation();
  const { error, loading, initialValues, handleFormSubmit } = useAuthFeatures();

  return (
    <div className='min-h-screen center relative'>
      {/* ------------------ Auth Actions ------------------ */}
      <AuthAction />

      <div className='relative z-20 w-[85%] sm:w-[400px]'>
        {/* ------------------ Auth Header ------------------ */}
        <AuthHeader />

        {/* ------------------ Auth Form ------------------ */}
        <Formik
          enableReinitialize
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(validateAuth)}
        >
          {(props) => (
            <Form className='flex flex-col gap-4' autoComplete='true'>
              <InputField
                label={t("auth.username")}
                name='username'
                type='text'
                placeholder={t("auth.enter_your_username")}
              />

              <InputField
                label={t("auth.password")}
                name='password'
                type='password'
                placeholder={t("auth.enter_your_password")}
              />

              <CheckboxField label={t("auth.rememberMe")} name='rememberMe' />

              {props.touched.username ||
                props.touched.password ||
                (error && <span className='error mx-auto'>{error}</span>)}

              <Button
                type='submit'
                size='sm'
                className={classNames({
                  "button-error": error,
                })}
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : t("auth.sign_in")}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthPageView;
