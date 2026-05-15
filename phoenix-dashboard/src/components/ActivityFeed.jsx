import { motion } from "framer-motion";

import {
  FaCheckCircle,
} from "react-icons/fa";

const ActivityFeed = ({
  activities,
}) => {

  return (
    <div
      className="
        bg-card
        border
        border-white/5
        rounded-2xl
        p-5
        h-[500px]
        overflow-hidden
      "
    >

      {/* Header */}
      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Live Activity
        </h2>

        <p className="text-subtext text-sm mt-1">
          Recent client activity and updates
        </p>

      </div>

      {/* Activities */}
      <div
        className="
          space-y-4
          overflow-y-auto
          h-[400px]
          pr-2
        "
      >

        {activities.map((activity, index) => (

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

            {/* Icon */}
            <div
              className="
                w-10
                h-10
                rounded-full
                bg-black/20
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <FaCheckCircle className="text-primary" />
            </div>

            {/* Content */}
            <div className="flex-1">

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                <h3 className="font-medium">
                  System Activity
                </h3>

                <span className="text-xs text-subtext whitespace-nowrap">
                  {activity.time}
                </span>

              </div>

              <p className="text-subtext text-sm mt-1">
                {activity.text}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
};

export default ActivityFeed;