import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Product } from '../types';
import { AlertTriangle, CheckCircle, Package } from 'lucide-react';

export const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await supabase.from('products').select('*').order('stock_quantity', { ascending: true });
        setProducts(data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const getStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
    if (stock < 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800', icon: CheckCircle };
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Inventory & Warehouse</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-slate-900">
                {products.filter(p => p.stock_quantity > 0 && p.stock_quantity < 10).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-full">
              <Package className="h-6 w-6 text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Out of Stock</p>
              <p className="text-2xl font-bold text-slate-900">
                {products.filter(p => p.stock_quantity === 0).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Package className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Total Products</p>
              <p className="text-2xl font-bold text-slate-900">{products.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {products.map((product) => {
              const status = getStatus(product.stock_quantity);
              const StatusIcon = status.icon;
              return (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[100px]">
                      <div 
                        className={`h-2.5 rounded-full ${product.stock_quantity < 10 ? 'bg-red-500' : 'bg-green-500'}`} 
                        style={{ width: `${Math.min(product.stock_quantity, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs mt-1 block">{product.stock_quantity} units</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    ${(product.stock_quantity * product.price).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
