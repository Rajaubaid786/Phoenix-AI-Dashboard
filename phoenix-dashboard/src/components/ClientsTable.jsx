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
  searchTerm = "", 
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [filterType, setFilterType] = useState("All");

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    
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
    <div className="bg-card border border-white/5 rounded-2xl p-5 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Clients Overview</h2>
          <p className="text-subtext text-sm mt-1">Manage all onboarded AI clients</p>
        </div>

        <button
          onClick={() => {
            setEditingClient(null);
            setIsOpen(true);
          }}
          className="bg-primary hover:bg-orange-600 transition px-4 py-2 rounded-xl text-sm font-medium"
        >
          + Add Client
        </button>
      </div>

      {/* SaaS Filter Chips */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        {["All", "Paid", "Pending", "Active AI", "Paused AI"].map((filter) => (
          <button
            key={filter}
            onClick={() => setFilterType(filter)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition border ${
              filterType === filter
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-soft border-white/5 text-subtext hover:text-white hover:bg-white/5"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Desktop Table (Visible on LG screens and up) */}
      <div className="hidden lg:block overflow-x-auto overflow-y-auto max-h-[500px] pr-2">
        <table className="w-full">
          <thead>
            <tr className="text-left text-subtext text-sm border-b border-white/5">
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
                <td colSpan="7" className="py-8 text-center text-subtext">No clients match your search.</td>
              </tr>
            ) : (
              filteredClients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-soft/50 transition"
                >
                  <td className="py-5 font-medium">{client.name}</td>
                  <td className="py-5 text-subtext">{client.type}</td>
                  <td className="py-5 text-subtext">{client.phone}</td>
                  <td className="py-5">{client.plan}</td>
                  <td className="py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      client.payment === "Paid" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                    }`}>
                      {client.payment}
                    </span>
                  </td>
                  <td className="py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      client.aiStatus === "Active" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-400"
                    }`}>
                      {client.aiStatus}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handleEdit(client)} className="w-9 h-9 rounded-lg bg-soft flex items-center justify-center hover:border hover:border-primary/20 transition">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(client.id)} className="w-9 h-9 rounded-lg bg-soft flex items-center justify-center hover:border hover:border-red-500/20 transition">
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

      {/* Mobile Cards (Visible on screens smaller than LG) */}
      <div className="lg:hidden space-y-4">
        {filteredClients.length === 0 ? (
          <div className="py-8 text-center text-subtext bg-soft rounded-xl border border-white/5">
            No clients match your search.
          </div>
        ) : (
          filteredClients.map((client) => (
            <div key={client.id} className="bg-soft rounded-xl p-4 border border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-white">{client.name}</h3>
                  <p className="text-subtext text-xs mt-1">{client.type}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  client.aiStatus === "Active" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-400"
                }`}>
                  {client.aiStatus}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-y-3 text-sm border-b border-white/5 pb-4">
                <div>
                  <p className="text-subtext text-[10px] uppercase">Phone</p>
                  <p className="text-white/90">{client.phone}</p>
                </div>
                <div>
                  <p className="text-subtext text-[10px] uppercase">Plan</p>
                  <p className="text-white/90">{client.plan}</p>
                </div>
                <div>
                  <p className="text-subtext text-[10px] uppercase">Payment Status</p>
                  <p className={client.payment === "Paid" ? "text-green-400 font-medium" : "text-yellow-400 font-medium"}>
                    {client.payment}
                  </p>
                </div>
              </div>

              {/* 🔥 FIXED: Added Action Buttons for Mobile */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-subtext italic">Client ID: #{client.id.toString().slice(-4)}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(client)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-xs font-medium hover:bg-primary/10 hover:text-primary transition border border-white/5"
                  >
                    <FaEdit size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(client.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/20 transition border border-red-500/10"
                  >
                    <FaTrash size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal remains the same */}
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