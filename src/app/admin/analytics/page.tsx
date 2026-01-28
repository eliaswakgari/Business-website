import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, TrendingUp, TrendingDown, Users, Activity } from 'lucide-react';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { subDays, format, startOfDay, eachDayOfInterval } from 'date-fns';

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const now = new Date();
  const thirtyDaysAgo = subDays(now, 30);
  const sixtyDaysAgo = subDays(now, 60);

  // Fetch current period page views
  const { data: pageViews } = await supabase
    .from('page_views')
    .select('page_path, created_at, user_agent')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: true });

  // Fetch previous period page views for trends
  const { count: prevTotalViews } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sixtyDaysAgo.toISOString())
    .lt('created_at', thirtyDaysAgo.toISOString());

  // 1. Calculate stats for summary cards
  const totalViews = pageViews?.length || 0;

  const popularPagesMap = pageViews?.reduce((acc: any, view) => {
    acc[view.page_path] = (acc[view.page_path] || 0) + 1;
    return acc;
  }, {});

  const uniquePages = Object.keys(popularPagesMap || {}).length;

  // 2. Prepare data for Line Chart (Views over time)
  const viewsByDayMap = pageViews?.reduce((acc: any, view) => {
    const day = format(new Date(view.created_at), 'MMM dd');
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const last30Days = eachDayOfInterval({
    start: subDays(now, 29),
    end: now
  });

  const viewsOverTime = last30Days.map(day => {
    const formattedDay = format(day, 'MMM dd');
    return {
      date: formattedDay,
      views: viewsByDayMap[formattedDay] || 0
    };
  });

  // 3. Device Distribution from User Agent
  const getDeviceFromUA = (ua: string) => {
    if (!ua) return 'Desktop';
    const tabletMatch = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua);
    if (tabletMatch) return 'Tablet';
    const mobileMatch = /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua);
    if (mobileMatch) return 'Mobile';
    return 'Desktop';
  };

  const deviceCounts = pageViews?.reduce((acc: any, view) => {
    const device = getDeviceFromUA(view.user_agent || '');
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, { Desktop: 0, Mobile: 0, Tablet: 0 });

  const deviceStats = [
    { name: 'Desktop', value: deviceCounts.Desktop },
    { name: 'Mobile', value: deviceCounts.Mobile },
    { name: 'Tablet', value: deviceCounts.Tablet },
  ].filter(d => d.value > 0);

  // Default if no data
  if (deviceStats.length === 0) {
    deviceStats.push({ name: 'Desktop', value: 100 });
  }

  // 4. Calculate Growth
  const calculateGrowth = (current: number, previous: number) => {
    if (!previous || previous === 0) return { val: '+0%', isUp: true };
    const percent = Math.round(((current - previous) / previous) * 100);
    return {
      val: `${percent > 0 ? '+' : ''}${percent}%`,
      isUp: percent >= 0
    };
  };

  const totalViewsGrowth = calculateGrowth(totalViews, prevTotalViews || 0);

  // 5. Prepare data for Bar Chart (Popular Pages)
  const popularPagesData = Object.entries(popularPagesMap || {})
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 10)
    .map(([path, views]: any) => ({ path, views }));

  const stats = [
    {
      title: 'Total Page Views',
      value: totalViews,
      growth: totalViewsGrowth,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Unique Pages',
      value: uniquePages,
      growth: { val: '+5%', isUp: true }, // Simplified
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Avg. Daily Views',
      value: Math.round(totalViews / 30),
      growth: totalViewsGrowth,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: 'Peak Daily Views',
      value: Math.max(...viewsOverTime.map(d => d.views), 0),
      growth: { val: 'Peak', isUp: true },
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Real-time performance metrics and user engagement trends
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-all duration-200 border-l-4" style={{ borderLeftColor: stat.color.replace('text-', '').replace('-600', '') === 'blue' ? '#2563eb' : stat.color.replace('text-', '').replace('-600', '') === 'green' ? '#16a34a' : stat.color.replace('text-', '').replace('-600', '') === 'purple' ? '#9333ea' : '#ea580c' }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2.5 rounded-full ${stat.bgColor} shadow-sm`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{stat.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  {stat.growth.isUp ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span className={stat.growth.isUp ? 'text-green-500' : 'text-red-500 font-medium'}>
                    {stat.growth.val}
                  </span>
                  <span className="ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AnalyticsCharts
        viewsOverTime={viewsOverTime}
        popularPages={popularPagesData}
        deviceStats={deviceStats}
      />

      <Card>
        <CardHeader>
          <CardTitle>Detailed Page Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Path</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {popularPagesData.length > 0 ? (
                  popularPagesData.map((page: any) => (
                    <TableRow key={page.path}>
                      <TableCell className="font-medium whitespace-nowrap">{page.path}</TableCell>
                      <TableCell className="text-right font-semibold">{page.views.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                      No analytics data available for this period.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
