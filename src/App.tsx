import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Team from './pages/Team';
import News from './pages/News';
import NewsArticle from './pages/NewsArticle';
import Project from './pages/Project';
import ProjectInfo from './pages/ProjectInfo';
import Admin from './pages/Admin';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/team" element={<Team />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/article/:id" element={<NewsArticle />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/project-info/:id" element={<ProjectInfo />} />
              <Route path="/admin/alphateam2024" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;