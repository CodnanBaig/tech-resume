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
} from '@chakra-ui/react'
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiGithub, FiLinkedin } from 'react-icons/fi'

interface ResumePreviewProps {
  data: any
  template: 'classic' | 'modern' | 'minimal'
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
  }[template]

  return (
    <Box
      width="8.5in"
      height="11in"
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
function ClassicTemplate({ personalInfo, skills, experience, projects, education }) {
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
            {skills.map((skill, index) => (
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
            {experience.map((exp, index) => (
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
            {projects.map((project, index) => (
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
            {education.map((edu, index) => (
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
function ModernTemplate({ personalInfo, skills, experience, projects, education }) {
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
                {skills.map((skill, index) => (
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
                {education.map((edu, index) => (
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
              {experience.map((exp, index) => (
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
              {projects.map((project, index) => (
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
function MinimalTemplate({ personalInfo, skills, experience, projects, education }) {
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
            {skills.map((skill, index) => (
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
            {experience.map((exp, index) => (
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
            {projects.map((project, index) => (
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
            {education.map((edu, index) => (
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