'use client';

import { notFound, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { subjects, provinces, googleFormLinks } from '@/data/moeys-data';
import type { Province } from '@/data/moeys-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Atom, Languages, ArrowRight, ChevronLeft } from 'lucide-react';

const subjectIcons: Record<string, React.ElementType> = {
    'Mathematics': BookOpen,
    'Physics': Atom,
    'Khmer Language': Languages,
};

export default function ProvincePage({ params }: { params: { province: string } }) {
    const searchParams = useSearchParams();
    const provinceName = params.province;
    const selectedDate = searchParams.get('date');

    const selectedProvince: Province | undefined = provinces.find(p => p.name === provinceName);

    if (!selectedProvince) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <header className="bg-card border-b border-border shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-24">
                        <Button asChild variant="ghost">
                            <Link href="/">
                                <ChevronLeft className="h-5 w-5 mr-2" />
                                ត្រឡប់ក្រោយ
                            </Link>
                        </Button>
                        <div className="flex items-center justify-center">
                            <Image
                                src="https://admin.fedrupp.org/images/1754726994.png"
                                alt="MoEYS Logo"
                                width={120}
                                height={120}
                                className="h-24 w-auto"
                            />
                        </div>
                        <div className="w-28"></div>
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-4xl">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-primary text-center text-2xl">មុខវិជ្ជាសម្រាប់ប្រឡង</CardTitle>
                            <CardDescription className="text-center text-base sm:text-lg">
                                សម្រាប់ {selectedProvince.name_km} {selectedDate ? ` - ${selectedDate}` : ''}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                                {subjects.map((subject) => {
                                    const Icon = subjectIcons[subject.name] || BookOpen;
                                    const linkKey = `${selectedProvince.name}-${subject.name}`;
                                    const formLink = googleFormLinks[linkKey] || '#';

                                    return (
                                        <div key={subject.name} className="group">
                                            <Button
                                                asChild
                                                size="lg"
                                                variant="outline"
                                                className="flex-col h-36 sm:h-40 p-5 sm:p-6 justify-center items-center gap-2 text-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:bg-primary/10 border-2 border-primary/20 w-full"
                                            >
                                                <Link href={formLink} target="_blank" rel="noopener noreferrer">
                                                    <Icon className="h-12 w-12 mb-2 text-primary transition-transform duration-300 group-hover:scale-110" />
                                                    <span className="font-semibold text-lg font-body">{subject.name_km}</span>
                                                    <span className="text-sm text-muted-foreground font-body">{subject.name}</span>
                                                    <div className="absolute bottom-3 right-3 flex items-center text-xs text-primary transition-opacity duration-300 opacity-0 group-hover:opacity-100 font-khmer">
                                                        <span>ចូលរួមប្រឡង</span>
                                                        <ArrowRight className="h-3 w-3 ml-1" />
                                                    </div>
                                                </Link>
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <footer className="py-6 text-center">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} MoEYS EdTech. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
