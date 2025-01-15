import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

import useMockData from "@/utils";
import { LoadingSpinner } from "@/tools";
import useLessonFormFeatures from "./features";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import useLessonValidation from "@/validations/lesson";
import { InputField, SelectField } from "@/components/form";

const LessonForm: React.FC = () => {
  const {
    error,
    loading,
    initialValues,
    isFormChanged,
    handleFormSubmit,
    classOptions,
    isClassDataLoading,
    teacherOptions,
    isTeacherDataLoading,
    subjectOptions,
    isSubjectDataLoading,
    isLessonDataLoading,
  } = useLessonFormFeatures();
  const { t } = useTranslation();
  const { validateLesson } = useLessonValidation();
  const { week_days, lesson_status_options } = useMockData();
  const { actionType } = useAppSelector((state) => state.lessonFormModal);

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateLesson)}
    >
      {(props: any) => {
        const formChanged = isFormChanged(props.values);

        return (
          <Form className='flex flex-col gap-4' autoComplete='true'>
            <InputField
              type='text'
              name='name'
              label={t("lesson_form.name")}
              placeholder={t("lesson_form.select_name")}
              loading={isLessonDataLoading && actionType === "edit"}
            />

            <div className='grid md:grid-cols-2 gap-4'>
              <SelectField
                name='class'
                label={t("lesson_form.class")}
                options={classOptions}
                placeholder={t("lesson_form.select_class")}
                value={props.values.class}
                loading={
                  (isLessonDataLoading || isClassDataLoading) &&
                  actionType === "edit"
                }
                searchable
              />

              <SelectField
                name='teacher'
                label={t("lesson_form.teacher")}
                options={teacherOptions}
                placeholder={t("lesson_form.select_teacher")}
                value={props.values.teacher}
                loading={
                  (isLessonDataLoading || isTeacherDataLoading) &&
                  actionType === "edit"
                }
                searchable
              />

              <SelectField
                name='subject'
                label={t("lesson_form.subject")}
                options={subjectOptions}
                placeholder={t("lesson_form.select_subject")}
                value={props.values.subject}
                loading={
                  (isLessonDataLoading || isSubjectDataLoading) &&
                  actionType === "edit"
                }
                searchable
              />

              <SelectField
                name='day'
                label={t("lesson_form.day")}
                options={week_days}
                placeholder={t("lesson_form.select_day")}
                value={props.values.day}
                loading={isLessonDataLoading && actionType === "edit"}
              />

              <InputField
                type='time'
                name='startTime'
                label={t("lesson_form.startTime")}
                placeholder={t("lesson_form.startTime")}
                loading={isLessonDataLoading && actionType === "edit"}
              />
              <InputField
                type='time'
                name='endTime'
                label={t("lesson_form.endTime")}
                placeholder={t("lesson_form.endTime")}
                loading={isLessonDataLoading && actionType === "edit"}
              />
            </div>

            <SelectField
              name='status'
              label={t("lesson_form.status")}
              options={lesson_status_options}
              placeholder={t("lesson_form.select_status")}
              value={props.values.status}
              loading={isLessonDataLoading && actionType === "edit"}
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

export default LessonForm;
