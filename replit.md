# assistflow-portal

## Overview

This is a React-based customer portal application for managing AI support agents, built with TypeScript and modern web technologies. The application provides a comprehensive dashboard for businesses to configure AI chat widgets, manage email responses, customize branding, handle integrations, and oversee user management. The portal is designed as a professional dark-themed interface that allows customers to control their AI assistant's behavior and appearance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a modern React architecture with TypeScript, built using Vite as the bundler. It uses a component-based design pattern with:

- **React Router** for client-side routing and navigation
- **shadcn/ui components** for a consistent, accessible UI component library
- **Tailwind CSS** for styling with a custom dark theme design system
- **Radix UI primitives** as the foundation for complex UI components
- **React Hook Form** with resolvers for form management and validation
- **TanStack React Query** for server state management and data fetching

The application structure separates concerns with dedicated directories for components, pages, hooks, and utilities. A layout system provides consistent navigation through a collapsible sidebar component.

### Design System
The UI implements a professional dark theme with:
- Custom CSS variables for consistent color theming
- Gradient backgrounds and elegant shadows
- Responsive design patterns
- Accessibility-first component design through Radix UI

### State Management
- Local component state using React hooks
- Form state managed by React Hook Form
- Server state and caching handled by TanStack React Query
- Toast notifications for user feedback using both shadcn toast and Sonner

### Routing Strategy
The application uses React Router with a protected route pattern:
- Public routes for authentication (login, forgot password, first-time setup)
- Protected routes wrapped in a Layout component for authenticated users
- Catch-all route for 404 handling

### Authentication Flow
The authentication system is designed to integrate with AWS Cognito, supporting:
- Standard email/password login
- First-time password setup flow for new users
- Password reset functionality with verification codes
- Session management and protected routes

## External Dependencies

### UI and Styling
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Radix UI** - Unstyled, accessible UI primitives for complex components
- **shadcn/ui** - Pre-built component library built on Radix UI
- **Lucide React** - Icon library for consistent iconography
- **class-variance-authority** - For creating variant-based component APIs

### State and Data Management
- **TanStack React Query** - Server state management and caching
- **React Hook Form** - Form state management and validation
- **@hookform/resolvers** - Validation resolvers for React Hook Form

### Development and Build Tools
- **Vite** - Fast build tool and development server
- **TypeScript** - Type safety and developer experience
- **ESLint** - Code linting and quality enforcement
- **PostCSS** - CSS processing with Autoprefixer

### Additional Libraries
- **date-fns** - Date manipulation and formatting
- **cmdk** - Command palette functionality
- **embla-carousel-react** - Carousel/slider components
- **next-themes** - Theme switching capabilities
- **react-day-picker** - Date picker components
- **input-otp** - OTP input components

### Planned Integrations
The application is architected to support:
- **AWS Cognito** - User authentication and management
- **Email services** - SMTP integration for AI email responses
- **WhatsApp Business API** - Messaging integration
- **Database** - Backend data storage (likely PostgreSQL with potential for Drizzle ORM)