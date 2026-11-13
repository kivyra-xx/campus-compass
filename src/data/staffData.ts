import type { Announcement, DocumentItem, Notification, PaymentRecord, Role } from '../types'

export const lecturerRoster = [
  { studentId: 'MCU-2024-1187', name: 'Kivyra Ivy', attendance: 94, present: 15, absent: 1, late: 0 },
  { studentId: 'MCU-2024-1204', name: 'Ama Serwaa', attendance: 88, present: 14, absent: 2, late: 0 },
  { studentId: 'MCU-2024-1216', name: 'Kojo Mensah', attendance: 81, present: 13, absent: 2, late: 1 },
]

export const lecturerGradebook = [
  { studentId: 'MCU-2024-1187', name: 'Kivyra Ivy', assessment: 'Software design project', score: 86, status: 'Graded' },
  { studentId: 'MCU-2024-1204', name: 'Ama Serwaa', assessment: 'Software design project', score: 78, status: 'Graded' },
  { studentId: 'MCU-2024-1216', name: 'Kojo Mensah', assessment: 'Software design project', score: null, status: 'Awaiting review' },
]

export const financeTransactions: PaymentRecord[] = [
  { id: 'MCU-PAY-82701', date: '2026-11-13', method: 'Mobile money', reference: 'MM-82701', amount: 18450 },
  { id: 'MCU-PAY-82698', date: '2026-11-13', method: 'Bank transfer', reference: 'BT-82698', amount: 12600 },
  { id: 'MCU-PAY-82674', date: '2026-11-12', method: 'Card', reference: 'CC-82674', amount: 4300 },
  { id: 'MCU-PAY-82661', date: '2026-11-12', method: 'Mobile money', reference: 'MM-82661', amount: 7950 },
]

export const staffDocuments: Record<Exclude<Role, 'STUDENT'>, DocumentItem[]> = {
  ADMIN: [
    { name: 'Semester 1 operations summary', type: 'Administration', size: '1.2 MB', updated: '2026-11-12', status: 'Verified' },
    { name: 'Academic board meeting pack', type: 'Governance', size: '860 KB', updated: '2026-11-10', status: 'Pending' },
    { name: 'Faculty resource allocation', type: 'Planning', size: '540 KB', updated: '2026-11-08', status: 'Verified' },
  ],
  LECTURER: [],
  FINANCE_OFFICER: [
    { name: 'Semester 1 collections report', type: 'Finance', size: '940 KB', updated: '2026-11-13', status: 'Verified' },
    { name: 'Bank reconciliation BT-1108', type: 'Reconciliation', size: '320 KB', updated: '2026-11-12', status: 'Pending' },
    { name: 'Payment settlement summary', type: 'Finance', size: '610 KB', updated: '2026-11-11', status: 'Verified' },
  ],
  REGISTRAR: [
    { name: 'Transcript verification batch TR-042', type: 'Academic records', size: '720 KB', updated: '2026-11-13', status: 'Pending' },
    { name: 'Approved course catalogue 2026/2027', type: 'Course records', size: '1.6 MB', updated: '2026-11-09', status: 'Verified' },
    { name: 'Examination timetable release pack', type: 'Academic calendar', size: '480 KB', updated: '2026-11-07', status: 'Verified' },
  ],
}

export const staffAnnouncements: Record<Exclude<Role, 'STUDENT'>, Announcement[]> = {
  ADMIN: [
    { title: 'Academic board review meeting', summary: 'Programme proposals and semester operations will be reviewed at the next board meeting.', date: '2026-11-12', audience: 'University administration' },
    { title: 'Semester resource planning', summary: 'Faculty resource requests should be submitted for review before the end of November.', date: '2026-11-10', audience: 'Department heads' },
  ],
  LECTURER: [
    { title: 'Grade submission window is open', summary: 'Submit and verify course assessments before the published departmental deadline.', date: '2026-11-12', audience: 'Teaching staff' },
    { title: 'Examination moderation briefing', summary: 'Course coordinators should attend the moderation briefing before the December examination period.', date: '2026-11-08', audience: 'Academic staff' },
  ],
  FINANCE_OFFICER: [
    { title: 'Semester 1 settlement reconciliation', summary: 'Please reconcile bank and mobile money settlement batches before the daily finance close.', date: '2026-11-13', audience: 'Finance Office' },
    { title: 'Tuition reminder schedule', summary: 'The next outstanding-fee reminder batch is scheduled for 16 November.', date: '2026-11-11', audience: 'Finance Office' },
  ],
  REGISTRAR: [
    { title: 'Registration exceptions review', summary: 'Resolve prerequisite and credit-load exceptions before registration closes on 20 November.', date: '2026-11-13', audience: 'Registrar Office' },
    { title: 'Transcript verification queue', summary: 'The current transcript request batch is ready for document and record verification.', date: '2026-11-12', audience: 'Registrar Office' },
  ],
}

export const staffNotifications: Record<Exclude<Role, 'STUDENT'>, Notification[]> = {
  ADMIN: [
    { title: 'Programme review waiting', detail: 'Two new programme proposals need academic board review.', time: 'Today, 10:42 AM', priority: 'High' },
    { title: 'Registration progress updated', detail: 'Semester 1 registration completion is now 86%.', time: 'Today, 9:15 AM', priority: 'Medium' },
  ],
  LECTURER: [
    { title: 'Assessment submissions received', detail: 'Twelve CSCI 301 project submissions are ready to review.', time: 'Today, 10:20 AM', priority: 'High' },
    { title: 'Attendance register reminder', detail: 'Please verify this week’s attendance for your assigned course.', time: 'Today, 8:00 AM', priority: 'Medium' },
  ],
  FINANCE_OFFICER: [
    { title: 'Settlement batch needs review', detail: 'Bank transfer batch BT-1108 has 14 payments awaiting reconciliation.', time: 'Today, 11:32 AM', priority: 'High' },
    { title: 'Daily collection report ready', detail: 'The latest payment summary is available in Finance documents.', time: 'Today, 9:00 AM', priority: 'Medium' },
  ],
  REGISTRAR: [
    { title: 'Transcript requests ready', detail: 'Eleven transcript requests are waiting for record verification.', time: 'Today, 10:40 AM', priority: 'High' },
    { title: 'Registration deadline approaching', detail: 'Course registration closes on 20 November.', time: 'Today, 8:30 AM', priority: 'Medium' },
  ],
}

export const staffRoleLabels: Record<Exclude<Role, 'STUDENT'>, string> = {
  ADMIN: 'University administration',
  LECTURER: 'Teaching staff',
  FINANCE_OFFICER: 'Finance Office',
  REGISTRAR: 'Registrar Office',
}
