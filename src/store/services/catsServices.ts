import api from './api';

export const fetchCatFactsService = (animal_type: string, amount: number) =>
  api(`/facts/random`, {
    params: {
      animal_type,
      amount,
    },
  });
