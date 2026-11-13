import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuth } from './contexts/AuthContext'
import { AccessDeniedPage } from './pages/AccessDeniedPage'
import { AnnouncementsPage } from './pages/AnnouncementsPage'
import { AttendancePage } from './pages/AttendancePage'
import { CoursesPage } from './pages/CoursesPage'
import { DashboardPage } from './pages/DashboardPage'
import { DocumentsPage } from './pages/DocumentsPage'
import { FeesPage } from './pages/FeesPage'
import { LoginPage } from './pages/LoginPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { PaymentsPage } from './pages/PaymentsPage'
import { ProfilePage } from './pages/ProfilePage'
import { RegistrationPage } from './pages/RegistrationPage'
import { ResultsPage } from './pages/ResultsPage'
import { TimetablePage } from './pages/TimetablePage'

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />
      <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN', 'LECTURER', 'FINANCE_OFFICER', 'REGISTRAR']}>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN', 'LECTURER', 'FINANCE_OFFICER', 'REGISTRAR']}>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN', 'LECTURER', 'REGISTRAR']}>
            <Layout>
              <CoursesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'REGISTRAR']}>
            <Layout>
              <RegistrationPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/results"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN', 'LECTURER', 'REGISTRAR']}>
            <Layout>
              <ResultsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/fees"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN', 'FINANCE_OFFICER']}>
            <Layout>
              <FeesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute allowedRoles={['FINANCE_OFFICER', 'ADMIN']}>
            <Layout>
              <PaymentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/timetable"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <Layout>
              <TimetablePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'LECTURER']}>
            <Layout>
              <AttendancePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/announcements"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN', 'LECTURER', 'REGISTRAR']}>
            <Layout>
              <AnnouncementsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN', 'FINANCE_OFFICER']}>
            <Layout>
              <NotificationsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN', 'FINANCE_OFFICER', 'REGISTRAR']}>
            <Layout>
              <DocumentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

export default App
