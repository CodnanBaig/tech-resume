'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import NextLink from 'next/link'
import ResumePreview from '@/components/builder/ResumePreview'
import { useEffect } from 'react'

type TemplateType = 'classic' | 'modern' | 'minimal' | 'developer' | 'creative' | 'startup'

// Dummy John Doe data
const dummyData = {
  personalInfo: {
    fullName: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    github: 'github.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe',
    summary: 'Experienced software engineer with a passion for building scalable applications and mentoring junior developers. Specialized in full-stack development with React, Node.js, and cloud technologies.'
  },
  skills: [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'SQL',
    'React', 'Next.js', 'Vue.js', 'HTML5', 'CSS3/SASS',
    'Node.js', 'Express', 'Django', 'Spring Boot', 'GraphQL',
    'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git',
    'VS Code', 'Jira', 'Postman', 'Figma'
  ],
  experience: [
    {
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: 'Present',
      highlights: [
        'Led development of microservices architecture serving 1M+ users',
        'Mentored 5 junior developers and conducted code reviews',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Optimized database queries improving response time by 40%'
      ]
    },
    {
      company: 'StartupX',
      position: 'Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2018-03',
      endDate: '2019-12',
      highlights: [
        'Developed and maintained React-based web applications',
        'Built RESTful APIs using Node.js and Express',
        'Collaborated with UX team to implement responsive designs',
        'Reduced server costs by 30% through optimization'
      ]
    }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Built a scalable e-commerce platform using Next.js and Node.js',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
      highlights: [
        'Implemented real-time inventory management',
        'Integrated payment processing with Stripe',
        'Achieved 99.9% uptime through proper error handling'
      ]
    },
    {
      name: 'Task Management App',
      description: 'Developed a collaborative task management application',
      technologies: ['React', 'Firebase', 'Material-UI'],
      highlights: [
        'Real-time updates using Firebase',
        'Implemented drag-and-drop interface',
        'Added user authentication and role-based access'
      ]
    }
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Master of Science in Computer Science',
      location: 'San Francisco, CA',
      startDate: '2016-09',
      endDate: '2018-05',
      highlights: ['GPA: 3.9/4.0', 'Specialized in Software Engineering', 'Thesis on Distributed Systems']
    },
    {
      school: 'State University',
      degree: 'Bachelor of Science in Computer Science',
      location: 'San Francisco, CA',
      startDate: '2012-09',
      endDate: '2016-05',
      highlights: ['GPA: 3.8/4.0', 'Dean\'s List', 'Computer Science Club President']
    }
  ]
}

export default function TemplatePreview() {
  const params = useParams()
  const router = useRouter()
  const templateId = params.templateId as string
  
  // Move hooks before conditional return
  const boxBg = useColorModeValue('white', 'gray.800')
  const boxBorder = useColorModeValue('gray.200', 'gray.700')

  // Validate template type
  useEffect(() => {
    const validTemplates: TemplateType[] = ['classic', 'modern', 'minimal', 'developer', 'creative', 'startup']
    if (!validTemplates.includes(templateId as TemplateType)) {
      router.push('/templates')
    }
  }, [templateId, router])

  if (!['classic', 'modern', 'minimal', 'developer', 'creative', 'startup'].includes(templateId)) {
    return null
  }

  return (
    <Box as="main" py={{ base: 24, md: 32 }}>
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" mb={8} alignItems="center">
          <Button
            as={NextLink}
            href="/templates"
            leftIcon={<FiArrowLeft />}
            variant="ghost"
          >
            Back to Templates
          </Button>
          <Heading size="lg" fontWeight="bold">
            Template Preview
          </Heading>
          <Button
            as={NextLink}
            href={`/builder?template=${templateId}`}
            colorScheme="blue"
          >
            Use This Template
          </Button>
        </Flex>

        <Box
          bg={boxBg}
          p={6}
          borderRadius="lg"
          shadow="md"
          borderWidth="1px"
          borderColor={boxBorder}
        >
          <ResumePreview 
            data={dummyData} 
            template={templateId as TemplateType} 
          />
        </Box>
      </Container>
    </Box>
  )
} 