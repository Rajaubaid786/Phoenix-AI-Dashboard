import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import AddClientModal from "./AddClientModal";

const ClientsTable = ({
  clients,
  setClients,
  activities,
  setActivities,
  searchTerm = "", // Dashboard se aane wala search prop
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  
  // Naya Filter State
  const [filterType, setFilterType] = useState("All");

  const handleDelete = (id) => {
    const updatedClients = clients.filter(
      (client) => client.id !== id
    );

    setActivities((prev) => [
      {
        id: Date.now(),
        text: "Client deleted",
        time: "Just now",
      },
      ...prev,
    ]);

    setClients(updatedClients);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsOpen(true);
  };

  // 🚀 MAIN LOGIC: Search aur Filter dono ka combination
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (filterType === "Paid") matchesFilter = client.payment === "Paid";
    else if (filterType === "Pending") matchesFilter = client.payment === "Pending";
    else if (filterType === "Active AI") matchesFilter = client.aiStatus === "Active";
    else if (filterType === "Paused AI") matchesFilter = client.aiStatus !== "Active";

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="
      bg-card
      border
      border-white/5
      rounded-2xl
      p-5
      overflow-hidden
    ">

      {/* Header */}
      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">
        <div>
          <h2 className="text-xl font-semibold">
            Clients Overview
          </h2>
          <p className="text-subtext text-sm mt-1">
            Manage all onboarded AI clients
          </p>
        </div>

        <button
          onClick={() => {
            setEditingClient(null);
            setIsOpen(true);
          }}
          className="
            bg-primary
            hover:bg-orange-600
            transition
            px-4
            py-2
            rounded-xl
            text-sm
            font-medium
          "
        >
          + Add Client
        </button>
      </div>

      {/* 🔥 SaaS Filter Chips */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        {["All", "Paid", "Pending", "Active AI", "Paused AI"].map((filter) => (
          <button
            key={filter}
            onClick={() => setFilterType(filter)}
            className={`
              whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition border
              ${
                filterType === filter
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-soft border-white/5 text-subtext hover:text-white hover:bg-white/5"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div
        className="
          hidden
          lg:block
          overflow-x-auto
          overflow-y-auto
          max-h-[500px]
          pr-2
        "
      >
        <table className="w-full">
          <thead>
            <tr className="
              text-left
              text-subtext
              text-sm
              border-b
              border-white/5
            ">
              <th className="pb-4 font-medium">Client</th>
              <th className="pb-4 font-medium">Type</th>
              <th className="pb-4 font-medium">Phone</th>
              <th className="pb-4 font-medium">Plan</th>
              <th className="pb-4 font-medium">Payment</th>
              <th className="pb-4 font-medium">AI Status</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-subtext">
                  No clients match your search or filter.
                </td>
              </tr>
            ) : (
              filteredClients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="
                    border-b
                    border-white/5
                    hover:bg-soft/50
                    transition
                  "
                >
                  <td className="py-5 font-medium">{client.name}</td>
                  <td className="py-5 text-subtext">{client.type}</td>
                  <td className="py-5 text-subtext">{client.phone}</td>
                  <td className="py-5">{client.plan}</td>

                  {/* Payment */}
                  <td className="py-5">
                    <span className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${
                        client.payment === "Paid"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }
                    `}>
                      {client.payment}
                    </span>
                  </td>

                  {/* AI Status */}
                  <td className="py-5">
                    <span className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${
                        client.aiStatus === "Active"
                          ? "bg-primary/10 text-primary"
                          : "bg-red-500/10 text-red-400"
                      }
                    `}>
                      {client.aiStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-5">
                    <div className="
                      flex
                      items-center
                      justify-end
                      gap-3
                    ">
                      {/* Edit */}
                      <button
                        onClick={() => handleEdit(client)}
                        className="
                          w-9
                          h-9
                          rounded-lg
                          bg-soft
                          flex
                          items-center
                          justify-center
                          hover:border
                          hover:border-primary/20
                          transition
                        "
                      >
                        <FaEdit />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="
                          w-9
                          h-9
                          rounded-lg
                          bg-soft
                          flex
                          items-center
                          justify-center
                          hover:border
                          hover:border-red-500/20
                          transition
                        "
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredClients.length === 0 ? (
          <div className="py-8 text-center text-subtext bg-soft rounded-xl border border-white/5">
            No clients match your search.
          </div>
        ) : (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className="
                bg-soft
                rounded-xl
                p-4
                border
                border-white/5
              "
            >
              <div className="
                flex
                items-start
                justify-between
                gap-4
              ">
                <div>
                  <h3 className="font-semibold">{client.name}</h3>
                  <p className="text-subtext text-sm mt-1">{client.type}</p>
                </div>
                <span className={`
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  ${
                    client.aiStatus === "Active"
                      ? "bg-primary/10 text-primary"
                      : "bg-red-500/10 text-red-400"
                  }
                `}>
                  {client.aiStatus}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <p className="text-subtext">{client.phone}</p>
                <p>Plan: {client.plan}</p>
                <p>
                  Payment:{" "}
                  <span className={client.payment === "Paid" ? "text-green-400" : "text-yellow-400"}>
                    {client.payment}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <AddClientModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        clients={clients}
        setClients={setClients}
        editingClient={editingClient}
        setEditingClient={setEditingClient}
        activities={activities}
        setActivities={setActivities}
      />

    </div>
  );
};

export default ClientsTable;