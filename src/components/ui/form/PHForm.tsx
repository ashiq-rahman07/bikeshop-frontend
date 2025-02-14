/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
  } from 'react-hook-form';
  
  type TFormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;
  };
  
  type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    style:any;
    children: ReactNode;
  } & TFormConfig;
  
  const PHForm = ({
    onSubmit,
    children,
    defaultValues,
    resolver,
    style
  }: TFormProps) => {
    const formConfig: TFormConfig = {};
  
    if (defaultValues) {
      formConfig['defaultValues'] = defaultValues;
    }
  
    if (resolver) {
      formConfig['resolver'] = resolver;
    }
  
    const methods = useForm(formConfig);
  
    const submit: SubmitHandler<FieldValues> = (data) => {
      onSubmit(data);
      methods.reset();
    };
  
    return (
      <FormProvider {...methods}>
        <form action="" onSubmit={methods.handleSubmit(submit)} className={style.formStyle}>
        {children}
        </form>
       
      </FormProvider>
    );
  };
  
  export default PHForm;