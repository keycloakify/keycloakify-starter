import { HTMLProps, PropsWithChildren } from "react"

export const FormControl = ({ children, ...rest }: PropsWithChildren & HTMLProps<HTMLDivElement>) => {
  return <div {...rest} className="kcFormGroupClass space-y-2">{children}</div>
}