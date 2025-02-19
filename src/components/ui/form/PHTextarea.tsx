/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form';
type TInputProps = {
  type: string;
  name: string;
  style: any;
  label?: string;
  control?: any;
};

const PHTextarea = ({ name, style }: TInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <>
          {/* <label className="text-gray-800  block mb-2">{label}</label> */}
          {/* <input {...field} type={type} placeholder={`Enter your ${name}`}  className={style.authInput}/> */}
          <textarea {...field} className={style.authInput} />
        </>
      )}
    />
  );
};

export default PHTextarea;
