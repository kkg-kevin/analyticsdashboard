import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useThemeStore } from '../store/useThemeStore';

interface LineChartProps {
  data: any[];
  xKey: string;
  lines: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
  height?: number;
}

export function LineChartComponent({ data, xKey, lines, height = 300 }: LineChartProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
        <XAxis
          dataKey={xKey}
          stroke={isDark ? '#9CA3AF' : '#6B7280'}
          style={{ fontSize: '12px' }}
        />
        <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} style={{ fontSize: '12px' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
            border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
            borderRadius: '8px',
            color: isDark ? '#F9FAFB' : '#111827',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.color}
            strokeWidth={2}
            dot={{ fill: line.color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
