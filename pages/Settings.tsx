import React, { useState } from 'react';
import { Save, Gift, Shield, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Settings: React.FC = () => {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // In a real app, these would be fetched from a 'settings' table
  const [settings, setSettings] = useState({
    loyaltyEnabled: true,
    maintenanceMode: false,
    storeName: 'Supermarket One',
    supportEmail: 'admin@supermarket.com'
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully');
    }, 1000);
  };

  if (!isAdmin) {
    return <div className="p-6 text-red-600">Access Restricted: Admins Only</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Loyalty Program Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-pink-100 rounded-lg mr-3">
              <Gift className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900">Loyalty Program</h3>
              <p className="text-sm text-slate-500">Manage customer rewards and points system.</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-4 border-t border-slate-100">
            <div>
              <p className="font-medium text-slate-900">Enable Loyalty Points</p>
              <p className="text-sm text-slate-500">Customers earn points on every purchase.</p>
            </div>
            <button 
              onClick={() => handleToggle('loyaltyEnabled')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.loyaltyEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.loyaltyEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900">General Information</h3>
              <p className="text-sm text-slate-500">Store details and system configurations.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-red-100 rounded-lg mr-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900">Danger Zone</h3>
              <p className="text-sm text-slate-500">Critical system controls.</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-red-100">
            <div>
              <p className="font-medium text-slate-900">Maintenance Mode</p>
              <p className="text-sm text-slate-500">Disable customer access temporarily.</p>
            </div>
            <button 
              onClick={() => handleToggle('maintenanceMode')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.maintenanceMode ? 'bg-red-600' : 'bg-slate-200'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};