import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faUsers,faTasks, faPlus,faTrash, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const ItemTypes = {
  TASK: 'task',
};

function Task({ title, staffList, tugasList, onEdit }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { title, staffList, tugasList },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      onClick={() => onEdit({ title, staffList, tugasList })}
      className={`block max-w-sm p-1 bg-[#333333] ${isDragging ? 'opacity-50' : ''} hover:bg-[#373737] duration-300 rounded-md shadow cursor-pointer`}
    >
      <div className="flex justify-between items-center p-2">
        <h5 className="text-sm font-bold tracking-tight text-white whitespace-normal break-words overflow-hidden mr-7">
          {title}
        </h5>
        <FontAwesomeIcon
          icon={faTrash}
          className="text-[#505050] cursor-pointer hover:text-red-500 duration-300"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
      <div className="text-xs pl-3 pt-1 mb-1 hover:bg-[#414141] duration-300 rounded-sm text-white">
        <FontAwesomeIcon icon={faUsers} className="text-white mr-2" /> {staffList.length} staff
      </div>

      <div className="text-xs pl-3 pt-1 mb-1 hover:bg-[#414141] duration-300 rounded-sm text-white">
        <FontAwesomeIcon icon={faTasks} className="text-white mr-2" /> {tugasList.length} Tugas
      </div>
    </div>
  );
}


function StatusColumn({ status, tasks, onDropTask, onEditTask, onOpenPopup }) {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => onDropTask(item, status),
  });

  return (
    <div ref={drop} className="flex flex-col max-w-xs p-4 rounded-lg shadow-lg text-left transition-transform duration-300 hover:scale-105">
      <div className="flex items-center space-x-2">
        
        <p
          className={` font-semibold text-xs p-1 w-32 rounded-full ${
            status === 'Opportunity' ? 'bg-blue-200 text-blue-900' :
            status === 'Work In Progress' ? 'bg-yellow-200 text-yellow-900' :
            status === 'Pending Payment' ? 'bg-red-200 text-red-900' :
            'bg-green-200 text-green-900'
          }`}
        >
          <FontAwesomeIcon icon={faCircle} className="w-2 ml-1 mr-1" />
          {status}
        </p>
        <p className="text-gray-400 text-sm">{tasks.length}</p>
      </div>
      <div className="mt-4 space-y-2">
        {tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            staffList={task.staffList}
            tugasList={task.tugasList}
            onEdit={onEditTask}
          />
        ))}
      </div>
      <button
        onClick={() => onOpenPopup(status)}
        className="text-left pl-2 block mt-4 border border-[#4a4a4a] hover:bg-[#4a4a4a] duration-300 w-36 h-8 text-xs text-gray-400 rounded-md"
      >
                 <FontAwesomeIcon icon={faPlus} className="w-2 ml-1 mr-2" />
                 Tambah Aktivitas
      </button>
    </div>
  );
}



function EditTaskSection({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [staffList, setStaffList] = useState('');
  const [staffArray, setStaffArray] = useState([...task.staffList]);
  const [tugasList, setTugasList] = useState('');
  const [tugasArray, setTugasArray] = useState(Array.isArray(task.tugasList) ? [...task.tugasList] : []);

  const handleAddStaff = () => {
    if (staffList.trim() !== '') {
      setStaffArray([...staffArray, staffList.trim()]);
      setStaffList('');
    }
  };

  const handleDeleteStaff = (index) => {
    const newStaffArray = staffArray.filter((_, i) => i !== index);
    setStaffArray(newStaffArray);
  };

  const handleAddTugas = () => {
    if (tugasList.trim() !== '') {
      setTugasArray([...tugasArray, tugasList.trim()]);
      setTugasList('');
    }
  };

  const handleDeleteTugas = (index) => {
    const newTugasArray = tugasArray.filter((_, i) => i !== index);
    setTugasArray(newTugasArray);
  };

  const handleSave = () => {
    onSave({ ...task, title, staffList: staffArray, tugasList: tugasArray });
    onClose(); 
  };  

  const handleGoBack = () => {
    onClose();
  };

  return (
    <div className="fixed right-0 top-0 h-full w-1/3 p-9 bg-[#373737] shadow-lg z-50">
      <h2 className="text-lg mb-2 text-white text-left">
        <FontAwesomeIcon icon={faCircleChevronLeft} className="text-xl cursor-pointer" onClick={handleGoBack} />
        <span className='ml-3'>Edit Task</span>
      </h2>
      <input
        type="text"
        placeholder="Nama Aktivitas"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-transparent text-2xl font-bold text-white outline-none rounded h-16 w-full"
      />

      <hr className='mb-6' />

      <h3 className="text-white text-sm mb-1 text-left font-medium"> Staff</h3>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Nama Staff"
          value={staffList}
          onChange={(e) => setStaffList(e.target.value)}
          className="border border-gray-300 p-2 text-sm  outline-gray-400  rounded w-full mr-2"
        />
        <button
          onClick={handleAddStaff}
          className="hover:bg-green-900 duration-200 text-white rounded px-4 py-2"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <h3 className="text-white text-sm mb-1 text-left font-medium">Daftar Staff:</h3>
      <div className="mb-4 max-h-28 border border-[#727272] rounded pl-3 p-2 overflow-y-auto">
        <ul>
          {staffArray.map((staff, index) => (
            <li key={index} className="flex justify-between text-gray-300">
              <span>- {staff}</span>
              <button onClick={() => handleDeleteStaff(index)} className="text-red-500 hover:text-red-400">
                <FontAwesomeIcon icon={faTrash} className='mr-6' />
              </button>
            </li>
          ))}
        </ul>
      </div>


      <h3 className="text-white text-sm mb-1 text-left font-medium"> Tugas</h3>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Isi Tugas..."
          value={tugasList}
          onChange={(e) => setTugasList(e.target.value)}
          className="border border-gray-300 text-sm outline-gray-400 p-2 rounded w-full mr-2"
        />
        <button
          onClick={handleAddTugas}
          className=" hover:bg-green-900 duration-200 text-white rounded px-4 py-2"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <h3 className="text-white text-sm mb-1 text-left font-medium">Daftar Tugas:</h3>
      <div className="mb-4 max-h-28 border border-[#727272] rounded pl-3 p-2 overflow-y-auto">
        <ul>
          {tugasArray.map((tugas, index) => (
            <li key={index} className="flex justify-between text-gray-300">
              <span>- {tugas}</span>
              <button onClick={() => handleDeleteTugas(index)} className="text-red-500 hover:text-red-400">
                <FontAwesomeIcon icon={faTrash} className='mr-6' />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleSave} className="bg-[#3165b3] w-full text-white rounded px-4 py-2">Simpan</button>
    </div>
);

}




function AddActivityPopup({ isOpen, onClose, onAddActivity }) {
  const [title, setTitle] = useState('');
  const [staffList, setStaffList] = useState('');
  const [staffArray, setStaffArray] = useState([]);

  const handleAddStaff = () => {
    if (staffList.trim() !== '') {
      setStaffArray([...staffArray, staffList.trim()]);
      setStaffList('');
    }
  };

  const handleAdd = () => {
    if (title && staffArray.length > 0) {
      onAddActivity(title, staffArray);
      setTitle('');
      setStaffArray([]);
      onClose();
    } else {
      alert("Mohon isi Nama Aktivitas, Nama Staff.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-gradient-to-br from-[#3a3a3a] to-[#4a4a4a] w-[400px] p-8 rounded-lg shadow-2xl transform scale-105 transition-transform duration-500 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition duration-200">✕</button>
        <h2 className="text-xl font-bold mb-4 text-gray-200 text-center">Tambah Aktivitas</h2>

        <label className='block text-white text-xs mb-1 text-left'>Nama Aktivitas</label>
        <input
          type="text"
          placeholder="Isi nama aktivitas..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-transparent bg-[#5a5a5a] p-2 mb-2 w-full text-sm rounded text-gray-100 placeholder-gray-400 outline-transparent"
        />

        <label className='block text-white text-xs mb-1 text-left'>Staff</label>
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Isi nama staff..."
            value={staffList}
            onChange={(e) => setStaffList(e.target.value)}
            className="border border-transparent bg-[#5a5a5a] p-2 w-full text-sm rounded text-gray-100 placeholder-gray-400 outline-transparent"
          />
          <button onClick={handleAddStaff} className="ml-2 p-2 bg-blue-500 rounded hover:bg-blue-600">
            <FontAwesomeIcon icon={faPlus} className="text-white" />
          </button>
        </div>

        <div className="text-white text-sm mb-3">
          <h3 className='block text-white text-xs mb-1 text-left'>Daftar Staff:</h3>
          <div className="max-h-28 overflow-y-auto"> 
            <ul>
              {staffArray.map((staff, index) => (
                <li key={index} className="text-gray-300 block  text-xs mb-1 text-left">- {staff}</li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="border-t border-[#5a5a5a] mb-4" />  

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 border text-sm border-gray-400 rounded text-gray-200 hover:bg-gray-600 hover:text-white transition duration-200">
            Batal
          </button>
          <button onClick={handleAdd} className="bg-blue-500 text-gray-100 rounded px-4 py-2 text-sm hover:bg-blue-600 transition duration-200">
            Tambah
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
    </div>
  );
}


function TaskBoard({ project }) {
  const [columns, setColumns] = useState({
    "Opportunity": [],
    "Work In Progress": [],
    "Pending Payment": [],
    "Completed": [],
  });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);


  const handleDropTask = (task, status) => {
    setColumns((prevColumns) => {
      const newColumns = { ...prevColumns };
      Object.keys(newColumns).forEach((column) => {
        newColumns[column] = newColumns[column].filter((t) => t.title !== task.title);
      });
      newColumns[status] = [...newColumns[status], task];
      return newColumns;
    });
  };

  const handleAddActivity = (title, staffList) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [currentStatus]: [...prevColumns[currentStatus], { title, staffList, tugasList: [] }],
    }));
    setPopupOpen(false); 
  };
  

  const handleEditTask = (task) => {
    setSelectedTask(task);
  };

  const handleSaveTask = (updatedTask) => {
    setColumns((prevColumns) => {
      const newColumns = { ...prevColumns };
      Object.keys(newColumns).forEach((column) => {
        newColumns[column] = newColumns[column].map((t) =>
          t.title === selectedTask.title ? { ...t, ...updatedTask } : t
        );
      });
      return newColumns;
    });
    setSelectedTask(null); 
  };
  

  const openPopup = (status) => {
    setCurrentStatus(status);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      

<div className="flex flex-col md:flex-row mt-6 space-x-4">
  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Object.keys(columns).map((status) => (
      <StatusColumn
        key={status}
        status={status}
        tasks={columns[status]}
        onDropTask={handleDropTask}
        onEditTask={handleEditTask}
        onOpenPopup={openPopup}
      />
    ))}
  </div>
</div>


      <AddActivityPopup 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
        onAddActivity={handleAddActivity} 
      />
      {selectedTask && (
        <div className="mt-[-400px] w-96 ">
          <EditTaskSection
            task={selectedTask}
            onSave={handleSaveTask}
            onClose={() => setSelectedTask(null)}
          />
        </div>
      )}
    </DndProvider>
  );
}

export default TaskBoard;
