# Tech Resume Builder

A modern, user-friendly web application built with Next.js that helps users create professional technical resumes. This application provides a seamless experience for creating, customizing, and exporting resumes with a focus on technical roles.

## Features

- 🎨 Modern, responsive UI built with Next.js and Tailwind CSS
- 📝 Interactive resume builder with real-time preview
- 🎯 Multiple resume templates specifically designed for technical roles
- 🔒 User authentication (login/signup)
- 📱 Mobile-friendly design
- 🎨 Customizable styling and layouts
- 📄 PDF export functionality
- 🌙 Dark/Light mode support

## Tech Stack

- **Framework:** Next.js 13.5
- **Language:** TypeScript
- **Styling:** 
  - Tailwind CSS
  - Chakra UI
  - Radix UI Components
- **Form Handling:** React Hook Form with Zod validation
- **PDF Generation:** jsPDF
- **Authentication:** Custom authentication system
- **UI Components:** 
  - Radix UI primitives
  - Custom components
  - Framer Motion for animations
- **Development Tools:**
  - ESLint
  - TypeScript
  - PostCSS
  - Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tech-resume.git
   cd tech-resume
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
tech-resume/
├── app/                    # Next.js app directory
│   ├── builder/           # Resume builder pages
│   ├── login/             # Authentication pages
│   ├── signup/            # User registration
│   └── templates/         # Resume templates
├── components/            # React components
│   ├── builder/          # Resume builder components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Runs the built application
- `npm run lint` - Runs ESLint for code linting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/) 