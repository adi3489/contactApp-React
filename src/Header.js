import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { useState, useEffect } from "react";
//if we are using any inbuilt function coming from any library
//then we need follow one rule .
// the rule is,never use that inbuilt function inside a user defined dunction
//in component we can use this

export const Header = () => {
  const [inputBoxData, setInputBoxData] = useState("");

  const [filteredContactsData, setFilteredContactsData] = useState([]);

  const [contactsData, setContactsData] = useState([]);
  const navigate = useNavigate();
  function addTheContact() {
    //navigate to the path/add from /home
    //if we want to navigate from one path to another path,then we need to use
    //one function useNavigate().
    navigate("/add");
    //useNavigate("/add")
  }
  useEffect(function () {
    db.collection("contact-collection")
      .orderBy("contactName", "desc") //not working
      .onSnapshot(function (snapshot) {
        //snapshot = [doc1,doc2,doc3]

        setContactsData(
          snapshot.docs.map(function (i) {
            console.log({ docId: i.id, docData: i.data() });
            return { docId: i.id, docData: i.data() };
          })
        );
      });
  }, []);

  function collectTheData(event) {
    setFilteredContactsData(
      contactsData.filter(function (i) {
        if (
          i.docData.contactName
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        ) {
          console.log(i.docData);
          return i.docData;
        }
      })
    );
  }

  function deleteTheData(recievedDocId) {
    // console.log("Hi");
    //Logic to delete the data(document) ==> docId
    // console.log(recievedDocId);
    db.collection("contact-collection").doc(recievedDocId).delete();
    alert("Requested contact data is deleted sucessfully");
  }

  return (
    <div>
      <div className="raw">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="search for a contact..."
            onChange={collectTheData}
          />
        </div>
      </div>
      <button class="btn btn-success" onClick={addTheContact}>
        Add contact
      </button>
      {/* when ever we clicked on Add contact button,i should be navigated to /add
(AddContactForm component will be called and the form will be displayed) */}
      {filteredContactsData.length == 0 ? (
        <div>
          {" "}
          {contactsData.map(function (i) {
            return (
              <div>
                {/* <h2>{i.docData.contactName}</h2>
                <h3>{i.docData.contactNumber}</h3>
                <h3>{i.docData.contactEmail}</h3>
                <button
                  className="btn btn-danger"
                  onClick={function () {
                    deleteTheData(i.docId);
                  }}
                >
                  Delete
                </button> */}
                <div
                  class="card"
                  style={{ width: "18rem", marginBottom: "10px" }}
                >
                  <div class="card-body">
                    <h5 class="card-title">{i.docData.contactName}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                      {i.docData.contactNumber}
                    </h6>
                    <p class="card-text">{i.docData.contactEmail}</p>
                    <button
                      className="btn btn-danger"
                      onClick={function () {
                        deleteTheData(i.docId);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {" "}
          {filteredContactsData.map(function (i) {
            return (
              <div>
                <h2>{i.docData.contactName}</h2>
                <h3>{i.docData.contactNumber}</h3>
                <h3>{i.docDatacontactEmail}</h3>
                <button
                  className="btn btn-danger"
                  onClick={function () {
                    deleteTheData(i.docId);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
//Whenever we call a function by passing an argumenet,that function will be automatically called
