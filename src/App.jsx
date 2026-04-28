import "./App.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/user/Home";
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout"; // Layout import karein
import Overview from "./pages/admin/Overview";
import CelebrityManagement from "./pages/admin/CelebrityManagement";
import ReviewsManager from "./pages/admin/ReviewsManager";
import ActorShoot from "./pages/user/ActorShoot";
import SliderManager from "./pages/admin/SliderManager";
import ShootImagesManager from "./pages/admin/ShootimagesManager";
import AccountSettings from "./pages/admin/AccountSettings";
import ServicesManagement from "./pages/admin/ServicesManagement";
import AboutUs from "./pages/user/AboutUs";
import ServicesPage from "./pages/user/ServicesPage";
import ContactPage from "./pages/user/Contact";
import CustomCursor from "./components/home/CustomCursor";
import Preloader from "./components/home/Preloader";
import ScrollReveal from "./components/home/ScrollReveal";
import TestimonialsPage from "./pages/user/TestimonialsPage";
import AllServicesPage from "./pages/user/AllServicesPage";
import CelebrityShootsPage from "./pages/user/CelebrityShootsPage";
import AboutPage from "./pages/user/AboutPage";
import VideographyPage from "./pages/user/VideographyPage";
import ServicePage from "./pages/user/Service";
import PreWedding from "./pages/user/PreWedding";
import WeddingEvent from "./pages/user/WeddingEvent";
import FoodVideography from "./pages/user/FoodVideography";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/actor/:id",
      element: <ActorShoot />,
    },
    {
      path: "/services",
      element: <AllServicesPage />,
    },
    {
      path: "/food-videography",
      element: <FoodVideography />,
    },
    {
      path: "/wedding-events",
      element: <WeddingEvent />,
    },
    {
      path: "/pre-wedding",
      element: <PreWedding />,
    },
    {
      path: "/services/:id",
      element: <ServicesPage />,
    },
    {
      path: "/services/:title/:id",
      element: <ServicePage />,
    },
    {
      path: "/about-us",
      element: <AboutPage />,
    },
    {
      path: "/videography",
      element: <VideographyPage />,
    },
    {
      path: "/contact-us",
      element: <ContactPage />,
    },
    {
      path: "/celebrity-shoots",
      element: <CelebrityShootsPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/testimonials",
      element: <TestimonialsPage />,
    },

    // Admin Routes (With Sidebar via Layout)
    {
      path: "/admin",
      element: <AdminLayout />, // Iske andar Sidebar hai
      children: [
        {
          path: "dashboard", // Access via /admin/dashboard
          element: <Overview />,
        },
        {
          path: "celebrity-shoots",
          element: <CelebrityManagement />,
        },
        {
          path: "sliders",
          element: <SliderManager />,
        },
        {
          path: "testimonials",
          element: <ReviewsManager />,
        },
        {
          path: "new-post",
          element: <ShootImagesManager />,
        },
        {
          path: "account-settings",
          element: <AccountSettings />,
        },
        {
          path: "services",
          element: <ServicesManagement />,
        },
      ],
    },
  ]);

  return (
    <>
      <Preloader />
      <ScrollReveal />
      <CustomCursor />
      <RouterProvider router={router} />
    </>
  );
}

export default App