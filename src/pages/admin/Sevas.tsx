import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Heart, Plus, Edit, Eye, IndianRupee } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchSevaDetails,
  saveSevaDetails,
  updateSevaDetails,
} from '@/api/sevas';
import { queryClient } from '@/lib/react-query-client';
import { SevaPayload, SevaState } from '@/types/seva';
import Modal from '@/components/ui/Modal';
import { FormFields } from '@/components/Forms/FormFields';
import {
  isFormValid,
  formatAmount,
  handleApiError,
} from '@/utils/common-function';
import { sevaFields } from './constants';
import { showToast } from '@/components/ShowToast';
import SevaTable from '../components/SevaTable';
import { useDebounce } from '@/hooks/use-debounce';

const Sevas = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSevaAddOpen, setIsSevaAddOpen] = useState(false);
  const [formData, setFormData] = useState<SevaState>({
    title: '',
    description: '',
    amount: '',
    duration: '',
    benefits: [],
    category: '',
    availability: '',
    benefitsValue: '',
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSeacrch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const debouncedSearch = useDebounce(search, 1000);

  const { data = {}, isFetching } = useQuery({
    queryKey: ['sevas-list', { page, limit, filters, search: debouncedSearch }],
    queryFn: fetchSevaDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });

  const { data: allSevasData = {}, isFetching: allsevaIsFetching } = useQuery({
    queryKey: ['sevas'],
    queryFn: fetchSevaDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });

  const { sevasList = [], pagination } = data;

  const { sevasList: allSevaList = [] } = allSevasData;

  useEffect(() => {
    if (formData?.benefits?.length && isEdit) {
      const benefitsValue = formData?.benefits?.join(', ');
      setFormData((prev) => ({
        ...prev,
        benefitsValue,
      }));
    }
  }, [formData?.benefits]);

  const saveSevaMutation = useMutation({
    mutationFn: saveSevaDetails,
    onSuccess: () => {
      showToast('Success!', 'Seva details saved successfully.', 'success');
      setIsSevaAddOpen(false);
      handleReset();
      queryClient.invalidateQueries({ queryKey: ['sevas-list'] });
      queryClient.invalidateQueries({ queryKey: ['sevas'] });
    },
    onError: (error) => handleApiError(error, 'Failed to save seva details'),
  });

  const updateSevaMutation = useMutation({
    mutationFn: updateSevaDetails,
    onSuccess: () => {
      showToast('Updated!', 'Seva details updated successfully.', 'success');
      queryClient.invalidateQueries({ queryKey: ['sevas-list'] });
      queryClient.invalidateQueries({ queryKey: ['sevas'] });
      handleReset();
      setIsEdit(false);
      setIsSevaAddOpen(false);
    },
    onError: (error) => handleApiError(error, 'Failed to update seva details'),
  });

  function getAvailabilityCounts(data) {
    return data?.reduce((acc, item) => {
      const status = item.availability?.toLowerCase() || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }

  const availabilityCounts = getAvailabilityCounts(allSevaList);

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      amount: '',
      duration: '',
      benefits: [],
      category: '',
      availability: '',
      benefitsValue: '',
    });
  };

  const handleSubmit = () => {
    const payload = {
      title: formData?.title || '',
      description: formData?.description || '',
      amount: formData?.amount || '',
      duration: formData?.duration || '',
      benefits: formData?.benefitsValue?.split(','),
      category: formData?.category,
      availability: formData?.availability,
      isActive: true,
    };
    saveSevaMutation.mutate(payload);
  };

  const handleEdit = (data) => {
    setFormData(data);
    setIsSevaAddOpen(true);
    setIsEdit(true);
  };

  const handleEditSubmit = () => {
    const payload = {
      id: (formData?.id as string) || '',
      title: formData?.title || '',
      description: formData?.description || '',
      amount: formData?.amount || '',
      duration: formData?.duration || '',
      benefits: formData?.benefitsValue?.split(','),
      category: formData?.category,
      availability: formData?.availability,
      isActive: true,
    };
    updateSevaMutation.mutate(payload);
  };

  const handleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const disabled = !isFormValid(sevaFields, formData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Sevas & Offerings
          </h1>
          <p className="text-muted-foreground">
            Manage temple services, donations, and spiritual offerings
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => setIsSevaAddOpen(!isSevaAddOpen)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Seva
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {availabilityCounts.available ?? 0}
            </div>
            <p className="text-sm text-muted-foreground">Ready for booking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-yellow-600" />
              Limited
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {availabilityCounts.limited ?? 0}
            </div>
            <p className="text-sm text-muted-foreground">Few slots remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" />
              Unavailable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {availabilityCounts.unavailable ?? 0}
            </div>
            <p className="text-sm text-muted-foreground">Currently closed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {allSevaList?.length
                ? formatAmount(
                    allSevaList?.reduce((sum, seva) => sum + +seva?.amount, 0)
                  )
                : ''}
            </div>
            <p className="text-sm text-muted-foreground">
              All offerings combined
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search sevas..."
                value={search || ''}
                onChange={(e) => setSeacrch(e.target.value?.trimStart())}
                className="pl-10"
              />
            </div>

            <Select
              value={filters?.category}
              onValueChange={(value) =>
                handleFilter('category', value === 'all' ? '' : value)
              }>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="pooja">Pooja</SelectItem>
                <SelectItem value="annadana">Annadana</SelectItem>
                <SelectItem value="decoration">Decoration</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters?.availability}
              onValueChange={(value) =>
                handleFilter('availability', value === 'all' ? '' : value)
              }>
              <SelectTrigger>
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Availability</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="limited">Limited</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground flex items-center">
              Showing {sevasList.length} of {pagination?.total} sevas
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sevas Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Sevas & Offerings</CardTitle>
          <CardDescription>
            Complete list of available services with pricing and booking status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <SevaTable
              filteredSevas={sevasList}
              handleEdit={handleEdit}
              isLoading={isFetching}
              pagination={pagination}
              onPageChange={(page: number, limit: number) => {
                setPage(page);
                setLimit(limit);
              }}
            />
          </div>

          {sevasList.length === 0 && !isFetching && (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No sevas found matching your filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      {isSevaAddOpen ? (
        <Modal
          open={isSevaAddOpen}
          onOpenChange={() => {
            setIsSevaAddOpen(!isSevaAddOpen);
            handleReset();
          }}
          title="Add gallery details">
          <div className="row">
            <FormFields
              fields={sevaFields}
              formData={formData}
              setFormData={setFormData}
              wrapperClass={
                'grid lg:grid-cols-2 md:grid-cols-1 lg:gap-6 md:gap-12'
              }
            />
          </div>
          <div className="mt-4 flex justify-between">
            <Button variant="secondary" size="lg" onClick={handleReset}>
              Clear
            </Button>
            <Button
              variant="temple"
              size="lg"
              disabled={disabled}
              onClick={() => (isEdit ? handleEditSubmit() : handleSubmit())}>
              Save
            </Button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Sevas;
