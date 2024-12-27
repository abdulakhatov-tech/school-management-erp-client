import React from "react";
import { useTranslation } from "react-i18next";
import useSignOut from "react-auth-kit/hooks/useSignOut";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PropsI {
  children: React.ReactNode;
  setUserLoggedOut: (loggedOut: boolean) => void;
}

const ConfirmLogoutModal: React.FC<PropsI> = ({
  children,
  setUserLoggedOut,
}) => {
  const signOut = useSignOut();
  const { t } = useTranslation();

  const handleSignOut = () => {
    signOut();
    setUserLoggedOut(true);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("logout.title", "Are you absolutely sure?")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t(
              "logout.description",
              "Logging out will end your current session. Please confirm if you wish to proceed."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("button.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSignOut}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {t("button.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmLogoutModal;
