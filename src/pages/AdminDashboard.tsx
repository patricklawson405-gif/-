import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { products as initialProducts, formatPrice } from '@/data/products';
import { Plus, Edit2, Trash2, Save, X, ArrowLeft, Search } from 'lucide-react';
import { toast } from 'sonner';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('𝕸𝖎𝖗𝖆𝖈𝖑𝖊 𝕾𝖎𝖌𝖓𝖆𝖙𝖚𝖗𝖊 𝕾𝖈𝖊𝖓𝖙𝖘✍-products');
    return saved ? JSON.parse(saved) : initialProducts;
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
    image: '/images/product_noir_dor.jpg',
    featured: false,
  });

  useEffect(() => {
    localStorage.setItem('𝕸𝖎𝖗𝖆𝖈𝖑𝖊 𝕾𝖎𝖌𝖓𝖆𝖙𝖚𝖗𝖊 𝕾𝖈𝖊𝖓𝖙𝖘✍-products', JSON.stringify(products));
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

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category as 'men' | 'women' | 'unisex',
      size: formData.size || '50ml',
      image: formData.image || '/images/product_noir_dor.jpg',
      featured: formData.featured || false,
    };

    setProducts([...products, newProduct]);
    setIsAdding(false);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'unisex',
      size: '50ml',
      image: '/images/product_noir_dor.jpg',
      featured: false,
    });
    toast.success('Product added successfully!');
  };

  const handleEdit = (product: Product) => {
    setIsEditing(product.id);
    setFormData(product);
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.description || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    setProducts(
      products.map((p) =>
        p.id === isEditing
          ? {
              ...p,
              name: formData.name!,
              description: formData.description!,
              price: formData.price!,
              category: formData.category as 'men' | 'women' | 'unisex',
              size: formData.size!,
              image: formData.image!,
              featured: formData.featured!,
            }
          : p
      )
    );
    setIsEditing(null);
    setFormData({});
    toast.success('Product updated successfully!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success('Product deleted successfully!');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({});
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="bg-dark-secondary border-b border-ivory/10 sticky top-0 z-10">
        <div className="px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 text-ivory/60 hover:text-ivory transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="font-display text-2xl text-ivory">
                Admin Dashboard
              </h1>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gold text-dark font-body text-sm tracking-wider uppercase hover:bg-gold-light transition-colors rounded-sm"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 lg:px-12 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ivory/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-dark-secondary border border-ivory/10 text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none transition-colors rounded-sm"
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {(isAdding || isEditing) && (
          <div className="mb-8 p-6 bg-dark-secondary border border-ivory/10 rounded-sm">
            <h2 className="font-display text-xl text-ivory mb-6">
              {isAdding ? 'Add New Product' : 'Edit Product'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-ivory/60 text-sm mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-tertiary border border-ivory/10 text-ivory focus:border-gold focus:outline-none transition-colors rounded-sm"
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="block text-ivory/60 text-sm mb-2">Price (₦) *</label>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  className="w-full px-4 py-3 bg-dark-tertiary border border-ivory/10 text-ivory focus:border-gold focus:outline-none transition-colors rounded-sm"
                  placeholder="Price in Naira"
                />
              </div>
              <div>
                <label className="block text-ivory/60 text-sm mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as 'men' | 'women' | 'unisex',
                    })
                  }
                  className="w-full px-4 py-3 bg-dark-tertiary border border-ivory/10 text-ivory focus:border-gold focus:outline-none transition-colors rounded-sm"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
              <div>
                <label className="block text-ivory/60 text-sm mb-2">Size</label>
                <input
                  type="text"
                  value={formData.size || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-tertiary border border-ivory/10 text-ivory focus:border-gold focus:outline-none transition-colors rounded-sm"
                  placeholder="e.g., 50ml"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-ivory/60 text-sm mb-2">Description *</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-dark-tertiary border border-ivory/10 text-ivory focus:border-gold focus:outline-none transition-colors resize-none rounded-sm"
                  placeholder="Product description"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-5 h-5 accent-gold"
                  />
                  <span className="text-ivory/70 text-sm">Featured product</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={isAdding ? handleAdd : handleUpdate}
                className="flex items-center gap-2 px-6 py-3 bg-gold text-dark font-body text-sm tracking-wider uppercase hover:bg-gold-light transition-colors rounded-sm"
              >
                <Save className="w-4 h-4" />
                {isAdding ? 'Add Product' : 'Update Product'}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-3 bg-ivory/10 text-ivory font-body text-sm tracking-wider uppercase hover:bg-ivory/20 transition-colors rounded-sm"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-dark-secondary border border-ivory/10 rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-tertiary">
              <tr>
                <th className="px-6 py-4 text-left text-ivory/60 text-xs tracking-wider uppercase">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-ivory/60 text-xs tracking-wider uppercase">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-ivory/60 text-xs tracking-wider uppercase">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-ivory/60 text-xs tracking-wider uppercase">
                  Featured
                </th>
                <th className="px-6 py-4 text-right text-ivory/60 text-xs tracking-wider uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/5">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-dark-tertiary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-sm"
                      />
                      <div>
                        <p className="text-ivory font-medium">{product.name}</p>
                        <p className="text-ivory/50 text-sm">{product.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize text-ivory/70">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gold">{formatPrice(product.price)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {product.featured ? (
                      <span className="px-2 py-1 bg-gold/20 text-gold text-xs rounded-sm">
                        Yes
                      </span>
                    ) : (
                      <span className="text-ivory/40 text-sm">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-ivory/60 hover:text-gold transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-ivory/60 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-ivory/40">No products found</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <div className="p-6 bg-dark-secondary border border-ivory/10 rounded-sm">
            <p className="text-ivory/60 text-sm mb-2">Total Products</p>
            <p className="font-display text-3xl text-ivory">{products.length}</p>
          </div>
          <div className="p-6 bg-dark-secondary border border-ivory/10 rounded-sm">
            <p className="text-ivory/60 text-sm mb-2">Featured Products</p>
            <p className="font-display text-3xl text-gold">
              {products.filter((p) => p.featured).length}
            </p>
          </div>
          <div className="p-6 bg-dark-secondary border border-ivory/10 rounded-sm">
            <p className="text-ivory/60 text-sm mb-2">Categories</p>
            <p className="font-display text-3xl text-ivory">3</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
