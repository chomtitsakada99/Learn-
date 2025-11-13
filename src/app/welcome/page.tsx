'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Globe, Award } from 'lucide-react';
import Image from 'next/image';

export default function WelcomePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    // Handle starting the exam
    const handleStartExam = () => {
        setShowDialog(true);
    };

    // Confirm start (redirect to /provinces)
    const handleConfirm = () => {
        setIsLoading(true);
        router.push('/provinces');
    };

    // ✅ New function to show exam results
    const handleShowresults = () => {
        setIsLoading(true);
        router.push('/results');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <header className="text-center mb-6 sm:mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md ring-1 ring-gray-200">
                            <div className="rounded-xl bg-blue-50 p-2 sm:p-3 ring-1 ring-blue-100">
                                <Image
                                    src="/moeys-logo.png"
                                    alt="MoEYS Logo"
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 sm:h-12 sm:w-12"
                                    priority
                                />
                            </div>
                            <div className="text-gray-900 font-semibold text-sm sm:text-base leading-snug text-left whitespace-normal">
                                MoEYS EdTech - GEIP ICT Team
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                        ប្រឡងតេស្តស្ដង់ដារ MoEYS EdTech
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        ប្រឡងតេស្តស្ដង់ដារ MoEYS EdTech តាម online សម្រាប់សិស្សានុសិស្ស
                    </p>
                </header>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="text-center pb-6 sm:pb-8">
                            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
                                ស្វាគមន៍មកកាន់ប្រព័ន្ធប្រឡងតេស្តស្តង់ដារថ្នាក់ទី ៨
                            </CardTitle>
                            <p className="text-base sm:text-lg text-gray-600">
                                ជ្រើសរើសខេត្ត និងមុខវិជ្ជាដើម្បីចាប់ផ្ដើមប្រឡងតេស្ត
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-6 sm:space-y-8">
                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-5 sm:mb-8">
                                <div className="text-center">
                                    <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                        <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">ខេត្តទាំង ២៥</h3>
                                    <p className="text-sm sm:text-base text-gray-600">ជ្រើសរើសខេត្តរបស់អ្នក</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                        <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">មុខវិជ្ជា ៣</h3>
                                    <p className="text-sm sm:text-base text-gray-600">គណិតវិទ្យា រូបវិទ្យា ភាសាខ្មែរ</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                        <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">ប្រឡងតេស្ត Online</h3>
                                    <p className="text-sm sm:text-base text-gray-600">ប្រឡងតេស្តតាមប្រព័ន្ធប្រឡងគម្រោង GEIP</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 p-6 sm:p-10">
                                <Button
                                    onClick={handleStartExam}
                                    disabled={isLoading}
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                                >
                                    {isLoading ? 'កំពុងផ្ទុក...' : 'ចាប់ផ្ដើមប្រឡងតេស្ត'}
                                </Button>

                                <Button
                                    onClick={handleShowresults}
                                    disabled={isLoading}
                                    size="lg"
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                                >
                                    {isLoading ? 'កំពុងផ្ទុក...' : 'មើលលទ្ធផលប្រឡងតេស្ត'}
                                </Button>
                            </div>

                            {/* Alert Dialog */}
                            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <div className="flex items-center justify-center mb-2">
                                            <Image src="/moeys-logo.png" alt="MoEYS Logo" width={64} height={64} className="h-16 w-16" />
                                        </div>
                                        <AlertDialogTitle className="font-khmer">សូមសិស្សានុសិស្សត្រៀមគណនី Gmail មុនចាប់ផ្ដើម</AlertDialogTitle>
                                        <AlertDialogDescription className="font-khmer leading-7">
                                            ដើម្បីចូលរួមប្រឡងតេស្ត ត្រូវការ<strong> គណនី Gmail </strong>ដើម្បីភ្ជាប់ទៅតាមប្រព័ន្ធប្រឡងនៅពេលដែលចាប់ផ្ដើម។
                                            <br />
                                            សូមធ្វើការចូលគណនី Gmail នៅក្នុងការប្រឡងនៅពេលបន្តិចទៀតនេះ។
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="font-khmer">បោះបង់</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleConfirm} className="font-khmer">
                                            បន្ត
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            {/* Instructions */}
                            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center">ការណែនាំ</h3>
                                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                                        <span>ជ្រើសរើសខេត្តរបស់អ្នក</span>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                                        <span>ជ្រើសរើសមុខវិជ្ជាដែលអ្នកចង់ប្រឡង</span>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                                        <span>ចាប់ផ្ដើមប្រឡងតេស្តតាមប្រព័ន្ធប្រឡងគម្រោង GEIP</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <footer className="text-center mt-12 text-gray-500">
                    <p>&copy; {new Date().getFullYear()} MoEYS EdTech. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
