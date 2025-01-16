import appleLogo from "./assets/providers/apple.svg";
import bitbucketLogo from "./assets/providers/bitbucket.svg";
import discordLogo from "./assets/providers/discord.svg";
import facebookLogo from "./assets/providers/facebook.svg";
import githubLogo from "./assets/providers/github.svg";
import gitlabLogo from "./assets/providers/gitlab.svg";
import googleLogo from "./assets/providers/google.svg";
import instagramLogo from "./assets/providers/instagram.svg";
import linkedinLogo from "./assets/providers/linkedin.svg";
import microsoftLogo from "./assets/providers/microsoft.svg";
import oidcLogo from "./assets/providers/oidc.svg";
import openshiftLogo from "./assets/providers/openshift.svg";
import paypalLogo from "./assets/providers/paypal.svg";
import slackLogo from "./assets/providers/slack.svg";
import stackoverflowLogo from "./assets/providers/stackoverflow.svg";
import xLogo from "./assets/providers/x.svg";

const useProviderLogos: () => Record<string, string> = () => ({
    apple: appleLogo,
    bitbucket: bitbucketLogo,
    discord: discordLogo,
    facebook: facebookLogo,
    github: githubLogo,
    gitlab: gitlabLogo,
    google: googleLogo,
    instagram: instagramLogo,
    "linkedin-openid-connect": linkedinLogo,
    microsoft: microsoftLogo,
    oidc: oidcLogo,
    "openshift-v3": openshiftLogo,
    "openshift-v4": openshiftLogo,
    paypal: paypalLogo,
    slack: slackLogo,
    stackoverflow: stackoverflowLogo,
    twitter: xLogo,
    x: xLogo,
});

export default useProviderLogos;
