import { Notify } from '../components/Notify';
import { ErrorResponse } from '../interfaces/pages';

export default function handleErrorResponse(
  error: ErrorResponse | unknown,
  id?: string
) {
  if (
    (error as ErrorResponse).response.status >= 500 ||
    (error as ErrorResponse).response.status === 404
  ) {
    Notify('error', 'Maaf, terjadi masalah pada server', id);
  } else {
    Notify('error', (error as ErrorResponse).response.data.message, id);
  }
}
