import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance';
import { useParams } from 'react-router-dom';

export const Audits = () => {
    const [user, setUser] = useState([]);
    const taskId = useParams().id;

    useEffect(() => {
        const fetchAudits = async () => {

            const response = await axiosInstance.get(`/audit/task?from=0&userTaskKey=${taskId}`);
            console.log("fetching audits", response.data);
            setUser(response.data);
        }

    fetchAudits();
}, []);

const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return " - "; 
    const date = new Date(dateTimeStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

return (
    <div className="card-datatable table-responsive">
        <div
            id="DataTables_Table_0_wrapper"
            className="dataTables_wrapper dt-bootstrap5 no-footer">
            <div className="table-responsive">
                <table class="dt-route-vehicles table dataTable no-footer dtr-column">
                    <thead class="border-top">
                        <tr>
                            <th>Name</th>
                            <th>Created</th>
                            <th>Ended</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((data, index) =>{
                                return(
                                    <tr>
                                        <td>{data.auditName}</td>
                                        <td>{formatDate(data.createDate)}</td>
                                        <td>-</td>
                                        <td>{data.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>


)
}
