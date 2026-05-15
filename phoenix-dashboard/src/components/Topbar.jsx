import {
  FaBell,
  FaSearch,
  FaBars,
} from "react-icons/fa";

import { motion } from "framer-motion";

const Topbar = ({ setIsOpen, searchTerm, setSearchTerm }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        mb-8
      "
    >

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={() => setIsOpen(true)}
          className="
            md:hidden
            w-11
            h-11
            rounded-xl
            bg-card
            border
            border-white/5
            flex
            items-center
            justify-center
          "
        >
          <FaBars />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            Dashboard Overview
          </h1>

          <p className="text-subtext mt-1">
            Welcome back, Admin 👋
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="
          flex
          items-center
          gap-3
          bg-card
          border
          border-white/5
          rounded-xl
          px-4
          py-3
          w-full
          md:w-[260px]
        ">
          <FaSearch className="text-subtext" />

          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              bg-transparent
              outline-none
              text-sm
              w-full
              placeholder:text-subtext
            "
          />
        </div>

        {/* Bell */}
        <button className="
          w-12
          h-12
          rounded-xl
          bg-card
          border
          border-white/5
          flex
          items-center
          justify-center
          hover:border-primary/30
          transition
        ">
          <FaBell />
        </button>

      </div>

    </motion.div>
  );
};

export default Topbar;