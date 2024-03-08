import { Button } from "@chakra-ui/react";
import { GoogleIcon } from "./icons/google";
import { MicrosoftIcon } from "./icons/microsoft";

type SocialProviderProps = {
  loginUrl: string;
  alias: string;
  providerId: string;
  displayName: string;
  prefix?: string;
};


export const SocialProvider = ({ displayName, loginUrl, prefix, alias }: SocialProviderProps) => {
  const Icon = {
    google: GoogleIcon,
    microsoft: MicrosoftIcon
  }[alias];
  return <Button width="full" onClick={() => window.location.assign(loginUrl)}>
    {Icon && <Icon mr="2" />}
    {(prefix ? prefix : "") + displayName}
  </Button>
}