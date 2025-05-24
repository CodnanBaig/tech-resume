'use client'

import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiGithub } from 'react-icons/fi'
import NextLink from 'next/link'

export default function Login() {
  return (
    <Box as="main" py={{ base: 24, md: 32 }}>
      <Container maxW="lg" py={{ base: 12, md: 10 }} px={{ base: 4, sm: 8 }}>
        <Stack spacing={8}>
          <Stack spacing={6} textAlign="center">
            <Heading fontSize="3xl">Sign in to your account</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              to continue to TechResume Builder
            </Text>
          </Stack>
          <Box
            py={{ base: 6, sm: 8 }}
            px={{ base: 4, sm: 10 }}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="lg"
            borderRadius="xl"
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link as={NextLink} href="/forgot-password" color={'brand.500'}>
                    Forgot password?
                  </Link>
                </Stack>
                <Button colorScheme="blue" size="lg" fontSize="md">
                  Sign in
                </Button>
              </Stack>
            </Stack>
            
            <Stack spacing={4} mt={8}>
              <Divider />
              <Button
                w="full"
                variant="outline"
                leftIcon={<FiGithub />}
              >
                Continue with GitHub
              </Button>
            </Stack>
          </Box>
          
          <HStack spacing={1} justify="center">
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Don't have an account?
            </Text>
            <Link as={NextLink} href="/signup" color={'brand.500'} fontWeight="semibold">
              Sign up
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}