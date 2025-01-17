import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { LoadingSpinner } from "@/tools";
import useExamFormFeatures from "./features";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import useExamValidation from "@/validations/exams";
import { InputField, SelectField } from "@/components/form";

const ExamForm: React.FC = () => {
  const { t } = useTranslation();
  const { validateExam } = useExamValidation();
  const { actionType } = useAppSelector((state) => state.examFormModal);
  const {
    error,
    loading,
    isFormChanged,
    initialValues,
    lesson_options,
    isExamDataLoading,
    isLessonsDataLoading,
    handleFormSubmit,
  } = useExamFormFeatures();

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateExam)}
    >
      {(props: any) => {
        const formChanged = isFormChanged(props.values);

        return (
          <Form className='flex flex-col gap-4' autoComplete='true'>
            <InputField
              type='text'
              name='name'
              label={t("exam_form.name")}
              placeholder={t("exam_form.enter_name")}
              loading={isExamDataLoading && actionType === "edit"}
            />

            <SelectField
              name='lesson'
              label={t("exam_form.lesson")}
              options={lesson_options}
              placeholder={t("exam_form.select_lesson")}
              value={props.values.lesson}
              loading={isExamDataLoading || isLessonsDataLoading && actionType === "edit"}
            />

            <InputField
              type='time'
              name='startTime'
              label={t("exam_form.startTime")}
              placeholder={t("exam_form.startTime")}
              loading={isExamDataLoading && actionType === "edit"}
            />

            <InputField
              type='time'
              name='endTime'
              label={t("exam_form.endTime")}
              placeholder={t("exam_form.endTime")}
              loading={isExamDataLoading && actionType === "edit"}
            />

            {props.touched.name ||
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

export default ExamForm;
