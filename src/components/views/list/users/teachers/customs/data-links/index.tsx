import React from "react";
import { Link } from "react-router-dom";

interface IData {
  _id: string;
  name: string;
}

interface DataLinksPropsI {
  row: any;
  accessorKey: "subjects" | "primaryClass";
  navigate?: boolean;
}

const DataLinks: React.FC<DataLinksPropsI> = ({
  row,
  accessorKey,
  navigate = false,
}) => {
  const data = row.original[accessorKey];

  // If data is not an array, we wrap it in an array
  const dataArray: IData[] = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div className='overflow-y-auto h-[20px]'>
      {dataArray?.length > 0 ? (
        dataArray.map((item) => (
          <div key={item?._id}>
            {navigate ? (
              <Link
                to={`/list/${accessorKey === 'primaryClass' ? 'classes' : accessorKey}/${item?._id}`}
                className='hover:text-blue-500 hover:underline'
              >
                {item?.name}
              </Link>
            ) : (
              <span>{item?.name}</span>
            )}
          </div>
        ))
      ) : (
        <div>No {accessorKey}</div>
      )}
    </div>
  );
};

export default DataLinks;
