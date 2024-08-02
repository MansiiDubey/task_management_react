import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { Dashboard } from './dashboard/Dashboard'
import { Task } from './task/Task'
import { UserProfile } from './user/UserProfile'
import { Sidebar } from './common/Sidebar'
import { NavbarUp } from './common/NavbarUp'
import { Taskview } from './task/Taskview'
import { UpdateProfile } from './user/UpdateProfile'
import { UserList } from './user/UserList'
import { UpdateRoles } from './user/UpdateRoles'
import { Forms } from './form/Forms'
import { CompletedTask } from './task/CompletedTask'
import { CompletedTaskView } from './task/CompletedTaskView'
import { ProcessTask } from './task/ProcessTask'
import { Roles } from './user/Roles'
import { CreateRoles } from './user/CreateRoles'
import { UserDetails } from './user/UserDetails'
import { CreateUser } from './user/CreateUser'


export const Main = () => {
    return (
        <div lang="en" className="light-style layout-menu-fixed layout-compact" dir="ltr" data-theme="theme-default" data-assets-path="../assets/" data-template="vertical-menu-template-free">    <div className="row">
            <div className="layout-wrapper layout-content-navbar  ">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <NavbarUp />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <Routes>
                                    <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                                    <Route path='/task' element={<PrivateRoute><Task /></PrivateRoute>} />
                                    <Route path='/update-profile/:id' element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
                                    {/* <Route path='/userprofile' element={<PrivateRoute><UserProfile /></PrivateRoute>} /> */}
                                    <Route path='/taskview/:id' element={<PrivateRoute><Taskview /></PrivateRoute>} />
                                    <Route path='/user-list' element={<PrivateRoute><UserList/></PrivateRoute>} />
                                    <Route path='/updateroles/:id' element={<PrivateRoute><UpdateRoles/></PrivateRoute>} />
                                    <Route path='/forms' element={<PrivateRoute><Forms/></PrivateRoute>} />
                                    <Route path='/completedtask' element={<PrivateRoute><CompletedTask/></PrivateRoute>} />
                                    <Route path='/processtask' element={<PrivateRoute><ProcessTask/></PrivateRoute>} />
                                    <Route path='/completedtaskview/:id' element={<PrivateRoute><CompletedTaskView/></PrivateRoute>} />
                                    <Route path='/roles' element={<PrivateRoute><Roles/></PrivateRoute>} />
                                    <Route path='/createroles' element={<PrivateRoute><CreateRoles/></PrivateRoute>} />
                                    <Route path='/user-detail' element={<PrivateRoute><UserDetails/></PrivateRoute>} />
                                    <Route path='/create-user' element={<PrivateRoute><CreateUser/></PrivateRoute>} />
                                  </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
