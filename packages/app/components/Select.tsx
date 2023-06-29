const Select = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label htmlFor={label} className="w-full space-y-1">
    <span className="flex text-sm uppercase">{label}</span>
    <select
      className="cursor:pointer border p-1 min-w-[160px]"
      name={label}
      onChange={onChange}
      value={value}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

export default Select;
