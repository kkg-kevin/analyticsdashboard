import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useThemeStore } from '../store/useThemeStore';

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export function DonutChartComponent({
  data,
  colors,
  height = 300,
  innerRadius = 60,
  outerRadius = 100,
}: DonutChartProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
            border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
            borderRadius: '8px',
            color: isDark ? '#F9FAFB' : '#111827',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
