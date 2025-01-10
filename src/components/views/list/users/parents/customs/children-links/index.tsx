import React from "react";
import { Link } from "react-router-dom";

interface Child {
  _id: string;
  fullName: string;
}

interface ChildrenLinksProps {
  row: any;
}

const ChildrenLinks: React.FC<ChildrenLinksProps> = ({ row }) => {
  const children: Child[] = row.original?.children;

  return (
    <div className='overflow-y-auto h-[20px] flex gap-2'>
      {children?.length > 0 ? (
        children.map((child, index) => (
          <div key={child._id}>
            <Link
              to={`/list/students/${child._id}`}
              className='hover:underline hover:text-blue-500'
            >
              {child.fullName}
            </Link>{" "}
            {index !== children?.length - 1 && ","}
          </div>
        ))
      ) : (
        <div>No students</div>
      )}
    </div>
  );
};

export default ChildrenLinks;
