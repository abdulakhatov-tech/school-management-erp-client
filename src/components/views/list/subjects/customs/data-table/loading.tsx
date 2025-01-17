import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const TableLoading: React.FC<{ columns: number }> = ({ columns }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columns }, (_, index) => (
            <TableCell key={index} className='md:py-3'>
              <Skeleton className='w-full h-7' />
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }, (_, index) => (
          <TableRow key={index}>
            {Array.from({ length: columns }, (_, index) => (
              <TableCell key={index} className='md:py-3'>
                <Skeleton className='w-full h-10' />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const PaginationLoading: React.FC = () => {
  return (
    <div className='flex items-center justify-between py-4'>
      <Skeleton className='w-[140px] h-7' />

      <div className='flex items-center gap-4'>
        <Skeleton className='w-[100px] h-7' />
        <Skeleton className='w-[340px] h-7' />
      </div>
    </div>
  );
};