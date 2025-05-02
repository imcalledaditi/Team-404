import React, { useState } from "react";
import "../styles/styles.css";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    year: "",
    degree: "",
    role: "",
    project: "",
    hobby: "",
    certification: "",
    internship: "",
    aim: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append("profileImage", imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/members", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        alert("Member added!");
        window.location.href = "/view";
      } else {
        alert("Failed to add member.");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding member.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Member ✨</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
          <input name="rollNumber" placeholder="Roll Number" onChange={handleChange} required />
          <input name="year" placeholder="Year" onChange={handleChange} />
          <input name="degree" placeholder="Degree" onChange={handleChange} />
          <input name="role" placeholder="Team Role" onChange={handleChange} />
        </div>

        <textarea
          name="project"
          placeholder="Project Description"
          onChange={handleChange}
        ></textarea>

        <input
          name="hobby"
          placeholder="Hobbies"
          onChange={handleChange}
        />
        <input
          name="certification"
          placeholder="Certifications"
          onChange={handleChange}
        />
        <input
          name="internship"
          placeholder="Internship"
          onChange={handleChange}
        />
        <textarea
          name="aim"
          placeholder="Aim in Life"
          onChange={handleChange}
        ></textarea>

        <label className="upload-label">
          Upload Profile Picture
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </label>

        {previewUrl && (
          <div className="image-preview">
            <p>Preview:</p>
            <img src={previewUrl} alt="Preview" />
          </div>
        )}

        <button type="submit" className="submit-btn">✔ Add Member</button>
      </form>
    </div>
  );
};

export default AddMember;
