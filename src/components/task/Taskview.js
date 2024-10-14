import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from '@formio/react';
import '../../assets/css/formio.css';
import { Comments } from '../common/Comments';
import { Audits } from '../common/Audits';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { fetchUserTaskByTaskKey, fetchFormJsonByTaskName, submitTaskData } from '../../services/TaskService';
import { apiUrl } from '../../api/axiosInstance';
import { Documents } from '../common/Documents';

export const Taskview = () => {
    const [activeTab, setActiveTab] = useState('form');
    const taskId = useParams().id;
    const [formName, setFormName] = useState();
    const [formJson, setFormJson] = useState(null);
    const [variables, setVariables] = useState({});
    const [processKey, setProcessKey] = useState();
    const [userTaskKey, setuserTaskKey] =useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch task data
            const response = await fetchUserTaskByTaskKey(taskId);
            // console.log("response",response.data[0].processInstanceKey)
            const form = response.data[0].taskId;
            console.log("fetching data", response.data[0]);
            setFormName(form);
            const proKey = response.data[0].processInstanceKey;
            console.log("proKey",proKey);
            setProcessKey(proKey);
            const userKey = response.data[0].userTaskKey;
            console.log("userTaskKey",userKey);
            setuserTaskKey(userKey);


            const responseForm = await fetch(`/json/${form}.json`);

            if (!responseForm.ok) {
                throw new Error(
                    `Failed to fetch JSON: ${responseForm.status} ${responseForm.statusText}`
                );
            }

            const json = await responseForm.json();

             // Extract variables and set them in state
             const { variables } = response.data[0];
             setVariables(variables);

            const jsonString = JSON.stringify(json);
            const modifiedJsonString = jsonString.replace(/http:\/\/localhost/g, apiUrl);
            const modifiedJson = JSON.parse(modifiedJsonString);
            
            setFormJson(modifiedJson);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const formHandleSubmit = async (submission) => {
        try {
            console.log("Submission data:", submission.data);
            const response = await submitTaskData(submission.data);
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
                                <h3 className="card-header">{formName?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h3>
                                {formJson ? (
                                    <Form
                                        className='form-container'
                                        form={formJson}
                                        submission={{ data: variables }} // Populate form with variables
                                        onSubmit={formHandleSubmit}
                                    />
                                ) : (
                                    <p>Loading form...</p>
                                )}
                            </div>
                        )}
                        {activeTab === 'comments' && (
                            <div className="card-body">
                                <h3 className="card-header">Comments</h3>
                                <Comments process={processKey}/>
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
                                <h3 className="card-header">Documents</h3>
                                <Documents usertask={userTaskKey}/>
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
