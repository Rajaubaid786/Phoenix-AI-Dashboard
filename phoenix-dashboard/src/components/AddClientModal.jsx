import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const AddClientModal = ({
  isOpen,
  setIsOpen,
  clients,
  setClients,
  editingClient,
  setEditingClient,
  activities,
  setActivities,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    phone: "",
    plan: "",
    payment: "Pending",
    aiStatus: "Active",
  });

  useEffect(() => {
    if (editingClient) {
      setFormData({
        name: editingClient.name || "",
        type: editingClient.type || "",
        phone: editingClient.phone || "",
        plan: editingClient.plan || "",
        payment: editingClient.payment || "Pending",
        aiStatus: editingClient.aiStatus || "Active",
      });
    } else {
      setFormData({
        name: "",
        type: "",
        phone: "",
        plan: "",
        payment: "Pending",
        aiStatus: "Active",
      });
    }
  }, [editingClient]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingClient) {
      const updatedClients = clients.map((client) =>
        client.id === editingClient.id
          ? {
              ...client,
              ...formData,
            }
          : client
      );

      setClients(updatedClients);

      // 🔥 ENTERPRISE ACTIVITY LOGIC FOR EDIT
      let activityText = `${formData.name} profile updated`; // Default
      
      if (editingClient.payment !== formData.payment && formData.payment === "Paid") {
        activityText = `Payment marked as Paid for ${formData.name}`;
      } else if (editingClient.payment !== formData.payment && formData.payment === "Pending") {
        activityText = `Payment marked as Pending for ${formData.name}`;
      } else if (editingClient.aiStatus !== formData.aiStatus && formData.aiStatus === "Paused") {
        activityText = `AI System paused for ${formData.name}`;
      } else if (editingClient.aiStatus !== formData.aiStatus && formData.aiStatus === "Active") {
        activityText = `AI System activated for ${formData.name}`;
      } else if (editingClient.plan !== formData.plan) {
        activityText = `Plan updated to ${formData.plan} for ${formData.name}`;
      }

      setActivities((prev) => [
        {
          id: Date.now(),
          text: activityText,
          time: "Just now",
        },
        ...prev,
      ]);

    } else {
      const newClient = {
        id: Date.now(),
        ...formData,
      };

      setClients([
        newClient,
        ...clients,
      ]);

      // 🔥 ENTERPRISE ACTIVITY LOGIC FOR ADD
      setActivities((prev) => [
        {
          id: Date.now(),
          text: `${formData.name} onboarded`,
          time: "Just now",
        },
        ...prev,
      ]);
    }

    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingClient(null);
    setFormData({
      name: "",
      type: "",
      phone: "",
      plan: "",
      payment: "Pending",
      aiStatus: "Active",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="
              fixed
              inset-0
              bg-black/60
              z-50
            "
          />

          {/* Modal Container */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            transition={{ duration: 0.25 }}
            className="
              fixed
              inset-0
              flex
              items-center
              justify-center
              p-4
              z-50
            "
          >
            {/* Modal Box */}
            <div
              className="
                w-full
                max-w-lg
                bg-card
                border
                border-white/10
                rounded-3xl
                p-6
                max-h-[90vh]
                overflow-y-auto
              "
            >
              {/* Header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-6
                "
              >
                <div>
                  <h2 className="text-2xl font-bold">
                    {editingClient
                      ? "Edit Client"
                      : "Add New Client"}
                  </h2>

                  <p className="text-subtext text-sm mt-1">
                    {editingClient
                      ? "Update client information"
                      : "Onboard a new AI client"}
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-soft
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaTimes />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="text-sm text-subtext">
                    Business Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      mt-2
                      bg-soft
                      border
                      border-white/5
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-primary/40
                    "
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="text-sm text-subtext">
                    Business Type
                  </label>

                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      mt-2
                      bg-soft
                      border
                      border-white/5
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-primary/40
                    "
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm text-subtext">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      mt-2
                      bg-soft
                      border
                      border-white/5
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-primary/40
                    "
                  />
                </div>

                {/* Plan */}
                <div>
                  <label className="text-sm text-subtext">
                    Monthly Plan
                  </label>

                  <input
                    type="text"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      mt-2
                      bg-soft
                      border
                      border-white/5
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-primary/40
                    "
                  />
                </div>

                {/* Payment Status */}
                <div>
                  <label className="text-sm text-subtext">
                    Payment Status
                  </label>

                  <select
                    name="payment"
                    value={formData.payment}
                    onChange={handleChange}
                    className="
                      w-full
                      mt-2
                      bg-soft
                      border
                      border-white/5
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-primary/40
                    "
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                {/* AI Status */}
                <div>
                  <label className="text-sm text-subtext">
                    AI Status
                  </label>

                  <select
                    name="aiStatus"
                    value={formData.aiStatus}
                    onChange={handleChange}
                    className="
                      w-full
                      mt-2
                      bg-soft
                      border
                      border-white/5
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-primary/40
                    "
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>

                {/* Buttons */}
                <div
                  className="
                    flex
                    items-center
                    justify-end
                    gap-4
                    pt-4
                  "
                >
                  <button
                    type="button"
                    onClick={handleClose}
                    className="
                      px-5
                      py-3
                      rounded-xl
                      bg-soft
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="
                      px-5
                      py-3
                      rounded-xl
                      bg-primary
                      hover:bg-orange-600
                      transition
                    "
                  >
                    {editingClient
                      ? "Save Changes"
                      : "Add Client"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddClientModal;