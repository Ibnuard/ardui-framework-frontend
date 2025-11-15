import { FieldType } from "@/constants";
import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Option } from "./components/CustomSelect";
import {
  Checkbox,
  DatePicker,
  Dropdown,
  FileInput,
  IconInput,
  InputBase,
  Radio,
  Switch,
  TextArea,
} from "./components";

interface InputProps {
  name: string;
  type: FieldType;
  label?: string;
  optionList?: Option[];
  required?: boolean;
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  name,
  type,
  label,
  optionList = [],
  required,
  disabled,
}) => {
  const {
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
              disabled={disabled}
              onChange={(val) => onChange(val)}
              error={!!error}
              hint={error}
              required={required}
            />
          )}
        />
      );

    case FieldType.Switch:
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Switch
              label={label ?? ""}
              defaultChecked={!!value}
              onChange={(checked) => onChange(checked)}
              disabled={disabled}
            />
          )}
        />
      );

    case FieldType.Dropdown:
      return (
        <Controller
          name={name}
          control={control}
          disabled={disabled}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              label={label}
              options={optionList}
              value={value}
              onChange={(val) => onChange(val ?? "")}
              error={!!error}
              hint={error}
              required={required}
              disabled={disabled}
            />
          )}
        />
      );

    case FieldType.IconPicker:
      return <IconInput name={name} label={label} required={required} />;

    case FieldType.Checkbox:
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Checkbox
              label={label}
              checked={!!value}
              onChange={(checked) => onChange(checked)}
              ref={ref}
              disabled={disabled}
            />
          )}
        />
      );

    case FieldType.Radio:
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col gap-2">
              {label && (
                <label className="text-sm font-medium text-gray-700 dark:text-gray-400">
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </label>
              )}

              <div className="flex flex-wrap gap-3">
                {optionList.map((opt, idx) => (
                  <Radio
                    key={idx}
                    id={`${name}-${idx}`}
                    name={name}
                    value={opt.value}
                    label={opt.label}
                    checked={value === opt.value}
                    onChange={(val) => onChange(val)}
                    disabled={disabled}
                  />
                ))}
              </div>

              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
          )}
        />
      );

    case FieldType.DatePicker:
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              id={name}
              label={label}
              disabled={disabled}
              defaultDate={value}
              onChange={(selectedDates) => {
                const selectedDate = selectedDates?.[0] ?? null;
                onChange(selectedDate);
              }}
              placeholder="Select date"
            />
          )}
        />
      );

    case FieldType.TimePicker:
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              id={name}
              label={label}
              mode="time"
              disabled={disabled}
              defaultDate={value}
              onChange={(selectedDates) => {
                const selectedDate = selectedDates?.[0] ?? null;
                onChange(selectedDate);
              }}
              placeholder="Select time"
            />
          )}
        />
      );

    case FieldType.File:
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <FileInput
              className="mt-1"
              disabled={disabled}
              onResult={({ base64, filename }) => {
                onChange({ base64, filename });
              }}
            />
          )}
        />
      );

    case FieldType.Text:
    default:
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, onBlur, ref } }) => (
            <InputBase
              label={label}
              value={value}
              disabled={disabled}
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
