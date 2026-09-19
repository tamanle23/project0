import { type User } from './schema'
import usersData from './users-mock.json'

export const users: User[] = usersData.map((user) => ({
  ...user,
  status: user.status as User['status'],
  role: user.role as User['role'],
  createdAt: new Date(user.createdAt),
  updatedAt: new Date(user.updatedAt),
}))
