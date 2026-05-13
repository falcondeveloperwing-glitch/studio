/**
 * @fileOverview Local mock users for the ReplyRush AI prototype.
 * These credentials allow for instant demo access with specific enterprise roles.
 */

export const MOCK_USERS = [
  {
    email: 'demo@replyrush.ai',
    password: 'ReplyRush123',
    role: 'admin' as const,
    displayName: 'Marcus Sterling',
    title: 'Workspace Owner',
    avatar: 'https://picsum.photos/seed/admin/150/150'
  },
  {
    email: 'business@replyrush.ai',
    password: 'Business123',
    role: 'agent' as const,
    displayName: 'Elena Rossi',
    title: 'Support Lead',
    avatar: 'https://picsum.photos/seed/agent/150/150'
  },
  {
    email: 'manager@replyrush.ai',
    password: 'Manager123',
    role: 'manager' as const,
    displayName: 'Jordan Vance',
    title: 'Sales Operations',
    avatar: 'https://picsum.photos/seed/manager/150/150'
  }
];

export type MockUser = typeof MOCK_USERS[number];
