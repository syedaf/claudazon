;
// 'use client';
// 'use client';
//
// import { useEffect, useState } from 'react';
// import { Heart, Search, ShoppingCart, Star } from 'lucide-react';
// // import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardFooter } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from '@/components/ui/select';
// //
// // interface Product {
// //   id: string;
// //   name: string;
// //   price: number;
// //   originalPrice?: number;
// //   rating: number;
// //   reviews: number;
// //   image: string;
// //   category: string;
// //   prime: boolean;
// //   freeShipping: boolean;
// // }
//
// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('featured');
//   const [loading, setLoading] = useState(true);
// //
// //   // Mock data - replace with API call
// //   const mockProducts: Product[] = [
// //     {
// //       id: 'B08N5WRWNW',
// //       name: 'Echo Dot (4th Gen) Smart Speaker with Alexa',
// //       price: 49.99,
// //       originalPrice: 59.99,
// //       rating: 4.7,
// //       reviews: 234156,
// //       image: '/api/placeholder/300/300',
// //       category: 'Electronics',
// //       prime: true,
// //       freeShipping: true,
// //     },
// //     {
// //       id: 'B09B93ZDG4',
// //       name: 'Apple AirPods Pro (2nd Generation)',
// //       price: 249.99,
// //       originalPrice: 279.99,
// //       rating: 4.4,
// //       reviews: 89234,
// //       image: '/api/placeholder/300/300',
// //       category: 'Electronics',
// //       prime: true,
// //       freeShipping: true,
// //     },
// //     {
// //       id: 'B08C1W5N87',
// //       name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
// //       price: 79.95,
// //       originalPrice: 99.95,
// //       rating: 4.6,
// //       reviews: 145678,
// //       image: '/api/placeholder/300/300',
// //       category: 'Home & Kitchen',
// //       prime: true,
// //       freeShipping: true,
// //     },
// //     {
// //       id: 'B07FZ8S74R',
// //       name: 'Hydroflask Water Bottle 32oz',
// //       price: 44.95,
// //       rating: 4.8,
// //       reviews: 67890,
// //       image: '/api/placeholder/300/300',
// //       category: 'Sports & Outdoors',
// //       prime: false,
// //       freeShipping: true,
// //     },
// //   ];
// //
// //   useEffect(() => {
// //     // Simulate API loading
// //     setTimeout(() => {
// //       setProducts(mockProducts);
// //       setFilteredProducts(mockProducts);
// //       setLoading(false);
// //     }, 1000);
// //   }, []);
// //
// //   useEffect(() => {
// //     let filtered = products;
// //
// //     // Search filter
// //     if (searchTerm) {
// //       filtered = filtered.filter(
// //         product =>
// //           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           product.category.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }
// //
// //     // Category filter
// //     if (selectedCategory !== 'all') {
// //       filtered = filtered.filter(
// //         product => product.category === selectedCategory
// //       );
// //     }
// //
// //     // Sort
// //     switch (sortBy) {
// //       case 'price-low':
// //         filtered.sort((a, b) => a.price - b.price);
// //         break;
// //       case 'price-high':
// //         filtered.sort((a, b) => b.price - a.price);
// //         break;
// //       case 'rating':
// //         filtered.sort((a, b) => b.rating - a.rating);
// //         break;
// //       case 'reviews':
// //         filtered.sort((a, b) => b.reviews - a.reviews);
// //         break;
// //       default:
// //         // Featured - keep original order
// //         break;
// //     }
// //
// //     setFilteredProducts(filtered);
// //   }, [products, searchTerm, selectedCategory, sortBy]);
// //
// //   const renderStars = (rating: number) => {
// //     return Array.from({ length: 5 }, (_, i) => (
// //       <Star
// //         key={i}
// //         className={`w-4 h-4 ${
// //           i < Math.floor(rating)
// //             ? 'fill-yellow-400 text-yellow-400'
// //             : 'text-gray-300'
// //         }`}
// //       />
// //     ));
// //   };
// //
// //   const formatPrice = (price: number) => `$${price.toFixed(2)}`;
// //
// //   const formatReviews = (count: number) => {
// //     if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
// //     return count.toString();
// //   };
// //
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //             {Array.from({ length: 8 }).map((_, i) => (
// //               <div key={i} className="animate-pulse">
// //                 <div className="bg-white/70 backdrop-blur-sm rounded-xl h-80 border border-white/50 shadow-lg"></div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }
// //
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
// //       {/* Header */}
// //       <div className="bg-white/80 backdrop-blur-md border-b border-white/50 sticky top-0 z-40">
// //         <div className="max-w-7xl mx-auto p-6">
// //           <h1 className="text-3xl font-bold text-slate-800 mb-6">Products</h1>
// //
// //           {/* Filters */}
// //           <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
// //             <div className="relative flex-1 max-w-md">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //               <Input
// //                 placeholder="Search products..."
// //                 value={searchTerm}
// //                 onChange={e => setSearchTerm(e.target.value)}
// //                 className="pl-10 bg-white/70 backdrop-blur-sm border-white/50"
// //               />
// //             </div>
// //
// //             <Select
// //               value={selectedCategory}
// //               onValueChange={setSelectedCategory}
// //             >
// //               <SelectTrigger className="w-48 bg-white/70 backdrop-blur-sm border-white/50">
// //                 <SelectValue placeholder="Category" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Categories</SelectItem>
// //                 <SelectItem value="Electronics">Electronics</SelectItem>
// //                 <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
// //                 <SelectItem value="Sports & Outdoors">
// //                   Sports & Outdoors
// //                 </SelectItem>
// //               </SelectContent>
// //             </Select>
// //
// //             <Select value={sortBy} onValueChange={setSortBy}>
// //               <SelectTrigger className="w-48 bg-white/70 backdrop-blur-sm border-white/50">
// //                 <SelectValue placeholder="Sort by" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="featured">Featured</SelectItem>
// //                 <SelectItem value="price-low">Price: Low to High</SelectItem>
// //                 <SelectItem value="price-high">Price: High to Low</SelectItem>
// //                 <SelectItem value="rating">Customer Rating</SelectItem>
// //                 <SelectItem value="reviews">Most Reviews</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>
// //         </div>
// //       </div>
// //
// //       {/* Products Grid */}
// //       <div className="max-w-7xl mx-auto p-6">
// //         <div className="mb-4 text-slate-600">
// //           {filteredProducts.length} results
// //         </div>
// //
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //           {filteredProducts.map(product => (
// //             <Card
// //               key={product.id}
// //               className="group hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/50 hover:bg-white/80"
// //             >
// //               <CardContent className="p-4">
// //                 <div className="relative mb-4">
// //                   <img
// //                     src={product.image}
// //                     alt={product.name}
// //                     className="w-full h-48 object-cover rounded-lg"
// //                   />
// //                   <Button
// //                     size="sm"
// //                     variant="ghost"
// //                     className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90"
// //                   >
// //                     <Heart className="w-4 h-4" />
// //                   </Button>
// //                   {product.prime && (
// //                     <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700">
// //                       Prime
// //                     </Badge>
// //                   )}
// //                 </div>
// //
// //                 <div className="space-y-2">
// //                   <h3 className="font-semibold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
// //                     {product.name}
// //                   </h3>
// //
// //                   <div className="flex items-center gap-1">
// //                     {renderStars(product.rating)}
// //                     <span className="text-sm text-slate-600 ml-1">
// //                       {product.rating} ({formatReviews(product.reviews)})
// //                     </span>
// //                   </div>
// //
// //                   <div className="flex items-center gap-2">
// //                     <span className="text-xl font-bold text-slate-800">
// //                       {formatPrice(product.price)}
// //                     </span>
// //                     {product.originalPrice && (
// //                       <span className="text-sm text-gray-500 line-through">
// //                         {formatPrice(product.originalPrice)}
// //                       </span>
// //                     )}
// //                   </div>
// //
// //                   {product.freeShipping && (
// //                     <div className="text-sm text-green-600 font-medium">
// //                       FREE Shipping
// //                     </div>
// //                   )}
// //                 </div>
// //               </CardContent>
// //
// //               <CardFooter className="p-4 pt-0">
// //                 <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
// //                   <ShoppingCart className="w-4 h-4 mr-2" />
// //                   Add to Cart
// //                 </Button>
// //               </CardFooter>
// //             </Card>
// //           ))}
// //         </div>
// //
// //         {filteredProducts.length === 0 && (
// //           <div className="text-center py-12">
// //             <div className="text-gray-500 text-lg">No products found</div>
// //             <div className="text-gray-400 text-sm mt-2">
// //               Try adjusting your search or filters
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
import { Button } from '@/components/ui/button';


export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Button Test</h1>

        <div className="space-y-4">
          <Button>Default Button</Button>

          <Button variant="secondary">Secondary Button</Button>

          <Button variant="outline">Outline Button</Button>

          <Button size="sm">Small Button</Button>

          <Button size="lg">Large Button</Button>
        </div>
      </div>
    </div>
  );
}
