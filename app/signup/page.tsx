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

export default function Signup() {
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
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={6}>
                <Box>
                  <Checkbox>
                    I agree to the{' '}
                    <Link as={NextLink} href="/terms" color={'brand.500'}>
                      terms of service
                    </Link>{' '}
                    and{' '}
                    <Link as={NextLink} href="/privacy" color={'brand.500'}>
                      privacy policy
                    </Link>
                  </Checkbox>
                </Box>
                <Button colorScheme="blue" size="lg" fontSize="md">
                  Create account
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