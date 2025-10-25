import { Box, Newline, Text } from "ink";

export const ExampleTextBox = () => (
  <>
    <Text color="green">I am green</Text>
    <Text color="black" backgroundColor="white">
      I am black on white
    </Text>
    <Text color="#ffffff">I am white</Text>
    <Text bold>I am bold</Text>
    <Text italic>I am italic</Text>
    <Text underline>I am underline</Text>
    <Text strikethrough>I am strikethrough</Text>
    <Text inverse>I am inversed</Text>

    <Text>{"\n"}</Text>

    {/* Think of the <Box> component like a <div> in the browser */}
    <Box width={7}>
      <Text color="blue">Hello World</Text>
    </Box>
    {/* //=> 'Hello\nWorld' */}

    {/* // `truncate` is an alias to `truncate-end` */}
    <Box width={7}>
      <Text color="red" wrap="truncate">
        Hello World
      </Text>
    </Box>
    {/* //=> 'Hello…' */}

    <Box width={7}>
      <Text wrap="truncate-middle">Hello World</Text>
    </Box>
    {/* //=> 'He…ld' */}

    <Box width={7}>
      <Text color="green" wrap="truncate-start">
        Hello World
      </Text>
    </Box>
    {/* //=> '…World' */}

    <Box paddingTop={2}>
      <Text>Top</Text>
    </Box>
    <Box paddingBottom={2}>
      <Text>Bottom</Text>
    </Box>
    <Box paddingLeft={2}>
      <Text>Left</Text>
    </Box>
    <Box paddingRight={2}>
      <Text>Right</Text>
    </Box>
    <Box paddingX={2}>
      <Text>Left and Right</Text>
    </Box>
    <Box paddingY={2}>
      <Text>Top and bottom</Text>
    </Box>
    <Box padding={2}>
      <Text>Top, bottom, left and right</Text>
    </Box>

    <Box marginTop={2}>
      <Text>Top</Text>
    </Box>
    <Box marginBottom={2}>
      <Text>Bottom</Text>
    </Box>
    <Box marginLeft={2}>
      <Text>Left</Text>
    </Box>
    <Box marginRight={2}>
      <Text>Right</Text>
    </Box>
    <Box marginX={2}>
      <Text>Left and Right</Text>
    </Box>
    <Box marginY={2}>
      <Text>Top and bottom</Text>
    </Box>
    <Box margin={2}>
      <Text>Top, bottom, left and right</Text>
    </Box>

    <Box gap={1} width={3} flexWrap="wrap">
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Box>

    {/* I didn't continue here, but Ink should also support the
      general CSS flex options*/}

    {/* Flush */}
    <Newline />
  </>
);
