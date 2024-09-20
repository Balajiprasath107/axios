import React, { useContext, useRef, useState } from 'react'
import { DataContext } from './context'
import axios from 'axios'

function UserCard({ user }) {
    const [edit, setedit] = useState(false)
    const newdata = useRef(null)
    const updateoption = useRef(null)
    const { data, setdata, URL } = useContext(DataContext)
    function update(event) {
        event.preventDefault()
        let updatedata = updateoption.current.value.split(" ")
        let newarr = [...data]
        if (updatedata.length > 1) {
            newarr[newarr.indexOf(user)][updatedata[0]][updatedata[1]] = newdata.current.value
        }
        else {
            newarr[newarr.indexOf(user)][updatedata[0]] = newdata.current.value
            let obj = updatedata[0]
            axios.patch(`${URL}/${user.id}`, {
                obj: newdata.current.value
            }).then((response) => console.log(response)).catch((error) => console.log(error))
        }
        setdata(newarr)

        setedit(!edit)
    }

    function deleteUser() {
        let newarr = data.filter((item, index) =>
            index !== data.indexOf(user)
        )
        axios.delete(`${URL}/${user.id}`).then((response) => console.log(response)).catch((error) => console.log(error))
        setdata(newarr)

    }
    return (
        <div className='card mb-5 bg-info bg-opacity-10 border border-info border-start-0 rounded-end'>
            <div className='card-body'>
                <div className='row text-start'>
                    <p className='col  fw-bolder'>User ID</p>
                    <p className='col '>{user.id}</p>
                </div>
                <div className='row text-start'>
                    <p className='col  fw-bolder'>Name</p>
                    <p className='col '>{user.name}</p>
                </div>
                <div className='row text-start'>
                    <p className='col  fw-bolder'>User Name</p>
                    <p className='col '>{user.username}</p>
                </div>
                <div className='row text-start'>
                    <p className='col  fw-bolder'>E-mail</p>
                    <p className='col '>{user.email}</p>
                </div>
                <div className='row text-start'>
                    <p className='col  fw-bolder'>Address</p>
                    <div className='col '>
                        <p>{user.address.suite}</p>
                        <p>{user.address.street}</p>
                        <p>{user.address.city}</p>
                        <p>{user.address.zipcode}</p>
                    </div>
                </div>
                <div className='row text-start'>
                    <p className='col  fw-bolder'>Phone</p>
                    <p className='col '>{user.phone}</p>
                </div>
                <div className='row text-start'>
                    <p className='col  fw-bolder'>Website</p>
                    <p className='col '>{user.website}</p>
                </div>
                <div className='row text-start'>
                    <h6 className='col  fw-bolder fs-5 mb-3'>Company Details</h6>
                    <div className='row'>
                        <p className='col  fw-bolder'>Company Name</p>
                        <p className='col '>{user.company.name}</p>
                    </div>
                    <div className='row text-start'>
                        <p className='col  fw-bolder'>Catch Phrase</p>
                        <p className='col '>{user.company.catchPhrase}</p>
                    </div>
                    <div className='row text-start'>
                        <p className='col  fw-bolder'>Business</p>
                        <p className='col '>{user.company.bs}</p>
                    </div>
                </div>
                <div className='p d-flex-end justify-content-around'>
                    <button className='me-3' onClick={() => {
                        setedit(!edit)
                    }}>Edit</button>
                    <button className='bg bg-danger' onClick={deleteUser}>Delete</button>
                </div>
                {
                    edit ?
                        <form className='editcontainer d-flex-col justify-content-evenly' onSubmit={update} >
                            <label htmlFor="data-catagory align-self-center">Update</label>
                            <select name="data-catagory" id="" ref={updateoption}>
                                <option value="id">User Id</option>
                                <option value="name">Name</option>
                                <option value="username">User Name</option>
                                <option value="email"> E-mail</option>
                                <option value="address street"> Street</option>
                                <option value="address suite"> Suite</option>
                                <option value="address city"> City</option>
                                <option value="address zipcode"> Zipcode</option>
                                <option value="phone"> Phone</option>
                                <option value="website"> Website</option>
                                <option value="company name">Company Name</option>
                                <option value="company catchPhrase"> Catch phrase</option>
                                <option value="company bs">Business</option>
                            </select>
                            <input type="text" name="newdata" placeholder='Enter the new data' id="" ref={newdata} required />
                            <button className='bg-success m-3' type="submit">Done</button>
                        </form>
                        : null
                }
            </div>

        </div>
    )
}

export default UserCard