import { Line, Radar } from 'react-chartjs-2';
import { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import axios from 'axios';
import backendHost from '../../utils/backendHost';
import authToken from '../../utils/authToken';





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

      const [radarData, setRadarData] = useState({
        labels: [],
        datasets: [
          {
            label: "Total score per game",
            data: [],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    const leagueId = '625d61afd9cecbc3669c17c4'
    const userId = '6257d7a7e8b2c54dbd502d15'
    async function getStakeOverTimeFromLeague() {
        const response = await axios.get(`${backendHost}/api/stats/lineChart/league/${leagueId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            });

        const pointsObjArray = response.data;

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
        setLineData(updatedLineData)
    }
    async function getStakePerGameForAGivenUserAndLeague() {
        const response = await axios.get(`${backendHost}/api/stats/radarChart/league/${leagueId}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            });

        const PointsPerGameObjArray = response.data;
        console.log('PointsPerGameObjArray', PointsPerGameObjArray)

        const radarLabelsArray = [];
        const radarDatasArrayLine = [];

        //populate graph with updated data
        PointsPerGameObjArray.forEach((obj) => {
            radarLabelsArray.push(obj.name);
            radarDatasArrayLine.push(obj.totalPoints);
            });
        
        const updatedDataSet = [
            {
            label: "League Activity",
            data: radarDatasArrayLine,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            },
        ];
        const updatedRadarData = {
            ...radarData,
            labels : radarLabelsArray,
            datasets : updatedDataSet
        }
        console.log('updatedRadarData', updatedRadarData)
        setRadarData(updatedRadarData)
    }
    useEffect(() => {
        getStakeOverTimeFromLeague()
        getStakePerGameForAGivenUserAndLeague()
      }, []);

    return(
        <>
            <h2>Graphs!</h2>
            <div>
                <Line data={lineData} options={{}} />
                <Radar data={radarData} options={{}} />
            </div>
        </> 
    )
}

export default Graphs