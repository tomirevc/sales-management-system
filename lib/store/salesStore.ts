// lib/store/salesStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Sale, SaleStatus, User } from '@/lib/types';

interface SalesState {
  sales: Sale[];
  user: User | null;
  isAuthenticated: boolean;
  
  // Auth actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Sales actions
  addSale: (sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSale: (id: string, updates: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
  updateSaleStatus: (id: string, status: SaleStatus) => void;
  updateMultipleSalesStatus: (ids: string[], status: SaleStatus) => void;
  
  // Getters
  getPendingSales: () => Sale[];
  getApprovedSales: () => Sale[];
  getAnnulledSales: () => Sale[];
  getSalesByAsesor: (asesor: string) => Sale[];
}

// Credenciales estáticas (puedes cambiarlas)
const VALID_CREDENTIALS = {
  email: 'admin@sistema.com',
  password: 'admin123'
};

export const useSalesStore = create<SalesState>()(
  persist(
    (set, get) => ({
      sales: [],
      user: null,
      isAuthenticated: false,

      // Auth
      login: (email: string, password: string) => {
        if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
          set({ 
            isAuthenticated: true,
            user: { email, name: 'Administrador' }
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      // Sales CRUD
      addSale: (saleData) => {
        const newSale: Sale = {
          ...saleData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ sales: [...state.sales, newSale] }));
      },

      updateSale: (id, updates) => {
        set((state) => ({
          sales: state.sales.map((sale) =>
            sale.id === id
              ? { ...sale, ...updates, updatedAt: new Date().toISOString() }
              : sale
          ),
        }));
      },

      deleteSale: (id) => {
        set((state) => ({
          sales: state.sales.filter((sale) => sale.id !== id),
        }));
      },

      updateSaleStatus: (id, status) => {
        get().updateSale(id, { estado: status });
      },

      updateMultipleSalesStatus: (ids, status) => {
        set((state) => ({
          sales: state.sales.map((sale) =>
            ids.includes(sale.id)
              ? { ...sale, estado: status, updatedAt: new Date().toISOString() }
              : sale
          ),
        }));
      },

      // Getters
      getPendingSales: () => {
        return get().sales.filter((sale) => sale.estado === 'pendiente');
      },

      getApprovedSales: () => {
        return get().sales.filter((sale) => sale.estado === 'aprobada');
      },

      getAnnulledSales: () => {
        return get().sales.filter((sale) => sale.estado === 'anulada');
      },

      getSalesByAsesor: (asesor) => {
        return get().sales.filter((sale) => sale.asesor === asesor);
      },
    }),
    {
      name: 'sales-storage',
      partialize: (state) => ({ 
        sales: state.sales,
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
