import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'antd/es/button';
import Input from 'antd/es/input';
import AutoComplete from 'antd/es/auto-complete';
import Layout from 'antd/es/layout';
import logo from '../assets/logo.svg';
import Popover from 'antd/es/popover';
import Typography from 'antd/es/typography';
import { SearchOutlined, CloseOutlined, MenuOutlined } from '@ant-design/icons';

import {
  cleanQuery,
  clearSearchOptions,
  handleDrawer,
  setQuery,
} from '../actions/actions';
import useLocalStorage from '../hooks/useLocalStorage';
import useGetSearchOptions from '../hooks/useGetSearchOptions';
import useWindowSize from '../hooks/useWindowSize';

import '../styles/appbar.scss';

const Appbar = () => {
  const [popoverSeen, setPopoverSeen] = useLocalStorage('popover_seen', false);
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const getSearchOptions = useGetSearchOptions();
  const searchOptions = useSelector((state) => state.searchOptionsReducer);
  const { width: windowWidth } = windowSize;

  const submitForm = (searchValue) => {
    dispatch(clearSearchOptions());
    dispatch(cleanQuery(['page']));
    dispatch(setQuery({ param: 'search', query: searchValue }));
    setSearchInput('');
  };

  return (
    <Layout.Header className="appbar-root">
      <div className="appbar-logo-container">
        {windowWidth < 901 ? (
          <Button
            size="large"
            type="link"
            style={{ color: 'initial' }}
            icon={<MenuOutlined />}
            onClick={() => dispatch(handleDrawer())}
          />
        ) : (
          <Link
            to="/"
            onClick={() => dispatch(cleanQuery(['page', 'search', 'category']))}
          >
            <img src={logo} className="appbar-logo" alt="logo" />
          </Link>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          document.getElementById('autocomp').blur();
          submitForm(searchInput);
        }}
      >
        <AutoComplete
          id="autocomp"
          className="appbar-search"
          dropdownMatchSelectWidth={'100%'}
          options={searchOptions && searchOptions}
          onSelect={(optionValue) => {
            setSearchInput(optionValue);
            blur();
          }}
          onSearch={() => blur()}
          style={{ width: '100%' }}
          value={searchInput}
        >
          <Input
            className="appbar-search"
            onChange={(e) => {
              getSearchOptions(e.target.value);
              setSearchInput(e.target.value);
            }}
            prefix={<SearchOutlined style={{ margin: '0px 6px 0px 10px' }} />}
            placeholder="Search games..."
            value={searchInput}
          />
        </AutoComplete>
      </form>
      <div className="appbar-button-wrapper">
        {windowWidth < 901 && (
          <Link
            to="/"
            onClick={() => dispatch(cleanQuery(['page', 'search', 'category']))}
          >
            <img src={logo} className="appbar-logo" alt="logo" />
          </Link>
        )}
      </div>
    </Layout.Header>
  );
};

export default Appbar;
