import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

const routeTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/members': 'Community Members',
  '/admin/events': 'Events',
  '/admin/contacts': 'Contact Submissions',
  '/admin/sevas': 'Sevas & Offerings',
  '/admin/gallery': 'Gallery',
};

export function AdminHeader() {
  const location = useLocation();
  const currentTitle = routeTitles[location.pathname] || 'Admin';

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/admin/dashboard">
                Admin
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}