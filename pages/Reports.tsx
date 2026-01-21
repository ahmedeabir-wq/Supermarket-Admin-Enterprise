import React from 'react';
import { Download, Printer, TrendingUp, DollarSign, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockFinancials = [
  { category: 'Groceries', value: 45000 },
  { category: 'Electronics', value: 15000 },
  { category: 'Clothing', value: 8000 },
  { category: 'Home', value: 6000 },
];

const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b'];

export const Reports: React.FC = () => {

  const handleExportCSV = () => {
    // Demo data for CSV
    const csvData = [
      { date: '2023-10-01', revenue: 1200, cost: 800, profit: 400 },
      { date: '2023-10-02', revenue: 1500, cost: 900, profit: 600 },
      { date: '2023-10-03', revenue: 1100, cost: 700, profit: 400 },
    ];
    
    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map((obj: any) => Object.values(obj).join(',')).join('\n');
    const blob = new Blob([headers + '\n' + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial_report.csv';
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center no-print">
        <h1 className="text-2xl font-bold text-slate-900">Finance & Reports</h1>
        <div className="flex space-x-3">
          <button 
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print-grid">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium">Net Profit (This Month)</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">$24,500.00</p>
          <div className="flex items-center mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+15.2% from last month</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium">Total Expenses</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">$12,300.00</p>
          <div className="flex items-center mt-2 text-red-600 text-sm">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>+2.1% from last month</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium">Refunds Processed</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">$450.00</p>
          <div className="flex items-center mt-2 text-slate-400 text-sm">
            <CreditCard className="w-4 h-4 mr-1" />
            <span>12 transactions</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print-break-inside">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockFinancials}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockFinancials.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {mockFinancials.map((item, index) => (
              <div key={item.category} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-sm text-slate-600">{item.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Monthly Profit vs Cost</h3>
          <div className="h-80">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Jan', profit: 4000, cost: 2400 },
                  { name: 'Feb', profit: 3000, cost: 1398 },
                  { name: 'Mar', profit: 2000, cost: 9800 },
                  { name: 'Apr', profit: 2780, cost: 3908 },
                  { name: 'May', profit: 1890, cost: 4800 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#4f46e5" name="Profit" />
                <Bar dataKey="cost" fill="#e2e8f0" name="Cost" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
