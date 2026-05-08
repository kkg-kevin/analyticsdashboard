import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useThemeStore } from '../store/useThemeStore';

interface AreaChartProps {
  data: any[];
  xKey: string;
  areas: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
  height?: number;
}

export function AreaChartComponent({ data, xKey, areas, height = 300 }: AreaChartProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {areas.map((area) => (
            <linearGradient key={area.dataKey} id={`color-${area.dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={area.color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={area.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
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
        {areas.map((area) => (
          <Area
            key={area.dataKey}
            type="monotone"
            dataKey={area.dataKey}
            name={area.name}
            stroke={area.color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#color-${area.dataKey})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
