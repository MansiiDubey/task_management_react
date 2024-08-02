import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { getUsername } from "../PrivateRoute";
import { fetchUserById, fetchUserByUsername } from "../../services/UserService";
import { fetchRoleByUserId } from "../../services/RoleService";
import { fetchGroupByUserId } from "../../services/GroupService";

export const UserDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [usersId, setUserId] = useState('');
  const [userRolesAndGroups, setUserRolesAndGroups] = useState([]);

  const username = getUsername();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchUserByUsername(username);
        const user = response;
        setUserId(user?.userId);
        console.log("user", user.userId);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [username]);

  useEffect(() => {
    if (usersId) {
      fetchUserDetails();
    }
  }, [usersId]);

  const fetchUserDetails = async () => {
    try {
      const [userResponse, rolesResponse, groupsResponse] = await Promise.all([
        fetchUserById(usersId),
        fetchRoleByUserId(usersId),
        fetchGroupByUserId(usersId),
      ]);

      setUserData(userResponse);

      const rolesWithType = rolesResponse.map(role => ({
        ...role,
        type: 'role'
      }));

      const groupsWithType = groupsResponse.map(group => ({
        ...group,
        type: 'group'
      }));

      setUserRolesAndGroups([...rolesWithType, ...groupsWithType]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error loading user data: {error}</p>
      </div>
    );
  }

  const roles = userRolesAndGroups
    .filter((item) => item.type === "role")
    .map((role) => role.name)
    .join(", ");

  const groups = userRolesAndGroups
    .filter((item) => item.type === "group")
    .map((group) => group.name)
    .join(", ");

  return (
    <div>
      <h3 className="py-3 mb-4">
        <span className="text-muted fw-light"></span> UserDetails
      </h3>
      <div className="card mb-4">
        <div className="card-body">
          <div className="card-header d-flex align-items-center justify-content-between" style={{ textAlignLast: "left" }}>
            <div>
              <h4 className="card-action-title mb-0">
                {userData.firstName} {userData.lastName}
              </h4>
              <p>{userData.email}</p>
            </div>
            <Link to={`/update-profile/${usersId}`} title="Edit Information">
              <BsPencilSquare className="text-muted" style={{ fontSize: '1.5rem' }} />
            </Link>
          </div>
          <ul className="list-unstyled py-1">
            <li className="d-flex align-items-center mb-4">
              <i className="bx bx-user"></i>
              <span className="fw-medium mx-2">Username:</span>
              <span>{userData.username}</span>
            </li>
            <li className="d-flex align-items-center mb-4">
              <i className="bx bx-building"></i>
              <span className="fw-medium mx-2">Address:</span>
              <span>{userData.address} , {userData.city} , {userData.state}</span>
            </li>
            <li className="d-flex align-items-center mb-4">
              <i className="bx bx-crown"></i>
              <span className="fw-medium mx-2">Roles:</span>
              <span>{roles}</span>
            </li>
            <li className="d-flex align-items-center mb-4">
              <i className="bx bx-star"></i>
              <span className="fw-medium mx-2">Groups:</span>
              <span>{groups}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
