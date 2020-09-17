import React, { Fragment, useState, useContext } from 'react';

import moment from 'moment';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import da from 'date-fns/locale/da';

import { GlobalContext } from '../context/GlobalState';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const Addemployee = () => {
    /*const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [designation, setDesignation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [expireDate, setExpireDate] = useState('');*/
    const [employee, setEmployee] = useState({
        address: '',
        institution: '',
        contact_person: '',
        installation: '',
        supplier: '',
        authority_require: '',
        annual_contract_amount:'',
        start_date: '',
        end_date: '',
        who_pay: '',
        comment: '',
        file: null
    })

    const {address, institution, contact_person, installation, supplier, authority_require, annual_contract_amount, start_date, end_date, who_pay, comment} = employee;

    const { addEmployee } = useContext(GlobalContext);

    let history = useHistory();

    const handleChange = event => {
        event.preventDefault();
        
        const {value, name} = event.target
        setEmployee({...employee, [name]: value})
        console.log(employee)
        
    }

    const onStartDateChange = data => {
       //const newDate = moment(data).format('DD.MM.yyyy')
      // console.log(newDate)
       //setStartDate(data)
        setEmployee({...employee, start_date: data})
       
    }

    const onEndDateChange = data => {
       // const newDate = moment(data).format('DD.MM.yyyy')
       // setExpireDate(data)
        setEmployee({...employee, end_date: data})
        
    }

    const onFileChange = event => {
        console.log(event.target.files[0])
        setEmployee({...employee, file: event.target.files[0] })
    }

    const onSubmit = async e => {
        e.preventDefault();
        //console.log(employee)
        await addEmployee(employee);
        history.push("/");
    }

    return (
        <Fragment>
            <div className="w-full max-w-sm container mt-20 mx-auto">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick = {() => history.push('/')}>
            Back
            </button>
                <form onSubmit={onSubmit}>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            name="address" value={address} onChange={handleChange} type="text" placeholder="Enter address" />
                    </div>
                    <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="institution">
                            Institution
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                            name="institution" value={institution} onChange={handleChange} type="text" placeholder="Enter institution name" />
                    </div>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contact_person">
                            Kontakt person
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            name="contact_person" value={contact_person} onChange={handleChange} type="text" placeholder="Enter contact person name" />
                    </div>
                    <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="installation">
                        Anlæg
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            name="installation" value={installation} onChange={handleChange} type="text" placeholder="Anlæg" />
                    </div>
                    <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="supplier">
                        Supplier
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            name="supplier" value={supplier} onChange={handleChange} type="text" placeholder="Entreprenør/Leverandør" />
                    </div>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="authority_require">
                        Myndighedskrav
                        </label>
                        <div className="relative">
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" 
                                id="authority_require" name="authority_require" value={authority_require} onChange={handleChange}>
                                <option></option>
                                <option>NEJ</option>
                                <option>JA</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="annual_contract_amount">
                        Kontraktsum, årlig
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            name="annual_contract_amount" value={annual_contract_amount} onChange={handleChange} type="text" placeholder="Kontraktsum, årlig" />
                    </div>

                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="startDate">
                        Gyldig fra
                        </label>
                        <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" 
                            locale={da} dateFormat="dd/MM/yyyy" selected={start_date}  onChange={onStartDateChange} />
                    </div>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="expireDate">
                        Gyldig til
                        </label>
                        <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            locale={da} dateFormat="dd/MM/yyyy" selected={end_date}  onChange={onEndDateChange} />
                    </div>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="who_pay">
                            Hvem betaler
                        </label>
                        <div className="relative">
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" 
                            id="who_pay" name="who_pay" value={who_pay} onChange={handleChange}>
                            <option></option>
                            <option>GE</option>
                            <option>Institutionen</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="comment">
                        Bemærkninger
                        </label>
                        <textarea className="form-textarea shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" rows="3" name="comment" value={comment} onChange={handleChange} type="textarea" placeholder="Bemærkninger"/>
                    </div>

                    <div className="w-full  mb-5"> 
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="file">
                        Dokument
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            onChange={onFileChange} name="file" type="file" placeholder="upload file" /> 
                    </div> 

                    <div className="flex items-center justify-between">
                        <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add Service Agreement
                        </button>
                    </div>
                    <div className="text-center mt-4 text-gray-500"><Link to='/'>Cancel</Link></div>
                </form>
            </div>
        </Fragment>
    )
}