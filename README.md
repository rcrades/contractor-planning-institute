# Construction M&A Survey Application

## Overview

This Next.js application provides a comprehensive survey tool designed for the Contractor Planning Institute to help construction company owners explore selling options. The application guides users through a series of educational content and questions, collecting responses to generate a personalized report.

## Features

- Multi-step survey with progressive disclosure of content
- Educational sections explaining M&A concepts
- Dynamic question sections with response tracking
- Personalized results report based on user responses
- Email collection functionality
- Confetti celebration effect on survey completion
- Peer group matching functionality
- Responsive design for all device sizes

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/construction-ma-survey.git
cd construction-ma-survey
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/` - Contains the Next.js App Router components and routes
- `components/` - Reusable React components used throughout the application
- `public/` - Static assets like images and fonts

## Design System

This application uses a carefully crafted design system to maintain consistency and enhance user experience.

### Colors

- **Primary Background**: Dark/neutral (`bg-neutral-900`) - Creates a sophisticated, professional feel
- **Secondary Background**: Slightly lighter dark (`bg-neutral-800`) - Used for cards and UI elements
- **Accent Color**: Yellow (`yellow-400`) - Provides high contrast against dark backgrounds for important UI elements
- **Text Colors**: 
  - White/light gray for primary text on dark backgrounds
  - Black for text on yellow backgrounds
  - Various neutral shades for secondary and tertiary text

### Typography

- **Font Family**: Inter, a clean sans-serif typeface that maintains readability at various sizes
- **Heading Hierarchy**: Consistent sizing and spacing for various heading levels
- **Text Styles**: Carefully considered line heights and letter spacing for optimal readability

### Component Design Principles

1. **Consistent Card Pattern**: Information is presented in consistent card containers with standardized spacing
2. **Clear Visual Hierarchy**: Important information and actions are visually emphasized
3. **Interactive Elements**: Buttons and form elements have clear hover and active states
4. **Responsive Design**: All components adapt gracefully to different screen sizes

## Component Architecture

The application follows a modular component architecture:

### Page Components
- `app/page.tsx` - Main survey application
- `app/peer-group/page.tsx` - Peer group matching functionality

### Core Components
- `WelcomeScreen` - Initial landing screen with survey introduction
- `EducationalSection` - Presents educational content between questions
- `QuestionSection` - Handles question display and response collection
- `ResultsScreen` - Displays personalized report based on responses
- `ProgressBar` - Shows survey completion progress
- `EmailOverlay` - Collects user email for report delivery
- `PeerGroupSignup` - Facilitates peer group matching functionality

### UI Components
- `ConfettiButton` - Button with celebratory effect
- Various form elements and UI components

## Styling Approach

The application uses Tailwind CSS for styling with the following approach:

1. **Utility-First**: Leveraging Tailwind's utility classes for most styling needs
2. **Responsive Utilities**: Using responsive prefixes (`sm:`, `md:`, etc.) for adaptive layouts
3. **Dark Theme**: Consistently using dark mode throughout the application
4. **Custom Variables**: Using CSS variables for theme colors and consistent styling

## State Management

The application uses React's built-in state management:

- `useState` hooks for component-level state
- Props for passing data between related components
- Context could be added for more complex state management needs as the application grows

## Available Scripts

- `npm run dev` - Runs the application in development mode
- `npm run build` - Builds the application for production
- `npm run start` - Runs the built application in production mode
- `npm run lint` - Runs ESLint to check for code quality issues

## Future Enhancements

Potential areas for future development:

1. Server-side storage of survey responses
2. User authentication for saved reports
3. Enhanced analytics on survey completion rates
4. Additional visualization options for the results page
5. Integration with CRM systems

## License

[MIT](LICENSE)
