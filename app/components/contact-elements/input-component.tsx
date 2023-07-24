import { InputLockup } from './InputLockup';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
}

const InputComponent = ({
  id,
  name,
  label,
  placeholder,
  error = false,
  errorMessage = '',
  ...props
}: InputProps) => {
  return (
    <InputLockup>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
      />
      {error && <p>*{errorMessage}</p>}
    </InputLockup>
  );
};

export default InputComponent;
