import axios from "axios";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const createAxiosInstance = (token: string | null, signOut: () => void) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Make sure this is correct
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000, // Set timeout to 10 seconds
  });

  // Request interceptor to add token
  instance.interceptors.request.use(
    (request) => {
      if (token) {
        if (!token.startsWith("Bearer ")) {
          request.headers.Authorization = `Bearer ${token}`; // Add Bearer token
        } else {
          request.headers.Authorization = token; // Use the token as it is
        }
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle errors
  instance.interceptors.response.use(
    (response) => response, // Return response directly
    (error) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        signOut(); // Automatically log the user out on unauthorized error
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Hook to use the axios instance within React components
const useAxiosInstance = () => {
  const token = useAuthHeader(); // Get the auth header
  const signOut = useSignOut(); // Get the sign out function

  const axiosInstance = createAxiosInstance(token, signOut);
  return axiosInstance;
};

export default useAxiosInstance;
