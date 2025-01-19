import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { LoadingSpinner } from "@/tools";
import useResultFormFeatures from "./features";
import { Button } from "@/components/ui/button";
import useResultValidation from "@/validations/result";
import { InputField, TextareaField } from "@/components/form";
import { useAppSelector } from "@/hooks/useRedux";

const ResultForm: React.FC = () => {
  const { t } = useTranslation();
  const { actionType } = useAppSelector((state) => state.resultFormModal);
  const { validateResult } = useResultValidation();
  const { error, loading, handleFormSubmit, initialValues, isFormChanged } =
    useResultFormFeatures();

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateResult)}
    >
      {(props: any) => {
        const formChanged = isFormChanged(props.values);

        return (
          <Form className='flex flex-col gap-4' autoComplete='true'>
            <TextareaField
              name='description'
              label={t("result_form.description")}
              placeholder={t("result_form.enter_description")}
              rows={7}
              value={props.values.description}
              // loading={isAssignmentDataLoading && actionType === "edit"}
            />

            <InputField
              type='number'
              name='score'
              label={t("result_form.score")}
              placeholder={t("result_form.score")}
              // loading={isLessonDataLoading && actionType === "edit"}
            />

            {props.touched.description ||
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

export default ResultForm;
