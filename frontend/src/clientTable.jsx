import React, { useEffect, useState } from "react";
import "./clientTable.css";
import ClientFormModal from "./ClientFormModal";

const ClientTable = ({ onTryTemplate }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [clients, searchTerm, sortOption, dateRange]);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3000/clients");

      if (!response.ok) throw new Error("Failed to fetch clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = clients;

    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          client.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((client) => {
        const contractDate = new Date(client.date);
        return (
          contractDate >= new Date(dateRange.start) &&
          contractDate <= new Date(dateRange.end)
        );
      });
    }

    switch (sortOption) {
      case "nameAsc":
        filtered = filtered.sort(
          (a, b) =>
            a.last_name.localeCompare(b.last_name) ||
            a.first_name.localeCompare(b.first_name)
        );
        break;
      case "nameDesc":
        filtered = filtered.sort(
          (a, b) =>
            b.last_name.localeCompare(a.last_name) ||
            b.first_name.localeCompare(a.first_name)
        );
        break;
      case "dateAsc":
        filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "dateDesc":
        filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }

    setFilteredClients(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/client/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete client");
      fetchClients(); // Update the client list after deletion
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const previewContract = (fileUrl) => {
    const googleViewerUrl = `https://docs.google.com/viewer?url=http://localhost:3000/uploads/${fileUrl}&embedded=true`;
    window.open(googleViewerUrl, "_blank");
  };

  return (
    <div className="client-table-container">
      <header className="client-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />
        </div>
        <div className="actions-container">
          <button className="add-client-btn" onClick={() => setShowModal(true)}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 7.5V28.5"
                stroke="#E8E8E8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 18H28"
                stroke="#E8E8E8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className="filter-btn"
            onClick={() =>
              document
                .querySelector(".filter-dropdown")
                .classList.toggle("show")
            }
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.5 32.5588C38.5 32.9068 38.3617 33.2407 38.1156 33.4868C37.8694 33.733 37.5356 33.8713 37.1875 33.8713H28.2625C27.9702 34.9613 27.3264 35.9244 26.431 36.6113C25.5356 37.2983 24.4385 37.6706 23.31 37.6706C22.1814 37.6706 21.0844 37.2983 20.189 36.6113C19.2936 35.9244 18.6498 34.9613 18.3575 33.8713H4.8125C4.4644 33.8713 4.13056 33.733 3.88442 33.4868C3.63828 33.2407 3.5 32.9068 3.5 32.5588C3.5 32.2107 3.63828 31.8768 3.88442 31.6307C4.13056 31.3845 4.4644 31.2463 4.8125 31.2463H18.3575C18.6498 30.1562 19.2936 29.1931 20.189 28.5062C21.0844 27.8192 22.1814 27.4469 23.31 27.4469C24.4385 27.4469 25.5356 27.8192 26.431 28.5062C27.3264 29.1931 27.9702 30.1562 28.2625 31.2463H37.1875C37.5356 31.2463 37.8694 31.3845 38.1156 31.6307C38.3617 31.8768 38.5 32.2107 38.5 32.5588ZM38.5 9.44125C38.5 9.78935 38.3617 10.1232 38.1156 10.3693C37.8694 10.6155 37.5356 10.7538 37.1875 10.7538H32.9C32.6077 11.8438 31.9639 12.8069 31.0685 13.4938C30.1731 14.1808 29.076 14.5531 27.9475 14.5531C26.8189 14.5531 25.7219 14.1808 24.8265 13.4938C23.9311 12.8069 23.2873 11.8438 22.995 10.7538H4.8125C4.64014 10.7538 4.46947 10.7198 4.31023 10.6538C4.15099 10.5879 4.0063 10.4912 3.88442 10.3693C3.76255 10.2475 3.66587 10.1028 3.59991 9.94352C3.53395 9.78428 3.5 9.61361 3.5 9.44125C3.5 9.26889 3.53395 9.09822 3.59991 8.93898C3.66587 8.77974 3.76255 8.63505 3.88442 8.51317C4.0063 8.3913 4.15099 8.29462 4.31023 8.22866C4.46947 8.1627 4.64014 8.12875 4.8125 8.12875H22.995C23.2873 7.03876 23.9311 6.07561 24.8265 5.38866C25.7219 4.70171 26.8189 4.32944 27.9475 4.32944C29.076 4.32944 30.1731 4.70171 31.0685 5.38866C31.9639 6.07561 32.6077 7.03876 32.9 8.12875H37.1875C37.5356 8.12875 37.8694 8.26703 38.1156 8.51317C38.3617 8.75931 38.5 9.09315 38.5 9.44125Z"
                fill="#E8E8E8"
              />
            </svg>
          </button>
          <div className="filter-dropdown">
            <div className="components">
              <div className="filter-option">
                <button onClick={() => setSortOption("nameAsc")}>
                  Name (A-Z)
                </button>
              </div>
              <div className="filter-option">
                <button onClick={() => setSortOption("nameDesc")}>
                  Name (Z-A)
                </button>
              </div>
              <div className="filter-option">
                <button onClick={() => setSortOption("dateAsc")}>
                  Date (Asc)
                </button>
              </div>
              <div className="filter-option">
                <button onClick={() => setSortOption("dateDesc")}>
                  Date (Desc)
                </button>
              </div>
            </div>
            <div className="filter-option">
              <label htmlFor="start-date">Start Date</label>
              <input
                type="date"
                id="start-date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
              />
              <label htmlFor="end-date">End Date</label>
              <input
                type="date"
                id="end-date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </header>
      {loading ? (
        <p>Loading clients...</p>
      ) : (
        <div class="table-container">
          <table className="client-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contract Date</th>
                <th>Contract Preview</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.first_name}</td>
                  <td>{client.last_name}</td>
                  <td>{new Date(client.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => previewContract(client.contractFile)}
                    >
                      Preview
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(client.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <ClientFormModal
          onClose={() => setShowModal(false)}
          onTryTemplate={onTryTemplate}
        />
      )}
    </div>
  );
};

export default ClientTable;
