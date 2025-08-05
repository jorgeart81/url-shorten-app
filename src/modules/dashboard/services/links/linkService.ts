import { urlShortenApi } from '@/services/api/urlShortenApi';
import { Result } from '@/config/rop/result_T';
import { errorHandler } from '@/config/errorHandler';

import type { GetLinksResponse } from './dtos/linkResponse';
import {
  type GetAllRequest,
  LinkSortField,
  SortDirection,
} from './dtos/getAllRequest';

export class LinkService {
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
