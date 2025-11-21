// components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Upload,
  Eye,
  List,
  FileX,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { useSalesStore } from '@/lib/store/salesStore';
import { Button } from '@/components/ui/button';

const menuItems = [
  { name: 'INICIO', icon: Home, href: '/dashboard/inicio' },
  { name: 'SUBIR', icon: Upload, href: '/dashboard/ventas/subir' },
  { name: 'SEGUIMIENTO', icon: Eye, href: '/dashboard/ventas/seguimiento' },
  { name: 'TODO', icon: List, href: '/dashboard/ventas/todo' },
  { name: 'ANULADAS', icon: FileX, href: '/dashboard/ventas/anuladas' },
  { name: 'REPORTES', icon: BarChart3, href: '/dashboard/reportes' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useSalesStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      {/* Logo / Header */}
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-primary">Sistema Ventas</h1>
        <p className="text-sm text-muted-foreground mt-1">{user?.name}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
