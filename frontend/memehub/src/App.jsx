import { Routes,Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import MemeGenerator from './pages/MemeGenerator'
import Footer from './components/Footer'
import './App.css'
import Contest from './pages/Contest'
import Profile from './pages/Profile'
import Groups from './pages/Groups'
import SignupCard from './pages/Signup'
import NotFound404 from './pages/NotFound404'
import SearchPage from './pages/Search'
import MemePage from './pages/MemePage'
import ContestPage from './pages/ContestPage'
import RankPage from './pages/Ranking'
import Community from './pages/Community'
import CommunityPage from './pages/CommunityPage'
import Members from './pages/Member'
import ImageUploader from './pages/ImageUploader'
import ContestRegistration from './pages/ContestRegistration'
import CommunityUploader from './pages/CommunityUploader'
import SponsorUploader from './pages/SponsorRegistration'
import Settings from './pages/settings'
import DpUploader from './pages/UploadDp'
import Notification from './pages/Notification'
import TempUploader from './pages/UploadTemp'
import ImageUploaderCommunity from './pages/UploadInCommunity'
import ImageUploaderContest from './pages/UploadInContest'
import LineCharts from './pages/LineCharts'

function App() {
  const userId = localStorage.getItem("userId")
  return (
    <>
      <Navbar />
      {userId === 0?<Routes></Routes>:
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupCard />} />
        <Route path="/meme-generator" element={<MemeGenerator />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/communities" element={<Community />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/users/:userId" element={<Profile />} />
        <Route path="/communities/:communityId" element={<CommunityPage/>} />
        <Route path="/communities/member/:communityId" element={<Members/>} />
        <Route path="/contest/:contestId" element={<ContestPage/>} />
        <Route path="/contest/rank/:contestId" element={<RankPage/>} />
        <Route path="/upload" element={<ImageUploader/>} />
        <Route path="/uploadincommunity/:communityId" element={<ImageUploaderCommunity/>} />
        <Route path="/uploadincontest/:contestId" element={<ImageUploaderContest/>} />
        <Route path="/meme/:memeId" element={<MemePage/>} />
        <Route path="/contest-registration" element={<ContestRegistration/>} />
        <Route path="/community-registration" element={<CommunityUploader/>} />
        <Route path='sponsor-registration' element={<SponsorUploader/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/upload-dp' element={<DpUploader/>} />
        <Route path='/upload-template' element={<TempUploader/>} />
        <Route path='/notifications' element={<Notification/>} />
        <Route path='/stats' element={<LineCharts/>} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
}
      <Footer />
    </>
  );
}

export default App
