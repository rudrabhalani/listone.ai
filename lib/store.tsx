"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Project {
  id: string;
  name: string;
  brandName: string;
  marketplace: string;
  category: string;
  createdAt: string;
  skusCount: number;
}

export interface LayerObject {
  id: string;
  type: "text" | "product" | "badge" | "shape" | "background";
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  fill?: string;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  imageUrl?: string;
  locked?: boolean;
  visible?: boolean;
  opacity?: number;
}

export interface GeneratedImageItem {
  id: string;
  shotIndex: number;
  shotType: string;
  title: string;
  description: string;
  previewUrl: string;
  status: "ready" | "generating" | "failed";
  layers: LayerObject[];
}

export interface ProductItem {
  id: string;
  title: string;
  asin?: string;
  category: string;
  marketplace: string;
  features: string[];
  rawImageUrl?: string;
  cutoutImageUrl?: string;
  generatedImages: GeneratedImageItem[];
}

interface AppContextType {
  credits: number;
  isOwnerMode: boolean;
  setIsOwnerMode: (active: boolean) => void;
  deductCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
  projects: Project[];
  activeProject: Project | null;
  setActiveProject: (project: Project) => void;
  createProject: (name: string, brandName: string, marketplace: string) => Project;
  products: ProductItem[];
  activeProduct: ProductItem | null;
  setActiveProduct: (product: ProductItem) => void;
  saveProduct: (product: ProductItem) => void;
  selectedShotForEditor: GeneratedImageItem | null;
  setSelectedShotForEditor: (shot: GeneratedImageItem | null) => void;
  updateShotLayers: (shotId: string, layers: LayerObject[]) => void;
}

const defaultProjects: Project[] = [
  {
    id: "proj-1",
    name: "CloudPace Pro Cushion Running Sneakers",
    brandName: "CloudPace Athletics",
    marketplace: "Amazon US (2000x2000)",
    category: "Footwear & Shoes",
    createdAt: "2026-10-09",
    skusCount: 1,
  },
  {
    id: "proj-2",
    name: "Apex Chronograph Sapphire Automatic Watch",
    brandName: "Apex Horology",
    marketplace: "Amazon US",
    category: "Watches & Luxury",
    createdAt: "2026-10-08",
    skusCount: 1,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Owner mode is active by default for Rudra Bhalani: unlimited free access!
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(true);
  const [credits, setCredits] = useState<number>(99999);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [activeProject, setActiveProject] = useState<Project | null>(defaultProjects[0]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [selectedShotForEditor, setSelectedShotForEditor] = useState<GeneratedImageItem | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedOwner = localStorage.getItem("listone_owner_mode");
      if (savedOwner !== null) {
        setIsOwnerMode(savedOwner === "true");
      }

      const savedCredits = localStorage.getItem("listone_credits");
      if (savedCredits && savedOwner !== "true") {
        setCredits(parseInt(savedCredits, 10));
      }

      const savedProjects = localStorage.getItem("listone_projects");
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        setProjects(parsed);
        if (parsed.length > 0) setActiveProject(parsed[0]);
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleSetOwnerMode = (active: boolean) => {
    setIsOwnerMode(active);
    try {
      localStorage.setItem("listone_owner_mode", active ? "true" : "false");
    } catch {}
    if (active) {
      setCredits(99999);
    }
  };

  // For owner perspective, it is totally free of use!
  const deductCredits = (amount: number) => {
    if (isOwnerMode) {
      return true; // Zero deduction for owner, unlimited free use!
    }
    if (credits >= amount) {
      const updated = credits - amount;
      setCredits(updated);
      try {
        localStorage.setItem("listone_credits", updated.toString());
      } catch {}
      return true;
    }
    return false;
  };

  const addCredits = (amount: number) => {
    const updated = credits + amount;
    setCredits(updated);
    try {
      localStorage.setItem("listone_credits", updated.toString());
    } catch {}
  };

  const createProject = (name: string, brandName: string, marketplace: string) => {
    const newProj: Project = {
      id: "proj-" + Date.now(),
      name,
      brandName,
      marketplace,
      category: "General",
      createdAt: new Date().toISOString().split("T")[0],
      skusCount: 1,
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    setActiveProject(newProj);
    try {
      localStorage.setItem("listone_projects", JSON.stringify(updated));
    } catch {}
    return newProj;
  };

  const saveProduct = (product: ProductItem) => {
    setProducts((prev) => {
      const existing = prev.findIndex((p) => p.id === product.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = product;
        return updated;
      }
      return [product, ...prev];
    });
    setActiveProduct(product);
  };

  const updateShotLayers = (shotId: string, layers: LayerObject[]) => {
    if (!activeProduct) return;
    const updatedImages = activeProduct.generatedImages.map((img) =>
      img.id === shotId ? { ...img, layers } : img
    );
    const updatedProduct = { ...activeProduct, generatedImages: updatedImages };
    saveProduct(updatedProduct);
    if (selectedShotForEditor && selectedShotForEditor.id === shotId) {
      setSelectedShotForEditor({ ...selectedShotForEditor, layers });
    }
  };

  return (
    <AppContext.Provider
      value={{
        credits,
        isOwnerMode,
        setIsOwnerMode: handleSetOwnerMode,
        deductCredits,
        addCredits,
        projects,
        activeProject,
        setActiveProject,
        createProject,
        products,
        activeProduct,
        setActiveProduct,
        saveProduct,
        selectedShotForEditor,
        setSelectedShotForEditor,
        updateShotLayers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
