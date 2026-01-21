import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Product } from '../types';
import { Plus, Edit, Trash2, Search, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Products: React.FC = () => {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', sku: '', price: 0, cost_price: 0, stock_quantity: 0, category: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').order('name');
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchProducts();
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const { error } = await supabase.from('products').update(formData).eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([formData]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({ name: '', sku: '', price: 0, cost_price: 0, stock_quantity: 0, category: '' });
      fetchProducts();
    } catch (error) {
      alert('Error saving product');
    }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingProduct(null);
    setFormData({ name: '', sku: '', price: 0, cost_price: 0, stock_quantity: 0, category: 'General' });
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Product Management</h1>
        {isAdmin && (
          <button 
            onClick={openNew}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                {isAdmin && <th className="px-6 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium text-slate-900">{product.name}</td>
                    <td className="px-6 py-3 text-slate-500">{product.sku}</td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-slate-900">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        product.stock_quantity < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock_quantity} units
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-3 text-right space-x-2">
                        <button onClick={() => openEdit(product)} className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-lg font-bold mb-4">{editingProduct ? 'Edit Product' : 'New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input 
                  type="text" required
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">SKU</label>
                  <input 
                    type="text" required
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
                    value={formData.sku}
                    onChange={e => setFormData({...formData, sku: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Category</label>
                  <input 
                    type="text" required
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Price</label>
                  <input 
                    type="number" step="0.01" required
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Cost</label>
                  <input 
                    type="number" step="0.01" required
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
                    value={formData.cost_price}
                    onChange={e => setFormData({...formData, cost_price: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Stock</label>
                  <input 
                    type="number" required
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
                    value={formData.stock_quantity}
                    onChange={e => setFormData({...formData, stock_quantity: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
