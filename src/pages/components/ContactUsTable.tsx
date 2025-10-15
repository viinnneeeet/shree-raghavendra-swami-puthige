import { Button } from '@/components/ui/button';
import { Mail, Phone, Clock, Eye, MessageCircle } from 'lucide-react';
import { formatDateTime } from '@/utils/common-function';
import ReusableTable from '@/components/ReuseableTable';
import { Badge } from '@/components/ui/badge';
// assuming you have this helper

export default function ContactsUsTable({
  data,
  isLoading,
  pagination,
  onPageChange,
  handleView,
  handleReply,
}) {
  const columns = [
    {
      key: 'contactDetails',
      label: 'Contact Details',
      render: (_, contact) => (
        <div className="space-y-1">
          <div className="font-medium">
            {contact.firstName} {contact?.lastName}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Mail className="w-3 h-3" />
            {contact?.email}
          </div>
          {contact.phone && (
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {contact.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'messages',
      label: 'Message',
      render: (value) => (
        <div className="max-w-xs">
          <p className="text-sm line-clamp-3">{value}</p>
        </div>
      ),
    },
    {
      key: 'replyMessage',
      label: 'Reply Message',
      render: (value) => (
        <div className="max-w-xs">
          <p className="text-sm line-clamp-3">{value}</p>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Submitted',
      render: (value) => (
        <div className="text-sm flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDateTime(value)}
        </div>
      ),
    },
    {
      key: 'repliedAt',
      label: 'Replied At',
      render: (value) => (
        <div className="text-sm flex items-center gap-1">
          {value ? <Clock className="w-3 h-3" /> : '-'}
          {formatDateTime(value)}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => getStatusBadge(value),
    },
  ];

  const getStatusBadge = (status: string) => {
    const badgeMap = {
      new: (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          New
        </Badge>
      ),
      'in-progress': (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          In Progress
        </Badge>
      ),
      resolved: (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          Resolved
        </Badge>
      ),
    };
    return (
      badgeMap[status as keyof typeof badgeMap] || (
        <Badge variant="secondary">{status}</Badge>
      )
    );
  };
  const renderActions = (contact) => (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => handleView(contact)}>
        <Eye className="w-4 h-4 mr-1" /> View
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleReply(contact)}>
        <MessageCircle className="w-4 h-4 mr-1" /> Reply
      </Button>
    </div>
  );

  return (
    <ReusableTable
      columns={columns}
      data={data}
      actions={renderActions}
      pagination={pagination}
      isLoading={isLoading}
      onPageChange={onPageChange}
    />
  );
}
