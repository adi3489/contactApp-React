//Add contact form execute when /add==> navigation(Routing)==>if we want to
//implement navigation in our react application then we need to use one library
//(external library)
//Navigation should be implemented in parent component

//How can we extract the data present in the input box that keeps changing

//if we want to store the data associated with our react application then we need to
//use one in-built function useState()[2 element] 1is variable 2isfunction name

import { useState } from "react";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

function AddContactForm() {
  const navigate = useNavigate();
  const [contactName, setContactName] = useState("");
  //contactName = "Raju"
  const [contactNumber, setContactNumber] = useState("");

  const [contactEmail, setContactEmail] = useState("");

  function collectContactName(event) {
    setContactName(event.target.value);
  }
  function collectContactNumber(event) {
    setContactNumber(event.target.value);
  }
  function collectContactEmail(event) {
    setContactEmail(event.target.value);
  }
  function saveTheContact() {
    // console.log(contactName);
    // console.log(contactNumber);
    // console.log(contactEmail);
    //store in firebase
    db.collection("contact-collection").add({
      contactName,
      contactEmail,
      contactNumber,
    });
    //navigate to home page
    navigate("/home");
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Enter contact name..."
        onChange={collectContactName}
      />
      <input
        type="text"
        placeholder="Enter contact number..."
        onChange={collectContactNumber}
      />
      <input
        type="email"
        placeholder="Enter contact email..."
        onChange={collectContactEmail}
      />

      <button onClick={saveTheContact}>Save contact</button>
    </div>
  );
}

export default AddContactForm;
