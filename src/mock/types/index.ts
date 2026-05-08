export type UserRole = 'student' | 'mentor' | 'teacher' | 'parent';
export type UserStatus = 'active' | 'inactive';
export type Gender = 'male' | 'female' | 'other';
export type StudentType = 'online' | 'offline' | 'adult' | 'normal';
export type ClassType = 'Crib' | 'Clicker' | 'Quest';
export type StreamType = 'Q4' | 'Term 3';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  createdAt: string;
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  studentType: StudentType;
  gender: Gender;
  centerId: string;
  classType: ClassType;
  stream: StreamType;
  assignmentCompletionRate: number;
  assignmentRetryRate: number;
  sessionCompletionRate: number;
}

export interface Mentor extends User {
  role: 'mentor';
  centerId: string;
  loginRate90Days: number;
  studentsAssigned: number;
}

export interface Teacher extends User {
  role: 'teacher';
  centerId: string;
  loginRate90Days: number;
  classesAssigned: number;
}

export interface Parent extends User {
  role: 'parent';
  studentsLinked: string[];
}

export interface Center {
  id: string;
  name: string;
  location: string;
  totalStudents: number;
  technicalMentors: number;
  teachers: number;
  streams: number;
  qaVisits: number;
  performanceScore: number;
  completionRate: number;
  lessonsPerDay: number;
  schoolBranches: number;
  classes: {
    crib: ClassMetrics;
    clicker: ClassMetrics;
    quest: ClassMetrics;
  };
}

export interface ClassMetrics {
  totalStudents: number;
  mentorName: string;
  teacherName: string;
  sessionCompletionRate: number;
  assignmentCompletionRate: number;
  assignmentRetryRate: number;
  lessonsScheduled: LessonSchedule[];
}

export interface LessonSchedule {
  date: string;
  lessonTitle: string;
  completed: boolean;
  attendance?: number;
}

export interface AnalyticsData {
  userAnalytics: {
    totalUsers: number;
    usersByRole: {
      students: number;
      mentors: number;
      teachers: number;
      parents: number;
    };
    activeUsers: number;
    inactiveUsers: number;
    newRegistrations90Days: number;
  };
  studentAnalytics: {
    total: number;
    active: number;
    inactive: number;
    byType: {
      online: number;
      offline: number;
      adult: number;
      normal: number;
    };
    assignmentCompletionRate: number;
    assignmentRetryRate: number;
    genderDistribution: {
      male: number;
      female: number;
      other: number;
    };
  };
  mentorAnalytics: {
    total: number;
    active: number;
    inactive: number;
    loginRate90Days: number;
  };
  teacherAnalytics: {
    total: number;
    active: number;
    inactive: number;
    loginRate90Days: number;
  };
  parentAnalytics: {
    total: number;
    active: number;
    inactive: number;
  };
  chartData: {
    userGrowth: Array<{ month: string; students: number; mentors: number; teachers: number; parents: number }>;
    assignmentTrends: Array<{ week: string; completionRate: number; retryRate: number }>;
    activityTrends: Array<{ date: string; activeUsers: number }>;
  };
}

export interface CentersAnalytics {
  overview: {
    totalStudents: number;
    totalMentors: number;
    totalTeachers: number;
    totalCenters: number;
    lessonsPerDay: number;
    avgQAVisits: number;
  };
  scheduleAnalytics: {
    upcomingLessons: number;
    completedLessons: number;
    missedLessons: number;
    lessonsPerDay: number;
  };
  qaAnalytics: {
    totalVisits: number;
    avgVisitsPerCenter: number;
    trend: Array<{ month: string; visits: number }>;
  };
  centers: Center[];
}
