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

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [capsuleContent, setCapsuleContent] = useState("");
  const [memberRoles, setMemberRoles] = useState({});
  
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzU0YzYzNThkY2IyOGE5NjI4NmJhYTkiLCJ1c2VybmFtZSI6ImFuYXMiLCJyb2xlIjoiVXNlciIsImlhdCI6MTczMzY1MTIxNSwiZXhwIjoxNzMzNjU0ODE1fQ.cCIVNEPfhQWo7qDU0Njek3CPJqDWc-ufDBovefKRXoA";

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
  }, []);

  const handleOpen = (group) => {
    setCurrentGroup(group);
    // Create a roles map for the modal
    const rolesMap = {};
    group.members.forEach((member) => {
      const role = group.roles.find((r) => r.user === member._id)?.role || "Member";
      rolesMap[member._id] = role;
    });
    setMemberRoles(rolesMap);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMemberRoles({});
  };

  const handleRoleChange = (memberId, role) => {
    setMemberRoles((prevRoles) => ({
      ...prevRoles,
      [memberId]: role,
    }));
  };

  const saveRoles = async () => {
   
    if (token && currentGroup) {
      console.log(token);
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
                        onChange={(e) =>
                          handleRoleChange(member._id, e.target.value)
                        }
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
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
