import type { LinkData } from '../../services/links/dtos/linkResponse';
import type { Link } from '../types/link';

/**
 * Maps all fields from LinkData (DTO) to Link (store type).
 * @param data LinkData object from API response
 * @returns Link object for store usage
 */
export function mapLinkDataToLink(data: LinkData): Link {
  return {
    id: data.id,
    userId: data.userId,
    title: data.title,
    backHalf: data.backHalf,
    destination: data.destination,
    destinationDomain: data.destinationDomain,
    domainId: data.domainId,
    domain: data.domain,
    isActive: data.isActive,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}
