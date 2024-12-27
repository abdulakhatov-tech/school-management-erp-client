import React from "react";
import classNames from "classnames";

import DropDown from "../dropdown";
import CardTitle from "../card-title";
import { Card } from "@/components/ui/card";
import useUserCardsFeatures from "./features";

const UserCards: React.FC = () => {
  const { items } = useUserCardsFeatures();

  const getClassForUrl = (url: string) => {
    const urlClassMap: Record<string, string> = {
      admins: "bg-[#C3EBFA]",
      teachers: "bg-[#FAE27C]",
      students: "bg-[#8884D8]",
      subjects: "bg-[#BC8E5B]",
    };
    return urlClassMap[url] || "bg-gray-300";
  };

  return (
    <div className='grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4'>
      {items?.map((item) => (
        <Card key={item._id} className='relative p-4'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-[32px] sm:text-[36px] md:text-[40px] font-bold'>
              {item.count}
            </h3>
            <div className='flex items-center gap-2'>
              <span
                className={classNames(
                  "block w-4 h-4 rounded-full",
                  getClassForUrl(item.url)
                )}
              />
              <CardTitle>{item.title}</CardTitle>
            </div>
          </div>
          <DropDown url={`/list/${item.url}`} />
        </Card>
      ))}
    </div>
  );
};

export default UserCards;
