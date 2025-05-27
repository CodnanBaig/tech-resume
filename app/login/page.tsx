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
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react'
import { FiGithub } from 'react-icons/fi'
import NextLink from 'next/link'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const toast = useToast()
  const { login } = useAuth()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setIsLoading(true)
      await login(email, password)
      if (rememberMe) {
        // Store email in localStorage for "Remember me" functionality
        localStorage.setItem('rememberedEmail', email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }
      // Redirect to homepage after successful login
      router.push('/')
    } catch (error) {
      toast({
        title: 'Login failed',
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
                <FormControl id="password" isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align="start"
                    justify="space-between"
                  >
                    <Checkbox
                      isChecked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    >
                      Remember me
                    </Checkbox>
                    <Link as={NextLink} href="/forgot-password" color={'brand.500'}>
                      Forgot password?
                    </Link>
                  </Stack>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    isLoading={isLoading}
                    loadingText="Signing in..."
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </form>
            
            <Stack spacing={4} mt={8}>
              <Divider />
              <Button
                w="full"
                variant="outline"
                leftIcon={<FiGithub />}
                onClick={() => {
                  // TODO: Implement GitHub OAuth
                  toast({
                    title: 'Coming soon',
                    description: 'GitHub authentication will be available soon',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                  })
                }}
              >
                Continue with GitHub
              </Button>
            </Stack>
          </Box>
          
          <HStack spacing={1} justify="center">
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Don&apos;t have an account?
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