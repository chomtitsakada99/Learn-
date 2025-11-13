/**
 * Subject utility functions for MoEYs Exam Platform
 * Handles duration and score formatting and calculations
 */

import { Subject } from '@/data/moeys-data';

// Duration formatting utilities
export const formatDuration = {
  // Convert minutes to hours and minutes
  toHoursAndMinutes: (minutes: number): { hours: number; minutes: number } => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return { hours, minutes: remainingMinutes };
  },

  // Format duration in English
  toEnglish: (minutes: number): string => {
    const { hours, minutes: mins } = formatDuration.toHoursAndMinutes(minutes);
    if (hours === 0) {
      return `${mins} minute${mins !== 1 ? 's' : ''}`;
    }
    if (mins === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours !== 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''}`;
  },

  // Format duration in Khmer
  toKhmer: (minutes: number): string => {
    const { hours, minutes: mins } = formatDuration.toHoursAndMinutes(minutes);
    if (hours === 0) {
      return `${convertToKhmerNumbers(mins)}នាទី`;
    }
    if (mins === 0) {
      return `${convertToKhmerNumbers(hours)}ម៉ោង`;
    }
    return `${convertToKhmerNumbers(hours)}ម៉ោង${convertToKhmerNumbers(mins)}នាទី`;
  },

  // Get remaining time in minutes
  getRemainingMinutes: (startTime: Date, durationMinutes: number): number => {
    const now = new Date();
    const elapsedMinutes = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));
    return Math.max(0, durationMinutes - elapsedMinutes);
  },

  // Check if time is expired
  isExpired: (startTime: Date, durationMinutes: number): boolean => {
    const now = new Date();
    const elapsedMinutes = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));
    return elapsedMinutes >= durationMinutes;
  },
};

// Score formatting utilities
export const formatScore = {
  // Format score in English
  toEnglish: (score: number): string => {
    return `${score} point${score !== 1 ? 's' : ''}`;
  },

  // Format score in Khmer
  toKhmer: (score: number): string => {
    return `${convertToKhmerNumbers(score)}ពិន្ទុ`;
  },

  // Calculate percentage
  toPercentage: (earnedScore: number, totalScore: number): number => {
    if (totalScore === 0) return 0;
    return Math.round((earnedScore / totalScore) * 100);
  },

  // Get grade based on percentage
  getGrade: (percentage: number): { grade: string; grade_km: string } => {
    if (percentage >= 90) return { grade: 'A', grade_km: 'ពិសេស' };
    if (percentage >= 80) return { grade: 'B', grade_km: 'ល្អ' };
    if (percentage >= 70) return { grade: 'C', grade_km: 'មធ្យម' };
    if (percentage >= 60) return { grade: 'D', grade_km: 'ខ្សោយ' };
    return { grade: 'F', grade_km: 'ធ្លាក់' };
  },
};

// Convert Arabic numbers to Khmer numbers
export const convertToKhmerNumbers = (num: number): string => {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return num.toString().split('').map(digit => khmerDigits[parseInt(digit)]).join('');
};

// Convert Khmer numbers to Arabic numbers
export const convertFromKhmerNumbers = (khmerNum: string): number => {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  const arabicNum = khmerNum.split('').map(char => {
    const index = khmerDigits.indexOf(char);
    return index >= 0 ? index.toString() : char;
  }).join('');
  return parseInt(arabicNum);
};

// Subject helper functions
export const subjectHelpers = {
  // Get subject by name
  getByName: (subjects: Subject[], name: string): Subject | undefined => {
    return subjects.find(subject => 
      subject.name.toLowerCase() === name.toLowerCase() ||
      subject.name_km === name
    );
  },

  // Get all subjects sorted by score (highest first)
  sortByScore: (subjects: Subject[]): Subject[] => {
    return [...subjects].sort((a, b) => b.score - a.score);
  },

  // Get all subjects sorted by duration (longest first)
  sortByDuration: (subjects: Subject[]): Subject[] => {
    return [...subjects].sort((a, b) => b.duration - a.duration);
  },

  // Get total score for all subjects
  getTotalScore: (subjects: Subject[]): number => {
    return subjects.reduce((total, subject) => total + subject.score, 0);
  },

  // Get total duration for all subjects
  getTotalDuration: (subjects: Subject[]): number => {
    return subjects.reduce((total, subject) => total + subject.duration, 0);
  },

  // Get subject statistics
  getStatistics: (subjects: Subject[]) => {
    const totalScore = subjectHelpers.getTotalScore(subjects);
    const totalDuration = subjectHelpers.getTotalDuration(subjects);
    const averageScore = Math.round(totalScore / subjects.length);
    const averageDuration = Math.round(totalDuration / subjects.length);

    return {
      totalSubjects: subjects.length,
      totalScore,
      totalDuration,
      averageScore,
      averageDuration,
      highestScore: Math.max(...subjects.map(s => s.score)),
      lowestScore: Math.min(...subjects.map(s => s.score)),
      longestDuration: Math.max(...subjects.map(s => s.duration)),
      shortestDuration: Math.min(...subjects.map(s => s.duration)),
    };
  },
};

// Exam session utilities
export const examSession = {
  // Create exam session data
  createSession: (subject: Subject, startTime?: Date) => {
    const start = startTime || new Date();
    const endTime = new Date(start.getTime() + subject.duration * 60 * 1000);
    
    return {
      subject,
      startTime: start,
      endTime,
      duration: subject.duration,
      maxScore: subject.score,
      isActive: true,
      timeRemaining: subject.duration,
    };
  },

  // Update session with remaining time
  updateSession: (session: any) => {
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - session.startTime.getTime()) / (1000 * 60));
    const remaining = Math.max(0, session.duration - elapsed);
    const isExpired = remaining === 0;

    return {
      ...session,
      timeRemaining: remaining,
      isActive: !isExpired,
      isExpired,
      elapsedTime: elapsed,
    };
  },

  // Format time remaining for display
  formatTimeRemaining: (minutes: number): { display: string; display_km: string; isUrgent: boolean } => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const isUrgent = minutes <= 10; // Last 10 minutes

    let display = '';
    let display_km = '';

    if (hours > 0) {
      display = `${hours}:${mins.toString().padStart(2, '0')}`;
      display_km = `${convertToKhmerNumbers(hours)}ម៉ោង${convertToKhmerNumbers(mins)}នាទី`;
    } else {
      display = `${mins} min`;
      display_km = `${convertToKhmerNumbers(mins)}នាទី`;
    }

    return { display, display_km, isUrgent };
  },
};

// Export all utilities
export default {
  formatDuration,
  formatScore,
  convertToKhmerNumbers,
  convertFromKhmerNumbers,
  subjectHelpers,
  examSession,
};
