
export const notifications = [
  { id: 1, text: "New project assigned: Website Redesign", time: "2h ago" },
  { id: 2, text: "Task completed: Logo Design", time: "5h ago" },
  { id: 3, text: "New message from client John", time: "1d ago" },
];

export const summaryCards = [
  { title: "Total Projects", value: 12 },
  { title: "Earnings", value: "$4,200" },
  { title: "Tasks Due", value: 5 },
];


export const projects = [
  {
    id: 1,
    name: "Website Redesign",
    status: "Ongoing",
    deadline: "2025-10-10",
    team: [
      { name: "Alice", avatar: "https://i.pravatar.cc/40?img=20" },
      { name: "Bob", avatar: "https://i.pravatar.cc/40?img=12" },
    ],
  },
  {
    id: 2,
    name: "Mobile App UI",
    status: "Completed",
    deadline: "2025-09-20",
    team: [
      { name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3" },
      { name: "Diana", avatar: "https://i.pravatar.cc/40?img=14" },
    ],
  },
  {
    id: 3,
    name: "Logo Design",
    status: "Delayed",
    deadline: "2025-10-05",
    team: [{ name: "Eve", avatar: "https://i.pravatar.cc/40?img=5" }],
  },
];
