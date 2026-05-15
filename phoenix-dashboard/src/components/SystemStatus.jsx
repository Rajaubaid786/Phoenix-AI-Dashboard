const SystemStatus = ({ clients = [] }) => {
  // 1. Auto-calculate system statuses from actual client data
  const activeCount = clients.filter((c) => c.aiStatus === "Active").length;
  const pausedCount = clients.filter((c) => c.aiStatus === "Paused").length;
  const offlineCount = clients.filter((c) => c.aiStatus === "Offline").length;

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-5 h-full flex flex-col">
      
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          AI Systems
        </h2>

        <p className="text-subtext text-sm mt-1">
          Current running systems
        </p>
      </div>

      {/* 2. Enterprise Feature: Auto-Calculated Stats Box */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-soft border border-white/5 rounded-xl p-3 text-center">
          <p className="text-subtext text-xs mb-1">Online</p>
          <p className="text-xl font-bold text-green-400">{activeCount}</p>
        </div>
        <div className="bg-soft border border-white/5 rounded-xl p-3 text-center">
          <p className="text-subtext text-xs mb-1">Paused</p>
          <p className="text-xl font-bold text-yellow-400">{pausedCount}</p>
        </div>
        <div className="bg-soft border border-white/5 rounded-xl p-3 text-center">
          <p className="text-subtext text-xs mb-1">Offline</p>
          <p className="text-xl font-bold text-red-400">{offlineCount}</p>
        </div>
      </div>

      {/* 3. Dynamic List from Local Storage Data */}
      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[250px]">
        {clients.length === 0 ? (
          <p className="text-center text-subtext text-sm py-4">No AI systems running.</p>
        ) : (
          clients.map((client) => (
            <div
              key={client.id}
              className="
                flex
                items-center
                justify-between
                bg-soft
                rounded-xl
                px-4
                py-3
              "
            >
              <div>
                <h3 className="font-medium">
                  {client.name}
                </h3>

                <p className="text-subtext text-sm">
                  {client.type ? `${client.type} AI` : "Voice Reception AI"}
                </p>
              </div>

              <div
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-medium
                  ${
                    client.aiStatus === "Active"
                      ? "bg-green-500/10 text-green-400"
                      : client.aiStatus === "Paused"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-red-500/10 text-red-400"
                  }
                `}
              >
                {client.aiStatus}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SystemStatus;