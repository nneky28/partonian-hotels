import { VStack, Icon, Heading, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface AmenityCardProps {
  icon: IconType;
  title: string;

}

export const AmenityCard = ({ icon, title }: AmenityCardProps) => {
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

    </VStack>
  );
};
