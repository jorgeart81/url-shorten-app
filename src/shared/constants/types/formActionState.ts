export interface FormActionState<TData, TError> {
  success: boolean;
  message?: string;
  data?: TData;
  fieldErrors?: TError | null;
}
