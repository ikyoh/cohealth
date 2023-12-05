import React from 'react'
import Chart from 'react-apexcharts'
import './style.css'
import { MdEventNote, MdPendingActions } from 'react-icons/md'




const DashboardNurse = () => {



	const series = [{
		name: 'Total heures A',
		data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43]
	}, {
		name: 'Total heures B',
		data: [13, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 27]
	}, {
		name: 'Total heures C',
		data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14]
	}]

	const options = {
		colors: ['#4ADE80', '#F472B6', '#FB923C'],
		chart: {
			type: 'bar',
			height: 350,
			stacked: true,
			toolbar: {
				show: true
			},
			zoom: {
				enabled: true
			}
		},
		title: {
			text: "Evolution mensuelle heure",
			align: 'left',
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize: '14px',
				fontWeight: 'bold',
				fontFamily: undefined,
				color: '#263238'
			},
		},
		responsive: [{
			breakpoint: 480,
			options: {
				legend: {
					position: 'bottom',
					offsetX: -10,
					offsetY: 0
				}
			}
		}],
		plotOptions: {
			bar: {
				columnWidth: '30%',
				horizontal: false,
				borderRadius: 0,
			},
		},
		xaxis: {
			categories: ['Janvier', 'Fevrier', 'Mars', 'Avril',
				'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
			],
		},
		legend: {
			position: 'right',
			offsetY: 40
		},
		fill: {
			opacity: 1
		}
	}

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-6 gap-5 mb-5">
				<div className='cards'>
					<div className="icon">
						<MdPendingActions size={30} />
					</div>
					<div>
						<div className="title">
							Missions
						</div>
						<div className="info">
						...
						</div>
					</div>
				</div>
				<div className='cards'>
					<div className="icon">
						<MdPendingActions size={30} />
					</div>
					<div>
						<div className="title">
							Collaborations
						</div>
						<div className="info">
						...
						</div>
					</div>
				</div>
				<div className='cards'>
					<div className="icon">
						<MdEventNote size={30} />
					</div>
					<div>
						<div className="title">
							Mandats
						</div>
						<div className="info">
						...
						</div>
					</div>
				</div>
			</div>
			<div className="mixed-chart card">
				<Chart
					options={options}
					series={series}
					type="bar"
					width="100%"
					height="500px"
				/>
			</div>
		</>
	)
}

export default DashboardNurse