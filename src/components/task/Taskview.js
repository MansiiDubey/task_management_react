import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Form } from '@formio/react';
import JsonFile from '../json/startProcess.json';
import '../../assets/css/formio.css';
import { Comments } from '../common/Comments';
import { Audits } from '../common/Audits';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';

export const Taskview = () => {
    const [activeTab, setActiveTab] = useState('form');
    const taskId = useParams().id;

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/user-task?from=0&taskKey=${taskId}`);
            console.log("fetching data", response.data);
            console.log("TASK NAME", response.data[0].taskId);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formHandleSubmit = async (submission) => {
        try {
            console.log("Submission data:", submission.data);
            const response = await axiosInstance.post("/process/start?processDefinitionId=process_incident_management", submission.data);
            console.log("Submitted data:", response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-2xl text-semibold mb-4">Task View</h3>
                <Link to={-1}>
                    <Button className="d-flex align-items-center">
                        <BsArrowLeftCircleFill className="me-2" />
                        Back to List
                    </Button>
                </Link>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ul className="nav nav-pills flex-column flex-md-row mb-3">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'form' ? 'active' : ''}`}
                                onClick={() => handleTabClick('form')}
                            >
                                <i className="bx bx-user me-1" /> Form
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'comments' ? 'active' : ''}`}
                                onClick={() => handleTabClick('comments')}
                            >
                                <i className="bx bx-bell me-1" /> Comments
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'diagram' ? 'active' : ''}`}
                                onClick={() => handleTabClick('diagram')}
                            >
                                <i className="bx bx-bell me-1" /> Diagram
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
                                onClick={() => handleTabClick('documents')}
                            >
                                <i className="bx bx-bell me-1" /> Documents
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'audits' ? 'active' : ''}`}
                                onClick={() => handleTabClick('audits')}
                            >
                                <i className="bx bx-bell me-1" /> Audits
                            </button>
                        </li>
                    </ul>
                    <div className="card mb-4">
                        {activeTab === 'form' && (
                            <div className="card-body">
                                <h3 className="card-header">Form</h3>
                                <Form
                                    className='form-container'
                                    form={JsonFile}
                                    onSubmit={formHandleSubmit}
                                />lllll
                            </div>
                        )}
                        {activeTab === 'comments' && (
                            <div className="card-body">
                                <h3 className="card-header">Comments</h3>
                                <Comments />
                            </div>
                        )}
                        {activeTab === 'diagram' && (
                            <div className="card-body">
                                <h5 className="card-header">Diagram</h5>
                                <p>This is the diagram tab content.</p>
                            </div>
                        )}
                        {activeTab === 'documents' && (
                            <div className="card-body">
                                <h5 className="card-header">Documents</h5>
                                <p>This is the documents tab content.</p>
                            </div>
                        )}
                        {activeTab === 'audits' && (
                            <div className="card-body">
                                <h3 className="card-header">Audits</h3>
                                <Audits />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
