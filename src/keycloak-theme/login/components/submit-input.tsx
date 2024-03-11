import { Input, InputProps } from "@chakra-ui/react";

export const SubmitInput = (props: InputProps) => {
  return <Input bgColor="purple.700" _hover={{ bgColor: "purple.600" }} border="none" type="submit" fontWeight="bold" mt={8} {...props} />
}