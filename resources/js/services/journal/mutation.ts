import { router } from '@inertiajs/react';
import omit from 'lodash/omit';

import { Schema } from '@/types/journal/schema';
import { mapData } from '@/utils/journal/map-data';
import { ErrorResponse } from '@/types';
import { toast } from '@/hooks/use-toast';

interface PostJournalParams {
  journalData: Schema;
  setLoadingState?: (isLoading: boolean) => void;
  toggleFormOpen?: (isOpen: boolean) => void;
}

function handleErrorResponse(errorResponse: ErrorResponse): void {
  if (!errorResponse.message) return;

  toast({
    variant: 'error',
    title: 'Uh oh! Something went wrong.',
    description: errorResponse.message,
    duration: 3000,
  });

  setTimeout(() => {
    errorResponse.message = null;
  }, 10000);
}

function handleSuccessResponse(
  message: string,
  toggleFormOpen?: (isOpen: boolean) => void,
): void {
  toast({
    variant: 'success',
    description: message,
    duration: 1500,
  });

  if (toggleFormOpen) {
    toggleFormOpen(false);
  }
}

export function postJournal({
  journalData,
  setLoadingState,
  toggleFormOpen,
}: PostJournalParams): void {
  const formattedData = omit(mapData(journalData), 'variant');

  router.post('/journal', formattedData, {
    onSuccess: (response) => {
      const errorResponse = response.props.err as ErrorResponse;

      if (errorResponse?.message) {
        return handleErrorResponse(errorResponse);
      }

      handleSuccessResponse('Created.', toggleFormOpen);
    },
    onFinish: () => {
      if (setLoadingState) {
        setLoadingState(false);
      }
    },
  });
}

export function putJournal({
  journalData,
  setLoadingState,
  toggleFormOpen,
}: PostJournalParams): void {
  if (journalData.variant === 'update') {
    const formData = new FormData();

    const formattedData = omit(mapData(journalData), 'variant');
    const id = journalData.id;

    formData.append('_method', 'PUT');
    formData.append('token_name', formattedData.token_name);
    formData.append('image', formattedData.image);
    formData.append('trading_date', formattedData.trading_date);

    if (formattedData.risk_reward_ratio) {
      formData.append(
        'risk_reward_ratio',
        formattedData.risk_reward_ratio.toString(),
      );
    }

    if (formattedData.trade_duration) {
      formData.append(
        'trade_duration',
        formattedData.trade_duration.toString(),
      );
    }

    formData.append('status', formattedData.status);
    formData.append('reason', formattedData.reason);

    router.post(`/journal/${id}`, formData, {
      forceFormData: true,
      onSuccess: (response) => {
        const errorResponse = response.props.err as ErrorResponse;

        if (errorResponse?.message) {
          return handleErrorResponse(errorResponse);
        }

        handleSuccessResponse('Updated', toggleFormOpen);
      },
      onFinish: () => {
        if (setLoadingState) {
          setLoadingState(false);
        }
      },
    });
  } else {
    toast({
      title: 'Something wrong! :(',
      variant: 'error',
    });
  }
}

export function deleteJournal(
  id: number | string,
  setLoadingState: () => void,
) {
  router.delete(`journal/${id}`, {
    onSuccess: ({ props }) => {
      const err = props.err as ErrorResponse;
      if (!err.message) {
        handleSuccessResponse('Journal deleted');
        setLoadingState();
      }
    },
  });
}
