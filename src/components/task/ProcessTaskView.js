import React, { useEffect, useState } from 'react';
import { Form } from '@formio/react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { fetchCompletedTaskByTaskKey } from '../../services/TaskService';
import axiosInstance from '../../api/axiosInstance';


export const ProcessTaskView = () => {
    const [activeTab, setActiveTab] = useState('form');
    const [formName, setFormName] = useState("");
    const [formJson, setFormJson] = useState(null);
    const taskKey = useParams().id;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processDefKey, setprocessdefkey] = useState();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const formHandleSubmit = (submission) => {
        console.log("Submitted Values:", submission.data);
    };
console.log("taskKey",taskKey)
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/process-instance-variable?processInstanceKey=${taskKey}&from=0`);
            console.log("fetchData response:", response?.data[0]);

            const task = response?.data[0];
            if (!task) {
                throw new Error("No completed task found.");
            }

            const form = task.taskId;
            setFormName(form);

            const json = await import(`/public/json/${form}.json`);
            // public\json\closure.json
            console.log("Fetched  form JSON:", json);

            setFormJson(json.default);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching task details:", error);
            setError("An error occurred while fetching task details.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (

        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="py-3 mb-4">
                <span className="text-muted fw-light"></span> Process Task View
            </h3>
                <Link to={-1}>
                    <Button className="d-flex align-items-center">
                        <BsArrowLeftCircleFill className="me-2" />
                        Back to List
                    </Button>
                </Link>
            </div>
        <div>
            
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
                                <h4>{formName}</h4>
                                {formJson ? (
                                    <Form
                                        className='form-container'
                                        form={formJson}
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
                                <p>This is the comments tab content.</p>
                                Add your comments content here
                            </div>
                        )}
                        {activeTab === 'diagram' && (
                            <div className="card-body">
                                <h5 className="card-header">Diagram</h5>
                                <p>This is the diagram tab content.</p>
                                Add your diagram content here
                            </div>
                        )}
                        {activeTab === 'documents' && (
                            <div className="card-body">
                                <h5 className="card-header">Documents</h5>
                                <p>This is the documents tab content.</p>
                                Add your documents content here
                            </div>
                        )}
                        {activeTab === 'audits' && (
                            <div className="card-body">
                                <h3 className="card-header">Audits</h3>
                                <p>This is the audits tab content.</p>
                                Add your audits content here
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};
