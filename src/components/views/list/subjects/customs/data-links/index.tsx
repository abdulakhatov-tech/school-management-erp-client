import React from "react";
import { Link } from "react-router-dom";

interface IData {
  _id: string;
  fullName: string;
}

interface DataLinksPropsI {
  row: any;
  accessorKey: "teachers";
}

const ChildrenLinks: React.FC<DataLinksPropsI> = ({ row, accessorKey }) => {
  const data: IData[] = row.original[accessorKey];

  return (
    <div className="overflow-y-auto h-[20px]">
      {data?.length > 0 ? (
        data?.map((item) => (
          <div key={item?._id} className="flex items-center gap-2">
            <Link to={`/list/${accessorKey}/${item?._id}`} className="hover:underline hover:text-blue-500">{item?.fullName}</Link>
            <span>({data?.length})</span>
          </div>
        ))
      ) : (
        <div>No teachers</div>
      )}
    </div>
  );

};

export default ChildrenLinks;