import { urlShortenApi } from '@/services/api/urlShortenApi';
import { Result } from '@/config/rop/result_T';
import { errorHandler } from '@/config/errorHandler';

import type { CreateLinkResponse, GetLinksResponse } from './dtos/linkResponse';
import {
  type GetAllRequest,
  LinkSortField,
  SortDirection,
} from './dtos/getAllRequest';
import type { CreateLinkRequest } from './dtos/createLinkRequest';

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

  static async getAll(
    params: GetAllRequest = {
      page: 1,
      size: 5,
      isActive: true,
      linkSortField: LinkSortField.CreatedAt,
      sortDirection: SortDirection.Asc,
    },
    controller?: AbortController
  ): Promise<Result<GetLinksResponse>> {
    try {
      const { data, status } = await urlShortenApi.get<GetLinksResponse>(
        `/links`,
        {
          signal: controller?.signal,
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
