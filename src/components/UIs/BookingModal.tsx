"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Grid,
  GridItem,
  Box,
  Text,
  Icon,
  Flex,
  IconButton,
  Image,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  MdCalendarMonth,
  MdChevronLeft,
  MdChevronRight,
  MdArrowForward,
} from "react-icons/md";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  branchName?: string;
  roomPrices?: Record<string, number>;
  onSubmit?: (data: any) => void;
}

export const BookingModal = ({
  isOpen,
  onClose,
  branchName = "Parktonian Hotel",
  roomPrices,
  onSubmit,
}: BookingModalProps) => {
  const toast = useToast();
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [roomType, setRoomType] = useState("");
  const [guests, setGuests] = useState("2");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default room prices if not provided
  const defaultRoomPrices: Record<string, number> = {
    deluxe: 120000,
    alcove: 140000,
    royal: 150000,
    executive: 250000,
  };

  const prices = roomPrices || defaultRoomPrices;

  // Calculate number of nights
  const numberOfNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [checkInDate, checkOutDate]);

  // Calculate total price - only if room type is selected
  const totalPrice = useMemo(() => {
    if (!roomType || numberOfNights === 0) return 0;
    return prices[roomType] * numberOfNights;
  }, [roomType, numberOfNights, prices]);

  // Get room rate per night
  const roomRatePerNight = useMemo(() => {
    if (!roomType) return 0;
    return prices[roomType];
  }, [roomType, prices]);

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "Select Date";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get calendar days for current month
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const days = [];

    // Add padding for days before month starts
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentMonth]);

  // Navigate months - Allow past and future
  const goToPreviousMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(newMonth);
  };

  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(newMonth);
  };

  // Prevent going back to months before current month
  const canGoPrevious = useMemo(() => {
    const today = new Date();
    const firstDayOfCurrentDisplayMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return firstDayOfCurrentDisplayMonth >= firstDayOfCurrentMonth;
  }, [currentMonth]);

  // Handle date selection
  const handleDateClick = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Don't allow selecting past dates
    if (date < today) return;

    if (!checkInDate || (checkInDate && checkOutDate)) {
      // First click or reset
      setCheckInDate(date);
      setCheckOutDate(null);
      setErrors({ ...errors, dates: "", checkIn: "", checkOut: "" });
    } else if (date > checkInDate) {
      // Second click - set checkout
      setCheckOutDate(date);
      setErrors({ ...errors, dates: "", checkIn: "", checkOut: "" });
    } else {
      // Selected date is before check-in, reset
      setCheckInDate(date);
      setCheckOutDate(null);
      setErrors({ ...errors, dates: "", checkIn: "", checkOut: "" });
    }
  };

  // Check if date is in selected range
  const isDateInRange = (date: Date) => {
    if (!checkInDate || !checkOutDate) return false;
    return date > checkInDate && date < checkOutDate;
  };

  // Check if date is selected (check-in or check-out)
  const isDateSelected = (date: Date) => {
    if (!date) return false;
    if (checkInDate && date.toDateString() === checkInDate.toDateString())
      return true;
    if (checkOutDate && date.toDateString() === checkOutDate.toDateString())
      return true;
    return false;
  };

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!checkInDate) {
      newErrors.checkIn = "Please select check-in date";
    }

    if (!checkOutDate) {
      newErrors.checkOut = "Please select check-out date";
    }

    if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
      newErrors.dates = "Check-out must be after check-in";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!fullName || !email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please provide your contact details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!roomType) {
      toast({
        title: "Missing Information",
        description: "Please select a room type",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formatDateForSubmission = (date: Date) => {
        return date.toISOString().split('T')[0];
      };

      const bookingData = {
        // Hard-code for Smartweb deployment
        token: 'prod_YOUR_ACTUAL_PRODUCTION_TOKEN_HERE',
        branchName,
        fullName,
        email,
        phone,
        checkInDate: checkInDate ? formatDateForSubmission(checkInDate) : '',
        checkOutDate: checkOutDate ? formatDateForSubmission(checkOutDate) : '',
        numberOfNights,
        roomType,
        roomRate: formatCurrency(roomRatePerNight),
        totalPrice: formatCurrency(totalPrice),
      };

      // Hard-code URL for Smartweb
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_PRODUCTION_URL_HERE/exec';

      if (!APPS_SCRIPT_URL) {
        throw new Error('Apps Script URL not configured');
      }

      // Create a form and submit it to avoid CORS issues
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = APPS_SCRIPT_URL;
      form.target = 'hidden_iframe';
      
      // Create hidden iframe to receive response
      let iframe = document.getElementById('hidden_iframe') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden_iframe';
        iframe.name = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      
      // Add data as hidden inputs
      Object.entries(bookingData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });
      
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Wait a moment for submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Booking Submitted!",
        description: "We'll contact you shortly to confirm your reservation.",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
      handleClose();

    } catch (error) {
      console.error('Booking submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Unable to submit booking. Please try again or contact us directly.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form on close
  const handleClose = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
    setRoomType("");
    setGuests("2");
    setFullName("");
    setEmail("");
    setPhone("");
    setErrors({});
    setCurrentMonth(new Date());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="6xl" isCentered>
      <ModalOverlay bg="rgba(18, 10, 10, 0.85)" backdropFilter="blur(8px)" />
      <ModalContent
        bg="luxuryBlack"
        bgGradient="linear(to-br, luxuryBlack, #1a0e0e)"
        border="1px"
        borderColor="whiteAlpha.100"
        maxH="90vh"
        overflow="hidden"
        mx={{ base: 4, md: "auto" }}
      >
        <ModalCloseButton
          color="whiteAlpha.600"
          _hover={{ color: "white" }}
          top={6}
          right={6}
          size="lg"
        />

        {/* Header */}
        <ModalHeader
          borderBottom="1px"
          borderColor="whiteAlpha.100"
          px={10}
          py={6}
        >
          <HStack spacing={4}>
            <Box>
              <Image
                src="https://res.cloudinary.com/djmwqkcw5/image/upload/v1769628785/Parktonian_Black_ttdw7p.png"
                srcSet='https://res.cloudinary.com/djmwqkcw5/image/upload/w_200,q_auto,f_auto/v1769628785/Parktonian_Black_ttdw7p.png 200w, https://res.cloudinary.com/djmwqkcw5/image/upload/w_400,q_auto,f_auto/v1769628785/Parktonian_Black_ttdw7p.png 400w'
                sizes="(max-width: 768px) 60px, 100px"
                alt="Parktonian Hotels Logo"
                objectFit="contain"
                width={{ base: "20%", md: "8%" }}
              />
              <Text
                fontSize="xs"
                fontWeight="medium"
                textTransform="uppercase"
                letterSpacing="widest"
                color="whiteAlpha.500"
              >
                Reservation Center
              </Text>
            </Box>
          </HStack>
        </ModalHeader>

        <ModalBody px={{ base: 4, md: 10 }} py={8} overflowY="auto">
          <form onSubmit={handleSubmit}>
            <VStack align="stretch" spacing={8}>
              {/* Section Header */}
              <Box>
                <Text fontSize="28px" fontWeight="bold" mb={1}>
                  Booking for: {branchName}
                </Text>
                <Text color="whiteAlpha.600">
                  Select your dates and room preferences to secure your stay.
                </Text>
              </Box>

              {errors.dates && (
                <Box
                  bg="red.900"
                  borderLeft="4px"
                  borderColor="primaryRed"
                  p={4}
                  borderRadius="md"
                >
                  <Text color="white" fontSize="sm">
                    {errors.dates}
                  </Text>
                </Box>
              )}

              <Grid templateColumns={{ base: "1fr", lg: "5fr 7fr" }} gap={10}>
                {/* Form Fields Side */}
                <GridItem>
                  <VStack spacing={6}>
                    {/* Check-in / Check-out Display */}
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                      <FormControl isInvalid={!!errors.checkIn}>
                        <FormLabel fontSize="sm" fontWeight="medium">
                          Check-in Date
                        </FormLabel>
                        <Box
                          position="relative"
                          bg="surfaceBlack"
                          border="1px"
                          borderColor={
                            errors.checkIn ? "red.500" : "whiteAlpha.200"
                          }
                          h={14}
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          px={4}
                          cursor="pointer"
                        >
                          <Text
                            color={checkInDate ? "white" : "whiteAlpha.400"}
                          >
                            {formatDate(checkInDate)}
                          </Text>
                          <Icon
                            as={MdCalendarMonth}
                            position="absolute"
                            right={4}
                            color="whiteAlpha.400"
                            boxSize={6}
                          />
                        </Box>
                        <FormErrorMessage>{errors.checkIn}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={!!errors.checkOut}>
                        <FormLabel fontSize="sm" fontWeight="medium">
                          Check-out Date
                        </FormLabel>
                        <Box
                          position="relative"
                          bg="surfaceBlack"
                          border="1px"
                          borderColor={
                            errors.checkOut ? "red.500" : "whiteAlpha.200"
                          }
                          h={14}
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          px={4}
                          cursor="pointer"
                        >
                          <Text
                            color={checkOutDate ? "white" : "whiteAlpha.400"}
                          >
                            {formatDate(checkOutDate)}
                          </Text>
                          <Icon
                            as={MdCalendarMonth}
                            position="absolute"
                            right={4}
                            color="whiteAlpha.400"
                            boxSize={6}
                          />
                        </Box>
                        <FormErrorMessage>{errors.checkOut}</FormErrorMessage>
                      </FormControl>
                    </Grid>

                    {/* Room Type */}
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="medium">
                        Room Type
                      </FormLabel>
                      <Select
                        placeholder="Select room type"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        bg="surfaceBlack"
                        border="1px"
                        borderColor="whiteAlpha.200"
                        h={14}
                        _focus={{ ring: 2, ringColor: "primaryRed" }}
                      >
                        {Object.keys(prices).map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)} Room - {formatCurrency(prices[type])}/night
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Contact Information */}
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="medium">
                        Full Name
                      </FormLabel>
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        bg="surfaceBlack"
                        border="1px"
                        borderColor="whiteAlpha.200"
                        h={14}
                        _focus={{ ring: 2, ringColor: "primaryRed" }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="medium">
                        Email Address
                      </FormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        bg="surfaceBlack"
                        border="1px"
                        borderColor="whiteAlpha.200"
                        h={14}
                        _focus={{ ring: 2, ringColor: "primaryRed" }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="medium">
                        Phone Number
                      </FormLabel>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 xxx xxx xxxx"
                        bg="surfaceBlack"
                        border="1px"
                        borderColor="whiteAlpha.200"
                        h={14}
                        _focus={{ ring: 2, ringColor: "primaryRed" }}
                      />
                    </FormControl>

                    {/* Price Summary */}
                    <Box
                      mt={4}
                      p={6}
                      borderRadius="lg"
                      bg="rgba(234, 42, 51, 0.1)"
                      border="1px"
                      borderColor="primaryRed"
                    >
                      <VStack spacing={3} align="stretch">
                        <Flex justify="space-between" gap={8}>
                          <Text color="whiteAlpha.700" fontSize="sm">
                            Room Rate (per night)
                          </Text>
                          <Text fontWeight="bold">
                            {roomType ? formatCurrency(roomRatePerNight) : "Select room type"}
                          </Text>
                        </Flex>
                        <Flex justify="space-between">
                          <Text color="whiteAlpha.700" fontSize="sm">
                            Number of Nights
                          </Text>
                          <Text fontWeight="bold">
                            {numberOfNights > 0 ? numberOfNights : "-"}
                          </Text>
                        </Flex>
                        <Box borderTop="1px" borderColor="whiteAlpha.200" pt={3}>
                          <Flex justify="space-between" align="center" gap={8}>
                            <Text fontWeight="bold">Estimated Total</Text>
                            <Text fontSize="2xl" fontWeight="black" color="primaryRed">
                              {totalPrice > 0 ? formatCurrency(totalPrice) : "-"}
                            </Text>
                          </Flex>
                        </Box>
                        {!roomType && (
                          <Text color="whiteAlpha.500" fontSize="xs" fontStyle="italic" textAlign="center">
                            Please select a room type to see pricing
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </VStack>
                </GridItem>

                {/* Calendar Side - Now visible on mobile */}
                <GridItem
                  borderLeft={{ base: "none", lg: "1px" }}
                  borderTop={{ base: "1px", lg: "none" }}
                  borderColor="whiteAlpha.100"
                  pl={{ base: 0, lg: 10 }}
                  pt={{ base: 8, lg: 0 }}
                >
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">
                      Availability Calendar
                    </Text>

                    {/* Month Navigation */}
                    <Flex justify="space-between" align="center" mb={2}>
                      <IconButton
                        aria-label="Previous month"
                        icon={<MdChevronLeft />}
                        variant="ghost"
                        size="sm"
                        _hover={{ bg: "whiteAlpha.100" }}
                        onClick={goToPreviousMonth}
                        isDisabled={!canGoPrevious}
                      />
                      <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                        {currentMonth.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </Text>
                      <IconButton
                        aria-label="Next month"
                        icon={<MdChevronRight />}
                        variant="ghost"
                        size="sm"
                        _hover={{ bg: "whiteAlpha.100" }}
                        onClick={goToNextMonth}
                      />
                    </Flex>

                    {/* Calendar Grid */}
                    <Grid templateColumns="repeat(7, 1fr)" gap={{ base: 0.5, md: 1 }}>
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <Text
                            key={day}
                            color="whiteAlpha.400"
                            fontSize={{ base: "9px", md: "11px" }}
                            fontWeight="bold"
                            textTransform="uppercase"
                            textAlign="center"
                            h={{ base: 8, md: 10 }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {day.slice(0, 3)}
                          </Text>
                        ),
                      )}

                      {/* Calendar days */}
                      {calendarDays.map((date, index) => {
                        if (!date) {
                          return <Box key={`empty-${index}`} h={{ base: 10, md: 12 }} />;
                        }

                        const isSelected = isDateSelected(date);
                        const isInRange = isDateInRange(date);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const isPast = date < today;
                        const isCheckIn = checkInDate && date.toDateString() === checkInDate.toDateString();
                        const isCheckOut = checkOutDate && date.toDateString() === checkOutDate.toDateString();

                        return (
                          <Button
                            key={index}
                            h={{ base: 10, md: 12 }}
                            fontSize={{ base: "xs", md: "sm" }}
                            fontWeight="medium"
                            bg={
                              isSelected
                                ? "primaryRed"
                                : isInRange
                                  ? "rgba(234, 42, 51, 0.3)"
                                  : "transparent"
                            }
                            color={isPast ? "whiteAlpha.300" : "white"}
                            borderRadius={
                              isCheckIn
                                ? "lg 0 0 lg"
                                : isCheckOut
                                  ? "0 lg lg 0"
                                  : "lg"
                            }
                            _hover={{
                              bg: isPast
                                ? "transparent"
                                : isSelected
                                  ? "red.600"
                                  : "whiteAlpha.100",
                            }}
                            onClick={() => !isPast && handleDateClick(date)}
                            isDisabled={isPast}
                            cursor={isPast ? "not-allowed" : "pointer"}
                            opacity={isPast ? 0.3 : 1}
                            minW={0}
                            p={0}
                          >
                            {date.getDate()}
                          </Button>
                        );
                      })}
                    </Grid>

                    {/* Legend */}
                    <HStack spacing={{ base: 2, md: 4 }} pt={4} fontSize="xs" justify="center">
                      <HStack spacing={1}>
                        <Box w={3} h={3} bg="primaryRed" borderRadius="sm" />
                        <Text color="whiteAlpha.600" fontSize={{ base: "10px", md: "xs" }}>Selected</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Box
                          w={3}
                          h={3}
                          bg="rgba(234, 42, 51, 0.3)"
                          borderRadius="sm"
                        />
                        <Text color="whiteAlpha.600" fontSize={{ base: "10px", md: "xs" }}>In Range</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </GridItem>
              </Grid>
            </VStack>
          </form>
        </ModalBody>

        {/* Footer */}
        <ModalFooter
          p={10}
          borderTop="1px"
          borderColor="whiteAlpha.100"
          bg="luxuryBlack"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={6}
            w="full"
          >
            <Text
              flex={1}
              color="whiteAlpha.600"
              fontSize="sm"
              lineHeight="relaxed"
            >
              By clicking confirm, you agree to our booking terms and
              conditions. A confirmation email will be sent to your registered
              address.
            </Text>
            <Button
              onClick={handleSubmit}
              bg="primaryRed"
              color="white"
              h={16}
              minW={{ base: "full", md: "240px" }}
              fontSize="lg"
              fontWeight="bold"
              rightIcon={<Icon as={MdArrowForward} />}
              _hover={{ bg: "red.600" }}
              _active={{ transform: "scale(0.95)" }}
              shadow="lg"
              isDisabled={!checkInDate || !checkOutDate || numberOfNights === 0 || !roomType || !fullName || !email || !phone}
              isLoading={isSubmitting}
              loadingText="Submitting..."
            >
              Confirm Booking
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
