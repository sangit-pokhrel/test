import React from "react";
import "./App.css";
import ProtectedRoute from "./ProtectedRoutes/protectedRoutes";
import { AnimatePresence } from "framer-motion";
import { NavbarComponent } from "./Components/NavBar/NavBarComponent";
// import NavTest from "./Components/NavBar/NavTest";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SignupComponent from "./Components/SignUp/SignUpComponent";
import TestComponenet from "./Components/test/testComponenet";
import Test from "./Components/test3/test";
import ZzzComponent from "./Components/zzz/ZzzComponent";
import LoginComponent from "./Components/loginComponent/loginComponent";
import ProductComponent from "./Components/Product/ProductComponent";
import RecipeComponent from "./Components/Recipe/RecipeComponent";
import RecipeDetailPage from "./Components/Recipe/RecipeDetails";
import MealPlanComponent from "./Components/MealPlan/MealplanComponent";
import WorkoutComponent from "./Components/Workout/WorkoutComponent";
import AddProductComponent from "./Components/AddProduct/addProduct";
import CategoryComponent from "./Components/AddCategory/AddCategoryComponent";
import ContactForm from "./Components/ContactUs/ContactusComponent";
import GetMessage from "./Components/ContactUs/GetMessage";
import RecipeCardComponent from "./Components/Recipe/RecipeCardComponent";
import AddWorkoutTypeComponent from "./Components/Workout/AddWorkoutTypeComponent";
import AddWorkout from "./Components/Workout/AddWorkoutComponent";
import NotFound from "./Components/NotFound/NotFound";
import Footer from "./Components/footer/Footer";
import Home from "./Components/Home/Home";
import AdminDashboard from "./Components/adminDashboard/AdminDashboard";
import ScrollTopTop from "./Components/ScrollToTop/ScrollToTop";
import RecipeEditPage from "./Components/Recipe/RecipeEditPage";

function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        {/* <NavTest /> */}

        {/* Use `useLocation` inside Router */}
        {/** Pass `location` to `Routes` so that `AnimatePresence` detects changes */}
        <Content />
        {/* <Footer /> */}
        {/* <ScrollTopTop /> */}
      </Router>
    </>
  );
}

function Content() {
  const location = useLocation(); // useLocation inside Router context

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginComponent />} />
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/contactus" element={<ContactForm />} />
        <Route path="*" element={<NotFound />} />

        {/* admin and user  */}
        <>
          <Route
            path="/product"
            element={
              <ProtectedRoute roles={["user", "admin"]}>
                <ProductComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe"
            element={
              <ProtectedRoute roles={["user", "admin"]}>
                <RecipeComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <ProtectedRoute roles={["user", "admin"]}>
                <RecipeDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mealplan"
            element={
              <ProtectedRoute roles={["user", "admin"]}>
                <MealPlanComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout"
            element={
              <ProtectedRoute roles={["user", "admin"]}>
                <WorkoutComponent />
              </ProtectedRoute>
            }
          />
        </>
        {/* admin only */}
        <>
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AddProductComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcategory"
            element={
              <ProtectedRoute roles={["admin"]}>
                <CategoryComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute roles={["admin"]}>
                <TestComponenet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-recipe/:id" 
            element={
              <ProtectedRoute roles={["admin"]}>
                <RecipeEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test2"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ZzzComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test3"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Test />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addrecipe"
            element={
              <ProtectedRoute roles={["admin"]}>
                <RecipeCardComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addworkout-type"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AddWorkoutTypeComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addworkout"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AddWorkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/message"
            element={
              <ProtectedRoute roles={["admin"]}>
                <GetMessage />
              </ProtectedRoute>
            }
          />
        </>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
