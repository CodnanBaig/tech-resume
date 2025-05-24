'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { FiUser, FiMail, FiPhone, FiGlobe, FiGithub, FiLinkedin } from 'react-icons/fi'

interface PersonalInfoFormProps {
  data: any
  updateData: (data: any) => void
}

export default function PersonalInfoForm({ data, updateData }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    fullName: data.fullName || '',
    jobTitle: data.jobTitle || '',
    email: data.email || '',
    phone: data.phone || '',
    location: data.location || '',
    website: data.website || '',
    github: data.github || '',
    linkedin: data.linkedin || '',
    summary: data.summary || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Save data when form changes
  useEffect(() => {
    updateData(formData)
  }, [formData, updateData])

  return (
    <Stack spacing={6}>
      <Heading size="md" mb={2}>
        Personal Information
      </Heading>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl id="fullName" isRequired>
          <FormLabel>Full Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiUser color="gray.300" />
            </InputLeftElement>
            <Input
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="jobTitle">
          <FormLabel>Job Title</FormLabel>
          <Input
            name="jobTitle"
            placeholder="Frontend Developer"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiMail color="gray.300" />
            </InputLeftElement>
            <Input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="phone">
          <FormLabel>Phone</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiPhone color="gray.300" />
            </InputLeftElement>
            <Input
              name="phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>
      </Grid>

      <FormControl id="location">
        <FormLabel>Location</FormLabel>
        <Input
          name="location"
          placeholder="San Francisco, CA"
          value={formData.location}
          onChange={handleChange}
        />
      </FormControl>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <FormControl id="website">
          <FormLabel>Website</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiGlobe color="gray.300" />
            </InputLeftElement>
            <Input
              name="website"
              placeholder="https://example.com"
              value={formData.website}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="github">
          <FormLabel>GitHub</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiGithub color="gray.300" />
            </InputLeftElement>
            <Input
              name="github"
              placeholder="github.com/username"
              value={formData.github}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="linkedin">
          <FormLabel>LinkedIn</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiLinkedin color="gray.300" />
            </InputLeftElement>
            <Input
              name="linkedin"
              placeholder="linkedin.com/in/username"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>
      </Grid>

      <FormControl id="summary">
        <FormLabel>Professional Summary</FormLabel>
        <Textarea
          name="summary"
          placeholder="Brief overview of your experience, skills, and career goals..."
          rows={4}
          value={formData.summary}
          onChange={handleChange}
        />
        <FormHelperText>
          Keep it concise (3-5 sentences) and highlight your key strengths relevant to your target role.
        </FormHelperText>
      </FormControl>
    </Stack>
  )
}