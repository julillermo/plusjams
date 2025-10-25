import { Box, Spacer, Text } from "ink";

export const ExampleSpacer = () => (
  <>
    <Box borderStyle={"double"}>
      <Text>Left</Text>
      <Spacer />
      <Text>Right</Text>
    </Box>
    <Box flexDirection="column" height={10} borderStyle={"round"}>
      <Text>Top</Text>
      <Spacer />
      <Text>Bottom</Text>
    </Box>
  </>
);
