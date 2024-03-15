import { AbsoluteCenter, Box, Divider } from "@chakra-ui/react";

export const SectionDivider = ({ text }: { text?: string }) => {
  return (
    <>
      <Box position="relative" py={4}>
        <Divider />
        <AbsoluteCenter px={4} className="bg-dark-900">
          {text}
        </AbsoluteCenter>
      </Box>
    </>
  );
};
