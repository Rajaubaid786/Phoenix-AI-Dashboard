import { motion } from "framer-motion";

const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="
        bg-card
        border border-white/5
        rounded-2xl
        p-5
        relative
        overflow-hidden
      "
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <p className="text-subtext text-sm">
            {title}
          </p>

          <div className="text-primary text-xl">
            {icon}
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-4">
          {value}
        </h2>

        <p className="text-subtext text-sm mt-2">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;