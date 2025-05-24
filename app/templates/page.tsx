'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional layout with a clean, professional look. Perfect for most tech roles.',
    image: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    popular: true,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with a sidebar layout. Great for highlighting technical skills.',
    image: 'https://images.pexels.com/photos/4065183/pexels-photo-4065183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    popular: false,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, minimalist design that focuses on content without distractions.',
    image: 'https://images.pexels.com/photos/5076531/pexels-photo-5076531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    popular: false,
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Specialized for software developers with sections for code projects and tech stacks.',
    image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    popular: true,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'For UI/UX designers and creative developers who want to showcase their personality.',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    popular: false,
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Bold and direct format ideal for startup environments and fast-paced tech companies.',
    image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    popular: false,
  },
]

export default function Templates() {
  return (
    <Box as="main" py={{ base: 24, md: 32 }}>
      <Container maxW="container.xl">
        <Stack spacing={8} mb={12}>
          <Box textAlign="center">
            <Heading
              as="h1"
              size="2xl"
              fontWeight="bold"
              mb={4}
            >
              Resume Templates
            </Heading>
            <Text 
              fontSize="xl" 
              color={useColorModeValue('gray.600', 'gray.400')} 
              maxW="3xl" 
              mx="auto"
            >
              Choose from our professionally designed templates tailored for tech industry roles.
              All templates are ATS-friendly and optimized for technical positions.
            </Text>
          </Box>
        </Stack>

        <Grid 
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} 
          gap={8}
          mb={16}
        >
          {templates.map((template) => (
            <Box
              key={template.id}
              borderRadius="lg"
              overflow="hidden"
              bg={useColorModeValue('white', 'gray.800')}
              borderWidth="1px"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              shadow="md"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-5px)',
                shadow: 'lg',
              }}
            >
              <Box position="relative">
                <Image
                  src={template.image}
                  alt={template.name}
                  height="220px"
                  width="100%"
                  objectFit="cover"
                />
                {template.popular && (
                  <Box
                    position="absolute"
                    top={4}
                    right={4}
                    bg="blue.500"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    Popular
                  </Box>
                )}
              </Box>
              <Box p={6}>
                <Heading size="md" mb={2} fontFamily="mono">
                  {template.name}
                </Heading>
                <Text color={useColorModeValue('gray.600', 'gray.400')} mb={4}>
                  {template.description}
                </Text>
                <Flex justify="space-between" align="center">
                  <Button
                    as={NextLink}
                    href={`/builder?template=${template.id}`}
                    colorScheme="blue"
                    size="sm"
                    rightIcon={<FiArrowRight />}
                  >
                    Use Template
                  </Button>
                  <Button
                    as={NextLink}
                    href={`/templates/${template.id}`}
                    variant="ghost"
                    size="sm"
                  >
                    Preview
                  </Button>
                </Flex>
              </Box>
            </Box>
          ))}
        </Grid>

        <Box 
          bg={useColorModeValue('blue.50', 'blue.900')} 
          p={{ base: 8, md: 12 }}
          borderRadius="xl"
          textAlign="center"
        >
          <Heading size="lg" mb={4}>
            Need a custom template for your specific tech role?
          </Heading>
          <Text 
            fontSize="lg" 
            mb={6} 
            maxW="2xl" 
            mx="auto"
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            We can create a personalized template that highlights your unique skills and matches your target company's culture.
          </Text>
          <Button
            as={NextLink}
            href="/contact"
            size="lg"
            colorScheme="blue"
            px={8}
          >
            Request Custom Template
          </Button>
        </Box>
      </Container>
    </Box>
  )
}