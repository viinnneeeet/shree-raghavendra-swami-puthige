import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, IndianRupee, Search } from 'lucide-react';
import React, { useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { fetchInvoiceDetails } from '@/api/invoice';
import DonationsTable from '../components/DonationsTable';
import { formatAmount } from '@/utils/common-function';
import { fetchSevaDetails } from '@/api/sevas';
const Donations = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const debouncedSearch = useDebounce(search, 1000);

  const { data = {}, isFetching } = useQuery({
    queryKey: [
      'invoice-details-list',
      { page, limit, filters, search: debouncedSearch },
    ],
    queryFn: fetchInvoiceDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

  const { data: allInvoiceListData = {} } = useQuery({
    queryKey: ['invoice-details'],
    queryFn: fetchInvoiceDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

  const { data: sevaData = {}, isFetching: isFetchingSeva } = useQuery({
    queryKey: ['sevas'],
    queryFn: fetchSevaDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });

  const { invoiceList = [], pagination = {} } = data;
  const { invoiceList: allInvoiceList = [] } = allInvoiceListData;
  const { sevasList = [] } = sevaData;

  function getAvailabilityCounts(data) {
    return data?.reduce((acc, item) => {
      const status = item.availability?.toLowerCase() || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }

  const statusData = getAvailabilityCounts(sevasList?.length ? sevasList : []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Sevas & Donations
          </h1>
          <p className="text-muted-foreground">
            Manage temple services, donations, and spiritual offerings
          </p>
        </div>
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
              {statusData?.available ?? 0}
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
              {statusData?.limited ?? 0}
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
              {statusData?.unavailable ?? 0}
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
              {invoiceList?.length
                ? formatAmount(
                    allInvoiceList?.reduce(
                      (sum, seva) => sum + +seva?.sevaAmount,
                      0
                    )
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
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sevas Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Sevas & Donations</CardTitle>
          <CardDescription>
            Complete list of available services with pricing and booking status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <DonationsTable
              data={invoiceList}
              handleEdit={() => {}}
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
    </div>
  );
};

export default Donations;
