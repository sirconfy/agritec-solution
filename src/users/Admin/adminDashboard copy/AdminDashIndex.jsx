import "./AdminDashIndex.css";

import AdminBrokerTable from "../../../components/TableBio/AdminBrokerTable/AdminBrokerTableCompo/AdminBrokerTable";
import { AdminDashCard } from "./AdminDashCard";
import CloudImg from "../../../images/farmer_cloud_img.png";
import { FarmerTable } from "../../Farmer/farmerProduct/FarmerTable";
import NewAdminSidebar from "../../../components/dashboard-nav-and-side/AdminSidebar";
import NewBrokerNavbar from "../../../components/dashboard-nav-and-side/NewBrokerNavbar";
import React from "react";
import Thebarchart from "../../Farmer/FarmerDB/Thebarchart";
import Thelinechart from "../../Broker/BrokerDashboard/Thelinechart";
import WeatherImg from "../../../images/farmer_img_circle.png";

// import NewBrokerSidebar from "../../../components/dashboard-nav-and-side/NewBrokerSidebar";





// import BrokerDashnav from "../../../components/dashboard-nav-and-side/BrokerDashnav";









// import { FarmerTable } from "../farmerProduct/FarmerTable";
// import Sidebar from "../../../components/dashboard-nav-and-side/Sidebar";
// import Dashnav from "../../../components/dashboard-nav-and-side/Dashnav";

// import BrokerSidebar from "../../../components/dashboard-nav-and-side/BrokerSidebar";






export const AdminDashIndex = () => {
	return (
		<div>
			{/* <Sidebar />
      <Dashnav /> */}
			{/* <BrokerSidebar />
			<BrokerDashnav /> */}
			<NewBrokerNavbar />
			<NewAdminSidebar/>
			{/* <NewBrokerSidebar /> */}
			<div>
				<section className='admin_dashboard_wrapper'>
					<section className='admin_dash_title'>
						<h2>Dashboard</h2>
					</section>
					<section className='admin_dash_summary'>
						<section className='today_weather_card_container'>
							<h4>Today</h4>
							<AdminDashCard />
						</section>
						{/* Admin Weather Container */}
						<section className='admin_weather_container'>
							<p className='weather_report'>Weather Report</p>
							<div className='weather_img'>
								<img src={WeatherImg} alt='weather img' id='weather_circle' />
								<img src={CloudImg} alt='cloud icon' id='weather_cloud_icon' />
							</div>
							<p>
								Today:
								<span>
									29 <sup> ℃ </sup>
								</span>
							</p>
						</section>
					</section>
					{/* farmer_add_product */}
					<section className='admin_recent_upload'>
						<p>Recent Upload</p>
					</section>
					{/* <FarmerTable /> */}
					<FarmerTable />
					<AdminBrokerTable />
					<section className='farmerdash_graph'>
						<Thebarchart />

						<Thelinechart />
					</section>
				</section>
			</div>
		</div>
	);
};
