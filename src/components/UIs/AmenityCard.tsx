import { VStack, Icon, Heading, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface AmenityCardProps {
  icon: IconType;
  title: string;
  description: string;
}

export const AmenityCard = ({ icon, title, description }: AmenityCardProps) => {
  return (
    <VStack p={4} textAlign="center" spacing={4}>
      <Icon as={icon} boxSize={10} color="primaryRed" />
      <Heading
        as="h5"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="widest"
        fontSize="sm"
      >
        {title}
      </Heading>
      <Text color="textMuted" fontSize="xs">
        {description}
      </Text>
    </VStack>
  );
};
