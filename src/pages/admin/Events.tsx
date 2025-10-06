import { useCallback, useEffect, useMemo, useState } from 'react';
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
  CalendarPlus,
  Search,
  Calendar,
  Clock,
  Users,
  Eye,
  Edit,
} from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchEvents,
  saveEventsDetails,
  updateEventsDetails,
} from '@/api/events';
import Modal from '@/components/ui/Modal';
import { FormFields } from '@/components/Forms/FormFields';
import { EventPayload, EventState } from '@/types/events';
import { handlePresignedUrl } from '@/api/presigned-url';
import { eventFields } from './constants';
import { isFormValid } from '@/utils/common-function';
import { queryClient } from '@/lib/react-query-client';
import { formatDate, handleApiError } from '@/utils/common-function';
import { showToast } from '@/components/ShowToast';
import { BADGE_MAP, BadgeConfig, CATEGORY_MAP } from './constants';

const renderBadge = (key: string, map: Record<string, BadgeConfig>) => {
  const cfg = map[key];
  return cfg ? (
    <Badge variant={cfg.variant} className={cfg.className}>
      {cfg.label}
    </Badge>
  ) : (
    <Badge variant="secondary">{key}</Badge>
  );
};

const Events = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
  });
  const [formData, setFormData] = useState<EventState>({
    date: '',
    src: null,
    description: '',
    image_url: '',
    location: '',
    time: '',
    title: '',
    type: null,
    participants: '',
  });
  const [modalState, setModalState] = useState({ open: false, edit: false });
  const { data: eventsData = [], isLoading: eventsIsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

  const saveEventMutation = useMutation({
    mutationFn: saveEventsDetails,
    onSuccess: () => {
      showToast('Success!', 'Event saved successfully.', 'success');
      handleClose();
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => handleApiError(error, 'Failed to save event'),
  });

  const updateEventMutation = useMutation({
    mutationFn: updateEventsDetails,
    onSuccess: () => {
      showToast('Updated!', 'Event updated successfully.', 'success');
      handleClose();
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update event');
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
      handleApiError(error, 'Failed to update event');
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

  const handleReset = () =>
    setFormData({
      date: '',
      src: null,
      description: '',
      image_url: '',
      location: '',
      time: '',
      title: '',
      type: null,
      participants: '',
      id: null,
    });

  const handleClose = () => {
    setModalState({ open: false, edit: false });
    handleReset();
  };

  const handleSubmit = () => {
    const payload = { ...formData };
    if (modalState?.edit) {
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.src;
      updateEventMutation.mutate({ ...payload, isActive: true });
    } else {
      saveEventMutation.mutate(payload);
    }
  };

  const filteredEvents = useMemo(() => {
    return eventsData?.length
      ? eventsData?.filter((e) => {
          const { search, status, category } = filters;
          const matchSearch = [e.title, e.description].some((t) =>
            t.toLowerCase().includes(search.toLowerCase())
          );
          const matchStatus =
            status === 'all' || e.status?.toLowerCase() === status;
          const matchCategory =
            category === 'all' || e.category?.toLowerCase() === category;
          return matchSearch && matchStatus && matchCategory;
        })
      : [];
  }, [eventsData]);

  const disabled = !isFormValid(eventFields, formData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="lg:flex justify-between items-center">
        <div>
          <h1 className="lg:text-3xl font-heading font-bold text-foreground">
            Events Management
          </h1>
          <p className="text-muted-foreground">
            Manage temple events and festivals
          </p>
        </div>
        <Button onClick={() => setModalState({ open: true, edit: false })}>
          <CalendarPlus className="mr-2" /> Add Event
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 grid gap-4 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
              className="pl-10"
            />
          </div>

          <Select
            value={filters.status}
            onValueChange={(v) => setFilters((f) => ({ ...f, status: v }))}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {['all', 'upcoming', 'completed', 'cancelled'].map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.category}
            onValueChange={(v) => setFilters((f) => ({ ...f, category: v }))}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {['all', 'pooja', 'festival', 'community', 'education'].map(
                (c) => (
                  <SelectItem key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <div className="text-sm text-muted-foreground flex items-center">
            Showing {filteredEvents?.length} of {eventsData.length} events
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div
        className={`grid gap-6 ${
          filteredEvents?.length ? ' lg:grid-cols-3' : 'lg:grid-cols-1'
        }`}>
        {filteredEvents.length ? (
          filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  {renderBadge(event.status, BADGE_MAP)}
                  {renderBadge(event.type, CATEGORY_MAP)}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {event.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {formatDate(event.date)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {event.time}
                </div>
                {event.participants && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> {event.participants}{' '}
                    participants
                  </div>
                )}
                <div className="flex gap-2 pt-3">
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" /> View
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setModalState({ open: true, edit: true });
                      setFormData(event);
                    }}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto mb-4" />
              No events found.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal */}
      {modalState.open && (
        <Modal
          open
          onOpenChange={handleClose}
          title={modalState.edit ? 'Edit Event' : 'Add Event'}>
          <FormFields
            fields={eventFields}
            formData={formData}
            setFormData={setFormData}
            wrapperClass="grid grid-cols-2 gap-6"
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

export default Events;
