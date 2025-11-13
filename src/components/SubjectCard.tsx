'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy, BookOpen } from 'lucide-react';
import { Subject } from '@/data/moeys-data';
import { formatDuration, formatScore } from '@/lib/subject-utils';

interface SubjectCardProps {
    subject: Subject;
    onClick?: () => void;
    showDetails?: boolean;
    className?: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
    subject,
    onClick,
    showDetails = true,
    className = ''
}) => {
    return (
        <Card
            className={`hover:shadow-lg transition-shadow cursor-pointer ${className}`}
            onClick={onClick}
        >
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            {subject.name}
                        </div>
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300 font-khmer">
                            {subject.name_km}
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>

            {showDetails && (
                <CardContent className="pt-0">
                    <div className="space-y-3">
                        {/* Duration (Khmer) */}
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-600" />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                <Badge variant="outline" className="text-green-700 border-green-300 font-khmer">
                                    {subject.duration_km}
                                </Badge>
                            </div>
                        </div>

                        {/* Score (Khmer) */}
                        <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-600" />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                <Badge variant="outline" className="text-yellow-700 border-yellow-300 font-khmer">
                                    {subject.score_km}
                                </Badge>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 font-khmer">
                                <div>
                                    <span className="font-medium">រយៈពេល:</span> {subject.duration_km}
                                </div>
                                <div>
                                    <span className="font-medium">ពិន្ទុអតិបរមា:</span> {subject.score_km}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

// Compact version for lists
export const SubjectCardCompact: React.FC<SubjectCardProps> = ({
    subject,
    onClick,
    className = ''
}) => {
    return (
        <Card
            className={`hover:shadow-md transition-shadow cursor-pointer ${className}`}
            onClick={onClick}
        >
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                                {subject.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 font-khmer">
                                {subject.name_km}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs font-khmer">
                            <Clock className="h-3 w-3 mr-1" />
                            {subject.duration_km}
                        </Badge>
                        <Badge variant="secondary" className="text-xs font-khmer">
                            <Trophy className="h-3 w-3 mr-1" />
                            {subject.score_km}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

// Subject list component
interface SubjectListProps {
    subjects: Subject[];
    onSubjectSelect?: (subject: Subject) => void;
    compact?: boolean;
    className?: string;
}

export const SubjectList: React.FC<SubjectListProps> = ({
    subjects,
    onSubjectSelect,
    compact = false,
    className = ''
}) => {
    const CardComponent = compact ? SubjectCardCompact : SubjectCard;

    return (
        <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} ${className}`}>
            {subjects.map((subject, index) => (
                <CardComponent
                    key={`${subject.name}-${index}`}
                    subject={subject}
                    onClick={() => onSubjectSelect?.(subject)}
                    showDetails={!compact}
                />
            ))}
        </div>
    );
};

export default SubjectCard;
