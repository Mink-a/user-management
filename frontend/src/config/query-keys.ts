export const departments = {
  all: ['departments'] as const,
  lists: () => [...departments.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) =>
    [...departments.lists(), { filters }] as const,
  details: () => [...departments.all, 'detail'] as const,
  detail: (id: string | undefined) => [...departments.details(), id] as const,
};

export const profile = {
  all: ['profile'] as const,
  lists: () => [...profile.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) => [...profile.lists(), { filters }] as const,
  details: () => [...profile.all, 'detail'] as const,
  detail: (id: string | undefined) => [...profile.details(), id] as const,
};

export const roles = {
  all: ['roles'] as const,
  lists: () => [...roles.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) => [...roles.lists(), { filters }] as const,
  details: () => [...roles.all, 'detail'] as const,
  detail: (id: string | undefined) => [...roles.details(), id] as const,
};

export const staff = {
  all: ['staff'] as const,
  lists: () => [...staff.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) => [...staff.lists(), { filters }] as const,
  details: () => [...staff.all, 'detail'] as const,
  detail: (id: string | undefined) => [...staff.details(), id] as const,
};

export const permissions = {
  all: ['permissions'] as const,
  lists: () => [...permissions.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) =>
    [...permissions.lists(), { filters }] as const,
  details: () => [...permissions.all, 'detail'] as const,
  detail: (id: string | undefined) => [...permissions.details(), id] as const,
};
