import { Box, Static, Text } from "ink";
import { useEffect, useState } from "react";

type IdTitle = {
  id: string;
  title: string;
};

export const ExampleStatic = () => {
  const [tests, setTests] = useState<IdTitle[]>([]);

  useEffect(() => {
    let completedTests = 0;
    let timer: NodeJS.Timeout;

    const run = () => {
      // timer = setTimeout(run, 100);

      // Fake 10 completed tests
      if (completedTests++ < 10) {
        setTests((previousTests: IdTitle[]) => [
          ...previousTests,
          {
            id: previousTests.length.toString(),
            title: `Test #${previousTests.length + 1}`,
          },
        ]);

        timer = setTimeout(run, 100);
      }
    };

    run();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* This part will be rendered once to the terminal */}
      <Static items={tests}>
        {(test) => (
          <Box key={test.id}>
            <Text color="green">✔ {test.title}</Text>
          </Box>
        )}
      </Static>

      {/* This part keeps updating as state changes */}
      <Box marginTop={1}>
        <Text dimColor>Completed tests: {tests.length}</Text>
      </Box>
    </>
  );
};
