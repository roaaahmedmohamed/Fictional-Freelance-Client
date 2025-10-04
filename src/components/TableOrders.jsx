
const activities = [
  { client: "John Doe", activity: "Website Design", amount: "$1200", status: "Completed" },
  { client: "Jane Smith", activity: "Logo Design", amount: "$450", status: "Pending" },
  { client: "Acme Corp", activity: "Mobile App UI/UX", amount: "$3200", status: "Completed" },
  { client: "Beta LLC", activity: "Branding Package", amount: "$900", status: "Canceled" },
  { client: "Gamma Ltd", activity: "Illustration Work", amount: "$700", status: "Pending" },
  { client: "Delta Inc", activity: "Landing Page Design", amount: "$500", status: "Completed" },
  { client: "Omega Co", activity: "Social Media Graphics", amount: "$300", status: "Pending" },
];

export default function RecentActivity() {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="text-gray-200 mb-4 font-semibold">Recent Activity</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 text-sm">
            <th className="pb-2">Client</th>
            <th className="pb-2">Activity</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((act, idx) => (
            <tr key={idx} className="border-t border-gray-700">
              <td className="py-2">{act.client}</td>
              <td className="py-2">{act.activity}</td>
              <td className="py-2">{act.amount}</td>
              <td
                className={`py-2 font-medium ${
                  act.status === "Completed"
                    ? "text-green-400"
                    : act.status === "Pending"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {act.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
