import React, { useContext, useRef } from 'react'
import './style.css'
import OldData from './OldData'
import { DataContext } from './context'
import axios from 'axios'
function UserManagement() {

    const {data,setdata,URL} = useContext(DataContext)
    const form = useRef(null)

    function addnewuser(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        let newuserdata = {},address ={} , company = {}
        for (let [key, value] of ([...formData]).slice(0,4)) {
            newuserdata[key] = value
        }
        newuserdata.address = address
        for (let [key, value] of ([...formData]).slice(4,8)) {
            newuserdata["address"][key] = value
        }
        for (let [key, value] of ([...formData]).slice(8,10)) {
            newuserdata[key] = value
        }
        newuserdata.company = company
        for (let [key, value] of ([...formData]).slice(10,13)) {
            newuserdata["company"][key] = value
        }
        console.log(newuserdata,data)
        let newarr = [...data]
        if(newarr.map(item=> item.id).indexOf(newuserdata.id) === -1){
        newarr = [...newarr,newuserdata]
        axios.post(URL,newuserdata).then((response)=>console.log(response)).catch((error)=>console.log(error))
        }
        setdata(newarr)
        e.currentTarget.reset()
    }
    return (
        <div>
            <p className='fw-bolder mb-2 fs-1'>User management</p>
            <div className='container gap-5'>
                <div>
                    <h2 className='fw-bolder'>Add/Create</h2>
                    <div className='card createcard'>
                        <form onSubmit={addnewuser} ref={form}>
                            <div className='row justify-content-around'>
                                <label className='col-16 text-start' htmlFor="id">User Id</label>
                                <input className='col-8' name='id' type="text" placeholder='user id' required />
                            </div>
                            <div className='row justify-content-around'>
                                <label className='col-16 text-start' htmlFor="name">Name</label>
                                <input className='col-8' name='name' type="text" placeholder='Name' required />
                            </div>
                            <div className='row justify-content-around text-start'>
                                <label className='col-16' htmlFor="username">User-Name</label>
                                <input className='col-8' name='username' type="text" placeholder='user name' required />
                            </div>
                            <div className='row justify-content-around'>
                                <label className='col-16 text-start' htmlFor="email">E-mail</label>
                                <input className='col-8' name='email' type="email" placeholder='user e-mail' required />
                            </div>
                            <div className='row justify-content-around'>
                                <label className='col-16 text-start fw-bolder'>Address</label>
                                <div>
                                    <div className='row justify-content-around'>
                                        <label className='col-16 text-start' htmlFor="street">Street</label>
                                        <input className='col-8' name='street' type="text" placeholder='Street' required />
                                    </div>
                                    <div className='row justify-content-around'>
                                        <label className='col-16 text-start' htmlFor="suite">Suite</label>
                                        <input className='col-8' name='suite' type="text" placeholder='Suite' required />
                                    </div>
                                    <div className='row justify-content-around'>
                                        <label className='col-16 text-start' htmlFor="city">City</label>
                                        <input className='col-8' name='city' type="text" placeholder='City' required />
                                    </div>
                                    <div className='row justify-content-around'>
                                        <label className='col-16 text-start' htmlFor="zipcode">Zipcode</label>
                                        <input className='col-8' name='zipcode' type="text" placeholder='Zipcode' required />
                                    </div>
                                </div>

                            </div>
                            <div className='row justify-content-around'>
                                <label className='col-16 text-start' htmlFor="phone">Phone</label>
                                <input className='col-8' name='phone' type="text" placeholder='Phone' required />
                            </div>
                            <div className='row justify-content-around'>
                                <label className='col-16 text-start' htmlFor="website">Website</label>
                                <input className='col-8' name='website' type="text" placeholder='Website' required />
                            </div>
                            <div className='row justify-content-around'>
                                <label className='col-16 text-start fw-bolder'>Business Details</label>
                                <div>
                                    <div className='row justify-content-around'>
                                        <label className='col-16 text-start' htmlFor="name">Business Name</label>
                                        <input className='col-8' name='name' type="text" placeholder='Business Name' required />
                                    </div>
                                    <div className='row justify-content-around'>
                                        <label className='col-16 text-start' htmlFor="catchPhrase">Catch phrase</label>
                                        <input className='col-8' name='catchPhrase' type="text" placeholder='Catch phrase' required />
                                    </div>
                                    <div className='row justify-content-around'>
                                        <label className='col-16 text-start' htmlFor="bs">Business</label>
                                        <input className='col-8' name='bs' type="text" placeholder='Business' required />
                                    </div>
                                </div>
                            </div>
                            <button className='bg bg-primary mt-4' type='submit'>Add/Create</button>
                        </form>
                    </div>

                </div>
                <div>
                    <h2 className='fw-bolder'>User Data</h2>
                    <div className=' w-100 createcard'>

                        <OldData />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserManagement