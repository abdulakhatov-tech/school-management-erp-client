import React from "react";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import useSubjectFormFeatures from "./features";
import { useAppSelector } from "@/hooks/useRedux";
import useSubjectValidation from "@/validations/subject";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  InputField,
  SelectField,
  TextareaField,
  UploadImageField,
} from "@/components/form";
import useMockData from "@/utils";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { LoadingSpinner } from "@/tools";

const SubjectForm: React.FC = () => {
  const {
    error,
    loading,
    initialValues,
    isFormChanged,
    handleFormSubmit,
    isSubjectDataLoading,
  } = useSubjectFormFeatures();
  const { t } = useTranslation();
  const { subject_status_options } = useMockData();
  const { validateSubject } = useSubjectValidation();
  const { actionType } = useAppSelector((state) => state.subjectFormModal);

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateSubject)}
    >
      {(props: any) => {
        const formChanged = isFormChanged(props.values);

        return (
          <Form className='flex flex-col gap-4' autoComplete='true'>
            <InputField
              type='text'
              name='name'
              label={t("subject_form.name")}
              placeholder={t("subject_form.select_name")}
              loading={isSubjectDataLoading && actionType === "edit"}
            />

            <TextareaField
              name='description'
              label={t("subject_form.description")}
              placeholder={t("subject_form.enter_description")}
              rows={5}
              loading={isSubjectDataLoading && actionType === "edit"}
            />

            <SelectField
              name='status'
              label={t("lesson_form.status")}
              options={subject_status_options}
              placeholder={t("lesson_form.select_status")}
              value={props.values.status}
              loading={isSubjectDataLoading && actionType === "edit"}
            />

            <UploadImageField
              name='imgUrl'
              label={t("subject_form.imgUrl")}
              loading={isSubjectDataLoading && actionType === "edit"}
            />

            {props.touched.name ||
              props.touched.description ||
              props.touched.imgUrl ||
              props.touched.status ||
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

export default SubjectForm;
