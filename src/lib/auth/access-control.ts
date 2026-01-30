// Access control helper for role-based page access
export type Role = 'admin' | 'editor' | 'viewer';

export const PAGE_ACCESS: Record<string, Role[]> = {
    '/admin': ['admin', 'editor', 'viewer'],
    '/admin/posts': ['admin', 'editor'],
    '/admin/pages': ['admin', 'editor'],
    '/admin/services': ['admin', 'editor'],
    '/admin/team': ['admin', 'editor'],
    '/admin/users': ['admin'],
    '/admin/testimonials': ['admin', 'editor'],
    '/admin/faqs': ['admin', 'editor'],
    '/admin/case-studies': ['admin', 'editor'],
    '/admin/settings': ['admin'],
    '/admin/contacts': ['admin', 'editor'],
    '/admin/analytics': ['admin'],
};

export function hasPageAccess(userRole: Role, pagePath: string): boolean {
    const allowedRoles = PAGE_ACCESS[pagePath];
    if (!allowedRoles) return false;
    return allowedRoles.includes(userRole);
}

export function getRedirectPath(userRole: Role): string {
    // All roles can access dashboard
    return '/admin';
}
