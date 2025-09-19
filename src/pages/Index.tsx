import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import CaseStudy from "@/components/CaseStudy";

const Index = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "case">("dashboard");

  if (currentView === "case") {
    return <CaseStudy onBack={() => setCurrentView("dashboard")} />;
  }

  return <Dashboard />;
};

export default Index;
