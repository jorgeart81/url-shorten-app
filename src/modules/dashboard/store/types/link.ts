export interface Link {
  id: string;
  userId: string;
  title: string;
  backHalf: string;
  destination: string;
  destinationDomain: string;
  domainId: string;
  domain: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
