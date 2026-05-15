import {
  FaChartPie,
  FaUsers,
  FaRobot,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab, clients = [] }) => {

  // 🚀 Real-time logic for Progress Bar
  const totalSystems = clients.length;
  const activeSystems = clients.filter(c => c.aiStatus === "Active").length;
  const percent = totalSystems > 0 ? Math.round((activeSystems / totalSystems) * 100) : 0;

  const menuItems = [
    { name: "Dashboard", icon: <FaChartPie /> },
    { name: "Clients", icon: <FaUsers /> },
    { name: "AI Systems", icon: <FaRobot /> },
  ];

  const sidebarContent = (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ duration: 0.3 }}
      className="
        w-[260px]
        h-screen
        bg-card
        border-r
        border-white/5
        p-6
        flex
        flex-col
        fixed
        md:relative
        z-50
      "
    >
      {/* Mobile Close */}
      <div className="flex justify-end md:hidden mb-4">
        <button onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>
      </div>

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-primary">
          Phoenix AI
        </h1>
        <p className="text-subtext text-sm mt-1">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActiveTab(item.name);
              setIsOpen(false);
            }}
            className={`
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition
              border
              ${activeTab === item.name 
                ? "bg-primary/10 text-primary border-primary/20 font-medium" 
                : "text-subtext hover:text-white hover:bg-soft border-transparent"
              }
            `}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>

      {/* Bottom Section (Only Progress Card remains) */}
      <div className="mt-auto">
        <div className="
          bg-soft
          rounded-2xl
          p-4
          border
          border-white/5
        ">
          <p className="text-sm text-subtext">
            System Infrastructure
          </p>

          <div className="
            mt-3
            h-2
            bg-black/30
            rounded-full
            overflow-hidden
          ">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              className="
                h-full
                bg-primary
                rounded-full
              " 
            />
          </div>

          <p className="text-xs text-subtext mt-2">
            {percent}% Active Systems ({activeSystems}/{totalSystems})
          </p>
        </div>
      </div>

    </motion.div>
  );

  return (
    <>
      <div className="hidden md:block">
        {sidebarContent}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            {sidebarContent}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;