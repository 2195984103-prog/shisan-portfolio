import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import About from "./pages/About.jsx";
import Category from "./pages/Category.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:category" element={<Work />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
