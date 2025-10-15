import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Search, Mail, Phone, Clock, Eye, MessageCircle } from 'lucide-react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/use-debounce';
import { fetchContactDetails, replyContact } from '@/api/contact-us';
import ContactsUsTable from '../components/ContactUsTable';
import Modal from '@/components/ui/Modal';
import { FormFields } from '@/components/Forms/FormFields';
import { Button } from '@/components/ui/button';
import { isFormValid } from '@/utils/common-function';
import { replyContactFields } from './constants';
import { showToast } from '@/components/ShowToast';
import { queryClient } from '@/lib/react-query-client';
import { handleApiError } from '@/utils/common-function';

const Contacts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [modalState, setModalState] = useState({ open: false, edit: false });
  const debouncedSearch = useDebounce(search, 1000);

  const { data = {}, isFetching } = useQuery({
    queryKey: [
      'contact-us-list',
      { page, limit, filters, search: debouncedSearch },
    ],
    queryFn: fetchContactDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

  const { data: allContactListData = {}, isFetching: allContactFetching } =
    useQuery({
      queryKey: ['contact-us'],
      queryFn: fetchContactDetails,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true, // refetch on window focus
    });

  const replyContactMutation = useMutation({
    mutationFn: replyContact,
    onSuccess: () => {
      showToast('Success!', 'Replied to the message.', 'success');
      handleClose();
      queryClient.invalidateQueries({ queryKey: ['contact-us'] });
    },
    onError: (error) =>
      handleApiError(error, 'Failed to replied to the message.'),
  });

  const { contactsList = [], pagination = {} } = data;
  const { contactsList: allContactList = [] } = allContactListData;

  function getStatusCounts(data) {
    return data?.reduce((acc, item) => {
      const status = item.status?.toLowerCase() || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }

  const statusCounts = getStatusCounts(allContactList);

  const handleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClose = () => {
    setModalState({ open: false, edit: false });
    handleReset();
  };

  const handleReset = () => {
    setFormData({});
  };

  const handleSubmit = () => {
    const payload = {
      contactId: formData?.id,
      response: formData?.response,
    };
    replyContactMutation.mutate(payload);
  };

  const disabled = !isFormValid(replyContactFields, formData);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Contact Submissions
        </h1>
        <p className="text-muted-foreground">
          Review and respond to inquiries from devotees and visitors
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              New Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {statusCounts.new ?? 0}
            </div>
            <p className="text-sm text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Replied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {statusCounts.replied ?? 0}
            </div>
            <p className="text-sm text-muted-foreground">Being handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {statusCounts.resolved ?? 0}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
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
                placeholder="Search by name, email, or subject..."
                value={search || ''}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={filters?.status}
              onValueChange={(val) =>
                handleFilter('status', val === 'all' ? '' : val)
              }>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground flex items-center">
              Showing {contactsList?.length} of {pagination?.total} submissions
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Contact Submissions</CardTitle>
          <CardDescription>
            Complete list of inquiries with their current status and response
            actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <ContactsUsTable
              data={contactsList}
              handleReply={(contact) => {
                setModalState({
                  open: true,
                  edit: false,
                });
                setFormData({ ...contact });
              }}
              handleView={() => {}}
              isLoading={isFetching}
              pagination={pagination}
              onPageChange={(page: number, limit: number) => {
                setPage(page);
                setLimit(limit);
              }}
            />
          </div>
        </CardContent>
      </Card>
      {modalState.open && (
        <Modal open onOpenChange={handleClose} title={'Reply Contact'}>
          <FormFields
            fields={replyContactFields}
            formData={formData}
            setFormData={setFormData}
            wrapperClass="grid grid-cols-1 gap-6"
          />
          <div className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={handleReset}>
              Clear
            </Button>
            <Button variant="temple" disabled={disabled} onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Contacts;
