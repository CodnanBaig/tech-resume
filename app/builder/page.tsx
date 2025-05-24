'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
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
  useToast
} from '@chakra-ui/react'
import { FiArrowLeft, FiArrowRight, FiEye, FiDownload, FiCode } from 'react-icons/fi'
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

export default function Builder() {
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
  const toast = useToast()

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

  const updateResumeData = (section: string, data: any) => {
    setResumeData({
      ...resumeData,
      [section]: data
    })
  }

  const handleExport = () => {
    toast({
      title: 'Resume exported',
      description: 'Your resume has been downloaded as a PDF file.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
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
                Resume Preview
              </Heading>
              <Stack direction="row" spacing={3}>
                <Button
                  leftIcon={<FiDownload />}
                  colorScheme="blue"
                  onClick={handleExport}
                >
                  Download PDF
                </Button>
                <Button
                  leftIcon={<FiCode />}
                  variant="outline"
                  onClick={handleMarkdownCopy}
                >
                  Copy as Markdown
                </Button>
              </Stack>
            </Flex>

            <Tabs variant="enclosed">
              <TabList>
                <Tab>Classic</Tab>
                <Tab>Modern</Tab>
                <Tab>Minimal</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0} mt={4}>
                  <ResumePreview data={resumeData} template="classic" />
                </TabPanel>
                <TabPanel p={0} mt={4}>
                  <ResumePreview data={resumeData} template="modern" />
                </TabPanel>
                <TabPanel p={0} mt={4}>
                  <ResumePreview data={resumeData} template="minimal" />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        ) : (
          <Grid templateColumns={{ base: '1fr', lg: '3fr 2fr' }} gap={10}>
            <Box>
              <Heading size="lg" mb={8}>
                Build Your Tech Resume
              </Heading>

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
                bg={useColorModeValue('white', 'gray.800')}
                p={6}
                borderRadius="lg"
                shadow="md"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
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
            </Box>

            <Box
              display={{ base: 'none', lg: 'block' }}
              position="sticky"
              top="100px"
              height="fit-content"
            >
              <Heading size="md" mb={4}>
                Live Preview
              </Heading>
              <Box
                borderRadius="lg"
                shadow="md"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                overflow="hidden"
                bg="white"
                height="750px"
                overflowY="auto"
              >
                <ResumePreview data={resumeData} template="classic" scale={0.7} />
              </Box>
            </Box>
          </Grid>
        )}
      </Container>
    </Box>
  )
}