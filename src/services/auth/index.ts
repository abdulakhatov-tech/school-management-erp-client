import axios from "axios";

export const signInService = async (values: {
  username: string;
  password: string;
  rememberMe?: boolean;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/sign-in`,
    values
  );

  return response.data;
};
