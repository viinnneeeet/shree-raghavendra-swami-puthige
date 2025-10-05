import React, { useEffect, useState } from 'react';
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
import { toast } from '@/hooks/use-toast';
import Loader from '@/components/ui/Loader';
import { eventFields } from './constants';
import { isFormValid } from '@/utils/common-function';
import { queryClient } from '@/lib/react-query-client';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isEventAddOpen, setIsEventAddOpen] = useState(false);
  const [formData, setFormData] = useState<EventState>({
    attendees: '',
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
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {
    data: eventsData,
    isLoading: eventsIsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });

  const saveEventMutation = useMutation<
    unknown, // return type of mutationFn
    Error, // error type
    EventPayload // argument type
  >({
    mutationFn: saveEventsDetails,
    onSuccess: (res) => {
      console.log(res);
      toast({
        title: 'Success!',
        description: 'Gallery details saved successfully.',
        variant: 'success',
      });
      setIsEventAddOpen(false);
      queryClient.invalidateQueries({ queryKey: ['events'] });
      handleReset();
    },
    onError: (error) => {
      toast({
        title: 'Something went wrong',
        description: error.message,
        variant: 'danger',
      });
    },
  });

  const updateEventMutation = useMutation<unknown, Error, EventPayload>({
    mutationFn: updateEventsDetails,
    onSuccess: () => {
      toast({
        title: 'Updated!',
        description: 'Gallery updated.',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      handleReset();
      setIsEdit(false);
      setIsEventAddOpen(false);
    },
    onError: (error) => {
      toast({
        title: 'Update failed',
        description: error.message,
        variant: 'danger',
      });
    },
  });

  useEffect(() => {
    if (formData?.src) {
      handleImageUpload();
    }
  }, [formData?.src]);

  const filteredEvents = eventsData?.length
    ? eventsData?.filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          filterStatus === 'all' || event.status === filterStatus;
        const matchesCategory =
          filterCategory === 'all' || event.category === filterCategory;

        return matchesSearch && matchesStatus && matchesCategory;
      })
    : [];

  const getStatusBadge = (status: string) => {
    const badgeMap = {
      upcoming: (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          Upcoming
        </Badge>
      ),
      completed: (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          Completed
        </Badge>
      ),
      cancelled: <Badge variant="destructive">Cancelled</Badge>,
    };
    return (
      badgeMap[status as keyof typeof badgeMap] || (
        <Badge variant="secondary">{status}</Badge>
      )
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryMap = {
      pooja: (
        <Badge variant="outline" className="text-purple-600 border-purple-200">
          Pooja
        </Badge>
      ),
      festival: (
        <Badge variant="outline" className="text-orange-600 border-orange-200">
          Festival
        </Badge>
      ),
      community: (
        <Badge variant="outline" className="text-green-600 border-green-200">
          Community
        </Badge>
      ),
      education: (
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          Education
        </Badge>
      ),
    };
    return (
      categoryMap[category as keyof typeof categoryMap] || (
        <Badge variant="outline">{category}</Badge>
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleImageUpload = async () => {
    const fileName = formData.src.name;
    const payload = {
      file: formData?.src,
      filePath: `events/${fileName}`,
    };
    try {
      setIsLoading(true);
      const res = await handlePresignedUrl(payload);
      if (res?.success) {
        const src = res?.message?.publicUrl || '';
        setFormData((prev) => ({
          ...prev,
          image_url: src,
        }));
      } else {
        toast({
          title: 'Something went wrong',
          description: res?.response?.data?.message,
          variant: 'danger',
        });
        setFormData((prev) => ({
          ...prev,
          src: null,
        }));
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err?.message);
      toast({
        title: 'Something went wrong',
        description: err?.message,
        variant: 'danger',
      });
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      attendees: '',
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
  };

  const handleSubmit = () => {
    const payload = {
      title: formData?.title,
      description: formData?.description,
      date: formData?.date,
      time: formData?.time,
      image_url: formData?.image_url,
      type: formData?.type,
      participants: formData?.participants,
      location: formData?.location,
      attendees: formData?.attendees,
      status: formData?.status,
    };
    saveEventMutation.mutate(payload);
  };

  const handleEdit = (data) => {
    setFormData(data);
    setIsEventAddOpen(true);
    setIsEdit(true);
  };

  const handleEditSubmit = () => {
    const payload = {
      id: formData?.id,
      title: formData?.title,
      description: formData?.description,
      date: formData?.date,
      time: formData?.time,
      image_url: formData?.image_url,
      type: formData?.type,
      participants: formData?.participants,
      location: formData?.location,
      attendees: formData?.attendees,
      status: formData?.status,
      isActive: true,
    };
    updateEventMutation.mutate(payload);
  };

  const disabled = !isFormValid(eventFields, formData);

  return (
    <div className="space-y-6">
      <Loader isLoading={isLoading} />
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Events Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage temple events, festivals, and community activities
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => setIsEventAddOpen(true)}>
          <CalendarPlus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="pooja">Pooja</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground flex items-center">
              Showing {filteredEvents?.length} of {eventsData?.length} events
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents?.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                {getStatusBadge(event.status)}
                {getCategoryBadge(event.type)}
              </div>
            </div>

            <CardHeader>
              <CardTitle className="line-clamp-2">{event.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {event.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {formatDate(event.date)}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {event.time}
              </div>

              {event.participants && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {event.participants} participants
                </div>
              )}

              <div className="flex gap-2 pt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(event)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents?.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No events found matching your filters.
            </p>
          </CardContent>
        </Card>
      )}
      {isEventAddOpen ? (
        <Modal
          open={isEventAddOpen}
          onOpenChange={() => {
            setIsEventAddOpen(!isEventAddOpen);
            handleReset();
          }}
          title="Add gallery details">
          <div className="row">
            <FormFields
              fields={eventFields}
              formData={formData}
              setFormData={setFormData}
              wrapperClass={'grid grid-cols-2 gap-6'}
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

export default Events;
