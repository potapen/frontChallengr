import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
// DO NOT REMOVE
import Chart from "chart.js/auto";
import axios from "axios";
import backendHost from "../../utils/backendHost";

const LineGraph = ({ leagueId }) => {
  //for props of the chart components. We will need to add labels and data
  const storedToken = localStorage.getItem("authToken");
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

  async function getStakeOverTimeFromLeague() {
    const response = await axios.get(
      `${backendHost}/api/stats/lineChart/league/${leagueId}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

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
      labels: lineLabelsArray,
      datasets: updatedDataSet,
    };
    setLineData(updatedLineData);
  }
  useEffect(() => {
    getStakeOverTimeFromLeague();
  }, []);

  return (
    <>
      <Line data={lineData} options={{}} />
    </>
  );
};

export default LineGraph;
