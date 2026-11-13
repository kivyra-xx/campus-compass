export type Role = 'STUDENT' | 'ADMIN' | 'LECTURER' | 'FINANCE_OFFICER' | 'REGISTRAR'

export type UserSession = {
  id: string
  loginId: string
  name: string
  email: string
  role: Role
  studentId?: string
  avatar: string
  avatarUrl?: string
  programme?: string
  department?: string
  level?: string
  academicYear?: string
  semester?: string
  status: 'active' | 'inactive'
  password?: string
}

export type Course = {
  code: string
  title: string
  creditHours: number
  lecturer: string
  schedule: string
  venue: string
}

export type ResultItem = {
  code: string
  title: string
  unit: number
  grade: string
  score: number
  semester: string
}

export type Invoice = {
  id: string
  description: string
  amount: number
  dueDate: string
  status: 'Paid' | 'Outstanding' | 'Pending'
}

export type PaymentRecord = {
  id: string
  date: string
  method: string
  reference: string
  amount: number
}

export type TimetableSlot = {
  day: string
  time: string
  course: string
  venue: string
  lecturer: string
}

export type Announcement = {
  title: string
  summary: string
  date: string
  audience: string
}

export type Notification = {
  title: string
  detail: string
  time: string
  priority: 'High' | 'Medium' | 'Low'
}

export type DocumentItem = {
  name: string
  type: string
  size: string
  updated: string
  status: 'Verified' | 'Pending' | 'Archived'
}
