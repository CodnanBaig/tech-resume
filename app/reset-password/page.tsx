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
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSearchParams } from 'next/navigation'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{
    password?: string
    confirmPassword?: string
    token?: string
  }>({})
  const [token, setToken] = useState<string | null>(null)
  const toast = useToast()
  const { resetPassword } = useAuth()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      setErrors((prev) => ({ ...prev, token: 'Reset token is missing' }))
    } else {
      setToken(tokenParam)
    }
  }, [searchParams])

  const validateForm = () => {
    const newErrors: {
      password?: string
      confirmPassword?: string
    } = {}

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || !token) return

    try {
      setIsLoading(true)
      await resetPassword(token, password)
      setIsSuccess(true)
      toast({
        title: 'Password reset successful',
        description: 'You can now log in with your new password',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Password reset failed',
        description: error instanceof Error ? error.message : 'Please try again',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (errors.token) {
    return (
      <Box as="main" py={{ base: 24, md: 32 }}>
        <Container maxW="lg" py={{ base: 12, md: 10 }} px={{ base: 4, sm: 8 }}>
          <Stack spacing={8} textAlign="center">
            <Heading fontSize="3xl">Invalid Reset Link</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              The password reset link is invalid or has expired.
              Please request a new password reset link.
            </Text>
            <Button
              as={NextLink}
              href="/forgot-password"
              colorScheme="blue"
              size="lg"
              fontSize="md"
            >
              Request new reset link
            </Button>
          </Stack>
        </Container>
      </Box>
    )
  }

  if (isSuccess) {
    return (
      <Box as="main" py={{ base: 24, md: 32 }}>
        <Container maxW="lg" py={{ base: 12, md: 10 }} px={{ base: 4, sm: 8 }}>
          <Stack spacing={8} textAlign="center">
            <Heading fontSize="3xl">Password Reset Successful</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Your password has been reset successfully.
              You can now log in with your new password.
            </Text>
            <Button
              as={NextLink}
              href="/login"
              colorScheme="blue"
              size="lg"
              fontSize="md"
            >
              Go to login
            </Button>
          </Stack>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="main" py={{ base: 24, md: 32 }}>
      <Container maxW="lg" py={{ base: 12, md: 10 }} px={{ base: 4, sm: 8 }}>
        <Stack spacing={8}>
          <Stack spacing={6} textAlign="center">
            <Heading fontSize="3xl">Reset your password</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Enter your new password below
            </Text>
          </Stack>
          <Box
            py={{ base: 6, sm: 8 }}
            px={{ base: 4, sm: 10 }}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="lg"
            borderRadius="xl"
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="password" isInvalid={!!errors.password}>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  isLoading={isLoading}
                  loadingText="Resetting..."
                >
                  Reset Password
                </Button>
              </Stack>
            </form>
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