/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  style: any;
  label?: string;
  control?: any;
};

const PHInput = ({ type, name, style }: TInputProps) => {
  const { control } = useForm();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          {/* <label className="text-gray-800  block mb-2">{label}</label> */}
          <input
            {...field}
            type={type}
            placeholder={`Enter your ${name}`}
            className={style.authInput}
          />
          {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
        </>
      )}
    />
  );
};

export default PHInput;
