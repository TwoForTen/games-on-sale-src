import axios from 'axios';
import { useDispatch } from 'react-redux';

import { BASE_URL } from '../axios/allKeys';
import { searchOptions, clearSearchOptions } from '../actions/actions';

let timeout = null;

const useGetSearchOptions = () => {
  const dispatch = useDispatch();

  const searchProfiles = (searchQuery) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (searchQuery !== '') {
        try {
          const options = await axios.get(`${BASE_URL}&search=${searchQuery}`);
          await dispatch(searchOptions(options.data.products));
        } catch (err) {
          console.log(err);
        }
      } else {
        dispatch(clearSearchOptions());
      }
    }, 500);
  };
  return (searchQuery) => searchProfiles(searchQuery);
};

export default useGetSearchOptions;
