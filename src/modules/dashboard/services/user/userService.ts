import { errorHandler } from '@/config/errorHandler';
import { Result } from '@/config/rop/result_T';
import { urlShortenApi } from '@/services/api/urlShortenApi';
import type { AccountResponse } from './dtos/accountResponse';

let lastAccountController: AbortController | undefined;

export class UserService {
  static async account(): Promise<Result<AccountResponse>> {
    if (lastAccountController) {
      lastAccountController.abort();
    }
    lastAccountController = new AbortController();

    try {
      const { data, status } = await urlShortenApi.post<AccountResponse>(
        '/user/account',
        {},
        { signal: lastAccountController?.signal }
      );

      return Result.success(data, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }
}
