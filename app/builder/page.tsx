'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/AuthContext'
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Progress,
  Stack,
  Stepper,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useSteps,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  HStack
} from '@chakra-ui/react'
import { FiArrowLeft, FiArrowRight, FiEye, FiDownload, FiCode, FiEdit2 } from 'react-icons/fi'
import PersonalInfoForm from '@/components/builder/PersonalInfoForm'
import SkillsForm from '@/components/builder/SkillsForm'
import ExperienceForm from '@/components/builder/ExperienceForm'
import ProjectsForm from '@/components/builder/ProjectsForm'
import EducationForm from '@/components/builder/EducationForm'
import ResumePreview from '@/components/builder/ResumePreview'

const steps = [
  { title: 'Personal Info', description: 'Your basic information' },
  { title: 'Skills', description: 'Technical skills' },
  { title: 'Experience', description: 'Work history' },
  { title: 'Projects', description: 'Portfolio projects' },
  { title: 'Education', description: 'Academic background' },
]

// Responsive ResumePreview wrapper to avoid SSR hydration mismatch
function ResumePreviewResponsive(props: any) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    function handleResize() {
      setScale(window.innerWidth >= 992 ? 0.6 : 1)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return <ResumePreview {...props} scale={scale} />
}

export default function Builder() {
  const router = useRouter()
  const { user } = useAuth()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resumeId, setResumeId] = useState<string | null>(null)
  const [resumeTitle, setResumeTitle] = useState('')
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Move all useColorModeValue calls to the top
  const boxBg = useColorModeValue('white', 'gray.800')
  const boxBorder = useColorModeValue('gray.200', 'gray.700')
  const previewBorder = useColorModeValue('gray.200', 'gray.700')
  const previewBg = useColorModeValue('white', 'gray.800')

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    skills: [],
    experience: [],
    projects: [],
    education: []
  })
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const previewRefs = {
    classic: useRef<HTMLDivElement>(null),
    modern: useRef<HTMLDivElement>(null),
    minimal: useRef<HTMLDivElement>(null),
    developer: useRef<HTMLDivElement>(null),
    creative: useRef<HTMLDivElement>(null),
    startup: useRef<HTMLDivElement>(null)
  }
  const [selectedTemplate, setSelectedTemplate] = useState<'classic' | 'modern' | 'minimal' | 'developer' | 'creative' | 'startup'>('classic')

  // Auto-save functionality
  const debouncedSave = useCallback((data: any) => {
    if (!user) {
      // Only show one toast if not already shown
      if (!document.getElementById('auth-toast')) {
        toast({
          id: 'auth-toast',
          title: 'Authentication required',
          description: 'Please sign in to save your resume',
          status: 'warning',
          duration: 3000,
        })
      }
      return
    }
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }
    const timeout = setTimeout(async () => {
      setIsSaving(true)
      try {
        const endpoint = resumeId ? `/api/resumes/${resumeId}` : '/api/resumes'
        const method = resumeId ? 'PATCH' : 'POST'
        const response = await fetch(endpoint, {
          method,
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: resumeTitle || 'Untitled Resume',
            template: selectedTemplate,
            status: 'draft',
            personalInfo: data.personalInfo || {},
            skills: data.skills || [],
            experience: data.experience || [],
            projects: data.projects || [],
            education: data.education || []
          }),
        })
        if (!response.ok) {
          const error = await response.json()
          console.error('Save error:', error)
          if (!document.getElementById('save-error-toast')) {
            toast({
              id: 'save-error-toast',
              title: 'Error saving resume',
              description: error.message || 'Please try again',
              status: 'error',
              duration: 3000,
            })
          }
          return
        }
        const savedResume = await response.json()
        if (!resumeId) {
          setResumeId(savedResume._id)
          router.replace(`/builder?id=${savedResume._id}`, { scroll: false })
        }
        setLastSaved(new Date())
        toast({
          title: 'Resume saved',
          status: 'success',
          duration: 2000,
        })
      } catch (error) {
        console.error('Save error:', error)
        if (!document.getElementById('save-error-toast')) {
          toast({
            id: 'save-error-toast',
            title: 'Error saving resume',
            description: error instanceof Error ? error.message : 'Please try again',
            status: 'error',
            duration: 3000,
          })
        }
      } finally {
        setIsSaving(false)
      }
    }, 2000)
    setAutoSaveTimeout(timeout)
  }, [user, resumeId, resumeTitle, selectedTemplate, toast, router, autoSaveTimeout])

  // Load resume data if ID is provided
  useEffect(() => {
    const loadResume = async () => {
      const params = new URLSearchParams(window.location.search)
      const id = params.get('id')
      
      if (id && user) {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/resumes/${id}`)
          if (!response.ok) throw new Error('Failed to load resume')
          
          const resume = await response.json()
          setResumeId(resume._id)
          setResumeTitle(resume.title)
          setSelectedTemplate(resume.template)
          setResumeData({
            personalInfo: resume.personalInfo || {},
            skills: resume.skills || [],
            experience: resume.experience || [],
            projects: resume.projects || [],
            education: resume.education || [],
          })
          setLastSaved(new Date(resume.updatedAt))
        } catch (error) {
          toast({
            title: 'Error loading resume',
            description: 'Please try again',
            status: 'error',
            duration: 3000,
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadResume()
  }, [user, toast])

  // Update resume data and trigger auto-save
  const updateResumeData = (section: string, data: any) => {
    const updatedData = {
      ...resumeData,
      [section]: data
    }
    setResumeData(updatedData)
    debouncedSave(updatedData)
  }

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      setIsPreviewMode(true)
    }
  }

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  // Handle PDF export
  const handleExport = async () => {
    if (!previewRefs[selectedTemplate].current) return

    const element = previewRefs[selectedTemplate].current
    const opt = {
      margin: 0.5,
      filename: `${resumeTitle || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    try {
      // Dynamically import html2pdf only on the client side
      const html2pdf = (await import('html2pdf.js/dist/html2pdf.bundle.min.js')).default
      await html2pdf().set(opt).from(element).save()
      toast({
        title: 'PDF downloaded',
        status: 'success',
        duration: 2000,
      })
    } catch (error) {
      toast({
        title: 'Error generating PDF',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handleMarkdownCopy = () => {
    toast({
      title: 'Markdown copied',
      description: 'Markdown version of your resume has been copied to clipboard.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  // Save resume title
  const handleSaveTitle = async () => {
    if (!resumeId || !resumeTitle.trim()) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resumeTitle,
          template: selectedTemplate,
          status: 'draft',
          personalInfo: resumeData.personalInfo || {},
          skills: resumeData.skills || [],
          experience: resumeData.experience || [],
          projects: resumeData.projects || [],
          education: resumeData.education || []
        }),
      })

      if (!response.ok) throw new Error('Failed to update title')

      toast({
        title: 'Title updated',
        status: 'success',
        duration: 2000,
      })
      onClose()
    } catch (error) {
      toast({
        title: 'Error updating title',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Box as="main" py={{ base: 24, md: 32 }}>
        <Container maxW="container.xl">
          <Flex justify="center" align="center" minH="60vh">
            <Spinner size="xl" />
          </Flex>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="main" py={{ base: 24, md: 32 }}>
      <Container maxW="container.xl">
        {isPreviewMode ? (
          <Box>
            <Flex justifyContent="space-between" mb={8} alignItems="center">
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={() => setIsPreviewMode(false)}
                variant="ghost"
              >
                Back to Editor
              </Button>
              <Heading size="lg" fontWeight="bold">
                {resumeTitle || 'Untitled Resume'}
                <IconButton
                  aria-label="Edit title"
                  icon={<FiEdit2 />}
                  variant="ghost"
                  size="sm"
                  ml={2}
                  onClick={onOpen}
                />
              </Heading>
              <Stack direction="row" spacing={3}>
                <Button
                  leftIcon={<FiDownload />}
                  colorScheme="blue"
                  onClick={handleExport}
                  isLoading={isSaving}
                >
                  Download PDF
                </Button>
                <Button
                  leftIcon={<FiEdit2 />}
                  colorScheme="green"
                  onClick={async () => {
                    if (!user) {
                      if (!document.getElementById('auth-toast')) {
                        toast({
                          id: 'auth-toast',
                          title: 'Authentication required',
                          description: 'Please sign in to save your resume',
                          status: 'warning',
                          duration: 3000,
                        })
                      }
                      router.push('/login')
                      return
                    }
                    if (!resumeId) {
                      if (!document.getElementById('save-error-toast')) {
                        toast({
                          id: 'save-error-toast',
                          title: 'Error',
                          description: 'Please wait for the resume to be saved first',
                          status: 'error',
                          duration: 3000,
                        })
                      }
                      return
                    }
                    setIsSaving(true)
                    try {
                      const response = await fetch(`/api/resumes/${resumeId}`, {
                        method: 'PATCH',
                        headers: { 
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          title: resumeTitle || 'Untitled Resume',
                          template: selectedTemplate,
                          status: 'published',
                          personalInfo: resumeData.personalInfo || {},
                          skills: resumeData.skills || [],
                          experience: resumeData.experience || [],
                          projects: resumeData.projects || [],
                          education: resumeData.education || []
                        }),
                      })
                      if (!response.ok) {
                        const error = await response.json()
                        console.error('Save error:', error)
                        if (!document.getElementById('save-error-toast')) {
                          toast({
                            id: 'save-error-toast',
                            title: 'Error saving resume',
                            description: error.message || 'Please try again',
                            status: 'error',
                            duration: 3000,
                          })
                        }
                        return
                      }
                      toast({
                        title: 'Resume saved',
                        description: 'Your resume has been saved to your profile',
                        status: 'success',
                        duration: 3000,
                      })
                      router.push('/profile')
                    } catch (error) {
                      console.error('Save error:', error)
                      if (!document.getElementById('save-error-toast')) {
                        toast({
                          id: 'save-error-toast',
                          title: 'Error saving resume',
                          description: error instanceof Error ? error.message : 'Please try again',
                          status: 'error',
                          duration: 3000,
                        })
                      }
                    } finally {
                      setIsSaving(false)
                    }
                  }}
                  isLoading={isSaving}
                >
                  Save to Profile
                </Button>
              </Stack>
            </Flex>
            {lastSaved && (
              <Text fontSize="sm" color="gray.500" textAlign="center" mb={4}>
                Last saved: {lastSaved.toLocaleTimeString()}
              </Text>
            )}
            <Tabs variant="enclosed" onChange={(index) => {
              const templates: ('classic' | 'modern' | 'minimal' | 'developer' | 'creative' | 'startup')[] = 
                ['classic', 'modern', 'minimal', 'developer', 'creative', 'startup']
              setSelectedTemplate(templates[index])
            }}>
              <TabList>
                <Tab>Classic</Tab>
                <Tab>Modern</Tab>
                <Tab>Minimal</Tab>
                <Tab>Developer</Tab>
                <Tab>Creative</Tab>
                <Tab>Startup</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0} mt={4}>
                  <Box ref={previewRefs.classic}>
                    <ResumePreview data={resumeData} template="classic" />
                  </Box>
                </TabPanel>
                <TabPanel p={0} mt={4}>
                  <Box ref={previewRefs.modern}>
                    <ResumePreview data={resumeData} template="modern" />
                  </Box>
                </TabPanel>
                <TabPanel p={0} mt={4}>
                  <Box ref={previewRefs.minimal}>
                    <ResumePreview data={resumeData} template="minimal" />
                  </Box>
                </TabPanel>
                <TabPanel p={0} mt={4}>
                  <Box ref={previewRefs.developer}>
                    <ResumePreview data={resumeData} template="developer" />
                  </Box>
                </TabPanel>
                <TabPanel p={0} mt={4}>
                  <Box ref={previewRefs.creative}>
                    <ResumePreview data={resumeData} template="creative" />
                  </Box>
                </TabPanel>
                <TabPanel p={0} mt={4}>
                  <Box ref={previewRefs.startup}>
                    <ResumePreview data={resumeData} template="startup" />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        ) : (
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(12, 1fr)' }} gap={8}>
            <GridItem colSpan={{ base: 12, lg: 6 }}>
              <Box mb={6}>
                <Flex justify="space-between" align="center">
                  <Heading size="lg" fontWeight="bold">
                    {resumeTitle || 'Untitled Resume'}
                    <IconButton
                      aria-label="Edit title"
                      icon={<FiEdit2 />}
                      variant="ghost"
                      size="sm"
                      ml={2}
                      onClick={onOpen}
                    />
                  </Heading>
                  {isSaving && (
                    <HStack spacing={2}>
                      <Spinner size="sm" />
                      <Text fontSize="sm" color="gray.500">Saving...</Text>
                    </HStack>
                  )}
                  {lastSaved && !isSaving && (
                    <Text fontSize="sm" color="gray.500">
                      Last saved: {lastSaved.toLocaleTimeString()}
                    </Text>
                  )}
                </Flex>
              </Box>
              <Stepper
                index={activeStep}
                mb={8}
                colorScheme="blue"
                size="sm"
                orientation="horizontal"
              >
                {steps.map((step, index) => (
                  <Step key={index} onClick={() => setActiveStep(index)} cursor="pointer">
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>
                    <Box flexShrink={0}>
                      <StepTitle>{step.title}</StepTitle>
                    </Box>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>

              <Box
                bg={boxBg}
                p={6}
                borderRadius="lg"
                shadow="md"
                borderWidth="1px"
                borderColor={boxBorder}
              >
                {activeStep === 0 && (
                  <PersonalInfoForm
                    data={resumeData.personalInfo}
                    updateData={(data) => updateResumeData('personalInfo', data)}
                  />
                )}
                {activeStep === 1 && (
                  <SkillsForm
                    data={resumeData.skills}
                    updateData={(data) => updateResumeData('skills', data)}
                  />
                )}
                {activeStep === 2 && (
                  <ExperienceForm
                    data={resumeData.experience}
                    updateData={(data) => updateResumeData('experience', data)}
                  />
                )}
                {activeStep === 3 && (
                  <ProjectsForm
                    data={resumeData.projects}
                    updateData={(data) => updateResumeData('projects', data)}
                  />
                )}
                {activeStep === 4 && (
                  <EducationForm
                    data={resumeData.education}
                    updateData={(data) => updateResumeData('education', data)}
                  />
                )}

                <Flex mt={8} justifyContent="space-between">
                  <Button
                    leftIcon={<FiArrowLeft />}
                    onClick={handlePrev}
                    isDisabled={activeStep === 0}
                    variant="ghost"
                  >
                    Previous
                  </Button>
                  <Button
                    rightIcon={activeStep === steps.length - 1 ? <FiEye /> : <FiArrowRight />}
                    onClick={handleNext}
                    colorScheme="blue"
                  >
                    {activeStep === steps.length - 1 ? 'Preview Resume' : 'Next Step'}
                  </Button>
                </Flex>
              </Box>
            </GridItem>

            {/* Responsive Preview: below form on mobile, right and small on desktop */}
            <GridItem colSpan={{ base: 12, lg: 6 }}>
              <Box
                mt={{ base: 10, lg: 0 }}
                position={{ base: 'static', lg: 'sticky' }}
                top={{ lg: '100px' }}
                height={{ base: 'auto', lg: 'fit-content' }}
                w="100%"
                maxW="100vw"
                overflow="auto"
                mx={{ base: 0, lg: 'auto' }}
                px={{ base: 0, lg: 2 }}
              >
                <Heading size="md" mb={4}>
                  Live Preview
                </Heading>
                <ResumePreviewResponsive
                  data={resumeData}
                  template="classic"
                />
              </Box>
            </GridItem>
          </Grid>
        )}
      </Container>

      {/* Title Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Resume Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                placeholder="Enter resume title"
              />
            </FormControl>
            <Flex justify="flex-end" mt={4}>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleSaveTitle}
                isLoading={isSaving}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}