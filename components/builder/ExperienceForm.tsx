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

interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface ExperienceFormProps {
  data: Experience[]
  updateData: (data: Experience[]) => void
}

export default function ExperienceForm({ data, updateData }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(
    data?.length ? data : [createNewExperience()]
  )

  useEffect(() => {
    updateData(experiences)
  }, [experiences, updateData])

  function createNewExperience(): Experience {
    return {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }
  }

  const handleAddExperience = () => {
    setExperiences([...experiences, createNewExperience()])
  }

  const handleRemoveExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id))
    }
  }

  const handleExperienceChange = (id: string, field: string, value: string | boolean) => {
    setExperiences(
      experiences.map(exp => {
        if (exp.id === id) {
          return { ...exp, [field]: value }
        }
        return exp
      })
    )
  }

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === experiences.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newExperiences = [...experiences]
    const temp = newExperiences[index]
    newExperiences[index] = newExperiences[newIndex]
    newExperiences[newIndex] = temp
    setExperiences(newExperiences)
  }

  const cardBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Stack spacing={6}>
      <Heading size="md" mb={2}>
        Work Experience
      </Heading>

      {experiences.map((experience, index) => (
        <Box
          key={experience.id}
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
              Experience {index + 1}
            </Heading>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="Move up"
                icon={<FiArrowUp />}
                size="sm"
                variant="ghost"
                isDisabled={index === 0}
                onClick={() => moveExperience(index, 'up')}
              />
              <IconButton
                aria-label="Move down"
                icon={<FiArrowDown />}
                size="sm"
                variant="ghost"
                isDisabled={index === experiences.length - 1}
                onClick={() => moveExperience(index, 'down')}
              />
              <IconButton
                aria-label="Remove experience"
                icon={<FiTrash2 />}
                size="sm"
                colorScheme="red"
                variant="ghost"
                isDisabled={experiences.length === 1}
                onClick={() => handleRemoveExperience(experience.id)}
              />
            </Stack>
          </Flex>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <FormControl isRequired>
              <FormLabel>Job Title</FormLabel>
              <Input
                placeholder="Software Engineer"
                value={experience.title}
                onChange={(e) =>
                  handleExperienceChange(experience.id, 'title', e.target.value)
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Company</FormLabel>
              <Input
                placeholder="Company Name"
                value={experience.company}
                onChange={(e) =>
                  handleExperienceChange(experience.id, 'company', e.target.value)
                }
              />
            </FormControl>
          </Grid>

          <FormControl mt={4}>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="San Francisco, CA (or Remote)"
              value={experience.location}
              onChange={(e) =>
                handleExperienceChange(experience.id, 'location', e.target.value)
              }
            />
          </FormControl>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
            <FormControl isRequired>
              <FormLabel>Start Date</FormLabel>
              <Input
                placeholder="MM/YYYY"
                value={experience.startDate}
                onChange={(e) =>
                  handleExperienceChange(experience.id, 'startDate', e.target.value)
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                placeholder="MM/YYYY or Present"
                value={experience.endDate}
                onChange={(e) =>
                  handleExperienceChange(experience.id, 'endDate', e.target.value)
                }
              />
            </FormControl>
          </Grid>

          <FormControl mt={4} isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="• Describe your responsibilities and achievements&#10;• Focus on measurable results and use action verbs&#10;• Include relevant technologies and methodologies used"
              rows={5}
              value={experience.description}
              onChange={(e) =>
                handleExperienceChange(experience.id, 'description', e.target.value)
              }
            />
            <FormHelperText>
              Use bullet points to highlight achievements with metrics when possible.
            </FormHelperText>
          </FormControl>
        </Box>
      ))}

      <Button
        leftIcon={<FiPlus />}
        onClick={handleAddExperience}
        colorScheme="blue"
        variant="outline"
        width="full"
      >
        Add Another Experience
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