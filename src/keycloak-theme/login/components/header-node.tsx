import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type HeaderNodeProps = {
  title?: string;
  subtitle?: string;
  asset?: any;
  children?: ReactNode;
};

export const HeaderNode = ({
  title,
  subtitle,
  asset,
  children,
}: HeaderNodeProps) => {
  return (
    <div className="text-white flex flex-col space-y-2">
      <div className="flex justify-center pb-8">
        {asset || (
          <img
            src={require("./../assets/logo-dark.png")}
            className="h-12 w-12"
          />
        )}
      </div>
      {title && (
        <h1 className="text-3xl text-white self-center font-bold">{title}</h1>
      )}
      {subtitle && (
        <Text color="GrayText" textAlign="center" fontSize="small">
          {subtitle}
        </Text>
      )}
      {children}
    </div>
  );
};
