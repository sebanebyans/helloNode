import { FC } from 'react';
import {
  Box,
  BoxProps,
  Flex,
  Stat,
  Spacer,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Progress,
} from '@chakra-ui/react';

type BasicCardT = BoxProps & {
  value: number;
  title: string;
  goal: number;
};

const BasicCard: FC<BasicCardT> = ({ value, title, goal, ...rest }) => (
  <Box
    bg={useColorModeValue('white', 'gray.800')}
    boxShadow="lg"
    p={{ base: 4, lg: 6 }}
    rounded="xl"
    pos="relative"
    w="100%"
    maxWidth={{ base: '100%', lg: '30%' }}
    {...rest}
  >
    <Stat>
      <StatLabel display="flex" mr="auto">
        {title}
      </StatLabel>
      <StatNumber>{value}</StatNumber>
      <Flex alignItems="center">
        <Progress
          display="flex"
          boxShadow="md"
          w={{ base: '80%', md: '70%' }}
          value={goal / value}
          sx={{
            '>div': {
              bgGradient: 'linear(to-r, #1de9b6, #1dc4e9)',
            },
          }}
          bg="rgba(203, 213, 224, 0.5)"
        />
        <Spacer />
        <StatHelpText marginBottom="none" display="inline-flex">
          {goal / value}%
        </StatHelpText>
      </Flex>
    </Stat>
  </Box>
);

export default BasicCard;
