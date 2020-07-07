import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Affix from 'antd/es/affix';
import Button from 'antd/es/button';
import Drawer from 'antd/es/drawer';
import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';

import { setQuery, cleanQuery, handleDrawer } from '../actions/actions';
import useWindowSize from '../hooks/useWindowSize';
import '../styles/sidebar.scss';

const Sidebar = () => {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const { width: windowWidth } = windowSize;
  const queryParamsState = useSelector((state) => state.queryReducer);
  const isDrawerOpen = useSelector((state) => state.drawerReducer);
  const { category } = queryParamsState;
  const genres = [
    'Action',
    'MMORPG',
    'Adventure',
    'FPS',
    'Management',
    'Racing',
    'Simulator',
    'Sport',
    'Strategy',
    'Indie',
    'RPG',
  ].sort();

  const consoles = ['Nintendo', 'Playstation', 'Xbox'];

  const other = ['Antivirus Software', 'DLC Season Passes', 'Gamecard'];

  const menu = (
    <Menu
      mode="inline"
      selectedKeys={category ? [category] : ['all']}
      onClick={() => {
        if (windowWidth < 901 && isDrawerOpen) {
          dispatch(handleDrawer());
        }
        dispatch(cleanQuery(['page']));
      }}
    >
      <Menu.ItemGroup title="Genres" className="sidebar-item-group">
        <Menu.Item
          onClick={() => dispatch(setQuery({ param: 'category', query: '' }))}
          key="all"
        >
          All
        </Menu.Item>
        {genres.map((genre) => {
          return (
            <Menu.Item
              onClick={() =>
                dispatch(
                  setQuery({
                    param: 'category',
                    query: genre.toLowerCase(),
                  })
                )
              }
              key={genre.toLowerCase()}
            >
              {genre}
            </Menu.Item>
          );
        })}
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Consoles" className="sidebar-item-group mt-2">
        {consoles.map((gameConsole) => {
          return (
            <Menu.Item
              onClick={() => {
                dispatch(
                  setQuery({
                    param: 'category',
                    query: gameConsole.concat('-all').toLowerCase(),
                  })
                );
              }}
              key={gameConsole.concat('-all').toLowerCase()}
            >
              {gameConsole}
            </Menu.Item>
          );
        })}
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Other" className="sidebar-item-group mt-2">
        {other.map((other) => {
          return (
            <Menu.Item
              onClick={() => {
                dispatch(
                  setQuery({
                    param: 'category',
                    query: other.split(' ').join('-').toLowerCase(),
                  })
                );
              }}
              key={other.split(' ').join('-').toLowerCase()}
            >
              {other}
            </Menu.Item>
          );
        })}
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <Affix offsetTop={0}>
      {windowWidth > 900 ? (
        <Layout.Sider width={284} trigger={null} className="layout-sidebar">
          {menu}
        </Layout.Sider>
      ) : (
        <Drawer
          visible={isDrawerOpen}
          closable={true}
          onClose={() => dispatch(handleDrawer())}
          placement="left"
          width={284}
        >
          {menu}
        </Drawer>
      )}
    </Affix>
  );
};

export default Sidebar;
