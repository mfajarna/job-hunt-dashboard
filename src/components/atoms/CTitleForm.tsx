import { FC } from 'react';

type CTitleFormProps = {
  title: string;
  subTitle: string;
};

const CTitleForm: FC<CTitleFormProps> = ({ title, subTitle }) => {
  return (
    <>
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-gray-400 text-base">{subTitle}</div>
    </>
  );
};

export default CTitleForm;
