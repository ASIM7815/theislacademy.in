"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const dynamic = 'force-dynamic';

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  message: string | null;
  source: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "popup" | "landing_page">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = "ISLACADEMY7815@islec#";
    
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
      
      // Set up real-time subscription
      const channel = supabase
        .channel('registrations-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'registrations' },
          (payload) => {
            console.log('Real-time update received:', payload);
            fetchRegistrations();
          }
        )
        .subscribe((status) => {
          console.log('Subscription status:', status);
        });

      return () => {
        console.log('Cleaning up subscription');
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthenticated]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching registrations from Supabase...');
      
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched registrations:', data?.length || 0);
      setRegistrations(data || []);
    } catch (err: any) {
      console.error("Error fetching registrations:", err);
      setError(err.message || "Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesFilter = filter === "all" || reg.source === filter;
    const matchesSearch =
      searchTerm === "" ||
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Education", "Message", "Source", "Date"];
    const csvData = filteredRegistrations.map((reg) => [
      reg.name,
      reg.email,
      reg.phone,
      reg.education,
      reg.message || "",
      reg.source,
      formatDate(reg.created_at),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Analytics Data Processing
  const getRegistrationsByDay = () => {
    const dayCount: { [key: string]: number } = {};
    registrations.forEach((reg) => {
      const date = new Date(reg.created_at).toLocaleDateString();
      dayCount[date] = (dayCount[date] || 0) + 1;
    });
    const sorted = Object.entries(dayCount).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
    return sorted.slice(-7); // Last 7 days
  };

  const getSourceDistribution = () => {
    const popup = registrations.filter(r => r.source === "popup").length;
    const landing = registrations.filter(r => r.source === "landing_page").length;
    const total = registrations.length || 1;
    return {
      popup: { count: popup, percent: Math.round((popup / total) * 100) },
      landing: { count: landing, percent: Math.round((landing / total) * 100) }
    };
  };

  const getEducationDistribution = () => {
    const eduCount: { [key: string]: number } = {};
    registrations.forEach((reg) => {
      eduCount[reg.education] = (eduCount[reg.education] || 0) + 1;
    });
    const total = registrations.length || 1;
    return Object.entries(eduCount).map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / total) * 100)
    }));
  };

  const dailyData = getRegistrationsByDay();
  const sourceData = getSourceDistribution();
  const educationData = getEducationDistribution();

  // Chart.js Data Configurations
  const dailyChartData = {
    labels: dailyData.map(([date]) => date),
    datasets: [
      {
        label: 'Registrations',
        data: dailyData.map(([, count]) => count),
        backgroundColor: 'rgba(255, 107, 107, 0.8)',
        borderColor: 'rgba(255, 107, 107, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const dailyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: { size: 12 },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          font: { size: 11 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const sourceChartData = {
    labels: ['Popup Form', 'Landing Page'],
    datasets: [
      {
        data: [sourceData.popup.count, sourceData.landing.count],
        backgroundColor: [
          'rgba(139, 92, 246, 0.9)',
          'rgba(34, 197, 94, 0.9)',
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const sourceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: { size: 13, weight: 'bold' as const },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
  };

  const educationChartData = {
    labels: educationData.map(edu => edu.name.charAt(0).toUpperCase() + edu.name.slice(1)),
    datasets: [
      {
        data: educationData.map(edu => edu.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.9)',
          'rgba(139, 92, 246, 0.9)',
          'rgba(236, 72, 153, 0.9)',
          'rgba(251, 146, 60, 0.9)',
          'rgba(20, 184, 166, 0.9)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(20, 184, 166, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const educationChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 12,
          font: { size: 12, weight: 'bold' as const },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
  };

  // Trend Line Chart Data (Last 30 days)
  const getLast30DaysData = () => {
    const dayCount: { [key: string]: number } = {};
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toLocaleDateString();
    });
    
    last30Days.forEach(date => {
      dayCount[date] = 0;
    });
    
    registrations.forEach((reg) => {
      const date = new Date(reg.created_at).toLocaleDateString();
      if (dayCount[date] !== undefined) {
        dayCount[date]++;
      }
    });
    
    return last30Days.map(date => dayCount[date]);
  };

  const trendChartData = {
    labels: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Daily Registrations',
        data: getLast30DaysData(),
        fill: true,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderColor: 'rgba(255, 107, 107, 1)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: 'rgba(255, 107, 107, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: { size: 11 },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          font: { size: 10 },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  // Password Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-mid flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <Image
              src="/LOGO-2.png"
              alt="ISL Academy"
              width={200}
              height={100}
              quality={100}
              className="object-contain h-20 w-auto mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-text-dark mb-2">
              Admin Dashboard
            </h1>
            <p className="text-text-medium">Enter password to access</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-dark mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-beige border border-gray-200 text-text-dark focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                required
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-coral hover:bg-coral-dark text-white py-3.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-coral/30"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-text-medium">
            <p>Protected Admin Area</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral mx-auto mb-4"></div>
          <p className="text-text-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 max-w-md">
          <h2 className="font-bold text-lg mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={fetchRegistrations}
            className="mt-4 bg-coral text-white px-4 py-2 rounded-lg hover:bg-coral-dark transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Fixed Header at Top */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-navy via-navy-light to-navy-mid shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/LOGO-2.png"
                alt="ISL Academy"
                width={180}
                height={90}
                quality={100}
                className="object-contain h-16 w-auto"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Analytics Dashboard
                </h1>
                <p className="text-white/80 text-sm mt-1">
                  Total Registrations: {registrations.length}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="bg-coral hover:bg-coral-dark text-white px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Total Registrations</p>
                <p className="text-4xl font-bold">{registrations.length}</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">From Popup</p>
                <p className="text-4xl font-bold">{registrations.filter(r => r.source === "popup").length}</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">From Landing Page</p>
                <p className="text-4xl font-bold">{registrations.filter(r => r.source === "landing_page").length}</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 30-Day Trend Line Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-text-dark mb-4">Registration Trend (Last 30 Days)</h3>
            <div className="h-64">
              <Line data={trendChartData} options={trendChartOptions} />
            </div>
          </div>

          {/* Daily Registrations Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-text-dark mb-4">Last 7 Days</h3>
            <div className="h-64">
              <Bar data={dailyChartData} options={dailyChartOptions} />
            </div>
          </div>

          {/* Source Distribution Doughnut Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-text-dark mb-4">Registration Source</h3>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={sourceChartData} options={sourceChartOptions} />
            </div>
          </div>

          {/* Education Distribution Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-text-dark mb-4">Education Level Distribution</h3>
            <div className="h-80 flex items-center justify-center">
              <Doughnut data={educationChartData} options={educationChartOptions} />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-text-dark focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                filter === "all"
                  ? "bg-coral text-white shadow-lg shadow-coral/30"
                  : "bg-white text-text-dark hover:bg-gray-50 border border-gray-200"
              }`}
            >
              All ({registrations.length})
            </button>
            <button
              onClick={() => setFilter("popup")}
              className={`px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                filter === "popup"
                  ? "bg-coral text-white shadow-lg shadow-coral/30"
                  : "bg-white text-text-dark hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Popup ({registrations.filter((r) => r.source === "popup").length})
            </button>
            <button
              onClick={() => setFilter("landing_page")}
              className={`px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                filter === "landing_page"
                  ? "bg-coral text-white shadow-lg shadow-coral/30"
                  : "bg-white text-text-dark hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Landing ({registrations.filter((r) => r.source === "landing_page").length})
            </button>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-dark uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-dark uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-dark uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-dark uppercase tracking-wider">Education</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-dark uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-dark uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-medium">
                      {searchTerm ? "No registrations match your search" : "No registrations found"}
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-text-dark">{reg.name}</div>
                        {reg.message && (
                          <div className="text-xs text-text-medium mt-1 max-w-xs">
                            <span className="font-semibold">Message:</span> {reg.message}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-medium">
                        <a href={`mailto:${reg.email}`} className="hover:text-coral transition-colors flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {reg.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-medium">
                        <a href={`tel:${reg.phone}`} className="hover:text-coral transition-colors flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {reg.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-beige text-text-dark capitalize">
                          {reg.education}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          reg.source === "popup" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                        }`}>
                          {reg.source === "popup" ? "Popup" : "Landing Page"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-medium">
                        {formatDate(reg.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            onClick={fetchRegistrations}
            className="bg-coral hover:bg-coral-dark text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-coral/30 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
