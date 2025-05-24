'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  Heading,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiPlus, FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi'

interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
  gpa: string
}

interface EducationFormProps {
  data: Education[]
  updateData: (data: Education[]) => void
}

export default function EducationForm({ data, updateData }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(
    data?.length ? data : [createNewEducation()]
  )

  useEffect(() => {
    updateData(educations)
  }, [educations, updateData])

  function createNewEducation(): Education {
    return {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: '',
    }
  }

  const handleAddEducation = () => {
    setEducations([...educations, createNewEducation()])
  }

  const handleRemoveEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id))
    }
  }

  const handleEducationChange = (id: string, field: string, value: string) => {
    setEducations(
      educations.map(edu => {
        if (edu.id === id) {
          return { ...edu, [field]: value }
        }
        return edu
      })
    )
  }

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === educations.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newEducations = [...educations]
    const temp = newEducations[index]
    newEducations[index] = newEducations[newIndex]
    newEducations[newIndex] = temp
    setEducations(newEducations)
  }

  const cardBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Stack spacing={6}>
      <Heading size="md" mb={2}>
        Education
      </Heading>

      {educations.map((education, index) => (
        <Box
          key={education.id}
          p={4}
          bg={cardBg}
          borderRadius="md"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Heading size="sm">
              Education {index + 1}
            </Heading>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="Move up"
                icon={<FiArrowUp />}
                size="sm"
                variant="ghost"
                isDisabled={index === 0}
                onClick={() => moveEducation(index, 'up')}
              />
              <IconButton
                aria-label="Move down"
                icon={<FiArrowDown />}
                size="sm"
                variant="ghost"
                isDisabled={index === educations.length - 1}
                onClick={() => moveEducation(index, 'down')}
              />
              <IconButton
                aria-label="Remove education"
                icon={<FiTrash2 />}
                size="sm"
                colorScheme="red"
                variant="ghost"
                isDisabled={educations.length === 1}
                onClick={() => handleRemoveEducation(education.id)}
              />
            </Stack>
          </Flex>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <FormControl isRequired>
              <FormLabel>Degree / Certificate</FormLabel>
              <Input
                placeholder="B.S. Computer Science"
                value={education.degree}
                onChange={(e) =>
                  handleEducationChange(education.id, 'degree', e.target.value)
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Institution</FormLabel>
              <Input
                placeholder="University of California, Berkeley"
                value={education.institution}
                onChange={(e) =>
                  handleEducationChange(education.id, 'institution', e.target.value)
                }
              />
            </FormControl>
          </Grid>

          <FormControl mt={4}>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Berkeley, CA"
              value={education.location}
              onChange={(e) =>
                handleEducationChange(education.id, 'location', e.target.value)
              }
            />
          </FormControl>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} mt={4}>
            <FormControl isRequired>
              <FormLabel>Start Date</FormLabel>
              <Input
                placeholder="MM/YYYY"
                value={education.startDate}
                onChange={(e) =>
                  handleEducationChange(education.id, 'startDate', e.target.value)
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                placeholder="MM/YYYY or Expected MM/YYYY"
                value={education.endDate}
                onChange={(e) =>
                  handleEducationChange(education.id, 'endDate', e.target.value)
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>GPA (optional)</FormLabel>
              <Input
                placeholder="3.8/4.0"
                value={education.gpa}
                onChange={(e) =>
                  handleEducationChange(education.id, 'gpa', e.target.value)
                }
              />
            </FormControl>
          </Grid>

          <FormControl mt={4}>
            <FormLabel>Relevant Coursework / Achievements (optional)</FormLabel>
            <Textarea
              placeholder="• Relevant coursework: Data Structures, Algorithms, Web Development&#10;• Academic achievements, scholarships, honors"
              rows={3}
              value={education.description}
              onChange={(e) =>
                handleEducationChange(education.id, 'description', e.target.value)
              }
            />
          </FormControl>
        </Box>
      ))}

      <Button
        leftIcon={<FiPlus />}
        onClick={handleAddEducation}
        colorScheme="blue"
        variant="outline"
        width="full"
      >
        Add Another Education
      </Button>
    </Stack>
  )
}

function Flex({ children, justifyContent, alignItems, mb }) {
  return (
    <Box 
      display="flex" 
      justifyContent={justifyContent} 
      alignItems={alignItems} 
      mb={mb}
    >
      {children}
    </Box>
  )
}