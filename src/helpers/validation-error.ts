import { toast } from "@/hooks/use-toast";

export const handleValidationError = (error: any) => {
  if (error?.response?.data?.message === "Validation error") {
    const validationErrors = error?.response?.data?.errors; // Assuming errors is an array

    if (Array.isArray(validationErrors)) {
      validationErrors.forEach((err: { message: string }) => {
        toast({ title: err.message || "Validation failed" });
      });
    } else {
      toast({ title: "Unknown validation error occurred." });
    }
  } else {
    toast({ title: "An unexpected error occurred." });
  }
};
