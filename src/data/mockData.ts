import type {
  Announcement,
  Course,
  DocumentItem,
  Invoice,
  Notification,
  PaymentRecord,
  ResultItem,
  TimetableSlot,
  UserSession,
} from '../types'

export const demoInstitution = {
  name: 'Meridian Coast University',
  shortName: 'MCU',
  location: 'Cape Coast, Ghana',
  academicYear: '2026/2027',
  semester: 'Semester 1',
  demoNotice: 'Demonstration environment — all people and records shown are fictional.',
  departments: [
    'Computer Science',
    'Information Technology',
    'Business Administration',
    'Accounting and Finance',
    'Nursing and Midwifery',
  ],
}

export const demoUsers: UserSession[] = [
  {
    id: 'std-001',
    loginId: 'MCU-2024-1187',
    name: 'Kivyra Ivy',
    email: 'kivyra.ivy@student.mcu-demo.edu.gh',
    role: 'STUDENT',
    studentId: 'MCU-2024-1187',
    avatar: 'KI',
    avatarUrl: `${import.meta.env.BASE_URL}kivyra-ivy-avatar.svg`,
    programme: 'BSc Computer Science',
    department: 'Computer Science',
    level: 'Level 300',
    academicYear: '2026/2027',
    semester: 'Semester 1',
    status: 'active',
    password: 'password123',
  },
  {
    id: 'adm-001',
    loginId: 'ADM-001',
    name: 'Kwame Boateng',
    email: 'kwame.boateng@mcu-demo.edu.gh',
    role: 'ADMIN',
    avatar: 'KB',
    department: 'Administration',
    status: 'active',
    password: 'admin123',
  },
  {
    id: 'lec-001',
    loginId: 'LEC-001',
    name: 'Dr. Grace Yankson',
    email: 'grace.yankson@mcu-demo.edu.gh',
    role: 'LECTURER',
    avatar: 'GY',
    department: 'Computer Science',
    status: 'active',
    password: 'lecturer123',
  },
  {
    id: 'fin-001',
    loginId: 'FIN-001',
    name: 'Naa Adjeley',
    email: 'naa.adjeley@mcu-demo.edu.gh',
    role: 'FINANCE_OFFICER',
    avatar: 'NA',
    department: 'Finance Office',
    status: 'active',
    password: 'finance123',
  },
  {
    id: 'reg-001',
    loginId: 'REG-001',
    name: 'Mr. Joseph Kwarteng',
    email: 'joseph.kwarteng@mcu-demo.edu.gh',
    role: 'REGISTRAR',
    avatar: 'JK',
    department: 'Registrar Office',
    status: 'active',
    password: 'registrar123',
  },
]

export const studentProfile = {
  studentId: 'MCU-2024-1187',
  fullName: 'Kivyra Ivy',
  picture: 'KI',
  avatarUrl: `${import.meta.env.BASE_URL}kivyra-ivy-avatar.svg`,
  degree: 'BSc Computer Science',
  department: 'Computer Science',
  level: 'Level 300',
  academicYear: '2026/2027',
  semester: 'Semester 1',
  gender: 'Female',
  dob: '14 March 2003',
  nationality: 'Ghanaian',
  email: 'kivyra.ivy@student.mcu-demo.edu.gh',
  phone: '+233 24 567 8901',
  address: 'Atlantic Hall, Room B214, Meridian Coast University',
  gpa: 3.86,
  cgpa: 3.72,
  creditsCompleted: 102,
}

export const studentCourses: Course[] = [
  {
    code: 'CSCI 301',
    title: 'Software Engineering',
    creditHours: 3,
    lecturer: 'Dr. Grace Yankson',
    schedule: 'Mon/Wed 09:00 - 10:30',
    venue: 'Technology Centre, Lab 2',
  },
  {
    code: 'CSCI 305',
    title: 'Operating Systems',
    creditHours: 3,
    lecturer: 'Dr. Emmanuel Tetteh',
    schedule: 'Tue/Thu 12:00 - 13:30',
    venue: 'Science Block, Room 21',
  },
  {
    code: 'CSCI 315',
    title: 'Database Systems',
    creditHours: 3,
    lecturer: 'Dr. Selorm Kofi',
    schedule: 'Mon/Wed 14:00 - 15:30',
    venue: 'Technology Centre, Room 104',
  },
  {
    code: 'MATH 303',
    title: 'Probability & Statistics',
    creditHours: 2,
    lecturer: 'Dr. Esther Owusu',
    schedule: 'Fri 10:00 - 12:00',
    venue: 'Science Block, Room 08',
  },
]

export const courseRegistration = {
  status: 'Approved',
  registeredCredits: 11,
  feeBalance: 1400.0,
  registrationWindow: 'Open until 20 November 2026',
  academicYear: '2026/2027',
}

export const results: ResultItem[] = [
  { code: 'CSCI 214', title: 'Data Structures and Algorithms', unit: 3, grade: 'A-', score: 84, semester: '2025/2026 Sem 2' },
  { code: 'CSCI 226', title: 'Computer Networks', unit: 3, grade: 'A', score: 88, semester: '2025/2026 Sem 2' },
  { code: 'MATH 202', title: 'Discrete Mathematics', unit: 3, grade: 'B+', score: 79, semester: '2025/2026 Sem 2' },
  { code: 'STAT 210', title: 'Applied Statistics', unit: 2, grade: 'A-', score: 85, semester: '2025/2026 Sem 2' },
  { code: 'CSCI 208', title: 'Web Technologies', unit: 3, grade: 'A', score: 91, semester: '2025/2026 Sem 1' },
]

export const fees: Invoice[] = [
  { id: 'MCU-INV-270041', description: 'Outstanding tuition balance', amount: 750, dueDate: '2026-11-30', status: 'Outstanding' },
  { id: 'MCU-INV-270042', description: 'Atlantic Hall accommodation', amount: 4200, dueDate: '2026-11-30', status: 'Paid' },
  { id: 'MCU-INV-270043', description: 'Technology and laboratory levy', amount: 650, dueDate: '2026-12-15', status: 'Pending' },
]

export const paymentHistory: PaymentRecord[] = [
  { id: 'MCU-PAY-80412', date: '2026-09-08', method: 'Mobile money', reference: 'MM-80412', amount: 4800 },
  { id: 'MCU-PAY-81906', date: '2026-10-03', method: 'Bank transfer', reference: 'BT-81906', amount: 4050 },
  { id: 'MCU-PAY-82551', date: '2026-10-15', method: 'Card', reference: 'CC-82551', amount: 4200 },
]

export const timetable: TimetableSlot[] = [
  { day: 'Monday', time: '09:00 - 10:30', course: 'CSCI 301', venue: 'Technology Centre, Lab 2', lecturer: 'Dr. Grace Yankson' },
  { day: 'Tuesday', time: '12:00 - 13:30', course: 'CSCI 305', venue: 'Science Block, Room 21', lecturer: 'Dr. Emmanuel Tetteh' },
  { day: 'Wednesday', time: '14:00 - 15:30', course: 'CSCI 315', venue: 'Technology Centre, Room 104', lecturer: 'Dr. Selorm Kofi' },
  { day: 'Thursday', time: '12:00 - 13:30', course: 'CSCI 305', venue: 'Science Block, Room 21', lecturer: 'Dr. Emmanuel Tetteh' },
  { day: 'Friday', time: '10:00 - 12:00', course: 'MATH 303', venue: 'Science Block, Room 08', lecturer: 'Dr. Esther Owusu' },
]

export const examTimetable = [
  { day: 'Monday', date: '7 Dec 2026', time: '09:00 - 11:00', course: 'CSCI 301', venue: 'Examination Hall A' },
  { day: 'Wednesday', date: '9 Dec 2026', time: '13:00 - 15:00', course: 'CSCI 315', venue: 'Examination Hall B' },
  { day: 'Friday', date: '11 Dec 2026', time: '09:00 - 11:00', course: 'MATH 303', venue: 'Science Block, Room 08' },
]

export const attendanceRecord = {
  overall: 91,
  present: 28,
  absent: 3,
  late: 2,
}

export const announcements: Announcement[] = [
  {
    title: 'Registration closes on 20 November',
    summary: 'Review your course selections and confirm your registration before the deadline. Contact the Registrar for corrections.',
    date: '2026-11-10',
    audience: 'Continuing students',
  },
  {
    title: 'December examination timetable published',
    summary: 'The end-of-semester examination schedule is available in the Timetable section. Check venues before each paper.',
    date: '2026-11-07',
    audience: 'Level 100–400',
  },
  {
    title: 'Library extended study hours',
    summary: 'The Kofi Awoonor Library will remain open until 10:00 PM during the examination preparation period.',
    date: '2026-11-03',
    audience: 'All students',
  },
]

export const notifications: Notification[] = [
  { title: 'Payment confirmation', detail: 'Your tuition payment has been successfully received.', time: '2 hours ago', priority: 'High' },
  { title: 'Exam timetable released', detail: 'The examination timetable is now available on your portal.', time: 'Yesterday', priority: 'Medium' },
  { title: 'Attendance reminder', detail: 'You have missed two lectures this week. Please check the attendance dashboard.', time: '3 days ago', priority: 'Low' },
]

export const documents: DocumentItem[] = [
  { name: 'MCU-2024-1187-admission-letter.pdf', type: 'Academic', size: '1.4 MB', updated: '2024-08-19', status: 'Verified' },
  { name: 'MCU-2024-1187-student-card.png', type: 'Identity', size: '260 KB', updated: '2026-09-02', status: 'Verified' },
  { name: '2026-2027-transcript-request.pdf', type: 'Administrative', size: '72 KB', updated: '2026-10-28', status: 'Pending' },
]

export const rolePermissions = {
  STUDENT: [
    'dashboard',
    'profile',
    'courses',
    'registration',
    'results',
    'fees',
    'timetable',
    'attendance',
    'announcements',
    'notifications',
    'documents',
  ],
  ADMIN: [
    'dashboard',
    'profile',
    'courses',
    'results',
    'fees',
    'payments',
    'announcements',
    'notifications',
    'documents',
  ],
  LECTURER: ['dashboard', 'profile', 'courses', 'results', 'attendance', 'announcements'],
  FINANCE_OFFICER: ['dashboard', 'profile', 'fees', 'payments', 'documents', 'notifications'],
  REGISTRAR: ['dashboard', 'profile', 'courses', 'registration', 'results', 'documents', 'announcements'],
} as const
