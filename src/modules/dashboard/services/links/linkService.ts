import { errorHandler } from '@/config/errorHandler';
import { Result } from '@/config/rop/result_T';
import { urlShortenApi } from '@/services/api/urlShortenApi';

import type { CreateLinkRequest } from './dtos/createLinkRequest';
import {
  type GetAllParams,
  LinkSortField,
  SortDirection,
} from './dtos/getAllParams';
import type {
  CreateLinkResponse,
  DestinationData,
  DestinationLinkResponse,
  FindLinkResponse,
  GetLinksResponse,
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
      console.log(error);
      return errorHandler(error);
    }
  }

  static async getDestination(
    backHalf: string,
    controller?: AbortController
  ): Promise<Result<DestinationData>> {
    try {
      const { data, status } = await urlShortenApi.get<DestinationLinkResponse>(
        `/links/${backHalf}/destination`,
        {
          signal: controller?.signal,
        }
      );
      return Result.success(data.data, status);
    } catch (error: unknown) {
      console.log(error);
      return errorHandler(error);
    }
  }

  static async getAll(
    params: GetAllParams = {
      page: 1,
      size: 5,
      isActive: true,
      linkSortField: LinkSortField.CreatedAt,
      sortDirection: SortDirection.Asc,
    }
  ): Promise<Result<GetLinksResponse>> {
    try {
      const { data, status } = await urlShortenApi.get<GetLinksResponse>(
        `/links`,
        {
          params,
        }
      );
      return Result.success(data, status);
    } catch (error: unknown) {
      console.log(error);
      return errorHandler(error);
    }
  }
}
