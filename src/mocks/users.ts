import type { User } from '@/types/chat'

export const currentUser: User = {
  id: 'user-me',
  name: 'You',
  avatar: 'https://i.pravatar.cc/150?u=user-me',
}

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alice Morgan',
    avatar: 'https://i.pravatar.cc/150?u=user-1',
  },
  {
    id: 'user-2',
    name: 'Bob Santos',
    avatar: 'https://i.pravatar.cc/150?u=user-2',
  },
  {
    id: 'user-3',
    name: 'Clara Mendes',
    avatar: 'https://i.pravatar.cc/150?u=user-3',
  },
  {
    id: 'user-4',
    name: 'Daniel Rocha',
    avatar: 'https://i.pravatar.cc/150?u=user-4',
  },
  {
    id: 'user-5',
    name: 'Emily Ferreira',
    avatar: 'https://i.pravatar.cc/150?u=user-5',
  },
]
