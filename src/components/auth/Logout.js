import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { LuCheckCircle } from 'react-icons/lu';

export const Logout = () => {
    const navigate = useNavigate();
    const hasLoggedOut = useRef(false);

    useEffect(() => {
        const handleLogout = async () => {
            if (hasLoggedOut.current) return; // Prevent double invocation
            hasLoggedOut.current = true;
            try {
                await axiosInstance.post('/api/auth/logout');
                localStorage.removeItem("token");
                console.log("User logged out!");
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };
        handleLogout();
    }, []);

    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                    <div className="card">
                        <div className="card-body">
                            <LuCheckCircle style={{ width: "80px", height: "80px", color: "green" }} className='mx-auto mb-6' />
                            {/* <h1>See You Again!</h1> */}
                            <div className="app-brand justify-content-center">
                                <div className="app-brand-link gap-2">
                                    <span className="app-brand-logo demo">
                                    </span>
                                    <span className="app-brand-text text-body fw-bolder"><h1>See You Again!</h1></span>
                                </div>
                            </div>
                            <p>Thank you for visiting. We hope to see you soon!</p>
                            <div className="mb-3">
                                <button className="btn btn-primary d-grid w-100" onClick={() => navigate("/login")}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../api/axiosInstance';
// import { LuCheckCircle } from 'react-icons/lu';

// export const Logout = () => {
//     const navigate = useNavigate();
//     const hasLoggedOut = useRef(false);

//     useEffect(() => {
//         const handleLogout = async () => {
//             if (hasLoggedOut.current) return; // Prevent double invocation
//             hasLoggedOut.current = true;
//             try {
//                 await axiosInstance.post('/api/auth/logout');
//                 localStorage.removeItem("token");
//                 console.log("User logged out!");
//             } catch (error) {
//                 console.error('Error logging out:', error);
//             }
//         };
//         handleLogout();
//     }, []);

//     return (
//         <div className="container-xxl">
//             <div className="authentication-wrapper authentication-basic container-p-y">
//                 <div className="authentication-inner">
//                     <div className="card text-center p-4">
//                         <div className="card-body">
//                             <LuCheckCircle style={{width:"80px" , height:"80px" , color:"green"}} className='mx-auto mb-6'/>
//                             <div className="app-brand justify-content-center">
//                                 <a href="index.html" className="app-brand-link gap-2">
//                                     <span className="app-brand-logo demo">
//                                     </span>
//                                     <span className="app-brand-text text-body fw-bolder"><h1>See You Again!</h1></span>
//                                 </a>
//                             </div>
//                             <p>Thank you for visiting. We hope to see you soon!</p>
//                             <div className="mb-3">
//                                 <button className="btn btn-primary d-grid w-100" onClick={() => navigate("/login")}>Login</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


