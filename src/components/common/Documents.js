import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaImage } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';

export const Documents = ({ usertask }) => {
    const [data, setData] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/file/api/download/taskKey/${usertask}`);
                console.log("document data", response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [usertask]);

    const toggleDropdown = (index) => {
        setDropdownVisible(dropdownVisible === index ? null : index);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.dropdown-toggle')) {
            setDropdownVisible(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const downloadImage = async (documentId, documentName) => {
        try {
          const response = await axiosInstance.get(`/file/api/download/${documentId}`,
            {
              responseType: "blob",
            }
          );
    
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", documentName);
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error("Error downloading image:", error);
        }
      };


    return (
        <div className="row">
            <div className="col-lg-12 mb-4 mb-md-0" style={{ position: 'relative', zIndex: 800 }}>
                <div className="card">
                    <div className="table-responsive text-nowrap">
                        <table className="table dataTable" style={{ position: 'relative', zIndex: 800 }}>
                            <thead className="border-top">
                                <tr>
                                    <th>Name</th>
                                    <th>Taskname</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((task, index) => (
                                    <tr key={index}>
                                        <td>
                                            <FaImage className="me-2" color="red" />
                                            {task?.name}
                                        </td>
                                        <td>Assignment</td>
                                        <td>
                                            <div className="position-relative">
                                                <BsThreeDotsVertical
                                                    className="btn p-0 dropdown-toggle"
                                                    onClick={() => toggleDropdown(index)}
                                                />
                                                {dropdownVisible === index && (
                                                    <div
                                                        className="dropdown-menu show"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '100%', // Position directly below the three dots
                                                            left: '0',
                                                            zIndex: 1000,
                                                        }}
                                                    >
                                                        <a href="javascript:void(0);" className="dropdown-item">
                                                            View
                                                        </a>
                                                        <div className="dropdown-item" onClick={() => downloadImage(task?.id,task?.name)}>

                                                            Download
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
