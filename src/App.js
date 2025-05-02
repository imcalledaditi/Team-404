import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddMember from "./components/AddMember";
import ViewMembers from "./components/ViewMembers";
import EditMember from "./components/EditMember"; // Make sure this matches the actual filename
import Navbar from "./components/Navbar"; 
import MemberDetails from "./components/MemberDetails";
import "./styles/styles.css"; 

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMember />} />
          <Route path="/view" element={<ViewMembers />} />
          <Route path="/edit/:id" element={<EditMember />} /> {/* ✅ Add this */}
          <Route path="/member/:id" element={<MemberDetails />} /> {/* ✅ Add this */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
