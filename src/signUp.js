import React, { Component } from 'react';
import './App.css';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import './css/tailwind.css';
import Bar from './bar';
function user() {
    return firebaseApp.auth().currentUser;
}
function db() {
    return firebaseApp.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
}
class RegisterForm extends Component {
    constructor(props) {
        super(props);
    }  
 	SignUp(e){
	e.preventDefault()
	let email = this.refs.email.value;
    	let password = this.refs.password.value;
        firebaseApp.auth().createUserWithEmailAndPassword(email,password).then(message=>{
			firebaseApp.auth().signInWithEmailAndPassword(email,password).then(response=>{
				let tokenKey = "logged";
						let tokenValue = true;
						window.localStorage.setItem(tokenKey, JSON.stringify(tokenValue));
						this.props.history.push('/');
			})
            .catch(error => {
				this.setState({error})
				let tokenKey = "logged";
				let tokenValue = false;
				window.localStorage.setItem(tokenKey, JSON.stringify(tokenValue));
				alert(error);
			});
			let firstname = this.refs.firstname.value;
			let surname = this.refs.surname.value;
			let idNum = this.refs.idNum.value;
			var information = {
			name:firstname, lastname:surname, idNum:idNum
		};
			var certificate = {};
			db().doc(email.toLowerCase()).set({
            information,certificate
        });
		})
            .catch(error => {
                this.setState({error})
		alert(error)
			});
		//	this.props.history.push('/login');
	
	}
	backTrack(){
		this.props.history.goBack();
	}
	render() {
    		return (
				<div class="bg-cover-image">
				<Bar /> 
				<div class="flex items-center h-screen w-full">
        		<div class="h-full w-full rounded font-fancy font-bold">
        			<h1 class="HotelHopperLogin w-full block text-white text-center justify-center mb-6">
        				Sign up to Alethia
        			</h1>

        			<form onSubmit={this.SignUp.bind(this)}>
        			<div class="flex flex-col mb-4 items-center">
            			<input class="Rectangle shadow appearance-none border border-purple-light rounded h-14 w-1/4 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            			id="email"  ref="email" type="text" placeholder="Enter Email"/>
        			</div>
        			<div class="flex flex-col mb-4 items-center">
            			<input class="Rectangle shadow appearance-none border border-purple-light rounded h-14 w-1/4 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            			id="password" ref="password"type="password" placeholder="******************"/>
        			</div>
					<div class="flex flex-col mb-4 items-center">
            			<input class="Rectangle shadow appearance-none border border-purple-light rounded h-14 w-1/4 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            			id="firstname" ref="firstname"type="text" placeholder="First Name"/>
        			</div>
					<div class="flex flex-col mb-4 items-center">
            			<input class="Rectangle shadow appearance-none border border-purple-light rounded h-14 w-1/4 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            			id="surname" ref="surname"type="text" placeholder="Last Name"/>
        			</div>
					<div class="flex flex-col mb-4 items-center">
            			<input class="Rectangle shadow appearance-none border border-purple-light rounded h-14 w-1/4 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            			id="idNum" ref="idNum"type="text" placeholder="Student ID Number"/>
        			</div>
        			<div class="flex items-center justify-center mb-6">
						<button onClick={() => this.backTrack()} class="Rectangle bg-transparent border border-white text-white hover:border-grey hover:text-grey font-bold py-2 px-4 md:mr-2 rounded" type="button">Cancel</button>
            			<input class="Rectangle cursor-pointer bg-transparent border border-white text-white hover:border-grey hover:text-grey font-bold py-2 px-4 md:ml-2 rounded" type="submit" value="Register" />
        			</div>
        			</form>
        		</div>     
        	</div>
			</div>
    );
  }

}
export default withRouter(RegisterForm);
