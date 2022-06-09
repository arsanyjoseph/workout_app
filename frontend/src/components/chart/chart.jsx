import Chart from 'react-apexcharts'

export default function ChartInfo ({options, series}) {
    return(
            <Chart
                options={options}
                series={series}
                type='line'
                width='600'
            />
    )
}