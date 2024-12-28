import { useState } from "react";
import { Check, Copy } from "lucide-react";

import "./style.css";

interface PropsI {
  row: any;
  accessorKey: string;
  children?: React.ReactNode;
  className?: string;
}

const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove any non-digit characters
  const digits = phoneNumber.replace(/\D/g, "");

  // Ensure it matches the expected Uzbek format
  if (digits.length === 12 && digits.startsWith("998")) {
    return `+998 (${digits.slice(3, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
  }

  // Return as is if it doesn't match the expected format
  return phoneNumber;
};
const DataTableCopyableText: React.FC<PropsI> = ({
  row,
  accessorKey,
  children,
  className
}) => {
  const [isCopied, setIsCopied] = useState(false);
  let text = row.original[accessorKey];

  if (accessorKey === "phoneNumber") {
    text = formatPhoneNumber(text);
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div onClick={handleCopy} className="relative copyText__wrapper">
      {children || <span className={className}>{text}</span>}{" "}
      <div aria-label="Copy text" className="absolute -top-3 right-0 copyText">
        {isCopied ? (
          <Check className="text-green-500 w-4" />
        ) : (
          <Copy className="text-gray-500 w-4" />
        )}
      </div>
    </div>
  );
};

export default DataTableCopyableText;