import { Box } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";
import type { ReactNode } from "react";

export function ExampleBigTextGradient(): ReactNode {
  return (
    <Box borderStyle="doubleSingle">
      <Gradient name="pastel">
        <BigText text="plusjams" align="center" />
      </Gradient>
    </Box>
  );
}
