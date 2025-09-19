import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Search, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { dummyGalleryImages } from '@/data/dummyData';
import { GalleryImage } from '@/types/admin';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [images] = useState<GalleryImage[]>(dummyGalleryImages);

  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (image.description && image.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || image.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    const categoryMap = {
      festivals: <Badge variant="outline" className="text-orange-600 border-orange-200">Festivals</Badge>,
      rituals: <Badge variant="outline" className="text-purple-600 border-purple-200">Rituals</Badge>,
      temple: <Badge variant="outline" className="text-blue-600 border-blue-200">Temple</Badge>,
      community: <Badge variant="outline" className="text-green-600 border-green-200">Community</Badge>,
    };
    return categoryMap[category as keyof typeof categoryMap] || <Badge variant="outline">{category}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryCounts = () => {
    return {
      festivals: images.filter(i => i.category === 'festivals').length,
      rituals: images.filter(i => i.category === 'rituals').length,
      temple: images.filter(i => i.category === 'temple').length,
      community: images.filter(i => i.category === 'community').length,
    };
  };

  const categoryCounts = getCategoryCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Gallery Management</h1>
          <p className="text-muted-foreground">Upload and organize temple photos, event images, and community moments</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Upload className="w-4 h-4 mr-2" />
          Upload Images
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{images.length}</div>
            <p className="text-sm text-muted-foreground">In gallery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Festivals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-orange-600">{categoryCounts.festivals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Rituals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-600">{categoryCounts.rituals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Temple
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">{categoryCounts.temple}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">{categoryCounts.community}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search images by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="festivals">Festivals</SelectItem>
                <SelectItem value="rituals">Rituals</SelectItem>
                <SelectItem value="temple">Temple</SelectItem>
                <SelectItem value="community">Community</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground flex items-center">
              Showing {filteredImages.length} of {images.length} images
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden group">
            <div className="relative aspect-square bg-muted">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute top-2 left-2">
                {getCategoryBadge(image.category)}
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold line-clamp-1">{image.title}</h3>
              {image.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {image.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Uploaded {formatDate(image.uploadedAt)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Zone */}
      <Card className="border-dashed border-2 border-muted-foreground/25">
        <CardContent className="p-8">
          <div className="text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload New Images</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop images here or click to browse your files
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Select Images
            </Button>
          </div>
        </CardContent>
      </Card>

      {filteredImages.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No images found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Gallery;