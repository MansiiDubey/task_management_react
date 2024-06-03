import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Registration } from './components/auth/Registration';
import { Login } from './components/auth/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { Dashboard } from './components/dashboard/Dashboard';
import { Task } from './components/task/Task';
import { UserProfile } from './components/user/UserProfile';
import { Main } from './components/Main';



function App() {

  return (
    <div className="App">

      <Helmet>
        <link rel="icon" type="image/x-icon" href="../assets/img/favicon/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="../assets/vendor/fonts/boxicons.css" />
        <link rel="stylesheet" href="../assets/vendor/css/core.css" className="template-customizer-core-css" />
        <link rel="stylesheet" href="../assets/vendor/css/theme-default.css" className="template-customizer-theme-css" />
        <link rel="stylesheet" href="../assets/css/demo.css" />
        <link rel="stylesheet" href="../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
        <link rel="stylesheet" href="../assets/vendor/css/pages/page-auth.css" />
        <link rel="icon" type="image/x-icon" href="../assets/img/favicon/favicon.ico" />
        <link rel="stylesheet" href="../assets/vendor/css/core.css" class="template-customizer-core-css" />
        <link rel="stylesheet" href="../assets/vendor/css/theme-default.css" class="template-customizer-theme-css" />
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"/>
<link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css"/>
<script src="https://cdn.form.io/formiojs/formio.full.min.js"></script> */}

      </Helmet>

      <Routes>
        <Route path='/sign-up' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Main />} />

        {/* <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/task/:id' element={<PrivateRoute><Task /></PrivateRoute>} />
        <Route path='/userprofile' element={<PrivateRoute><UserProfile /></PrivateRoute>} /> */}
      </Routes>
    </div>
  );
}

export default App;
