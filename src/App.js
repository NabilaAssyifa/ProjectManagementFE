import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faMapMarker, faPlus } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import TaskBoard from './components/taskboard';
import Header from './components/header';
import Login from './components/Login';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk login
  const [projectData, setProjectData] = useState({
    id: null,
    name: '',
    company: '',
    pm: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    { id: 1, name: "Project 1", company: "Perusahaan A", pm: "PM A", startDate: "2023-10-01", endDate: "2023-10-31", description: "Deskripsi Project 1" },
    { id: 2, name: "Project 2", company: "Perusahaan B", pm: "PM B", startDate: "2023-11-01", endDate: "2023-11-30", description: "Deskripsi Project 2" }
  ]);

  const togglePopup = () => {
    setProjectData({
      id: null,
      name: '',
      company: '',
      pm: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsPopupOpen(!isPopupOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleEditClick = (project) => {
    setProjectData(project);
    setIsPopupOpen(true);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectData.id) {
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj.id === projectData.id ? projectData : proj
        )
      );
    } else {
      setProjects((prevProjects) => [
        ...prevProjects,
        { ...projectData, id: Date.now() } 
      ]);
    }
    togglePopup();
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Ubah status login
  };

  return (
    <div className="App flex h-screen">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} /> // Tampilkan komponen Login
      ) : (
        <>
          <aside className="fixed top-0 left-0 w-64 h-full bg-[#1f1f1f] p-6 shadow-lg overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-50 text-left mt-4">List Project</h2>
            <ul className="space-y-3 text-left h-full">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="flex items-center justify-between rounded-md bg-[#454545] hover:bg-[#4f4f4f] duration-500 pl-3 h-11 cursor-pointer"
                  onClick={() => handleProjectSelect(project)}
                >
                  <div className="flex items-center overflow-hidden">
                    <FontAwesomeIcon className="text-yellow-300" icon={faMapMarker} />
                    <span className="text-white ml-3 truncate max-w-[150px]">
                      {project.name}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    className="text-gray-400 hover:text-gray-300 duration-200 cursor-pointer mr-3"
                    icon={faPenToSquare}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(project);
                    }}
                  />
                </li>
              ))}
              <button
                onClick={togglePopup}
                className="w-48 h-10 text-sm text-left text-[#6f6f6f] border border-[#373737] hover:bg-[#373737] duration-300 rounded-md shadow"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2 ml-4" />
                Project Baru
              </button>
            </ul>
          </aside>

          <div className="ml-64 flex-grow p-2 bg-[#171717] overflow-y-auto">
            <Header project={selectedProject} />
            <hr className="border-t border-gray-500 w-10/12 ml-6" />

            <div className="pl-2 pr-3">
              <TaskBoard project={selectedProject} />
            </div>
          </div>

          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-500">
              <div className="relative bg-gradient-to-br from-[#3a3a3a] to-[#4a4a4a] w-[400px] p-8 rounded-lg shadow-2xl transform scale-105 transition-transform duration-500">
                <button onClick={togglePopup} className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition duration-200">
                  ✕
                </button>
                <h3 className="text-2xl font-semibold mb-6 text-gray-200 text-center">
                  {projectData.id ? "Edit Project" : "Project Baru"}
                </h3>
                <form onSubmit={handleSubmit}>

                  <label className="block mb-3 text-left">
                    <span className="block text-xs font-normal text-gray-300">Judul Project:</span>
                    <input
                      type="text"
                      name="name"
                      value={projectData.name}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 text-xs rounded bg-[#5a5a5a] text-gray-100 placeholder-gray-400 outline-transparent"
                      placeholder="Masukkan Judul Project"
                      required
                    />
                  </label>

                  <label className="block mb-1 text-left">
                    <span className="block text-xs font-normal text-gray-300">Deskripsi Project:</span>
                    <textarea
                      name="description"
                      value={projectData.description}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 text-xs rounded bg-[#5a5a5a] text-gray-100 placeholder-gray-400 outline-transparent"
                      placeholder="Masukkan Deskripsi Project"
                      required
                    ></textarea>
                  </label>

                  <label className="block mb-3 text-left">
                    <span className="block text-xs font-normal text-gray-300">Perusahaan:</span>
                    <select
                      name="company"
                      value={projectData.company}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 text-xs rounded bg-[#5a5a5a] text-gray-100 outline-transparent"
                      required
                    >
                      <option value="" disabled>Pilih Perusahaan</option>
                      <option value="Perusahaan A">Perusahaan A</option>
                      <option value="Perusahaan B">Perusahaan B</option>
                      <option value="Perusahaan C">Perusahaan C</option>
                    </select>
                  </label>

                  <label className="block mb-3 text-left">
                    <span className="block text-xs font-normal text-gray-300">Project Manager:</span>
                    <input
                      type="text"
                      name="pm"
                      value={projectData.pm}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 text-xs rounded bg-[#5a5a5a] text-gray-100 placeholder-gray-400 outline-transparent"
                      placeholder="Masukkan Nama Project Manager"
                      required
                    />
                  </label>

                  <label className="block mb-3 text-left">
                    <span className="block text-xs font-normal text-gray-300">Tanggal Mulai:</span>
                    <input
                      type="date"
                      name="startDate"
                      value={projectData.startDate}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 text-xs rounded bg-[#5a5a5a] text-gray-100 outline-transparent"
                      required
                    />
                  </label>

                  <label className="block mb-3 text-left">
                  <span className="block text-xs font-normal text-gray-300">Tanggal Berakhir:</span>
                    <input
                      type="date"
                      name="endDate"
                      value={projectData.endDate}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 text-xs rounded bg-[#5a5a5a] text-gray-100 outline-transparent"
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    className="mt-4 w-full h-10 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 duration-200"
                  >
                    {projectData.id ? "Simpan Perubahan" : "Tambahkan Project"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
