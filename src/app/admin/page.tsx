import { createClient } from '@/lib/supabase/server';
import {
    FileText,
    Users,
    MessageSquare,
    Eye,
    TrendingUp,
    TrendingDown,
    Activity,
    Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { subDays, formatDistanceToNow } from 'date-fns';

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Time ranges for trends
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);
    const sixtyDaysAgo = subDays(now, 60);

    // Fetch dashboard stats (Total and current month)
    const [
        { count: postsCount },
        { count: prevPostsCount },
        { count: pagesCount },
        { count: prevPagesCount },
        { count: unreadContactsCount },
        { count: totalContactsCount },
        { count: prevContactsCount },
        { count: viewsCount },
        { count: prevViewsCount },
        { data: recentActivityData },
        { data: pageViewsData },
    ] = await Promise.all([
        supabase.from('posts').select('*', { count: 'exact', head: true }),
        supabase.from('posts').select('*', { count: 'exact', head: true }).lt('created_at', thirtyDaysAgo.toISOString()).gt('created_at', sixtyDaysAgo.toISOString()),
        supabase.from('pages').select('*', { count: 'exact', head: true }),
        supabase.from('pages').select('*', { count: 'exact', head: true }).lt('created_at', thirtyDaysAgo.toISOString()).gt('created_at', sixtyDaysAgo.toISOString()),
        supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }).lt('created_at', thirtyDaysAgo.toISOString()).gt('created_at', sixtyDaysAgo.toISOString()),
        supabase.from('page_views').select('*', { count: 'exact', head: true }),
        supabase.from('page_views').select('*', { count: 'exact', head: true }).lt('created_at', thirtyDaysAgo.toISOString()).gt('created_at', sixtyDaysAgo.toISOString()),
        // Fetch activity logs (fallback to recent items if empty)
        supabase.from('activity_logs').select('*, profiles(full_name)').order('created_at', { ascending: false }).limit(5),
        // Fetch page views for popular content
        supabase.from('page_views').select('page_path').limit(1000),
    ]);

    // Calculate trends
    const calculateTrend = (current: number, previous: number) => {
        if (!previous || previous === 0) return { val: '+0%', isUp: true };
        const percent = Math.round(((current - previous) / previous) * 100);
        return {
            val: `${percent > 0 ? '+' : ''}${percent}%`,
            isUp: percent >= 0
        };
    };

    const stats = [
        {
            title: 'Total Posts',
            value: postsCount || 0,
            icon: FileText,
            trend: calculateTrend(postsCount || 0, prevPostsCount || 0),
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
        },
        {
            title: 'Total Pages',
            value: pagesCount || 0,
            icon: FileText,
            trend: calculateTrend(pagesCount || 0, prevPagesCount || 0),
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-950',
        },
        {
            title: 'Unread Messages',
            value: unreadContactsCount || 0,
            icon: MessageSquare,
            trend: calculateTrend(totalContactsCount || 0, prevContactsCount || 0),
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-950',
        },
        {
            title: 'Total Views',
            value: viewsCount || 0,
            icon: Eye,
            trend: calculateTrend(viewsCount || 0, prevViewsCount || 0),
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-950',
        },
    ];

    // Process Recent Activity (If activity_logs is empty, generate from other tables)
    let recentActivity = recentActivityData?.map(log => ({
        id: log.id,
        title: log.action,
        user: log.profiles?.full_name || 'System',
        time: formatDistanceToNow(new Date(log.created_at), { addSuffix: true }),
        type: log.entity_type
    })) || [];

    if (recentActivity.length === 0) {
        // Fallback: Fetch latest post and page and contact
        const [
            { data: latestPost },
            { data: latestPage },
            { data: latestContact }
        ] = await Promise.all([
            supabase.from('posts').select('title, created_at').order('created_at', { ascending: false }).limit(1).single(),
            supabase.from('pages').select('title, created_at').order('created_at', { ascending: false }).limit(1).single(),
            supabase.from('contacts').select('name, created_at').order('created_at', { ascending: false }).limit(1).single(),
        ]);

        if (latestPost) recentActivity.push({ id: 'p1', title: `Post published: ${latestPost.title}`, user: 'System', time: formatDistanceToNow(new Date(latestPost.created_at), { addSuffix: true }), type: 'post' });
        if (latestPage) recentActivity.push({ id: 'pg1', title: `Page updated: ${latestPage.title}`, user: 'System', time: formatDistanceToNow(new Date(latestPage.created_at), { addSuffix: true }), type: 'page' });
        if (latestContact) recentActivity.push({ id: 'c1', title: `New message from ${latestContact.name}`, user: 'System', time: formatDistanceToNow(new Date(latestContact.created_at), { addSuffix: true }), type: 'contact' });

        recentActivity.sort((a, b) => b.time.localeCompare(a.time));
    }

    // Process Popular Content
    const pageCounts = pageViewsData?.reduce((acc: any, view) => {
        acc[view.page_path] = (acc[view.page_path] || 0) + 1;
        return acc;
    }, {}) || {};

    const popularContent = Object.entries(pageCounts)
        .sort(([, a]: any, [, b]: any) => b - a)
        .slice(0, 5)
        .map(([path, views]: any) => ({
            name: path === '/' ? 'Home Page' : path.split('/').filter(Boolean).pop()?.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || path,
            type: path.includes('/blog') ? 'Blog Post' : 'Page',
            views: views.toLocaleString()
        }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
                        Welcome to your CMS dashboard. Here's an overview of your content.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                                    <div className="flex items-center text-xs">
                                        {stat.trend.isUp ? (
                                            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                                        ) : (
                                            <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                                        )}
                                        <span className={stat.trend.isUp ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                            {stat.trend.val}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">from last month</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Activity & Popular Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Activity className="h-5 w-5" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6">
                        <div className="space-y-4">
                            {recentActivity.length > 0 ? recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3 group">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full mt-2 shrink-0 transition-transform group-hover:scale-125",
                                        activity.type === 'post' ? 'bg-blue-600' :
                                            activity.type === 'page' ? 'bg-purple-600' : 'bg-green-600'
                                    )} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{activity.title}</p>
                                        <div className="flex flex-wrap items-center gap-x-2 mt-0.5">
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {activity.time}
                                            </p>
                                            <span className="text-xs text-muted-foreground opacity-50 hidden sm:inline">•</span>
                                            <p className="text-xs text-muted-foreground font-medium">{activity.user}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No recent activity found.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <TrendingUp className="h-5 w-5" />
                            Popular Content
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6">
                        <div className="space-y-6">
                            {popularContent.length > 0 ? popularContent.map((item, i) => (
                                <div key={i} className="flex items-center justify-between gap-4 group">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.type}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-sm font-bold">{item.views}</span>
                                        <span className="text-xs text-muted-foreground">views</span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No data available yet.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
