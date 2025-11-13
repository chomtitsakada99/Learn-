'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { provinces } from '@/data/moeys-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MapPin, Search, ArrowLeft, Home } from 'lucide-react';

export default function ProvincesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProvinces = useMemo(() => {
        if (!searchQuery) {
            return provinces;
        }
        return provinces.filter(
            (province) =>
                province.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                province.name_km.includes(searchQuery)
        );
    }, [searchQuery]);

    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            {/* Header */}
            <header className="bg-card border-b border-border shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-24">
                        <div className="flex items-center space-x-4">
                            <Link href="/welcome">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    ត្រឡប់
                                </Button>
                            </Link>
                            <div className="flex items-center justify-center">
                            <Image
                                src="/moeys-logo.png"
                                alt="MoEYS Logo"
                                width={80}
                                height={80}
                                className="h-20 w-auto"
                                priority
                            />
                        </div>
                        </div>
                        <div className="w-32"></div> {/* Spacer for centering */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Link href="/welcome">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 sm:px-4 py-2 sm:py-2 min-h-[40px] sm:min-h-[36px] text-sm sm:text-base">
                                    <Home className="h-4 w-4 mr-1 sm:mr-2" />
                                    <span className="hidden sm:inline">ទំព័រដើម</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-5xl">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-primary text-center text-3xl mb-2">
                                ជ្រើសរើសខេត្តរបស់អ្នក
                            </CardTitle>
                            <p className="text-center text-muted-foreground text-lg">
                                ជ្រើសរើសខេត្តដែលអ្នកចង់ប្រឡងតេស្ត
                            </p>
                            <div className="relative mt-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="ស្វែងរកខេត្ត ឬលេខខេត្ត..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12 sm:h-10 text-base sm:text-sm"
                                    aria-label="Search province"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[calc(100dvh-22rem)]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {filteredProvinces.map((province, index) => (
                                        <Button
                                            key={province.name}
                                            asChild
                                            size="lg"
                                            variant="outline"
                                            className="h-auto p-3 sm:p-4 justify-start transition-all duration-200 hover:bg-primary/10 hover:shadow-md min-h-[60px] sm:min-h-[72px]"
                                        >
                                            <Link href={`/subjects/${encodeURIComponent(province.name)}`}>
                                                <div className="flex items-center w-full">
                                                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 flex-shrink-0">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="font-body font-bold text-base sm:text-lg">{province.name_km}</div>
                                                        <div className="text-xs sm:text-sm text-muted-foreground">{province.name}</div>
                                                    </div>
                                                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary ml-2 flex-shrink-0" />
                                                </div>
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} MoEYS EdTech. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
