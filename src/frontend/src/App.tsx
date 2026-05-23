import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/Home"));
const CommunityPage = lazy(() => import("./pages/Community"));
const MyLibraryPage = lazy(() => import("./pages/MyLibrary"));
const RequestsPage = lazy(() => import("./pages/Requests"));
const MessagesPage = lazy(() => import("./pages/Messages"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const BookDetailPage = lazy(() => import("./pages/BookDetail"));
const UserProfilePage = lazy(() => import("./pages/UserProfile"));
const SignInPage = lazy(() => import("./pages/SignIn"));
const SignUpPage = lazy(() => import("./pages/SignUp"));

function PageLoader() {
  return <LoadingSpinner fullPage message="Opening the bookshelf…" />;
}

// Root layout route
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const communityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/community",
  component: CommunityPage,
});

const bookDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book/$id",
  component: BookDetailPage,
});

const userProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/$id",
  component: UserProfilePage,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: SignInPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
});

// Protected routes
const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/library",
  component: () => (
    <ProtectedRoute>
      <MyLibraryPage />
    </ProtectedRoute>
  ),
});

const requestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/requests",
  component: () => (
    <ProtectedRoute>
      <RequestsPage />
    </ProtectedRoute>
  ),
});

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/messages",
  component: () => (
    <ProtectedRoute>
      <MessagesPage />
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

// Catch-all → home
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <Navigate to="/" />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  communityRoute,
  bookDetailRoute,
  userProfileRoute,
  signInRoute,
  signUpRoute,
  libraryRoute,
  requestsRoute,
  messagesRoute,
  profileRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
