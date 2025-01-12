import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import useClassValidation from "@/validations/class";
import { toFormikValidationSchema } from "zod-formik-adapter";

import useMockData from "@/utils";
import { LoadingSpinner } from "@/tools";
import useClassFormFeatures from "./features";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import { InputField, SelectField } from "@/components/form";

const ClassForm: React.FC = () => {
  const { t } = useTranslation();
  const { validateClass } = useClassValidation();
  const { class_status_options, grade_options } = useMockData();
  const { actionType } = useAppSelector((state) => state.classFormModal);
  const {
    error,
    loading,
    initialValues,
    isFormChanged,
    rooms_options,
    handleFormSubmit,
    teachers_options,
    isClassDataLoading,
    isRoomsDataLoading,
    isTeachersDataLoading,
  } = useClassFormFeatures();

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateClass)}
    >
      {(props: any) => {
        const formChanged = isFormChanged(props.values);

        return (
          <Form className='flex flex-col gap-4' autoComplete='true'>
            <div className='grid md:grid-cols-2 gap-4'>
              <InputField
                type='text'
                name='name'
                label={t("class_form.name")}
                placeholder={t("class_form.enter_name")}
                loading={isClassDataLoading && actionType === "edit"}
              />

              <SelectField
                name='grade'
                label={t("class_form.grade")}
                options={grade_options}
                placeholder={t("class_form.select_grade")}
                value={props.values.grade}
                loading={isClassDataLoading && actionType === "edit"}
              />

              <SelectField
                name='room'
                label={t("class_form.room")}
                options={rooms_options}
                placeholder={t("class_form.select_room")}
                value={props.values.room}
                loading={isRoomsDataLoading && actionType === "edit"}
              />

              <SelectField
                name='teacher'
                label={t("class_form.teacher")}
                options={teachers_options}
                placeholder={t("class_form.select_teacher")}
                value={props.values.teacher}
                loading={isTeachersDataLoading && actionType === "edit"}
                searchable={true}
              />
            </div>

            <SelectField
              name='status'
              label={t("class_form.status")}
              options={class_status_options}
              placeholder={t("class_form.select_status")}
              value={props.values.status}
                loading={isClassDataLoading && actionType === "edit"}
            />

            {props.touched.name ||
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

export default ClassForm;
