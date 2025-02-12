Yes, you can implement GitHub login in a Vite SPA using **React** and **TanStack Router** (formerly React Router) without relying on an external server. Below is a step-by-step guide to achieve this:

---

### 1. **Set Up Your Vite + React Project**
If you haven’t already, create a Vite + React project:

```bash
npm create vite@latest my-vite-app --template react
cd my-vite-app
npm install
```

Install TanStack Router:

```bash
npm install @tanstack/react-router
```

---

### 2. **Create a GitHub OAuth App**
- Go to your GitHub account settings and create a new OAuth App.
- Set the **Authorization callback URL** to your Vite app's URL (e.g., `http://localhost:5173/callback` for development).
- Note down the **Client ID**.

---

### 3. **Set Up TanStack Router**
Configure TanStack Router in your app. Create a router with routes for the login page, callback page, and a protected page.

```javascript
// src/router.js
import { createRouter, createRoute } from '@tanstack/react-router';

// Define routes
const routes = [
  createRoute({
    path: '/',
    component: Home,
  }),
  createRoute({
    path: '/login',
    component: Login,
  }),
  createRoute({
    path: '/callback',
    component: Callback,
  }),
  createRoute({
    path: '/profile',
    component: Profile,
  }),
];

// Create the router
const router = createRouter({ routes });

export default router;
```

---

### 4. **Implement the Login Flow**
#### **Login Page**
Create a `Login` component with a button that redirects the user to GitHub's authorization endpoint.

```javascript
// src/Login.jsx
export function Login() {
  const GITHUB_CLIENT_ID = 'your-client-id';
  const REDIRECT_URI = encodeURIComponent('http://localhost:5173/callback');
  const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user&state=random_state_string`;

  return (
    <div>
      <h1>Login with GitHub</h1>
      <a href={GITHUB_AUTH_URL}>
        <button>Login with GitHub</button>
      </a>
    </div>
  );
}
```

#### **Callback Page**
Create a `Callback` component to handle the OAuth callback. Extract the `access_token` from the URL hash and store it in memory or `sessionStorage`.

```javascript
// src/Callback.jsx
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

export function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the access token from the URL hash
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');

    if (accessToken) {
      // Store the access token in sessionStorage
      sessionStorage.setItem('github_access_token', accessToken);

      // Redirect to the profile page
      navigate({ to: '/profile' });
    } else {
      console.error('Access token not found in URL');
    }
  }, [navigate]);

  return <div>Loading...</div>;
}
```

#### **Profile Page**
Create a `Profile` component to fetch and display the user's GitHub profile data using the stored `access_token`.

```javascript
// src/Profile.jsx
import { useEffect, useState } from 'react';

export function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('github_access_token');

    if (accessToken) {
      fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {userData.name}</p>
      <p>Username: {userData.login}</p>
      <p>Email: {userData.email}</p>
      <img src={userData.avatar_url} alt="Profile" width="100" />
    </div>
  );
}
```

---

### 5. **Update the App Component**
Wrap your app with the router and render the routes.

```javascript
// src/App.jsx
import { RouterProvider } from '@tanstack/react-router';
import router from './router';

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

### 6. **Run the App**
Start your Vite development server:

```bash
npm run dev
```

- Visit `http://localhost:5173/login` to log in with GitHub.
- After authorization, GitHub will redirect you to `/callback`, where the `access_token` is extracted and stored.
- Finally, you’ll be redirected to `/profile`, where the user’s GitHub data is displayed.

---

### 7. **Security Considerations**
- **Avoid exposing client secrets**: Never hard-code or expose your GitHub OAuth App's client secret in the client-side code.
- **Use PKCE**: For enhanced security, consider implementing PKCE (Proof Key for Code Exchange) if you’re using the Authorization Code flow.
- **Validate the `state` parameter**: Always validate the `state` parameter to prevent CSRF attacks.
- **Token expiration**: Handle token expiration and refresh tokens if necessary.

---

### Example Code Structure
Here’s how your project structure might look:

```
src/
├── router.js
├── App.jsx
├── Login.jsx
├── Callback.jsx
├── Profile.jsx
```

---

This implementation allows you to handle GitHub login in a Vite SPA using React and TanStack Router without relying on an external server. For production, consider adding additional security measures and handling edge cases.
