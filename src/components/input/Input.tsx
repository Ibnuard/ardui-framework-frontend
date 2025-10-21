import { FieldType } from "@/constants";
import { FC } from "react";
import { CustomSelect, TextArea, Input as BaseInput } from "../form";
import { Option } from "../form/CustomSelect";
import { useFormContext, Controller } from "react-hook-form";
import IconInput from "../form/input/IconPicker";

interface InputProps {
  name: string;
  type: FieldType;
  label?: string;
  optionList?: Option[];
  required?: boolean;
}

const Input: FC<InputProps> = ({
  name,
  type,
  label,
  optionList = [],
  required,
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  // render by field type
  switch (type) {
    case FieldType.TextArea:
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextArea
              label={label}
              value={value}
              onChange={(val) => onChange(val)}
              error={!!error}
              hint={error}
              required={required}
            />
          )}
        />
      );
      break;

    case FieldType.Dropdown:
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              label={label}
              options={optionList}
              value={value}
              onChange={(val) => onChange(val ?? "")}
              error={!!error}
              hint={error}
              required={required}
            />
          )}
        />
      );

    case FieldType.IconPicker:
      return <IconInput name={name} label={label} required={required} />;

    case FieldType.Text:
    default:
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, onBlur, ref } }) => (
            <BaseInput
              label={label}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              error={!!error}
              hint={error}
              required={required}
            />
          )}
        />
      );
  }
};

export default Input;
