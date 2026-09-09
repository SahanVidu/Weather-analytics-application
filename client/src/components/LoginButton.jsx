import {
  useAuth0,
} from "@auth0/auth0-react";

export default function LoginButton() {
  const {
    loginWithRedirect,
  } = useAuth0();

  return (
    <button
      onClick={() =>
        loginWithRedirect()
      }
      className="rounded-lg bg-black px-5 py-3 text-white"
    >
      Login
    </button>
  );
}