/**
 * @fileOverview Local mock users for the ReplyRush AI prototype.
 * These credentials allow for instant demo access without a backend.
 */

export const MOCK_USERS = [
  {
    email: 'demo@replyrush.ai',
    password: 'ReplyRush123',
    role: 'admin' as const,
    displayName: 'Chief Admin',
    avatar: 'https://picsum.photos/seed/admin/150/150'
  },
  {
    email: 'business@replyrush.ai',
    password: 'Business123',
    role: 'business' as const,
    displayName: 'Brand Manager',
    avatar: 'https://picsum.photos/seed/business/150/150'
  }
];

export type MockUser = typeof MOCK_USERS[number];
