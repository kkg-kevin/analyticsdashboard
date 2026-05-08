import type { ReactNode } from 'react';
import { Users, GraduationCap, BookOpen, UserCircle, TrendingUp, Activity } from 'lucide-react';
import { KPICard } from '../../app/components/shared/KPICard';
import { Card } from '../../app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../app/components/ui/tabs';
import { DataTable } from '../../app/components/shared/DataTable';
import { mockAnalyticsData, mockMentors, mockTeachers, mockParents } from '../../mock/data/mockData';
import { useThemeStore } from '../../store/useThemeStore';
import { Progress } from '../../app/components/ui/progress';
import { Badge } from '../../app/components/ui/badge';

export function AnalyticsPage() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const roleMetrics = [
    {
      label: 'Students',
      total: mockAnalyticsData.userAnalytics.usersByRole.students,
      active: mockAnalyticsData.studentAnalytics.active,
      inactive: mockAnalyticsData.studentAnalytics.inactive,
      color: '#25476a',
    },
    {
      label: 'Mentors',
      total: mockAnalyticsData.userAnalytics.usersByRole.mentors,
      active: mockAnalyticsData.mentorAnalytics.active,
      inactive: mockAnalyticsData.mentorAnalytics.inactive,
      color: '#feb139',
    },
    {
      label: 'Teachers',
      total: mockAnalyticsData.userAnalytics.usersByRole.teachers,
      active: mockAnalyticsData.teacherAnalytics.active,
      inactive: mockAnalyticsData.teacherAnalytics.inactive,
      color: '#38aae1',
    },
    {
      label: 'Parents',
      total: mockAnalyticsData.userAnalytics.usersByRole.parents,
      active: mockAnalyticsData.parentAnalytics.active,
      inactive: mockAnalyticsData.parentAnalytics.inactive,
      color: '#6B7280',
    },
  ];

  const genderData = [
    { label: 'Male', value: mockAnalyticsData.studentAnalytics.genderDistribution.male, color: '#25476a' },
    { label: 'Female', value: mockAnalyticsData.studentAnalytics.genderDistribution.female, color: '#feb139' },
    { label: 'Other', value: mockAnalyticsData.studentAnalytics.genderDistribution.other, color: '#38aae1' },
  ];

  const studentTypeData = [
    { label: 'Online', value: mockAnalyticsData.studentAnalytics.byType.online, color: '#25476a' },
    { label: 'Offline', value: mockAnalyticsData.studentAnalytics.byType.offline, color: '#feb139' },
    { label: 'Adult', value: mockAnalyticsData.studentAnalytics.byType.adult, color: '#38aae1' },
    { label: 'Normal', value: mockAnalyticsData.studentAnalytics.byType.normal, color: '#6B7280' },
  ];

  const studentStatusData = [
    { label: 'Total', value: mockAnalyticsData.studentAnalytics.total, color: '#25476a' },
    { label: 'Active', value: mockAnalyticsData.studentAnalytics.active, color: '#38aae1' },
    { label: 'Inactive', value: mockAnalyticsData.studentAnalytics.inactive, color: '#6B7280' },
  ];

  const assignmentPerformanceData = [
    { label: 'Completion Rate', value: mockAnalyticsData.studentAnalytics.assignmentCompletionRate, color: '#25476a' },
    { label: 'Retry Rate', value: mockAnalyticsData.studentAnalytics.assignmentRetryRate, color: '#feb139' },
  ];

  const renderUserSummaryCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    metricKey,
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: typeof Users;
    color: string;
    metricKey?: 'total' | 'active' | 'inactive';
  }) => (
    <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:items-center">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg shrink-0" style={{ backgroundColor: `${color}20` }}>
            <Icon size={24} style={{ color }} />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
            <h3 className={`mt-1 text-3xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</h3>
            {subtitle && <p className={`mt-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{subtitle}</p>}
          </div>
        </div>

        {metricKey && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {roleMetrics.map((role) => {
              const metricValue = role[metricKey];
              const progress = Math.round((metricValue / Number(value)) * 100);

              return (
                <div
                  key={`${metricKey}-${role.label}`}
                  className={`relative overflow-hidden rounded-lg border px-4 py-3.5 transition-shadow hover:shadow-sm ${
                    isDark ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="relative flex items-end justify-between gap-4">
                    <div>
                      <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{role.label}</p>
                      <p className="text-2xl leading-none" style={{ color: role.color }}>
                        {metricValue.toLocaleString()}
                      </p>
                    </div>
                    <span className={`pb-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{progress}%</span>
                  </div>
                  <div className={`mt-3 h-1.5 overflow-hidden rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: role.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );

  const renderMetricTiles = (
    items: Array<{ label: string; value: number; color: string }>,
    total: number,
    valueSuffix = ''
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {items.map((item) => {
        const progress = valueSuffix ? item.value : Math.round((item.value / total) * 100);

        return (
          <div
            key={item.label}
            className={`rounded-lg border px-4 py-3.5 transition-shadow hover:shadow-sm ${
              isDark ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</p>
                <p className="text-2xl leading-none" style={{ color: item.color }}>
                  {item.value.toLocaleString()}{valueSuffix}
                </p>
              </div>
              <span className={`pb-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{progress}%</span>
            </div>
            <div className={`mt-3 h-1.5 overflow-hidden rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderStudentMetricCard = ({
    title,
    value,
    icon: Icon,
    color,
    children,
  }: {
    title: string;
    value: string | number;
    icon: typeof Users;
    color: string;
    children: ReactNode;
  }) => (
    <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:items-center">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg shrink-0" style={{ backgroundColor: `${color}20` }}>
            <Icon size={24} style={{ color }} />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
            <h3 className={`mt-1 text-3xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</h3>
          </div>
        </div>
        {children}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {renderUserSummaryCard({
          title: 'Users by Role',
          value: mockAnalyticsData.userAnalytics.totalUsers.toLocaleString(),
          icon: Users,
          color: '#25476a',
          metricKey: 'total',
        })}

        {renderUserSummaryCard({
          title: 'Active Users',
          value: mockAnalyticsData.userAnalytics.activeUsers.toLocaleString(),
          subtitle: 'Last 90 days',
          icon: Activity,
          color: '#38aae1',
          metricKey: 'active',
        })}

        {renderUserSummaryCard({
          title: 'Inactive Users',
          value: mockAnalyticsData.userAnalytics.inactiveUsers.toLocaleString(),
          subtitle: 'Last 90 days',
          icon: Users,
          color: '#6B7280',
          metricKey: 'inactive',
        })}

        {renderUserSummaryCard({
          title: 'New User Registration',
          value: mockAnalyticsData.userAnalytics.newRegistrations90Days,
          subtitle: 'Last 90 days',
          icon: TrendingUp,
          color: '#feb139',
        })}
      </div>

      <Tabs defaultValue="students" className="space-y-6">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="parents">Parents</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6">
          <div className="space-y-4">
            {renderStudentMetricCard({
              title: 'Student Summary',
              value: mockAnalyticsData.studentAnalytics.total.toLocaleString(),
              icon: GraduationCap,
              color: '#25476a',
              children: renderMetricTiles(studentStatusData, mockAnalyticsData.studentAnalytics.total),
            })}

            {renderStudentMetricCard({
              title: 'Student Type',
              value: mockAnalyticsData.studentAnalytics.total.toLocaleString(),
              icon: Users,
              color: '#feb139',
              children: renderMetricTiles(studentTypeData, mockAnalyticsData.studentAnalytics.total),
            })}

            {renderStudentMetricCard({
              title: 'Assignment Performance',
              value: `${mockAnalyticsData.studentAnalytics.assignmentCompletionRate}%`,
              icon: TrendingUp,
              color: '#38aae1',
              children: renderMetricTiles(assignmentPerformanceData, 100, '%'),
            })}

            {renderStudentMetricCard({
              title: 'Gender',
              value: mockAnalyticsData.studentAnalytics.total.toLocaleString(),
              icon: UserCircle,
              color: '#6B7280',
              children: renderMetricTiles(genderData, mockAnalyticsData.studentAnalytics.total),
            })}
          </div>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KPICard
              title="Total Mentors"
              value={mockAnalyticsData.mentorAnalytics.total}
              icon={Users}
              color="#25476a"
            />
            <KPICard
              title="Active Mentors"
              value={mockAnalyticsData.mentorAnalytics.active}
              icon={Activity}
              color="#38aae1"
            />
            <KPICard
              title="Login Rate (90 days)"
              value={`${mockAnalyticsData.mentorAnalytics.loginRate90Days}%`}
              icon={TrendingUp}
              color="#feb139"
            />
          </div>

          <div className="space-y-4">
            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Mentors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockMentors.map((mentor) => (
                <Card
                  key={mentor.id}
                  className={`p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className={`truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{mentor.name}</h4>
                      <p className={`mt-1 truncate text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{mentor.email}</p>
                    </div>
                    <Badge variant={mentor.status === 'active' ? 'default' : 'secondary'} className="shrink-0">
                      {mentor.status}
                    </Badge>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Students</p>
                      <p className={`mt-1 text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{mentor.studentsAssigned}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Login Rate</p>
                      <p className="mt-1 text-2xl" style={{ color: '#38aae1' }}>{mentor.loginRate90Days}%</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Last 90 days</span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{mentor.loginRate90Days}%</span>
                    </div>
                    <Progress value={mentor.loginRate90Days} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KPICard
              title="Total Teachers"
              value={mockAnalyticsData.teacherAnalytics.total}
              icon={BookOpen}
              color="#25476a"
            />
            <KPICard
              title="Active Teachers"
              value={mockAnalyticsData.teacherAnalytics.active}
              icon={Activity}
              color="#38aae1"
            />
            <KPICard
              title="Login Rate (90 days)"
              value={`${mockAnalyticsData.teacherAnalytics.loginRate90Days}%`}
              icon={TrendingUp}
              color="#feb139"
            />
          </div>

          <div className="space-y-4">
            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Teachers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockTeachers.map((teacher) => (
                <Card
                  key={teacher.id}
                  className={`p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className={`truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{teacher.name}</h4>
                      <p className={`mt-1 truncate text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{teacher.email}</p>
                    </div>
                    <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'} className="shrink-0">
                      {teacher.status}
                    </Badge>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Classes</p>
                      <p className={`mt-1 text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{teacher.classesAssigned}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Login Rate</p>
                      <p className="mt-1 text-2xl" style={{ color: '#38aae1' }}>{teacher.loginRate90Days}%</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Last 90 days</span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{teacher.loginRate90Days}%</span>
                    </div>
                    <Progress value={teacher.loginRate90Days} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="parents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KPICard
              title="Total Parents"
              value={mockAnalyticsData.parentAnalytics.total}
              icon={UserCircle}
              color="#25476a"
            />
            <KPICard
              title="Active Parents"
              value={mockAnalyticsData.parentAnalytics.active}
              icon={Activity}
              color="#38aae1"
            />
            <KPICard
              title="Inactive Parents"
              value={mockAnalyticsData.parentAnalytics.inactive}
              icon={Users}
              color="#6B7280"
            />
          </div>

          <div className="space-y-4">
            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Parents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockParents.slice(0, 50).map((parent) => (
                <Card
                  key={parent.id}
                  className={`p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className={`truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{parent.name}</h4>
                      <p className={`mt-1 truncate text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{parent.email}</p>
                    </div>
                    <Badge variant={parent.status === 'active' ? 'default' : 'secondary'} className="shrink-0">
                      {parent.status}
                    </Badge>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Linked Students</p>
                      <p className={`mt-1 text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{parent.studentsLinked.length}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                      <p
                        className="mt-1 text-2xl capitalize"
                        style={{ color: parent.status === 'active' ? '#38aae1' : '#6B7280' }}
                      >
                        {parent.status}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
