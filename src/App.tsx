import { useState } from "react";
import { DataProvider } from "./context/DataContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import ProjectDetail from "./pages/ProjectDetail";
import BlogDetail from "./pages/BlogDetail";
import AllProjects from "./pages/AllProjects";
import CertificationsPage from "./pages/CertificationsPage";

type View = "portfolio" | "admin" | "project" | "blog-post" | "all-projects" | "certifications";

export default function App() {
  const [view, setView] = useState<View>("portfolio");
  const [previousView, setPreviousView] = useState<View>("portfolio");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const goBack = () => {
    setView(previousView === "all-projects" ? "all-projects" : "portfolio");
    setSelectedProject(null);
    setSelectedBlog(null);
  };

  const goToProject = (id: string) => {
    setPreviousView(view);
    setSelectedProject(id);
    setSelectedBlog(null);
    setView("project");
  };

  const goToAllProjects = () => {
    setView("all-projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToCertifications = () => {
    setView("certifications");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToBlogPost = (id: string) => {
    setSelectedBlog(id);
    setSelectedProject(null);
    setView("blog-post");
  };

  const goToProjects = () => {
    setView("portfolio");
    setSelectedProject(null);
    setSelectedBlog(null);
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  if (view === "admin") {
    return (
      <DataProvider>
        <Admin onBack={() => setView("portfolio")} />
      </DataProvider>
    );
  }

  if (view === "certifications") {
    return (
      <DataProvider>
        <CertificationsPage
          onBack={() => {
            setView("portfolio");
            setTimeout(() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }, 60);
          }}
        />
        <Chatbot isOpen={chatbotOpen} onToggle={() => setChatbotOpen((o) => !o)} />
      </DataProvider>
    );
  }

  if (view === "all-projects") {
    return (
      <DataProvider>
        <AllProjects
          onBack={() => {
            setView("portfolio");
            setTimeout(() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }, 60);
          }}
          onProjectClick={goToProject}
        />
        <Chatbot isOpen={chatbotOpen} onToggle={() => setChatbotOpen((o) => !o)} />
      </DataProvider>
    );
  }

  if (view === "project" && selectedProject) {
    return (
      <DataProvider>
        <ProjectDetail projectId={selectedProject} onBack={goBack} />
        <Chatbot isOpen={chatbotOpen} onToggle={() => setChatbotOpen((o) => !o)} />
      </DataProvider>
    );
  }

  if (view === "blog-post" && selectedBlog) {
    return (
      <DataProvider>
        <BlogDetail
          postId={selectedBlog}
          onBack={goBack}
          onPostClick={goToBlogPost}
          onProjectsClick={goToProjects}
        />
        <Chatbot isOpen={chatbotOpen} onToggle={() => setChatbotOpen((o) => !o)} />
      </DataProvider>
    );
  }

  return (
    <DataProvider>
      <div
        className="min-h-full"
        style={{ background: "var(--background)", color: "var(--foreground)", fontFamily: "'Outfit', sans-serif" }}
      >
        <Nav />

        <main>
          <Hero />
          <About onViewAllCertifications={goToCertifications} />
          <Projects onProjectClick={goToProject} onViewAll={goToAllProjects} />
          <Skills />
          <Blog onPostClick={goToBlogPost} />
          <Contact />
        </main>

        <Footer onAdminClick={() => setView("admin")} />

        <Chatbot
          isOpen={chatbotOpen}
          onToggle={() => setChatbotOpen((o) => !o)}
        />
      </div>
    </DataProvider>
  );
}
