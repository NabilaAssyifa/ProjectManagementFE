import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser, faCalendar, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Header = ({ project }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between text-center p-3">
      <div className="w-full p-4 text-left">
        <h2 className="text-3xl font-bold text-[#f9f9f9]">
          {project ? project.name : "Pilih Project"}
        </h2>
        {project && (
          <div className="text-gray-300 text-sm font-light space-y-1 mt-2">
            <p className='text-gray-100 text-sm w-full md:w-3/5 font-medium mb-3 whitespace-normal break-words'>{project.description}</p>
            <p><FontAwesomeIcon icon={faBuilding} /> &nbsp; {project.company}</p>
            <p><FontAwesomeIcon icon={faUser} /> &nbsp; {project.pm}</p>
            <p><FontAwesomeIcon icon={faCalendar} /> &nbsp; {project.startDate} <FontAwesomeIcon icon={faArrowRight} className='ml-2 mr-2' /> {project.endDate}</p>
          </div>
          
        )}
      </div>
      <hr className=' border-t  border-gray-500' />
    </div>
  );
};

export default Header;
