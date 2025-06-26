import React, { useState, useRef } from 'react';
import { Package, DollarSign, Tag, ImageIcon, FileText, ToggleLeft, ToggleRight, Sparkles, Weight, Upload, X, Hash, Flower2 } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { useAuth } from '../contexts/AuthContext';
import { CategoryConfig } from '../types';

const ProductListing: React.FC = () => {
  const { addProduct } = useProducts();
  const { currentVendor } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sellerPrice: '',
    mrp: '',
    category: '',
    weight: '',
    quantity: '',
    imageUrl: '',
    inStock: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Hindu religious items categories with specific configurations
  const hinduReligiousCategories = [
    'Puja Items & Accessories',
    'Idols & Murtis', 
    'Incense & Dhoop',
    'Sacred Books & Scriptures',
    'Rudraksha & Malas',
    'Yantras & Sacred Geometry',
    'Temple Decorations',
    'Spiritual Jewelry',
    'Ayurvedic Products',
    'Festival Items'
  ];

  const categoryConfigs: CategoryConfig[] = [
    // Puja Items & Accessories
    { 
      category: 'Puja Items & Accessories', 
      hasWeight: true, 
      hasQuantity: true,
      weightUnit: 'g', 
      quantityUnit: 'pieces',
      weightPlaceholder: '100', 
      quantityPlaceholder: '1',
      weightMin: 5, 
      weightMax: 2000, 
      quantityMin: 1, 
      quantityMax: 50,
      weightStep: 5, 
      quantityStep: 1 
    },
    // Idols & Murtis
    { 
      category: 'Idols & Murtis', 
      hasWeight: true, 
      hasQuantity: true,
      weightUnit: 'g', 
      quantityUnit: 'pieces',
      weightPlaceholder: '500', 
      quantityPlaceholder: '1',
      weightMin: 50, 
      weightMax: 10000, 
      quantityMin: 1, 
      quantityMax: 10,
      weightStep: 10, 
      quantityStep: 1 
    },
    // Incense & Dhoop
    { 
      category: 'Incense & Dhoop', 
      hasWeight: true, 
      hasQuantity: true,
      weightUnit: 'g', 
      quantityUnit: 'sticks',
      weightPlaceholder: '50', 
      quantityPlaceholder: '20',
      weightMin: 10, 
      weightMax: 1000, 
      quantityMin: 1, 
      quantityMax: 500,
      weightStep: 5, 
      quantityStep: 1 
    },
    // Sacred Books & Scriptures
    { 
      category: 'Sacred Books & Scriptures', 
      hasWeight: true, 
      hasQuantity: true,
      weightUnit: 'g', 
      quantityUnit: 'books',
      weightPlaceholder: '300', 
      quantityPlaceholder: '1',
      weightMin: 50, 
      weightMax: 2000, 
      quantityMin: 1, 
      quantityMax: 20,
      weightStep: 10, 
      quantityStep: 1 
    },
    // Rudraksha & Malas
    { 
      category: 'Rudraksha & Malas', 
      hasWeight: true, 
      hasQuantity: true,
      weightUnit: 'g', 
      quantityUnit: 'beads',
      weightPlaceholder: '25', 
      quantityPlaceholder: '108',
      weightMin: 5, 
      weightMax: 500, 
      quantityMin: 1, 
      quantityMax: 1008,
      weightStep: 1, 
      quantityStep: 1 
    },
    // Yantras & Sacred Geometry
    { 
      category: 'Yantras & Sacred Geometry', 
      hasWeight: true, 
      hasQuantity: true,
      weightUnit: 'g', 
      quantityUnit: 'pieces',
      weightPlaceholder: '200', 
      quantityPlaceholder: '1',
      weightMin: 20, 
      weightMax: 5000, 
      quantityMin: 1, 
      quantityMax: 25,
      weightStep: 5, 
      quantityStep: 1 
    },
    // Temple Decorations
    { 
      category: 'Temple Decorations', 
      hasWeight: true, 
      hasQuantity: true,
      weightUnit: 'g', 
      quantityUnit: 'pieces',
      weightPlaceholder: '150', 
      quantityPlaceholder: '1',
      weightMin: 10, 
      weightMax: 3000, 
      quantityMin: 1, 
      quantityMax: 100,
      weightStep: 5, 
      quantityStep: 1 
    },
    // Spiritual Jewelry
    { 
      category: 'Spiritual Jewelry', 
      hasWeight: true, 
      hasQuantity: true,
      weightUnit: 'g', 
      quantityUnit: 'pieces',
      weightPlaceholder: '15', 
      quantityPlaceholder: '1',
      weightMin: 1, 
      weightMax: 200, 
      quantityMin: 1, 
      quantityMax: 50,
      weightStep: 1, 
      quantityStep: 1 
    },
    // Ayurvedic Products
    { 
      category: 'Ayurvedic Products', 
      hasWeight: true, 
      hasQuantity: true,
      weightUnit: 'g', 
      quantityUnit: 'bottles',
      weightPlaceholder: '100', 
      quantityPlaceholder: '1',
      weightMin: 10, 
      weightMax: 1000, 
      quantityMin: 1, 
      quantityMax: 50,
      weightStep: 5, 
      quantityStep: 1 
    },
    // Festival Items
    { 
      category: 'Festival Items', 
      hasWeight: true, 
      hasQuantity: true,
      weightUnit: 'g', 
      quantityUnit: 'pieces',
      weightPlaceholder: '200', 
      quantityPlaceholder: '1',
      weightMin: 20, 
      weightMax: 5000, 
      quantityMin: 1, 
      quantityMax: 100,
      weightStep: 10, 
      quantityStep: 1 
    }
  ];

  const getCategoryConfig = (category: string): CategoryConfig => {
    return categoryConfigs.find(config => config.category === category) || categoryConfigs[categoryConfigs.length - 1];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, imageUrl: 'Please select a valid image file' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, imageUrl: 'Image size must be less than 5MB' }));
        return;
      }

      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear any existing errors
      if (errors.imageUrl) {
        setErrors(prev => ({ ...prev, imageUrl: '' }));
      }
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const categoryConfig = getCategoryConfig(formData.category);

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    if (!formData.sellerPrice) {
      newErrors.sellerPrice = 'Seller price is required';
    } else if (isNaN(Number(formData.sellerPrice)) || Number(formData.sellerPrice) <= 0) {
      newErrors.sellerPrice = 'Seller price must be a positive number';
    }
    
    if (!formData.mrp) {
      newErrors.mrp = 'MRP is required';
    } else if (isNaN(Number(formData.mrp)) || Number(formData.mrp) <= 0) {
      newErrors.mrp = 'MRP must be a positive number';
    }
    
    if (!formData.category) newErrors.category = 'Category is required';
    
    // Validate weight if category has weight
    if (categoryConfig.hasWeight && !formData.weight) {
      newErrors.weight = 'Weight is required for this category';
    } else if (categoryConfig.hasWeight && formData.weight) {
      const weightValue = Number(formData.weight);
      if (isNaN(weightValue) || weightValue <= 0) {
        newErrors.weight = 'Weight must be a positive number';
      } else if (categoryConfig.weightMin && categoryConfig.weightMax && 
                 (weightValue < categoryConfig.weightMin || weightValue > categoryConfig.weightMax)) {
        newErrors.weight = `Weight must be between ${categoryConfig.weightMin} and ${categoryConfig.weightMax} ${categoryConfig.weightUnit}`;
      }
    }
    
    // Validate quantity if category has quantity
    if (categoryConfig.hasQuantity && !formData.quantity) {
      newErrors.quantity = 'Quantity is required for this category';
    } else if (categoryConfig.hasQuantity && formData.quantity) {
      const quantityValue = Number(formData.quantity);
      if (isNaN(quantityValue) || quantityValue <= 0 || !Number.isInteger(quantityValue)) {
        newErrors.quantity = 'Quantity must be a positive whole number';
      } else if (categoryConfig.quantityMin && categoryConfig.quantityMax && 
                 (quantityValue < categoryConfig.quantityMin || quantityValue > categoryConfig.quantityMax)) {
        newErrors.quantity = `Quantity must be between ${categoryConfig.quantityMin} and ${categoryConfig.quantityMax} ${categoryConfig.quantityUnit}`;
      }
    }
    
    // Validate image
    if (!imageFile && !formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Product image is required (upload file or provide URL)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !currentVendor) return;

    setIsLoading(true);
    
    try {
      const categoryConfig = getCategoryConfig(formData.category);
      
      // Simulate image upload (in real app, upload to cloud storage)
      let finalImageUrl = formData.imageUrl;
      if (imageFile) {
        // In a real application, you would upload to a service like AWS S3, Cloudinary, etc.
        finalImageUrl = imagePreview; // Using preview URL for demo
      }

      const productData: any = {
        name: formData.name,
        description: formData.description,
        sellerPrice: Number(formData.sellerPrice),
        mrp: Number(formData.mrp),
        category: formData.category,
        imageUrl: finalImageUrl,
        inStock: formData.inStock,
        vendorId: currentVendor.id,
      };

      // Add weight if category has weight
      if (categoryConfig.hasWeight && formData.weight) {
        productData.weight = Number(formData.weight);
        productData.weightUnit = categoryConfig.weightUnit;
      }

      // Add quantity if category has quantity
      if (categoryConfig.hasQuantity && formData.quantity) {
        productData.quantity = Number(formData.quantity);
        productData.quantityUnit = categoryConfig.quantityUnit;
      }

      await addProduct(productData);

      // Reset form
      setFormData({
        name: '',
        description: '',
        sellerPrice: '',
        mrp: '',
        category: '',
        weight: '',
        quantity: '',
        imageUrl: '',
        inStock: true,
      });
      
      removeImage();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Reset weight and quantity when category changes
    if (name === 'category') {
      setFormData(prev => ({ ...prev, weight: '', quantity: '' }));
      if (errors.weight) setErrors(prev => ({ ...prev, weight: '' }));
      if (errors.quantity) setErrors(prev => ({ ...prev, quantity: '' }));
    }
  };

  const inputClasses = `w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg placeholder-gray-400`;

  const categoryConfig = getCategoryConfig(formData.category);

  return (
    <div className="max-w-4xl mx-auto">
      {showSuccess && (
        <div className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-orange-800 font-bold text-xl">🕉️ Sacred Product Added Successfully!</h3>
              <p className="text-orange-600 text-lg">Your divine offering has been blessed and listed in our spiritual marketplace.</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-orange-50/90 via-red-50/90 to-yellow-50/90 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-orange-200/50 p-8 md:p-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 via-red-600 to-pink-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg relative">
            <Flower2 className="w-10 h-10 text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">🕉️</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-700 via-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Add Sacred Product
          </h2>
          <p className="text-gray-700 text-lg font-medium">Share your divine offerings with devotees worldwide</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-3">
            <label className="text-lg font-bold text-orange-800 ml-1 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Sacred Product Name
            </label>
            <div className="relative">
              <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${inputClasses} ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                placeholder="Enter sacred product name (e.g., Ganesha Murti, Rudraksha Mala)"
              />
            </div>
            {errors.name && <p className="text-red-500 text-lg ml-1">{errors.name}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-lg font-bold text-orange-800 ml-1 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Sacred Description
            </label>
            <div className="relative">
              <FileText className="absolute left-4 top-6 w-6 h-6 text-orange-400" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none text-lg placeholder-gray-400 ${errors.description ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                placeholder="Describe the spiritual significance, benefits, and usage of this sacred item"
              />
            </div>
            {errors.description && <p className="text-red-500 text-lg ml-1">{errors.description}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-lg font-bold text-orange-800 ml-1 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Sacred Category
            </label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-400" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`${inputClasses} ${errors.category ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
              >
                <option value="">Select a sacred category</option>
                {hinduReligiousCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && <p className="text-red-500 text-lg ml-1">{errors.category}</p>}
          </div>

          {/* Dynamic Weight and Quantity Fields */}
          {formData.category && (
            <div className="grid md:grid-cols-2 gap-8">
              {categoryConfig.hasWeight && (
                <div className="space-y-3">
                  <label className="text-lg font-bold text-orange-800 ml-1 flex items-center gap-2">
                    <Weight className="w-5 h-5" />
                    Weight ({categoryConfig.weightUnit})
                  </label>
                  <div className="relative">
                    <Weight className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-400" />
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      min={categoryConfig.weightMin}
                      max={categoryConfig.weightMax}
                      step={categoryConfig.weightStep}
                      className={`${inputClasses} ${errors.weight ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                      placeholder={categoryConfig.weightPlaceholder}
                    />
                  </div>
                  {errors.weight && <p className="text-red-500 text-lg ml-1">{errors.weight}</p>}
                  <p className="text-sm text-orange-600 ml-1 font-medium">
                    Range: {categoryConfig.weightMin} - {categoryConfig.weightMax} {categoryConfig.weightUnit}
                  </p>
                </div>
              )}

              {categoryConfig.hasQuantity && (
                <div className="space-y-3">
                  <label className="text-lg font-bold text-orange-800 ml-1 flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Quantity ({categoryConfig.quantityUnit})
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-400" />
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min={categoryConfig.quantityMin}
                      max={categoryConfig.quantityMax}
                      step={categoryConfig.quantityStep}
                      className={`${inputClasses} ${errors.quantity ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                      placeholder={categoryConfig.quantityPlaceholder}
                    />
                  </div>
                  {errors.quantity && <p className="text-red-500 text-lg ml-1">{errors.quantity}</p>}
                  <p className="text-sm text-orange-600 ml-1 font-medium">
                    Range: {categoryConfig.quantityMin} - {categoryConfig.quantityMax} {categoryConfig.quantityUnit}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-lg font-bold text-orange-800 ml-1 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Your Offering Price ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-400" />
                <input
                  type="number"
                  name="sellerPrice"
                  value={formData.sellerPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`${inputClasses} ${errors.sellerPrice ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                  placeholder="Your wholesale price"
                />
              </div>
              {errors.sellerPrice && <p className="text-red-500 text-lg ml-1">{errors.sellerPrice}</p>}
              <p className="text-sm text-orange-600 ml-1 font-medium">Price you're offering to the platform</p>
            </div>

            <div className="space-y-3">
              <label className="text-lg font-bold text-orange-800 ml-1 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Market Price ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-400" />
                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`${inputClasses} ${errors.mrp ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                  placeholder="Maximum retail price"
                />
              </div>
              {errors.mrp && <p className="text-red-500 text-lg ml-1">{errors.mrp}</p>}
              <p className="text-sm text-orange-600 ml-1 font-medium">Suggested retail price for devotees</p>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="text-lg font-bold text-orange-800 ml-1 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Sacred Product Image
            </label>
            
            {/* Upload Button */}
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-orange-300 rounded-2xl p-8 text-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 bg-gradient-to-br from-orange-25 to-yellow-25"
              >
                <Upload className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-orange-700 mb-2">Upload Sacred Image</p>
                <p className="text-sm text-orange-600">Click to select an image file (Max 5MB)</p>
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {/* Alternative URL Input */}
              <div className="text-center text-orange-600 font-medium">OR</div>
              
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-400" />
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className={`${inputClasses} ${errors.imageUrl ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-orange-200'}`}
                  placeholder="https://example.com/sacred-image.jpg"
                />
              </div>
            </div>

            {/* Image Preview */}
            {(imagePreview || formData.imageUrl) && (
              <div className="relative">
                <img
                  src={imagePreview || formData.imageUrl}
                  alt="Sacred product preview"
                  className="w-full h-64 object-cover rounded-2xl border-2 border-orange-200 shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200 shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {errors.imageUrl && <p className="text-red-500 text-lg ml-1">{errors.imageUrl}</p>}
          </div>

          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
            <div>
              <h3 className="text-lg font-bold text-orange-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Available for Devotees
              </h3>
              <p className="text-orange-600">Is this sacred item currently in stock?</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, inStock: !prev.inStock }))}
              className="focus:outline-none transform hover:scale-110 transition-transform duration-200"
            >
              {formData.inStock ? (
                <ToggleRight className="w-12 h-12 text-orange-500" />
              ) : (
                <ToggleLeft className="w-12 h-12 text-gray-400" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 via-red-600 to-pink-500 text-white py-5 rounded-2xl font-bold text-xl hover:from-orange-600 hover:via-red-700 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            {isLoading ? (
              <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Flower2 className="w-6 h-6" />
                🕉️ Add Sacred Product
                <Sparkles className="w-6 h-6" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductListing;