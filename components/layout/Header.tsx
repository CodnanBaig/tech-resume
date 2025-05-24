'use client'

import { useState } from 'react'
import { 
  Box, 
  Button, 
  Container, 
  Flex, 
  HStack, 
  IconButton, 
  Link, 
  Menu, 
  MenuButton, 
  MenuItem, 
  MenuList, 
  Stack, 
  Text, 
  useColorMode, 
  useColorModeValue, 
  useDisclosure 
} from '@chakra-ui/react'
import { FiMenu, FiX, FiMoon, FiSun, FiCode } from 'react-icons/fi'
import NextLink from 'next/link'

const Links = [
  { name: 'Templates', href: '/templates' },
  { name: 'Builder', href: '/builder' },
  { name: 'Examples', href: '/examples' },
]

const Header = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for header
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    })
  }

  const bgColor = useColorModeValue(
    scrolled ? 'white' : 'transparent',
    scrolled ? 'gray.900' : 'transparent'
  )
  
  const borderColor = useColorModeValue(
    scrolled ? 'gray.200' : 'transparent',
    scrolled ? 'gray.700' : 'transparent'
  )

  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Box
      as="header"
      position="fixed"
      w="100%"
      zIndex={1000}
      bg={bgColor}
      borderBottom={scrolled ? '1px' : '0'}
      borderColor={borderColor}
      transition="all 0.3s ease"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Link 
              as={NextLink} 
              href="/" 
              _hover={{ textDecoration: 'none' }}
            >
              <HStack spacing={2}>
                <Box 
                  p={1.5} 
                  bg={useColorModeValue('brand.500', 'brand.400')} 
                  color="white" 
                  borderRadius="md"
                >
                  <FiCode size="20px" />
                </Box>
                <Text 
                  fontFamily="mono" 
                  fontWeight="bold" 
                  fontSize="lg" 
                  color={textColor}
                >
                  TechResume
                </Text>
              </HStack>
            </Link>
            <HStack
              as="nav"
              spacing={6}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <Link
                  key={link.name}
                  as={NextLink}
                  href={link.href}
                  px={2}
                  py={1}
                  rounded="md"
                  fontWeight="medium"
                  color={textColor}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.100', 'gray.700'),
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems="center">
            <IconButton
              aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
              variant="ghost"
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
              mr={4}
            />
            
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Button as={NextLink} href="/login" variant="ghost">
                Sign In
              </Button>
              <Button as={NextLink} href="/signup" colorScheme="blue">
                Sign Up
              </Button>
            </HStack>

            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onToggle}
              icon={isOpen ? <FiX /> : <FiMenu />}
              variant="ghost"
              aria-label="Toggle Navigation"
              ml={2}
            />
          </Flex>
        </Flex>

        {/* Mobile menu */}
        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <Link
                  key={link.name}
                  as={NextLink}
                  href={link.href}
                  px={2}
                  py={2}
                  rounded="md"
                  fontWeight="medium"
                  color={textColor}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.100', 'gray.700'),
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                as={NextLink}
                href="/login"
                px={2}
                py={2}
                rounded="md"
                fontWeight="medium"
                color={textColor}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.100', 'gray.700'),
                }}
              >
                Sign In
              </Link>
              <Link
                as={NextLink}
                href="/signup"
                px={2}
                py={2}
                rounded="md"
                fontWeight="medium"
                color="white"
                bg="brand.500"
                _hover={{
                  textDecoration: 'none',
                  bg: 'brand.600',
                }}
              >
                Sign Up
              </Link>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default Header