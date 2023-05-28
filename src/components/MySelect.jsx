import Select from "react-select";

export default function MySelect({ options, field, errors, ...props }) {
  return (
    <Select
      {...field}
      {...props}
      options={options}
      components={{
        IndicatorSeparator: () => null,
        ClearIndicator: () => null,
      }}
      isClearable
      styles={{
        control: (provided, state) => ({
          ...provided,
          border: `${
            errors?.category?.message
              ? "1px solid #EF4444"
              : state.isFocused
              ? "1px solid #006AFF"
              : "1px solid #D1D5DB"
          }`,
          borderRadius: "4px",
          fontSize: "16px",
          paddingLeft: "8px",
          fontFamily: "Inter",
          height: "40px",
          lineHeight: "20px",
          color: "#4F4F4F",
          boxShadow: "none",

          "&:hover": {
            border: `${
              errors?.category?.message
                ? "1px solid #EF4444"
                : state.isFocused
                ? "1px solid #006AFF"
                : "1px solid #D1D5DB"
            }`,
          },
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: "8px",
          boxShadow: "none",
          border: "1px solid #D1D5DB",
          marginTop: "0.5rem",
          zIndex: 2,
        }),
        option: () => ({
          "&:hover": {
            backgroundColor: "#ECFDF5",
          },
          padding: "10px 14px",
          fontSize: "16px",
          lineHeight: "24px",
          fontFamily: "Inter",
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#9CA3AF",
          fontSize: "16px",
        }),
      }}
    />
  );
}
