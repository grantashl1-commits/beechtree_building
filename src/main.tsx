import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./index.css"
import "./lib/gsap"
import { Layout } from "./components/layout/layout"
import { HomePage } from "./pages/home"

// The home page ships in the main bundle; every other page loads on demand.
const router = createBrowserRouter([
  {
    element: <Layout />,
    hydrateFallbackElement: <div className="min-h-svh bg-limestone" />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/projects", lazy: async () => ({ Component: (await import("./pages/projects")).ProjectsPage }) },
      { path: "/projects/:slug", lazy: async () => ({ Component: (await import("./pages/project")).ProjectPage }) },
      { path: "/services", lazy: async () => ({ Component: (await import("./pages/services")).ServicesPage }) },
      { path: "/about", lazy: async () => ({ Component: (await import("./pages/about")).AboutPage }) },
      { path: "/contact", lazy: async () => ({ Component: (await import("./pages/contact")).ContactPage }) },
      { path: "*", lazy: async () => ({ Component: (await import("./pages/not-found")).NotFoundPage }) },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
