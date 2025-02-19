/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TPHSelectProps = {
  label?: string;
  control: any;
  name: string;
  //   options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  // mode?: 'multiple' | undefined;
};

const PHSelect = ({ name, disabled }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <select
          // mode='multiple'
          style={{ width: '100%' }}
          {...field}
          // options={options}
          // size="large"
          disabled={disabled}
        >
          <option value="">Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
        //   {error && <small style={{ color: 'red' }}>{error.message}</small>}
      )}
    />
  );
};

export default PHSelect;
