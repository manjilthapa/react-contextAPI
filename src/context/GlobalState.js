import React, { createContext, useReducer, useEffect } from 'react';
import moment from 'moment'
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
        const formData = new FormData();
        formData.append('id', id)
        const response = await axios.post("https://my-demo-form.herokuapp.com/contracts/delete.php", formData);
        const {OK} = response.data
        if(OK === "YES"){
            dispatch({
                type: 'REMOVE_EMPLOYEE',
                payload: id
            });
        }
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
        formData.append('start_date',moment(employee.start_date).format('YYYY-MM-DD'))
        formData.append('end_date',moment(employee.end_date).format('YYYY-MM-DD'))
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

    const editEmployee = async (employee) => {
        console.log("HERE")
        const formData = new FormData();
        formData.append('id',employee.id)
        formData.append('address',employee.address)
        formData.append('institution',employee.institution)
        formData.append('contact_person',employee.contact_person)
        formData.append('supplier',employee.supplier)
        formData.append('installation',employee.installation)
        formData.append('authority_require',employee.authority_require)
        formData.append('annual_contract_amount',employee.annual_contract_amount)
        formData.append('who_pay',employee.who_pay)
        formData.append('start_date',moment(employee.start_date).format('YYYY-MM-DD'))
        formData.append('end_date',moment(employee.end_date).format('YYYY-MM-DD'))
        formData.append('comment', employee.comment)
        formData.append('file_path', employee.file_path)
        formData.append('file_name', employee.file_name)
        formData.append('file',employee.file)
        const response = await axios.post("https://my-demo-form.herokuapp.com/contracts/update.php", formData);
        const {OK, data} = response.data
        if(data){
            employee = { ...employee, file_path:data.file_path, file_name: data.file_name}
        }
        
        if(OK === "YES"){
            dispatch({
                type: 'EDIT_EMPLOYEE',
                payload: employee
            });
        }
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
