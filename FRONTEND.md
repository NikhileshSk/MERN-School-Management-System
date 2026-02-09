# Frontend Documentation

## Overview

The frontend of the MERN School Management System is built with React.js and features a modern, premium UI with glassmorphic design, smooth animations, and role-specific theming.

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | Core UI library |
| Redux Toolkit | 1.9.5 | State management |
| React Router DOM | 6.10.0 | Client-side routing |
| Material-UI | 5.12.1 | Component library |
| styled-components | 5.3.10 | CSS-in-JS styling |
| Axios | 1.3.6 | HTTP client |
| Recharts | 2.6.2 | Charts & data visualization |
| react-countup | 6.4.2 | Number animations |

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run start
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts development server on port 3000 |
| `npm run build` | Creates production build |
| `npm test` | Runs test suite |
| `npm run eject` | Ejects from create-react-app |

---

## Project Structure

```
frontend/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images, SVGs, static assets
│   ├── components/        # Reusable UI components
│   │   ├── AccountMenu.js       # User dropdown menu
│   │   ├── Popup.js             # Alert notifications
│   │   ├── SeeNotice.js         # Notices display
│   │   ├── SpeedDialTemplate.js # FAB with actions
│   │   ├── TableTemplate.js     # Paginated data table
│   │   ├── TableViewTemplate.js # Read-only table
│   │   ├── buttonStyles.js      # Styled button components
│   │   ├── styles.js            # Layout components (AppBar, Drawer)
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Homepage.js          # Landing page
│   │   ├── ChooseUser.js        # Role selection
│   │   ├── LoginPage.js         # Login form
│   │   ├── Logout.js            # Logout confirmation
│   │   ├── admin/               # Admin pages
│   │   ├── student/             # Student pages
│   │   └── teacher/             # Teacher pages
│   ├── redux/             # State management
│   │   ├── store.js             # Redux store configuration
│   │   ├── userRelated/         # User auth state
│   │   ├── sclassRelated/       # Class management state
│   │   ├── studentRelated/      # Student management state
│   │   ├── teacherRelated/      # Teacher management state
│   │   ├── complainRelated/     # Complaints state
│   │   └── noticeRelated/       # Notices state
│   ├── App.js             # Main app with routes
│   ├── index.js           # React entry point
│   └── index.css          # Global styles & design tokens
└── package.json
```

---

## Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Indigo) | `#6366f1` | Main brand color, buttons, links |
| Accent (Purple) | `#8b5cf6` | Gradients, highlights |
| Success (Emerald) | `#10b981` | Student theme, success states |
| Warning (Amber) | `#f59e0b` | Teacher theme, warnings |
| Danger (Red) | `#ef4444` | Error states, delete actions |
| Background | `#0f0f23` | Main dark background |

### Role-Specific Theming

| Role | Primary Color | Accent | Badge Color |
|------|--------------|--------|-------------|
| Admin | Purple `#6366f1` | Indigo | Purple gradient |
| Student | Green `#10b981` | Emerald | Green gradient |
| Teacher | Amber `#f59e0b` | Yellow | Amber gradient |

### Design Principles

1. **Glassmorphism**: Semi-transparent cards with backdrop blur
2. **Gradient Accents**: Consistent gradient usage for CTAs
3. **Micro-animations**: Hover effects, entrance animations, floating elements
4. **Dark Theme**: Deep navy/purple backgrounds with high contrast
5. **Typography**: Inter (headings) and Poppins (body) fonts

---

## Key Features

### Authentication
- Role-based login (Admin, Student, Teacher)
- Guest mode for demo access
- Protected routes with redirect
- Session persistence via Redux

### Admin Dashboard
- Statistics cards with CountUp animations
- Class, student, teacher management
- Notices and complaints handling
- Subject assignment

### Student Dashboard
- Personal profile view
- Subject marks display with charts
- Attendance tracking with percentages
- Complaint submission

### Teacher Dashboard
- Class students management
- Attendance recording
- Marks assignment
- Profile management

---

## Redux State Structure

```javascript
{
  user: {
    currentUser: {},      // Logged-in user data
    currentRole: '',      // 'Admin' | 'Student' | 'Teacher'
    status: '',           // 'loading' | 'success' | 'error'
    loading: false,
    error: null
  },
  sclass: {
    sclassesList: [],     // All classes
    sclassStudents: [],   // Students in a class
    loading: false
  },
  student: {
    studentsList: [],     // All students
    loading: false
  },
  teacher: {
    teachersList: [],     // All teachers
    loading: false
  },
  notice: {
    noticesList: [],      // All notices
    loading: false
  },
  complain: {
    complainsList: [],    // All complaints
    loading: false
  }
}
```

---

## API Integration

All API calls are made using Axios to the backend server:

```javascript
// Base URL configuration
const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

// Example API call
axios.post(`${baseURL}/AdminLogin`, credentials)
axios.get(`${baseURL}/Students/${adminId}`)
axios.put(`${baseURL}/Student/${studentId}`)
axios.delete(`${baseURL}/Student/${studentId}`)
```

---

## Component Documentation

All major components include JSDoc documentation with:
- Component description and purpose
- Key features list
- @param tags for props
- @returns tag for JSX output
- Inline comments for complex logic

Example:
```javascript
/**
 * TableTemplate Component
 * 
 * A reusable, paginated data table with action buttons.
 * 
 * @param {Function} buttonHaver - Render prop for action buttons
 * @param {Array} columns - Column config with id, label, minWidth
 * @param {Array} rows - Data rows with 'id' property
 * @returns {JSX.Element} The rendered table
 */
```

---

## Styling Conventions

### Styled Components Pattern
```javascript
const ComponentName = styled.div`
  // Base styles
  background: rgba(30, 30, 60, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  
  // Hover states
  &:hover {
    transform: translateY(-2px);
  }
`;
```

### Animation Keyframes
```javascript
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
```

---

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_BASE_URL=http://localhost:5000
```

---

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (Chromium-based)
