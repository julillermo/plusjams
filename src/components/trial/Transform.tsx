import { Box, Text, Transform } from "ink";
import type { ReactNode } from "react";

const text =
  "WHEN I WROTE the following pages, or rather the bulk of them, " +
  "I lived alone, in the woods, a mile from any neighbor, in a " +
  "house which I had built myself, on the shore of Walden Pond, " +
  "in Concord, Massachusetts, and earned my living by the labor " +
  "of my hands only. I lived there two years and two months. At " +
  "present I am a sojourner in civilized life again.";

// Transform a string representation of React components before they're written to output.
export const ExampleTransform = () => (
  <>
    <Transform transform={(output) => output.toUpperCase()}>
      <Text>Hello World</Text>
    </Transform>
    <HangingIndent indent={4}>{text}</HangingIndent>
  </>
);

const HangingIndent = ({
  indent = 4,
  children,
}: {
  indent: number;
  children: ReactNode;
}) => (
  <Box width="50">
    <Transform
      transform={(line, index) =>
        index === 0 ? line : " ".repeat(indent) + line
      }
    >
      {children}
    </Transform>
  </Box>
);
