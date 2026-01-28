'use client';

import { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AnalyticsChartsProps {
    viewsOverTime: { date: string; views: number }[];
    popularPages: { path: string; views: number }[];
    deviceStats: { name: string; value: number }[];
}

export function AnalyticsCharts({ viewsOverTime, popularPages, deviceStats }: AnalyticsChartsProps) {
    const chartColors = {
        primary: 'hsl(var(--primary))',
        muted: 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        pie: [
            '#3b82f6', // blue
            '#8b5cf6', // violet
            '#ec4899', // pink
            '#10b981', // emerald
        ]
    };

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Views Over Time Line Chart - Spans 4 columns */}
            <Card className="col-span-2 lg:col-span-4 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>Traffic Overview</CardTitle>
                    <CardDescription>Daily page views trend</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={viewsOverTime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: chartColors.muted }}
                                    minTickGap={30}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: chartColors.muted }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        borderRadius: '8px',
                                        border: '1px solid hsl(var(--border))',
                                        fontSize: '12px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke={chartColors.primary}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorViews)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Popular Pages Bar Chart - Spans 3 columns */}
            <Card className="col-span-2 lg:col-span-3 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>Top Content</CardTitle>
                    <CardDescription>Most visited pages</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={popularPages} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.1} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="path"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: chartColors.muted }}
                                    width={80}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        borderRadius: '8px',
                                        border: '1px solid hsl(var(--border))',
                                        fontSize: '12px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Bar
                                    dataKey="views"
                                    fill={chartColors.primary}
                                    radius={[0, 4, 4, 0]}
                                    barSize={24}
                                    animationDuration={1500}
                                >
                                    {popularPages.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${1 - (index * 0.08)})`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Device Distribution Pie Chart */}
            <Card className="col-span-2 lg:col-span-3 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>Device Distribution</CardTitle>
                    <CardDescription>Visitors by device type</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deviceStats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {deviceStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={chartColors.pie[index % chartColors.pie.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        borderRadius: '8px',
                                        border: '1px solid hsl(var(--border))',
                                        fontSize: '12px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Example 4th Card for additional stats or graph to balance layout */}
            <Card className="col-span-2 lg:col-span-4 bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                <CardHeader>
                    <CardTitle className="text-primary">Performance Score</CardTitle>
                    <CardDescription>Overall site health and speed</CardDescription>
                </CardHeader>
                <CardContent className="h-[200px] flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">98%</div>
                        <p className="text-sm text-muted-foreground">Excellent performance</p>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

