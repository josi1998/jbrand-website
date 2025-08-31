"use client";
import { useEffect } from 'react';

// Extend Window interface for Tawk.to globals
declare global {
  interface Window {
    Tawk_API?: unknown;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkToChat({ locale }: { locale: string }) {
  useEffect(() => {
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Tawk.to script
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/682da58c69c2a0190cadae60/1irp4tcbj';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    }

    return () => {
      // Cleanup script when component unmounts
      if (s1.parentNode) {
        s1.parentNode.removeChild(s1);
      }
      // Clean up Tawk_API to avoid persistence across pages
      delete window.Tawk_API;
    };
  }, [locale]);

  return null; // This component doesn't render anything visible
} 




