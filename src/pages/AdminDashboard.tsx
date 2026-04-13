import { useState, useEffect } from 'react';
import { Product } from '../../types';
import { products as initialProducts, formatPrice } from '@/data/products';
import { Plus, Edit2, Trash2, Save, X, ArrowLeft, Search, Upload } from 'lucide-react';
import { toast } from 'sonner';

// ✅ FIX 1: Using the EXACT key found in your console
const STORAGE_KEY = 'Miracle Signature Scents-products';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  // Load from correct storage key
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'unisex',
    size: '50ml',
    image: '', // Default to empty
    featured: false,
  });

  // ✅ FIX 2: Function to handle Image Upload (Converts file to Base64 string)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (Limit to ~500KB for LocalStorage performance)
    if (file.size > 500000) {
      toast.error('Image too large! Please use an image under 500KB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  // Save to storage whenever products change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (!formData.name || !formData.description || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const addProduct = (newProduct) => {
  const existing = JSON.parse(localStorage.getItem("products") || "[]");
  const updated = [...existing, newProduct];

  localStorage.setItem("products", JSON.stringify(updated));
};

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name!,
      description: formData.description!,
      price: formData.price!,
      category: (formData.category as 'men' | 'women' | 'unisex') || 'unisex',
      size: formData.size || '50ml',
      image: formData.image || '/images/placeholder.jpg', // Fallback if no image
      featured: formData.featured || false,
    };

    setProducts([...products, newProduct]);
    setIsAdding(false);
    setFormData({ name: '', description: '', price: 0, category: 'unisex', size: '50ml', image: '', featured: false });
    toast.success('Product added!');
  };

  const handleEdit = (product: Product) => {
    setIsEditing(product.id);
    setFormData(product);
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.price) {
      toast.error('Name and Price are required');
      return;
    }

    setProducts(
      products.map((p) =>
        p.id === isEditing
          ? { ...p, ...formData } as Product
          : p
      )
    );
    setIsEditing(null);
    toast.success('Product updated!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success('Deleted');
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="bg-dark-secondary border-b border-ivory/10 sticky top-0 z-10">
        <div className="px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-ivory hover:text-gold transition">
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <h1 className="font-display text-xl text-ivory">Admin Dashboard</h1>
            <button
              onClick={() => { setIsAdding(true); setFormData({}); }}
              className="flex items-center gap-2 px-4 py-2 bg-gold text-dark font-bold text-sm rounded"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-12 py-8">
        {/* Form */}
        {(isAdding || isEditing) && (
          <div className="mb-8 p-6 bg-dark-secondary border border-gold/20 rounded-lg animate-in fade-in">
            <h2 className="font-display text-2xl text-ivory mb-6">{isAdding ? 'Add New Product' : 'Edit Product'}</h2>
            
            {/* ✅ FIX 3: Image Upload Section Added Here */}
            <div className="mb-6 flex flex-col items-center justify-center border-2 border-dashed border-ivory/20 rounded-lg p-6 bg-dark-tertiary/50">
              {formData.image && formData.image !== '' ? (
                <div className="relative">
                  <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow-lg" />
                  <button onClick={() => setFormData({...formData, image: ''})} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"><X size={14}/></button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-2 text-ivory/60 hover:text-gold transition">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm">Click to upload image (Max 500KB)</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Product Name" className="w-full p-3 bg-dark-tertiary text-ivory border border-ivory/10 rounded" />
              <input type="number" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} placeholder="Price" className="w-full p-3 bg-dark-tertiary text-ivory border border-ivory/10 rounded" />
              <input value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Description" className="md:col-span-2 w-full p-3 bg-dark-tertiary text-ivory border border-ivory/10 rounded" />
              
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full p-3 bg-dark-tertiary text-ivory border border-ivory/10 rounded">
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
              <input value={formData.size || ''} onChange={e => setFormData({...formData, size: e.target.value})} placeholder="Size (e.g., 100ml)" className="w-full p-3 bg-dark-tertiary text-ivory border border-ivory/10 rounded" />
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={isAdding ? handleAdd : handleUpdate} className="flex-1 py-3 bg-gold text-dark font-bold rounded hover:bg-gold-light transition">Save</button>
              <button onClick={() => { setIsAdding(false); setIsEditing(null); }} className="flex-1 py-3 bg-ivory/10 text-ivory rounded hover:bg-ivory/20 transition">Cancel</button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-ivory/10">
          <table className="w-full text-left">
            <thead className="bg-dark-secondary text-ivory/60 text-xs uppercase">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/10 bg-dark-secondary/50">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-ivory/5">
                  <td className="p-4 flex items-center gap-3">
                    <img src={p.image || '/images/placeholder.jpg'} className="w-10 h-10 object-cover rounded" />
                    <span className="text-ivory font-medium">{p.name}</span>
                  </td>
                  <td className="p-4 text-gold">{formatPrice(p.price)}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded"><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
