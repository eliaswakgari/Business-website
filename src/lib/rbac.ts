export type Role = 'admin' | 'editor' | 'viewer';

export const PERMISSIONS = {
    MANAGE_USERS: 'manage_users',
    MANAGE_SETTINGS: 'manage_settings',
    CREATE_CONTENT: 'create_content',
    EDIT_CONTENT: 'edit_content',
    DELETE_CONTENT: 'delete_content',
    VIEW_CONTENT: 'view_content',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    admin: [
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.MANAGE_SETTINGS,
        PERMISSIONS.CREATE_CONTENT,
        PERMISSIONS.EDIT_CONTENT,
        PERMISSIONS.DELETE_CONTENT,
        PERMISSIONS.VIEW_CONTENT,
    ],
    editor: [
        PERMISSIONS.CREATE_CONTENT,
        PERMISSIONS.EDIT_CONTENT,
        PERMISSIONS.DELETE_CONTENT,
        PERMISSIONS.VIEW_CONTENT,
    ],
    viewer: [
        PERMISSIONS.VIEW_CONTENT,
    ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canManageUsers(role: Role): boolean {
    return hasPermission(role, PERMISSIONS.MANAGE_USERS);
}

export function canManageSettings(role: Role): boolean {
    return hasPermission(role, PERMISSIONS.MANAGE_SETTINGS);
}

export function canEditContent(role: Role): boolean {
    return hasPermission(role, PERMISSIONS.EDIT_CONTENT);
}
