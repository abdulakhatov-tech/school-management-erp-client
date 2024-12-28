import React from "react";
import { useLocation, Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslation } from "react-i18next";

const Navigation: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const generateBreadcrumbs = () => {
    return pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const isLast = index === pathSegments.length - 1;

      return (
        <React.Fragment key={path}>
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage>{t(`app_sidebar.${segment}`)}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink>
                <Link to={path}>{t(`app_sidebar.${segment}`)}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  };

  return (
    <Breadcrumb className='hidden md:block'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to='/'>{t('app_sidebar.dashboard')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {generateBreadcrumbs()}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Navigation;
