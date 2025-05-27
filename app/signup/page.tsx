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

export default function Signup() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    terms?: string
  }>({})
  const toast = useToast()
  const { signup } = useAuth()

  const validateForm = () => {
    const newErrors: {
      name?: string
      email?: string
      password?: string
      terms?: string
    } = {}

    if (!name) {
      newErrors.name = 'Name is required'
    }
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and privacy policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setIsLoading(true)
      await signup(name, email, password)
      toast({
        title: 'Account created successfully',
        description: 'Welcome to TechResume!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/')
    } catch (error: any) {
      let errorMsg = 'Signup failed'
      let passwordErrors: string[] = []
      if (error instanceof Error) {
        try {
          const errObj = JSON.parse(error.message)
          if (errObj.details && Array.isArray(errObj.details)) {
            errObj.details.forEach((detail: any) => {
              if (detail.path && detail.path[0] === 'password') {
                passwordErrors.push(detail.message)
              }
            })
            if (passwordErrors.length > 0) {
              setErrors((prev) => ({ ...prev, password: passwordErrors.join(' ') }))
            }
            errorMsg = errObj.error || error.message
          } else {
            errorMsg = errObj.error || error.message
          }
        } catch {
          errorMsg = error.message
        }
      }
      toast({
        title: 'Signup failed',
        description: passwordErrors.length > 0 ? passwordErrors.join(' ') : errorMsg,
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
            <Heading fontSize="3xl">Create your account</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              to start building your tech resume
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
                <FormControl id="name" isRequired isInvalid={!!errors.name}>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl id="email" isRequired isInvalid={!!errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl id="password" isRequired isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Stack spacing={6}>
                  <FormControl isInvalid={!!errors.terms}>
                    <Checkbox
                      isChecked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                    >
                      I agree to the{' '}
                      <Link as={NextLink} href="/terms" color={'brand.500'}>
                        terms of service
                      </Link>{' '}
                      and{' '}
                      <Link as={NextLink} href="/privacy" color={'brand.500'}>
                        privacy policy
                      </Link>
                    </Checkbox>
                    <FormErrorMessage>{errors.terms}</FormErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    isLoading={isLoading}
                    loadingText="Creating account..."
                  >
                    Create account
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
                Sign up with GitHub
              </Button>
            </Stack>
          </Box>
          
          <HStack spacing={1} justify="center">
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Already have an account?
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