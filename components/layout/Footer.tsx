'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  SimpleGrid,
  useColorModeValue,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'
import NextLink from 'next/link'

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  )
}

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container as={Stack} maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align="flex-start">
            <ListHeader>Product</ListHeader>
            <Link as={NextLink} href="/templates">Templates</Link>
            <Link as={NextLink} href="/pricing">Pricing</Link>
            <Link as={NextLink} href="/faq">FAQ</Link>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Company</ListHeader>
            <Link as={NextLink} href="/about">About Us</Link>
            <Link as={NextLink} href="/blog">Blog</Link>
            <Link as={NextLink} href="/careers">Careers</Link>
            <Link as={NextLink} href="/contact">Contact Us</Link>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Resources</ListHeader>
            <Link as={NextLink} href="/guides">Resume Guides</Link>
            <Link as={NextLink} href="/interview-tips">Interview Tips</Link>
            <Link as={NextLink} href="/career-advice">Career Advice</Link>
            <Link as={NextLink} href="/tech-skills">Tech Skills</Link>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Legal</ListHeader>
            <Link as={NextLink} href="/privacy">Privacy Policy</Link>
            <Link as={NextLink} href="/terms">Terms of Service</Link>
            <Link as={NextLink} href="/cookies">Cookie Policy</Link>
            <Link as={NextLink} href="/licenses">Licenses</Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW="container.xl"
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text fontFamily="mono">
            © {new Date().getFullYear()} TechResume. All rights reserved
          </Text>
          <Stack direction="row" spacing={6}>
            <IconButton
              aria-label="GitHub"
              icon={<FiGithub />}
              size="md"
              variant="ghost"
            />
            <IconButton
              aria-label="Twitter"
              icon={<FiTwitter />}
              size="md"
              variant="ghost"
            />
            <IconButton
              aria-label="LinkedIn"
              icon={<FiLinkedin />}
              size="md"
              variant="ghost"
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}