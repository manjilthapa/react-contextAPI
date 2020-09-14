import React, { Fragment, useContext } from "react";
import moment from 'moment';
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

export const Employeelist = () => {
  const { employees, removeEmployee, editEmployee } = useContext(GlobalContext);

  console.log(employees)
  return (
    <Fragment>
      {employees.length > 0 ? (
        <Fragment>
          

            <table className="w-full table-auto">
  <thead>
    <tr>
      <th className="px-4 py-2">Address</th>
      <th className="px-4 py-2">Institution</th>
      <th className="px-4 py-2">Contact Person</th>
      <th className="px-4 py-2">Installation</th>
      <th className="px-4 py-2">Supplier</th>
      <th className="px-4 py-2">Authority require</th>
      <th className="px-4 py-2">Annual contract amount</th>
      <th className="px-4 py-2">start date</th>
      <th className="px-4 py-2">end date</th>
      <th className="px-4 py-2">who pay</th>
      <th className="px-4 py-2">Comment</th>
      <th className="px-4 py-2">file </th>
      <th className="px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>

  {employees.map(employee => (

    <tr key={employee.id}>
      <td className="border px-4 py-2"> {employee.address}</td>
      <td className="border px-4 py-2"> {employee.institution}</td>
      <td className="border px-4 py-2"> {employee.contact_person}</td>
      <td className="border px-4 py-2"> {employee.installation}</td>
      <td className="border px-4 py-2"> {employee.supplier}</td>
      <td className="border px-4 py-2"> {employee.authority_require}</td>
      <td className="border px-4 py-2"> {employee.annual_contract_amount}</td>
      <td className="border px-4 py-2"> {moment(employee.start_date).format('DD.MM.yyyy')}</td>
      <td className="border px-4 py-2"> {moment(employee.end_date).format('DD.MM.yyyy')}</td>
      <td className="border px-4 py-2"> {employee.who_pay}</td>
      <td className="border px-4 py-2"> {employee.comment}</td>
      <td className="border px-4 py-2"> {employee.file_path && employee.file_name && <a href={`${employee.file_path}`}> {`${employee.file_name}`}</a>}</td>
      <td className="border px-4 py-2">
      <Link to={`/edit/${employee.id}`}>
      <button
        onClick={() => editEmployee(employee.id)}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-edit"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>
    </Link>
    <button
      onClick={() => removeEmployee(employee.id)}
      className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-trash-2"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </button>
    </td>
    </tr>
  ))}
  </tbody>
</table>
        
        </Fragment>
      ) : (
        <p className="text-center bg-gray-100 text-gray-500 py-5">No data</p>
      )}
    </Fragment>
  );
};