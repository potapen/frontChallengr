import { Line, Radar } from 'react-chartjs-2';
import { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import axios from 'axios';
import backendHost from '../../utils/backendHost';
import authToken from '../../utils/authToken';


const Graphs = () => {
    //for props of the chart components. We will need to add labels and data
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
        /*
            [
                {
                    "_id": "04-18T13:03",
                    "totalPoints": 3
                },
                {
                    "_id": "04-18T15:45",
                    "totalPoints": 1
                }
            ]
        */

        const lineLabelsArray = [];
        const lineDatasArrayLine = [];

        //for each object of the returned data, we push the label and the data to arrays.
        pointsObjArray.forEach((obj) => {
            lineLabelsArray.push(obj._id);
            lineDatasArrayLine.push(obj.totalPoints);
            });
        
        //construction of the dataset from dataarray
        const updatedDataSet = [
            {
            label: "League Activity",
            data: lineDatasArrayLine,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            },
        ];

        //updating the state with data and label
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

        const pointsPerGameObjArray = response.data;
        console.log('pointsPerGameObjArray', pointsPerGameObjArray)
/*[
    {
        "_id": "625d61afd9cecbc3669c17cd",
        "name": "Beer pong",
        "description": "Le jeu du beerpong, classique",
        "imageUrl": "https://www.jeux-alcool.com/wp-content/uploads/2017/03/beerPong.jpeg",
        "__v": 0,
        "createdAt": "2022-04-18T13:03:43.340Z",
        "updatedAt": "2022-04-18T13:03:43.340Z",
        "totalPoints": 3,
        "totalGames": 1
    },
...
    {
        "_id": "625d61afd9cecbc3669c17d0",
        "name": "Rock Scissors Paper",
        "description": "The classic one",
        "imageUrl": "https://cdn-europe1.lanmedia.fr/var/europe1/storage/images/europe1/international/la-recette-pour-gagner-a-pierre-feuille-ciseaux-768904/15409112-1-fre-FR/La-recette-pour-gagner-a-pierre-feuille-ciseaux.jpg",
        "__v": 0,
        "createdAt": "2022-04-18T13:03:43.341Z",
        "updatedAt": "2022-04-18T13:03:43.341Z",
        "totalPoints": 0,
        "totalGames": 0
    }
]
*/
        const radarLabelsArray = [];
        const radarDatasArrayLine = [];

        pointsPerGameObjArray.forEach((obj) => {
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