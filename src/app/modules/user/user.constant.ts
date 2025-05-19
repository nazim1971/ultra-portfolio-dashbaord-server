
export const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER'
} as const;

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED'
} as const;


export type UserRole = keyof typeof USER_ROLE;
export type UserStatus = keyof typeof USER_STATUS;
