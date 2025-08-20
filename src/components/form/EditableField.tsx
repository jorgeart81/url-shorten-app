import { useState, type FC, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { CustomInput } from './CustomInput';

interface Props {
  name: string;
  label: string;
  value: string;
  buttonTitle: string;
  buttonAriaLabel: string;
  icon: ReactNode;
  buttonText: string;
  inputPrefix?: string;
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
}) => {
  const [canEdit, setCanEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  return (
    <div>
      <label
        htmlFor={name}
        className='scroll-m-20 font-semibold tracking-tight'
      >
        {label}
      </label>
      <div className='flex items-center mt-2'>
        {inputPrefix && <p>{inputPrefix}</p>}
        {canEdit ? (
          <>
            <CustomInput
              id={name}
              name={name}
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </>
        ) : (
          <>
            <p>{value}</p>
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
          </>
        )}
      </div>
    </div>
  );
};
