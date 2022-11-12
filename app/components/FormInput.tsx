import { clsx } from "clsx"

const inputVariants = {
  primary: "border-gray-500",
  error: "border-red-600"
} as const

type InputVariant = keyof typeof inputVariants
type FormInputProps = {
  hasError?: boolean
  variant?: InputVariant
} & React.InputHTMLAttributes<HTMLInputElement>

export function FormInput({
  hasError = false,
  variant = "primary",
  ...rest
}: FormInputProps) {
  const dynamicClasses = hasError ? inputVariants["error"] : inputVariants[variant]

  return (
    <input
      className={clsx("w-full rounded border px-2 py-1 text-lg", dynamicClasses)}
      {...rest}
    />
  )
}
