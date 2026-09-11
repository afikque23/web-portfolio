import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  developerInfo as defaultDevInfo,
  projects as defaultProjects,
  blogPosts as defaultBlogPosts,
  chatbotKnowledge as defaultChatbotKb,
  skills as defaultSkills,
  techStack as defaultTechStack,
  type Project,
  type BlogPost,
} from "../data";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
}

export interface KbItem {
  id: string;
  triggers: string[];
  response: string;
  active: boolean;
}

export interface DeveloperInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  currentStatus: string;
  cvUrl: string;
  cvFilename: string;
  roles: string[];
  stats: { value: string; label: string }[];
}

export interface SkillItem {
  id?: string;
  name: string;
  value: number;
  sort_order?: number;
}

export interface TechStackItem {
  id?: string;
  category: string;
  items: string[];
  sort_order?: number;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface DataContextValue {
  // State
  projects: Project[];
  blogPosts: BlogPost[];
  developerInfo: DeveloperInfo;
  messages: Message[];
  kbItems: KbItem[];
  skills: SkillItem[];
  techStack: TechStackItem[];
  loading: boolean;
  dbSeeded: boolean;

  // Projects CRUD
  addProject: (p: Omit<Project, "id">) => Promise<void>;
  updateProject: (p: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Blog CRUD
  addBlogPost: (p: Omit<BlogPost, "id">) => Promise<void>;
  updateBlogPost: (p: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;

  // DeveloperInfo
  updateDeveloperInfo: (info: Partial<DeveloperInfo>) => Promise<void>;

  // Messages
  sendMessage: (m: { name: string; email: string; subject: string; message: string }) => Promise<void>;
  updateMessageStatus: (id: string, status: "new" | "read" | "replied") => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  refreshMessages: () => Promise<void>;

  // Chatbot KB
  addKbItem: (item: { triggers: string[]; response: string }) => Promise<void>;
  updateKbItem: (id: string, item: { triggers: string[]; response: string; active: boolean }) => Promise<void>;
  deleteKbItem: (id: string) => Promise<void>;

  // Seed
  seedDatabase: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

function mapDevInfo(row: Record<string, unknown>): DeveloperInfo {
  return {
    name: (row.name as string) || defaultDevInfo.name,
    title: (row.title as string) || defaultDevInfo.title,
    tagline: (row.tagline as string) || defaultDevInfo.tagline,
    location: (row.location as string) || defaultDevInfo.location,
    email: (row.email as string) || defaultDevInfo.email,
    github: (row.github as string) || defaultDevInfo.github,
    linkedin: (row.linkedin as string) || defaultDevInfo.linkedin,
    twitter: (row.twitter as string) || defaultDevInfo.twitter,
    currentStatus: (row.current_status as string) || defaultDevInfo.currentStatus,
    cvUrl: (row.cv_url as string) || "#",
    cvFilename: (row.cv_filename as string) || "",
    roles: (row.roles as string[]) || ["Fresh Graduate Developer"],
    stats: (row.stats as { value: string; label: string }[]) || [],
  };
}

function mapProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    title: row.title as string,
    description: (row.description as string) || "",
    longDescription: (row.long_description as string) || "",
    tags: (row.tags as string[]) || [],
    year: (row.year as string) || "",
    role: (row.role as string) || "",
    team: (row.team as string) || "",
    type: (row.type as Project["type"]) || "personal",
    typeLabel: (row.type_label as string) || "",
    duration: (row.duration as string) || "",
    impact: (row.impact as string) || "",
    imageUrl: (row.image_url as string) || "",
    gallery: (row.gallery as string[]) || [],
    githubUrl: (row.github_url as string) || undefined,
    liveUrl: (row.live_url as string) || undefined,
    challenge: (row.challenge as string) || "",
    solution: (row.solution as string) || "",
    technicalDecisions: (row.technical_decisions as string) || "",
    outcome: (row.outcome as string) || "",
    learnings: (row.learnings as string) || "",
    featured: (row.featured as boolean) || false,
  };
}

function mapBlogPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    title: row.title as string,
    excerpt: (row.excerpt as string) || "",
    date: (row.date as string) || "",
    readTime: (row.read_time as string) || "",
    tags: (row.tags as string[]) || [],
    imageUrl: (row.image_url as string) || "",
    content: (row.content as BlogPost["content"]) || [],
    relatedIds: (row.related_ids as string[]) || [],
  };
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [developerInfo, setDeveloperInfo] = useState<DeveloperInfo>({
    ...defaultDevInfo,
    currentStatus: defaultDevInfo.currentStatus,
    cvUrl: "#",
    cvFilename: "",
    roles: ["Fresh Graduate Developer"],
    stats: [
      { value: "3.84", label: "IPK Cum Laude" },
      { value: "D3", label: "Teknik Informatika" },
      { value: "Polines", label: "Semarang" },
      { value: "10+", label: "Proyek selesai" },
      { value: "3", label: "Sertifikasi" },
    ],
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [kbItems, setKbItems] = useState<KbItem[]>([]);
  const [skills, setSkills] = useState<SkillItem[]>(defaultSkills);
  const [techStack, setTechStack] = useState<TechStackItem[]>(defaultTechStack);
  const [loading, setLoading] = useState(true);
  const [dbSeeded, setDbSeeded] = useState(false);

  // ── Load all data ─────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      try {
        // developer_info
        const { data: devData } = await supabase
          .from("developer_info")
          .select("*")
          .eq("id", 1)
          .maybeSingle();
        if (devData && !cancelled) {
          setDeveloperInfo(mapDevInfo(devData as Record<string, unknown>));
          setDbSeeded(true);
        }

        // projects
        const { data: projData } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: true });
        if (projData && projData.length > 0 && !cancelled) {
          setProjects(projData.map((r) => mapProject(r as Record<string, unknown>)));
        }

        // blog_posts
        const { data: blogData } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });
        if (blogData && blogData.length > 0 && !cancelled) {
          setBlogPosts(blogData.map((r) => mapBlogPost(r as Record<string, unknown>)));
        }

        // chatbot_kb
        const { data: kbData } = await supabase
          .from("chatbot_kb")
          .select("*")
          .order("created_at", { ascending: true });
        if (kbData && kbData.length > 0 && !cancelled) {
          setKbItems(
            kbData.map((r) => ({
              id: r.id as string,
              triggers: (r.triggers as string[]) || [],
              response: r.response as string,
              active: (r.active as boolean) ?? true,
            }))
          );
        }

        // skills
        const { data: skillsData } = await supabase
          .from("skills")
          .select("*")
          .order("sort_order", { ascending: true });
        if (skillsData && skillsData.length > 0 && !cancelled) {
          setSkills(
            skillsData.map((r) => ({
              id: r.id as string,
              name: r.name as string,
              value: r.value as number,
              sort_order: (r.sort_order as number) || 0,
            }))
          );
        }

        // tech_stack
        const { data: tsData } = await supabase
          .from("tech_stack")
          .select("*")
          .order("sort_order", { ascending: true });
        if (tsData && tsData.length > 0 && !cancelled) {
          setTechStack(
            tsData.map((r) => ({
              id: r.id as string,
              category: r.category as string,
              items: (r.items as string[]) || [],
              sort_order: (r.sort_order as number) || 0,
            }))
          );
        }

        // messages
        await loadMessages();
      } catch (e) {
        console.warn("[DataContext] Supabase load failed, using static data:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, []);

  async function loadMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setMessages(
        data.map((r) => ({
          id: r.id as string,
          name: r.name as string,
          email: r.email as string,
          subject: (r.subject as string) || "",
          message: r.message as string,
          status: (r.status as "new" | "read" | "replied") || "new",
          created_at: r.created_at as string,
        }))
      );
    }
  }

  // ── Projects CRUD ─────────────────────────────────────────────
  async function addProject(p: Omit<Project, "id">) {
    const id = p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();
    const row = {
      id,
      title: p.title,
      description: p.description,
      long_description: p.longDescription,
      tags: p.tags,
      year: p.year,
      role: p.role,
      team: p.team,
      type: p.type,
      type_label: p.typeLabel,
      duration: p.duration,
      impact: p.impact,
      image_url: p.imageUrl,
      gallery: p.gallery,
      github_url: p.githubUrl || null,
      live_url: p.liveUrl || null,
      challenge: p.challenge,
      solution: p.solution,
      technical_decisions: p.technicalDecisions,
      outcome: p.outcome,
      learnings: p.learnings,
      featured: p.featured,
    };
    const { error } = await supabase.from("projects").insert(row);
    if (!error) setProjects((prev) => [...prev, { ...p, id }]);
    else console.error("[addProject]", error);
  }

  async function updateProject(p: Project) {
    const row = {
      title: p.title,
      description: p.description,
      long_description: p.longDescription,
      tags: p.tags,
      year: p.year,
      role: p.role,
      team: p.team,
      type: p.type,
      type_label: p.typeLabel,
      duration: p.duration,
      impact: p.impact,
      image_url: p.imageUrl,
      gallery: p.gallery,
      github_url: p.githubUrl || null,
      live_url: p.liveUrl || null,
      challenge: p.challenge,
      solution: p.solution,
      technical_decisions: p.technicalDecisions,
      outcome: p.outcome,
      learnings: p.learnings,
      featured: p.featured,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("projects").update(row).eq("id", p.id);
    if (!error) setProjects((prev) => prev.map((x) => (x.id === p.id ? p : x)));
    else console.error("[updateProject]", error);
  }

  async function deleteProject(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) setProjects((prev) => prev.filter((x) => x.id !== id));
    else console.error("[deleteProject]", error);
  }

  // ── Blog CRUD ─────────────────────────────────────────────────
  async function addBlogPost(p: Omit<BlogPost, "id">) {
    const id = p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();
    const row = {
      id,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      read_time: p.readTime,
      tags: p.tags,
      image_url: p.imageUrl,
      content: p.content,
      related_ids: p.relatedIds,
      status: "published",
    };
    const { error } = await supabase.from("blog_posts").insert(row);
    if (!error) setBlogPosts((prev) => [{ ...p, id }, ...prev]);
    else console.error("[addBlogPost]", error);
  }

  async function updateBlogPost(p: BlogPost) {
    const row = {
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      read_time: p.readTime,
      tags: p.tags,
      image_url: p.imageUrl,
      content: p.content,
      related_ids: p.relatedIds,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("blog_posts").update(row).eq("id", p.id);
    if (!error) setBlogPosts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
    else console.error("[updateBlogPost]", error);
  }

  async function deleteBlogPost(id: string) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (!error) setBlogPosts((prev) => prev.filter((x) => x.id !== id));
    else console.error("[deleteBlogPost]", error);
  }

  // ── DeveloperInfo ─────────────────────────────────────────────
  async function updateDeveloperInfo(info: Partial<DeveloperInfo>) {
    const merged = { ...developerInfo, ...info };
    const row = {
      id: 1,
      name: merged.name,
      title: merged.title,
      tagline: merged.tagline,
      location: merged.location,
      email: merged.email,
      github: merged.github,
      linkedin: merged.linkedin,
      twitter: merged.twitter,
      current_status: merged.currentStatus,
      cv_url: merged.cvUrl,
      cv_filename: merged.cvFilename,
      roles: merged.roles,
      stats: merged.stats,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("developer_info").upsert(row, { onConflict: "id" });
    if (!error) setDeveloperInfo(merged);
    else console.error("[updateDeveloperInfo]", error);
  }

  // ── Messages ──────────────────────────────────────────────────
  async function sendMessage(m: { name: string; email: string; subject: string; message: string }) {
    const { error } = await supabase.from("messages").insert({ ...m, status: "new" });
    if (error) {
      console.error("[sendMessage]", error);
      throw error;
    }
  }

  async function updateMessageStatus(id: string, status: "new" | "read" | "replied") {
    const { error } = await supabase.from("messages").update({ status }).eq("id", id);
    if (!error) setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    else console.error("[updateMessageStatus]", error);
  }

  async function deleteMessage(id: string) {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (!error) setMessages((prev) => prev.filter((m) => m.id !== id));
    else console.error("[deleteMessage]", error);
  }

  async function refreshMessages() {
    await loadMessages();
  }

  // ── Chatbot KB ────────────────────────────────────────────────
  async function addKbItem(item: { triggers: string[]; response: string }) {
    const { data, error } = await supabase.from("chatbot_kb").insert({ ...item, active: true }).select().single();
    if (!error && data) {
      setKbItems((prev) => [
        ...prev,
        {
          id: data.id as string,
          triggers: (data.triggers as string[]) || [],
          response: data.response as string,
          active: true,
        },
      ]);
    } else {
      console.error("[addKbItem]", error);
    }
  }

  async function updateKbItem(id: string, item: { triggers: string[]; response: string; active: boolean }) {
    const { error } = await supabase
      .from("chatbot_kb")
      .update({ ...item, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) setKbItems((prev) => prev.map((k) => (k.id === id ? { ...k, ...item } : k)));
    else console.error("[updateKbItem]", error);
  }

  async function deleteKbItem(id: string) {
    const { error } = await supabase.from("chatbot_kb").delete().eq("id", id);
    if (!error) setKbItems((prev) => prev.filter((k) => k.id !== id));
    else console.error("[deleteKbItem]", error);
  }

  // ── Seed Database ─────────────────────────────────────────────
  async function seedDatabase() {
    try {
      // 1. developer_info
      await supabase.from("developer_info").upsert(
        {
          id: 1,
          name: defaultDevInfo.name,
          title: defaultDevInfo.title,
          tagline: defaultDevInfo.tagline,
          location: defaultDevInfo.location,
          email: defaultDevInfo.email,
          github: defaultDevInfo.github,
          linkedin: defaultDevInfo.linkedin,
          twitter: defaultDevInfo.twitter,
          current_status: defaultDevInfo.currentStatus,
          cv_url: "#",
          cv_filename: "",
          roles: ["Fresh Graduate Developer", "Web & Mobile Developer", "IoT & Embedded Enthusiast", "Open to Work"],
          stats: [
            { value: "3.84", label: "IPK Cum Laude" },
            { value: "D3", label: "Teknik Informatika" },
            { value: "Polines", label: "Semarang" },
            { value: "10+", label: "Proyek selesai" },
            { value: "3", label: "Sertifikasi" },
          ],
        },
        { onConflict: "id" }
      );

      // 2. projects
      for (const p of defaultProjects) {
        await supabase.from("projects").upsert(
          {
            id: p.id,
            title: p.title,
            description: p.description,
            long_description: p.longDescription,
            tags: p.tags,
            year: p.year,
            role: p.role,
            team: p.team,
            type: p.type,
            type_label: p.typeLabel,
            duration: p.duration,
            impact: p.impact,
            image_url: p.imageUrl,
            gallery: p.gallery,
            github_url: p.githubUrl || null,
            live_url: p.liveUrl || null,
            challenge: p.challenge,
            solution: p.solution,
            technical_decisions: p.technicalDecisions,
            outcome: p.outcome,
            learnings: p.learnings,
            featured: p.featured,
          },
          { onConflict: "id" }
        );
      }

      // 3. blog_posts
      for (const b of defaultBlogPosts) {
        await supabase.from("blog_posts").upsert(
          {
            id: b.id,
            title: b.title,
            excerpt: b.excerpt,
            date: b.date,
            read_time: b.readTime,
            tags: b.tags,
            image_url: b.imageUrl,
            content: b.content,
            related_ids: b.relatedIds,
            status: "published",
          },
          { onConflict: "id" }
        );
      }

      // 4. chatbot_kb
      for (const kb of defaultChatbotKb) {
        await supabase.from("chatbot_kb").insert({
          triggers: kb.trigger,
          response: kb.response,
          active: true,
        });
      }

      // 5. skills
      for (let i = 0; i < defaultSkills.length; i++) {
        await supabase.from("skills").insert({
          name: defaultSkills[i].name,
          value: defaultSkills[i].value,
          sort_order: i,
        });
      }

      // 6. tech_stack
      for (let i = 0; i < defaultTechStack.length; i++) {
        await supabase.from("tech_stack").insert({
          category: defaultTechStack[i].category,
          items: defaultTechStack[i].items,
          sort_order: i,
        });
      }

      // Reload
      const { data: devData } = await supabase.from("developer_info").select("*").eq("id", 1).maybeSingle();
      if (devData) setDeveloperInfo(mapDevInfo(devData as Record<string, unknown>));
      const { data: projData } = await supabase.from("projects").select("*");
      if (projData) setProjects(projData.map((r) => mapProject(r as Record<string, unknown>)));
      const { data: blogData } = await supabase.from("blog_posts").select("*");
      if (blogData) setBlogPosts(blogData.map((r) => mapBlogPost(r as Record<string, unknown>)));
      setDbSeeded(true);
    } catch (e) {
      console.error("[seedDatabase]", e);
      throw e;
    }
  }

  const value: DataContextValue = {
    projects,
    blogPosts,
    developerInfo,
    messages,
    kbItems,
    skills,
    techStack,
    loading,
    dbSeeded,
    addProject,
    updateProject,
    deleteProject,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    updateDeveloperInfo,
    sendMessage,
    updateMessageStatus,
    deleteMessage,
    refreshMessages,
    addKbItem,
    updateKbItem,
    deleteKbItem,
    seedDatabase,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within <DataProvider>");
  return ctx;
}
