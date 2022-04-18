import { Line, Bar } from 'react-chartjs-2';
import { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import axios from 'axios';
import backendHost from '../../utils/backendHost';
import authToken from '../../utils/authToken';


const testLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const testData = {
    labels: testLabels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

//Parameters for the line chart


const Graphs = () => {
    const [lineData, setLineData] = useState({
        labels: [],
        datasets: [
          {
            label: "League Activity",
            data: [],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    const leagueId = '625d61afd9cecbc3669c17c4'
    async function getStakeOverTimeFromLeague() {
        console.log('leagueId', leagueId)
        const response = await axios.get(`${backendHost}/api/stats/lineChart/league/${leagueId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            });

        const pointsObjArray = response.data;
        console.log('pointsObjArray', pointsObjArray)

        const lineLabelsArray = [];
        const lineDatasArrayLine = [];

        //populate graph with updated data
        pointsObjArray.forEach((obj) => {
            lineLabelsArray.push(obj._id);
            lineDatasArrayLine.push(obj.totalPoints);
            });
        
        const updatedDataSet = [
            {
            label: "League Activity",
            data: lineDatasArrayLine,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            },
        ];
        const updatedLineData = {
            ...lineData,
            labels : lineLabelsArray,
            datasets : updatedDataSet
        }
        console.log('updatedLineData', updatedLineData)
        setLineData(updatedLineData)
    }
    useEffect(() => {
        getStakeOverTimeFromLeague()
      }, []);

    return(
        <>
            <h2>Graphs!</h2>
            <div>
                <Line data={lineData} options={{}} />
            </div>
        </> 
    )
}

export default Graphs