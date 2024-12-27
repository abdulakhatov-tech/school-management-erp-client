import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MdOutlineDangerous, MdDone } from "react-icons/md";

import { ConfirmModal } from "./customs";
import { Button } from "@/components/ui/button";
import Section from "@/components/layout/section";

// Helper function for token validation
const isTokenValid = (): boolean => !!Cookies.get("_auth");

const LogoutPageView: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isUserLoggedOut, setUserLoggedOut] = useState(false);

  // Monitor token and logout state
  useEffect(() => {
    if (isUserLoggedOut || !isTokenValid()) {
      navigate("/auth/sign-in");
    }
  }, [isUserLoggedOut, navigate]);

  const successState = isUserLoggedOut || !isTokenValid();

  return (
    <Section id='logout-confirmation-page' className='center'>
      <div className='flex flex-col items-center'>
        {successState ? (
          <MdDone className='text-[80px] md:text-[90px] lg:text-[110px] xl:text-[120px] 2xl:text-[130px] text-[#198754] mb-4' />
        ) : (
          <MdOutlineDangerous className='text-[80px] md:text-[90px] lg:text-[110px] xl:text-[120px] 2xl:text-[130px] text-destructive hover:text-destructive/90 mb-4' />
        )}

        <h2 className='text-lg md:text-xl lg:text-2xl font-bold'>
          {successState ? t("logout.success_title") : t("logout.title")}
        </h2>

        <p className='mt-4 text-sm md:text-lg text-gray-600 max-w-[700px] text-center'>
          {successState
            ? t("logout.success_description")
            : t("logout.description")}
        </p>

        {!successState && (
          <div className='mt-6 flex gap-4'>
            <ConfirmModal setUserLoggedOut={setUserLoggedOut}>
              <Button variant='destructive' className='w-full'>
                {t("button.logout")}
              </Button>
            </ConfirmModal>
          </div>
        )}
      </div>
    </Section>
  );
};

export default LogoutPageView;
