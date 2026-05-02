# Portfolio Workspace

A modern, scalable Angular v21 monorepo workspace featuring a personal portfolio application and an admin dashboard. Built with cutting-edge technologies including Signals, Standalone Components, Tailwind CSS v4, and Firebase Firestore integration.

## Tech Stack

- **Framework**: Angular v21.2.0 with CLI v21.2.7
- **Language**: TypeScript v5.9.2
- **Styling**: Tailwind CSS v4.2.2 + SCSS
- **Reactive Programming**: RxJS v7.8.0
- **Component Library**: Angular Material v21.2.7
- **Backend**: Firebase Firestore
- **Package Manager**: npm v11.12.1
- **Code Quality**: Prettier with Tailwind CSS plugin
- **Testing**: Vitest (reserved for future implementation)

## Project Structure

```
PORTFOLIO/
├── .github/
│   ├── workflows/              # CI/CD pipelines (Phase 4)
│   └── copilot-instructions.md # Development guidelines
├── projects/
│   ├── me/                     # Portfolio application
│   │   ├── public/             # Static assets
│   │   └── src/
│   │       ├── app/
│   │       ├── styles.scss     # Global styles
│   │       ├── tailwind.css    # Tailwind configuration
│   │       ├── main.ts         # Application entry point
│   │       └── index.html      # Main HTML template
│   │
│   ├── me-admin/               # Admin dashboard application
│   │   ├── public/             # Static assets
│   │   └── src/
│   │       ├── app/
│   │       │   ├── components/
│   │       │   │   ├── dashboard/        # Dashboard component
│   │       │   │   ├── home/             # Home component
│   │       │   │   ├── profile/          # User profile
│   │       │   │   ├── projects-manager/ # Projects CRUD
│   │       │   │   ├── skills-manager/   # Skills management
│   │       │   │   ├── settings/         # Settings page
│   │       │   │   └── not-found/        # 404 page
│   │       │   ├── app.routes.ts         # Route configuration
│   │       │   ├── app.ts                # Root component
│   │       │   └── app.config.ts         # App configuration
│   │       ├── styles.scss     # Global styles
│   │       ├── tailwind.css    # Tailwind configuration
│   │       ├── main.ts         # Application entry point
│   │       └── index.html      # Main HTML template
│   │
│   └── shared/                 # Shared library
│       └── src/
│           ├── lib/
│           │   ├── models/     # TypeScript interfaces and types
│           │   │   ├── project.model.ts
│           │   │   └── index.ts
│           │   ├── services/   # Firestore services
│           │   │   ├── firestore.service.ts
│           │   │   └── index.ts
│           │   └── shared.ts   # Main export
│           ├── public-api.ts   # Public library API
│           └── ng-package.json # Library configuration
│
├── angular.json                # Angular workspace configuration
├── tsconfig.json               # TypeScript global configuration
├── package.json                # Project dependencies
├── .prettierrc                  # Prettier configuration
├── .postcssrc.json             # PostCSS configuration
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm v11.12.1 or higher
- Angular CLI v21.2.7

### Installation

```bash
# Install dependencies
npm install
```

## Development

### Development Server

Start the development server for the portfolio application:

```bash
npm start
# or
ng serve --project=me
```

Navigate to `http://localhost:4200/`. The application automatically reloads whenever you modify source files.

### Serving Specific Applications

```bash
# Portfolio application
ng serve --project=me --open

# Admin dashboard
ng serve --project=me-admin --open
```

### Code Scaffolding

Generate new components, services, directives, or pipes using Angular CLI:

```bash
# Generate a component in the me-admin project
ng generate component components/my-component --project=me-admin

# Generate a service in the shared library
ng generate service services/my-service --project=shared
```

For a complete list of available schematics, run:

```bash
ng generate --help
```

## Building

### Production Build

Build the projects for production:

```bash
# Build all projects
ng build

# Build specific project
ng build --project=me
ng build --project=me-admin
ng build --project=shared
```

Build artifacts are stored in the `dist/` directory. By default, the production build optimizes your application for performance and speed, with the following budgets:

- **Initial bundle**: 500kB (warning) / 1MB (error)
- **Component styles**: 4kB (warning) / 8kB (error)

### Development Build

```bash
ng build --configuration development
```

### Watch Mode

```bash
ng build --watch --configuration development
```

## Testing

> **Note**: Testing framework setup is reserved for future implementation using Vitest.

Once implemented, run tests with:

```bash
ng test
```

## Architecture & Design Patterns

### Standalone Components

All components are built as standalone components using Angular's latest standalone API, eliminating the need for NgModules.

### Signals & Reactive State Management

The application leverages Angular Signals for reactive state management, providing improved performance through fine-grained reactivity and better change detection optimization.

### Feature Structure

- **Shared Library**: Centralized models and Firestore services shared across applications
- **Projects Manager**: Full CRUD operations for project management with detail and form components
- **Skills Manager**: Management interface for portfolio skills
- **Admin Dashboard**: Centralized admin controls and project oversight

### Firestore Integration

The `firestore.service.ts` in the shared library provides core database operations for:

- Project data management
- Portfolio information persistence
- User profile data

## Styling

The workspace uses a modern CSS approach:

- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development
- **SCSS**: Preprocessor for advanced CSS features and component-scoped styles
- **Prettier Tailwind Plugin**: Automatic class sorting and formatting

All global styles are configured in:
- `projects/me/src/styles.scss`
- `projects/me-admin/src/styles.scss`

## Code Quality

The project includes Prettier configuration for consistent code formatting:

```bash
# Format all files
npx prettier --write .

# Check formatting
npx prettier --check .
```

## Project Roadmap

- **Phase 1**: ✅ Project setup with monorepo structure
- **Phase 2**: ✅ Shared library with models and services
- **Phase 3**: ✅ Admin dashboard components and routing
- **Phase 4**: 🔄 CI/CD pipelines (.github/workflows)
- **Phase 5**: 📋 Unit and integration tests with Vitest
- **Phase 6**: 📋 E2E testing framework

## Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [RxJS Documentation](https://rxjs.dev)
- [Vitest Documentation](https://vitest.dev)