import { announcements as fallbackAnnouncements, courseRegistration as fallbackCourseRegistration, documents as fallbackDocuments, fees as fallbackFees, notifications as fallbackNotifications, paymentHistory as fallbackPayments, results as fallbackResults, studentCourses as fallbackCourses, studentProfile as fallbackProfile, timetable as fallbackTimetable, examTimetable as fallbackExamTimetable } from '../data/mockData'
import { hasSupabaseConfig, supabase } from './supabase'
import type { Announcement, Course, DocumentItem, Invoice, Notification, PaymentRecord, ResultItem, UserSession } from '../types'

export type StudentDataBundle = {
  profile: typeof fallbackProfile
  courses: Course[]
  results: ResultItem[]
  fees: Invoice[]
  paymentHistory: PaymentRecord[]
  announcements: Announcement[]
  notifications: Notification[]
  documents: DocumentItem[]
  registration: typeof fallbackCourseRegistration
  timetable: typeof fallbackTimetable
  examTimetable: typeof fallbackExamTimetable
}

const asNumber = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const mapCourse = (entry: Record<string, unknown>): Course | null => {
  const code = typeof entry.code === 'string' ? entry.code : typeof entry.course_code === 'string' ? entry.course_code : undefined
  const title = typeof entry.title === 'string' ? entry.title : undefined

  if (!code || !title) {
    return null
  }

  return {
    code,
    title,
    creditHours: asNumber(entry.credit_hours ?? entry.creditHours),
    lecturer: typeof entry.lecturer === 'string' ? entry.lecturer : 'Staff assigned',
    schedule: typeof entry.schedule === 'string' ? entry.schedule : 'TBA',
    venue: typeof entry.venue === 'string' ? entry.venue : 'TBA',
  }
}

const mapResult = (entry: Record<string, unknown>): ResultItem | null => {
  const code = typeof entry.course_code === 'string' ? entry.course_code : typeof entry.code === 'string' ? entry.code : undefined
  const title = typeof entry.title === 'string' ? entry.title : 'Course result'
  if (!code) {
    return null
  }

  return {
    code,
    title,
    unit: asNumber(entry.unit ?? entry.credit_hours),
    grade: typeof entry.grade === 'string' ? entry.grade : 'B',
    score: asNumber(entry.score),
    semester: typeof entry.semester === 'string' ? entry.semester : 'Current semester',
  }
}

const mapInvoice = (entry: Record<string, unknown>): Invoice | null => {
  const id = typeof entry.id === 'string' ? entry.id : `INV-${Math.random().toString(16).slice(2, 8)}`
  const description = typeof entry.description === 'string' ? entry.description : 'Fee item'
  if (!id) {
    return null
  }

  const status = typeof entry.status === 'string' ? entry.status : 'Pending'
  return {
    id,
    description,
    amount: asNumber(entry.amount),
    dueDate: typeof entry.due_date === 'string' ? entry.due_date : 'TBA',
    status: status === 'Paid' || status === 'Outstanding' || status === 'Pending' ? status : 'Pending',
  }
}

const mapPayment = (entry: Record<string, unknown>): PaymentRecord | null => {
  const id = typeof entry.id === 'string' ? entry.id : `PMT-${Math.random().toString(16).slice(2, 8)}`
  const reference = typeof entry.reference === 'string' ? entry.reference : 'Reference not available'

  return {
    id,
    date: typeof entry.created_at === 'string' ? entry.created_at.slice(0, 10) : 'N/A',
    method: typeof entry.payment_method === 'string' ? entry.payment_method : 'Bank transfer',
    reference,
    amount: asNumber(entry.amount),
  }
}

const mapDocument = (entry: Record<string, unknown>): DocumentItem | null => {
  const name = typeof entry.name === 'string' ? entry.name : 'Document'
  if (!name) {
    return null
  }

  return {
    name,
    type: typeof entry.type === 'string' ? entry.type : 'Academic',
    size: typeof entry.size === 'string' ? entry.size : 'Unknown size',
    updated: typeof entry.updated_at === 'string' ? entry.updated_at.slice(0, 10) : 'N/A',
    status: typeof entry.status === 'string' && (entry.status === 'Verified' || entry.status === 'Pending' || entry.status === 'Archived') ? entry.status : 'Verified',
  }
}

export async function loadStudentData(user: UserSession | null): Promise<StudentDataBundle> {
  const fallbackBundle: StudentDataBundle = {
    profile: fallbackProfile,
    courses: fallbackCourses,
    results: fallbackResults,
    fees: fallbackFees,
    paymentHistory: fallbackPayments,
    announcements: fallbackAnnouncements,
    notifications: fallbackNotifications,
    documents: fallbackDocuments,
    registration: fallbackCourseRegistration,
    timetable: fallbackTimetable,
    examTimetable: fallbackExamTimetable,
  }

  if (!user || user.role !== 'STUDENT' || !hasSupabaseConfig || !supabase) {
    return fallbackBundle
  }

  try {
    const profilePromise = supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
    const registrationsPromise = supabase.from('course_registrations').select('*, courses(*)').eq('student_id', user.id)
    const resultsPromise = supabase.from('results').select('*').eq('student_id', user.id)
    const feesPromise = supabase.from('fees').select('*').eq('student_id', user.id)
    const paymentsPromise = supabase.from('payments').select('*').eq('student_id', user.id)
    const announcementsPromise = supabase.from('announcements').select('*').limit(3)
    const notificationsPromise = supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5)
    const documentsPromise = supabase.from('documents').select('*').eq('user_id', user.id)

    const [profileResult, registrationsResult, resultsResult, feesResult, paymentsResult, announcementsResult, notificationsResult, documentsResult] = await Promise.all([
      profilePromise,
      registrationsPromise,
      resultsPromise,
      feesPromise,
      paymentsPromise,
      announcementsPromise,
      notificationsPromise,
      documentsPromise,
    ])

    const profileData = profileResult.data as Record<string, unknown> | null
    const registrationRows = Array.isArray(registrationsResult.data) ? registrationsResult.data as Record<string, unknown>[] : []
    const rawResults = Array.isArray(resultsResult.data) ? resultsResult.data as Record<string, unknown>[] : []
    const rawFees = Array.isArray(feesResult.data) ? feesResult.data as Record<string, unknown>[] : []
    const rawPayments = Array.isArray(paymentsResult.data) ? paymentsResult.data as Record<string, unknown>[] : []
    const rawAnnouncements = Array.isArray(announcementsResult.data) ? announcementsResult.data as Record<string, unknown>[] : []
    const rawNotifications = Array.isArray(notificationsResult.data) ? notificationsResult.data as Record<string, unknown>[] : []
    const rawDocuments = Array.isArray(documentsResult.data) ? documentsResult.data as Record<string, unknown>[] : []

    const mappedCourses = registrationRows.flatMap((row) => {
      const relation = row.courses as Record<string, unknown> | Record<string, unknown>[] | undefined
      const courseEntry = Array.isArray(relation) ? relation[0] : relation
      const mapped = courseEntry ? mapCourse(courseEntry as Record<string, unknown>) : null
      return mapped ? [mapped] : []
    })

    const bundle: StudentDataBundle = {
      profile: {
        ...fallbackProfile,
        ...(profileData ?? {}),
        fullName: typeof profileData?.full_name === 'string' ? profileData.full_name : fallbackProfile.fullName,
        studentId: typeof profileData?.student_id === 'string' ? profileData.student_id : fallbackProfile.studentId,
        degree: typeof profileData?.programme === 'string' ? profileData.programme : fallbackProfile.degree,
        department: typeof profileData?.department === 'string' ? profileData.department : fallbackProfile.department,
        level: typeof profileData?.level === 'string' ? profileData.level : fallbackProfile.level,
        academicYear: typeof profileData?.academic_year === 'string' ? profileData.academic_year : fallbackProfile.academicYear,
        semester: typeof profileData?.semester === 'string' ? profileData.semester : fallbackProfile.semester,
        email: typeof profileData?.email === 'string' ? profileData.email : fallbackProfile.email,
        phone: typeof profileData?.phone === 'string' ? profileData.phone : fallbackProfile.phone,
        address: typeof profileData?.address === 'string' ? profileData.address : fallbackProfile.address,
        avatarUrl: typeof profileData?.avatar_url === 'string' ? profileData.avatar_url : fallbackProfile.avatarUrl,
      },
      courses: mappedCourses.length > 0 ? mappedCourses : fallbackCourses,
      results: rawResults.map((entry) => mapResult(entry)).filter((entry): entry is ResultItem => Boolean(entry)),
      fees: rawFees.map((entry) => mapInvoice(entry)).filter((entry): entry is Invoice => Boolean(entry)),
      paymentHistory: rawPayments.map((entry) => mapPayment(entry)).filter((entry): entry is PaymentRecord => Boolean(entry)),
      announcements: rawAnnouncements.length > 0 ? rawAnnouncements.map((entry) => ({
        title: typeof entry.title === 'string' ? entry.title : 'Announcement',
        summary: typeof entry.summary === 'string' ? entry.summary : 'Latest campus update',
        date: typeof entry.created_at === 'string' ? entry.created_at.slice(0, 10) : 'Today',
        audience: typeof entry.audience === 'string' ? entry.audience : 'All students',
      })) : fallbackAnnouncements,
      notifications: rawNotifications.length > 0 ? rawNotifications.map((entry) => ({
        title: typeof entry.title === 'string' ? entry.title : 'Notification',
        detail: typeof entry.detail === 'string' ? entry.detail : 'New update available',
        time: typeof entry.created_at === 'string' ? new Date(entry.created_at).toLocaleDateString() : 'Recently',
        priority: typeof entry.priority === 'string' ? (entry.priority === 'High' || entry.priority === 'Medium' || entry.priority === 'Low' ? entry.priority : 'Medium') : 'Medium',
      })) : fallbackNotifications,
      documents: rawDocuments.length > 0 ? rawDocuments.map((entry) => mapDocument(entry)).filter((entry): entry is DocumentItem => Boolean(entry)) : fallbackDocuments,
      registration: {
        ...fallbackCourseRegistration,
        status: typeof profileData?.status === 'string' ? profileData.status : fallbackCourseRegistration.status,
      },
      timetable: fallbackTimetable,
      examTimetable: fallbackExamTimetable,
    }

    return bundle
  } catch (error) {
    console.warn('Supabase student data load failed, using demo data instead.', error)
    return fallbackBundle
  }
}
