# Backend Documentation

## Overview

The backend of the MERN School Management System is a RESTful API built with Node.js and Express.js. It handles authentication, data management, and business logic for the school management platform.

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 16+ | Runtime environment |
| Express.js | 4.18.2 | Web framework |
| MongoDB | - | Database (via Atlas or local) |
| Mongoose | 7.0.4 | MongoDB ODM |
| bcrypt | 5.1.0 | Password hashing |
| CORS | 2.8.5 | Cross-origin requests |
| dotenv | 16.0.3 | Environment variables |
| nodemon | 2.0.22 | Development auto-reload |

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB connection string

# Start development server
npm run start
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts server with nodemon (auto-reload) |
| `npm run build` | Installs dependencies |
| `npm test` | Runs test suite |

---

## Project Structure

```
backend/
├── controllers/           # Business logic & request handlers
│   ├── admin-controller.js      # Admin authentication & management
│   ├── class-controller.js      # Class CRUD operations
│   ├── complain-controller.js   # Complaints handling
│   ├── notice-controller.js     # Notices CRUD
│   ├── student_controller.js    # Student management & attendance
│   ├── subject-controller.js    # Subject CRUD operations
│   └── teacher-controller.js    # Teacher management
├── models/                # Mongoose data schemas
│   ├── adminSchema.js           # Admin user model
│   ├── complainSchema.js        # Complaints model
│   ├── noticeSchema.js          # Notices model
│   ├── sclassSchema.js          # Class model
│   ├── studentSchema.js         # Student model with attendance
│   ├── subjectSchema.js         # Subject model
│   └── teacherSchema.js         # Teacher model
├── routes/                # API route definitions
│   └── route.js                 # All API endpoints
├── index.js               # Server entry point
├── .env                   # Environment variables
└── package.json           # Dependencies & scripts
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/AdminReg` | Register new admin |
| POST | `/AdminLogin` | Admin login |
| POST | `/StudentLogin` | Student login |
| POST | `/TeacherLogin` | Teacher login |

### Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/Admin/:id` | Get admin details |

### Student Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/StudentReg` | Register new student |
| GET | `/Students/:adminId` | Get all students for admin |
| GET | `/Student/:id` | Get student details |
| PUT | `/Student/:id` | Update student |
| DELETE | `/Student/:id` | Delete student |
| DELETE | `/Students/:adminId` | Delete all students |
| DELETE | `/StudentsClass/:classId` | Delete students by class |
| PUT | `/StudentAttendance/:id` | Update student attendance |
| PUT | `/UpdateExamResult/:id` | Update exam results |
| PUT | `/RemoveAllStudentsSubAtten/:id` | Clear attendance by subject |
| PUT | `/RemoveAllStudentsAtten/:id` | Clear all attendance |
| PUT | `/RemoveStudentSubAtten/:id` | Remove student subject attendance |
| PUT | `/RemoveStudentAtten/:id` | Remove student attendance |

### Teacher Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/TeacherReg` | Register new teacher |
| GET | `/Teachers/:adminId` | Get all teachers for admin |
| GET | `/Teacher/:id` | Get teacher details |
| DELETE | `/Teacher/:id` | Delete teacher |
| DELETE | `/Teachers/:adminId` | Delete all teachers |
| DELETE | `/TeachersClass/:classId` | Delete teachers by class |
| PUT | `/TeacherSubject` | Update teacher's subject |
| POST | `/TeacherAttendance/:id` | Record teacher attendance |

### Class (Sclass) Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/SclassCreate` | Create new class |
| GET | `/SclassList/:adminId` | Get all classes for admin |
| GET | `/Sclass/:id` | Get class details |
| GET | `/Sclass/Students/:id` | Get students in class |
| DELETE | `/Sclass/:id` | Delete class |
| DELETE | `/Sclasses/:adminId` | Delete all classes |

### Subject Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/SubjectCreate` | Create new subject |
| GET | `/AllSubjects/:adminId` | Get all subjects |
| GET | `/ClassSubjects/:classId` | Get subjects for class |
| GET | `/FreeSubjectList/:adminId` | Get unassigned subjects |
| GET | `/Subject/:id` | Get subject details |
| DELETE | `/Subject/:id` | Delete subject |
| DELETE | `/Subjects/:adminId` | Delete all subjects |
| DELETE | `/SubjectsClass/:classId` | Delete subjects by class |

### Notice Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/NoticeCreate` | Create new notice |
| GET | `/NoticeList/:adminId` | Get all notices |
| PUT | `/Notice/:id` | Update notice |
| DELETE | `/Notice/:id` | Delete notice |
| DELETE | `/Notices/:adminId` | Delete all notices |

### Complaint Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ComplainCreate` | Submit complaint |
| GET | `/ComplainList/:id` | Get all complaints |

---

## Request/Response Examples

### Admin Login

**Request:**
```http
POST /AdminLogin
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "_id": "64a1234567890",
  "name": "School Admin",
  "email": "admin@school.com",
  "schoolName": "Springfield Elementary"
}
```

### Create Student

**Request:**
```http
POST /StudentReg
Content-Type: application/json

{
  "name": "John Doe",
  "rollNum": "101",
  "password": "password123",
  "sclassName": "64a1234567890",
  "adminID": "64a0987654321"
}
```

### Update Attendance

**Request:**
```http
PUT /StudentAttendance/64a1234567890
Content-Type: application/json

{
  "subName": "64a1111111111",
  "status": "Present",
  "date": "2024-01-15"
}
```

---

## Controllers

### admin-controller.js
- `adminRegister` - Creates new admin with hashed password
- `adminLogIn` - Validates credentials, returns admin data
- `getAdminDetail` - Fetches admin by ID

### student_controller.js
- `studentRegister` - Creates student with school/class reference
- `studentLogIn` - Validates rollNum, name, password
- `getStudents` - Lists all students for admin
- `getStudentDetail` - Full student data with populated refs
- `updateStudent` - Updates student info
- `deleteStudent` / `deleteStudents` - Single/bulk delete
- `studentAttendance` - Records daily attendance
- `updateExamResult` - Updates marks for subject

### teacher-controller.js
- `teacherRegister` - Creates teacher with subject assignment
- `teacherLogIn` - Teacher authentication
- `getTeachers` - Lists all teachers
- `getTeacherDetail` - Full teacher data
- `updateTeacherSubject` - Assigns subject to teacher
- `teacherAttendance` - Records teacher attendance

### class-controller.js
- `sclassCreate` - Creates new class
- `sclassList` - Lists classes for school
- `getSclassDetail` - Class details
- `getSclassStudents` - Students enrolled in class
- `deleteSclass` / `deleteSclasses` - Delete operations

### subject-controller.js
- `subjectCreate` - Creates subject linked to class
- `allSubjects` / `classSubjects` - List subjects
- `getSubjectDetail` - Subject details
- `freeSubjectList` - Unassigned subjects
- `deleteSubject` / `deleteSubjects` - Delete operations

### notice-controller.js
- `noticeCreate` - Creates school notice
- `noticeList` - Lists all notices
- `updateNotice` - Updates notice content
- `deleteNotice` / `deleteNotices` - Delete operations

### complain-controller.js
- `complainCreate` - Submits new complaint
- `complainList` - Lists complaints for school

---

## Error Handling

Controllers use try-catch blocks with consistent error responses:

```javascript
try {
  // Business logic
} catch (err) {
  res.status(500).json({ error: err.message });
}
```

Common error patterns:
- `res.send({ message: "..." })` - Validation errors
- `res.status(500).json(err)` - Server errors
- `res.send(result)` - Success responses

---

## Security Considerations

### Password Hashing
```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);
const isMatch = await bcrypt.compare(password, hashedPassword);
```

### Environment Variables
- MongoDB connection string stored in `.env`
- Never commit `.env` to version control

### CORS Configuration
```javascript
app.use(cors());  // Currently allows all origins
// For production, specify allowed origins:
// app.use(cors({ origin: 'https://yourfrontend.com' }));
```

---

## Server Configuration

```javascript
// index.js
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/', Routes);
app.listen(PORT);
```

---

## Development Tips

1. **Hot Reload**: Server restarts automatically with nodemon
2. **Testing APIs**: Use Postman or Thunder Client
3. **Database**: Use MongoDB Compass for visual database management
4. **Logs**: Check terminal for "Connected to MongoDB" confirmation
