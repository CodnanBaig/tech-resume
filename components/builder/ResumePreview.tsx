'use client'

import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Tag,
  Text,
  VStack,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiGithub, FiLinkedin } from 'react-icons/fi'

interface ResumePreviewProps {
  data: any
  template: 'classic' | 'modern' | 'minimal' | 'developer' | 'creative' | 'startup'
  scale?: number
}

export default function ResumePreview({ data, template, scale = 1 }: ResumePreviewProps) {
  // Extract data sections
  const { personalInfo = {}, skills = [], experience = [], projects = [], education = [] } = data

  // Choose the appropriate template component
  const TemplateComponent = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    developer: DeveloperTemplate,
    creative: CreativeTemplate,
    startup: StartupTemplate,
  }[template]

  return (
    <Box
      width="6in"
      height="8in"
      bg="white"
      boxShadow="lg"
      mx="auto"
      overflow="hidden"
      color="black"
      transform={`scale(${scale})`}
      transformOrigin="top center"
      style={{ 
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <TemplateComponent 
        personalInfo={personalInfo}
        skills={skills}
        experience={experience}
        projects={projects}
        education={education}
      />
    </Box>
  )
}

// Classic Template - Traditional and conservative
function ClassicTemplate({ personalInfo, skills, experience, projects, education }: { personalInfo: any, skills: any, experience: any, projects: any, education: any }) {
  return (
    <Box p={8}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Heading as="h1" size="xl" fontWeight="bold" mb={2}>
          {personalInfo.fullName || 'Your Name'}
        </Heading>
        <Text fontSize="lg" color="gray.700" mb={3}>
          {personalInfo.jobTitle || 'Software Developer'}
        </Text>
        
        <HStack spacing={4} justifyContent="center" flexWrap="wrap">
          {personalInfo.email && (
            <HStack spacing={1}>
              <Icon as={FiMail} color="gray.600" />
              <Text fontSize="sm">{personalInfo.email}</Text>
            </HStack>
          )}
          
          {personalInfo.phone && (
            <HStack spacing={1}>
              <Icon as={FiPhone} color="gray.600" />
              <Text fontSize="sm">{personalInfo.phone}</Text>
            </HStack>
          )}
          
          {personalInfo.location && (
            <HStack spacing={1}>
              <Icon as={FiMapPin} color="gray.600" />
              <Text fontSize="sm">{personalInfo.location}</Text>
            </HStack>
          )}
        </HStack>
        
        <HStack spacing={4} justifyContent="center" mt={2} flexWrap="wrap">
          {personalInfo.github && (
            <HStack spacing={1}>
              <Icon as={FiGithub} color="gray.600" />
              <Text fontSize="sm">{personalInfo.github}</Text>
            </HStack>
          )}
          
          {personalInfo.linkedin && (
            <HStack spacing={1}>
              <Icon as={FiLinkedin} color="gray.600" />
              <Text fontSize="sm">{personalInfo.linkedin}</Text>
            </HStack>
          )}
          
          {personalInfo.website && (
            <HStack spacing={1}>
              <Icon as={FiGlobe} color="gray.600" />
              <Text fontSize="sm">{personalInfo.website}</Text>
            </HStack>
          )}
        </HStack>
      </Box>

      <Divider borderColor="gray.400" mb={4} />

      {/* Summary */}
      {personalInfo.summary && (
        <Box mb={6}>
          <Heading as="h2" size="md" fontWeight="bold" mb={3} color="gray.800" textTransform="uppercase">
            Professional Summary
          </Heading>
          <Text fontSize="sm" color="gray.700">
            {personalInfo.summary}
          </Text>
        </Box>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <Box mb={6}>
          <Heading as="h2" size="md" fontWeight="bold" mb={3} color="gray.800" textTransform="uppercase">
            Technical Skills
          </Heading>
          <Flex wrap="wrap" gap={2}>
            {skills.map((skill: string, index: number) => (
              <Tag key={index} size="sm" colorScheme="blue" bg="blue.50" color="blue.800">
                {skill}
              </Tag>
            ))}
          </Flex>
        </Box>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <Box mb={6}>
          <Heading as="h2" size="md" fontWeight="bold" mb={3} color="gray.800" textTransform="uppercase">
            Work Experience
          </Heading>
          <Stack spacing={4}>
            {experience.map((exp: any, index: number) => (
              <Box key={index}>
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Text fontWeight="bold" fontSize="md">
                      {exp.title}
                    </Text>
                    <Text fontSize="md">{exp.company}</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600">
                      {exp.startDate} - {exp.endDate}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {exp.location}
                    </Text>
                  </Box>
                </Flex>
                <Text fontSize="sm" whiteSpace="pre-line" mt={1}>
                  {exp.description}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <Box mb={6}>
          <Heading as="h2" size="md" fontWeight="bold" mb={3} color="gray.800" textTransform="uppercase">
            Projects
          </Heading>
          <Stack spacing={4}>
            {projects.map((project: any, index: number) => (
              <Box key={index}>
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <Text fontWeight="bold" fontSize="md">
                    {project.name}
                  </Text>
                  {(project.githubUrl || project.liveUrl) && (
                    <HStack spacing={2} fontSize="xs">
                      {project.githubUrl && (
                        <Link href={project.githubUrl} isExternal color="blue.600">
                          GitHub
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link href={project.liveUrl} isExternal color="blue.600">
                          Live Demo
                        </Link>
                      )}
                    </HStack>
                  )}
                </Flex>
                <Text fontSize="sm" mt={1} mb={1}>
                  {project.description}
                </Text>
                <Text fontSize="xs" fontWeight="medium" color="gray.700">
                  Technologies: {project.technologies}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <Box mb={6}>
          <Heading as="h2" size="md" fontWeight="bold" mb={3} color="gray.800" textTransform="uppercase">
            Education
          </Heading>
          <Stack spacing={4}>
            {education.map((edu: any, index: number) => (
              <Box key={index}>
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Text fontWeight="bold" fontSize="md">
                      {edu.degree}
                    </Text>
                    <Text fontSize="md">{edu.institution}</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600">
                      {edu.startDate} - {edu.endDate}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {edu.location}
                    </Text>
                  </Box>
                </Flex>
                {edu.gpa && (
                  <Text fontSize="sm" color="gray.700" mt={1}>
                    GPA: {edu.gpa}
                  </Text>
                )}
                {edu.description && (
                  <Text fontSize="sm" whiteSpace="pre-line" mt={1}>
                    {edu.description}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

// Modern Template - Contemporary with sidebar layout
function ModernTemplate({ personalInfo, skills, experience, projects, education }: { personalInfo: any, skills: any, experience: any, projects: any, education: any }) {
  return (
    <Grid templateColumns="1fr 2.5fr" height="100%">
      {/* Sidebar */}
      <Box bg="blue.700" color="white" p={6}>
        <VStack align="start" spacing={6}>
          {/* Profile */}
          <Box>
            <Heading as="h1" size="lg" fontWeight="bold" mb={1}>
              {personalInfo.fullName || 'Your Name'}
            </Heading>
            <Text fontSize="md" fontWeight="medium" color="blue.100" mb={4}>
              {personalInfo.jobTitle || 'Software Developer'}
            </Text>

            <Stack spacing={3} mt={4}>
              {personalInfo.email && (
                <HStack spacing={2}>
                  <Icon as={FiMail} />
                  <Text fontSize="sm">{personalInfo.email}</Text>
                </HStack>
              )}
              {personalInfo.phone && (
                <HStack spacing={2}>
                  <Icon as={FiPhone} />
                  <Text fontSize="sm">{personalInfo.phone}</Text>
                </HStack>
              )}
              {personalInfo.location && (
                <HStack spacing={2}>
                  <Icon as={FiMapPin} />
                  <Text fontSize="sm">{personalInfo.location}</Text>
                </HStack>
              )}
              {personalInfo.website && (
                <HStack spacing={2}>
                  <Icon as={FiGlobe} />
                  <Text fontSize="sm">{personalInfo.website}</Text>
                </HStack>
              )}
              {personalInfo.github && (
                <HStack spacing={2}>
                  <Icon as={FiGithub} />
                  <Text fontSize="sm">{personalInfo.github}</Text>
                </HStack>
              )}
              {personalInfo.linkedin && (
                <HStack spacing={2}>
                  <Icon as={FiLinkedin} />
                  <Text fontSize="sm">{personalInfo.linkedin}</Text>
                </HStack>
              )}
            </Stack>
          </Box>

          {/* Skills */}
          {skills?.length > 0 && (
            <Box width="100%">
              <Heading as="h2" size="md" fontWeight="bold" mb={4} color="white">
                Technical Skills
              </Heading>
              <Flex wrap="wrap" gap={2}>
                {skills.map((skill: string, index: number) => (
                  <Tag key={index} size="sm" bg="blue.500" color="white" mb={2}>
                    {skill}
                  </Tag>
                ))}
              </Flex>
            </Box>
          )}

          {/* Education (in sidebar) */}
          {education?.length > 0 && (
            <Box width="100%">
              <Heading as="h2" size="md" fontWeight="bold" mb={4} color="white">
                Education
              </Heading>
              <Stack spacing={4}>
                {education.map((edu: any, index: number) => (
                  <Box key={index}>
                    <Text fontWeight="bold" fontSize="sm">
                      {edu.degree}
                    </Text>
                    <Text fontSize="sm">{edu.institution}</Text>
                    <Text fontSize="xs" color="blue.100" mt={1}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                    {edu.gpa && (
                      <Text fontSize="xs" color="blue.100" mt={1}>
                        GPA: {edu.gpa}
                      </Text>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box p={6} overflowY="auto">
        {/* Summary */}
        {personalInfo.summary && (
          <Box mb={6}>
            <Heading as="h2" size="md" fontWeight="bold" mb={3} color="blue.700" pb={1} borderBottomWidth={2} borderColor="blue.700">
              Professional Summary
            </Heading>
            <Text fontSize="sm" color="gray.700">
              {personalInfo.summary}
            </Text>
          </Box>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <Box mb={6}>
            <Heading as="h2" size="md" fontWeight="bold" mb={4} color="blue.700" pb={1} borderBottomWidth={2} borderColor="blue.700">
              Work Experience
            </Heading>
            <Stack spacing={5}>
              {experience.map((exp: any, index: number) => (
                <Box key={index}>
                  <Flex justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Text fontWeight="bold" fontSize="md" color="blue.700">
                        {exp.title}
                      </Text>
                      <Text fontSize="md" fontWeight="medium">
                        {exp.company}
                      </Text>
                    </Box>
                    <Box textAlign="right">
                      <Text fontSize="sm" color="gray.600">
                        {exp.startDate} - {exp.endDate}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {exp.location}
                      </Text>
                    </Box>
                  </Flex>
                  <Text fontSize="sm" whiteSpace="pre-line" mt={2}>
                    {exp.description}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <Box mb={6}>
            <Heading as="h2" size="md" fontWeight="bold" mb={4} color="blue.700" pb={1} borderBottomWidth={2} borderColor="blue.700">
              Projects
            </Heading>
            <Stack spacing={5}>
              {projects.map((project: any, index: number) => (
                <Box key={index}>
                  <Flex justifyContent="space-between" alignItems="flex-start">
                    <Text fontWeight="bold" fontSize="md" color="blue.700">
                      {project.name}
                    </Text>
                    {(project.githubUrl || project.liveUrl) && (
                      <HStack spacing={2} fontSize="xs">
                        {project.githubUrl && (
                          <Link href={project.githubUrl} isExternal color="blue.600">
                            GitHub
                          </Link>
                        )}
                        {project.liveUrl && (
                          <Link href={project.liveUrl} isExternal color="blue.600">
                            Live Demo
                          </Link>
                        )}
                      </HStack>
                    )}
                  </Flex>
                  <Text fontSize="sm" mt={1} mb={2}>
                    {project.description}
                  </Text>
                  <Text fontSize="xs" fontWeight="medium" color="blue.600">
                    Technologies: {project.technologies}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Grid>
  )
}

// Minimal Template - Clean, minimal design
function MinimalTemplate({ personalInfo, skills, experience, projects, education }: { personalInfo: any, skills: any, experience: any, projects: any, education: any }) {
  return (
    <Box p={8}>
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="flex-start" mb={8}>
        <Box>
          <Heading as="h1" size="xl" fontWeight="light" letterSpacing="tight" mb={1}>
            {personalInfo.fullName || 'Your Name'}
          </Heading>
          <Text fontSize="lg" color="gray.600" fontWeight="medium" letterSpacing="wide">
            {personalInfo.jobTitle || 'Software Developer'}
          </Text>
        </Box>
        
        <Stack spacing={1} fontSize="sm" textAlign="right">
          {personalInfo.email && (
            <Text>{personalInfo.email}</Text>
          )}
          {personalInfo.phone && (
            <Text>{personalInfo.phone}</Text>
          )}
          {personalInfo.location && (
            <Text>{personalInfo.location}</Text>
          )}
          <HStack spacing={3} justifyContent="flex-end" mt={1}>
            {personalInfo.github && (
              <Link href={`https://${personalInfo.github}`} isExternal color="gray.600">
                <Icon as={FiGithub} boxSize={4} />
              </Link>
            )}
            {personalInfo.linkedin && (
              <Link href={`https://${personalInfo.linkedin}`} isExternal color="gray.600">
                <Icon as={FiLinkedin} boxSize={4} />
              </Link>
            )}
            {personalInfo.website && (
              <Link href={`https://${personalInfo.website}`} isExternal color="gray.600">
                <Icon as={FiGlobe} boxSize={4} />
              </Link>
            )}
          </HStack>
        </Stack>
      </Flex>

      {/* Summary */}
      {personalInfo.summary && (
        <Box mb={8}>
          <Text fontSize="sm" color="gray.700">
            {personalInfo.summary}
          </Text>
        </Box>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="sm" fontWeight="medium" letterSpacing="wide" textTransform="uppercase" mb={3}>
            Technical Skills
          </Heading>
          <Divider mb={3} borderColor="gray.300" />
          <Flex wrap="wrap" gap={2}>
            {skills.map((skill: string, index: number) => (
              <Text key={index} fontSize="sm" color="gray.700">
                {skill}{index < skills.length - 1 ? ' • ' : ''}
              </Text>
            ))}
          </Flex>
        </Box>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="sm" fontWeight="medium" letterSpacing="wide" textTransform="uppercase" mb={3}>
            Experience
          </Heading>
          <Divider mb={3} borderColor="gray.300" />
          <Stack spacing={6}>
            {experience.map((exp: any, index: number) => (
              <Box key={index}>
                <Grid templateColumns="1fr auto" gap={4} mb={1}>
                  <Box>
                    <Text fontWeight="medium" fontSize="md">
                      {exp.title}
                    </Text>
                    <Text fontSize="sm" color="gray.700">
                      {exp.company} {exp.location ? `· ${exp.location}` : ''}
                    </Text>
                  </Box>
                  <Text fontSize="sm" color="gray.600" fontStyle="italic">
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </Grid>
                <Text fontSize="sm" whiteSpace="pre-line">
                  {exp.description}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="sm" fontWeight="medium" letterSpacing="wide" textTransform="uppercase" mb={3}>
            Projects
          </Heading>
          <Divider mb={3} borderColor="gray.300" />
          <Stack spacing={6}>
            {projects.map((project: any, index: number) => (
              <Box key={index}>
                <Flex justifyContent="space-between" alignItems="center" mb={1}>
                  <Text fontWeight="medium" fontSize="md">
                    {project.name}
                  </Text>
                  <HStack spacing={3} fontSize="xs">
                    {project.githubUrl && (
                      <Link href={project.githubUrl} isExternal color="gray.600">
                        GitHub
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link href={project.liveUrl} isExternal color="gray.600">
                        Live Demo
                      </Link>
                    )}
                  </HStack>
                </Flex>
                <Text fontSize="sm" mb={1}>
                  {project.description}
                </Text>
                <Text fontSize="xs" fontFamily="mono" color="gray.600">
                  {project.technologies}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <Box>
          <Heading as="h2" size="sm" fontWeight="medium" letterSpacing="wide" textTransform="uppercase" mb={3}>
            Education
          </Heading>
          <Divider mb={3} borderColor="gray.300" />
          <Stack spacing={4}>
            {education.map((edu: any, index: number) => (
              <Grid key={index} templateColumns="1fr auto" gap={4}>
                <Box>
                  <Text fontWeight="medium" fontSize="md">
                    {edu.degree}
                  </Text>
                  <Text fontSize="sm" color="gray.700">
                    {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                  </Text>
                  {edu.description && (
                    <Text fontSize="sm" whiteSpace="pre-line" mt={1}>
                      {edu.description}
                    </Text>
                  )}
                </Box>
                <Text fontSize="sm" color="gray.600" fontStyle="italic">
                  {edu.startDate} - {edu.endDate}
                </Text>
              </Grid>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

// Developer Template - Specialized for software developers
function DeveloperTemplate({ personalInfo, skills, experience, projects, education }: { personalInfo: any, skills: any, experience: any, projects: any, education: any }) {
  return (
    <Box p={8} bg="gray.50">
      {/* Header with GitHub-style design */}
      <Box mb={8} p={4} bg="white" borderRadius="md" shadow="sm">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Heading as="h1" size="xl" fontWeight="bold" mb={1} fontFamily="mono">
              {personalInfo.fullName || 'Your Name'}
            </Heading>
            <Text fontSize="lg" color="gray.600" fontFamily="mono">
              {personalInfo.jobTitle || 'Software Developer'}
            </Text>
          </Box>
          <Stack spacing={2} fontSize="sm" fontFamily="mono">
            {personalInfo.email && (
              <HStack spacing={2}>
                <Icon as={FiMail} color="gray.500" />
                <Text>{personalInfo.email}</Text>
              </HStack>
            )}
            {personalInfo.location && (
              <HStack spacing={2}>
                <Icon as={FiMapPin} color="gray.500" />
                <Text>{personalInfo.location}</Text>
              </HStack>
            )}
            <HStack spacing={3}>
              {personalInfo.github && (
                <Link href={`https://${personalInfo.github}`} isExternal color="blue.600">
                  <Icon as={FiGithub} boxSize={5} />
                </Link>
              )}
              {personalInfo.linkedin && (
                <Link href={`https://${personalInfo.linkedin}`} isExternal color="blue.600">
                  <Icon as={FiLinkedin} boxSize={5} />
                </Link>
              )}
              {personalInfo.website && (
                <Link href={`https://${personalInfo.website}`} isExternal color="blue.600">
                  <Icon as={FiGlobe} boxSize={5} />
                </Link>
              )}
            </HStack>
          </Stack>
        </Flex>
      </Box>

      {/* Summary */}
      {personalInfo.summary && (
        <Box mb={8} p={4} bg="white" borderRadius="md" shadow="sm">
          <Heading as="h2" size="md" mb={3} fontFamily="mono" color="gray.800">
            About
          </Heading>
          <Text fontSize="sm" color="gray.700" fontFamily="mono">
            {personalInfo.summary}
          </Text>
        </Box>
      )}

      {/* Skills with GitHub-style tags */}
      {skills?.length > 0 && (
        <Box mb={8} p={4} bg="white" borderRadius="md" shadow="sm">
          <Heading as="h2" size="md" mb={4} fontFamily="mono" color="gray.800">
            Tech Stack
          </Heading>
          <Flex wrap="wrap" gap={2}>
            {skills.map((skill: string, index: number) => (
              <Tag 
                key={index} 
                size="md" 
                bg="gray.100" 
                color="gray.800" 
                fontFamily="mono"
                px={3}
                py={1}
                borderRadius="md"
              >
                {skill}
              </Tag>
            ))}
          </Flex>
        </Box>
      )}

      {/* Experience with GitHub-style cards */}
      {experience?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="md" mb={4} fontFamily="mono" color="gray.800">
            Experience
          </Heading>
          <Stack spacing={4}>
            {experience.map((exp: any, index: number) => (
              <Box key={index} p={4} bg="white" borderRadius="md" shadow="sm">
                <Flex justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Text fontWeight="bold" fontSize="md" fontFamily="mono">
                      {exp.title}
                    </Text>
                    <Text fontSize="md" color="blue.600" fontFamily="mono">
                      {exp.company}
                    </Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600" fontFamily="mono">
                      {exp.startDate} - {exp.endDate}
                    </Text>
                    <Text fontSize="sm" color="gray.600" fontFamily="mono">
                      {exp.location}
                    </Text>
                  </Box>
                </Flex>
                <Text fontSize="sm" whiteSpace="pre-line" fontFamily="mono" color="gray.700">
                  {exp.description}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Projects with GitHub-style cards */}
      {projects?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="md" mb={4} fontFamily="mono" color="gray.800">
            Projects
          </Heading>
          <Stack spacing={4}>
            {projects.map((project: any, index: number) => (
              <Box key={index} p={4} bg="white" borderRadius="md" shadow="sm">
                <Flex justifyContent="space-between" alignItems="center" mb={2}>
                  <Text fontWeight="bold" fontSize="md" fontFamily="mono">
                    {project.name}
                  </Text>
                  <HStack spacing={3} fontSize="xs" fontFamily="mono">
                    {project.githubUrl && (
                      <Link href={project.githubUrl} isExternal color="blue.600">
                        <HStack spacing={1}>
                          <Icon as={FiGithub} />
                          <Text>View Code</Text>
                        </HStack>
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link href={project.liveUrl} isExternal color="blue.600">
                        <HStack spacing={1}>
                          <Icon as={FiGlobe} />
                          <Text>Live Demo</Text>
                        </HStack>
                      </Link>
                    )}
                  </HStack>
                </Flex>
                <Text fontSize="sm" mb={2} fontFamily="mono" color="gray.700">
                  {project.description}
                </Text>
                <Text 
                  fontSize="sm" 
                  color="purple.700" 
                  bg="purple.50" 
                  px={3} 
                  py={1} 
                  borderRadius="md"
                  display="inline-block"
                >
                  {project.technologies}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Education with GitHub-style cards */}
      {education?.length > 0 && (
        <Box>
          <Heading as="h2" size="md" mb={4} fontFamily="mono" color="gray.800">
            Education
          </Heading>
          <Stack spacing={4}>
            {education.map((edu: any, index: number) => (
              <Box key={index} p={4} bg="white" borderRadius="md" shadow="sm">
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Text fontWeight="bold" fontSize="md" fontFamily="mono">
                      {edu.degree}
                    </Text>
                    <Text fontSize="md" color="blue.600" fontFamily="mono">
                      {edu.institution}
                    </Text>
                    {edu.gpa && (
                      <Text fontSize="sm" color="gray.600" fontFamily="mono" mt={1}>
                        GPA: {edu.gpa}
                      </Text>
                    )}
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600" fontFamily="mono">
                      {edu.startDate} - {edu.endDate}
                    </Text>
                    <Text fontSize="sm" color="gray.600" fontFamily="mono">
                      {edu.location}
                    </Text>
                  </Box>
                </Flex>
                {edu.description && (
                  <Text fontSize="md" color="gray.700" mt={3} whiteSpace="pre-line">
                    {edu.description}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

// Creative Template - For UI/UX designers and creative developers
function CreativeTemplate({ personalInfo, skills, experience, projects, education }: { personalInfo: any, skills: any, experience: any, projects: any, education: any }) {
  return (
    <Box p={8} bg="white">
      {/* Header with creative design */}
      <Box 
        mb={8} 
        p={8} 
        bgGradient="linear(to-r, purple.500, blue.500)" 
        color="white" 
        borderRadius="xl"
        position="relative"
        overflow="hidden"
      >
        <Box 
          position="absolute" 
          top={0} 
          right={0} 
          w="40%" 
          h="100%" 
          bg="white" 
          opacity="0.1"
          transform="skewX(-20deg)"
        />
        <Stack spacing={4}>
          <Heading as="h1" size="2xl" fontWeight="bold" letterSpacing="tight">
            {personalInfo.fullName || 'Your Name'}
          </Heading>
          <Text fontSize="xl" opacity="0.9">
            {personalInfo.jobTitle || 'Software Developer'}
          </Text>
          <Stack spacing={2} mt={4}>
            {personalInfo.email && (
              <HStack spacing={2}>
                <Icon as={FiMail} />
                <Text>{personalInfo.email}</Text>
              </HStack>
            )}
            {personalInfo.phone && (
              <HStack spacing={2}>
                <Icon as={FiPhone} />
                <Text>{personalInfo.phone}</Text>
              </HStack>
            )}
            {personalInfo.location && (
              <HStack spacing={2}>
                <Icon as={FiMapPin} />
                <Text>{personalInfo.location}</Text>
              </HStack>
            )}
          </Stack>
          <HStack spacing={4} mt={2}>
            {personalInfo.github && (
              <Link href={`https://${personalInfo.github}`} isExternal color="white">
                <Icon as={FiGithub} boxSize={5} />
              </Link>
            )}
            {personalInfo.linkedin && (
              <Link href={`https://${personalInfo.linkedin}`} isExternal color="white">
                <Icon as={FiLinkedin} boxSize={5} />
              </Link>
            )}
            {personalInfo.website && (
              <Link href={`https://${personalInfo.website}`} isExternal color="white">
                <Icon as={FiGlobe} boxSize={5} />
              </Link>
            )}
          </HStack>
        </Stack>
      </Box>

      {/* Summary */}
      {personalInfo.summary && (
        <Box mb={8} p={6} bg="gray.50" borderRadius="xl">
          <Text fontSize="md" color="gray.700" lineHeight="tall">
            {personalInfo.summary}
          </Text>
        </Box>
      )}

      {/* Skills with creative design */}
      {skills?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="lg" mb={6} color="purple.600">
            Skills & Expertise
          </Heading>
          <Flex wrap="wrap" gap={3}>
            {skills.map((skill: string, index: number) => (
              <Box
                key={index}
                px={4}
                py={2}
                bg="purple.50"
                color="purple.700"
                borderRadius="full"
                fontWeight="medium"
                borderWidth="1px"
                borderColor="purple.200"
              >
                {skill}
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {/* Experience with creative timeline */}
      {experience?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="lg" mb={6} color="purple.600">
            Experience
          </Heading>
          <Stack spacing={6}>
            {experience.map((exp: any, index: number) => (
              <Box 
                key={index} 
                position="relative"
                pl={8}
                _before={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  bg: 'purple.200',
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  left: '-4px',
                  top: '8px',
                  width: '10px',
                  height: '10px',
                  borderRadius: 'full',
                  bg: 'purple.500',
                }}
              >
                <Box p={6} bg="gray.50" borderRadius="xl">
                  <Flex justifyContent="space-between" alignItems="flex-start" mb={3}>
                    <Box>
                      <Text fontWeight="bold" fontSize="lg" color="purple.700">
                        {exp.title}
                      </Text>
                      <Text fontSize="md" color="gray.600">
                        {exp.company}
                      </Text>
                    </Box>
                    <Box textAlign="right">
                      <Text fontSize="sm" color="purple.600" fontWeight="medium">
                        {exp.startDate} - {exp.endDate}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {exp.location}
                      </Text>
                    </Box>
                  </Flex>
                  <Text fontSize="md" color="gray.700" whiteSpace="pre-line">
                    {exp.description}
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Projects with creative cards */}
      {projects?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="lg" mb={6} color="purple.600">
            Projects
          </Heading>
          <Stack spacing={6}>
            {projects.map((project: any, index: number) => (
              <Box 
                key={index}
                p={6}
                bg="gray.50"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="purple.100"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'md',
                }}
              >
                <Flex justifyContent="space-between" alignItems="center" mb={3}>
                  <Text fontWeight="bold" fontSize="lg" color="purple.700">
                    {project.name}
                  </Text>
                  <HStack spacing={4}>
                    {project.githubUrl && (
                      <Link href={project.githubUrl} isExternal color="purple.600">
                        <HStack spacing={1}>
                          <Icon as={FiGithub} />
                          <Text>Code</Text>
                        </HStack>
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link href={project.liveUrl} isExternal color="purple.600">
                        <HStack spacing={1}>
                          <Icon as={FiGlobe} />
                          <Text>Demo</Text>
                        </HStack>
                      </Link>
                    )}
                  </HStack>
                </Flex>
                <Text fontSize="md" color="gray.700" mb={3}>
                  {project.description}
                </Text>
                <Text 
                  fontSize="sm" 
                  color="purple.700" 
                  bg="purple.50" 
                  px={3} 
                  py={1} 
                  borderRadius="md"
                  display="inline-block"
                >
                  {project.technologies}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Education with creative design */}
      {education?.length > 0 && (
        <Box>
          <Heading as="h2" size="lg" mb={6} color="purple.600">
            Education
          </Heading>
          <Stack spacing={6}>
            {education.map((edu: any, index: number) => (
              <Box 
                key={index}
                p={6}
                bg="gray.50"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="purple.100"
              >
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" color="purple.700">
                      {edu.degree}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {edu.institution}
                    </Text>
                    {edu.gpa && (
                      <Text fontSize="sm" color="purple.600" mt={1}>
                        GPA: {edu.gpa}
                      </Text>
                    )}
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="purple.600" fontWeight="medium">
                      {edu.startDate} - {edu.endDate}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {edu.location}
                    </Text>
                  </Box>
                </Flex>
                {edu.description && (
                  <Text fontSize="md" color="gray.700" mt={3} whiteSpace="pre-line">
                    {edu.description}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

// Startup Template - Bold and direct format
function StartupTemplate({ personalInfo, skills, experience, projects, education }: { personalInfo: any, skills: any, experience: any, projects: any, education: any }) {
  return (
    <Box p={8} bg="white">
      {/* Header with bold design */}
      <Box mb={8}>
        <Heading as="h1" size="2xl" fontWeight="black" mb={2} letterSpacing="tight">
          {personalInfo.fullName || 'Your Name'}
        </Heading>
        <Text fontSize="xl" color="blue.600" fontWeight="bold" mb={4}>
          {personalInfo.jobTitle || 'Software Developer'}
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Stack spacing={2}>
            {personalInfo.email && (
              <HStack spacing={2}>
                <Icon as={FiMail} color="blue.500" />
                <Text fontWeight="medium">{personalInfo.email}</Text>
              </HStack>
            )}
            {personalInfo.phone && (
              <HStack spacing={2}>
                <Icon as={FiPhone} color="blue.500" />
                <Text fontWeight="medium">{personalInfo.phone}</Text>
              </HStack>
            )}
            {personalInfo.location && (
              <HStack spacing={2}>
                <Icon as={FiMapPin} color="blue.500" />
                <Text fontWeight="medium">{personalInfo.location}</Text>
              </HStack>
            )}
          </Stack>
          <Stack spacing={2} justify="flex-end">
            {personalInfo.github && (
              <Link href={`https://${personalInfo.github}`} isExternal>
                <HStack spacing={2} color="blue.600" fontWeight="medium">
                  <Icon as={FiGithub} />
                  <Text>{personalInfo.github}</Text>
                </HStack>
              </Link>
            )}
            {personalInfo.linkedin && (
              <Link href={`https://${personalInfo.linkedin}`} isExternal>
                <HStack spacing={2} color="blue.600" fontWeight="medium">
                  <Icon as={FiLinkedin} />
                  <Text>{personalInfo.linkedin}</Text>
                </HStack>
              </Link>
            )}
            {personalInfo.website && (
              <Link href={`https://${personalInfo.website}`} isExternal>
                <HStack spacing={2} color="blue.600" fontWeight="medium">
                  <Icon as={FiGlobe} />
                  <Text>{personalInfo.website}</Text>
                </HStack>
              </Link>
            )}
          </Stack>
        </Grid>
      </Box>

      {/* Summary */}
      {personalInfo.summary && (
        <Box mb={8} p={6} bg="blue.50" borderRadius="lg">
          <Text fontSize="md" color="gray.800" fontWeight="medium" lineHeight="tall">
            {personalInfo.summary}
          </Text>
        </Box>
      )}

      {/* Skills with bold design */}
      {skills?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="lg" mb={4} color="blue.600" fontWeight="bold">
            Core Competencies
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {skills.map((skill: string, index: number) => (
              <Box
                key={index}
                p={3}
                bg="white"
                borderWidth="2px"
                borderColor="blue.200"
                borderRadius="md"
                textAlign="center"
                fontWeight="bold"
                color="blue.700"
              >
                {skill}
              </Box>
            ))}
          </Grid>
        </Box>
      )}

      {/* Experience with bold design */}
      {experience?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="lg" mb={4} color="blue.600" fontWeight="bold">
            Professional Experience
          </Heading>
          <Stack spacing={6}>
            {experience.map((exp: any, index: number) => (
              <Box key={index}>
                <Flex justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" color="blue.700">
                      {exp.title}
                    </Text>
                    <Text fontSize="md" fontWeight="medium">
                      {exp.company}
                    </Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" fontWeight="bold" color="blue.600">
                      {exp.startDate} - {exp.endDate}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {exp.location}
                    </Text>
                  </Box>
                </Flex>
                <Box 
                  mt={2} 
                  p={4} 
                  bg="blue.50" 
                  borderRadius="md"
                  borderLeftWidth="4px"
                  borderLeftColor="blue.500"
                >
                  <Text fontSize="md" color="gray.800" whiteSpace="pre-line">
                    {exp.description}
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Projects with bold design */}
      {projects?.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="lg" mb={4} color="blue.600" fontWeight="bold">
            Key Projects
          </Heading>
          <Stack spacing={6}>
            {projects.map((project: any, index: number) => (
              <Box 
                key={index}
                p={6}
                bg="white"
                borderWidth="2px"
                borderColor="blue.200"
                borderRadius="lg"
              >
                <Flex justifyContent="space-between" alignItems="center" mb={3}>
                  <Text fontWeight="bold" fontSize="lg" color="blue.700">
                    {project.name}
                  </Text>
                  <HStack spacing={4}>
                    {project.githubUrl && (
                      <Link href={project.githubUrl} isExternal>
                        <Button 
                          size="sm" 
                          colorScheme="blue" 
                          variant="outline"
                          leftIcon={<Icon as={FiGithub} />}
                        >
                          Code
                        </Button>
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link href={project.liveUrl} isExternal>
                        <Button 
                          size="sm" 
                          colorScheme="blue" 
                          variant="outline"
                          leftIcon={<Icon as={FiGlobe} />}
                        >
                          Demo
                        </Button>
                      </Link>
                    )}
                  </HStack>
                </Flex>
                <Text fontSize="md" color="gray.800" mb={3}>
                  {project.description}
                </Text>
                <Box 
                  p={2} 
                  bg="blue.50" 
                  borderRadius="md"
                  display="inline-block"
                >
                  <Text fontSize="sm" fontWeight="medium" color="blue.700">
                    {project.technologies}
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Education with bold design */}
      {education?.length > 0 && (
        <Box>
          <Heading as="h2" size="lg" mb={4} color="blue.600" fontWeight="bold">
            Education
          </Heading>
          <Stack spacing={6}>
            {education.map((edu: any, index: number) => (
              <Box 
                key={index}
                p={6}
                bg="white"
                borderWidth="2px"
                borderColor="blue.200"
                borderRadius="lg"
              >
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" color="blue.700">
                      {edu.degree}
                    </Text>
                    <Text fontSize="md" fontWeight="medium">
                      {edu.institution}
                    </Text>
                    {edu.gpa && (
                      <Text fontSize="sm" color="blue.600" fontWeight="medium" mt={1}>
                        GPA: {edu.gpa}
                      </Text>
                    )}
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" fontWeight="bold" color="blue.600">
                      {edu.startDate} - {edu.endDate}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {edu.location}
                    </Text>
                  </Box>
                </Flex>
                {edu.description && (
                  <Box 
                    mt={3} 
                    p={4} 
                    bg="blue.50" 
                    borderRadius="md"
                    borderLeftWidth="4px"
                    borderLeftColor="blue.500"
                  >
                    <Text fontSize="md" color="gray.800" whiteSpace="pre-line">
                      {edu.description}
                    </Text>
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}