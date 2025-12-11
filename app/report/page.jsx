"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ReportPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, statusFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("report_status", statusFilter);
      if (searchTerm) params.append("name", searchTerm);

      const response = await fetch(`/api/users?${params.toString()}`);
      const result = await response.json();
      if (result.status === "success") {
        setData(result.data);
      } else {
        console.error("Failed to fetch data:", result.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    setToggleLoading(id);
    const newStatus = currentStatus === "PENDING" ? "DONE" : "PENDING";

    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, report_status: newStatus }),
      });

      const result = await response.json();

      if (result.status === "success") {
        // Refresh data to respect current sorting/filtering if needed,
        // or just update local state if filter permits visibility.
        // Simple approach: Update local state
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, report_status: newStatus } : item
          )
        );
      } else {
        console.error("Failed to update status:", result.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setToggleLoading(null);
    }
  };

  const formatDOB = (day, month, year) => {
    if (!day || !month || !year) return "-";
    return `${day}/${month}/${year}`;
  };

  const formatTime = (hour, minute) => {
    if (hour === undefined || minute === undefined) return "-";
    const minStr = minute < 10 ? `0${minute}` : minute;
    return `${hour}:${minStr}`;
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 md:px-8 pt-10 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-8xl mb-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-ptsans-bold text-white mb-2">
          Inaugration Leads
        </h1>
        <p className="text-zinc-300 text-lg">List of all user submissions</p>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-8xl mb-6 flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="flex w-full md:w-auto gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 backdrop-blur-md"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 backdrop-blur-md cursor-pointer"
          >
            <option value="ALL" className="text-black">
              All Status
            </option>
            <option value="PENDING" className="text-black">
              Pending
            </option>
            <option value="DONE" className="text-black">
              Done
            </option>
          </select>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
          <p className="text-white text-lg">Loading data...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-8xl overflow-hidden rounded-2xl shadow-2xl p-1 mobile-glass-container"
        >
          <div className="overflow-x-auto bg-black/20 rounded-xl">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="bg-white/5 text-indigo-100 uppercase text-sm tracking-wider border-b border-white/10">
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Birth Details</th>
                  <th className="px-6 py-4 font-semibold">Place</th>
                  <th className="px-6 py-4 font-semibold">Gender</th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-zinc-200">
                      {item.contact || "-"}
                    </td>
                    <td className="px-6 py-4 text-zinc-200">
                      {item.email || "-"}
                    </td>
                    <td className="px-6 py-4 text-zinc-200">
                      <div className="flex flex-col">
                        <span>
                          Date: {formatDOB(item.day, item.month, item.year)}
                        </span>
                        <span className="text-xs text-zinc-400">
                          Time: {formatTime(item.hour, item.minute)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-200">
                      {item.birthPlace || "-"}
                    </td>
                    <td className="px-6 py-4 capitalize text-zinc-200">
                      {item.gender || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          handleStatusToggle(item.id, item.report_status)
                        }
                        disabled={toggleLoading === item.id}
                        className={`
                            px-4 py-1.5 rounded-full text-xs font-semibold
                            transition-all duration-300 transform hover:scale-105
                            ${
                              item.report_status === "DONE"
                                ? "bg-green-500/20 text-green-300 border border-green-500/50 hover:bg-green-500/30"
                                : "bg-orange-500/20 text-orange-300 border border-orange-500/50 hover:bg-orange-500/30"
                            }
                            ${
                              toggleLoading === item.id
                                ? "opacity-50 cursor-wait"
                                : ""
                            }
                          `}
                      >
                        {toggleLoading === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin inline-block" />
                        ) : (
                          <span className="capitalize">
                            {item.report_status || "PENDING"}
                          </span>
                        )}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.length === 0 && (
            <div className="p-8 text-center text-zinc-400">
              No records found.
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
