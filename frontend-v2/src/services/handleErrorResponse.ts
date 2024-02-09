import { Notify } from '../components/Notify';
import { ErrorResponse } from '../interfaces/pages';

export default function handleErrorResponse(error: ErrorResponse | unknown) {
  if ((error as ErrorResponse).response.status === 500) {
    Notify('error', 'Maaf, terjadi masalah pada server');
  } else {
    Notify('error', (error as ErrorResponse).response.data.message);
  }
}
