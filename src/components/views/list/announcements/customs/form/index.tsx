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
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import useAnnouncementFormFeatures from "./features";
import useAnnouncementValidation from "@/validations/announcement";

const AnnouncementForm: React.FC = () => {
  const {
    error,
    loading,
    classOptions,
    isFormChanged,
    initialValues,
    handleFormSubmit,
    isClassDataLoading,
    isAnnouncementDataLoading,
  } = useAnnouncementFormFeatures();
  const { t } = useTranslation();
  const { announcement_status_options } = useMockData();
  const { validateAnnouncement } = useAnnouncementValidation();
  const { actionType } = useAppSelector((state) => state.announcementFormModal);

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validateAnnouncement)}
    >
      {(props: any) => {
        const formChanged = isFormChanged(props.values);

        return (
          <Form className='flex flex-col gap-4' autoComplete='true'>
            <InputField
              type='text'
              name='name'
              label={t("announcement_form.name")}
              placeholder={t("announcement_form.enter_name")}
              loading={isAnnouncementDataLoading && actionType === "edit"}
            />

            <TextareaField
              name='description'
              label={t("announcement_form.description")}
              placeholder={t("announcement_form.enter_description")}
              rows={10}
              loading={isAnnouncementDataLoading && actionType === "edit"}
            />

            <DateTimePickerField
              name='date'
              label={t("announcement_form.date")}
              loading={isAnnouncementDataLoading && actionType === "edit"}
            />

            <div className='grid md:grid-cols-2 gap-4'>
              <SelectField
                name='class'
                label={t("announcement_form.class")}
                options={classOptions}
                value={props.values.class}
                searchable
                placeholder={t("announcement_form.select_class")}
                loading={
                  isClassDataLoading ||
                  (isAnnouncementDataLoading && actionType === "edit")
                }
              />

              <SelectField
                name='status'
                label={t("announcement_form.status")}
                options={announcement_status_options}
                value={props.values.status}
                placeholder={t("announcement_form.select_status")}
                loading={isAnnouncementDataLoading && actionType === "edit"}
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

export default AnnouncementForm;
