// import React, { Component } from 'react';
// import axios from "axios";
// import Alert from '../UI/Alert/Alert';
// import { Link, Redirect } from 'react-router-dom';
// import Spinner from '../UI/Spinner/Spinner';

// class Signup extends Component {

//     state = {
//         credentials : {
//             email : '',
//             username : '',
//             mobileNumber : '',
//             role : '',
//             password : '',
//             confirmpassword : ''
//         }, 
//         alert : {
//             isAlertThere : false,
//             alertMessage : '',
//             success : true
//         },
//         loading : false
//     }

//     // ******************************* Utility Methods ****************************************************

//     checkvalidity = () => {

//         const { email, password, confirmpassword, username, mobileNumber, role } = this.state.credentials;
//         let valid = true;

//         if(email === '' || password === '' || confirmpassword === '' || username === '' || mobileNumber === '' || role === '' ) {
//             this.setAlert({alert : true, alertMessage : "Please fill all the fields", success : false});
//             valid = false;
//         }

//         if (this.state.credentials.password !== this.state.credentials.confirmpassword) {
//             this.setAlert({alert : true, alertMessage : "Passwords do not match !", success : false});
//             valid = false;
//         }
//         return valid;
//     }

//     setAlert = (setter) => {
//             let alertSetting = {
//                 isAlertThere : setter.alert,
//                 alertMessage : setter.alertMessage,
//                 success : setter.success
//             }
//             this.setState({alert : alertSetting});

//         return setter;
//     }

//     closeAlert = () => {
//         let alertState = {...this.state.alert};
//         alertState.isAlertThere = false;
//         alertState.alertMessage = '';
//         alertState.success = false;
//         this.setState({alert : alertState});
//     }

//     // ******************************* Utility Methods End ****************************************************

//     onChangeHandler = (event) => {
//         const tempCredentials = {...this.state.credentials};
//         const name = event.target.getAttribute('id');
//         const value = event.target.value;

//         tempCredentials[name] = value;
//         this.setState({credentials : tempCredentials});
//     }

//     onSubmitHandler = async(e) => {
//         e.preventDefault();
//         if(!this.checkvalidity())
//             return;
//         else {
//             this.setState({loading : true})
//             await axios.post('http://localhost:8080/signup', this.state.credentials, {
//                 headers: {"Access-Control-Allow-Origin": "*"}
//             })
//             .then(res => {
//                 this.setState({loading : false});
//                 this.setAlert({alert : true, alertMessage : "User successfully Signed Up", success : true});
//             })
//             .catch(err => {
//                 this.setState({loading : false});
//                 console.log(err);
//                 this.setAlert({alert : true, alertMessage : "Something went wrong", success : false});
//             })
//         }
        
//     }

//     render() {

//         const loader = <Spinner />;

//         const form = (
//             <div className="container p-4 rounded  bg-light shadow w-50 my-4">
//                     <form method="post" onSubmit={this.onSubmitHandler}>
//                         <div className="mb-3">
//                             <label htmlFor="email" className="form-label">Email address</label>
//                             <input type="email" className="form-control" required value={this.state.credentials.email} id="email" onChange={this.onChangeHandler} aria-describedby="emailHelp"/>
//                             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="username" className="form-label">Username</label>
//                             <input type="text" className="form-control" required value={this.state.credentials.username} id="username" onChange={this.onChangeHandler} aria-describedby="emailHelp"/>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
//                             <input type="text" className="form-control" required value={this.state.credentials.mobileNumber} onChange={this.onChangeHandler} id="mobileNumber"/>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="role" className="form-label">Role</label>
//                             <select className="form-select" required id="role" value={this.state.credentials.role} onChange={this.onChangeHandler} aria-label="Default select example">
//                                 <option value=""> Select a Role</option>
//                                 <option value="USER">User</option>
//                                 <option value="ADMIN">Admin</option>
//                             </select>
//                         </div>  
//                         <div className="mb-3">
//                             <label htmlFor="password" className="form-label">Password</label>
//                             <input type="password" required minLength="3" className="form-control" value={this.state.credentials.password} onChange={this.onChangeHandler} id="password"/>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="confirmpassword" className="form-label">Comfirm Password</label>
//                             <input type="password" required minLength="3" className="form-control" value={this.state.credentials.confirmpassword} onChange={this.onChangeHandler} id="confirmpassword"/>
//                         </div>
//                         <button type="submit" id="submit" className="btn btn-primary">Signup</button>
//                         <Link id="submit" className="btn btn-primary mx-1" to="/login">Login</Link>
//                     </form> 
//                 </div>
//         )

//         return (
//             <>
//                 <h1 className="p-2 text-center">Signup</h1>
//                 {
//                     this.state.alert.isAlertThere 
//                     && <Alert 
//                             alertMessage={this.state.alert.alertMessage} 
//                             success={this.state.alert.success}
//                             click={this.closeAlert} 
//                         />
//                 }
//                 {this.state.loading ? loader : form} 
//             </>
//         );
//     }
// }

// export default Signup;


import axios from 'axios';
import React, { isValidElement, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';
import _ from "lodash";
import "../../App.css"

const Signup = () => {

    const authContent = useContext(AuthContext);

    const authFromDb = {
        email : 'test@gmail.com',
        password : '123'
    }

    const [state, setState] = useState({
        email : '',
        username : '',
        mobileNumber : '',
        role : '',
        password : '',
        confirmpassword : '',
        error : 'success'
    });


    const [passwordError, setPasswordError] = useState('');
    const [numberError, setNumberError] = useState('');

    const checkValiditiy = () => {
        let isValid = true;

        if(isNaN(state.mobileNumber) || state.mobileNumber.length !== 10 ) {
            setNumberError('Enter a valid Phone number with exactly 10 numbers');
            setError(true);
            isValid = false;
        }

        if(state.confirmpassword !== state.password) {
            setPasswordError('Passwords do not match');
            setError(true);
            isValid = false;
        }

        return isValid;
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(!checkValiditiy()) {
            return;
        }

        const tempState = _.cloneDeep(state);

        axios.post('http://localhost:8080/signup', tempState)
        .then(res => {
            if(res.data) {
                console.log(res.data);
                authContent.notify('User Successfully signed up', 'success');
                authContent.authenticate(res.data.email, res.data.role);
                authContent.history.push("/")
            }   else {
                authContent.notify('Something went wrong', 'error');
            } 
        }) 
              
    }

    const setError = (val) => {
        setState(prevState => {
            return {
                ...prevState,
                error : val
            }
        })
    }

    const onChangeHandler = (e) => {
        const name = e.target.getAttribute('id');
        const value = e.target.value.toString();

        let tempState = {...state};
        tempState[name] = value;
        tempState['error'] = true;

        setState(tempState)

        if(name === 'password') {
            if(value.length < 4) {
                setPasswordError('weak')
            } else if(value.length >= 4 && value.length < 8) {
                setPasswordError('moderate');
            } else if(value.length >= 8) {
                setPasswordError('Strong');
            }
        }
        setTimeout(() => {
            setError(false);
            setPasswordError('');
        }, 2000);
        
    }

    if(authContent.state.auth.authenticated) {
        if(authContent.history.location.state !== undefined)
            return <Redirect to={authContent.history.location.state.from.pathname} />
        return <Redirect to="/"/>
    }


    return ( 
        <div className="container w-50 mb-4 bg-layout">
            <h1 className="text-center my-4 fs-2" >Sign Up</h1>
            <div className="container border border-3 shadow p-4 rounded"  style={{width : "35rem", height : "auto", borderRadius : '10px', backgroundColor : "#cc9f9f", opacity : "0.9"}}>
                <form className="p-3 mx-auto" onSubmit={onSubmitHandler}>

                    <div className="form-group mb-2 mt-4">
                        <label htmlFor="email" className="mb-2">Email address</label>
                        <input type="email" className="form-control mb-1" id="email" required aria-describedby="emailHelp" onChange={onChangeHandler} placeholder="Enter email" value={state.email}/>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="username" className="mb-2">Username</label>
                        <input type="text" className="form-control mb-2" id="username" required aria-describedby="emailHelp" onChange={onChangeHandler} placeholder="Enter Username" value={state.username}/>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="mobileNumber" className="mb-2">Mobile Number</label>
                        <input type="number" className="form-control mb-2" id="mobileNumber" aria-describedby="emailHelp" required onChange={onChangeHandler} placeholder="Enter Mobile Number" value={state.mobileNumber}/>
                        <small id="mobileNumberHelp" className={`form-text text-${!state.error ? 'success' : 'danger'}`}>{numberError}</small>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="role" className="mb-2">Role</label>
                        <select className="form-select" value={state.role} onChange={onChangeHandler} id="role" required aria-label="Role Select">
                            <option selected>Select a role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </select>
                    </div>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="mb-2">Password</label>
                        <input type="password" className="form-control  mb-2" id="password" placeholder="Enter Password" onChange={onChangeHandler} value={state.password}/>
                        <small id="passwordhelp" className={`form-text text-danger`}>{passwordError}</small>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmpassword" className="mb-2">Confirm Password</label>
                        <input type="password" className="form-control  mb-2" id="confirmpassword" placeholder="Confirm Password" onChange={onChangeHandler} value={state.confirmpassword}/>
                    </div>
                    <small id="emailhelp" className={`form-text text-${state.error !== '' ? state.error === 'success' ? 'success' : 'danger' : 'muted'}`}>{}</small>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
           
        </div>
        
     );
}
 
export default Signup;