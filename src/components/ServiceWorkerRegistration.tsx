'use client';

import { useEffect } from 'react';

const ServiceWorkerRegistration: React.FC = () => {
    useEffect(() => {
        // Unregister and clear caches in development to avoid stale chunk caching
        if (
            typeof window !== 'undefined' &&
            'serviceWorker' in navigator &&
            process.env.NODE_ENV !== 'production' &&
            process.env.NEXT_PUBLIC_SERVICE_WORKER !== 'true'
        ) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((registration) => registration.unregister());
            });
            if ('caches' in window) {
                caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
            }
            return;
        }

        // Only register service worker in production or when explicitly enabled
        if (
            typeof window !== 'undefined' &&
            'serviceWorker' in navigator &&
            (process.env.NODE_ENV === 'production' ||
                process.env.NEXT_PUBLIC_SERVICE_WORKER === 'true')
        ) {
            const registerSW = async () => {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js');
                    console.log('Service Worker registered successfully:', registration);

                    // Handle service worker updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New service worker available
                                    console.log('New service worker available');

                                    // You can show a notification to the user here
                                    if (confirm('A new version is available. Reload to update?')) {
                                        window.location.reload();
                                    }
                                }
                            });
                        }
                    });

                    // Handle service worker errors
                    registration.addEventListener('error', (error) => {
                        console.error('Service Worker registration failed:', error);
                    });

                } catch (error) {
                    console.error('Service Worker registration failed:', error);
                }
            };

            registerSW();
        }
    }, []);

    // This component doesn't render anything
    return null;
};

export default ServiceWorkerRegistration;
