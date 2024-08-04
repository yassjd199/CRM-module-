// import React, { useState } from "react";
// import "./createContract.css";

// const ContractCreation = () => {
//   const [contractDetails, setContractDetails] = useState({
//     objet: "",
//     date: "",
//     ville: "",
//     nomDuClient: "",
//     sujet: "",
//     adresseMail: "",
//     numDeTel: "",
//     codeFiscal: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setContractDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/contract", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(contractDetails),
//       });
//       if (!response.ok) throw new Error("Failed to create contract");
//       // Handle successful contract creation (e.g., show a success message, reset form)
//     } catch (error) {
//       console.error("Error creating contract:", error);
//     }
//   };

//   return (
//     <div className="contract-creation-container">
//       <form onSubmit={handleSubmit} className="contract-form">
//         <div className="form-section">
//           <h2>DETAILS DE BASE</h2>
//           <label>
//             Objet:
//             <input
//               type="text"
//               name="objet"
//               value={contractDetails.objet}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Date:
//             <input
//               type="date"
//               name="date"
//               value={contractDetails.date}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Ville:
//             <input
//               type="text"
//               name="ville"
//               value={contractDetails.ville}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Nom Du Client:
//             <input
//               type="text"
//               name="nomDuClient"
//               value={contractDetails.nomDuClient}
//               onChange={handleChange}
//             />
//           </label>
//           <button type="submit">Appliquer</button>
//         </div>

//         <div className="form-section">
//           <h2>SUJET</h2>
//           <label>
//             Sujet:
//             <textarea
//               name="sujet"
//               value={contractDetails.sujet}
//               onChange={handleChange}
//             />
//           </label>
//           <button type="submit">Appliquer</button>
//         </div>

//         <div className="form-section">
//           <h2>FOOTER</h2>
//           <label>
//             Adresse Mail:
//             <input
//               type="email"
//               name="adresseMail"
//               value={contractDetails.adresseMail}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Num de Tel:
//             <input
//               type="text"
//               name="numDeTel"
//               value={contractDetails.numDeTel}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Code Fiscal:
//             <input
//               type="text"
//               name="codeFiscal"
//               value={contractDetails.codeFiscal}
//               onChange={handleChange}
//             />
//           </label>
//           <button type="submit">Appliquer</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContractCreation;
import React, { useState } from "react";
import "./createContract.css";

const ContractCreation = () => {
  const [contractDetails, setContractDetails] = useState({
    objet: "",
    date: "",
    ville: "",
    nomDuClient: "",
    prenomDuClient: "",
    sujet: "",
    adresseMail: "",
    numDeTel: "",
    codeFiscal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractDetails),
      });
      if (!response.ok) throw new Error("Failed to create contract");
      // Handle successful contract creation (e.g., show a success message, reset form)
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };

  return (
    <div className="contract-creation-container">
      <form onSubmit={handleSubmit} className="contract-form">
        <div className="form-section">
          <h2>DONNÉES DE BASE</h2>
          <label>
            Objet:
            <input
              type="text"
              name="objet"
              value={contractDetails.objet}
              onChange={handleChange}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={contractDetails.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Ville:
            <input
              type="text"
              name="ville"
              value={contractDetails.ville}
              onChange={handleChange}
            />
          </label>
          <label>
            Nom du Client:
            <input
              type="text"
              name="nomDuClient"
              value={contractDetails.nomDuClient}
              onChange={handleChange}
            />
          </label>
          <label>
            Prénom du Client:
            <input
              type="text"
              name="prenomDuClient"
              value={contractDetails.prenomDuClient}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-section">
          <h2>SUJET</h2>
          <label>
            Sujet:
            <textarea
              name="sujet"
              value={contractDetails.sujet}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-section">
          <h2>FOOTER</h2>
          <label>
            Adresse Mail:
            <input
              type="email"
              name="adresseMail"
              value={contractDetails.adresseMail}
              onChange={handleChange}
            />
          </label>
          <label>
            Numéro de Tel:
            <input
              type="text"
              name="numDeTel"
              value={contractDetails.numDeTel}
              onChange={handleChange}
            />
          </label>
          <label>
            Code Fiscal:
            <input
              type="text"
              name="codeFiscal"
              value={contractDetails.codeFiscal}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Appliquer</button>
      </form>
    </div>
  );
};

export default ContractCreation;
