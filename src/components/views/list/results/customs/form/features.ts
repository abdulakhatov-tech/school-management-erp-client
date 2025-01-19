import { isEqual } from "lodash";
import { useState } from "react";

interface IInitialValues {
  description: string;
  score: number;
  exam: string;
  assignment: string;
  class: string;
  student: string;
}

const initialResultValues: IInitialValues = {
  description: "",
  score: 0,
  exam: "",
  assignment: "",
  class: "",
  student: "",
};

const useResultFormFeatures = () => {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] =
    useState<IInitialValues>(initialResultValues);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {};

  // Compute whether form values are changed
  const isFormChanged = (values: IInitialValues): boolean => {
    return !isEqual(values, initialValues);
  };

  return {
    loading: state.loading,
    error: state.error,
    handleFormSubmit,
    initialValues,
    isFormChanged,
  };
};

export default useResultFormFeatures;
