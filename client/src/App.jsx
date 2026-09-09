import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import LoginButton from "./components/LoginButton.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">
            Fidenz Weather Analytics
          </h1>

          <p className="mt-3 text-gray-600">
            Sign in to view weather analytics and city comfort rankings.
          </p>

          <div className="mt-6">
            <LoginButton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

export default App;