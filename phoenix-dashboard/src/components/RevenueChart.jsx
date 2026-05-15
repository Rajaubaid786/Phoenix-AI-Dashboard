import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const RevenueChart = ({ clients }) => {
  const totalRevenue = clients.reduce(
    (total, client) => {
      const value =
        parseInt(
          client.plan.replace(/\D/g, "")
        ) || 0;
      return total + value;
    },
    0
  );

  const data = [
    {
      month: "Jan",
      revenue: totalRevenue * 0.25,
    },
    {
      month: "Feb",
      revenue: totalRevenue * 0.4,
    },
    {
      month: "Mar",
      revenue: totalRevenue * 0.55,
    },
    {
      month: "Apr",
      revenue: totalRevenue * 0.7,
    },
    {
      month: "May",
      revenue: totalRevenue * 0.85,
    },
    {
      month: "Jun",
      revenue: totalRevenue,
    },
  ];

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-5 h-full min-h-[350px] flex flex-col">

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Revenue Flow
        </h2>

        <p className="text-subtext text-sm mt-1">
          Monthly AI subscription revenue
        </p>
      </div>

      {/* Wrapper to allow Recharts to fill remaining space */}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>

            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF6A00" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              stroke="#9AA4AF"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#FF6A00"
              fill="url(#colorRevenue)"
              fillOpacity={1}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default RevenueChart;