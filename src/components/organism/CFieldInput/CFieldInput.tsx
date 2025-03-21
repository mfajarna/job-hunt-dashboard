import { Separator } from '@/components/ui/separator';
import { FC, ReactNode } from 'react';

type FieldInputProps = {
  children: ReactNode;
  title: string;
  subTitle: string;
};

const CFieldInput: FC<FieldInputProps> = ({ children, title, subTitle }) => {
  return (
    <>
      <div className="flex flex-row items-start ">
        <div className="w-[35%]">
          <div className="font-semibold">{title}</div>
          <div className="text-gray-400 w-80">{subTitle}</div>
        </div>

        {children}
      </div>

      <Separator />
    </>
  );
};

export default CFieldInput;
