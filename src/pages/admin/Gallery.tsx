import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, Search, Eye, Edit, Trash2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { FormFields } from '@/components/Forms/FormFields';
import { galleryFields } from './constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchGallery,
  saveGalleryDetails,
  updateGalleryDetails,
} from '@/api/gallery';
import { handlePresignedUrl } from '@/api/presigned-url';
import { handleApiError } from '@/utils/common-function';
import { showToast } from '@/components/ShowToast';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: undefined,
    category: '',
    description: '',
    src: null,
    title: '',
    image_url: '',
  });

  const queryClient = useQueryClient();

  // ✅ Fetch gallery images
  const { data: galleryImages = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Save and update mutations
  const saveGalleryMutation = useMutation({
    mutationFn: saveGalleryDetails,
    onSuccess: () => {
      showToast('Success!', 'Gallery details saved successfully.', 'success');
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      handleClose();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update event');
    },
  });

  const updateGalleryMutation = useMutation({
    mutationFn: updateGalleryDetails,
    onSuccess: () => {
      showToast('Updated!', 'Gallery updated successfully.', 'success');
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      handleClose();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to save event');
    },
  });

  const uploadMutation = useMutation({
    mutationFn: handlePresignedUrl,
    onSuccess: (res) => {
      if (res?.success) {
        const src = res?.message?.publicUrl || '';
        setFormData((prev) => ({ ...prev, image_url: src }));
        showToast(
          'Image uploaded',
          'Your image has been successfully uploaded.',
          'success'
        );
      } else {
        showToast(
          'Upload failed',
          res?.response?.data?.message ?? 'Unknown error',
          'danger'
        );
      }
    },
    onError: (error) => {
      handleApiError(error, 'Failed to save event');
    },
  });

  const handleImageUpload = useCallback(() => {
    if (!formData?.src) return;

    const fileName = formData.src.name;
    const payload = { file: formData.src, filePath: `gallery/${fileName}` };
    uploadMutation.mutate(payload);
  }, [formData?.src]);

  useEffect(() => {
    if (formData.src) handleImageUpload();
  }, [formData.src]);

  // ✅ Derived data with useMemo
  const filteredImages = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return galleryImages.filter((img) => {
      const matchesSearch =
        img.title.toLowerCase().includes(term) ||
        img.description?.toLowerCase().includes(term);
      const matchesCategory =
        filterCategory === 'all' || img.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [galleryImages, searchTerm, filterCategory]);

  const categoryCounts = useMemo(() => {
    const categories = ['festivals', 'rituals', 'temple', 'community'];
    return Object.fromEntries(
      categories.map((c) => [
        c,
        galleryImages.filter((i) => i.category === c).length,
      ])
    );
  }, [galleryImages]);

  // ✅ Handlers
  const handleClose = useCallback(() => {
    setIsUploadOpen(false);
    setIsEdit(false);
    setFormData({
      id: undefined,
      category: '',
      description: '',
      src: null,
      title: '',
      image_url: '',
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const payload = (({ title, description, image_url, category }) => ({
      title,
      description,
      image_url,
      category,
    }))(formData);
    saveGalleryMutation.mutate(payload);
  }, [formData, saveGalleryMutation]);

  const handleEditSubmit = useCallback(() => {
    updateGalleryMutation.mutate({
      id: formData.id,
      ...formData,
      isActive: true,
    });
  }, [formData, updateGalleryMutation]);

  const getCategoryBadge = useCallback((category) => {
    const colorMap = {
      festivals: 'text-orange-600 border-orange-200',
      rituals: 'text-purple-600 border-purple-200',
      temple: 'text-blue-600 border-blue-200',
      community: 'text-green-600 border-green-200',
    };
    return (
      <Badge variant="outline" className={colorMap[category] || ''}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  }, []);

  const isDisabled =
    !formData.category || !formData.title || !formData.image_url;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-muted-foreground">
            Manage temple and event photos
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)} className="bg-primary">
          <Upload className="w-4 h-4 mr-2" /> Upload
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        {[
          {
            title: 'Total Images',
            count: galleryImages.length,
            color: 'text-primary',
          },
          {
            title: 'Festivals',
            count: categoryCounts.festivals,
            color: 'text-orange-600',
          },
          {
            title: 'Rituals',
            count: categoryCounts.rituals,
            color: 'text-purple-600',
          },
          {
            title: 'Temple',
            count: categoryCounts.temple,
            color: 'text-blue-600',
          },
          {
            title: 'Community',
            count: categoryCounts.community,
            color: 'text-green-600',
          },
        ].map(({ title, count, color }) => (
          <Card key={title}>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-xl font-bold ${color}`}>{count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="festivals">Festivals</SelectItem>
              <SelectItem value="rituals">Rituals</SelectItem>
              <SelectItem value="temple">Temple</SelectItem>
              <SelectItem value="community">Community</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-muted-foreground self-center">
            Showing {filteredImages.length} of {galleryImages.length}
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className="group overflow-hidden">
            <div className="relative aspect-square">
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setFormData(image);
                    setIsEdit(true);
                    setIsUploadOpen(true);
                  }}>
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
            <CardContent className="p-3">
              <h3 className="font-semibold truncate">{image.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {image.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p>No images found.</p>
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      {isUploadOpen && (
        <Modal
          open={isUploadOpen}
          onOpenChange={handleClose}
          title={isEdit ? 'Edit Gallery' : 'Add Gallery'}>
          <FormFields
            fields={galleryFields}
            formData={formData}
            setFormData={setFormData}
            wrapperClass="space-y-6"
          />
          <div className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="temple"
              disabled={isDisabled}
              onClick={isEdit ? handleEditSubmit : handleSubmit}>
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Gallery;
