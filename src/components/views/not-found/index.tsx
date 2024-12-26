import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPageView: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <section id='not-found'>
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <h1 className='text-8xl md:text-[160px] font-extrabold text-gray-800 dark:text-white'>
            404
          </h1>
          <p className='mt-4 md:mt-0 text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400 px-2'>
            Oops, the page you're looking for doesn't exist!
          </p>
          <Button onClick={handleGoBack} variant='link' className='mt-4 md:mt-6'>
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPageView;
