import { Users, GraduationCap, BookOpen, UserCircle, TrendingUp, Activity } from 'lucide-react';
import { KPICard } from '../../app/components/shared/KPICard';
import { Card } from '../../app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../app/components/ui/tabs';
import { AreaChartComponent } from '../../charts/AreaChartComponent';
import { BarChartComponent } from '../../charts/BarChartComponent';
import { DonutChartComponent } from '../../charts/DonutChartComponent';
import { LineChartComponent } from '../../charts/LineChartComponent';
import { DataTable } from '../../app/components/shared/DataTable';
import { mockAnalyticsData, mockStudents, mockMentors, mockTeachers, mockParents } from '../../mock/data/mockData';
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
    { name: 'Male', value: mockAnalyticsData.studentAnalytics.genderDistribution.male },
    { name: 'Female', value: mockAnalyticsData.studentAnalytics.genderDistribution.female },
    { name: 'Other', value: mockAnalyticsData.studentAnalytics.genderDistribution.other },
  ];

  const studentTypeData = [
    { name: 'Online', value: mockAnalyticsData.studentAnalytics.byType.online },
    { name: 'Offline', value: mockAnalyticsData.studentAnalytics.byType.offline },
    { name: 'Adult', value: mockAnalyticsData.studentAnalytics.byType.adult },
    { name: 'Normal', value: mockAnalyticsData.studentAnalytics.byType.normal },
  ];

  const studentColumns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'classType', header: 'Class', sortable: true },
    { key: 'studentType', header: 'Type', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (student: any) => (
        <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
          {student.status}
        </Badge>
      ),
    },
    {
      key: 'assignmentCompletionRate',
      header: 'Completion Rate',
      sortable: true,
      render: (student: any) => `${student.assignmentCompletionRate}%`,
    },
  ];

  const mentorColumns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (mentor: any) => (
        <Badge variant={mentor.status === 'active' ? 'default' : 'secondary'}>
          {mentor.status}
        </Badge>
      ),
    },
    {
      key: 'loginRate90Days',
      header: 'Login Rate (90d)',
      sortable: true,
      render: (mentor: any) => `${mentor.loginRate90Days}%`,
    },
    { key: 'studentsAssigned', header: 'Students', sortable: true },
  ];

  const teacherColumns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (teacher: any) => (
        <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
          {teacher.status}
        </Badge>
      ),
    },
    {
      key: 'loginRate90Days',
      header: 'Login Rate (90d)',
      sortable: true,
      render: (teacher: any) => `${teacher.loginRate90Days}%`,
    },
    { key: 'classesAssigned', header: 'Classes', sortable: true },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Students"
              value={mockAnalyticsData.studentAnalytics.total}
              icon={GraduationCap}
              color="#25476a"
            />
            <KPICard
              title="Active Students"
              value={mockAnalyticsData.studentAnalytics.active}
              icon={Activity}
              color="#38aae1"
            />
            <KPICard
              title="Assignment Completion"
              value={`${mockAnalyticsData.studentAnalytics.assignmentCompletionRate}%`}
              icon={TrendingUp}
              color="#feb139"
            />
            <KPICard
              title="Assignment Retry Rate"
              value={`${mockAnalyticsData.studentAnalytics.assignmentRetryRate}%`}
              icon={BookOpen}
              color="#25476a"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Gender Distribution</h3>
              <DonutChartComponent
                data={genderData}
                colors={['#25476a', '#feb139', '#38aae1']}
                height={280}
              />
            </Card>

            <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Student Types</h3>
              <DonutChartComponent
                data={studentTypeData}
                colors={['#25476a', '#feb139', '#38aae1', '#6B7280']}
                height={280}
              />
            </Card>
          </div>

          <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Assignment Trends</h3>
            <LineChartComponent
              data={mockAnalyticsData.chartData.assignmentTrends}
              xKey="week"
              lines={[
                { dataKey: 'completionRate', color: '#25476a', name: 'Completion Rate' },
                { dataKey: 'retryRate', color: '#feb139', name: 'Retry Rate' },
              ]}
              height={300}
            />
          </Card>

          <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>All Students</h3>
            <DataTable
              data={mockStudents.slice(0, 50)}
              columns={studentColumns}
              searchPlaceholder="Search students..."
            />
          </Card>
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

          <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>All Mentors</h3>
            <DataTable
              data={mockMentors}
              columns={mentorColumns}
              searchPlaceholder="Search mentors..."
            />
          </Card>
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

          <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>All Teachers</h3>
            <DataTable
              data={mockTeachers}
              columns={teacherColumns}
              searchPlaceholder="Search teachers..."
            />
          </Card>
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

          <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>All Parents</h3>
            <DataTable
              data={mockParents.slice(0, 50)}
              columns={[
                { key: 'name', header: 'Name', sortable: true },
                { key: 'email', header: 'Email', sortable: true },
                {
                  key: 'status',
                  header: 'Status',
                  sortable: true,
                  render: (parent: any) => (
                    <Badge variant={parent.status === 'active' ? 'default' : 'secondary'}>
                      {parent.status}
                    </Badge>
                  ),
                },
                {
                  key: 'studentsLinked',
                  header: 'Linked Students',
                  render: (parent: any) => parent.studentsLinked.length,
                },
              ]}
              searchPlaceholder="Search parents..."
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
