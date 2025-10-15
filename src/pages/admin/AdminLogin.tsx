import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/user';
import { showToast } from '@/components/ShowToast';
import { queryClient } from '@/lib/react-query-client';
import { handleApiError } from '@/utils/common-function';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { handleAuthentication } = useAdmin();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      handleAuthentication(res?.user, res?.token);
      navigate('/admin/dashboard', { replace: true });
      showToast('Success!', 'User logged in', 'success');
      queryClient.invalidateQueries({ queryKey: ['login'] });
    },
    onError: (error) => {
      setError(error?.message as string);
      handleApiError(error, 'Failed to update event');
    },
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Temple Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-temple-gold to-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-heading text-foreground mb-2">
            Temple Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Secure access to temple management
          </p>
        </div>

        <Card className="border-temple-gold/20 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-heading text-center">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@temple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); // prevent form submit if inside a form
                        if (email && password) {
                          loginMutation.mutate({ email, password });
                        }
                      }
                    }}
                    required
                    className="border-border focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  loginMutation.mutate({ email, password });
                }}
                disabled={!email || !password}>
                {'Login'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
