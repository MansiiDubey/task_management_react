import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { getUsername } from '../PrivateRoute';
import axiosInstance from '../../api/axiosInstance';
export const NavbarUp = () => {


    var username = getUsername();

    const generateAvatarUrl = (userName) => {
        const formattedUserName = userName?.replace(/\s+/g, '+');
        return `https://ui-avatars.com/api/?name=${formattedUserName}&background=random&rounded=true&size=100`;
    };


    return (
        <Navbar expand="xl" variant="dark" bg="navbar-theme" className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a className="nav-item nav-link px-0 me-xl-4" href="">
                <i className="bx bx-menu bx-sm"></i>
            </a>
        </div>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
            <Nav className="navbar-nav-right d-flex align-items-center">
                <div className="navbar-nav align-items-center">
                    <div className="nav-item d-flex align-items-center">
                        {/* <FontAwesomeIcon icon={faSearch} className="fs-4 lh-0" />
                        <input
                            type="text"
                            className="form-control border-0 shadow-none ps-1 ps-sm-2"
                            placeholder="Search..."
                            aria-label="Search..."
                        /> */}
                        <i className="bx bx-search"></i>
                        <input type="text" className="form-control border-0 shadow-none ps-1 ps-sm-2" placeholder="Search..." aria-label="Search..." />
                    </div>
                </div>
                <Nav className="navbar-nav flex-row align-items-center ms-auto">
                    <Nav.Item className="nav-item lh-1 me-3"><span></span></Nav.Item>
                    <Nav.Item className="nav-item navbar-dropdown dropdown-user dropdown">
                        <Dropdown>
                            <Dropdown.Toggle as={Nav.Link} className="hide-arrow">
                                <div className="avatar avatar-online">
                                <img className="h-10 w-10 rounded-full border border-gray-700 bg-gray-700" src={generateAvatarUrl(username)} />
                                 {/* <img src="../assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" /> */} 
                                    </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end">
                                <Dropdown.Item>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                            <img className="h-10 w-10 rounded-full border border-gray-700 bg-gray-700" src={generateAvatarUrl(username)} />
                                             {/* <img src="../assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" /> */}
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            {/* <span className="fw-medium d-block"></span> */}
                                            <h5>
                                                <div className="text-muted">{username}</div>
                                            </h5> 
                                        </div>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to="/user-detail"><i className="bx bx-user me-2"></i><span className="align-middle">Profile</span></Dropdown.Item>
                                {/* <Dropdown.Item as={Link} to="/updateprofile"><i className="bx bx-cog me-2"></i><span className="align-middle">Update Profile</span></Dropdown.Item> */}
                                {/* <Dropdown.Item as={Link} to="/updateprofile2"><i className="flex-shrink-0 bx bx-credit-card me-2"></i><span className="flex-grow-1 align-middle ms-1">UpdateProfile2</span><span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span></Dropdown.Item>
                                <Dropdown.Divider /> */}
                                <Dropdown.Item as={Link} to="/logout"><i className="bx bx-power-off me-2"></i><span className="align-middle">Log Out</span></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Item>
                </Nav>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}
