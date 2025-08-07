export interface GetAllParams {
  page: number;
  size: number;
  isActive: boolean;
  linkSortField: LinkSortField;
  sortDirection: SortDirection;
}

export const LinkSortField = {
  CreatedAt: 'CreatedAt',
  UpdatedAt: 'UpdatedAt',
  BackHalf: 'BackHalf',
  Title: 'Title',
  Destination: 'Destination',
  Domain: 'Domain',
  IsActive: 'IsActive',
} as const;

export type LinkSortField = (typeof LinkSortField)[keyof typeof LinkSortField];

export const SortDirection = {
  Asc: 'SortDirection',
  Des: 'SortDirection',
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];
