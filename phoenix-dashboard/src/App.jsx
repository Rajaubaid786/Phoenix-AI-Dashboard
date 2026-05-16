import { useState, useEffect } from "react";

// Components
import Sidebar from "./components/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard";
import ClientsTable from "./components/ClientsTable"; 
import AISystems from "./components/AISystems";

// Data
import { clientsData } from "./data/dashboardData";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 1. Navigation State
  const [activeTab, setActiveTab] = useState("Dashboard");

  // 2. Global States
  const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem("phoenix_clients");
    return savedClients ? JSON.parse(savedClients) : clientsData;
  });

  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("phoenix_activities");
    return savedActivities ? JSON.parse(savedActivities) : [
      { id: 1, text: "Phoenix Dashboard initialized", time: "Just now" },
    ];
  });

  // Save to LocalStorage automatically
  useEffect(() => {
    localStorage.setItem("phoenix_clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("phoenix_activities", JSON.stringify(activities));
  }, [activities]);

  return (
    <div className="bg-bg text-text min-h-screen flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        clients={clients} 
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        
        {/* 1. Dashboard View */}
        {activeTab === "Dashboard" && (
          <Dashboard
            setIsOpen={setIsOpen}
            clients={clients}
            setClients={setClients}
            activities={activities}
            setActivities={setActivities}
          />
        )}

        {/* 2. Clients Management View */}
        {activeTab === "Clients" && (
          <div className="p-4 md:p-6">
             <ClientsTable 
                setActiveTab={setActiveTab} 
                showBack={true} // 🔥 Sirf yahan 'true' kiya hai taake button nazar aaye
                clients={clients}
                setClients={setClients}
                activities={activities}
                setActivities={setActivities}
             />
          </div>
        )}

        {/* 3. AI Systems View */}
        {activeTab === "AI Systems" && (
          <div className="p-4 md:p-6">
            <AISystems 
              setActiveTab={setActiveTab} 
              clients={clients} 
            />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;