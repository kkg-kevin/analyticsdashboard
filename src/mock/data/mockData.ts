import type {
  Student,
  Mentor,
  Teacher,
  Parent,
  Center,
  AnalyticsData,
  CentersAnalytics,
  LessonSchedule
} from '../types';

// Helper function to generate dates
const getDateBefore = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

// Mock Students Data
export const mockStudents: Student[] = [
  // Crib students
  ...Array.from({ length: 45 }, (_, i) => ({
    id: `student-crib-${i + 1}`,
    name: `Crib Student ${i + 1}`,
    email: `crib.student${i + 1}@digifunzi.com`,
    role: 'student' as const,
    status: (i < 38 ? 'active' : 'inactive') as const,
    lastLogin: getDateBefore(Math.floor(Math.random() * (i < 38 ? 30 : 120))),
    createdAt: getDateBefore(Math.floor(Math.random() * 365)),
    studentType: (i % 4 === 0 ? 'online' : i % 4 === 1 ? 'offline' : i % 4 === 2 ? 'adult' : 'normal') as const,
    gender: (i % 3 === 0 ? 'male' : i % 3 === 1 ? 'female' : 'other') as const,
    centerId: `center-${(i % 5) + 1}`,
    classType: 'Crib' as const,
    stream: (i % 2 === 0 ? 'Q4' : 'Term 3') as const,
    assignmentCompletionRate: 65 + Math.floor(Math.random() * 30),
    assignmentRetryRate: 10 + Math.floor(Math.random() * 20),
    sessionCompletionRate: 70 + Math.floor(Math.random() * 25),
  })),
  // Clicker students
  ...Array.from({ length: 52 }, (_, i) => ({
    id: `student-clicker-${i + 1}`,
    name: `Clicker Student ${i + 1}`,
    email: `clicker.student${i + 1}@digifunzi.com`,
    role: 'student' as const,
    status: (i < 45 ? 'active' : 'inactive') as const,
    lastLogin: getDateBefore(Math.floor(Math.random() * (i < 45 ? 30 : 120))),
    createdAt: getDateBefore(Math.floor(Math.random() * 365)),
    studentType: (i % 4 === 0 ? 'online' : i % 4 === 1 ? 'offline' : i % 4 === 2 ? 'adult' : 'normal') as const,
    gender: (i % 3 === 0 ? 'male' : i % 3 === 1 ? 'female' : 'other') as const,
    centerId: `center-${(i % 5) + 1}`,
    classType: 'Clicker' as const,
    stream: (i % 2 === 0 ? 'Q4' : 'Term 3') as const,
    assignmentCompletionRate: 70 + Math.floor(Math.random() * 25),
    assignmentRetryRate: 8 + Math.floor(Math.random() * 15),
    sessionCompletionRate: 75 + Math.floor(Math.random() * 20),
  })),
  // Quest students
  ...Array.from({ length: 38 }, (_, i) => ({
    id: `student-quest-${i + 1}`,
    name: `Quest Student ${i + 1}`,
    email: `quest.student${i + 1}@digifunzi.com`,
    role: 'student' as const,
    status: (i < 32 ? 'active' : 'inactive') as const,
    lastLogin: getDateBefore(Math.floor(Math.random() * (i < 32 ? 30 : 120))),
    createdAt: getDateBefore(Math.floor(Math.random() * 365)),
    studentType: (i % 4 === 0 ? 'online' : i % 4 === 1 ? 'offline' : i % 4 === 2 ? 'adult' : 'normal') as const,
    gender: (i % 3 === 0 ? 'male' : i % 3 === 1 ? 'female' : 'other') as const,
    centerId: `center-${(i % 5) + 1}`,
    classType: 'Quest' as const,
    stream: (i % 2 === 0 ? 'Q4' : 'Term 3') as const,
    assignmentCompletionRate: 75 + Math.floor(Math.random() * 20),
    assignmentRetryRate: 5 + Math.floor(Math.random() * 12),
    sessionCompletionRate: 80 + Math.floor(Math.random() * 15),
  })),
];

// Mock Mentors Data
export const mockMentors: Mentor[] = Array.from({ length: 18 }, (_, i) => ({
  id: `mentor-${i + 1}`,
  name: `Mentor ${['John Doe', 'Jane Smith', 'Michael Brown', 'Sarah Johnson', 'David Lee', 'Emily Davis', 'Robert Wilson', 'Lisa Anderson', 'James Taylor', 'Mary Martinez'][i % 10]}`,
  email: `mentor${i + 1}@digifunzi.com`,
  role: 'mentor' as const,
  status: (i < 15 ? 'active' : 'inactive') as const,
  lastLogin: getDateBefore(Math.floor(Math.random() * (i < 15 ? 30 : 120))),
  createdAt: getDateBefore(Math.floor(Math.random() * 500)),
  centerId: `center-${(i % 5) + 1}`,
  loginRate90Days: 55 + Math.floor(Math.random() * 40),
  studentsAssigned: 5 + Math.floor(Math.random() * 15),
}));

// Mock Teachers Data
export const mockTeachers: Teacher[] = Array.from({ length: 12 }, (_, i) => ({
  id: `teacher-${i + 1}`,
  name: `Teacher ${['Alice Cooper', 'Bob Williams', 'Carol Thompson', 'Dan Garcia', 'Eva Rodriguez', 'Frank Martinez', 'Grace Hernandez', 'Henry Lopez'][i % 8]}`,
  email: `teacher${i + 1}@digifunzi.com`,
  role: 'teacher' as const,
  status: (i < 10 ? 'active' : 'inactive') as const,
  lastLogin: getDateBefore(Math.floor(Math.random() * (i < 10 ? 30 : 120))),
  createdAt: getDateBefore(Math.floor(Math.random() * 500)),
  centerId: `center-${(i % 5) + 1}`,
  loginRate90Days: 60 + Math.floor(Math.random() * 35),
  classesAssigned: 2 + Math.floor(Math.random() * 4),
}));

// Mock Parents Data
export const mockParents: Parent[] = Array.from({ length: 95 }, (_, i) => ({
  id: `parent-${i + 1}`,
  name: `Parent ${i + 1}`,
  email: `parent${i + 1}@digifunzi.com`,
  role: 'parent' as const,
  status: (i < 78 ? 'active' : 'inactive') as const,
  lastLogin: getDateBefore(Math.floor(Math.random() * (i < 78 ? 30 : 120))),
  createdAt: getDateBefore(Math.floor(Math.random() * 365)),
  studentsLinked: [`student-${i + 1}`],
}));

// Generate lesson schedules
const generateLessonSchedules = (): LessonSchedule[] => {
  const lessons = [];
  for (let i = -5; i < 15; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    lessons.push({
      date: date.toISOString().split('T')[0],
      lessonTitle: `Lesson ${Math.abs(i) + 1}: ${['Introduction to Coding', 'Variables & Data Types', 'Control Flow', 'Functions', 'Arrays & Objects', 'DOM Manipulation', 'Events', 'APIs'][Math.abs(i) % 8]}`,
      completed: i < 0,
      attendance: i < 0 ? 75 + Math.floor(Math.random() * 20) : undefined,
    });
  }
  return lessons;
};

// Mock Centers Data
export const mockCenters: Center[] = [
  {
    id: 'center-1',
    name: 'DigiFunzi Nairobi Central',
    location: 'Nairobi, Kenya',
    totalStudents: 28,
    technicalMentors: 4,
    teachers: 3,
    streams: 2,
    qaVisits: 8,
    performanceScore: 87,
    completionRate: 82,
    lessonsPerDay: 6,
    schoolBranches: 3,
    classes: {
      crib: {
        totalStudents: 9,
        mentorName: 'John Doe',
        teacherName: 'Alice Cooper',
        sessionCompletionRate: 78,
        assignmentCompletionRate: 72,
        assignmentRetryRate: 15,
        lessonsScheduled: generateLessonSchedules(),
      },
      clicker: {
        totalStudents: 11,
        mentorName: 'Jane Smith',
        teacherName: 'Bob Williams',
        sessionCompletionRate: 82,
        assignmentCompletionRate: 76,
        assignmentRetryRate: 12,
        lessonsScheduled: generateLessonSchedules(),
      },
      quest: {
        totalStudents: 8,
        mentorName: 'Michael Brown',
        teacherName: 'Carol Thompson',
        sessionCompletionRate: 85,
        assignmentCompletionRate: 80,
        assignmentRetryRate: 8,
        lessonsScheduled: generateLessonSchedules(),
      },
    },
  },
  {
    id: 'center-2',
    name: 'DigiFunzi Mombasa',
    location: 'Mombasa, Kenya',
    totalStudents: 25,
    technicalMentors: 3,
    teachers: 2,
    streams: 2,
    qaVisits: 6,
    performanceScore: 83,
    completionRate: 79,
    lessonsPerDay: 5,
    schoolBranches: 2,
    classes: {
      crib: {
        totalStudents: 8,
        mentorName: 'Sarah Johnson',
        teacherName: 'Dan Garcia',
        sessionCompletionRate: 75,
        assignmentCompletionRate: 70,
        assignmentRetryRate: 18,
        lessonsScheduled: generateLessonSchedules(),
      },
      clicker: {
        totalStudents: 10,
        mentorName: 'David Lee',
        teacherName: 'Eva Rodriguez',
        sessionCompletionRate: 80,
        assignmentCompletionRate: 74,
        assignmentRetryRate: 14,
        lessonsScheduled: generateLessonSchedules(),
      },
      quest: {
        totalStudents: 7,
        mentorName: 'Emily Davis',
        teacherName: 'Frank Martinez',
        sessionCompletionRate: 83,
        assignmentCompletionRate: 78,
        assignmentRetryRate: 10,
        lessonsScheduled: generateLessonSchedules(),
      },
    },
  },
  {
    id: 'center-3',
    name: 'DigiFunzi Kisumu',
    location: 'Kisumu, Kenya',
    totalStudents: 32,
    technicalMentors: 4,
    teachers: 3,
    streams: 2,
    qaVisits: 9,
    performanceScore: 90,
    completionRate: 86,
    lessonsPerDay: 7,
    schoolBranches: 4,
    classes: {
      crib: {
        totalStudents: 11,
        mentorName: 'Robert Wilson',
        teacherName: 'Grace Hernandez',
        sessionCompletionRate: 82,
        assignmentCompletionRate: 78,
        assignmentRetryRate: 12,
        lessonsScheduled: generateLessonSchedules(),
      },
      clicker: {
        totalStudents: 13,
        mentorName: 'Lisa Anderson',
        teacherName: 'Henry Lopez',
        sessionCompletionRate: 87,
        assignmentCompletionRate: 82,
        assignmentRetryRate: 9,
        lessonsScheduled: generateLessonSchedules(),
      },
      quest: {
        totalStudents: 8,
        mentorName: 'James Taylor',
        teacherName: 'Alice Cooper',
        sessionCompletionRate: 88,
        assignmentCompletionRate: 85,
        assignmentRetryRate: 7,
        lessonsScheduled: generateLessonSchedules(),
      },
    },
  },
  {
    id: 'center-4',
    name: 'DigiFunzi Nakuru',
    location: 'Nakuru, Kenya',
    totalStudents: 22,
    technicalMentors: 3,
    teachers: 2,
    streams: 2,
    qaVisits: 7,
    performanceScore: 85,
    completionRate: 81,
    lessonsPerDay: 5,
    schoolBranches: 2,
    classes: {
      crib: {
        totalStudents: 7,
        mentorName: 'Mary Martinez',
        teacherName: 'Bob Williams',
        sessionCompletionRate: 77,
        assignmentCompletionRate: 73,
        assignmentRetryRate: 16,
        lessonsScheduled: generateLessonSchedules(),
      },
      clicker: {
        totalStudents: 9,
        mentorName: 'John Doe',
        teacherName: 'Carol Thompson',
        sessionCompletionRate: 81,
        assignmentCompletionRate: 77,
        assignmentRetryRate: 13,
        lessonsScheduled: generateLessonSchedules(),
      },
      quest: {
        totalStudents: 6,
        mentorName: 'Jane Smith',
        teacherName: 'Dan Garcia',
        sessionCompletionRate: 84,
        assignmentCompletionRate: 80,
        assignmentRetryRate: 9,
        lessonsScheduled: generateLessonSchedules(),
      },
    },
  },
  {
    id: 'center-5',
    name: 'DigiFunzi Eldoret',
    location: 'Eldoret, Kenya',
    totalStudents: 28,
    technicalMentors: 4,
    teachers: 2,
    streams: 2,
    qaVisits: 8,
    performanceScore: 88,
    completionRate: 84,
    lessonsPerDay: 6,
    schoolBranches: 3,
    classes: {
      crib: {
        totalStudents: 10,
        mentorName: 'Michael Brown',
        teacherName: 'Eva Rodriguez',
        sessionCompletionRate: 80,
        assignmentCompletionRate: 75,
        assignmentRetryRate: 14,
        lessonsScheduled: generateLessonSchedules(),
      },
      clicker: {
        totalStudents: 9,
        mentorName: 'Sarah Johnson',
        teacherName: 'Frank Martinez',
        sessionCompletionRate: 84,
        assignmentCompletionRate: 80,
        assignmentRetryRate: 11,
        lessonsScheduled: generateLessonSchedules(),
      },
      quest: {
        totalStudents: 9,
        mentorName: 'David Lee',
        teacherName: 'Grace Hernandez',
        sessionCompletionRate: 87,
        assignmentCompletionRate: 83,
        assignmentRetryRate: 8,
        lessonsScheduled: generateLessonSchedules(),
      },
    },
  },
];

// Calculate analytics from mock data
const activeStudents = mockStudents.filter(s => s.status === 'active').length;
const inactiveStudents = mockStudents.filter(s => s.status === 'inactive').length;
const activeMentors = mockMentors.filter(m => m.status === 'active').length;
const inactiveMentors = mockMentors.filter(m => m.status === 'inactive').length;
const activeTeachers = mockTeachers.filter(t => t.status === 'active').length;
const inactiveTeachers = mockTeachers.filter(t => t.status === 'inactive').length;
const activeParents = mockParents.filter(p => p.status === 'active').length;
const inactiveParents = mockParents.filter(p => p.status === 'inactive').length;

// Generate Analytics Data
export const mockAnalyticsData: AnalyticsData = {
  userAnalytics: {
    totalUsers: mockStudents.length + mockMentors.length + mockTeachers.length + mockParents.length,
    usersByRole: {
      students: mockStudents.length,
      mentors: mockMentors.length,
      teachers: mockTeachers.length,
      parents: mockParents.length,
    },
    activeUsers: activeStudents + activeMentors + activeTeachers + activeParents,
    inactiveUsers: inactiveStudents + inactiveMentors + inactiveTeachers + inactiveParents,
    newRegistrations90Days: 42,
  },
  studentAnalytics: {
    total: mockStudents.length,
    active: activeStudents,
    inactive: inactiveStudents,
    byType: {
      online: mockStudents.filter(s => s.studentType === 'online').length,
      offline: mockStudents.filter(s => s.studentType === 'offline').length,
      adult: mockStudents.filter(s => s.studentType === 'adult').length,
      normal: mockStudents.filter(s => s.studentType === 'normal').length,
    },
    assignmentCompletionRate: 74,
    assignmentRetryRate: 12,
    genderDistribution: {
      male: mockStudents.filter(s => s.gender === 'male').length,
      female: mockStudents.filter(s => s.gender === 'female').length,
      other: mockStudents.filter(s => s.gender === 'other').length,
    },
  },
  mentorAnalytics: {
    total: mockMentors.length,
    active: activeMentors,
    inactive: inactiveMentors,
    loginRate90Days: 72,
  },
  teacherAnalytics: {
    total: mockTeachers.length,
    active: activeTeachers,
    inactive: inactiveTeachers,
    loginRate90Days: 78,
  },
  parentAnalytics: {
    total: mockParents.length,
    active: activeParents,
    inactive: inactiveParents,
  },
  chartData: {
    userGrowth: [
      { month: 'Nov', students: 98, mentors: 14, teachers: 9, parents: 72 },
      { month: 'Dec', students: 108, mentors: 15, teachers: 10, parents: 78 },
      { month: 'Jan', students: 118, mentors: 16, teachers: 11, parents: 84 },
      { month: 'Feb', students: 125, mentors: 17, teachers: 11, parents: 88 },
      { month: 'Mar', students: 130, mentors: 18, teachers: 12, parents: 92 },
      { month: 'Apr', students: 135, mentors: 18, teachers: 12, parents: 95 },
    ],
    assignmentTrends: [
      { week: 'Week 1', completionRate: 68, retryRate: 15 },
      { week: 'Week 2', completionRate: 71, retryRate: 14 },
      { week: 'Week 3', completionRate: 73, retryRate: 13 },
      { week: 'Week 4', completionRate: 72, retryRate: 12 },
      { week: 'Week 5', completionRate: 74, retryRate: 12 },
      { week: 'Week 6', completionRate: 76, retryRate: 11 },
    ],
    activityTrends: Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      activeUsers: 140 + Math.floor(Math.random() * 40),
    })),
  },
};

// Generate Centers Analytics
export const mockCentersAnalytics: CentersAnalytics = {
  overview: {
    totalStudents: mockCenters.reduce((sum, c) => sum + c.totalStudents, 0),
    totalMentors: mockCenters.reduce((sum, c) => sum + c.technicalMentors, 0),
    totalTeachers: mockCenters.reduce((sum, c) => sum + c.teachers, 0),
    totalCenters: mockCenters.length,
    lessonsPerDay: Math.round(mockCenters.reduce((sum, c) => sum + c.lessonsPerDay, 0) / mockCenters.length),
    avgQAVisits: Math.round(mockCenters.reduce((sum, c) => sum + c.qaVisits, 0) / mockCenters.length),
  },
  scheduleAnalytics: {
    upcomingLessons: 75,
    completedLessons: 25,
    missedLessons: 3,
    lessonsPerDay: 6,
  },
  qaAnalytics: {
    totalVisits: mockCenters.reduce((sum, c) => sum + c.qaVisits, 0),
    avgVisitsPerCenter: Math.round(mockCenters.reduce((sum, c) => sum + c.qaVisits, 0) / mockCenters.length),
    trend: [
      { month: 'Nov', visits: 32 },
      { month: 'Dec', visits: 35 },
      { month: 'Jan', visits: 36 },
      { month: 'Feb', visits: 37 },
      { month: 'Mar', visits: 38 },
      { month: 'Apr', visits: 38 },
    ],
  },
  centers: mockCenters,
};
