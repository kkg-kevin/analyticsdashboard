import { useState } from 'react';
import { Building2, Users, BookOpen, GraduationCap, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { KPICard } from '../../app/components/shared/KPICard';
import { StatCard } from '../../app/components/shared/StatCard';
import { Card } from '../../app/components/ui/card';
import { LineChartComponent } from '../../charts/LineChartComponent';
import { mockCentersAnalytics } from '../../mock/data/mockData';
import { useThemeStore } from '../../store/useThemeStore';
import { Badge } from '../../app/components/ui/badge';
import { Progress } from '../../app/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../app/components/ui/select';

export function CentersPage() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [selectedCenterId, setSelectedCenterId] = useState(mockCentersAnalytics.centers[0]?.id ?? '');
  const selectedCenter =
    mockCentersAnalytics.centers.find((center) => center.id === selectedCenterId) ??
    mockCentersAnalytics.centers[0];
  const centersCount = mockCentersAnalytics.centers.length || 1;
  const totalBranches = mockCentersAnalytics.centers.reduce((sum, center) => sum + center.schoolBranches, 0);
  const averagePerformance = Math.round(
    mockCentersAnalytics.centers.reduce((sum, center) => sum + center.performanceScore, 0) / centersCount
  );
  const averageCompletion = Math.round(
    mockCentersAnalytics.centers.reduce((sum, center) => sum + center.completionRate, 0) / centersCount
  );
  const classTotals = mockCentersAnalytics.centers.reduce(
    (totals, center) => ({
      crib: totals.crib + center.classes.crib.totalStudents,
      clicker: totals.clicker + center.classes.clicker.totalStudents,
      quest: totals.quest + center.classes.quest.totalStudents,
    }),
    { crib: 0, clicker: 0, quest: 0 }
  );

  const getCenterDetailedView = (center: any) => {
    const classes = [
      { name: 'Crib', data: center.classes.crib, color: '#25476a' },
      { name: 'Clicker', data: center.classes.clicker, color: '#feb139' },
      { name: 'Quest', data: center.classes.quest, color: '#38aae1' },
    ];

    return (
      <div key={center.id} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{center.name}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{center.location}</p>
          </div>
          <Badge variant="outline">{center.totalStudents} Students</Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Students" value={center.totalStudents} color="#feb139" />
          <StatCard label="Mentors" value={center.technicalMentors} color="#25476a" />
          <StatCard label="Teachers" value={center.teachers} color="#feb139" />
          <StatCard label="QA Visits" value={center.qaVisits} color="#25476a" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className={`p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Performance Score</span>
              <span className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{center.performanceScore}%</span>
            </div>
            <Progress value={center.performanceScore} />
          </Card>

          <Card className={`p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Completion Rate</span>
              <Badge variant={center.completionRate >= 80 ? 'default' : 'secondary'}>{center.completionRate}%</Badge>
            </div>
            <Progress value={center.completionRate} />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {classes.map((classInfo) => (
            <Card key={classInfo.name} className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{classInfo.name}</h4>
                <Badge style={{ backgroundColor: classInfo.color, color: 'white' }}>
                  {classInfo.data.totalStudents} students
                </Badge>
              </div>

              <div className="space-y-3">
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Mentor:</span> {classInfo.data.mentorName}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Teacher:</span> {classInfo.data.teacherName}
                </div>

                <div className="space-y-2 pt-3 border-t" style={{ borderColor: isDark ? '#374151' : '#E5E7EB' }}>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Session Completion</span>
                    <span className="text-sm" style={{ color: classInfo.color }}>{classInfo.data.sessionCompletionRate}%</span>
                  </div>
                  <Progress value={classInfo.data.sessionCompletionRate} />

                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Assignment Completion</span>
                    <span className="text-sm" style={{ color: classInfo.color }}>{classInfo.data.assignmentCompletionRate}%</span>
                  </div>
                  <Progress value={classInfo.data.assignmentCompletionRate} />

                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Assignment Retry Rate</span>
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{classInfo.data.assignmentRetryRate}%</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h4 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Lesson Schedule</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {center.classes.crib.lessonsScheduled.slice(0, 10).map((lesson: any, idx: number) => (
              <div
                key={idx}
                className={`flex items-start justify-between gap-4 rounded-lg border p-4 ${
                  isDark ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="min-w-0">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{lesson.date}</p>
                  <p className={`mt-1 truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{lesson.lessonTitle}</p>
                  <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Attendance: {lesson.attendance ? `${lesson.attendance}%` : '-'}
                  </p>
                </div>
                {lesson.completed ? (
                  <Badge variant="default" className="bg-green-600 shrink-0">
                    <CheckCircle2 size={12} className="mr-1" /> Completed
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="shrink-0">
                    <Calendar size={12} className="mr-1" /> Upcoming
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Centers"
          value={mockCentersAnalytics.overview.totalCenters}
          icon={Building2}
          color="#25476a"
        />
        <KPICard
          title="Total Students"
          value={mockCentersAnalytics.overview.totalStudents}
          icon={GraduationCap}
          color="#feb139"
        />
        <KPICard
          title="Technical Mentors"
          value={mockCentersAnalytics.overview.totalMentors}
          icon={Users}
          color="#38aae1"
        />
        <KPICard
          title="Teacher Classes"
          value={mockCentersAnalytics.overview.totalTeachers}
          icon={BookOpen}
          color="#25476a"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Lessons Per Day" value={mockCentersAnalytics.overview.lessonsPerDay} color="#25476a" />
        <StatCard label="School Branches" value={totalBranches} color="#feb139" />
        <StatCard label="Avg QA Visits" value={mockCentersAnalytics.overview.avgQAVisits} color="#38aae1" />
        <StatCard label="Total QA Visits" value={mockCentersAnalytics.qaAnalytics.totalVisits} color="#25476a" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Schedule Analytics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: isDark ? '#1F2937' : '#F9FAFB' }}>
              <div className="flex items-center gap-3">
                <Calendar size={24} style={{ color: '#25476a' }} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Upcoming Lessons</p>
                  <p className={`text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{mockCentersAnalytics.scheduleAnalytics.upcomingLessons}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: isDark ? '#1F2937' : '#F9FAFB' }}>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={24} style={{ color: '#38aae1' }} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Completed Lessons</p>
                  <p className={`text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{mockCentersAnalytics.scheduleAnalytics.completedLessons}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: isDark ? '#1F2937' : '#F9FAFB' }}>
              <div className="flex items-center gap-3">
                <XCircle size={24} style={{ color: '#EF4444' }} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Missed Lessons</p>
                  <p className={`text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{mockCentersAnalytics.scheduleAnalytics.missedLessons}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>QA Visits Trend</h3>
          <LineChartComponent
            data={mockCentersAnalytics.qaAnalytics.trend}
            xKey="month"
            lines={[
              { dataKey: 'visits', color: '#25476a', name: 'QA Visits' },
            ]}
            height={240}
          />
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Centers Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className={`p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h4 className={`mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Students by Class</h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Crib</p>
                <p className={`mt-1 text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{classTotals.crib}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Clicker</p>
                <p className={`mt-1 text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{classTotals.clicker}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Quest</p>
                <p className={`mt-1 text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{classTotals.quest}</p>
              </div>
            </div>
          </Card>

          <Card className={`p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className={`${isDark ? 'text-white' : 'text-gray-900'}`}>Average Performance</h4>
              <span className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{averagePerformance}%</span>
            </div>
            <Progress value={averagePerformance} />
          </Card>

          <Card className={`p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className={`${isDark ? 'text-white' : 'text-gray-900'}`}>Average Completion</h4>
              <Badge variant={averageCompletion >= 80 ? 'default' : 'secondary'}>{averageCompletion}%</Badge>
            </div>
            <Progress value={averageCompletion} />
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className={`text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Detailed Center Analytics</h3>
          <div className="w-full md:w-72">
            <Select value={selectedCenterId} onValueChange={setSelectedCenterId}>
              <SelectTrigger className={isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}>
                <SelectValue placeholder="Select a center" />
              </SelectTrigger>
              <SelectContent>
                {mockCentersAnalytics.centers.map((center) => (
                  <SelectItem key={center.id} value={center.id}>
                    {center.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedCenter && getCenterDetailedView(selectedCenter)}
      </div>
    </div>
  );
}
