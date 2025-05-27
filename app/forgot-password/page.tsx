'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ email?: string }>({})
  const toast = useToast()
  const { forgotPassword } = useAuth()

  const validateForm = () => {
    const newErrors: { email?: string } = {}
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setIsLoading(true)
      await forgotPassword(email)
      setIsSubmitted(true)
      toast({
        title: 'Reset email sent',
        description: 'Please check your email for password reset instructions',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Failed to send reset email',
        description: error instanceof Error ? error.message : 'Please try again',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box as="main" py={{ base: 24, md: 32 }}>
      <Container maxW="lg" py={{ base: 12, md: 10 }} px={{ base: 4, sm: 8 }}>
        <Stack spacing={8}>
          <Stack spacing={6} textAlign="center">
            <Heading fontSize="3xl">Forgot your password?</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Enter your email address and we'll send you instructions to reset your password
            </Text>
          </Stack>
          <Box
            py={{ base: 6, sm: 8 }}
            px={{ base: 4, sm: 10 }}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="lg"
            borderRadius="xl"
          >
            {isSubmitted ? (
              <Stack spacing={4} textAlign="center">
                <Text>
                  We've sent password reset instructions to your email address.
                  Please check your inbox and follow the link to reset your password.
                </Text>
                <Button
                  as={NextLink}
                  href="/login"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                >
                  Return to login
                </Button>
              </Stack>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl id="email" isInvalid={!!errors.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    isLoading={isLoading}
                    loadingText="Sending..."
                  >
                    Send reset instructions
                  </Button>
                </Stack>
              </form>
            )}
          </Box>
          
          <HStack spacing={1} justify="center">
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Remember your password?
            </Text>
            <Link as={NextLink} href="/login" color={'brand.500'} fontWeight="semibold">
              Sign in
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
} 