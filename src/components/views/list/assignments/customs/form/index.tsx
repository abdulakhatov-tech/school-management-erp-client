import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

import {
  DateField,
  SelectField,
  TextareaField,
} from "@/components/form";
import { LoadingSpinner } from "@/tools";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import useAssignmentFormFeatures from "./features";
import useAssignmentValidation from "@/validations/assignment";

const AssignmentForm: React.FC = () => {
  const { t } = useTranslation();
  const { validateAssignment } = useAssignmentValidation();
  const { actionType } = useAppSelector((state) => state.assignmentFormModal);
  const {
    error,
    loading,
    isFormChanged,
    initialValues,
    lesson_options,
    isLessonsDataLoading,
    isAssignmentDataLoading,
    handleFormSubmit,
  } = useAssignmentFormFeatures();

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateAssignment)}
    >
      {(props: any) => {
        const formChanged = isFormChanged(props.values);

        return (
          <Form className='flex flex-col gap-4' autoComplete='true'>
            <TextareaField
              name='name'
              label={t("subject_form.name")}
              placeholder={t("assignment_form.enter_name")}
              rows={7}
              loading={isAssignmentDataLoading && actionType === "edit"}
            />

            <SelectField
              name='lesson'
              label={t("assignment_form.lesson")}
              options={lesson_options}
              placeholder={t("assignment_form.select_lesson")}
              value={props.values.lesson}
              loading={
                isAssignmentDataLoading ||
                (isLessonsDataLoading && actionType === "edit")
              }
            />

            <DateField
              name='startDate'
              label={t("assignment_form.startDate")}
              placeholder={t("assignment_form.enter_your_startDate")}
              loading={isAssignmentDataLoading && actionType === "edit"}
            />

            <DateField
              name='dueDate'
              label={t("assignment_form.dueDate")}
              placeholder={t("assignment_form.enter_your_dueDate")}
              loading={isAssignmentDataLoading && actionType === "edit"}
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

export default AssignmentForm;
