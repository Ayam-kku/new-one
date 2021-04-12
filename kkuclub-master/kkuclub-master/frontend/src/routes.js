import React from 'react';
import { Navigate } from 'react-router-dom';

//admin
import CommitteeView from 'src/adminDashboard/views/committee/CommitteeListView';
import TypesOfEventsView from 'src/adminDashboard/views/TypesOfEvents/TypesOfEventsListView';
import UserView from 'src/adminDashboard/views/user/UserListView';
import CollegeView from 'src/adminDashboard/views/college/CollegeListView';
import DepartmentView from 'src/adminDashboard/views/department/DepartmentListView';
import DashboardAdminLayout from 'src/adminDashboard/layouts/DashboardLayout';
import DashboardView from 'src/adminDashboard/views/reports/DashboardView';
import SettingsView from 'src/adminDashboard/views/settings/SettingsView';





//SAU
import ClubViewSAU from 'src/SAUDashboards/views/club/ClubListView';
import DashboardSAULayout from 'src/SAUDashboards/layouts/DashboardLayout';
import DashboardViewSAU from 'src/SAUDashboards/views/reports/DashboardView';
import ConfirmClub from 'src/SAUDashboards/views/confirmclub/ConfirmClubListView';
import SettingsViewSAU from 'src/SAUDashboards/views/settings/SettingsView';

//Club pers..
import DashboardClubLayout from 'src/PresidentDashboards/layouts/DashboardLayout';
import DashboardViewClub from 'src/PresidentDashboards/views/reports/DashboardView';
import ClubInfo from 'src/PresidentDashboards/views/ClubDashboard/views/ClubInfo';
import ClubMembers from 'src/PresidentDashboards/views/ClubDashboard/views/ClubMembers';
import EventView from 'src/PresidentDashboards/views/ClubDashboard/views/event/EventListView';
import SettingsViewPre from 'src/PresidentDashboards/views/settings/SettingsView';

//pioneer
import PioneerDashboardClubLayout from 'src/PioneerDashboards/layouts/DashboardLayout';
import PioneerDashboardViewClub from 'src/PioneerDashboards/views/reports/DashboardView';
import PioneerClubInfo from 'src/PioneerDashboards/views/ClubDashboard/views/ClubInfo';
import PioneerClubMembers from 'src/PioneerDashboards/views/ClubDashboard/views/ClubMembers';
import PioneerEventView from 'src/PioneerDashboards/views/ClubDashboard/views/event/EventListView';


//Club dean..
import DeanDashboardClubLayout from 'src/DeanDashboards/layouts/DashboardLayout';
import DeanDashboardViewClub from 'src/DeanDashboards/views/reports/DashboardView';
import DeanClubInfo from 'src/DeanDashboards/views/ClubDashboard/views/ClubInfo';
import DeanClubMembers from 'src/DeanDashboards/views/ClubDashboard/views/ClubMembers';
import DeanEventView from 'src/DeanDashboards/views/ClubDashboard/views/event/EventListView';

//basic
import MainAdminLayout from 'src/adminDashboard/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RestView from 'src/views/auth/RestView';


//Home
import HomeLayout from 'src/HomePage/Home';
import EventPage from 'src/HomePage/EventPage';
import ClubPage from 'src/HomePage/ClubPage';


const routesAdmin = [
  {
    path: 'app/home/club',
    element: <ClubPage />,
  },
  {
    path: 'app/home/event',
    element: <EventPage />,
  },
  {
    path: 'app/home/',
    element: <HomeLayout />,    
  },
  {
    path: 'app/admin',
    element: <DashboardAdminLayout />,
    children: [
      { path: 'users', element: <UserView /> },
      { path: 'typesofevents', element: <TypesOfEventsView /> },
      { path: 'committee', element: <CommitteeView /> },
      { path: 'college', element: <CollegeView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'department', element: <DepartmentView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app/studentactivityunit/',
    element: <DashboardSAULayout />,
    children: [
      { path: 'dashboard', element: <DashboardViewSAU /> },
      { path: 'club', element: <ClubViewSAU /> },
      { path: 'club/detail', element: <ConfirmClub /> },
      { path: 'settings', element: <SettingsViewSAU /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app/president/',
    element: <DashboardClubLayout />,
    children: [
      { path: 'dashboard', element: <DashboardViewClub /> },
      { path: 'basicInformation', element: <ClubInfo /> },
      { path: 'clubMembers', element: <ClubMembers /> },
      { path: 'event', element: <EventView /> },
      { path: 'settings', element: <SettingsViewPre /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app/pioneer/',
    element: <PioneerDashboardClubLayout />,
    children: [
      { path: 'dashboard', element: <PioneerDashboardViewClub /> },
      { path: 'basicInformation', element: <PioneerClubInfo /> },
      { path: 'clubMembers', element: <PioneerClubMembers /> },
      { path: 'event', element: <PioneerEventView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app/dean/',
    element: <DeanDashboardClubLayout />,
    children: [
      { path: 'dashboard', element: <DeanDashboardViewClub /> },
      { path: 'basicInformation', element: <DeanClubInfo /> },
      { path: 'clubMembers', element: <DeanClubMembers /> },
      { path: 'event', element: <DeanEventView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainAdminLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'rest', element: <RestView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/admin/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];



  


export default routesAdmin;
