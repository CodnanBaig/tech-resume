'use client'

import { Box, Button, Container, Flex, Heading, Image, Link, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { FiArrowRight, FiFileText, FiDownload, FiCpu } from 'react-icons/fi'
import NextLink from 'next/link'

const Feature = ({ title, text, icon }: { title: string; text: string; icon: React.ReactElement }) => {
  return (
    <Stack spacing={4} align="flex-start">
      <Flex
        w={12}
        h={12}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={useColorModeValue('gray.100', 'gray.700')}
        color={useColorModeValue('gray.600', 'gray.200')}
      >
        {icon}
      </Flex>
      <Box>
        <Heading size="md" mb={2} fontFamily="mono">
          {title}
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
      </Box>
    </Stack>
  )
}

export default function Home() {
  const bgGradient = useColorModeValue(
    'linear(to-r, gray.50, blue.50, purple.50)',
    'linear(to-r, gray.900, blue.900, purple.900)'
  )

  return (
    <Box as="main">
      {/* Hero Section */}
      <Box 
        bgGradient={bgGradient}
        pt={{ base: 16, md: 24 }} 
        pb={{ base: 16, md: 24 }}
      >
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 8, md: 16 }}
            align="center"
          >
            <Stack spacing={6} maxW="lg">
              <Heading
                as="h1"
                size="3xl"
                fontWeight="bold"
                lineHeight="1.2"
                bgGradient="linear(to-r, blue.500, purple.500)"
                bgClip="text"
              >
                Build a Developer Resume That Gets Noticed
              </Heading>
              <Text 
                fontSize="xl" 
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Create a professional, tech-focused resume that highlights your skills and experience.
                Designed specifically for developers, designers, and data scientists.
              </Text>
              <Stack 
                direction={{ base: 'column', sm: 'row' }} 
                spacing={4}
              >
                <Button
                  as={NextLink}
                  href="/builder"
                  size="lg"
                  colorScheme="blue"
                  fontWeight="bold"
                  px={8}
                  rightIcon={<FiArrowRight />}
                >
                  Start Building
                </Button>
                <Button
                  as={NextLink}
                  href="/templates"
                  size="lg"
                  variant="outline"
                  colorScheme="blue"
                >
                  View Templates
                </Button>
              </Stack>
            </Stack>
            <Box
              w={{ base: 'full', md: '50%' }}
              rounded="lg"
              overflow="hidden"
              shadow="2xl"
              borderWidth="1px"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <Image
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Resume preview"
                objectFit="cover"
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={{ base: 12, md: 20 }}>
        <Container maxW="container.xl">
          <Stack spacing={12}>
            <Box textAlign="center">
              <Heading
                as="h2"
                size="xl"
                fontWeight="bold"
                mb={4}
              >
                Features built for tech professionals
              </Heading>
              <Text 
                fontSize="lg" 
                color={useColorModeValue('gray.600', 'gray.400')} 
                maxW="2xl" 
                mx="auto"
              >
                Our resume builder is designed with the unique needs of the tech industry in mind.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} px={{ base: 4, md: 0 }}>
              <Feature
                icon={<FiCpu size="24px" />}
                title="Tech-focused Sections"
                text="Dedicated sections for your tech stack, GitHub projects, and coding skills that recruiters are looking for."
              />
              <Feature
                icon={<FiFileText size="24px" />}
                title="Multiple Templates"
                text="Choose from modern, ATS-friendly templates designed specifically for tech roles and companies."
              />
              <Feature
                icon={<FiDownload size="24px" />}
                title="Export Options"
                text="Download as PDF, copy as Markdown for GitHub or your personal website, or generate a shareable link."
              />
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        bg={useColorModeValue('blue.50', 'blue.900')} 
        py={{ base: 12, md: 20 }}
      >
        <Container maxW="container.xl" textAlign="center">
          <Heading
            as="h2"
            size="xl"
            mb={6}
          >
            Ready to land your next tech role?
          </Heading>
          <Text 
            fontSize="lg" 
            maxW="2xl" 
            mx="auto" 
            mb={8}
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            Join thousands of developers who've created standout resumes and secured interviews at top tech companies.
          </Text>
          <Button
            as={NextLink}
            href="/builder"
            size="lg"
            colorScheme="blue"
            px={8}
            rightIcon={<FiArrowRight />}
          >
            Create Your Resume Now
          </Button>
        </Container>
      </Box>
    </Box>
  )
}