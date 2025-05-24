'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  Heading,
  Input,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

interface SkillsFormProps {
  data: string[]
  updateData: (data: string[]) => void
}

// Common tech skills for suggestions
const TECH_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 
  'Express', 'Next.js', 'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 
  'C#', '.NET', 'PHP', 'Laravel', 'Ruby', 'Ruby on Rails', 'Go', 'Rust',
  'HTML', 'CSS', 'SASS/SCSS', 'Tailwind CSS', 'Bootstrap', 'Material UI',
  'Redux', 'GraphQL', 'REST API', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB',
  'Firebase', 'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
  'Git', 'GitHub', 'CI/CD', 'Jest', 'Mocha', 'Cypress', 'React Testing Library',
  'Webpack', 'Vite', 'Babel', 'ESLint', 'Prettier', 'npm', 'yarn', 'pnpm',
  'Agile', 'Scrum', 'Jira', 'Figma', 'Adobe XD', 'Sketch'
]

export default function SkillsForm({ data, updateData }: SkillsFormProps) {
  const [skills, setSkills] = useState<string[]>(data || [])
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    updateData(skills)
  }, [skills, updateData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.trim()) {
      const filtered = TECH_SKILLS.filter(
        skill => skill.toLowerCase().includes(value.toLowerCase()) && !skills.includes(skill)
      ).slice(0, 5)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()])
      setInputValue('')
      setSuggestions([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      addSkill(inputValue)
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const tagBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Stack spacing={6}>
      <Heading size="md" mb={2}>
        Technical Skills
      </Heading>

      <FormControl>
        <FormLabel>Add your skills</FormLabel>
        <Input
          placeholder="Type a skill and press Enter (e.g. JavaScript, React, AWS)"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <FormHelperText>
          Add relevant technical skills for your target role. Include programming languages, frameworks, tools, etc.
        </FormHelperText>

        {suggestions.length > 0 && (
          <Box
            mt={2}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
            bg={useColorModeValue('white', 'gray.800')}
          >
            <Text fontSize="sm" mb={1} color="gray.500">
              Suggestions:
            </Text>
            <Flex wrap="wrap" gap={2}>
              {suggestions.map(suggestion => (
                <Tag
                  key={suggestion}
                  size="sm"
                  borderRadius="full"
                  variant="subtle"
                  colorScheme="blue"
                  cursor="pointer"
                  onClick={() => addSkill(suggestion)}
                  _hover={{ bg: 'blue.100' }}
                >
                  <TagLabel>{suggestion}</TagLabel>
                </Tag>
              ))}
            </Flex>
          </Box>
        )}
      </FormControl>

      <Box>
        <Text mb={2} fontWeight="medium">
          Your Skills ({skills.length})
        </Text>
        <Flex wrap="wrap" gap={2}>
          {skills.map(skill => (
            <Tag key={skill} size="md" borderRadius="full" bg={tagBg} py={1.5} px={3}>
              <TagLabel>{skill}</TagLabel>
              <TagCloseButton onClick={() => removeSkill(skill)} />
            </Tag>
          ))}
          {skills.length === 0 && (
            <Text color="gray.500" fontSize="sm">
              No skills added yet
            </Text>
          )}
        </Flex>
      </Box>

      <Box mt={4}>
        <Text fontWeight="medium" mb={2}>
          Popular Technical Skills
        </Text>
        <Flex wrap="wrap" gap={2}>
          {TECH_SKILLS.slice(0, 15).map(skill => (
            !skills.includes(skill) && (
              <Tag
                key={skill}
                size="sm"
                borderRadius="full"
                variant="outline"
                colorScheme="gray"
                cursor="pointer"
                onClick={() => addSkill(skill)}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              >
                <TagLabel>{skill}</TagLabel>
              </Tag>
            )
          ))}
        </Flex>
      </Box>
    </Stack>
  )
}