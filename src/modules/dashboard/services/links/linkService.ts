import { errorHandler } from '@/config/errorHandler';
import { Result } from '@/config/rop/result_T';
import type { JsonPatchDocument } from '@/config/types/jsonPatchDocument';
import { urlShortenApi } from '@/services/api/urlShortenApi';
import type { CreateLinkRequest } from './dtos/createLinkRequest';
import {
  type GetAllParams,
  LinkSortField,
  SortDirection,
} from './dtos/getAllParams';
import type {
  CreateLinkResponse,
  DestinationLinkResponse,
  FindLinkResponse,
  GetLinksResponse,
  LinkAnalyticsResponse,
} from './dtos/linkResponse';

export class LinkService {
  static async createLink(
    request: CreateLinkRequest,
    controller?: AbortController
  ): Promise<Result<CreateLinkResponse>> {
    try {
      const { status, data } = await urlShortenApi.post<CreateLinkResponse>(
        '/links',
        request,
        {
          signal: controller?.signal,
        }
      );
      return Result.success(data, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }

  static async find(
    backHalf: string,
    controller?: AbortController
  ): Promise<Result<FindLinkResponse>> {
    try {
      const { data, status } = await urlShortenApi.get<FindLinkResponse>(
        `/links/find/${backHalf}`,
        {
          signal: controller?.signal,
        }
      );
      return Result.success(data, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }

  static async getDestination(
    backHalf: string,
    controller?: AbortController
  ): Promise<Result<DestinationLinkResponse>> {
    try {
      const { data, status } = await urlShortenApi.get<DestinationLinkResponse>(
        `/links/${backHalf}/destination`,
        {
          signal: controller?.signal,
        }
      );
      return Result.success(data, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }

  static async getAnalytics(
    id: string,
    controller?: AbortController
  ): Promise<Result<LinkAnalyticsResponse>> {
    try {
      const { data, status } = await urlShortenApi.get<LinkAnalyticsResponse>(
        `/links/${id}/click-analytics`,
        {
          signal: controller?.signal,
        }
      );
      return Result.success(data, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }

  static async getAll(params: GetAllParams): Promise<Result<GetLinksResponse>> {
    const defaultParams = {
      page: 1,
      size: 5,
      isActive: true,
      linkSortField: LinkSortField.CreatedAt,
      sortDirection: SortDirection.Asc,
    };

    try {
      const { data, status } = await urlShortenApi.get<GetLinksResponse>(
        `/links`,
        {
          params: { ...defaultParams, ...params },
        }
      );
      return Result.success(data, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }

  static async partialUpdate(
    id: string,
    request: JsonPatchDocument
  ): Promise<Result<void>> {
    try {
      const { status } = await urlShortenApi.patch(`/links/${id}`, request);
      return Result.success(undefined, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }
}
