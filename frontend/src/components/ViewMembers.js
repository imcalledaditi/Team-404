import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/members/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/members/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this member?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/members/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Member deleted.');
        setMembers(prev => prev.filter(member => member._id !== id));
      } else {
        alert('Failed to delete.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="view-container">
      <h2 className="section-title">👥 Team Members</h2>
      
      <input
        type="text"
        className="search-input"
        placeholder="Search by name or role..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filteredMembers.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No team members found.</p>
      ) : (
        <div className="member-grid">
          {filteredMembers.map(member => (
            <div key={member._id} className="member-card">
              <img
                src={`http://localhost:5000/uploads/${member.profileImage}`}
                alt={member.name}
                className="member-img"
              />
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="meta">{member.degree} - {member.year}</p>

              <div className="card-buttons">
                <button className="edit-btn" onClick={() => handleView(member._id)}>👁 View</button>
                <button className="edit-btn" onClick={() => handleEdit(member._id)}>✏ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(member._id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMembers;
