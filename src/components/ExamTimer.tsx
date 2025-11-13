'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Subject } from '@/data/moeys-data';
import { examSession } from '@/lib/subject-utils';

interface ExamTimerProps {
    subject: Subject;
    startTime?: Date;
    onTimeUp?: () => void;
    onTimeWarning?: (minutesLeft: number) => void;
    showProgress?: boolean;
    className?: string;
}

const ExamTimer: React.FC<ExamTimerProps> = ({
    subject,
    startTime,
    onTimeUp,
    onTimeWarning,
    showProgress = true,
    className = ''
}) => {
    const [session, setSession] = useState(() =>
        examSession.createSession(subject, startTime)
    );
    const [hasWarned, setHasWarned] = useState(false);

    // Update timer every second
    useEffect(() => {
        const interval = setInterval(() => {
            const updatedSession = examSession.updateSession(session);
            setSession(updatedSession);

            // Check for time warnings
            if (updatedSession.timeRemaining <= 10 && !hasWarned && updatedSession.timeRemaining > 0) {
                setHasWarned(true);
                onTimeWarning?.(updatedSession.timeRemaining);
            }

            // Check if time is up
            if (updatedSession.timeRemaining <= 0 && session.isActive) {
                onTimeUp?.();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [session, hasWarned, onTimeUp, onTimeWarning]);

    const timeDisplay = examSession.formatTimeRemaining(session.timeRemaining);
    const progressPercentage = ((session.duration - session.timeRemaining) / session.duration) * 100;

    const getTimerStatus = () => {
        if (session.timeRemaining <= 0) {
            return {
                icon: <XCircle className="h-5 w-5" />,
                color: 'text-red-600',
                bgColor: 'bg-red-50 border-red-200',
                badgeVariant: 'destructive' as const,
                message: 'Time Expired',
                message_km: 'អស់ពេលហើយ'
            };
        }

        if (timeDisplay.isUrgent) {
            return {
                icon: <AlertTriangle className="h-5 w-5" />,
                color: 'text-orange-600',
                bgColor: 'bg-orange-50 border-orange-200',
                badgeVariant: 'destructive' as const,
                message: 'Time Running Out',
                message_km: 'ពេលវេលាជិតអស់'
            };
        }

        return {
            icon: <Clock className="h-5 w-5" />,
            color: 'text-green-600',
            bgColor: 'bg-green-50 border-green-200',
            badgeVariant: 'secondary' as const,
            message: 'Time Remaining',
            message_km: 'ពេលវេលានៅសល់'
        };
    };

    const status = getTimerStatus();

    return (
        <div className={className}>
            <Card className={`${status.bgColor} border-2`}>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className={status.color}>
                                {status.icon}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-700 font-khmer">
                                    {status.message_km}
                                </div>
                            </div>
                        </div>

                        <Badge variant={status.badgeVariant} className="text-lg font-khmer px-3 py-1">
                            {timeDisplay.display_km}
                        </Badge>
                    </div>

                    {/* Khmer time display */}
                    <div className="text-center mb-3">
                        <div className={`text-2xl font-bold font-khmer ${status.color}`}>
                            {timeDisplay.display_km}
                        </div>
                    </div>

                    {/* Progress bar */}
                    {showProgress && (
                        <div className="space-y-2">
                            <Progress
                                value={progressPercentage}
                                className="h-2"
                            />
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>ចាប់ផ្ដើម</span>
                                <span>{Math.round(progressPercentage)}%</span>
                                <span>អស់ពេល</span>
                            </div>
                        </div>
                    )}

                    {/* Subject info */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-600 space-y-1">
                            <div className="flex justify-between">
                                <span>មុខវិជ្ជា:</span>
                                <span className="font-medium">{subject.name_km}</span>
                            </div>
                            <div className="flex justify_between">
                                <span>រយៈពេល:</span>
                                <span className="font-medium">{subject.duration_km}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>ពិន្ទុអតិបរមា:</span>
                                <span className="font-medium">{subject.score_km}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Time warning alert */}
            {timeDisplay.isUrgent && session.timeRemaining > 0 && (
                <Alert className="mt-4 border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                        <div className="space-y-1">
                            <div>⚠️ នៅសល់តែ {timeDisplay.display_km} ប៉ុណ្ណោះ!</div>
                            <div className="text-sm font-khmer">⚠️ នៅសល់តែ {timeDisplay.display_km} ប៉ុណ្ណោះ!</div>
                        </div>
                    </AlertDescription>
                </Alert>
            )}

            {/* Time expired alert */}
            {session.timeRemaining <= 0 && (
                <Alert className="mt-4 border-red-200 bg-red-50">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                        <div className="space-y-1">
                            <div>⏰ អស់ពេលហើយ! សូមដាក់ស្នើរបាយការណ៍ប្រលង។</div>
                            <div className="text-sm font-khmer">⏰ អស់ពេលហើយ! សូមដាក់ស្នើរបាយការណ៍ប្រលង។</div>
                        </div>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

// Compact timer for headers/navigation
export const ExamTimerCompact: React.FC<ExamTimerProps> = ({
    subject,
    startTime,
    onTimeUp,
    onTimeWarning,
    className = ''
}) => {
    const [session, setSession] = useState(() =>
        examSession.createSession(subject, startTime)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedSession = examSession.updateSession(session);
            setSession(updatedSession);

            if (updatedSession.timeRemaining <= 0 && session.isActive) {
                onTimeUp?.();
            }

            if (updatedSession.timeRemaining <= 10 && updatedSession.timeRemaining > 0) {
                onTimeWarning?.(updatedSession.timeRemaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [session, onTimeUp, onTimeWarning]);

    const timeDisplay = examSession.formatTimeRemaining(session.timeRemaining);
    const status = session.timeRemaining <= 0 ? 'destructive' : timeDisplay.isUrgent ? 'destructive' : 'secondary';

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Clock className={`h-4 w-4 ${session.timeRemaining <= 0 ? 'text-red-600' : timeDisplay.isUrgent ? 'text-orange-600' : 'text-green-600'}`} />
            <Badge variant={status} className="font-khmer">
                {timeDisplay.display_km}
            </Badge>
        </div>
    );
};

export default ExamTimer;
