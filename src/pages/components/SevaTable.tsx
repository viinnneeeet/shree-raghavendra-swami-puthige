import ReusableTable from '@/components/ReuseableTable';
import { Button } from '@/components/ui/button';
import { Eye, Edit } from 'lucide-react';
import { formatAmount } from '@/utils/common-function';
import { Badge } from '@/components/ui/badge';

const getAvailabilityBadge = (availability: string) => {
  const badgeMap = {
    available: (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        Available
      </Badge>
    ),
    limited: (
      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        Limited
      </Badge>
    ),
    unavailable: <Badge variant="destructive">Unavailable</Badge>,
  };
  return (
    badgeMap[availability as keyof typeof badgeMap] || (
      <Badge variant="secondary">{availability}</Badge>
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
    annadana: (
      <Badge variant="outline" className="text-orange-600 border-orange-200">
        Annadana
      </Badge>
    ),
    decoration: (
      <Badge variant="outline" className="text-pink-600 border-pink-200">
        Decoration
      </Badge>
    ),
    maintenance: (
      <Badge variant="outline" className="text-blue-600 border-blue-200">
        Maintenance
      </Badge>
    ),
  };
  return (
    categoryMap[category as keyof typeof categoryMap] || (
      <Badge variant="outline">{category}</Badge>
    )
  );
};

export default function SevaTable({ filteredSevas, handleEdit }) {
  const columns = [
    {
      key: 'title',
      label: 'Service Name',
      render: (value) => <div className="font-medium">{value}</div>,
    },
    {
      key: 'description',
      label: 'Description',
      render: (value) => (
        <div className="max-w-sm text-sm line-clamp-2">{value}</div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (value) => getCategoryBadge(value),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => (
        <div className="font-semibold text-primary">
          {value ? formatAmount(+value) : '-'}
        </div>
      ),
    },
    {
      key: 'availability',
      label: 'Availability',
      render: (value) => getAvailabilityBadge(value),
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
      data={filteredSevas}
      actions={renderActions}
      rowsPerPage={5}
    />
  );
}
