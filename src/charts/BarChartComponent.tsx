import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useThemeStore } from '../store/useThemeStore';

interface BarChartProps {
  data: any[];
  xKey: string;
  bars: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
  height?: number;
  layout?: 'horizontal' | 'vertical';
}

export function BarChartComponent({ data, xKey, bars, height = 300, layout = 'horizontal' }: BarChartProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout={layout} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
        {layout === 'horizontal' ? (
          <>
            <XAxis
              dataKey={xKey}
              stroke={isDark ? '#9CA3AF' : '#6B7280'}
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} style={{ fontSize: '12px' }} />
          </>
        ) : (
          <>
            <XAxis type="number" stroke={isDark ? '#9CA3AF' : '#6B7280'} style={{ fontSize: '12px' }} />
            <YAxis
              type="category"
              dataKey={xKey}
              stroke={isDark ? '#9CA3AF' : '#6B7280'}
              style={{ fontSize: '12px' }}
            />
          </>
        )}
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
            border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
            borderRadius: '8px',
            color: isDark ? '#F9FAFB' : '#111827',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        {bars.map((bar) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={bar.color}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
