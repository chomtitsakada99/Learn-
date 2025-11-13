'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, AlertCircle, ExternalLink, BookOpen, ZoomIn, ZoomOut, Maximize2, Minimize2, RotateCw, ArrowUpDown } from 'lucide-react';
import ExamTimer, { ExamTimerCompact } from '@/components/ExamTimer';
import { Badge } from '@/components/ui/badge';
import { provinces, subjects, googleFormLinks } from '@/data/moeys-data';

export default function ExamPage() {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeError, setIframeError] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isTall, setIsTall] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const provinceName = decodeURIComponent(params.province as string);
    const subjectName = decodeURIComponent(params.subject as string);

    const province = provinces.find(p => p.name === provinceName);
    const subject = subjects.find(s => s.name === subjectName);
    const linkKey = `${provinceName}-${subjectName}`;
    const googleFormLink = googleFormLinks[linkKey];
    const baseEmbedUrl = useMemo(() => googleFormLink?.replace('?usp=dialog', '?embedded=true&usp=pp_url') || '', [googleFormLink]);
    const [iframeSrc, setIframeSrc] = useState(baseEmbedUrl);

    useEffect(() => {
        if (!province || !subject) {
            setError('ខេត្ត ឬ មុខវិជ្ជា មិនត្រឹមត្រូវ');
            setIsLoading(false);
            return;
        }

        if (!googleFormLink) {
            setError('តំណភ្ជាប់ទម្រង់ Google មិនទាន់មានទេ។ សូមទាក់ទងអ្នកគ្រប់គ្រង។');
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        setIframeSrc(baseEmbedUrl);
    }, [province, subject, googleFormLink, baseEmbedUrl]);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
        setIframeError(false);
    };

    const handleIframeError = () => {
        setIframeError(true);
    };

    const handleZoomIn = () => setZoomLevel((z) => Math.min(1.5, parseFloat((z + 0.1).toFixed(2))));
    const handleZoomOut = () => setZoomLevel((z) => Math.max(0.8, parseFloat((z - 0.1).toFixed(2))));
    const handleZoomReset = () => setZoomLevel(1);

    const handleReload = () => {
        setIframeLoaded(false);
        const ts = Date.now();
        setIframeSrc(`${baseEmbedUrl}${baseEmbedUrl.includes('?') ? '&' : '?'}ts=${ts}`);
    };

    const toggleFullscreen = async () => {
        const node = containerRef.current;
        if (!node) return;
        try {
            if (!document.fullscreenElement) {
                await node.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch { }
    };

    const openInNewTab = () => {
        if (googleFormLink) window.open(googleFormLink, '_blank', 'noopener,noreferrer');
    };

    const containerStyle = useMemo(() => ({ height: isTall ? '150dvh' : 'calc(100dvh - 200px)' }), [isTall]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">កំពុងផ្ទុក...</p>
                </div>
            </div>
        );
    }

    if (error || !province || !subject || !googleFormLink) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="max-w-md mx-4">
                    <CardHeader className="text-center">
                        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <CardTitle className="text-xl text-red-600">មានបញ្ហា</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground mb-6 font-khmer">{error || 'តំណភ្ជាប់ទម្រង់ Google មិនទាន់មានទេ'}</p>
                        <div className="space-y-3">
                            <Link href={`/subjects/${encodeURIComponent(provinceName)}`}>
                                <Button className="w-full">ត្រឡប់ទៅជ្រើសរើសមុខវិជ្ជា</Button>
                            </Link>
                            <Link href="/provinces">
                                <Button variant="outline" className="w-full">ត្រឡប់ទៅជ្រើសរើសខេត្ត</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Gate access by passcode set in subjects page
    try {
        const key = `exam_pass_${provinceName}_${subjectName}`;
        if (typeof window !== 'undefined' && !localStorage.getItem(key)) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <Card className="max-w-md mx-4">
                        <CardHeader className="text-center">
                            <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                            <CardTitle className="text-xl text-amber-700 font-khmer">តម្រូវលេខសម្ងាត់</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-3">
                            <p className="text-muted-foreground font-khmer">សូមត្រឡប់ទៅទំព័រ​ជ្រើសរើសមុខវិជ្ជា ដើម្បីបញ្ចូលលេខសម្ងាត់។</p>
                            <div className="flex gap-2 justify-center">
                                <Link href={`/subjects/${encodeURIComponent(provinceName)}`}>
                                    <Button>{'ត្រឡប់ទៅមុខវិជ្ជា'}</Button>
                                </Link>
                                <a href="https://t.me/geipapp" target="_blank" rel="noopener noreferrer" className="inline-flex">
                                    <Button variant="outline">Telegram @geipapp</Button>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        }
    } catch { }

    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur border-b border-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Link href={`/subjects/${encodeURIComponent(provinceName)}`}>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 sm:px-4 py-2 sm:py-2 min-h-[40px] sm:min-h-[36px] text-sm sm:text-base">
                                    <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                                    <span className="hidden sm:inline">ត្រឡប់</span>
                                </Button>
                            </Link>
                            <Link href="/welcome">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 sm:px-4 py-2 sm:py-2 min-h-[40px] sm:min-h-[36px] text-sm sm:text-base">
                                    <Home className="h-4 w-4 mr-1 sm:mr-2" />
                                    <span className="hidden sm:inline">ទំព័រដើម</span>
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <Image
                                src="/moeys-logo.png"
                                alt="និមិត្តសញ្ញា ក្រសួងអប់រំ"
                                width={60}
                                height={60}
                                className="h-15 w-auto"
                                priority
                            />
                        </div>
                        <div className="hidden sm:flex items-center justify-end w-48">
                            {subject && (
                                <ExamTimerCompact subject={subject} className="mr-2" />
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Exam Info */}
            <div className="bg-blue-50/60 border-b border-blue-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="text-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 flex items-center justify-center gap-3">
                            <span>ប្រឡងតេស្ត {subject.name_km}</span>
                            <Badge variant="secondary" className="text-sm">
                                ពិន្ទុអតិបរមា: {subject.score_km}
                            </Badge>
                        </h1>
                        <p className="text-blue-700 text-sm sm:text-base">
                            ខេត្ត: {province.name_km} ({province.name})
                        </p>
                        <p className="hidden sm:block text-blue-600 text-sm mt-1">មុខវិជ្ជា: {subject.name}</p>
                    </div>
                </div>
            </div>

            {/* Main Content - Google Form Embed */}
            <main className="flex-1 container mx-auto p-4">
                <div className="max-w-6xl mx-auto">
                    {/* Exam Header Card */}
                    <Card className="shadow-lg mb-6 border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                                ប្រឡងតេស្តតាមប្រព័ន្ធប្រឡងគម្រោង GEIP
                            </CardTitle>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href={googleFormLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    បើកក្នុងផ្ទាំងថ្មី
                                </a>
                                <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                                    ប្រឡងតេស្ត {subject.name_km}
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Main Exam Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Left Sidebar - Timer, Instructions & Help */}
                        <div className="lg:col-span-1 space-y-4">
                            {/* Exam Timer */}
                            {subject && (
                                <ExamTimer
                                    subject={subject}
                                    onTimeUp={() => {
                                        // Optionally handle time up (e.g., notify user)
                                    }}
                                />
                            )}

                            <Card className="shadow-md border-0 bg-amber-50 border-amber-200">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-semibold text-amber-800 flex items-center">
                                        <AlertCircle className="mr-2 h-5 w-5 text-amber-600" />
                                        បើមិនអាចប្រឡងតេស្តបាន
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-2 text-sm text-amber-700">
                                        <p>• ប្រើប្រាស់ប៊្រូសែរ Chrome, Firefox, ឬ Safari ថ្មីៗ</p>
                                        <p>• ចូលគណនី Gmail ក្នុងកម្មវិធីរុករកនេះមុនពេលប្រឡង</p>
                                        <p>• ប្រសិនបើ Google ស្នើចូលគណនីក្នុងផ្ទាំងថ្មី សូមចុច “បើកក្នុងផ្ទាំងថ្មី” ខាងលើ</p>
                                        <p>• ប្តូរទៅផ្ទាំងថ្មី ឬប្រើប្រាស់ឧបករណ៍ចល័ត</p>
                                        <p>• ត្រឡប់ទៅជ្រើសរើសមុខវិជ្ជាផ្សេង</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Side - Google Form Embed */}
                        <div className="lg:col-span-3">
                            <Card className="shadow-lg border-0 bg-white h-full">
                                <CardContent className="p-0">
                                    {/* Toolbar */}
                                    <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b bg-gray-50">
                                        <div className="text-sm text-gray-600 font-khmer w-full sm:w-auto text-center sm:text-left">
                                            ប្រសិនបើអក្សរតូច សូមពង្រីក ឬបើកក្នុងផ្ទាំងថ្មី
                                        </div>

                                        <div className="flex flex-wrap items-center justify-center gap-1 w-full sm:w-auto">
                                            <Button variant="outline" size="sm" className="min-w-9" onClick={handleZoomOut} title="បង្រួម">
                                                <ZoomOut className="h-4 w-4" />
                                            </Button>

                                            <Button variant="outline" size="sm" className="min-w-12" onClick={handleZoomReset} title="កំណត់ឡើងវិញ">
                                                {Math.round(zoomLevel * 100)}%
                                            </Button>

                                            <Button variant="outline" size="sm" className="min-w-9" onClick={handleZoomIn} title="ពង្រីក">
                                                <ZoomIn className="h-4 w-4" />
                                            </Button>

                                            <Button variant="outline" size="sm" className="min-w-9" onClick={handleReload} title="ផ្ទុកឡើងវិញ">
                                                <RotateCw className="h-4 w-4" />
                                            </Button>

                                            <Button variant="outline" size="sm" className="min-w-9" onClick={toggleFullscreen} title="ពេញអេក្រង់">
                                                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                                            </Button>

                                            <Button variant="default" size="sm" className="min-w-9" onClick={openInNewTab} title="បើកក្នុងផ្ទាំងថ្មី">
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>

                                            <Button variant="outline" size="sm" className="min-w-9" onClick={() => setIsTall((t) => !t)} title="បម្លែងកម្ពស់">
                                                <ArrowUpDown className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>


                                    <div ref={containerRef} className="w-full relative bg-white" style={containerStyle}>
                                        {/* Loading State */}
                                        {!iframeLoaded && !iframeError && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
                                                <div className="text-center">
                                                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                                    <p className="text-lg text-gray-600 font-medium">កំពុងផ្ទុកប្រឡងតេស្ត...</p>
                                                    <p className="text-sm text-gray-500 mt-2">សូមរង់ចាំខ្លី</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Error State */}
                                        {iframeError && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
                                                <div className="text-center p-6">
                                                    <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                                                    <h3 className="text-xl font-semibold text-red-800 mb-2">មានបញ្ហាក្នុងការផ្ទុកប្រឡងតេស្ត</h3>
                                                    <p className="text-red-600 mb-4">សូមព្យាយាមប្រើប្រាស់ផ្ទាំងថ្មី</p>
                                                    <a
                                                        href={googleFormLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                                                    >
                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                        បើកក្នុងផ្ទាំងថ្មី
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {/* Google Form Iframe */}
                                        <iframe
                                            src={iframeSrc}
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            marginHeight={0}
                                            marginWidth={0}
                                            title={`ប្រឡង ${subject.name_km} នៅ ${province.name_km}`}
                                            className="rounded-none"
                                            allow="camera; microphone; geolocation; clipboard-read; clipboard-write; fullscreen; web-share"
                                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            onLoad={handleIframeLoad}
                                            onError={handleIframeError}
                                            style={{
                                                display: iframeLoaded && !iframeError ? 'block' : 'none',
                                                transform: `scale(${zoomLevel})`,
                                                transformOrigin: 'top left',
                                                width: `${100 / zoomLevel}%`,
                                                height: `${100 / zoomLevel}%`,
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-4 text-center bg-gray-50 border-t">
                <p className="text-sm text-muted-foreground font-khmer">
                    &copy; {new Date().getFullYear()} MoEYS EdTech. រក្សាសិទ្ធិគ្រប់យ៉ាង។
                </p>
            </footer>
        </div>
    );
}
