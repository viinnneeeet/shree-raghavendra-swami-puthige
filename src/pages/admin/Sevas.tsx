import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Heart, Plus, Edit, Eye, IndianRupee } from 'lucide-react';
import { dummySevas } from '@/data/dummyData';
import { Seva } from '@/types/admin';

const Sevas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterAvailability, setFilterAvailability] = useState<string>('all');
  const [sevas] = useState<Seva[]>(dummySevas);

  const filteredSevas = sevas.filter(seva => {
    const matchesSearch = seva.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seva.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || seva.category === filterCategory;
    const matchesAvailability = filterAvailability === 'all' || seva.availability === filterAvailability;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const getAvailabilityBadge = (availability: string) => {
    const badgeMap = {
      available: <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Available</Badge>,
      limited: <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Limited</Badge>,
      unavailable: <Badge variant="destructive">Unavailable</Badge>,
    };
    return badgeMap[availability as keyof typeof badgeMap] || <Badge variant="secondary">{availability}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const categoryMap = {
      pooja: <Badge variant="outline" className="text-purple-600 border-purple-200">Pooja</Badge>,
      annadana: <Badge variant="outline" className="text-orange-600 border-orange-200">Annadana</Badge>,
      decoration: <Badge variant="outline" className="text-pink-600 border-pink-200">Decoration</Badge>,
      maintenance: <Badge variant="outline" className="text-blue-600 border-blue-200">Maintenance</Badge>,
    };
    return categoryMap[category as keyof typeof categoryMap] || <Badge variant="outline">{category}</Badge>;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getAvailabilityCounts = () => {
    return {
      available: sevas.filter(s => s.availability === 'available').length,
      limited: sevas.filter(s => s.availability === 'limited').length,
      unavailable: sevas.filter(s => s.availability === 'unavailable').length,
    };
  };

  const availabilityCounts = getAvailabilityCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Sevas & Offerings</h1>
          <p className="text-muted-foreground">Manage temple services, donations, and spiritual offerings</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
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
            <div className="text-2xl font-bold text-green-600">{availabilityCounts.available}</div>
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
            <div className="text-2xl font-bold text-yellow-600">{availabilityCounts.limited}</div>
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
            <div className="text-2xl font-bold text-red-600">{availabilityCounts.unavailable}</div>
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
              {formatAmount(sevas.reduce((sum, seva) => sum + seva.amount, 0))}
            </div>
            <p className="text-sm text-muted-foreground">All offerings combined</p>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
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

            <Select value={filterAvailability} onValueChange={setFilterAvailability}>
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
              Showing {filteredSevas.length} of {sevas.length} sevas
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSevas.map((seva) => (
                  <TableRow key={seva.id}>
                    <TableCell>
                      <div className="font-medium">{seva.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-sm">
                        <p className="text-sm line-clamp-2">{seva.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(seva.category)}</TableCell>
                    <TableCell>
                      <div className="font-semibold text-primary">
                        {formatAmount(seva.amount)}
                      </div>
                    </TableCell>
                    <TableCell>{getAvailabilityBadge(seva.availability)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSevas.length === 0 && (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No sevas found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Sevas;