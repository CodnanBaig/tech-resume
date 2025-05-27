'use client'

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Badge,
} from '@chakra-ui/react'
import { FiEdit2, FiSave, FiTrash2, FiDownload, FiEye } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Account() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const toast = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Mock saved resumes data
  const [savedResumes] = useState([
    {
      id: 1,
      title: 'Software Engineer Resume',
      template: 'modern',
      lastModified: '2024-03-15',
      status: 'draft',
    },
    {
      id: 2,
      title: 'Senior Developer Resume',
      template: 'developer',
      lastModified: '2024-03-10',
      status: 'published',
    },
  ])

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }))
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate passwords if changing
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match')
        }
        if (!formData.currentPassword) {
          throw new Error('Current password is required to set a new password')
        }
      }

      await updateProfile({
        name: formData.name,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })

      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
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
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to update profile',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteResume = (id: number) => {
    // TODO: Implement resume deletion
    toast({
      title: 'Resume deleted',
      description: 'The resume has been moved to trash.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <Box as="main" py={{ base: 24, md: 32 }}>
      <Container maxW="container.xl">
        <Stack spacing={8}>
          <Flex justify="space-between" align="center">
            <Heading size="lg">Account Settings</Heading>
            {!isEditing ? (
              <Button
                leftIcon={<FiEdit2 />}
                onClick={() => setIsEditing(true)}
                colorScheme="blue"
                variant="outline"
              >
                Edit Profile
              </Button>
            ) : (
              <HStack>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false)
                    setFormData(prev => ({
                      ...prev,
                      name: user.name || '',
                      email: user.email || '',
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    }))
                  }}
                >
                  Cancel
                </Button>
                <Button
                  leftIcon={<FiSave />}
                  onClick={handleProfileUpdate}
                  colorScheme="blue"
                  isLoading={isLoading}
                >
                  Save Changes
                </Button>
              </HStack>
            )}
          </Flex>

          <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={8}>
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Box
                  p={6}
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="lg"
                  shadow="md"
                  borderWidth="1px"
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                  <VStack spacing={4}>
                    <Avatar
                      size="xl"
                      name={user.name}
                      bg={useColorModeValue('blue.500', 'blue.400')}
                    />
                    <Text fontSize="lg" fontWeight="medium">
                      {user.name}
                    </Text>
                    <Text color={useColorModeValue('gray.600', 'gray.400')}>
                      {user.email}
                    </Text>
                  </VStack>
                </Box>

                <Box
                  p={6}
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="lg"
                  shadow="md"
                  borderWidth="1px"
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                  <VStack spacing={4} align="stretch">
                    <Text fontWeight="medium">Account Stats</Text>
                    <HStack justify="space-between">
                      <Text color={useColorModeValue('gray.600', 'gray.400')}>
                        Saved Resumes
                      </Text>
                      <Text fontWeight="medium">{savedResumes.length}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color={useColorModeValue('gray.600', 'gray.400')}>
                        Published
                      </Text>
                      <Text fontWeight="medium">
                        {savedResumes.filter(r => r.status === 'published').length}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>

            <GridItem>
              <Tabs variant="enclosed">
                <TabList>
                  <Tab>Profile</Tab>
                  <Tab>Saved Resumes</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel px={0}>
                    <Box
                      p={6}
                      bg={useColorModeValue('white', 'gray.800')}
                      borderRadius="lg"
                      shadow="md"
                      borderWidth="1px"
                      borderColor={useColorModeValue('gray.200', 'gray.700')}
                    >
                      <form onSubmit={handleProfileUpdate}>
                        <Stack spacing={6}>
                          <FormControl>
                            <FormLabel>Full Name</FormLabel>
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
                              isDisabled={true}
                              bg={useColorModeValue('gray.50', 'gray.700')}
                            />
                            <Text fontSize="sm" color="gray.500" mt={1}>
                              Email cannot be changed
                            </Text>
                          </FormControl>

                          {isEditing && (
                            <>
                              <Divider />
                              <Heading size="sm">Change Password</Heading>

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
                            </>
                          )}
                        </Stack>
                      </form>
                    </Box>
                  </TabPanel>

                  <TabPanel px={0}>
                    <Stack spacing={4}>
                      {savedResumes.map((resume) => (
                        <Card
                          key={resume.id}
                          variant="outline"
                          borderWidth="1px"
                          borderColor={useColorModeValue('gray.200', 'gray.700')}
                        >
                          <CardHeader pb={2}>
                            <Flex justify="space-between" align="center">
                              <Heading size="md">{resume.title}</Heading>
                              <Badge
                                colorScheme={resume.status === 'published' ? 'green' : 'gray'}
                              >
                                {resume.status}
                              </Badge>
                            </Flex>
                          </CardHeader>
                          <CardBody pt={0}>
                            <Flex justify="space-between" align="center">
                              <Text color={useColorModeValue('gray.600', 'gray.400')}>
                                Template: {resume.template}
                              </Text>
                              <Text color={useColorModeValue('gray.600', 'gray.400')}>
                                Last modified: {resume.lastModified}
                              </Text>
                            </Flex>
                            <HStack spacing={2} mt={4}>
                              <Button
                                leftIcon={<FiEye />}
                                size="sm"
                                variant="outline"
                                onClick={() => router.push(`/builder?id=${resume.id}`)}
                              >
                                Edit
                              </Button>
                              <Button
                                leftIcon={<FiDownload />}
                                size="sm"
                                variant="outline"
                              >
                                Download
                              </Button>
                              <Button
                                leftIcon={<FiTrash2 />}
                                size="sm"
                                variant="outline"
                                colorScheme="red"
                                onClick={() => handleDeleteResume(resume.id)}
                              >
                                Delete
                              </Button>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GridItem>
          </Grid>
        </Stack>
      </Container>
    </Box>
  )
} 