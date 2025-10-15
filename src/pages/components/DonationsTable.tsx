import ReusableTable from '@/components/ReuseableTable';
import { Button } from '@/components/ui/button';
import { Eye, Edit } from 'lucide-react';
import { formatAmount, formatDateTime } from '@/utils/common-function';

export default function DonationsTable({
  data,
  handleEdit,
  isLoading,
  pagination,
  onPageChange,
}) {
  const columns = [
    {
      key: 'userName',
      label: 'Full Name',
      render: (value) => <div className="font-medium">{value}</div>,
    },
    {
      key: 'userEmail',
      label: 'Email',
      render: (value) => <div className="font-medium">{value}</div>,
    },
    {
      key: 'sevaTitle',
      label: 'Service Name',
      render: (value) => <div className="font-medium">{value}</div>,
    },
    {
      key: 'sevaDescription',
      label: 'Description',
      render: (value) => (
        <div className="max-w-sm text-sm line-clamp-2">{value}</div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (value) => (
        <div className="max-w-sm text-sm line-clamp-2">
          {formatDateTime(value)}
        </div>
      ),
    },
    {
      key: 'sevaAmount',
      label: 'Amount',
      render: (value) => (
        <div className="font-semibold text-primary">
          {value ? formatAmount(+value) : '-'}
        </div>
      ),
    },
  ];

  const renderActions = (seva) => (
    <>
      <Button variant="outline" size="sm">
        <Eye className="w-4 h-4 mr-1" /> View
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleEdit(seva)}>
        <Edit className="w-4 h-4 mr-1" /> Edit
      </Button>
    </>
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
