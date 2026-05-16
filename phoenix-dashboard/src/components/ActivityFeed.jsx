import { motion } from "framer-motion";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const ActivityFeed = ({ activities, setActivities }) => {
  return (
    <div
      className="
        bg-card
        border
        border-white/5
        rounded-2xl
        p-5
        h-full 
        flex
        flex-col
        overflow-hidden
      "
    >
      {/* Header - Added justify-between for the Clear button */}
      <div className="mb-6 shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Live Activity</h2>
          <p className="text-subtext text-sm mt-1">
            Recent system updates
          </p>
        </div>

        {/* 🔥 Clear Button - Only shows if there are activities */}
        {activities.length > 0 && (
          <button
            onClick={() => setActivities([])}
            className="
              flex items-center gap-2 
              text-[10px] uppercase font-bold tracking-wider
              text-subtext hover:text-primary
              bg-white/5 hover:bg-primary/10
              px-3 py-1.5 rounded-lg
              border border-white/5 hover:border-primary/20
              transition-all duration-300
            "
          >
            <FaTrashAlt size={10} />
            Clear
          </button>
        )}
      </div>

      {/* Activities Wrapper */}
      <div
        className="
          space-y-4
          overflow-y-auto
          flex-1 
          max-h-[500px]
          pr-2
          custom-scrollbar
        "
      >
        {activities.length === 0 ? (
          <div className="py-8 text-center text-subtext bg-soft rounded-xl border border-white/5 h-full flex flex-col items-center justify-center opacity-50">
            <FaCheckCircle size={30} className="mb-2" />
            <p className="text-sm">No recent activity.</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="
                flex
                items-start
                gap-4
                bg-soft
                rounded-xl
                p-4
                border
                border-white/5
                hover:border-primary/20
                transition
              "
            >
              <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                <FaCheckCircle className="text-primary" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-medium text-sm">System Activity</h3>
                  <span className="text-[10px] text-subtext whitespace-nowrap uppercase font-mono">
                    {activity.time}
                  </span>
                </div>
                <p className="text-subtext text-sm mt-1 leading-relaxed">
                  {activity.text}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;