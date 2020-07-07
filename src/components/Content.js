import React, { useEffect } from 'react';
import { handleModal, setQuery, cleanQuery } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Layout from 'antd/es/layout';
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import Badge from 'antd/es/badge';
import Typography from 'antd/es/typography';
import Popover from 'antd/es/popover';
import Pagination from 'antd/es/pagination';
import Button from 'antd/es/button';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';

import ConditionalWrapper from '../helpers/ConditionalWrapper';
import GameModal from './GameModal';
import parseQueryParams from '../helpers/parseQueryParams';
import { useGameQuery } from '../hooks/useGameQuery';

import '../styles/content.scss';

const Content = () => {
  const dispatch = useDispatch();
  const queryParamsState = useSelector((state) => state.queryReducer);
  const { page, search, category } = queryParamsState;
  const history = useHistory();
  const location = useLocation();

  const { status, resolvedData, latestData, error, isFetching } = useGameQuery(
    queryParamsState,
    page
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    for (let param of params) {
      dispatch(setQuery({ param: param[0], query: param[1] }));
    }

    return () => dispatch(cleanQuery());
  }, []);

  useEffect(() => {
    history.push({
      pathname: '/',
      search: parseQueryParams(queryParamsState),
    });
  }, [queryParamsState]);

  const dataSource = [];
  resolvedData &&
    resolvedData.map((game, index) => {
      dataSource.push({
        key: game.id,
        thumbnail: [game.thumbnailUrl, game.offerAggregate, index],
        title: [game.name, game.categorySlug, index],
        price: game.offerAggregate,
        stock: game.bestOffer?.available,
      });
    });

  const columns = [
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      className: 'table-available',
      render: (isInStock) => {
        return (
          <Popover content={isInStock ? 'Available' : 'Not available'}>
            <Badge dot color={isInStock ? 'green' : 'red'} />
          </Popover>
        );
      },
    },
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      className: 'table-thumbnail',
      render: (imgData) => {
        const gameIndex = imgData[2];
        const prices = imgData[1];
        const percentageDecrease = Math.floor(
          ((prices.highestPrice - prices.lowestPrice) / prices.highestPrice) *
            100
        );
        return (
          <ConditionalWrapper
            condition={percentageDecrease > 0}
            wrapper={(children) => (
              <Badge
                count={`-${percentageDecrease}%`}
                style={{
                  backgroundColor:
                    percentageDecrease > 89
                      ? '#F5212D'
                      : percentageDecrease > 49
                      ? '#FAAD14'
                      : percentageDecrease > 19
                      ? '#FADB14'
                      : '#52C41A',
                }}
                offset={['-10px', '0px']}
              >
                {children}
              </Badge>
            )}
            children={
              <div
                style={{
                  width: '78px',
                  height: '38px',
                  backgroundColor: '#f0f0f0',
                }}
              >
                <img
                  src={imgData[0]}
                  alt="thumbnail"
                  onClick={() => dispatch(handleModal(resolvedData[gameIndex]))}
                />
              </div>
            }
          />
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '60%',
      render: (title) => {
        const gameIndex = title[2];
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong
              className="content-title"
              onClick={() => dispatch(handleModal(resolvedData[gameIndex]))}
            >
              {title[0]}
            </strong>
            <Tag style={{ width: 'fit-content', textTransform: 'capitalize' }}>
              {title[1]}
            </Tag>
          </div>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => {
        return (
          <>
            {price.highestPrice !== price.lowestPrice && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography.Text delete>
                  €{price.highestPrice.toFixed(2)}
                </Typography.Text>
                <small
                  style={{
                    color: 'rgba(0,0,0,0.35)',
                    marginTop: '-4px',
                    marginBottom: '8px',
                  }}
                >
                  Highest price found
                </small>
              </div>
            )}
            <Typography.Title level={4}>
              {price.lowestPrice.toFixed(2) == '0.01'
                ? 'FREE'
                : `€${price.lowestPrice.toFixed(2)}`}
            </Typography.Title>
          </>
        );
      },
    },
  ];

  return (
    <Layout className="layout-content">
      <div className="container">
        <div className="d-flex mb-3 flex-align-center content-mobile-padding">
          {search !== '' && (
            <div className="d-flex flex-column content-search-display content-filter">
              <Typography.Text>Search results for:</Typography.Text>
              <div className="d-flex flex-align-center">
                <Typography.Title
                  level={1}
                  style={{ textTransform: 'capitalize' }}
                >
                  {search}
                </Typography.Title>
                <Button
                  onClick={() => dispatch(cleanQuery(['search', 'page']))}
                  type="link"
                  icon={<CloseOutlined />}
                  className="ml-1 content-remove-filter"
                />
              </div>
            </div>
          )}
          {category !== '' && search !== '' && (
            <RightOutlined
              style={{
                fontSize: '25px',
                color: 'rgba(217,217,217,1)',
                marginRight: '35px',
              }}
              className="content-search-display"
            />
          )}
          {category !== '' && (
            <div className="d-flex flex-column content-filter content-search-display">
              <Typography.Text>In category:</Typography.Text>
              <div className="d-flex flex-align-center">
                <Typography.Title
                  level={1}
                  style={{ textTransform: 'capitalize' }}
                >
                  {category.split('-').join(' ')}
                </Typography.Title>
                <Button
                  onClick={() => dispatch(cleanQuery(['category', 'page']))}
                  type="link"
                  icon={<CloseOutlined />}
                  className="ml-1 content-remove-filter"
                />
              </div>
            </div>
          )}
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          showHeader={false}
          style={{ width: '100%' }}
          loading={status === 'loading' || isFetching ? true : false}
        />
        {status !== 'loading' && (
          <Pagination
            className="mt-4 content-mobile-padding"
            showSizeChanger={false}
            defaultPageSize={20}
            total={resolvedData?.length > 0 ? 20 * page + 20 : 20 * page}
            current={+page}
            defaultCurrent={+page}
            onChange={(page) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              dispatch(setQuery({ param: 'page', query: page }));
            }}
          />
        )}
      </div>
      <GameModal />
    </Layout>
  );
};

export default Content;
