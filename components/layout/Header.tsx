'use client'

import { useState, useEffect } from 'react'
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
  useDisclosure,
  Avatar,
  MenuDivider
} from '@chakra-ui/react'
import { FiMenu, FiX, FiMoon, FiSun, FiCode, FiUser, FiLogOut } from 'react-icons/fi'
import NextLink from 'next/link'
import { useAuth } from '@/app/contexts/AuthContext'

const Links = [
  { name: 'Templates', href: '/templates' },
  { name: 'Builder', href: '/builder' },
]

const Header = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Always call hooks at the top level
  const hoverBgValue = useColorModeValue('gray.100', 'gray.700')
  const avatarBgValue = useColorModeValue('brand.500', 'brand.400')
  const headerBgValue = useColorModeValue(
    scrolled ? 'white' : 'transparent',
    scrolled ? 'gray.900' : 'transparent'
  )
  const borderColorValue = useColorModeValue(
    scrolled ? 'gray.200' : 'transparent',
    scrolled ? 'gray.700' : 'transparent'
  )
  const textColorValue = useColorModeValue('gray.800', 'white')

  // Use these only after mount to avoid SSR mismatch
  const hoverBg = mounted ? hoverBgValue : undefined
  const avatarBg = mounted ? avatarBgValue : undefined
  const headerBg = mounted ? headerBgValue : undefined
  const borderColor = mounted ? borderColorValue : undefined
  const textColor = mounted ? textColorValue : undefined

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <Box
      as="header"
      position="fixed"
      w="100%"
      zIndex={1000}
      bg={headerBg}
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
                  bg={avatarBg}
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
                    bg: hoverBg,
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
            
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar
                    size="sm"
                    name={user.name}
                    bg={avatarBg}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiUser />} as={NextLink} href="/profile">
                    Profile
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Button as={NextLink} href="/login" variant="ghost">
                  Sign In
                </Button>
                <Button as={NextLink} href="/signup" colorScheme="blue">
                  Sign Up
                </Button>
              </HStack>
            )}

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
                    bg: hoverBg,
                  }}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    as={NextLink}
                    href="/profile"
                    px={2}
                    py={2}
                    rounded="md"
                    fontWeight="medium"
                    color={textColor}
                    _hover={{
                      textDecoration: 'none',
                      bg: hoverBg,
                    }}
                  >
                    Profile
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    w="full"
                    justifyContent="flex-start"
                    px={2}
                    py={2}
                    fontWeight="medium"
                    color={textColor}
                    _hover={{
                      bg: hoverBg,
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
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
                      bg: hoverBg,
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
                </>
              )}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default Header