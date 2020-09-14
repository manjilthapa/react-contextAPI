import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios'
import AppReducer from './AppReducer';

const initialState = { 
    employees: []
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("https://my-demo-form.herokuapp.com/contracts/read.php")
            const {contracts} = response.data
            console.log(contracts)
            dispatch(fetchInitial(contracts))
        };
        fetchData()
          /*.then(response => console.log(response.data))
          .then(data => dispatch(fetchInitial(data)));*/
      }, []);

    const fetchInitial = data => ({
        type: 'GET_EMPLOYEE',
        payload: data
      });
      
    const removeEmployee = async (id)  => {
        dispatch({
            type: 'REMOVE_EMPLOYEE',
            payload: id
        });
    };

    const addEmployee = async (employee) => {
        const formData = new FormData();
        formData.append('address',employee.address)
        formData.append('institution',employee.institution)
        formData.append('contact_person',employee.contact_person)
        formData.append('supplier',employee.supplier)
        formData.append('installation',employee.installation)
        formData.append('authority_require',employee.authority_require)
        formData.append('annual_contract_amount',employee.annual_contract_amount)
        formData.append('who_pay',employee.who_pay)
        formData.append('start_date',employee.start_date)
        formData.append('end_date',employee.end_date)
        formData.append('comment', employee.comment)
        formData.append('file',employee.file)
        const response = await axios.post("https://my-demo-form.herokuapp.com/contracts/create.php", formData);
        const {contract} = response.data
        const newEmployeeValue = { ...employee, id:contract.id, file_path:contract.file_path, file_name: contract.file_name}
        dispatch({
            type: 'ADD_EMPLOYEES',
            payload: newEmployeeValue
        });
    };

    function editEmployee(employees) {
        dispatch({
            type: 'EDIT_EMPLOYEE',
            payload: employees
        });
    };

    return (<GlobalContext.Provider value={{
        employees: state.employees,
        removeEmployee,
        addEmployee,
        editEmployee
    }}>
        {children}
    </GlobalContext.Provider>);
}
