import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home as HomeIcon, LayoutDashboard, BarChart2, FileText, Menu, X, TrendingUp, BookOpen } from 'lucide-react';

const queryClient = new QueryClient();

// --- Placeholder Content Components ---

const Card = ({ title, value, icon: Icon, color }) => (
  <div className={`p-6 bg-gray-800 rounded-xl shadow-2xl border-l-4 ${color} transition-transform duration-300 hover:scale-[1.02]`}>
    <div className="flex justify-between items-start">
      <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
      <div className="text-right">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
      </div>
    </div>
  </div>
);

const HomeContent = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-extrabold text-white">Application Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card title="Projects Active" value="14" icon={LayoutDashboard} color="border-orange-500" />
      <Card title="Total Users" value="2,450" icon={TrendingUp} color="border-cyan-500" />
      <Card title="Pending Tasks" value="7" icon={FileText} color="border-red-500" />
      <Card title="New Signups" value="+12" icon={BookOpen} color="border-green-500" />
    </div>
    <div className="p-8 bg-gray-800 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-semibold mb-4 text-orange-400">Quick Actions</h3>
      <div className="flex flex-wrap gap-4">
        <button className="px-6 py-2 bg-orange-600 rounded-lg font-medium hover:bg-orange-700 transition-colors">Generate Report</button>
        <button className="px-6 py-2 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-colors">View Analytics</button>
      </div>
    </div>
  </div>
);

const DashboardContent = () => (
  <div className="p-6 bg-gray-800 rounded-xl shadow-2xl">
    <h2 className="text-3xl font-extrabold text-white">Project Dashboard</h2>
    <p className="text-gray-300 mt-4">Detailed summary of project performance and key metrics.</p>
  </div>
);

const AnalyticsContent = () => (
  <div className="p-6 bg-gray-800 rounded-xl shadow-2xl">
    <h2 className="text-3xl font-extrabold text-white">Advanced Analytics</h2>
    <p className="text-gray-300 mt-4">Interactive charts and deep-dive analysis tools.</p>
  </div>
);

const ReportsContent = () => (
  <div className="p-6 bg-gray-800 rounded-xl shadow-2xl">
    <h2 className="text-3xl font-extrabold text-white">Report Viewer</h2>
    <p className="text-gray-300 mt-4">Access generated PDF reports and summaries.</p>
  </div>
);

// --- Layout and Navigation Components ---

// Navigation items for the sidebar
const navItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'Reports', path: '/report/123', icon: FileText },
];

// Reusable Navigation Link Component
const NavItem = ({ item }) => {
  const Icon = item.icon;
  // NavLink is now correctly nested under BrowserRouter in the App component.
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center p-3 text-sm font-medium rounded-lg transition-colors duration-200 group 
         ${item.disabled ? 'text-gray-500 cursor-not-allowed' :
          isActive
            ? 'bg-orange-600 text-white shadow-lg'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`
      }
      title={item.name}
      end
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="truncate">{item.name}</span>
    </NavLink>
  );
};

// Layout Component - Wraps content with sidebar and main area structure
const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white font-inter">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle navigation menu"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out 
          w-64 bg-gray-800 flex flex-col p-4 shadow-xl z-40`}
      >
        {/* Logo/Title */}
        <div className="flex items-center mb-10 mt-2">
          <BarChart2 className="w-8 h-8 text-orange-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-100">ProAnalysis</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2" onClick={() => setIsSidebarOpen(false)}>
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
        
        {/* Footer/User Info Placeholder */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400">© 2025 ProAnalysis</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 transition-all duration-300 ease-in-out md:ml-64">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- Main Application Component ---
// This component wraps everything in BrowserRouter and QueryClientProvider
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/analytics" element={<AnalyticsContent />} />
            {/* The report path uses a dynamic parameter */}
            <Route path="/report/:id" element={<ReportsContent />} /> 
            {/* Fallback route */}
            <Route path="*" element={<HomeContent />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
