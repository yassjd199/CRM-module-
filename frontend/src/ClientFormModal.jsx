import React, { useState } from "react";
import "./ClientFormModal.css";

const ClientFormModal = ({ onClose, onAddClient, onTryTemplate }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setFileUrl(URL.createObjectURL(droppedFile));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("http://localhost:3000/client", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to add client");
      onAddClient(); // Refresh the client list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const handlePreview = () => {
    if (fileUrl) {
      const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${fileUrl}&embedded=true`;
      window.open(googleDocsViewerUrl, "_blank");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="container">
          <div className="left-side">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Prenom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <button type="submit">Appliquer</button>
              <br />
              <button
                type="button"
                className="template-button"
                onClick={() => {
                  onTryTemplate();
                  onClose();
                }}
              >
                Essayer notre template
              </button>
            </form>
          </div>
          <div className="right-side">
            <div
              className="upload-area"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="upload-icon">&#8593;</div>
              <p>Televerser le document</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                hidden
                id="file-upload"
              />
              <label htmlFor="file-upload">Choose File</label>
              {file && (
                <button
                  type="button"
                  className="preview-button"
                  onClick={handlePreview}
                >
                  Preview Document
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFormModal;
