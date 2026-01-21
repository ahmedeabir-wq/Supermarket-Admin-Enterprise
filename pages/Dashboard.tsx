import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';

// Mock data since we can't guarantee DB content immediately
const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; trend: string; positive?: boolean }> = ({ title, value, icon: Icon, trend, positive }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
      </div>
      <div className="p-3 bg-indigo-50 rounded-full">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
    </div>
    <div className={`mt-4 text-sm ${positive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
      <span className="font-medium">{trend}</span>
      <span className="text-slate-400 ml-2">vs last month</span>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$54,230" icon={DollarSign} trend="+12.5%" positive />
        <StatCard title="Total Orders" value="1,243" icon={ShoppingCart} trend="+4.3%" positive />
        <StatCard title="Active Customers" value="892" icon={Users} trend="+8.1%" positive />
        <StatCard title="Avg. Order Value" value="$43.60" icon={TrendingUp} trend="-2.4%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Weekly Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Sales Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
