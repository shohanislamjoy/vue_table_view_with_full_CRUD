<script setup>
import { ref, onMounted } from "vue";
import api from '../axios.js';

const result = ref([]); // Initialize as an empty array

const fetchData = async () => {
  try {
    const response = await api.get('/wifi_data');
    result.value = response.data.data; // Assuming the data is under 'data' key

    // Process data: Calculate average volume per trade code
    const processedData = {};

    result.value.forEach((item) => {
      const { trade_code, volume } = item;
      
      // Initialize the trade_code if it doesn't exist in processedData
      if (!processedData[trade_code]) {
        processedData[trade_code] = { total: 0, count: 0 };
      }

      // Accumulate the volume and increment the count for this trade_code
      processedData[trade_code].total += parseFloat(volume);
      processedData[trade_code].count += 1;
    });

    // Convert processed data into a format suitable for Google Charts
    const averageData = Object.entries(processedData).map(([trade_code, { total, count }]) => [
      trade_code,
      total / count, // Calculate average volume
    ]);

    return averageData;

  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const loadGoogleCharts = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.charts) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Google Charts"));
      document.head.appendChild(script);
    }
  });
};

const drawCharts = async () => {
  await loadGoogleCharts();

  google.charts.load("current", { packages: ["corechart", "bar"] });
  google.charts.setOnLoadCallback(async () => {
    const data = await fetchData();

    // Line Chart (Average Volume per Trade Code)
    const lineChartData = new google.visualization.DataTable();
    lineChartData.addColumn("string", "Trade Code");
    lineChartData.addColumn("number", "Average Volume");
    lineChartData.addRows(data);

    const lineChartOptions = {
      title: "Average Volume per Trade Code",
      curveType: "function",
      legend: { position: "bottom" },
      height: 500,
    };

    const lineChart = new google.visualization.LineChart(
      document.getElementById("line_chart_div")
    );
    lineChart.draw(lineChartData, lineChartOptions);

    // Bar Chart (Average Volume per Trade Code)
    const barChartData = new google.visualization.DataTable();
    barChartData.addColumn("string", "Trade Code");
    barChartData.addColumn("number", "Average Volume");
    barChartData.addRows(data);

    const barChartOptions = {
      title: "Average Volume per Trade Code (Bar Chart)",
      chartArea: { width: "60%" },
      hAxis: { title: "Trade Code", minValue: 0 },
      vAxis: { title: "Average Volume" },
      height: 500,
    };

    const barChart = new google.visualization.BarChart(
      document.getElementById("bar_chart_div")
    );
    barChart.draw(barChartData, barChartOptions);

    // Multi-series Line Chart (if you want to compare multiple values, like "open", "close" prices)
    const multiLineChartData = new google.visualization.DataTable();
    multiLineChartData.addColumn("string", "Trade Code");
    multiLineChartData.addColumn("number", "Open");
    multiLineChartData.addColumn("number", "Close");

    // Assuming you have "open" and "close" values to compare alongside the average volume
    result.value.forEach((item) => {
      multiLineChartData.addRow([
        item.trade_code,
        parseFloat(item.open),
        parseFloat(item.close),
      ]);
    });

    const multiLineChartOptions = {
      title: "Open vs Close per Trade Code",
      curveType: "function",
      legend: { position: "bottom" },
      height: 500,
    };

    const multiLineChart = new google.visualization.LineChart(
      document.getElementById("multi_line_chart_div")
    );
    multiLineChart.draw(multiLineChartData, multiLineChartOptions);
  });
};

onMounted(() => {
  drawCharts();
});
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.chart-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.chart-container > div {
  margin: 20px;
  width: 45%;
}
</style>

<template>
  <div class="text-center text-4xl m-6">
    <h1 class="font-bold"> charts on the data</h1>
    <div class="chart-container">
      <!-- Line Chart -->
      <div id="line_chart_div" style="width: 100%; height: 500px;"></div>

      <!-- Bar Chart -->
      <div id="bar_chart_div" style="width: 100%; height: 500px;"></div>

      <!-- Multi-Line Chart -->
      <div id="multi_line_chart_div" style="width: 100%; height: 500px;"></div>
    </div>
  </div>
</template>
