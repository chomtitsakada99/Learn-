'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Home, Calculator, Atom, BookOpen, ExternalLink, Clock, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { provinces, subjects, googleFormLinks } from '@/data/moeys-data';

export default function SubjectsPage() {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [passOpen, setPassOpen] = useState(false);
    const [passInput, setPassInput] = useState('');
    const [passError, setPassError] = useState<string | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

    const subjectPasscodes: Record<string, string> = {
        'Khmer Language': '1808',
        'Mathematics': '0818',
        'Physics': '1308',
    };

    const provinceName = decodeURIComponent(params.province as string);
    const province = provinces.find(p => p.name === provinceName);

    if (!province) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">ខេត្តមិនត្រូវ</h1>
                    <Link href="/provinces">
                        <Button>ត្រឡប់ទៅជ្រើសរើសខេត្ត</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubjectClick = (subjectName: string) => {
        const linkKey = `${province.name}-${subjectName}`;
        const googleFormLink = googleFormLinks[linkKey];

        if (googleFormLink) {
            setSelectedSubject(subjectName);
            setPassInput('');
            setPassError(null);
            setPassOpen(true);
        } else {
            alert('តំណភ្ជាប់ទម្រង់ Google មិនទាន់មានទេ។ សូមទាក់ទងអ្នកគ្រប់គ្រង។');
        }
    };

    const handleConfirmPasscode = () => {
        const expected = selectedSubject ? subjectPasscodes[selectedSubject] : undefined;
        if (!/^\d{4}$/.test(passInput)) {
            setPassError('លេខសម្ងាត់ត្រូវមាន ៤ ខ្ទង់');
            return;
        }
        if (expected && passInput === expected && selectedSubject) {
            const key = `exam_pass_${province.name}_${selectedSubject}`;
            try {
                localStorage.setItem(key, 'ok');
            } catch { }
            setPassOpen(false);
            router.push(`/exam/${encodeURIComponent(province.name)}/${encodeURIComponent(selectedSubject)}`);
        } else {
            setPassError('លេខសម្ងាត់មិនត្រឹមត្រូវ។ សូមព្យាយាមម្ដងទៀត ឬទាក់ទង Telegram @geipapp');
        }
    };

    const getSubjectIcon = (subjectName: string) => {
        switch (subjectName) {
            case 'Mathematics':
                return <Calculator className="w-8 h-8 text-blue-600" />;
            case 'Physics':
                return <Atom className="w-8 h-8 text-green-600" />;
            case 'Khmer Language':
                return <BookOpen className="w-8 h-8 text-purple-600" />;
            default:
                return <BookOpen className="w-8 h-8 text-gray-600" />;
        }
    };

    const getSubjectColor = (subjectName: string) => {
        switch (subjectName) {
            case 'Mathematics':
                return 'hover:bg-blue-50 border-blue-200 hover:border-blue-300';
            case 'Physics':
                return 'hover:bg-green-50 border-green-200 hover:border-green-300';
            case 'Khmer Language':
                return 'hover:bg-purple-50 border-purple-200 hover:border-purple-300';
            default:
                return 'hover:bg-gray-50 border-gray-200 hover:border-gray-300';
        }
    };

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
                <div className="w-full max-w-4xl">
                    <Card className="shadow-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="font-headline text-primary text-3xl mb-2">
                                ជ្រើសរើសមុខវិជ្ជា
                            </CardTitle>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-foreground mb-2">
                                    {province.name_km}
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    {province.name}
                                </p>
                            </div>
                            <p className="text-muted-foreground text-lg mt-4">
                                ជ្រើសរើសមុខវិជ្ជាដែលអ្នកចង់ប្រឡងតេស្ត
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                {subjects.map((subject) => {
                                    const linkKey = `${province.name}-${subject.name}`;
                                    const googleFormLink = googleFormLinks[linkKey];
                                    const hasLink = !!googleFormLink;

                                    return (
                                        <Card
                                            key={subject.name}
                                            className={`transition-all duration-300 transform sm:hover:scale-105 cursor-pointer ${getSubjectColor(subject.name)} ${hasLink ? 'hover:shadow-lg' : 'opacity-60'
                                                }`}
                                            onClick={() => hasLink && handleSubjectClick(subject.name)}
                                        >
                                            <CardContent className="p-4 sm:p-6 text-center">
                                                <div className="flex justify-center mb-4">
                                                    <div className="bg-gray-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center">
                                                        {getSubjectIcon(subject.name)}
                                                    </div>
                                                </div>
                                                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 sm:mb-2">
                                                    {subject.name_km}
                                                </h3>
                                                <p className="hidden sm:block text-sm sm:text-base text-muted-foreground mb-4">
                                                    {subject.name}
                                                </p>
                                                <div className="flex items-center justify-center gap-2 mb-4">
                                                    <Badge variant="outline" className="text-xs">
                                                        <Clock className="h-3 w-3 mr-1" /> {subject.duration_km}
                                                    </Badge>
                                                    <Badge variant="outline" className="text-xs">
                                                        <Trophy className="h-3 w-3 mr-1" /> {subject.score_km}
                                                    </Badge>
                                                </div>
                                                {hasLink ? (
                                                    <Button
                                                        className="w-full min-h-[44px] sm:min-h-[40px] text-sm sm:text-base px-4 py-2"
                                                        onClick={() => handleSubjectClick(subject.name)}
                                                        disabled={isLoading === subject.name}
                                                    >
                                                        {isLoading === subject.name ? (
                                                            'កំពុងផ្ទុក...'
                                                        ) : (
                                                            <>
                                                                <span className="hidden sm:inline">ចាប់ផ្ដើមប្រឡងតេស្ត</span>
                                                                <span className="sm:hidden">ប្រឡងតេស្ត</span>
                                                                <ExternalLink className="ml-2 h-4 w-4" />
                                                            </>
                                                        )}
                                                    </Button>
                                                ) : (
                                                    <Button variant="outline" className="w-full min-h-[44px] sm:min-h-[40px] text-sm sm:text-base px-4 py-2" disabled>
                                                        កំពុងរៀបចំ
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Instructions */}
                            <div className="mt-8 bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                                    ការណែនាំ
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                                        <span>ជ្រើសរើសមុខវិជ្ជាដែលអ្នកចង់ប្រឡង</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                                        <span>ចាប់ផ្ដើមប្រឡងតេស្តតាមប្រព័ន្ធប្រឡងគម្រោង GEIP</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                                        <span>ឆ្លើយសំណួរទាំងអស់ និងដាក់ស្នើចម្លើយ</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Passcode Dialog */}
                    <Dialog open={passOpen} onOpenChange={setPassOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="font-khmer">បញ្ចូលលេខសម្ងាត់ (៤ ខ្ទង់)</DialogTitle>
                                <DialogDescription className="font-khmer">សូមបញ្ចូលលេខសម្ងាត់ដើម្បីចូលប្រឡងតេស្ត</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                                <Input
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="\\d{4}"
                                    maxLength={4}
                                    placeholder="••••"
                                    value={passInput}
                                    onChange={(e) => {
                                        setPassInput(e.target.value.replace(/[^0-9]/g, ''));
                                        setPassError(null);
                                    }}
                                    autoFocus
                                    autoComplete="one-time-code"
                                    enterKeyHint="done"
                                    className="text-center text-3xl sm:text-2xl tracking-widest py-4"
                                    aria-label="Passcode"
                                />
                                {passError && (
                                    <p className="text-sm text-red-600 font-khmer">{passError} <a href="https://t.me/geipapp" target="_blank" rel="noopener noreferrer" className="underline">@geipapp</a></p>
                                )}
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setPassOpen(false)} className="font-khmer">បោះបង់</Button>
                                <Button onClick={handleConfirmPasscode} className="font-khmer">បន្ត</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
