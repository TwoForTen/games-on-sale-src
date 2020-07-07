import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GameHistoryChart from './GameHistoryChart';
import { handleModal } from '../actions/actions';

import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import Statistic from 'antd/es/statistic';
import Typography from 'antd/es/typography';
import { PlusOutlined } from '@ant-design/icons';

import '../styles/modal.scss';

const GameModal = () => {
  const isModalOpen = useSelector((state) => state.modalReducer);
  const { modalOpen, game } = isModalOpen;
  const dispatch = useDispatch();

  const {
    name,
    releaseYear,
    metacriticScores,
    bestOffer,
    platform,
    id,
    thumbnailUrl,
  } = game;

  return (
    <Modal
      keyboard={false}
      centered
      title={
        <div className="d-flex flex-align-center">
          <img src={thumbnailUrl} alt="" className="mr-3 mb-1" />
          <div>
            <Typography.Title level={4}>{name}</Typography.Title>
            <small>
              {releaseYear}
              {'  '}
              <span style={{ color: 'rgba(0,0,0,0.4)', fontSize: '9px' }}>
                •
              </span>
              {'  '}
              {bestOffer?.edition?.name}
            </small>
          </div>
        </div>
      }
      visible={modalOpen}
      onCancel={() => dispatch(handleModal())}
      destroyOnClose
      footer={
        <a className="ml-2" href={bestOffer?.url} target="_blank">
          <Button type="primary">
            {bestOffer?.price.toFixed(2) == '0.01'
              ? 'FREE'
              : `€${bestOffer?.price.toFixed(2)}`}{' '}
            Shop Now
          </Button>
        </a>
      }
    >
      <div className="d-flex flex-around mb-3">
        <Statistic title="Launcher" value={bestOffer?.region?.name} />
        <Statistic
          valueStyle={{ textTransform: 'capitalize' }}
          title="Platform"
          value={platform}
        />
        <Statistic
          title="Metascore"
          value={metacriticScores?.total?.rating}
          suffix={
            <div className="d-flex" style={{ alignItems: 'flex-start' }}>
              {'/ 100'}
              <meter
                min="0"
                max="100"
                low="33"
                high="75"
                optimum="100"
                value={metacriticScores?.total?.rating}
                style={{
                  transform: 'rotate(-90deg)',
                  width: '30px',
                  height: '5px',
                }}
              ></meter>
            </div>
          }
          valueStyle={{
            color:
              metacriticScores?.total?.rating > 74
                ? '#52C41A'
                : metacriticScores?.total?.rating > 32
                ? '#FAAD14'
                : '#F5212D',
          }}
        />
      </div>
      <GameHistoryChart
        gameId={id}
        currentOffer={bestOffer?.price.toFixed(2)}
      />
    </Modal>
  );
};

export default GameModal;
