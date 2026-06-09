import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Work = lazy(() => import("./pages/Work.jsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Category = lazy(() => import("./pages/Category.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function PageShell({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-white/40 text-sm tracking-widest uppercase">
            Loading
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PageShell><Home /></PageShell>} />
        <Route path="/work" element={<PageShell><Work /></PageShell>} />
        <Route path="/work/:category" element={<PageShell><Work /></PageShell>} />
        <Route path="/category/:categoryId" element={<PageShell><Category /></PageShell>} />
        <Route path="/project/:projectId" element={<PageShell><ProjectDetail /></PageShell>} />
        <Route path="/projects/:slug" element={<PageShell><ProjectDetail /></PageShell>} />
        <Route path="/about" element={<PageShell><About /></PageShell>} />
        <Route path="*" element={<PageShell><NotFound /></PageShell>} />
      </Routes>
    </Layout>
  );
}
