import React from "react";
import { useField } from "formik";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PropsI {
  label: string;
  name: string;
}

const CheckboxField: React.FC<PropsI> = ({ label, name }) => {
  const [field, meta, helpers] = useField({ name, type: "checkbox" });

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={name}
          checked={field.value} // Connect to Formik's value
          onCheckedChange={(value: boolean) => helpers.setValue(value)} // Update Formik state
        />
        <Label htmlFor={name} className="text-[16px]">
          {label}
        </Label>
      </div>
      {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
};

export default CheckboxField;
