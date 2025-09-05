import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmailAIResponses from "./pages/EmailAIResponses";
import Customization from "./pages/Customization";
import Integrations from "./pages/Integrations";
import Plans from "./pages/Plans";
import UserManagement from "./pages/UserManagement";
import KnowledgeBase from "./pages/KnowledgeBase";
import FirstTimeSetup from "./pages/FirstTimeSetup";
import ForgotPassword from "./pages/ForgotPassword";
import { Layout } from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/first-time-setup" element={<FirstTimeSetup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/email-ai-responses" element={<EmailAIResponses />} />
            <Route path="/customization" element={<Customization />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
