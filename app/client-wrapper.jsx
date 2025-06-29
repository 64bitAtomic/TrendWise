'use client';
import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';

export default function ClientWrapper({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
      <Footer />
    </SessionProvider>
  );
}
