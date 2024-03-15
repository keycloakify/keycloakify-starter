import { Center, Link } from "@chakra-ui/react";
import { BackToLoginIcon } from "./icons/back";

export const BackTo = ({
  loginUrl,
  target,
  className,
}: {
  loginUrl: string;
  target: "Login" | "BuildBetter";
  className?: string;
}) => {
  return (
    <Center className={className}>
      <Link href={loginUrl}>
        <BackToLoginIcon color="white" mr={2} />
        back to <span className="text-white">{target}</span>
      </Link>
    </Center>
  );
};
