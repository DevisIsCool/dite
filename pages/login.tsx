import { useLogin } from "@refinedev/core";
import { useEffect } from "react";

import { CredentialResponse } from "../interfaces/google";

// Todo: Update your Google Client ID here
const GOOGLE_CLIENT_ID =
  "743894347310-omigqvfvbnc79gjhlnsulihmqac0v70v.apps.googleusercontent.com";

const GOOGLE_OAUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=https://dite.zapto.org/blog-posts&scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code`;

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const openGooglePopup = () => {
    // Close any existing popups
    const popups = document.querySelectorAll(".google-popup");
    popups.forEach((popup: any) => {
      popup.close();
    });

    // Open a new popup for Google authentication
    const googlePopup = window.open(GOOGLE_OAUTH_URL, "_blank", "width=500,height=600");
    if (googlePopup) {
      (googlePopup as any).classList.add("google-popup"); // Casting googlePopup to any
    }
  };

  useEffect(() => {
    // Listening for the credential callback
    window.addEventListener('message', (event) => {
      if (event.origin === 'https://accounts.google.com' && event.data.type === 'credential_response') {
        login(event.data);
      }
    });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <button onClick={openGooglePopup}>Open Google Popup</button>
      <p>
        Powered by
        <img
          style={{ padding: "0 5px" }}
          alt="Google"
          src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
        />
        Google
      </p>
    </div>
  );
};


