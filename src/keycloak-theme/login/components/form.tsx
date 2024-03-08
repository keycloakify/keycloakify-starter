import { HTMLProps, PropsWithChildren } from "react"

export const Form = ({ children, ...rest }: PropsWithChildren & HTMLProps<HTMLFormElement>) => {
  return <form className="flex flex-col space-y-3" {...rest}>{children}</form>
}