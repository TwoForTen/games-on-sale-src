import { usePaginatedQuery } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '../axios/allKeys';
import parseQueryParams from '../helpers/parseQueryParams';

const fetchGames = async (_, pageData, page) => {
  const data = await axios.get(
    `${BASE_URL}&${parseQueryParams(pageData)}&page=${page - 1}`
  );
  return data.data.products;
};

export const useGameQuery = (queryParamsState, page) => {
  return usePaginatedQuery(['games', queryParamsState, page], fetchGames);
};
