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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
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
  selectedRoom?: any;
  availableRooms?: any[];
  onSubmit?: (data: any) => void;
}

export const BookingModal = ({
  isOpen,
  onClose,
  branchName = "Parktonian Hotel",
  selectedRoom,
  availableRooms = [],
  onSubmit,
}: BookingModalProps) => {
  const toast = useToast();
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  // FIX 1: Declare roomType and selectedRoomName state (were missing, causing all the errors)
  const [roomType, setRoomType] = useState<string>("");
  const [selectedRoomName, setSelectedRoomName] = useState<string>("");
  const [guests, setGuests] = useState("2");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckInCalendarOpen, setIsCheckInCalendarOpen] = useState(false);
  const [isCheckOutCalendarOpen, setIsCheckOutCalendarOpen] = useState(false);

  // Extract price from room price string (e.g., "₦120,000" or "120000" -> 120000)
  const extractPrice = (priceStr?: string): number | null => {
    if (!priceStr) return null;
    const cleaned = priceStr.replace(/[₦,$\s]/g, "").trim();
    const price = parseInt(cleaned);
    return isNaN(price) ? null : price;
  };

  // FIX 2: Build a dynamic prices map from availableRooms instead of a hardcoded object
  const prices = useMemo(() => {
    const map: Record<string, number> = {};
    availableRooms.forEach((room: any) => {
      const price = extractPrice(room.price);
      if (room.id && price !== null) {
        map[room.id] = price;
      }
    });
    return map;
  }, [availableRooms]);

  // Get currently selected room object
  const currentRoom = useMemo(() => {
    if (availableRooms && selectedRoomId) {
      return availableRooms.find((room: any) => room.id === selectedRoomId);
    }
    return null;
  }, [selectedRoomId, availableRooms]);

  // Pre-fill with selected room when modal opens
  useEffect(() => {
    if (isOpen && selectedRoom && availableRooms.length > 0) {
      const matchingRoom = availableRooms.find(
        (room: any) => room.id === selectedRoom.id
      );
      if (matchingRoom) {
        setSelectedRoomId(matchingRoom.id);
        // FIX 3: Sync roomType and selectedRoomName when pre-filling
        setRoomType(matchingRoom.id);
        setSelectedRoomName(matchingRoom.name || "");
      }
    }
  }, [selectedRoom, isOpen, availableRooms]);

  // Get room rate per night from current selection
  const roomRatePerNight = useMemo(() => {
    if (!currentRoom) return 0;
    const price = extractPrice(currentRoom.price);
    return price || 0;
  }, [currentRoom]);

  // Calculate number of nights
  const numberOfNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [checkInDate, checkOutDate]);

  // Calculate total price - only if room is selected
  const totalPrice = useMemo(() => {
    if (!currentRoom || numberOfNights === 0) return 0;
    return roomRatePerNight * numberOfNights;
  }, [currentRoom, numberOfNights, roomRatePerNight]);

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

    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    setCurrentMonth(newMonth);
  };

  const goToNextMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(newMonth);
  };

  const canGoPrevious = useMemo(() => {
    const today = new Date();
    const firstDayOfCurrentDisplayMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const firstDayOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    return firstDayOfCurrentDisplayMonth >= firstDayOfCurrentMonth;
  }, [currentMonth]);

  const handleDateClick = (date: Date, isForCheckIn: boolean) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;

    if (isForCheckIn) {
      setCheckInDate(date);
      if (checkOutDate && date >= checkOutDate) {
        setCheckOutDate(null);
      }
      setErrors({ ...errors, dates: "", checkIn: "", checkOut: "" });
      setIsCheckInCalendarOpen(false);
    } else {
      if (checkInDate && date > checkInDate) {
        setCheckOutDate(date);
        setErrors({ ...errors, dates: "", checkIn: "", checkOut: "" });
        setIsCheckOutCalendarOpen(false);
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!checkInDate || !checkOutDate) return false;
    return date > checkInDate && date < checkOutDate;
  };

  const isDateSelected = (date: Date) => {
    if (!date) return false;
    if (checkInDate && date.toDateString() === checkInDate.toDateString())
      return true;
    if (checkOutDate && date.toDateString() === checkOutDate.toDateString())
      return true;
    return false;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!checkInDate) newErrors.checkIn = "Please select check-in date";
    if (!checkOutDate) newErrors.checkOut = "Please select check-out date";
    if (checkInDate && checkOutDate && checkOutDate <= checkInDate)
      newErrors.dates = "Check-out must be after check-in";

    if (!fullName || fullName.trim().length < 2)
      newErrors.fullName = "Please enter a valid full name";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email))
      newErrors.email = "Please enter a valid email address";

    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone || phoneDigits.length < 10)
      newErrors.phone =
        "Please enter a valid phone number (at least 10 digits)";

    if (!roomType) newErrors.roomType = "Please select a room type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setIsSubmitting(true);

    try {
      const formatDateForSubmission = (date: Date) =>
        date.toISOString().split("T")[0];

      const bookingData = {
        fullName,
        email,
        phone,
        branchName,
        checkInDate: checkInDate ? formatDateForSubmission(checkInDate) : "",
        checkOutDate: checkOutDate ? formatDateForSubmission(checkOutDate) : "",
        numberOfNights,
        roomType: selectedRoomName || roomType,
        roomRate: formatCurrency(roomRatePerNight),
        totalPrice: formatCurrency(totalPrice),
      };

      const DEFAULT_API_TOKEN = "prod_afa0c5d82574f1513efc92c07784028d3b74bfe82fd20a0de5350209976b89d3";
      const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || DEFAULT_API_TOKEN;
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit booking");
      }

      toast({
        title: "Booking Submitted!",
        description: "We'll contact you shortly to confirm your reservation.",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
      handleClose();
    } catch (error) {
      console.error("Booking submission error:", error);
      toast({
        title: "Submission Failed",
        description:
          "Unable to submit booking. Please try again or contact us directly.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // FIX 4: handleClose now properly resets all state including roomType and selectedRoomName
  const handleClose = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
    setRoomType("");
    setSelectedRoomId("");
    setSelectedRoomName("");
    setGuests("2");
    setFullName("");
    setEmail("");
    setPhone("");
    setErrors({});
    setCurrentMonth(new Date());
    setIsCheckInCalendarOpen(false);
    setIsCheckOutCalendarOpen(false);
    onClose();
  };

  const renderCalendar = (isForCheckIn: boolean) => (
    <VStack spacing={4} align="stretch">
      <Flex justify="space-between" align="center">
        <IconButton
          aria-label="Previous month"
          icon={<MdChevronLeft />}
          variant="ghost"
          size="sm"
          _hover={{ bg: "whiteAlpha.100" }}
          onClick={goToPreviousMonth}
          isDisabled={!canGoPrevious}
        />
        <Text fontWeight="bold" fontSize="md">
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

      <Grid templateColumns="repeat(7, 1fr)" gap={1}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text
            key={day}
            color="whiteAlpha.400"
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            h={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {day.slice(0, 3)}
          </Text>
        ))}

        {calendarDays.map((date, index) => {
          if (!date) return <Box key={`empty-${index}`} h={10} />;

          const isSelected = isDateSelected(date);
          const isInRange = isDateInRange(date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isPast = date < today;
          const isCheckIn =
            checkInDate && date.toDateString() === checkInDate.toDateString();
          const isCheckOut =
            checkOutDate && date.toDateString() === checkOutDate.toDateString();
          const isDisabledForCheckout =
            !isForCheckIn && !!checkInDate && date <= checkInDate;
          const isButtonDisabled = isPast || isDisabledForCheckout;

          return (
            <Button
              key={index}
              h={10}
              fontSize="sm"
              fontWeight="medium"
              bg={
                isSelected
                  ? "primaryRed"
                  : isInRange
                  ? "rgba(234, 42, 51, 0.3)"
                  : "transparent"
              }
              color={isButtonDisabled ? "whiteAlpha.300" : "white"}
              borderRadius={
                isCheckIn ? "lg 0 0 lg" : isCheckOut ? "0 lg lg 0" : "lg"
              }
              _hover={{
                bg: isButtonDisabled
                  ? undefined
                  : isSelected
                  ? "red.600"
                  : "whiteAlpha.100",
              }}
              _disabled={{
                opacity: 0.3,
                cursor: "not-allowed",
                bg: "transparent",
              }}
              onClick={() => handleDateClick(date, isForCheckIn)}
              isDisabled={isButtonDisabled}
              minW={0}
              p={0}
            >
              {date.getDate()}
            </Button>
          );
        })}
      </Grid>

      <HStack spacing={4} pt={2} fontSize="xs" justify="center">
        <HStack spacing={1}>
          <Box w={3} h={3} bg="primaryRed" borderRadius="sm" />
          <Text color="whiteAlpha.600">Selected</Text>
        </HStack>
        <HStack spacing={1}>
          <Box w={3} h={3} bg="rgba(234, 42, 51, 0.3)" borderRadius="sm" />
          <Text color="whiteAlpha.600">In Range</Text>
        </HStack>
      </HStack>
    </VStack>
  );

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
                srcSet="https://res.cloudinary.com/djmwqkcw5/image/upload/w_200,q_auto,f_auto/v1769628785/Parktonian_Black_ttdw7p.png 200w, https://res.cloudinary.com/djmwqkcw5/image/upload/w_400,q_auto,f_auto/v1769628785/Parktonian_Black_ttdw7p.png 400w"
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

        <ModalBody
          px={{ base: 4, md: 10 }}
          py={8}
          overflowY="auto"
          pb={{ base: 6, md: 8 }}
        >
          <form onSubmit={handleSubmit}>
            <VStack align="stretch" spacing={8}>
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
                    {/* Check-in / Check-out */}
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                      <FormControl isInvalid={!!errors.checkIn}>
                        <FormLabel fontSize="sm" fontWeight="medium">
                          Check-in Date
                        </FormLabel>
                        {/* Mobile: Popover */}
                        <Box display={{ base: "block", lg: "none" }}>
                          <Popover
                            isOpen={isCheckInCalendarOpen}
                            onClose={() => setIsCheckInCalendarOpen(false)}
                            placement="bottom-start"
                            closeOnBlur={true}
                          >
                            <PopoverTrigger>
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
                                onClick={() => setIsCheckInCalendarOpen(true)}
                                _hover={{ borderColor: "primaryRed" }}
                                transition="border-color 0.2s"
                              >
                                <Text
                                  color={
                                    checkInDate ? "white" : "whiteAlpha.400"
                                  }
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
                            </PopoverTrigger>
                            <PopoverContent
                              bg="surfaceBlack"
                              borderColor="whiteAlpha.200"
                              w={{ base: "340px", md: "380px" }}
                              shadow="2xl"
                            >
                              <PopoverArrow bg="surfaceBlack" />
                              <PopoverBody p={4}>
                                {renderCalendar(true)}
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Box>
                        {/* Desktop: Static display */}
                        <Box
                          display={{ base: "none", lg: "flex" }}
                          position="relative"
                          bg="surfaceBlack"
                          border="1px"
                          borderColor={
                            errors.checkIn ? "red.500" : "whiteAlpha.200"
                          }
                          h={14}
                          borderRadius="md"
                          alignItems="center"
                          px={4}
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
                        {/* Mobile: Popover */}
                        <Box display={{ base: "block", lg: "none" }}>
                          <Popover
                            isOpen={isCheckOutCalendarOpen}
                            onClose={() => setIsCheckOutCalendarOpen(false)}
                            placement="bottom-start"
                            closeOnBlur={true}
                          >
                            <PopoverTrigger>
                              <Box
                                position="relative"
                                bg="surfaceBlack"
                                border="1px"
                                borderColor={
                                  errors.checkOut
                                    ? "red.500"
                                    : "whiteAlpha.200"
                                }
                                h={14}
                                borderRadius="md"
                                display="flex"
                                alignItems="center"
                                px={4}
                                cursor="pointer"
                                onClick={() => setIsCheckOutCalendarOpen(true)}
                                _hover={{ borderColor: "primaryRed" }}
                                transition="border-color 0.2s"
                              >
                                <Text
                                  color={
                                    checkOutDate ? "white" : "whiteAlpha.400"
                                  }
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
                            </PopoverTrigger>
                            <PopoverContent
                              bg="surfaceBlack"
                              borderColor="whiteAlpha.200"
                              w={{ base: "340px", md: "380px" }}
                              shadow="2xl"
                            >
                              <PopoverArrow bg="surfaceBlack" />
                              <PopoverBody p={4}>
                                {renderCalendar(false)}
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Box>
                        {/* Desktop: Static display */}
                        <Box
                          display={{ base: "none", lg: "flex" }}
                          position="relative"
                          bg="surfaceBlack"
                          border="1px"
                          borderColor={
                            errors.checkOut ? "red.500" : "whiteAlpha.200"
                          }
                          h={14}
                          borderRadius="md"
                          alignItems="center"
                          px={4}
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

                    {/* FIX 5: Room Type dropdown now maps over availableRooms dynamically */}
                    <FormControl isRequired isInvalid={!!errors.roomType}>
                      <FormLabel fontSize="sm" fontWeight="medium">
                        Room Type
                      </FormLabel>
                      {selectedRoomName ? (
                        // Pre-selected room (came from a "Book Now" on a room card)
                        <Box
                          bg="surfaceBlack"
                          border="1px"
                          borderColor="primaryRed"
                          h={14}
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          px={4}
                          position="relative"
                        >
                          <Text color="white" fontWeight="medium">
                            {selectedRoomName} -{" "}
                            {formatCurrency(roomRatePerNight)}/night
                          </Text>
                          <Text
                            fontSize="xs"
                            color="primaryRed"
                            position="absolute"
                            right={4}
                          >
                            ✓ Selected
                          </Text>
                        </Box>
                      ) : (
                        // No pre-selection — show all rooms from this branch
                        <Select
                          placeholder="Select room type"
                          value={roomType}
                          onChange={(e) => {
                            const id = e.target.value;
                            setRoomType(id);
                            setSelectedRoomId(id);
                            // Sync selectedRoomName for display in price summary
                            const room = availableRooms.find(
                              (r: any) => r.id === id
                            );
                            setSelectedRoomName(room?.name || "");
                            if (errors.roomType) {
                              setErrors({ ...errors, roomType: "" });
                            }
                          }}
                          bg="surfaceBlack"
                          border="1px"
                          borderColor="whiteAlpha.200"
                          h={14}
                          _focus={{ ring: 2, ringColor: "primaryRed" }}
                        >
                          {availableRooms.map((room: any) => {
                            const price = extractPrice(room.price);
                            return (
                              <option key={room.id} value={room.id}>
                                {room.name}
                                {price !== null
                                  ? ` — ${formatCurrency(price)}/night`
                                  : ""}
                              </option>
                            );
                          })}
                        </Select>
                      )}
                      <FormErrorMessage>{errors.roomType}</FormErrorMessage>
                    </FormControl>

                    {/* Contact Information */}
                    <FormControl isRequired isInvalid={!!errors.fullName}>
                      <FormLabel fontSize="sm" fontWeight="medium">
                        Full Name
                      </FormLabel>
                      <Input
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName)
                            setErrors({ ...errors, fullName: "" });
                        }}
                        placeholder="Enter your full name"
                        bg="surfaceBlack"
                        border="1px"
                        borderColor="whiteAlpha.200"
                        h={14}
                        _focus={{ ring: 2, ringColor: "primaryRed" }}
                      />
                      <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.email}>
                      <FormLabel fontSize="sm" fontWeight="medium">
                        Email Address
                      </FormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email)
                            setErrors({ ...errors, email: "" });
                        }}
                        placeholder="your.email@example.com"
                        bg="surfaceBlack"
                        border="1px"
                        borderColor="whiteAlpha.200"
                        h={14}
                        _focus={{ ring: 2, ringColor: "primaryRed" }}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.phone}>
                      <FormLabel fontSize="sm" fontWeight="medium">
                        Phone Number
                      </FormLabel>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone)
                            setErrors({ ...errors, phone: "" });
                        }}
                        placeholder="Enter phone number"
                        maxLength={11}
                        bg="surfaceBlack"
                        border="1px"
                        borderColor="whiteAlpha.200"
                        h={14}
                        _focus={{ ring: 2, ringColor: "primaryRed" }}
                      />
                      <FormErrorMessage>{errors.phone}</FormErrorMessage>
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
                            {roomType
                              ? formatCurrency(roomRatePerNight)
                              : "Select room type"}
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
                        <Box
                          borderTop="1px"
                          borderColor="whiteAlpha.200"
                          pt={3}
                        >
                          <Flex
                            justify="space-between"
                            align="center"
                            gap={8}
                          >
                            <Text fontWeight="bold">Estimated Total</Text>
                            <Text
                              fontSize="2xl"
                              fontWeight="black"
                              color="primaryRed"
                            >
                              {totalPrice > 0 ? formatCurrency(totalPrice) : "-"}
                            </Text>
                          </Flex>
                        </Box>
                        {!roomType && (
                          <Text
                            color="whiteAlpha.500"
                            fontSize="xs"
                            fontStyle="italic"
                            textAlign="center"
                          >
                            Please select a room type to see pricing
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </VStack>
                </GridItem>

                {/* Calendar Side - Desktop Only */}
                <GridItem
                  display={{ base: "none", lg: "block" }}
                  borderLeft="1px"
                  borderColor="whiteAlpha.100"
                  pl={10}
                >
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">
                      Availability Calendar
                    </Text>

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
                      <Text fontWeight="bold" fontSize="md">
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

                    <Grid templateColumns="repeat(7, 1fr)" gap={1}>
                      {[
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                      ].map((day) => (
                        <Text
                          key={day}
                          color="whiteAlpha.400"
                          fontSize="11px"
                          fontWeight="bold"
                          textTransform="uppercase"
                          textAlign="center"
                          h={10}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {day.slice(0, 3)}
                        </Text>
                      ))}

                      {calendarDays.map((date, index) => {
                        if (!date)
                          return <Box key={`empty-${index}`} h={12} />;

                        const isSelected = isDateSelected(date);
                        const isInRange = isDateInRange(date);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const isPast = date < today;
                        const isCheckIn =
                          checkInDate &&
                          date.toDateString() === checkInDate.toDateString();
                        const isCheckOut =
                          checkOutDate &&
                          date.toDateString() === checkOutDate.toDateString();

                        return (
                          <Button
                            key={index}
                            h={12}
                            fontSize="sm"
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
                            onClick={() => {
                              if (isPast) return;
                              if (
                                !checkInDate ||
                                (checkInDate && checkOutDate)
                              ) {
                                setCheckInDate(date);
                                setCheckOutDate(null);
                                setErrors({
                                  ...errors,
                                  dates: "",
                                  checkIn: "",
                                  checkOut: "",
                                });
                              } else if (date > checkInDate) {
                                setCheckOutDate(date);
                                setErrors({
                                  ...errors,
                                  dates: "",
                                  checkIn: "",
                                  checkOut: "",
                                });
                              } else {
                                setCheckInDate(date);
                                setCheckOutDate(null);
                                setErrors({
                                  ...errors,
                                  dates: "",
                                  checkIn: "",
                                  checkOut: "",
                                });
                              }
                            }}
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

                    <HStack spacing={4} pt={4} fontSize="xs" justify="center">
                      <HStack spacing={1}>
                        <Box w={3} h={3} bg="primaryRed" borderRadius="sm" />
                        <Text color="whiteAlpha.600" fontSize="xs">
                          Selected
                        </Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Box
                          w={3}
                          h={3}
                          bg="rgba(234, 42, 51, 0.3)"
                          borderRadius="sm"
                        />
                        <Text color="whiteAlpha.600" fontSize="xs">
                          In Range
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </GridItem>
              </Grid>
            </VStack>
          </form>
        </ModalBody>

        <ModalFooter
          p={{ base: 4, md: 10 }}
          borderTop="1px"
          borderColor="whiteAlpha.100"
          bg="luxuryBlack"
          position={{ base: "relative", md: "sticky" }}
          bottom={0}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={{ base: 3, md: 6 }}
            w="full"
          >
            <Text
              flex={1}
              color="whiteAlpha.600"
              fontSize={{ base: "xs", md: "sm" }}
              lineHeight="relaxed"
              display={{ base: "none", md: "block" }}
            >
              By clicking confirm, you agree to our booking terms and
              conditions. A confirmation email will be sent to your registered
              address.
            </Text>
            <Button
              onClick={handleSubmit}
              bg="primaryRed"
              color="white"
              h={{ base: 14, md: 16 }}
              minW={{ base: "full", md: "240px" }}
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="bold"
              rightIcon={<Icon as={MdArrowForward} />}
              _hover={{ bg: "red.600" }}
              _active={{ transform: "scale(0.95)" }}
              shadow="lg"
              isDisabled={
                !checkInDate ||
                !checkOutDate ||
                numberOfNights === 0 ||
                !roomType ||
                !fullName ||
                !email ||
                !phone
              }
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