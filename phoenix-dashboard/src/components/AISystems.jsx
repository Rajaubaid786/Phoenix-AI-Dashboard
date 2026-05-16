import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaRobot, FaCheckCircle, FaClock, FaArrowLeft } from "react-icons/fa";

// 🚀 setActiveTab prop add ki taake Dashboard par wapas ja saken
const AISystems = ({ setActiveTab, clients = [] }) => {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-8">
        {/* 🔥 Back Button Section */}
        <button 
          onClick={() => setActiveTab("Dashboard")} 
          className="flex items-center gap-2 text-subtext hover:text-primary text-xs mb-3 transition-all group"
        >
          <FaArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold">AI Project Tracking</h1>
        <p className="text-subtext mt-1">Status of custom Retell AI agents for each client</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.length === 0 ? (
          <div className="text-subtext col-span-full py-10 text-center bg-card rounded-2xl border border-white/5">
            No active systems found. Add clients to see tracking.
          </div>
        ) : (
          clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-white/5 rounded-2xl p-5 hover:bg-soft/30 transition group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <FaRobot size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  client.aiStatus === "Active" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                }`}>
                  {client.aiStatus}
                </span>
              </div>

              <h3 className="text-lg font-bold">{client.name} Agent</h3>
              <p className="text-subtext text-sm mb-4">Type: {client.type}</p>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-subtext flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Model Ready
                  </span>
                  <span className="font-mono text-xs">Retell AI</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-subtext flex items-center gap-2">
                    <FaClock className="text-primary" /> Integration
                  </span>
                  <span className="font-mono text-xs">WhatsApp / Web</span>
                </div>
              </div>

              <a 
                href="https://beta.retellai.com/dashboard" 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-soft group-hover:bg-primary group-hover:text-white transition py-2 rounded-xl text-sm font-medium"
              >
                Open Retell AI <FaExternalLinkAlt size={12} />
              </a>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AISystems;