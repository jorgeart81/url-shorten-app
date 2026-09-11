import type { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

interface BreakdownItem {
  label: string;
  count: number;
}

interface Props {
  title: string;
  data: BreakdownItem[];
}

export const ClickBreakdownChart: FC<Props> = ({ title, data }) => {
  if (data.length === 0) return null;

  return (
    <div className='flex flex-col gap-2'>
      <h4 className='text-sm font-medium'>{title}</h4>
      <ResponsiveContainer width='100%' height={160}>
        <BarChart data={data} layout='vertical' margin={{ left: 8 }}>
          <CartesianGrid horizontal={false} strokeOpacity={0.2} />
          <XAxis type='number' hide />
          <YAxis
            type='category'
            dataKey='label'
            width={90}
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey='count' fill='var(--chart-1)' radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
