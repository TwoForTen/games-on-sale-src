import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, defaults } from 'react-chartjs-2';
import moment from 'moment';

import Spin from 'antd/es/spin';

defaults.global.elements.line.tension = 0;
defaults.global.elements.line.borderJoinStyle = 'round';
defaults.global.elements.point.hitRadius = 10;

const GameHistoryChart = ({ gameId, currentOffer }) => {
  const [chartData, setChartData] = useState({});
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getPriceHistory = async () => {
      try {
        const res = await axios.get(
          `https://www.allkeyshop.com/api/v2/vaks.php?action=history&locale=en_GB&currency=eur&id=${gameId}`,
          { cancelToken: source.token }
        );
        await setPriceHistory(res.data.response.history);
      } catch (err) {}
    };

    getPriceHistory();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    let months = [];
    let prices = [];
    for (let i = 1; i < 10; i++) {
      const date = moment
        .unix(
          priceHistory[Math.round(((priceHistory.length - 1) / 10) * i)]
            ?.timestamp
        )
        .format('DD.MM.');
      const price =
        priceHistory[Math.round(((priceHistory.length - 1) / 10) * i)]?.price;
      months.push(date);
      prices.push(price);
    }
    months.push(moment().format('DD.MM.'));
    prices.push(currentOffer);

    const ctx = document.getElementById('chart')?.getContext('2d');
    const gradient = ctx?.createLinearGradient(0, 0, 0, 400);
    let pointColor = null;
    let lineColor = null;

    if (prices[prices.length - 2] > prices[prices.length - 1]) {
      gradient?.addColorStop(0, 'rgba(63,169,255,0.2)');
      gradient?.addColorStop(0.5, 'rgba(63,169,255,0)');
      gradient?.addColorStop(1, 'rgba(63,169,255,0)');
      pointColor = 'rgba(63,169,255,1)';
      lineColor = 'rgba(63,169,255,1)';
    } else if (prices[prices.length - 2] < prices[prices.length - 1]) {
      gradient?.addColorStop(0, 'rgba(245,33,45,0.2)');
      gradient?.addColorStop(0.5, 'rgba(245,33,45,0)');
      gradient?.addColorStop(1, 'rgba(245,33,45,0)');
      pointColor = 'rgba(245,33,45,1)';
      lineColor = 'rgba(245,33,45,1)';
    } else {
      gradient?.addColorStop(0, 'rgba(217,217,217,0.3)');
      gradient?.addColorStop(0.5, 'rgba(217,217,217,0)');
      gradient?.addColorStop(1, 'rgba(217,217,217,0)');
      pointColor = 'rgba(217,217,217,1)';
      lineColor = 'rgba(217,217,217,1)';
    }

    setChartData(() => {
      return {
        labels: months,
        datasets: [
          {
            label: 'Price',
            data: prices,
            backgroundColor: gradient,
            borderColor: lineColor,
            borderWidth: 1.2,
            pointBorderColor: pointColor,
          },
        ],
      };
    });
  }, [priceHistory]);

  return (
    <>
      {priceHistory?.length === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Spin />
        </div>
      )}
      <div
        style={{
          height: '100%',
          width: '100%',
        }}
        className="mt-5"
      >
        {priceHistory?.length > 0 && (
          <Line
            id="chart"
            data={chartData}
            options={{
              responsive: true,
              legend: {
                display: false,
              },
              scales: {
                yAxes: [
                  {
                    type: 'linear',
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                    },
                    gridLines: {
                      display: false,
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                    },
                    gridLines: {
                      display: false,
                    },
                  },
                ],
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default GameHistoryChart;
