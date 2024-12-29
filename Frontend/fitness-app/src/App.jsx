// App.js
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CoachDash from "./pages/CoachDash";
import UserDash from "./pages/UserDash";
import CreateExercise from "./pages/CreateExercise";
import CreateSplit from "./components/CreateSplit";
import StartCoaching from "./components/StartCoaching";
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage
import { Routes, Route } from "react-router-dom";
import ExercisePool from "./pages/ExercisePool";
import OurCoaches from "./pages/OurCoaches";
import ExerciseCarousel from "./components/ExerciseCarousel";
import ProfileEdit from "./components/ProfileEdit";
import { Toaster } from "react-hot-toast";

// Component for authenticated pages with Navbar and Footer
function AuthenticatedLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes without Navbar and Footer */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Authenticated routes with Navbar and Footer */}
        <Route
          path="/CoachDash"
          element={
            <AuthenticatedLayout>
              <CoachDash />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/UserDash"
          element={
            <AuthenticatedLayout>
              <UserDash />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/CreateExercise"
          element={
            <AuthenticatedLayout>
              <CreateExercise />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/CreateSplit"
          element={
            <AuthenticatedLayout>
              <CreateSplit />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/StartCoaching"
          element={
            <AuthenticatedLayout>
              <StartCoaching />
            </AuthenticatedLayout>
          }
        />
        {/* Add the Profile route */}
        <Route
          path="/profile"
          element={
            <AuthenticatedLayout>
              <ProfilePage />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <AuthenticatedLayout>
              <ProfileEdit />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/ExercisePool"
          element={
            <AuthenticatedLayout>
              <ExercisePool />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/OurCoaches"
          element={
            <AuthenticatedLayout>
              <OurCoaches />
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
