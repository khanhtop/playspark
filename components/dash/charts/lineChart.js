import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ chartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart;

    const createChart = () => {
      const ctx = chartRef.current.getContext("2d");

      if (myChart) {
        myChart.destroy();
      }

      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: chartData.line1Name,
              data: chartData.line1Data,
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: chartData.line2Name,
              data: chartData.line2Data,
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              position: "bottom",
            },
            y: {
              min: 0,
            },
          },
        },
      });
    };

    if (chartRef.current && chartData) {
      createChart();
    }

    // Cleanup: Destroy the chart when the component unmounts
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [chartData]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
