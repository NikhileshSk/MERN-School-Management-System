# Database Documentation

## Overview

The MERN School Management System uses **MongoDB** as its database, with **Mongoose** as the ODM (Object Document Mapper). The database follows a document-based structure with references between collections to maintain data relationships.

---

## Database Configuration

### Connection Setup

```javascript
// backend/index.js
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log("NOT CONNECTED TO NETWORK", err));
```

### Environment Variables

```env
# .env file
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

---

## Entity Relationship Diagram

```
┌─────────────┐
│   ADMIN     │
│  (School)   │
└──────┬──────┘
       │
       │ 1 : N
       │
       ├──────────────┬──────────────┬──────────────┬──────────────┐
       ▼              ▼              ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   SCLASS     │ │   STUDENT    │ │   TEACHER    │ │   NOTICE     │ │   COMPLAIN   │
│   (Class)    │ │              │ │              │ │              │ │              │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────────────┘ └──────────────┘
       │                │              │
       │ 1 : N          │              │
       ▼                │              │
┌──────────────┐        │              │
│   SUBJECT    │◄───────┴──────────────┘
│              │     N : 1 (many-to-one relationships)
└──────────────┘
```

---

## Collections (Schemas)

### 1. Admin Collection

The `admin` collection represents school administrators who own/manage a school.

**File:** `models/adminSchema.js`

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | Auto | Yes | Auto | MongoDB document ID |
| `name` | String | Yes | No | - | Admin's full name |
| `email` | String | Yes | Yes | - | Login email |
| `password` | String | Yes | No | - | Hashed password (bcrypt) |
| `role` | String | No | No | "Admin" | User role identifier |
| `schoolName` | String | Yes | Yes | - | Name of the school |

**Example Document:**
```json
{
  "_id": "64a1234567890abcdef12345",
  "name": "John Administrator",
  "email": "admin@school.com",
  "password": "$2b$10$hashedPasswordHere...",
  "role": "Admin",
  "schoolName": "Springfield Elementary School"
}
```

---

### 2. Sclass (Class) Collection

The `sclass` collection represents school classes/grades.

**File:** `models/sclassSchema.js`

| Field | Type | Required | Ref | Description |
|-------|------|----------|-----|-------------|
| `_id` | ObjectId | Auto | - | MongoDB document ID |
| `sclassName` | String | Yes | - | Class name (e.g., "10A", "Grade 5") |
| `school` | ObjectId | No | admin | Reference to school/admin |
| `createdAt` | Date | Auto | - | Timestamp |
| `updatedAt` | Date | Auto | - | Timestamp |

**Example Document:**
```json
{
  "_id": "64b2345678901bcdef23456",
  "sclassName": "10A",
  "school": "64a1234567890abcdef12345",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 3. Student Collection

The `student` collection stores student information with embedded attendance and exam results.

**File:** `models/studentSchema.js`

| Field | Type | Required | Ref | Default | Description |
|-------|------|----------|-----|---------|-------------|
| `_id` | ObjectId | Auto | - | - | MongoDB document ID |
| `name` | String | Yes | - | - | Student's full name |
| `rollNum` | Number | Yes | - | - | Roll number (class-unique) |
| `password` | String | Yes | - | - | Hashed password |
| `sclassName` | ObjectId | Yes | sclass | - | Reference to class |
| `school` | ObjectId | Yes | admin | - | Reference to school |
| `role` | String | No | - | "Student" | User role |
| `examResult` | Array | No | - | [] | Array of exam results |
| `attendance` | Array | No | - | [] | Array of attendance records |

**Embedded: examResult Array**
| Field | Type | Ref | Description |
|-------|------|-----|-------------|
| `subName` | ObjectId | subject | Subject reference |
| `marksObtained` | Number | - | Score (default: 0) |

**Embedded: attendance Array**
| Field | Type | Required | Ref | Description |
|-------|------|----------|-----|-------------|
| `date` | Date | Yes | - | Attendance date |
| `status` | String | Yes | - | "Present" or "Absent" |
| `subName` | ObjectId | Yes | subject | Subject reference |

**Example Document:**
```json
{
  "_id": "64c3456789012cdef34567",
  "name": "Alice Johnson",
  "rollNum": 101,
  "password": "$2b$10$hashedPasswordHere...",
  "sclassName": "64b2345678901bcdef23456",
  "school": "64a1234567890abcdef12345",
  "role": "Student",
  "examResult": [
    {
      "subName": "64d4567890123def45678",
      "marksObtained": 85
    }
  ],
  "attendance": [
    {
      "date": "2024-01-15T00:00:00.000Z",
      "status": "Present",
      "subName": "64d4567890123def45678"
    }
  ]
}
```

---

### 4. Teacher Collection

The `teacher` collection stores teacher information with assigned subjects and attendance.

**File:** `models/teacherSchema.js`

| Field | Type | Required | Ref | Default | Description |
|-------|------|----------|-----|---------|-------------|
| `_id` | ObjectId | Auto | - | - | MongoDB document ID |
| `name` | String | Yes | - | - | Teacher's full name |
| `email` | String | Yes (Unique) | - | - | Login email |
| `password` | String | Yes | - | - | Hashed password |
| `role` | String | No | - | "Teacher" | User role |
| `school` | ObjectId | Yes | admin | - | Reference to school |
| `teachSubject` | ObjectId | No | subject | - | Assigned subject |
| `teachSclass` | ObjectId | Yes | sclass | - | Assigned class |
| `attendance` | Array | No | - | [] | Teaching attendance |
| `createdAt` | Date | Auto | - | - | Timestamp |
| `updatedAt` | Date | Auto | - | - | Timestamp |

**Embedded: attendance Array**
| Field | Type | Description |
|-------|------|-------------|
| `date` | Date | Attendance date |
| `presentCount` | String | Students present |
| `absentCount` | String | Students absent |

**Example Document:**
```json
{
  "_id": "64e5678901234ef56789",
  "name": "Mr. Smith",
  "email": "smith@school.com",
  "password": "$2b$10$hashedPasswordHere...",
  "role": "Teacher",
  "school": "64a1234567890abcdef12345",
  "teachSubject": "64d4567890123def45678",
  "teachSclass": "64b2345678901bcdef23456",
  "attendance": [
    {
      "date": "2024-01-15T00:00:00.000Z",
      "presentCount": "25",
      "absentCount": "5"
    }
  ]
}
```

---

### 5. Subject Collection

The `subject` collection stores subject/course information.

**File:** `models/subjectSchema.js`

| Field | Type | Required | Ref | Description |
|-------|------|----------|-----|-------------|
| `_id` | ObjectId | Auto | - | MongoDB document ID |
| `subName` | String | Yes | - | Subject name (e.g., "Mathematics") |
| `subCode` | String | Yes | - | Subject code (e.g., "MATH101") |
| `sessions` | String | Yes | - | Number of sessions/periods |
| `sclassName` | ObjectId | Yes | sclass | Reference to class |
| `school` | ObjectId | No | admin | Reference to school |
| `teacher` | ObjectId | No | teacher | Assigned teacher |
| `createdAt` | Date | Auto | - | Timestamp |
| `updatedAt` | Date | Auto | - | Timestamp |

**Example Document:**
```json
{
  "_id": "64d4567890123def45678",
  "subName": "Mathematics",
  "subCode": "MATH101",
  "sessions": "5",
  "sclassName": "64b2345678901bcdef23456",
  "school": "64a1234567890abcdef12345",
  "teacher": "64e5678901234ef56789"
}
```

---

### 6. Notice Collection

The `notice` collection stores school announcements.

**File:** `models/noticeSchema.js`

| Field | Type | Required | Ref | Description |
|-------|------|----------|-----|-------------|
| `_id` | ObjectId | Auto | - | MongoDB document ID |
| `title` | String | Yes | - | Notice title |
| `details` | String | Yes | - | Notice content |
| `date` | Date | Yes | - | Notice date |
| `school` | ObjectId | No | admin | Reference to school |
| `createdAt` | Date | Auto | - | Timestamp |
| `updatedAt` | Date | Auto | - | Timestamp |

**Example Document:**
```json
{
  "_id": "64f6789012345f067890",
  "title": "Winter Break Announcement",
  "details": "School will be closed from Dec 20 to Jan 5 for winter holidays.",
  "date": "2024-12-15T00:00:00.000Z",
  "school": "64a1234567890abcdef12345"
}
```

---

### 7. Complain Collection

The `complain` collection stores student/teacher complaints.

**File:** `models/complainSchema.js`

| Field | Type | Required | Ref | Description |
|-------|------|----------|-----|-------------|
| `_id` | ObjectId | Auto | - | MongoDB document ID |
| `user` | ObjectId | Yes | student | Complainant reference |
| `date` | Date | Yes | - | Complaint date |
| `complaint` | String | Yes | - | Complaint text |
| `school` | ObjectId | Yes | admin | Reference to school |

**Example Document:**
```json
{
  "_id": "64g7890123456g178901",
  "user": "64c3456789012cdef34567",
  "date": "2024-01-20T00:00:00.000Z",
  "complaint": "The classroom heating is not working properly.",
  "school": "64a1234567890abcdef12345"
}
```

---

## Data Relationships

### Reference Relationships (Using ObjectId)

| Parent Collection | Child Collection | Relationship | Field |
|-------------------|------------------|--------------|-------|
| admin | sclass | 1 : N | `sclass.school` |
| admin | student | 1 : N | `student.school` |
| admin | teacher | 1 : N | `teacher.school` |
| admin | notice | 1 : N | `notice.school` |
| admin | complain | 1 : N | `complain.school` |
| admin | subject | 1 : N | `subject.school` |
| sclass | student | 1 : N | `student.sclassName` |
| sclass | teacher | 1 : N | `teacher.teachSclass` |
| sclass | subject | 1 : N | `subject.sclassName` |
| subject | teacher | N : 1 | `teacher.teachSubject` |
| student | complain | 1 : N | `complain.user` |

### Population Queries

```javascript
// Populate student with class and school details
Student.findById(studentId)
  .populate("sclassName", "sclassName")
  .populate("school", "schoolName")
  .populate("examResult.subName", "subName subCode")
  .populate("attendance.subName", "subName subCode");

// Populate subject with teacher
Subject.findById(subjectId)
  .populate("teacher", "name email");

// Populate teacher with class and subject
Teacher.findById(teacherId)
  .populate("teachSclass", "sclassName")
  .populate("teachSubject", "subName subCode sessions");
```

---

## Indexes

MongoDB automatically creates indexes on `_id` fields. Additional unique indexes:

| Collection | Field | Type |
|------------|-------|------|
| admin | email | unique |
| admin | schoolName | unique |
| teacher | email | unique |

---

## Data Validation

### Mongoose Schema Validation

- **Required fields**: Enforced at schema level
- **Unique constraints**: `email` and `schoolName` for admin, `email` for teacher
- **Enum values**: `attendance.status` limited to ["Present", "Absent"]
- **Type coercion**: Automatic type conversion by Mongoose

### Password Security

```javascript
// Password hashing before save
const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash(password, 10);

// Password verification on login
const isMatch = await bcrypt.compare(inputPassword, user.password);
```

---

## Database Operations

### Common Query Patterns

```javascript
// Find all students in a class
Student.find({ sclassName: classId });

// Find subjects without teachers
Subject.find({ teacher: { $exists: false } });

// Update attendance (add to array)
Student.findByIdAndUpdate(studentId, {
  $push: { 
    attendance: { date, status, subName } 
  }
});

// Update exam result
Student.findOneAndUpdate(
  { _id: studentId, "examResult.subName": subjectId },
  { $set: { "examResult.$.marksObtained": marks } }
);

// Delete all students in a class
Student.deleteMany({ sclassName: classId });
```

---

## Backup & Maintenance

### Manual Backup (mongodump)
```bash
mongodump --uri="mongodb+srv://..." --out=./backup
```

### Restore (mongorestore)
```bash
mongorestore --uri="mongodb+srv://..." ./backup
```

### Using MongoDB Atlas
- Automatic daily backups
- Point-in-time recovery
- Cloud backup via Atlas UI

---

## Production Recommendations

1. **Indexes**: Add compound indexes for frequent query patterns
2. **Validation**: Implement stricter schema validation
3. **Backup**: Enable automated backups on MongoDB Atlas
4. **Monitoring**: Use MongoDB Atlas monitoring or PM2
5. **Connection Pooling**: Configure proper pool size for production
