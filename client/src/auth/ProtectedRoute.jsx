import {
  withAuthenticationRequired,
} from "@auth0/auth0-react";

function ProtectedRoute({
  children,
}) {
  return children;
}

export default withAuthenticationRequired(
  ProtectedRoute,
  {
    onRedirecting: () => (
      <div className="flex min-h-screen items-center justify-center">
        Redirecting to login...
      </div>
    ),
  }
);