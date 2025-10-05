import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Users,
  Calendar,
  MessageSquare,
  Heart,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { dummyMembers, dummyContactSubmissions } from '@/data/dummyData';
import { fetchEvents } from '@/api/events';
import { useQuery } from '@tanstack/react-query';
import { fetchSevaDetails } from '@/api/sevas';

const Dashboard = () => {
  const { data: eventsData } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });
  const { data: sevaDetails } = useQuery({
    queryKey: ['sevas'],
    queryFn: fetchSevaDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });
  const stats = [
    {
      title: 'Community Members',
      value: dummyMembers.length,
      description: `${
        dummyMembers.filter((m) => m.status === 'active').length
      } active members`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Upcoming Events',
      value: eventsData?.length
        ? eventsData?.filter((e) => e?.status === 'upcoming')?.length
        : [],
      description: 'Events this month',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Contact Submissions',
      value: dummyContactSubmissions.filter((c) => c.status === 'new').length,
      description: 'New inquiries',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Available Sevas',
      value: sevaDetails?.length
        ? sevaDetails?.filter((s) => s.availability === 'available').length
        : [],
      description: 'Ready for booking',
      icon: Heart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const recentActivities = [
    { action: 'New member joined', user: 'Priya Sharma', time: '2 hours ago' },
    { action: 'Event registered', user: 'Yoga Session', time: '4 hours ago' },
    {
      action: 'Contact form submitted',
      user: 'Sita Reddy',
      time: '6 hours ago',
    },
    { action: 'Seva booked', user: 'Annadana Service', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Welcome to Temple Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your temple community, events, and services from this central
          hub.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats?.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat?.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat?.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat?.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat?.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates from your temple management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities?.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity?.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity?.user}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity?.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Quick Overview
            </CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Total Donations This Month
                </span>
                <span className="font-semibold text-foreground">₹1,25,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Events Completed
                </span>
                <span className="font-semibold text-foreground">
                  {eventsData?.filter((e) => e.status === 'completed')?.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Active Members
                </span>
                <span className="font-semibold text-foreground">
                  {dummyMembers.filter((m) => m.status === 'active').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Gallery Images
                </span>
                <span className="font-semibold text-foreground">6</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
