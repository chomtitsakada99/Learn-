# Subject Interface Enhancement Documentation

## 📋 Overview

The Subject interface has been enhanced with **duration** and **score** fields to support comprehensive exam management with bilingual support (English/Khmer).

## ✨ New Interface Structure

```typescript
export interface Subject {
  name: string;          // Subject name in English
  name_km: string;       // Subject name in Khmer
  duration: number;      // Duration in minutes
  duration_km: string;   // Duration in Khmer display format
  score: number;         // Maximum score/points
  score_km: string;      // Score in Khmer display format
}
```

## 📊 Updated Subject Data

### Duration: 60 minutes (១ម៉ោង) for all subjects

### Scores:
- **Mathematics (គណិតវិទ្យា)**: 100 points (១០០ពិន្ទុ)
- **Khmer Language (ភាសាខ្មែរ)**: 100 points (១០០ពិន្ទុ)
- **Physics (រូបវិទ្យា)**: 50 points (៥០ពិន្ទុ)

## 🛠️ Components Created

### 1. **SubjectCard** (`src/components/SubjectCard.tsx`)
- Full subject information display with duration and score
- Compact version for lists
- Bilingual support (English/Khmer)
- Interactive subject selection

```typescript
// Usage examples
<SubjectCard subject={subject} onClick={handleSelect} />
<SubjectCardCompact subject={subject} />
<SubjectList subjects={subjects} onSubjectSelect={handleSelect} />
```

### 2. **ExamTimer** (`src/components/ExamTimer.tsx`)
- Real-time countdown timer using subject duration
- Progress tracking and time warnings
- Bilingual time display
- Automatic expiration handling

```typescript
// Usage examples
<ExamTimer 
  subject={subject} 
  startTime={startTime}
  onTimeUp={handleTimeUp}
  onTimeWarning={handleWarning}
/>
<ExamTimerCompact subject={subject} startTime={startTime} />
```

### 3. **SubjectExampleUsage** (`src/components/SubjectExampleUsage.tsx`)
- Comprehensive demo of all new features
- Interactive examples and utilities showcase
- Statistics and formatting demonstrations

## 🔧 Utility Functions

### Duration Formatting (`src/lib/subject-utils.ts`)

```typescript
import { formatDuration } from '@/lib/subject-utils';

// Convert minutes to readable format
formatDuration.toEnglish(60);    // "1 hour"
formatDuration.toKhmer(60);      // "១ម៉ោង"
formatDuration.toEnglish(90);    // "1 hour 30 minutes"
formatDuration.toKhmer(90);      // "១ម៉ោង៣០នាទី"

// Check time remaining
formatDuration.getRemainingMinutes(startTime, 60);
formatDuration.isExpired(startTime, 60);
```

### Score Formatting

```typescript
import { formatScore } from '@/lib/subject-utils';

// Format scores
formatScore.toEnglish(100);      // "100 points"
formatScore.toKhmer(100);        // "១០០ពិន្ទុ"
formatScore.toPercentage(85, 100); // 85
formatScore.getGrade(85);        // { grade: "B", grade_km: "ល្អ" }
```

### Subject Helpers

```typescript
import { subjectHelpers } from '@/lib/subject-utils';

// Find subjects
subjectHelpers.getByName(subjects, "Mathematics");
subjectHelpers.sortByScore(subjects);
subjectHelpers.sortByDuration(subjects);

// Calculate totals
subjectHelpers.getTotalScore(subjects);      // 250
subjectHelpers.getTotalDuration(subjects);   // 180
subjectHelpers.getStatistics(subjects);      // Detailed stats
```

### Exam Session Management

```typescript
import { examSession } from '@/lib/subject-utils';

// Create exam session
const session = examSession.createSession(subject, startTime);

// Update session with current time
const updated = examSession.updateSession(session);

// Format time remaining
const timeDisplay = examSession.formatTimeRemaining(session.timeRemaining);
// Returns: { display: "45 min", display_km: "៤៥នាទី", isUrgent: false }
```

## 🌍 Khmer Number Conversion

```typescript
import { convertToKhmerNumbers, convertFromKhmerNumbers } from '@/lib/subject-utils';

convertToKhmerNumbers(123);     // "១២៣"
convertFromKhmerNumbers("១២៣"); // 123
```

## 📱 Features

### ✅ **Duration Management**
- 60-minute standard duration for all subjects
- Real-time countdown timers
- Time warning alerts (last 10 minutes)
- Automatic expiration handling
- Progress tracking visualization

### ✅ **Score Management**
- Subject-specific maximum scores
- Percentage calculations
- Grade assignments (A-F with Khmer equivalents)
- Score formatting in both languages

### ✅ **Bilingual Support**
- English and Khmer display formats
- Khmer number conversion utilities
- Localized time and score representations
- Cultural-appropriate formatting

### ✅ **Interactive Components**
- Subject selection cards
- Real-time exam timers
- Progress indicators
- Warning and expiration alerts

### ✅ **Utility Functions**
- Comprehensive formatting helpers
- Time calculation utilities
- Statistical analysis functions
- Session management tools

## 🎯 Usage Examples

### Basic Subject Display
```tsx
import { subjects } from '@/data/moeys-data';
import SubjectCard from '@/components/SubjectCard';

function SubjectSelector() {
  return (
    <div>
      {subjects.map(subject => (
        <SubjectCard 
          key={subject.name}
          subject={subject}
          onClick={() => startExam(subject)}
        />
      ))}
    </div>
  );
}
```

### Exam Timer Implementation
```tsx
import { useState } from 'react';
import ExamTimer from '@/components/ExamTimer';

function ExamSession({ subject }) {
  const [startTime] = useState(new Date());
  
  return (
    <ExamTimer
      subject={subject}
      startTime={startTime}
      onTimeUp={() => alert('Time up!')}
      onTimeWarning={(mins) => alert(`${mins} minutes left!`)}
    />
  );
}
```

### Statistics Dashboard
```tsx
import { subjectHelpers } from '@/lib/subject-utils';
import { subjects } from '@/data/moeys-data';

function Dashboard() {
  const stats = subjectHelpers.getStatistics(subjects);
  
  return (
    <div>
      <h2>Exam Statistics</h2>
      <p>Total Subjects: {stats.totalSubjects}</p>
      <p>Total Duration: {stats.totalDuration} minutes</p>
      <p>Total Score: {stats.totalScore} points</p>
      <p>Average Score: {stats.averageScore} points</p>
    </div>
  );
}
```

## 📚 Data Structure

### Before Enhancement
```typescript
export interface Subject {
  name: string;
  name_km: string;
}
```

### After Enhancement
```typescript
export interface Subject {
  name: string;          // "Mathematics"
  name_km: string;       // "គណិតវិទ្យា"
  duration: number;      // 60 (minutes)
  duration_km: string;   // "១ម៉ោង"
  score: number;         // 100 (points)
  score_km: string;      // "១០០ពិន្ទុ"
}
```

## 🔄 File Updates

### Updated Files:
1. **`src/data/moeys-data.ts`** - Enhanced interface and data
2. **`moeys-data.ts`** - Root data file synchronized

### New Files:
1. **`src/lib/subject-utils.ts`** - Utility functions
2. **`src/components/SubjectCard.tsx`** - Subject display components
3. **`src/components/ExamTimer.tsx`** - Timer components
4. **`src/components/SubjectExampleUsage.tsx`** - Demo component

## 🎉 Benefits

### ✅ **Enhanced User Experience**
- Clear duration and score information
- Real-time timer feedback
- Bilingual support for Khmer users
- Visual progress indicators

### ✅ **Developer Experience**
- Type-safe interfaces
- Comprehensive utility functions
- Reusable components
- Extensive documentation

### ✅ **Exam Management**
- Standardized 60-minute duration
- Subject-specific scoring
- Automatic time management
- Session tracking capabilities

### ✅ **Localization**
- Full Khmer language support
- Cultural number formatting
- Appropriate time representations
- Accessible interface design

---

**Implementation Complete**: The Subject interface now supports comprehensive exam management with duration and score fields, complete with bilingual support and utility functions for the MoEYs Exam Platform.
