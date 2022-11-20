import React from "react";

import ReactEcharts from "echarts-for-react";
//We have saved our data in Data.js file and import the datas from that file
import Data from "./Data.js";

function App() {
  const Targetdata = [];
  const Tagr = [];
  //here we are looping throughout the length of Data we get from Data.js and only pushing the Color Intensity and Hue to the empty array named as Targetdata
  for (var i = 0; i < Data.length; i++) {
    Targetdata.push([Data[i]["Color intensity"], Data[i].Hue]);
  }
  //Here first we are initilizing three variable cnt as 0 assn as 1 and sum as 0 then on
  //looping throughout the length of Data we get from Data.js we are adding the value of Malic acid to the sum and also
  // incrementing the cnt by 1 (to keep track of number of elements in same class) still the class of Alcohol is same
  //and when it is diffrent from the previous one assigned to the assn variable we are take the average of sum by dividing it to cnt
  // and  pushing the Alcohol Class(assn) and average of Malic acid(sum=sum/cnt)  to the empty array named as Tagr and assigning the
  // assn with new alcohol class , sum with the the malic acid of first member of that class and cnt with 1
  var cnt = 0;
  var assn = 1;
  var sum = 0;
  for (var j = 0; j < Data.length; j++) {
    if (Data[j].Alcohol == assn) {
      sum = sum + Data[j]["Malic Acid"];

      cnt = cnt + 1;
      if (j == Data.length - 1) {
        sum = sum / cnt;

        Tagr.push([assn, sum]);
      }
    } else {
      sum = sum / cnt;

      Tagr.push([assn, sum]);
      assn = Data[j].Alcohol;
      sum = Data[j]["Malic Acid"];
      cnt = 1;
    }
  }

  const markLineOpt = {
    animation: false,
  };
  // Here we are returning the ReactEcharts of Scatter and Bar plot
  return (
    <div>
      <h2 style={{ marginBottom: "0px" }}>
        <center>Scatter Plot of Color Intensity and Hue</center>
      </h2>
      <ReactEcharts
        option={{
          grid: [{ width: "70%", height: "70%" }],
          xAxis: {
            name: "Color Intensity",

            axisTick: {
              alignWithLabel: true,
            },
          },

          tooltip: {
            formatter: "({c})",
            trigger: "axis",
            axisPointer: { type: "cross" },
          },
          yAxis: { name: "Hue" },
          series: [
            {
              type: "scatter",
              color: ["green"],
              data: Targetdata,

              markLine: markLineOpt,
            },
          ],
        }}
      />

      <h2 style={{ marginBottom: "0px" }}>
        <center>Bar Chart of Alcohol category and Malic Acid</center>
      </h2>
      <ReactEcharts
        option={{
          grid: [{ width: "70%", height: "70%" }],
          xAxis: {
            name: "Alcohol Category",
            gridIndex: 0,
            min: 0,
            max: 4,
            axisTick: {
              alignWithLabel: true,
            },
          },

          tooltip: {
            formatter: "({c})",
            trigger: "axis",
            axisPointer: { type: "cross" },
          },
          yAxis: { name: "Malic Acid" },
          series: [
            {
              type: "bar",
              color: ["yellow"],
              data: Tagr,

              markLine: markLineOpt,
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
