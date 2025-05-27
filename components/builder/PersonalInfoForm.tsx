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
  Select,
} from '@chakra-ui/react'
import { FiUser, FiMail, FiPhone, FiGlobe, FiGithub, FiLinkedin } from 'react-icons/fi'

interface PersonalInfoFormProps {
  data: any
  updateData: (data: any) => void
}

const countryCityOptions = {
  USA: ['New York', 'San Francisco', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
  UK: ['London', 'Manchester', 'Birmingham'],
  India: ['Mumbai', 'Bangalore', 'Delhi'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane'],
}

export default function PersonalInfoForm({ data, updateData }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState(data)
  const [country, setCountry] = useState(() => {
    const initial = Object.keys(countryCityOptions).find(
      country => data.location && data.location.endsWith(country)
    )
    return initial || ''
  })
  const [city, setCity] = useState(() => {
    const initialCountry = Object.keys(countryCityOptions).find(
      country => data.location && data.location.endsWith(country)
    )
    return initialCountry && data.location
      ? data.location.replace(`, ${initialCountry}`, '')
      : ''
  })

  useEffect(() => {
    setFormData(data)
    // Only update local state if data.location actually changed
    if (data.location !== formData.location) {
      const foundCountry = Object.keys(countryCityOptions).find(country =>
        data.location && data.location.endsWith(country)
      ) || ''
      const foundCity = foundCountry ? data.location.replace(`, ${foundCountry}`, '') : ''
      setCountry(foundCountry)
      setCity(foundCity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.location])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updated = { ...formData, [name]: value }
    setFormData(updated)
    updateData(updated)
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value
    setCountry(newCountry)
    setCity('')
    const location = newCountry ? (city ? `${city}, ${newCountry}` : newCountry) : ''
    const updated = { ...formData, location }
    setFormData(updated)
    updateData(updated)
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value
    setCity(newCity)
    const location = country ? (newCity ? `${newCity}, ${country}` : country) : ''
    const updated = { ...formData, location }
    setFormData(updated)
    updateData(updated)
  }

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

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl id="country">
          <FormLabel>Country</FormLabel>
          <Select placeholder="Select country" value={country} onChange={handleCountryChange}>
            {Object.keys(countryCityOptions).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="city" isDisabled={!country}>
          <FormLabel>City</FormLabel>
          <Select placeholder="Select city" value={city} onChange={handleCityChange}>
            {country && countryCityOptions[country as keyof typeof countryCityOptions].map((cty: string) => (
              <option key={cty} value={cty}>{cty}</option>
            ))}
          </Select>
        </FormControl>
      </Grid>

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