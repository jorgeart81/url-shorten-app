import type {
  PaginationResponse,
  SuccessResponse,
} from '@/services/api/genericResponse';

export interface LinkData {
  id: string;
  domainId: string;
  userId: string;
  backHalf: string;
  destination: string;
  destinationDomain: string;
  domain: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  title: string;
}

export type GetLinksResponse = PaginationResponse<LinkData>;
export type CreateLinkResponse = SuccessResponse<LinkData>;
