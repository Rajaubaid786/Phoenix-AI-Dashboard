import { useState } from "react";
import {
  FaUsers,
  FaRobot,
  FaDollarSign,
} from "react-icons/fa";

import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import SystemStatus from "../components/SystemStatus";
import ActivityFeed from "../components/ActivityFeed";
import ClientsTable from "../components/ClientsTable";

const Dashboard = ({ 
  setIsOpen, 
  clients, 
  setClients, 
  activities, 
  setActivities 
}) => {

  // Search State abhi bhi yahan rakhi hai taake filter sahi chale
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex-1 p-4 md:p-6 overflow-hidden">

      {/* Topbar - Welcome message Admin karne ke liye Topbar.jsx me change karenge */}
      <Topbar 
        setIsOpen={setIsOpen} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      {/* Stats - Dynamic from Props */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        <StatCard
          title="Total Clients"
          value={clients.length}
          subtitle="+4 added this month"
          icon={<FaUsers />}
        />

        <StatCard
          title="Monthly Revenue"
          value={`$${clients.reduce((total, client) => {
            const numericValue =
              parseInt(
                client.plan.replace(/\D/g, "")
              ) || 0;
            return total + numericValue;
          }, 0)}`}
          subtitle="Current active subscriptions"
          icon={<FaDollarSign />}
        />

        <StatCard
          title="Active AI Systems"
          value={
            clients.filter(
              (client) =>
                client.aiStatus === "Active"
            ).length
          }
          subtitle="Systems running smoothly"
          icon={<FaRobot />}
        />
      </div>

      {/* Analytics Section */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
          mt-8
          items-stretch 
        "
      >
        {/* Revenue Chart */}
        <div className="xl:col-span-2">
          <RevenueChart clients={clients} />
        </div>

        {/* AI Systems List */}
        <div>
          <SystemStatus clients={clients} />
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
          mt-6
          items-stretch
        "
      >
        {/* Clients Table */}
        <div className="xl:col-span-2">
          <ClientsTable
            clients={clients}
            setClients={setClients}
            activities={activities}
            setActivities={setActivities}
            searchTerm={searchTerm}
          />
        </div>

        {/* Activity Feed */}
        <div>
          <ActivityFeed 
  activities={activities} 
  setActivities={setActivities} // <--- Ye prop pass karna mat bhoolna
/>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;