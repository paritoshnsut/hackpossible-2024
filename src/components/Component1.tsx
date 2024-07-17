import React, { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import {
  useGetAlertsByDaysQuery,
  useGetReadingByIdQuery,
  useGetMeanMedianByDaysQuery
} from '../services/service';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeatMap from './HeatMap';
import { Modal } from 'react-bootstrap';
import '../common.css';
import LineGraph from './LineGraph';
import InfoIcon from '@mui/icons-material/Info';
import SpinnerComponent from './SpinnerComponent';

type GraphData = {
  date: string;
  value: number;
};

type ReadingData = {
  currReading: any;
  humidityGraph: GraphData[];
  temperatureGraph: GraphData[];
  pressureGraph: GraphData[];
  aqiGraph: GraphData[];
  avgHumidity: number;
  avgTemperature: number;
  avgPressure: number;
  avgAqi: number;
  medianHumidity: number;
  medianTemperature: number;
  medianPressure: number;
  medianAqi: number;
};

type CombinedData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
};

const Component1 = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMeanModal, setShowMeanModal] = useState(false);
  const { data, isLoading, isError, isSuccess } = useGetAlertsByDaysQuery({});
  const {
    data: readingData1,
    isLoading: isReadingLoading1,
    isError: isReadingError1,
    isSuccess: isSuccess1
  } = useGetReadingByIdQuery(1);
  const {
    data: readingData2,
    isLoading: isReadingLoading2,
    isError: isReadingError2,
    isSuccess: isSuccess2
  } = useGetReadingByIdQuery(2);
  const {
    data: readingData3,
    isLoading: isReadingLoading3,
    isError: isReadingError3,
    isSuccess: isSuccess3
  } = useGetReadingByIdQuery(3);

  const {
    data: meandata1,
    isLoading: meanloading,
    isError: meanError,
    isSuccess: meanSuccess
  } = useGetMeanMedianByDaysQuery({});

  const [pressureData, setPressureData] = useState<CombinedData | null>(null);
  const [temperatureData, setTemperatureData] = useState<CombinedData | null>(null);
  const [humidityData, setHumidityData] = useState<CombinedData | null>(null);
  const [aqiData, setAqiData] = useState<CombinedData | null>(null);

  const [normalCombinedData, setNormalCombinedData] = useState<CombinedData | null>(null);
  const [medianCombinedData, setMedianCombinedData] = useState<CombinedData | null>(null);

  useEffect(() => {
    if (meanSuccess) {
      const normalCombinedData = {
        labels: meandata1?.temperatureGraph.map((item: { date: any }) =>
          new Date(item.date).toLocaleDateString()
        ),
        datasets: [
          {
            label: 'Temperature',
            data: meandata1?.temperatureGraph.map((item: { value: any }) => item.value),
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)'
          },
          {
            label: 'Pressure',
            data: meandata1?.pressureGraph.map((item: { value: any }) => item.value),
            fill: false,
            backgroundColor: 'rgba(153,102,255,0.4)',
            borderColor: 'rgba(153,102,255,1)'
          },
          {
            label: 'AQI',
            data: meandata1?.aqiGraph.map((item: { value: any }) => item.value),
            fill: false,
            backgroundColor: 'rgba(255,159,64,0.4)',
            borderColor: 'rgba(255,159,64,1)'
          },
          {
            label: 'Humidity',
            data: meandata1?.humidityGraph.map((item: { value: any }) => item.value),
            fill: false,
            backgroundColor: 'rgba(255,99,132,0.4)',
            borderColor: 'rgba(255,99,132,1)'
          }
        ]
      };

      const medianCombinedData = {
        labels: meandata1?.temperatureMedianGraph.map((item: any) =>
          new Date(item.date).toLocaleTimeString()
        ),
        datasets: [
          {
            label: 'Median Temperature',
            data: meandata1?.temperatureMedianGraph.map((item: any) => item.value),
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)'
          },
          {
            label: 'Median Pressure',
            data: meandata1?.pressureMedianGraph.map((item: any) => item.value),
            fill: false,
            backgroundColor: 'rgba(153,102,255,0.4)',
            borderColor: 'rgba(153,102,255,1)'
          },
          {
            label: 'Median AQI',
            data: meandata1?.aqiMedianGraph.map((item: any) => item.value),
            fill: false,
            backgroundColor: 'rgba(255,159,64,0.4)',
            borderColor: 'rgba(255,159,64,1)'
          },
          {
            label: 'Median Humidity',
            data: meandata1?.humidityMedianGraph.map((item: any) => item.value),
            fill: false,
            backgroundColor: 'rgba(255,99,132,0.4)',
            borderColor: 'rgba(255,99,132,1)'
          }
        ]
      };

      setNormalCombinedData(normalCombinedData);
      setMedianCombinedData(medianCombinedData);
    }
  }, [meanSuccess, meandata1]);

  useEffect(() => {
    if (isSuccess1 && isSuccess2 && isSuccess3) {
      const combineData = (
        key: 'pressureGraph' | 'temperatureGraph' | 'humidityGraph' | 'aqiGraph'
      ): CombinedData => {
        return {
          labels: readingData1[key].map((item: any) => new Date(item.date).toLocaleTimeString()),
          datasets: [
            {
              label: 'ID 1',
              data: readingData1[key].map((item: any) => item.value),
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)'
            },
            {
              label: 'ID 2',
              data: readingData2[key].map((item: GraphData) => item.value),
              fill: false,
              backgroundColor: 'rgba(153,102,255,0.4)',
              borderColor: 'rgba(153,102,255,1)'
            },
            {
              label: 'ID 3',
              data: readingData3[key].map((item: GraphData) => item.value),
              fill: false,
              backgroundColor: 'rgba(255,159,64,0.4)',
              borderColor: 'rgba(255,159,64,1)'
            }
          ]
        };
      };

      setPressureData(combineData('pressureGraph'));
      setTemperatureData(combineData('temperatureGraph'));
      setHumidityData(combineData('humidityGraph'));
      setAqiData(combineData('aqiGraph'));
    }
  }, [readingData1, readingData2, readingData3, isSuccess1, isSuccess2, isSuccess3]);

  const optionsMain = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },

      title: {
        display: true,
        text: 'Combined Graph'
      }
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowMeanModal = () => setShowMeanModal(true);
  const handleCloseMeanModal = () => setShowMeanModal(false);

  const formatAlertData = (alerts: any) => {
    return {
      labels: alerts.map((alert: { date: any }) => new Date(alert.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Alerts',
          data: alerts.map((alert: { count: any }) => alert.count),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  const alertData = isSuccess ? formatAlertData(data.alerts) : { labels: [], datasets: [] };

  const alertOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Number of Alerts For Past Few Days'
      },
      datalabels: {
        display: true,
        color: 'black',
        formatter: (value: any) => value
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const trial = {
    labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'july'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <>
      <Box sx={{ border: '1px solid #ccc', margin: 6, padding: 2 }}>
        <div className="heading-flex">
          <div className="heading-left">
            <h5
              className="heading ml-3"
              onClick={() => {
                console.log('pk', pressureData);
              }}>
              Graph Section
            </h5>
          </div>

          <div className="heading-right">
            <Button
              variant="contained"
              color="success"
              onClick={handleShowMeanModal}
              style={{ marginRight: '10px', fontWeight: 'bold' }}>
              Get Mean Data
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleShowModal}
              style={{ fontWeight: 'bold' }}>
              Check Live Alerts
            </Button>
          </div>
        </div>

        <div className="wrapper-graph">
          <div className="left">
            <Typography variant="h6">Humidity Graph</Typography>
            {humidityData ? <LineGraph data={humidityData} options={optionsMain} /> : <SpinnerComponent />}
          </div>
          <div className="right">
            <Typography variant="h6">Temperature Graph</Typography>
            {temperatureData ? (
              <LineGraph data={temperatureData} options={optionsMain} />
            ) : (
              <SpinnerComponent />
            )}
          </div>
        </div>

        <div className="wrapper-graph">
          <div className="left">
            <Typography variant="h6">Pressure Graph</Typography>
            {pressureData ? (
              <LineGraph data={pressureData} options={optionsMain} />
            ) : (
              <SpinnerComponent />
            )}
          </div>
          <div className="right">
            <Typography variant="h6">VOC Graph</Typography>
            {aqiData ? <LineGraph data={aqiData} options={optionsMain} /> : <SpinnerComponent />}
          </div>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header
            closeButton
            style={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
            <InfoIcon style={{ marginRight: '10px' }} />
            <Modal.Title>Number of Alerts For Past Few Days</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isLoading && <SpinnerComponent />}
            {isError && <p>Error loading data</p>}
            {isSuccess && <HeatMap data={alertData} options={alertOptions} />}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseModal}
              style={{ fontWeight: 'bold' }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showMeanModal} onHide={handleCloseMeanModal} centered size="lg">
          <Modal.Header
            closeButton
            style={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
            <InfoIcon style={{ marginRight: '10px' }} />
            <Modal.Title>Mean Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                  Mean Data Graph
                </Typography>
                {aqiData ? (
                  <LineGraph data={normalCombinedData} options={optionsMain} />
                ) : (
                  <SpinnerComponent />
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseMeanModal}
              style={{ fontWeight: 'bold' }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </>
  );
};

export default Component1;
