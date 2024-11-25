// AdminDashboard.js
import React, { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/outline";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "../../config/axiosConfig";
import { Link } from "react-router-dom";

// Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get("/contact/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  // Sample data for the chart
  const chartData = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        label: "Sales",
        data: [30, 50, 70],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-100 flex flex-col fixed h-full">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <Link></Link>
          <Link to="/signup">
            <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700">
              Add User
            </button>
          </Link>
          <Link to="/addrecipe" smooth={true} duration={500} offset={-70}>
            <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700">
              Add Recipe
            </button>
          </Link>
          <Link to="/addproduct" smooth={true} duration={500} offset={-70}>
            <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700">
              Add Product
            </button>
          </Link>
          {/* Additional navigation items */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <BellIcon className="h-8 w-8 text-gray-300" />
              {messages.length > 0 && (
                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500"></span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 shadow-lg rounded-md p-4 text-gray-200">
                {messages.length === 0 ? (
                  <p>No new messages</p>
                ) : (
                  <ul>
                    {messages.slice(0, 5).map((msg) => (
                      <li
                        key={msg._id}
                        className="border-b border-gray-700 py-2"
                      >
                        {msg.name}: {msg.message.slice(0, 30)}...
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Chart Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <Bar
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Messages Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Contact Messages</h2>
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li key={msg._id} className="bg-gray-700 p-4 rounded-md">
                <h3 className="font-semibold">
                  {msg.name} - {msg.email}
                </h3>
                <p>{msg.message}</p>
                <span className="text-gray-500 text-sm">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   MessageSquare,
//   UtensilsCrossed,
//   Bell,
//   Search,
//   Filter,
// } from "lucide-react";

// // Sample data - replace with your backend data
// const sampleMessages = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     message: "Great recipes!",
//     date: "2024-03-15",
//     category: "Support",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     message: "Loving the meal plans",
//     date: "2024-03-14",
//     category: "Feedback",
//   },
//   {
//     id: 3,
//     name: "Mike Johnson",
//     email: "mike@example.com",
//     message: "Need help with diet plan",
//     date: "2024-03-13",
//     category: "Question",
//   },
// ];

// const sampleRecipeCategories = [
//   { category: "Breakfast", count: 45 },
//   { category: "Lunch", count: 38 },
//   { category: "Dinner", count: 52 },
//   { category: "Snacks", count: 25 },
//   { category: "Dessert", count: 30 },
//   { category: "Vegetarian", count: 40 },
// ];

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("messages");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [showFilterMenu, setShowFilterMenu] = useState(false);

//   const messageCategories = ["All", "Support", "Feedback", "Question"];

//   const filteredMessages = sampleMessages.filter((message) => {
//     const matchesSearch =
//       message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       message.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "All" || message.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="fixed w-64 h-full bg-white shadow-lg">
//         <div className="p-4">
//           <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
//         </div>
//         <nav className="mt-4">
//           <button
//             onClick={() => setActiveTab("messages")}
//             className={`w-full p-4 flex items-center space-x-2 ${
//               activeTab === "messages"
//                 ? "bg-blue-50 text-blue-600"
//                 : "text-gray-600"
//             } hover:bg-blue-50 transition-colors`}
//           >
//             <MessageSquare size={20} />
//             <span>Messages</span>
//           </button>
//           <button
//             onClick={() => setActiveTab("recipes")}
//             className={`w-full p-4 flex items-center space-x-2 ${
//               activeTab === "recipes"
//                 ? "bg-blue-50 text-blue-600"
//                 : "text-gray-600"
//             } hover:bg-blue-50 transition-colors`}
//           >
//             <UtensilsCrossed size={20} />
//             <span>Recipe Categories</span>
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="ml-64 p-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//           </h2>
//           <button className="p-2 rounded-full hover:bg-gray-100">
//             <Bell size={24} />
//           </button>
//         </div>

//         {/* Dashboard Content */}
//         {activeTab === "messages" && (
//           <div>
//             {/* Search and Filter Bar */}
//             <div className="mb-6 flex gap-4">
//               <div className="relative flex-1">
//                 <Search
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search messages..."
//                   className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="relative">
//                 <button
//                   onClick={() => setShowFilterMenu(!showFilterMenu)}
//                   className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 hover:bg-gray-50"
//                 >
//                   <Filter size={20} />
//                   <span>Filter</span>
//                 </button>
//                 {showFilterMenu && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
//                     {messageCategories.map((category) => (
//                       <button
//                         key={category}
//                         onClick={() => {
//                           setSelectedCategory(category);
//                           setShowFilterMenu(false);
//                         }}
//                         className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
//                           selectedCategory === category
//                             ? "bg-blue-50 text-blue-600"
//                             : ""
//                         }`}
//                       >
//                         {category}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Messages List */}
//             <div className="grid gap-6">
//               {filteredMessages.map((message) => (
//                 <div
//                   key={message.id}
//                   className="bg-white p-6 rounded-lg shadow-sm"
//                 >
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="font-semibold text-lg">{message.name}</h3>
//                       <p className="text-sm text-gray-500">{message.email}</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                         {message.category}
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         {message.date}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="text-gray-700">{message.message}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "recipes" && (
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h3 className="text-lg font-semibold mb-6">
//               Recipes by Meal Plan Category
//             </h3>
//             <div className="h-96">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={sampleRecipeCategories}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="category" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#10b981" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

