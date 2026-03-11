import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import GuidanceHub from "./pages/GuidanceHub";
import GrowthCharts from "./pages/GrowthCharts";
import Milestones from "./pages/Milestones";
import Journal from "./pages/Journal";
import Family from "./pages/Family";
import Settings from "./pages/Settings";
import Vaccinations from "./pages/Vaccinations";
import GrowthReport from "./pages/GrowthReport";
import CommunityTips from "./pages/CommunityTips";
import ParentingHub from "./pages/ParentingHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background transition-colors duration-300">
            <Navigation />
            <main className="md:ml-20 lg:ml-56 pb-20 md:pb-6 pt-4 px-4 md:px-8 max-w-4xl">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/guidance" element={<GuidanceHub />} />
                <Route path="/growth" element={<GrowthCharts />} />
                <Route path="/milestones" element={<Milestones />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/family" element={<Family />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/vaccinations" element={<Vaccinations />} />
                <Route path="/report" element={<GrowthReport />} />
                <Route path="/community" element={<CommunityTips />} />
                <Route path="/parenting" element={<ParentingHub />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
