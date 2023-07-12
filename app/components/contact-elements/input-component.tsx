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
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
      />
      {error && <p>*{errorMessage}</p>}
    </div>
  );
};
export default InputComponent;
