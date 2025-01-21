import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

import {
  InputField,
  SelectField,
  TextareaField,
  DateTimePickerField,
} from "@/components/form";
import useMockData from "@/utils";
import { LoadingSpinner } from "@/tools";
import useEventFormFeatures from "./features";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import useEventValidation from "@/validations/event";

const EventForm: React.FC = () => {
  const {
    error,
    loading,
    classOptions,
    isFormChanged,
    initialValues,
    handleFormSubmit,
    isClassDataLoading,
    isEventDataLoading,
  } = useEventFormFeatures();
  const { t } = useTranslation();
  const { event_status_options } = useMockData();
  const { validateEvent } = useEventValidation();
  const { actionType } = useAppSelector((state) => state.eventFormModal);

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateEvent)}
    >
      {(props: any) => {
        const formChanged = isFormChanged(props.values);

        return (
          <Form className='flex flex-col gap-4' autoComplete='true'>
            <InputField
              type='text'
              name='name'
              label={t("event_form.name")}
              placeholder={t("event_form.enter_name")}
              loading={isEventDataLoading && actionType === "edit"}
            />

            <TextareaField
              name='description'
              label={t("event_form.description")}
              placeholder={t("event_form.enter_description")}
              rows={10}
              loading={isEventDataLoading && actionType === "edit"}
            />

            <div className='grid md:grid-cols-2 gap-4'>
              <DateTimePickerField
                name='startDate'
                label={t("event_form.startDate")}
                loading={isEventDataLoading && actionType === "edit"}
              />

              <DateTimePickerField
                name='endDate'
                label={t("event_form.endDate")}
                loading={isEventDataLoading && actionType === "edit"}
              />

              <SelectField
                name='class'
                label={t("event_form.class")}
                options={classOptions}
                value={props.values.class}
                searchable
                placeholder={t("event_form.select_class")}
                loading={
                  isClassDataLoading ||
                  (isEventDataLoading && actionType === "edit")
                }
              />

              <SelectField
                name='status'
                label={t("event_form.status")}
                options={event_status_options}
                value={props.values.status}
                placeholder={t("event_form.select_status")}
                loading={isEventDataLoading && actionType === "edit"}
              />
            </div>

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

export default EventForm;
