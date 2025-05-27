'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  HStack,
  IconButton,
  Divider,
  Avatar,
  Badge,
  Spinner,
} from '@chakra-ui/react'
import { FiEdit2, FiTrash2, FiDownload, FiEye } from 'react-icons/fi'
import { useAuth } from '@/app/contexts/AuthContext'

export default function Profile() {
  const router = useRouter()
  const { user, updateProfile } = useAuth()
  const toast = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [savedResumes, setSavedResumes] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    setFormData(prev => ({
      ...prev,
      name: user.name || '',
      email: user.email || '',
    }))
    fetchResumes()
  }, [user, router])

  const fetchResumes = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/resumes')
      if (!response.ok) throw new Error('Failed to fetch resumes')
      const data = await response.json()
      setSavedResumes(data.resumes)
    } catch (error) {
      toast({
        title: 'Error loading resumes',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProfile({
        name: formData.name,
        currentPassword: formData.currentPassword || undefined,
        newPassword: formData.newPassword || undefined,
      })
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
      })
      setIsEditing(false)
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }))
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: error instanceof Error ? error.message : 'Something went wrong',
        status: 'error',
        duration: 5000,
      })
    }
  }

  const handleDeleteResume = async (id: string) => {
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete resume')
      
      setSavedResumes(prev => prev.filter(resume => resume._id !== id))
      toast({
        title: 'Resume deleted',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'Error deleting resume',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
      })
    }
  }

  if (!user) {
    return null
  }

  const boxBg = useColorModeValue('white', 'gray.800')
  const boxBorder = useColorModeValue('gray.200', 'gray.700')
  const avatarBg = useColorModeValue('brand.500', 'brand.400')

  return (
    <Box as="main" py={{ base: 24, md: 32 }}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={{ base: '1fr', lg: '300px 1fr' }}
          gap={8}
        >
          {/* Sidebar */}
          <GridItem>
            <VStack
              spacing={6}
              align="stretch"
              bg={boxBg}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={boxBorder}
            >
              <Flex direction="column" align="center">
                <Avatar
                  size="xl"
                  name={user.name}
                  bg={avatarBg}
                  mb={4}
                />
                <Heading size="md" textAlign="center">
                  {user.name}
                </Heading>
                <Text color={useColorModeValue('gray.600', 'gray.400')}>
                  {user.email}
                </Text>
              </Flex>
              <Divider />
              <VStack align="stretch" spacing={4}>
                <Text fontWeight="medium">Account Stats</Text>
                <HStack justify="space-between">
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    Saved Resumes
                  </Text>
                  <Badge colorScheme="blue">{savedResumes.length}</Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    Published Resumes
                  </Text>
                  <Badge colorScheme="green">
                    {savedResumes.filter(r => r.status === 'published').length}
                  </Badge>
                </HStack>
              </VStack>
            </VStack>
          </GridItem>

          {/* Main Content */}
          <GridItem>
            <Stack spacing={8}>
              {/* Profile Information */}
              <Box
                bg={boxBg}
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={boxBorder}
              >
                <Flex justify="space-between" align="center" mb={6}>
                  <Heading size="md">Profile Information</Heading>
                  <Button
                    leftIcon={<FiEdit2 />}
                    onClick={() => setIsEditing(!isEditing)}
                    size="sm"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </Flex>

                <form onSubmit={handleProfileUpdate}>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        isDisabled={!isEditing}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        name="email"
                        value={formData.email}
                        isDisabled
                        bg={useColorModeValue('gray.50', 'gray.700')}
                      />
                    </FormControl>

                    {isEditing && (
                      <>
                        <Divider my={4} />
                        <Heading size="sm" mb={4}>Change Password</Heading>
                        <FormControl>
                          <FormLabel>Current Password</FormLabel>
                          <Input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>New Password</FormLabel>
                          <Input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Confirm New Password</FormLabel>
                          <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          colorScheme="blue"
                          mt={4}
                          isDisabled={
                            formData.newPassword !== formData.confirmPassword
                          }
                        >
                          Save Changes
                        </Button>
                      </>
                    )}
                  </Stack>
                </form>
              </Box>

              {/* Saved Resumes */}
              <Box
                bg={boxBg}
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={boxBorder}
              >
                <Heading size="md" mb={6}>Saved Resumes</Heading>
                {isLoading ? (
                  <Flex justify="center" py={8}>
                    <Spinner />
                  </Flex>
                ) : savedResumes.length === 0 ? (
                  <Text color="gray.500" textAlign="center" py={8}>
                    No resumes saved yet. Create your first resume!
                  </Text>
                ) : (
                  <Stack spacing={4}>
                    {savedResumes.map((resume) => (
                      <Flex
                        key={resume._id}
                        justify="space-between"
                        align="center"
                        p={4}
                        bg={useColorModeValue('gray.50', 'gray.700')}
                        borderRadius="md"
                      >
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="medium">{resume.title}</Text>
                          <HStack spacing={2}>
                            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                              {resume.template} template
                            </Text>
                            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                              • Last modified: {new Date(resume.updatedAt).toLocaleDateString()}
                            </Text>
                            <Badge
                              colorScheme={resume.status === 'published' ? 'green' : 'gray'}
                            >
                              {resume.status}
                            </Badge>
                          </HStack>
                        </VStack>
                        <HStack spacing={2}>
                          <IconButton
                            aria-label="Edit resume"
                            icon={<FiEdit2 />}
                            size="sm"
                            variant="ghost"
                            onClick={() => router.push(`/builder?id=${resume._id}`)}
                          />
                          <IconButton
                            aria-label="Preview resume"
                            icon={<FiEye />}
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              // Fallback: if /preview/[id] does not exist, use /builder?id=... in preview mode
                              router.push(`/preview/${resume._id}`)
                            }}
                          />
                          <IconButton
                            aria-label="Delete resume"
                            icon={<FiTrash2 />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={async () => {
                              await handleDeleteResume(resume._id)
                              // UI will update because setSavedResumes is called in handleDeleteResume
                            }}
                          />
                        </HStack>
                      </Flex>
                    ))}
                  </Stack>
                )}
              </Box>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
} 