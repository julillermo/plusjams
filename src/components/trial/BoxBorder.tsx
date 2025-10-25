import { Box, Newline, Text } from "ink";

export const BoxBorder = () => {
  return (
    <>
      <Box flexDirection="column">
        <Box>
          <Box borderStyle="single" marginRight={2}>
            <Text>single</Text>
          </Box>

          <Box borderStyle="double" marginRight={2}>
            <Text>double</Text>
          </Box>

          <Box borderStyle="round" marginRight={2}>
            <Text>round</Text>
          </Box>

          <Box borderStyle="bold">
            <Text>bold</Text>
          </Box>
        </Box>

        <Box marginTop={1}>
          <Box borderStyle="singleDouble" marginRight={2}>
            <Text>singleDouble</Text>
          </Box>

          <Box borderStyle="doubleSingle" marginRight={2}>
            <Text>doubleSingle</Text>
          </Box>

          <Box borderStyle="classic">
            <Text>classic</Text>
          </Box>
        </Box>

        <Box
          borderStyle={{
            topLeft: "↘",
            top: "↓",
            topRight: "↙",
            left: "→",
            bottomLeft: "↗",
            bottom: "↑",
            bottomRight: "↖",
            right: "←",
          }}
          borderColor="green"
        >
          <Text>Custom</Text>
        </Box>

        <Box borderStyle="round" borderRightColor="green">
          <Text>Hello world</Text>
        </Box>
        <Box borderStyle="round" borderBottomColor="green">
          <Text>Hello world</Text>
        </Box>
        <Box borderStyle="round" borderDimColor>
          <Text>Hello world</Text>
        </Box>
        <Box
          borderStyle="round"
          borderTopColor="red"
          borderTopDimColor
          borderBottomDimColor
        >
          <Text>Hello world</Text>
        </Box>
      </Box>

      <Newline />
    </>
  );
};
