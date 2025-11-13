# MoEYS EdTech Exam System

A complete online exam system built with Next.js 15, React 18, and Tailwind CSS for the Ministry of Education, Youth and Sport (MoEYS) in Cambodia.

## 🎯 Application Flow

The application follows a 3-screen flow:

### 1. Welcome/Introduction Screen (`/welcome`)
- **Purpose**: Introduction and welcome page
- **Features**: 
  - MoEYS logo and branding
  - Application overview with 3 main features
  - Step-by-step instructions
  - Start button to begin the exam process

### 2. Province Selection Screen (`/provinces`)
- **Purpose**: Select from 25 provinces in Cambodia
- **Features**:
  - Numbered province list (1-25) with Khmer and English names
  - Search functionality (by name, Khmer name, or province number)
  - Responsive grid layout
  - Navigation back to welcome page

### 3. Subject Selection Screen (`/subjects/[province]`)
- **Purpose**: Choose from 3 subjects for the selected province
- **Features**:
  - 3 subjects: Mathematics (គណិតវិទ្យា), Physics (រូបវិទ្យា), Khmer Language (ភាសាខ្មែរ)
  - Subject-specific icons and colors
  - Status indicators for available/unavailable exams
  - Navigation breadcrumbs

### 4. Exam Screen (`/exam/[province]/[subject]`)
- **Purpose**: Take the exam via embedded តាមប្រព័ន្ធប្រឡងគម្រោង GEIP
- **Features**:
  - Full-screen តាមប្រព័ន្ធប្រឡងគម្រោង GEIP embedding
  - Province and subject information display
  - Option to open in new tab
  - Responsive iframe layout

## 🏗️ Technical Architecture

- **Framework**: Next.js 15.3.3 with App Router
- **Frontend**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui components with Radix UI primitives
- **Icons**: Lucide React icons
- **State Management**: React hooks (useState, useMemo, useEffect)
- **Routing**: Next.js dynamic routes with parameters

## 5. Showresults (`/result/[province]`)
តាមប្រព័ន្ធប្រឡងគម្រោង GEIP សិស្ស

## 📁 Project Structure

```
src/
├── app/
│   ├── welcome/page.tsx          # Welcome screen
│   ├── provinces/page.tsx        # Province selection
│   ├── subjects/[province]/page.tsx  # Subject selection
│   ├── exam/[province]/[subject]/page.tsx  # Exam screen
│   ├── admin/page.tsx            # Admin panel for managing links
│   └── layout.tsx                # Root layout
├── components/ui/                 # shadcn/ui components
├── data/
│   └── moeys-data.ts             # Province, subject, and link data
└── lib/
    └── utils.ts                  # Utility functions
```

## 🗺️ Provinces (25 Total)

1. ខេត្តបន្ទាយមានជ័យ (Banteay Meanchey)
2. ខេត្តបាត់ដំបង (Battambang)
3. ខេត្តកំពង់ចាម (Kampong Cham)
4. ខេត្តកំពង់ឆ្នាំង (Kampong Chhnang)
5. ខេត្តកំពង់ស្ពឺ (Kampong Speu)
6. ខេត្តកំពង់ធំ (Kampong Thom)
7. ខេត្តកំពត (Kampot)
8. ខេត្តកណ្តាល (Kandal)
9. ខេត្តកោះកុង (Koh Kong)
10. ខេត្តក្រចេះ (Kratie)
11. ខេត្តមណ្ឌលគិរី (Mondulkiri)
12. រាជធានីភ្នំពេញ (Phnom Penh)
13. ខេត្តព្រះវិហារ (Preah Vihear)
14. ខេត្តព្រៃវែង (Prey Veng)
15. ខេត្តពោធិ៍សាត់ (Pursat)
16. ខេត្តរតនគិរី (Ratanakiri)
17. ខេត្តសៀមរាប (Siem Reap)
18. ខេត្តព្រះសីហនុ (Preah Sihanouk)
19. ខេត្តស្ទឹងត្រែង (Stung Treng)
20. ខេត្តស្វាយរៀង (Svay Rieng)
21. ខេត្តតាកែវ (Takeo)
22. ខេត្តកែប (Kep)
23. ខេត្តប៉ៃលិន (Pailin)
24. ខេត្តឧត្តរមានជ័យ (Oddar Meanchey)
25. ខេត្តត្បូងឃ្មុំ (Tboung Khmum)

## 📚 Subjects (3 Total)

- **Mathematics** (គណិតវិទ្យា) - Blue theme
- **Physics** (រូបវិទ្យា) - Green theme  
- **Khmer Language** (ភាសាខ្មែរ) - Purple theme

## 🛠️ Setup & Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Main app: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

## 🔧 Configuration

### តាមប្រព័ន្ធប្រឡងគម្រោង GEIP Links
- Use the admin panel at `/admin` to input តាមប្រព័ន្ធប្រឡងគម្រោង GEIP URLs
- Links are stored in `src/data/moeys-data.ts`
- Format: `{ProvinceName}-{SubjectName}`

### Customization
- Update province data in `src/data/moeys-data.ts`
- Modify styling in `tailwind.config.ts`
- Update UI components in `src/components/ui/`

## 🚀 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Khmer Language Support**: Full Khmer text throughout the interface
- **Search Functionality**: Find provinces quickly
- **Navigation**: Easy back/forward navigation between screens
- **Admin Panel**: Manage តាមប្រព័ន្ធប្រឡងគម្រោង GEIP links easily
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🎨 Design System

- **Primary Colors**: Blue gradients for main actions
- **Subject Colors**: Blue (Math), Green (Physics), Purple (Khmer)
- **Typography**: Battambang (Khmer) + PT Sans (English)
- **Spacing**: Consistent 4px grid system
- **Shadows**: Subtle shadows for depth and hierarchy

## 🔒 Security & Privacy

- No user authentication required (public exam system)
- តាមប្រព័ន្ធប្រឡងគម្រោង GEIP handle exam submission and data
- No personal data stored in the application
- Secure iframe embedding for តាមប្រព័ន្ធប្រឡងគម្រោង GEIP

## 📈 Performance

Performance monitoring and optimization features have been removed from this application.

## 🚀 Deployment

The application is ready for deployment to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any static hosting service

## 📞 Support

For technical support or feature requests, please contact the development team.

---

**Built with ❤️ for MoEYS EdTech**

