import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchSevaDetails } from '@/api/sevas';
import SevaCard from './components/SevaCard';
import { formatAmount, isFormValid } from '@/utils/common-function';
import SkeletonCard from '@/components/ui/SkeletonCard';
import Modal from '@/components/ui/Modal';
import { FormFields } from '@/components/Forms/FormFields';
import { useState } from 'react';
import { donationFormFields } from './constants';
import { genrateInvoiceDetails } from '@/api/invoice';
import { showToast } from '@/components/ShowToast';
import { queryClient } from '@/lib/react-query-client';
import { handleApiError } from '@/utils/common-function';

const SevasOfferings = () => {
  const { data = {}, isFetching: sevaIsFetching } = useQuery({
    queryKey: ['sevas'],
    queryFn: fetchSevaDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });

  const genrateInvoiceMutation = useMutation({
    mutationFn: genrateInvoiceDetails,
    onSuccess: (res) => {
      showToast('Success!', 'Invoice genrated successfully.', 'success');
      setIsDonateOpen(false);
      queryClient.invalidateQueries({ queryKey: ['invoice-genrate'] });
      setFormData({});
      window.open(res?.invoiceUrl, '_blank');
    },
    onError: (error) => handleApiError(error, 'Failed to save seva details'),
  });

  const { sevasList = [], pagination = {} } = data;
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedSeva, setSelectedSeva] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleClose = () => {
    setIsDonateOpen(!isDonateOpen);
  };

  const handleBook = (seva) => {
    setIsDonateOpen(true);
    setSelectedSeva(seva);
    setFormData((prev) => ({
      ...prev,
      seva: seva?.title,
      amount: formatAmount(seva?.amount),
    }));
  };

  const handleProceedToPay = () => {
    const date = new Date()?.toISOString().split('T')[0];
    const payload = {
      user: {
        name: formData?.fullName,
        email: formData?.email,
        phone: formData?.phone,
      },
      seva: {
        title: selectedSeva?.title,
        description: selectedSeva?.description,
        amount: selectedSeva?.amount,
        date: date,
      },
    };
    genrateInvoiceMutation.mutate(payload);
  };

  const isPayDisabled = !isFormValid(donationFormFields, formData);
  return (
    <section className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="lg:text-4xl md:text-8xl font-bold text-foreground mb-6">
            Sevas &
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3 lg:text-4xl md:text-8xl">
              Offerings
            </span>
          </h1>
          <p className="lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
            Participate in sacred services and make offerings to receive divine
            blessings and contribute to temple activities.
          </p>
        </div>

        {/* Sevas Section */}
        <div className="mb-16">
          <h2 className="font-bold text-center mb-8 text-temple-earth lg:text-3xl md:text-8xl">
            Sacred Sevas
          </h2>
          <div className="grid md:grid-cols-1 lg:px-0 md:px-8 lg:grid-cols-3 lg:gap-6 md:gap-12">
            {sevaIsFetching ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            ) : sevasList?.length ? (
              sevasList?.map((seva, index) => (
                <SevaCard seva={seva} key={index} handleBook={handleBook} />
              ))
            ) : (
              <p className="text-center text-muted-foreground col-span-full">
                No sevas available.
              </p>
            )}
          </div>
        </div>

        {/* Offerings Section */}
        <div>
          <h2 className="lg:text-3xl md:text-6xl font-bold text-center mb-8 text-temple-earth">
            {/* Donate Now */}
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-4 md:px-16 lg:px-0 md:gap-16 lg:gap-4"></div>
        </div>

        {/* Note about payments */}
        <Card className="mt-12 border-temple-gold/20 shadow-sacred">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="lg:text-xl  md:text-5xl font-semibold text-temple-earth mb-4">
                Online Payment Information
              </h3>
              <p className="text-muted-foreground mb-4 lg:text-sm md:text-4xl">
                Secure online payment processing will be available once our
                payment system is configured. For now, please visit the temple
                directly or contact us for donation arrangements.
              </p>
              <div className="flex justify-center space-x-4 md:mt-16 lg:mt-0">
                <Button
                  variant="outline"
                  className="border-temple-gold/30"
                  onClick={() => navigate('/#contact')}>
                  Contact Temple
                </Button>
                <Button variant="temple" onClick={() => navigate('/visit-us')}>
                  Visit Temple
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {isDonateOpen ? (
        <Modal
          open={isDonateOpen}
          onOpenChange={handleClose}
          title={`Donate for ${selectedSeva?.title}`}>
          <div className="lg:mt-4 md:mt-16">
            <FormFields
              fields={donationFormFields}
              formData={formData}
              setFormData={setFormData}
              wrapperClass="lg:space-y-6 md:space-y-12"
            />
          </div>
          <div className="lg:mt-4 md:mt-12 flex justify-between">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="temple"
              disabled={isPayDisabled}
              onClick={handleProceedToPay}
              className={isPayDisabled ? '!cursor-not-allowed' : ''}>
              {'Proceed to Pay'}
            </Button>
          </div>
        </Modal>
      ) : null}
    </section>
  );
};

export default SevasOfferings;
