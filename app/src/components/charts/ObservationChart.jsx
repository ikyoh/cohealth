import dayjs from "dayjs";
import Chart from "react-apexcharts";

const ObservationChart = ({ name, datas, color = "#F472B6" }) => {
    const dataSeries = datas.map((data) => data.content);
    const dataCategories = datas.map((data) =>
        dayjs(data.createdAt).format("DD MMMM HH:mm")
    );

    const series = [
        {
            name: name,
            data: dataSeries,
        },
    ];

    const options = {
        colors: [color],
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
        },
        xaxis: {
            categories: dataCategories,
            labels: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
    };

    return (
        <div>
            <h3>{name}</h3>
            <Chart
                type="area"
                options={options}
                series={series}
                width="100%"
                height="90%"
            />
        </div>
    );
};

export default ObservationChart;
