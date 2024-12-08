import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CapsuleForm from "./CapsuleFormGroup"; // Ensure correct import path

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [memberRoles, setMemberRoles] = useState({});
  const [openCapsuleForm, setOpenCapsuleForm] = useState(false);
  const [capsuleFormData, setCapsuleFormData] = useState({
    title: "",
    content: "",
    media: "",
    unlockDate: "",
    tags: "",
    isGroupCapsule: true,
    group: "",
  });
  const [groupCapsules, setGroupCapsules] = useState([]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzU0YzYzNThkY2IyOGE5NjI4NmJhYTkiLCJ1c2VybmFtZSI6ImFuYXMiLCJyb2xlIjoiVXNlciIsImlhdCI6MTczMzY3MjUwNiwiZXhwIjoxNzMzNjc2MTA2fQ.ZO1G6rN1OLSi7vvtQIdDrQmqetM00f7Ur6_JQWokC6I";

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3000/auth/user-groups", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setGroups(data.groups);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  const handleOpen = async (group) => {
    setCurrentGroup(group);
    const rolesMap = {};
    group.members.forEach((member) => {
      const role = group.roles.find((r) => r.user === member._id)?.role || "Member";
      rolesMap[member._id] = role;
    });
    setMemberRoles(rolesMap);
    if (token) {
      try {
        const response = await fetch(`http://localhost:3000/api/capsules?group=${group._id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setGroupCapsules(data.capsules || []);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Error fetching capsules.");
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMemberRoles({});
    setGroupCapsules([]);
  };

  const handleRoleChange = (memberId, role) => {
    setMemberRoles((prevRoles) => ({
      ...prevRoles,
      [memberId]: role,
    }));
  };

  const saveRoles = async () => {
    if (token && currentGroup) {
      const rolesArray = Object.entries(memberRoles).map(([userId, role]) => ({
        user: userId,
        role,
      }));
      try {
        const response = await fetch(`http://localhost:3000/auth/groups/${currentGroup._id}/roles`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roles: rolesArray }),
        });
        const data = await response.json();
        if (data.success) {
          alert("Roles updated successfully!");
          handleClose();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Error updating roles. Please try again.");
      }
    }
  };

  const handleOpenCapsuleForm = () => {
    if (currentGroup) {
      setCapsuleFormData((prev) => ({
        ...prev,
        group: currentGroup._id,
        isGroupCapsule: true,
      }));
      setOpenCapsuleForm(true);
    } else {
      alert("Please select a group.");
    }
  };

  const handleCloseCapsuleForm = () => {
    setOpenCapsuleForm(false);
  };

  const handleCapsuleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/capsules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(capsuleFormData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setOpenCapsuleForm(false);
        handleOpen(currentGroup);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error creating capsule');
    }
  };

  return (
    <Box className="dashboard" sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Groups
      </Typography>
      <Box className="dashboard-content">
        {groups.length > 0 ? (
          <List>
            {groups.map((group) => (
              <ListItem button key={group._id} onClick={() => handleOpen(group)}>
                <ListItemAvatar>
                  <Avatar>{group.name.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={group.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No groups yet.</Typography>
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            p: 4,
          }}
        >
          {currentGroup && (
            <>
              <Typography variant="h5" component="h2">
                {currentGroup.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Members:
              </Typography>
              <List>
                {currentGroup.members.map((member) => (
                  <ListItem key={member._id}>
                    <ListItemText primary={member.username} />
                    <FormControl sx={{ minWidth: 120 }}>
                      <InputLabel id={`role-label-${member._id}`}>Role</InputLabel>
                      <Select
                        labelId={`role-label-${member._id}`}
                        value={memberRoles[member._id] || "Member"}
                        onChange={(e) => handleRoleChange(member._id, e.target.value)}
                      >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Member">Member</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                onClick={saveRoles}
                disabled={!currentGroup.members.length}
              >
                Save Roles
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenCapsuleForm}
                sx={{ mt: 2 }}
              >
                Create Group Capsule
              </Button>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Capsules:
              </Typography>
              <List>
                {groupCapsules.length > 0 ? (
                  groupCapsules.map((capsule) => (
                    <ListItem key={capsule._id}>
                      <ListItemText
                        primary={capsule.title}
                        secondary={new Date(capsule.unlockDate).toLocaleString()}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body1">No capsules yet.</Typography>
                )}
              </List>
            </>
          )}
        </Box>
      </Modal>

      {openCapsuleForm && (
        <CapsuleForm
          formData={capsuleFormData}
          setFormData={setCapsuleFormData}
          handleSubmit={handleCapsuleSubmit}
          toggleForm={handleCloseCapsuleForm}
          group={currentGroup._id}
        />
      )}
    </Box>
  );
};

export default Dashboard;
