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
import isEqual from 'lodash/isEqual'

interface Project {
  id: string
  name: string
  description: string
  technologies: string
  githubUrl: string
  liveUrl: string
}

interface ProjectsFormProps {
  data: Project[]
  updateData: (data: Project[]) => void
}

export default function ProjectsForm({ data, updateData }: ProjectsFormProps) {
  const [projects, setProjects] = useState<Project[]>(
    data?.length ? data : [createNewProject()]
  )

  useEffect(() => {
    if (!isEqual(projects, data)) {
      updateData(projects)
    }
  }, [projects, updateData, data])

  function createNewProject(): Project {
    return {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
    }
  }

  const handleAddProject = () => {
    setProjects([...projects, createNewProject()])
  }

  const handleRemoveProject = (id: string) => {
    if (projects.length > 1) {
      setProjects(projects.filter(proj => proj.id !== id))
    }
  }

  const handleProjectChange = (id: string, field: string, value: string) => {
    setProjects(
      projects.map(proj => {
        if (proj.id === id) {
          return { ...proj, [field]: value }
        }
        return proj
      })
    )
  }

  const moveProject = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === projects.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newProjects = [...projects]
    const temp = newProjects[index]
    newProjects[index] = newProjects[newIndex]
    newProjects[newIndex] = temp
    setProjects(newProjects)
  }

  const cardBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Stack spacing={6}>
      <Heading size="md" mb={2}>
        Projects
      </Heading>
      <Text color="gray.600" fontSize="sm">
        Showcase your best technical projects. Highlight personal projects, open source contributions, or significant work you've done.
      </Text>

      {projects.map((project, index) => (
        <Box
          key={project.id}
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
              Project {index + 1}
            </Heading>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="Move up"
                icon={<FiArrowUp />}
                size="sm"
                variant="ghost"
                isDisabled={index === 0}
                onClick={() => moveProject(index, 'up')}
              />
              <IconButton
                aria-label="Move down"
                icon={<FiArrowDown />}
                size="sm"
                variant="ghost"
                isDisabled={index === projects.length - 1}
                onClick={() => moveProject(index, 'down')}
              />
              <IconButton
                aria-label="Remove project"
                icon={<FiTrash2 />}
                size="sm"
                colorScheme="red"
                variant="ghost"
                isDisabled={projects.length === 1}
                onClick={() => handleRemoveProject(project.id)}
              />
            </Stack>
          </Flex>

          <FormControl isRequired>
            <FormLabel>Project Name</FormLabel>
            <Input
              placeholder="Personal Portfolio Website"
              value={project.name}
              onChange={(e) =>
                handleProjectChange(project.id, 'name', e.target.value)
              }
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="A brief description of what the project does and your role in it..."
              rows={3}
              value={project.description}
              onChange={(e) =>
                handleProjectChange(project.id, 'description', e.target.value)
              }
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Technologies Used</FormLabel>
            <Input
              placeholder="React, Node.js, MongoDB, Express"
              value={project.technologies}
              onChange={(e) =>
                handleProjectChange(project.id, 'technologies', e.target.value)
              }
            />
            <FormHelperText>
              List the key technologies, frameworks, and tools used
            </FormHelperText>
          </FormControl>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
            <FormControl>
              <FormLabel>GitHub URL</FormLabel>
              <Input
                placeholder="https://github.com/username/project"
                value={project.githubUrl}
                onChange={(e) =>
                  handleProjectChange(project.id, 'githubUrl', e.target.value)
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Live Demo URL</FormLabel>
              <Input
                placeholder="https://myproject.com"
                value={project.liveUrl}
                onChange={(e) =>
                  handleProjectChange(project.id, 'liveUrl', e.target.value)
                }
              />
            </FormControl>
          </Grid>
        </Box>
      ))}

      <Button
        leftIcon={<FiPlus />}
        onClick={handleAddProject}
        colorScheme="blue"
        variant="outline"
        width="full"
      >
        Add Another Project
      </Button>
    </Stack>
  )
}

interface FlexProps {
  children: React.ReactNode
  justifyContent: string
  alignItems: string
  mb: number
}

function Flex({ children, justifyContent, alignItems, mb }: FlexProps) {
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