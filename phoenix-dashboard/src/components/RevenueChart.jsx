import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const RevenueChart = ({ clients = [] }) => {
  const currentMonthRevenue = clients.reduce((total, client) => {
    const value = parseInt(client.plan.replace(/\D/g, "")) || 0;
    return total + value;
  }, 0);

  // Sirf aakhri entry (May) dynamic hogi
  const data = [
    { month: "Jan", revenue: 800 }, // Fixed Past Data
    { month: "Feb", revenue: 1500 }, // Fixed Past Data
    { month: "Mar", revenue: 1100 }, // Fixed Past Data
    { month: "Apr", revenue: 1700 }, // Fixed Past Data
    { month: "May", revenue: currentMonthRevenue }, // Real-time Dynamic Data
  ];

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6 h-full min-h-[350px] flex flex-col">
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Revenue Flow</h2>
          <p className="text-subtext text-xs mt-1">Monthly subscription insights</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-primary">${currentMonthRevenue}</p>
          <p className="text-[10px] text-green-400 font-mono tracking-wider">LIVE DATA SYNC</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FF6A00" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9AA4AF", fontSize: 12 }}
              dy={10}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#FF6A00" }}
              formatter={(value) => [`$${value}`, "Revenue"]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#FF6A00"
              strokeWidth={3}
              fill="url(#colorRevenue)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;