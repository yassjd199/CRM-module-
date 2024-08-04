import React, { useState } from "react";
import ClientTable from "./clientTable"; // Ensure this path is correct
import ContractCreation from "./createContract"; // Ensure this path is correct
import "./tabs.css";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs-container">
      <nav className="tabs-nav">
        <button
          className={`tab-button ${activeTab === "clients" ? "active" : ""}`}
          onClick={() => handleTabChange("clients")}
        >
          Clients
        </button>
        <button
          className={`tab-button ${activeTab === "contracts" ? "active" : ""}`}
          onClick={() => handleTabChange("contracts")}
        >
          Create Contract
        </button>
      </nav>
      <div className="tabs-content">
        {activeTab === "clients" && (
          <ClientTable onTryTemplate={() => handleTabChange("contracts")} />
        )}
        {activeTab === "contracts" && <ContractCreation />}
      </div>
    </div>
  );
};

export default Tabs;
