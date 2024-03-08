import { Text } from "@chakra-ui/react"

type HeaderNodeProps = {
  title: string;
  subtitle: string;
}

export const HeaderNode = ({ title, subtitle }: HeaderNodeProps) => {
  return <div className="text-white flex flex-col space-y-2">
    <div className="flex justify-center pb-8">
      <img src={require("./../assets/logo-dark.png")} className="h-12 w-12" />
    </div>
    <h1 className="text-3xl text-white self-center font-bold">{title}</h1>
    <Text color="GrayText" textAlign="center">{subtitle}</Text>
  </div>
}