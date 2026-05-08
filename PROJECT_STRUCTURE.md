# DigiFunzi Analytics Dashboard

## Project Overview
Enterprise-grade Analytics Dashboard module built with React, TypeScript, Tailwind CSS, and modern state management.

## Tech Stack
- **React 18.3.1** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS v4** - Styling
- **Zustand** - State Management
- **TanStack Query** - Data Fetching & Caching
- **React Router v7** - Routing
- **Recharts** - Data Visualization
- **Radix UI** - Accessible Components

## Color Palette
- Primary: `#25476a` (Deep Blue)
- Secondary: `#feb139` (Orange)
- Accent: `#38aae1` (Light Blue)

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx       # Main layout wrapper
│   │   │   ├── Sidebar.tsx      # Sidebar navigation
│   │   │   └── Header.tsx       # Header with theme toggle
│   │   ├── shared/
│   │   │   ├── KPICard.tsx      # KPI metric cards
│   │   │   ├── DataTable.tsx    # Reusable data table
│   │   │   └── StatCard.tsx     # Small stat cards
│   │   └── ui/                  # Radix UI components
│   └── App.tsx                  # Main app with routing
├── pages/
│   ├── analytics/
│   │   └── AnalyticsPage.tsx    # Full analytics dashboard
│   ├── centers/
│   │   └── CentersPage.tsx      # Centers analytics
│   └── [other pages]/           # Placeholder routes
├── charts/
│   ├── AreaChartComponent.tsx
│   ├── BarChartComponent.tsx
│   ├── LineChartComponent.tsx
│   └── DonutChartComponent.tsx
├── store/
│   ├── useThemeStore.ts         # Theme state (light/dark)
│   ├── useSidebarStore.ts       # Sidebar state
│   └── useFilterStore.ts        # Filter state
├── mock/
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   └── data/
│       └── mockData.ts          # Realistic mock data
└── styles/
    ├── theme.css                # Theme variables & dark mode
    └── fonts.css                # Font imports

```

## Features Implemented

### Analytics Page
- **User Analytics**: Total users, active/inactive, new registrations
- **Student Analytics**: 135 students across Crib, Clicker, Quest classes
- **Mentor Analytics**: 18 mentors with login tracking
- **Teacher Analytics**: 12 teachers with class assignments
- **Parent Analytics**: 95 parents with student links
- **Charts**: User growth trends, role distribution, assignment trends
- **Tables**: Searchable, sortable, paginated data tables

### Centers Page
- **Center Overview**: 5 centers across Kenya (Nairobi, Mombasa, Kisumu, Nakuru, Eldoret)
- **Class Analytics**: Detailed metrics for Crib, Clicker, Quest classes
- **Schedule Analytics**: Upcoming, completed, and missed lessons
- **QA Analytics**: Quality assurance visit tracking
- **Performance Tracking**: Session completion, assignment completion, retry rates
- **Lesson Schedules**: Date-based lesson tracking with attendance

### Navigation
- Dashboard (placeholder)
- Analytics (fully built)
- Centers (fully built)
- Students (placeholder)
- Mentors (placeholder)
- Teachers (placeholder)
- Parents (placeholder)
- Reports (placeholder)
- Settings (placeholder)
- Logout

### UI/UX Features
- **Dark/Light Mode**: Full theme support with persistent storage
- **Responsive Design**: Mobile, tablet, desktop optimized
- **Loading States**: Skeleton loaders for data fetching
- **Smooth Animations**: Transitions and hover effects
- **Accessible Components**: Using Radix UI primitives
- **Search & Filters**: On all data tables
- **Sorting & Pagination**: Built into tables

## State Management

### Theme Store (Zustand)
- Light/dark mode toggle
- Persisted to localStorage
- Auto-applies to DOM

### Sidebar Store (Zustand)
- Desktop/mobile sidebar state
- Responsive behavior
- Persisted preferences

### Filter Store (Zustand)
- Date range filters
- Search queries
- Role/status/center filters
- Reset functionality

## Mock Data

Realistic data for an educational platform:
- 135 Students (across 3 class types: Crib, Clicker, Quest)
- 18 Mentors
- 12 Teachers
- 95 Parents
- 5 Centers (across Kenya)
- Lesson schedules (20 lessons per class)
- Performance metrics (completion rates, retry rates, login rates)

## API Integration Ready

The project is structured for easy backend integration:

```typescript
// Example service layer (to be created)
import { useQuery } from '@tanstack/react-query';

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await fetch('/api/analytics');
      return response.json();
    }
  });
}
```

Replace mock data imports with API calls in pages.

## Customization

### Colors
Update colors in component files:
- Primary: `#25476a`
- Secondary: `#feb139`
- Accent: `#38aae1`

### Theme
Edit `src/styles/theme.css` for:
- Custom color variables
- Dark mode colors
- Typography settings

### Charts
Customize in `src/charts/` components:
- Colors
- Legends
- Tooltips
- Heights

## Performance Optimizations
- Code splitting with React Router
- Lazy loading for heavy components
- Memoized chart components
- TanStack Query caching
- Optimized re-renders with Zustand

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes
- Uses React 18.3.1 features
- TypeScript strict mode enabled
- Tailwind CSS v4 with custom theme
- All components are production-ready
- Mobile-first responsive design
