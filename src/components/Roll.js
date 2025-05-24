import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ScissorsSquare, Store } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Roll.css";

const roles = [
  { name: "User", icon: <User size={60} />, value: "user" },
  { name: "Shopkeeper", icon: <Store size={60} />, value: "shopkeeper" },
  { name: "Tailor", icon: <ScissorsSquare size={60} />, value: "tailor" },
];

const Roll = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "No Email Found";
  const selectedRoleFromState = location.state?.selectedRole;
  const [selectedRole, setSelectedRole] = useState(selectedRoleFromState || null);

  const handleConfirm = async () => {
    if (selectedRole) {
      try {
        const response = await fetch(`http://localhost:5000/api/register/${selectedRole}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(`Successfully registered as ${selectedRole}`);

          if (selectedRole === "shopkeeper") {
            navigate("/shopregistration", { state: { email, role: selectedRole } });
          } else if (selectedRole === "tailor") {
            navigate("/tailorregistration", { state: { email, role: selectedRole } });
          } else {
            navigate("/userregistration", { state: { email, role: selectedRole } });
          }
        } else {
          alert(data.message || "Something went wrong!");
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* Close (Cross) Button */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            onClick={() => navigate(-1)}
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold mb-2 text-gray-900">Select Your Role</h2>
          <p className="text-sm text-gray-500 mb-6">Email: {email}</p>

          <div className="flex flex-col gap-4">
            {roles.map((role) => (
              <div
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`cursor-pointer rounded-xl border-2 flex items-center gap-4 p-4 transition-all duration-200 ${
                  selectedRole === role.value
                    ? "border-gray-500 bg-gray-100 shadow-sm"
                    : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <div className="text-gray-600">{role.icon}</div>
                <span className="text-lg font-semibold text-gray-800">{role.name}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedRole}
            className={`mt-8 w-full py-3 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
              selectedRole
                ? "bg-gray-700 hover:bg-gray-800"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Confirm Role
          </button>

          <div className="mt-4 flex justify-center gap-2">
            <span className={`dot ${selectedRole === "user" ? "active" : ""}`} />
            <span className={`dot ${selectedRole === "shopkeeper" ? "active" : ""}`} />
            <span className={`dot ${selectedRole === "tailor" ? "active" : ""}`} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Roll;
