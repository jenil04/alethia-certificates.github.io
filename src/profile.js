
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
import { Button} from 'react-bootstrap';
import create from './Images/newCreate.png';
import './App.css';
import { withRouter } from 'react-router-dom';
import Bar from './bar';
import {user,db,entry} from './functions';
import logo from './headerIcon.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom';
class Profile extends React.Component {
	constructor(props){
    super(props);
    this.state = {
        inputField: '',
        data: '',
    };
}
onLoad = (e) => {

   	entry().get().then((doc) => {
        if (doc.exists) {
            let data = doc.data()['certificate'];
            this.setState({ data: data });
      //      console.log("Document data:", data);
        } else {
            // doc.data() will be undefined in this case
            this.setState({ data: null });
      //      console.log("No such document!");
        }
    })
}
offLoad = (e) => {
	this.setState({data: ''});
}
editCert = (e) => {
	this.props.history.push("/profile/editCert");
}
createCert = (e) => {
	this.props.history.push("/create");
}
downLoad= (e) => {
	html2canvas(document.querySelector("#certificate"),{ width: 892,
	height: 964
  }).then(canvas => {
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF({orientation:'p',unit:'px'});

		console.log(`canvas.width is ${canvas.width}`);
		console.log(`canvas.height is ${canvas.height}`)
		// console.log(imgData);
		console.log("second" + pdf.internal.pageSize.width);
		// var imgOffset = (pdf.internal.pageSize.width) / 8;
		// console.log("HMM" + imgOffset);
		pdf.addImage(imgData,'PNG',0,0,892,964,"a","FAST");
		pdf.save("certificate.pdf");
	});

}

	render() {
		
	//	console.log("This is the data", this.state.data);
		let dataUI = this.state.data;
	//	console.log(dataUI);
		var keys = Object.keys(dataUI);
		if(dataUI){
			if(keys.length == 0 || dataUI["name"] == '' || dataUI["surname"] == ''|| dataUI["units"] == ''|| dataUI["sigid"] == '' || dataUI["major"] == ''){
				return (
					<div class="flex items-center h-full " >
				<div class="container-xl h-full mx-auto pt-16 bg-transparent rounded">
	  				<h1 class=" font-fancy font-bold text-lg pl-20 text-white mb-4 ml-8 text-5xl "> Profile</h1>
					  <div class="text-center mb-8 border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded px-4 pt-8 flex flex-col justify-between leading-normal">
      <p class="text text-red font-fancy font-bold flex items-center">
       No certificate found associated with this account.
      </p>

    <div class="flex items-center">
      <div class="w-10 h-10 rounded-full mr-4"></div>
    </div>
  </div>
					 <button class="inline-block  mr-12 h-16 w-32 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.offLoad}>Close</button>
					 <button class="inline-block  ml-12 h-16 w-32 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.createCert}>Create</button>

					</div>
					</div>

				);
			}
			else{
			console.log("Inside", dataUI);
			let major = dataUI["major"];
			let fname = dataUI["name"];
			let lname = dataUI["surname"];
			let units = dataUI["units"];
			let sigid = dataUI["sigid"]
		//	console.log(fname);
			return (
				<div class="flex items-center h-full " >
				<div class="container-sm h-full mx-auto pt-16 bg-transparent rounded align-middle content-center items-center">

					<p class="w-full block text-white text-5xl font-fancy font-bold text-center justify-center pl-8 mb-10">
						Profile - Certificate
					</p>
					<div class="flex">
					<div id="hm" class="container-sm flex flex-col rounded border-4 ">
					<div id="certificate" class="w-auto align-center bg-white container-sm shadow-lg text-center font-fancy font-bold  px-8 pt-6 pb-8 m-auto">
						<div class="text text-xs mb-2"> This certificate is intended for verification purposes.</div>
						<div class="flex flex-col items-center mt-2 mb-8">
							<div class="w-1/2  border-b mt-2"/>
						</div>
						
						<div class="text text-3xl mb-2"> {fname} </div>
						
						<div class="text text-3xl mb-2"> {lname} </div>
						<div class="text text-xl mt-2 mb-8"> {major}</div>

						<div class="flex flex-col items-center">
						</div>
						<div class="flex flex-col items-center mt-2 mb-8">
							<div class="w-1/2  border-b mt-2"/>
						</div>
						<div class="text-base italic mb-14"> This certifies that the named individual's college degree is valid.</div>
						<img class="border rounded fill-current mr-2 " width="100" height="100" src={logo} />
					</div>
					
					</div>	
					<div class="mt-8 flex flex-col">
					<button class="inline-block ml-8 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.downLoad}>Download Certificate</button>
					<button class="inline-block ml-8 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.editCert}>Edit Certificate</button>
					<button class="inline-block ml-8 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.offLoad}>Close Certificate</button>

					</div>
					</div>
				</div>	
				</div>
				)	
		}
	}
	else{
    	return (
			<div class="flex items-center h-full " >
			<div class="container-xl h-full mx-auto pt-16 bg-transparent rounded">
	  	<h1 class=" mb-16 font-fancy font-bold text-lg pl-20 text-white mb-4 text-5xl "> Profile</h1>
		  <button class="inline-block ml-12 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.onLoad}>Display Certificate</button>
            
		</div>			

	</div>
	)	
	}}
}

export default withRouter(Profile);
