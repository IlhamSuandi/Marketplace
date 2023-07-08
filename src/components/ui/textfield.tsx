import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  errors?: any;
}

const Textfield = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { label, type = "text", LeftIcon, RightIcon, errors, ...rest } = props;

  return (
    <div className={`relative w-full min-w-[200px] `}>
      {LeftIcon && (
        <div className="absolute top-4 left-4 grid h-5 w-5 -translate-y-2 place-items-center text-blue-gray-500">
          {LeftIcon}
        </div>
      )}

      <input
        ref={ref}
        type={type}
        className={`${
          LeftIcon && "!px-12"
        } peer focus:text-[#737373] h-full w-full rounded-[7px] border border-[#CECECE] border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#CECECE] placeholder-shown:border-t-[#CECECE] focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
        placeholder=" "
        {...rest}
      />
      <label
        className={`${
          LeftIcon &&
          "before:w-2.5 peer-focus:before:w-2.5 peer-placeholder-shown:before:w-12"
        } :content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:border-[#CECECE] before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before: border-t-transparent before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-[#CECECE] after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}
      >
        {label}
      </label>

      {RightIcon && (
        <div className="absolute top-4 right-4 grid h-5 w-5 -translate-y-2 place-items-center text-blue-gray-500">
          {RightIcon}
        </div>
      )}

      {errors && (
        <div className="text-left text-sm ml-5 text-danger ">
          <p>{errors.message}</p>
        </div>
      )}
    </div>
  );
});
Textfield.displayName = "Textfield";

export default Textfield;
