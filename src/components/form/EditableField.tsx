import { useState, type FC, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { CustomInput } from './CustomInput';
import clsx from 'clsx';

interface Props {
  name: string;
  label: string;
  value: string;
  icon?: ReactNode;
  buttonText?: string;
  buttonTitle?: string;
  buttonAriaLabel?: string;
  inputPrefix?: string;
  disabled?: boolean;
  showInput?: boolean;
  errors?: [];
  hasError?: boolean;
}

export const EditableField: FC<Props> = ({
  name,
  label,
  value,
  buttonTitle,
  buttonAriaLabel,
  icon,
  buttonText,
  inputPrefix,
  disabled,
  showInput = false,
  hasError,
  errors,
}) => {
  const [canEdit, setCanEdit] = useState(showInput);
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className='relative overflow-x-scroll'>
      <label
        htmlFor={canEdit ? name : undefined}
        className='scroll-m-20 font-semibold tracking-tight'
      >
        {label}
      </label>
      <div className={clsx('mt-2', { 'flex items-center': !canEdit })}>
        {inputPrefix && <p>{inputPrefix}</p>}
        {canEdit ? (
          <>
            <CustomInput
              id={name}
              name={name}
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={disabled}
              hasError={hasError}
              errors={errors}
            />
          </>
        ) : (
          <div className='relative max-w-dvw'>
            <p className='break-words'>{value}</p>
            {buttonText && (
              <Button
                title={buttonTitle}
                aria-label={buttonAriaLabel}
                variant='ghost'
                onClick={() => setCanEdit(true)}
                className='ml-4'
              >
                {icon}
                {buttonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
