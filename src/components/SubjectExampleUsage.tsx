'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { subjects } from '@/data/moeys-data';
import SubjectCard, { SubjectList, SubjectCardCompact } from '@/components/SubjectCard';
import ExamTimer, { ExamTimerCompact } from '@/components/ExamTimer';
import { subjectHelpers, formatDuration, formatScore } from '@/lib/subject-utils';
import { BookOpen, Clock, Trophy, BarChart3 } from 'lucide-react';

const SubjectExampleUsage: React.FC = () => {
    const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
    const [examStarted, setExamStarted] = useState(false);
    const [examStartTime, setExamStartTime] = useState<Date | undefined>();

    const statistics = subjectHelpers.getStatistics(subjects);

    const handleStartExam = () => {
        setExamStartTime(new Date());
        setExamStarted(true);
    };

    const handleTimeUp = () => {
        alert('Time is up! Exam session ended.');
        setExamStarted(false);
    };

    const handleTimeWarning = (minutesLeft: number) => {
        alert(`Warning: Only ${minutesLeft} minutes remaining!`);
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Enhanced Subject Interface Demo
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Demonstrating duration and score fields with Khmer localization
                </p>
            </div>

            <Tabs defaultValue="subjects" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="subjects">Subjects</TabsTrigger>
                    <TabsTrigger value="timer">Exam Timer</TabsTrigger>
                    <TabsTrigger value="statistics">Statistics</TabsTrigger>
                    <TabsTrigger value="utilities">Utilities</TabsTrigger>
                </TabsList>

                {/* Subjects Tab */}
                <TabsContent value="subjects" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Available Subjects
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SubjectList
                                subjects={subjects}
                                onSubjectSelect={setSelectedSubject}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Compact Subject List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SubjectList
                                subjects={subjects}
                                onSubjectSelect={setSelectedSubject}
                                compact={true}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Selected Subject Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h3 className="font-semibold">Basic Information</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Name:</span>
                                            <span className="font-medium">{selectedSubject.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Name (Khmer):</span>
                                            <span className="font-medium font-khmer">{selectedSubject.name_km}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Duration:</span>
                                            <span className="font-medium">{formatDuration.toEnglish(selectedSubject.duration)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Duration (Khmer):</span>
                                            <span className="font-medium font-khmer">{selectedSubject.duration_km}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Score:</span>
                                            <span className="font-medium">{formatScore.toEnglish(selectedSubject.score)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Score (Khmer):</span>
                                            <span className="font-medium font-khmer">{selectedSubject.score_km}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-semibold">Formatted Values</h3>
                                    <div className="space-y-2">
                                        <Badge variant="outline" className="block text-center py-2">
                                            <Clock className="h-4 w-4 mr-2" />
                                            Duration: {selectedSubject.duration} minutes
                                        </Badge>
                                        <Badge variant="outline" className="block text-center py-2">
                                            <Trophy className="h-4 w-4 mr-2" />
                                            Max Score: {selectedSubject.score} points
                                        </Badge>
                                        <Badge variant="outline" className="block text-center py-2 font-khmer">
                                            រយៈពេល: {selectedSubject.duration_km}
                                        </Badge>
                                        <Badge variant="outline" className="block text-center py-2 font-khmer">
                                            ពិន្ទុ: {selectedSubject.score_km}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Timer Tab */}
                <TabsContent value="timer" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Exam Timer Demo
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Button
                                    onClick={handleStartExam}
                                    disabled={examStarted}
                                    variant={examStarted ? "secondary" : "default"}
                                >
                                    {examStarted ? 'Exam In Progress' : 'Start Exam'}
                                </Button>

                                {examStarted && (
                                    <ExamTimerCompact
                                        subject={selectedSubject}
                                        startTime={examStartTime}
                                        onTimeUp={handleTimeUp}
                                        onTimeWarning={handleTimeWarning}
                                    />
                                )}
                            </div>

                            {examStarted && examStartTime && (
                                <ExamTimer
                                    subject={selectedSubject}
                                    startTime={examStartTime}
                                    onTimeUp={handleTimeUp}
                                    onTimeWarning={handleTimeWarning}
                                    showProgress={true}
                                />
                            )}

                            {!examStarted && (
                                <Card className="bg-gray-50 dark:bg-gray-800">
                                    <CardContent className="p-4 text-center">
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Click "Start Exam" to see the timer in action
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Statistics Tab */}
                <TabsContent value="statistics" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Subject Statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-4 border rounded-lg text-center">
                                    <div className="text-2xl font-bold text-blue-600">{statistics.totalSubjects}</div>
                                    <div className="text-sm text-gray-600">Total Subjects</div>
                                </div>
                                <div className="p-4 border rounded-lg text-center">
                                    <div className="text-2xl font-bold text-green-600">{statistics.totalScore}</div>
                                    <div className="text-sm text-gray-600">Total Points</div>
                                </div>
                                <div className="p-4 border rounded-lg text-center">
                                    <div className="text-2xl font-bold text-purple-600">{statistics.totalDuration}</div>
                                    <div className="text-sm text-gray-600">Total Minutes</div>
                                </div>
                                <div className="p-4 border rounded-lg text-center">
                                    <div className="text-2xl font-bold text-orange-600">{statistics.averageScore}</div>
                                    <div className="text-sm text-gray-600">Avg Points</div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <h3 className="font-semibold">Detailed Statistics</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Highest Score:</span>
                                            <Badge variant="secondary">{statistics.highestScore} points</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Lowest Score:</span>
                                            <Badge variant="secondary">{statistics.lowestScore} points</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Average Score:</span>
                                            <Badge variant="secondary">{statistics.averageScore} points</Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Longest Duration:</span>
                                            <Badge variant="outline">{statistics.longestDuration} minutes</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shortest Duration:</span>
                                            <Badge variant="outline">{statistics.shortestDuration} minutes</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Average Duration:</span>
                                            <Badge variant="outline">{statistics.averageDuration} minutes</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Utilities Tab */}
                <TabsContent value="utilities" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Utility Functions Demo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Duration Formatting */}
                            <div>
                                <h3 className="font-semibold mb-3">Duration Formatting</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>60 minutes (English):</span>
                                            <span className="font-medium">{formatDuration.toEnglish(60)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>90 minutes (English):</span>
                                            <span className="font-medium">{formatDuration.toEnglish(90)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>45 minutes (English):</span>
                                            <span className="font-medium">{formatDuration.toEnglish(45)}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>60 minutes (Khmer):</span>
                                            <span className="font-medium font-khmer">{formatDuration.toKhmer(60)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>90 minutes (Khmer):</span>
                                            <span className="font-medium font-khmer">{formatDuration.toKhmer(90)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>45 minutes (Khmer):</span>
                                            <span className="font-medium font-khmer">{formatDuration.toKhmer(45)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Score Formatting */}
                            <div>
                                <h3 className="font-semibold mb-3">Score Formatting</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>100 points (English):</span>
                                            <span className="font-medium">{formatScore.toEnglish(100)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>50 points (English):</span>
                                            <span className="font-medium">{formatScore.toEnglish(50)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Percentage (85/100):</span>
                                            <span className="font-medium">{formatScore.toPercentage(85, 100)}%</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>100 points (Khmer):</span>
                                            <span className="font-medium font-khmer">{formatScore.toKhmer(100)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>50 points (Khmer):</span>
                                            <span className="font-medium font-khmer">{formatScore.toKhmer(50)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Grade (85%):</span>
                                            <span className="font-medium">{formatScore.getGrade(85).grade} ({formatScore.getGrade(85).grade_km})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Subject Helpers */}
                            <div>
                                <h3 className="font-semibold mb-3">Subject Helpers</h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="font-medium">Subjects sorted by score:</span>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {subjectHelpers.sortByScore(subjects).map((subject, index) => (
                                                <Badge key={index} variant="outline">
                                                    {subject.name}: {subject.score}pts
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-medium">Total exam duration:</span>
                                        <Badge variant="secondary" className="ml-2">
                                            {formatDuration.toEnglish(subjectHelpers.getTotalDuration(subjects))}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SubjectExampleUsage;
