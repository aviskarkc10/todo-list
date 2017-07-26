import axios from 'axios';
import * as httpUtil from './httpUtil';

class Todo {


	
	constructor (){

		const BASE_URL = 'https://todo-simple-api.herokuapp.com';
		const TODO_URL = `${BASE_URL}/todos`;

		this.element =  document.createElement("div");
		this.element.setAttribute("id", "mainDiv");
		this.element.setAttribute("action", "");
		this.element.setAttribute("method", "post");
		this.pageForm = document.createElement("form");
		this.pageForm.setAttribute("name", "form");
		this.inputBox = document.createElement("input");
		this.inputBox.setAttribute("type", "text");
		this.inputBox.setAttribute("name", "title");
		this.btn = document.createElement("button");
		this.btn.innerHTML = "POST DATA";
		this.btn.setAttribute("type", "button");

		this.updateBtn = document.createElement("button");
		this.updateBtn.innerHTML = "UPDATE DATA";
		this.updateBtn.setAttribute("type", "button");
		this.updateBtn.style.display = "none"; 

		this.pageForm.appendChild(this.inputBox);
		this.pageForm.appendChild(this.btn);
		this.pageForm.appendChild(this.updateBtn);

		this.element.appendChild(this.pageForm);

		document.body.appendChild(this.element);

		this.value;

		

		this.btn.onclick = (e) => {

			e.preventDefault();
			this.value = this.pageForm.title.value;
			let data  = {
				"title": this.value
			}

			this.pageForm.title.value="";

			this.post(TODO_URL, data);


		};



		httpUtil.get(TODO_URL).then(response => {

			 response.data.data.forEach((todo) => {


			 	this.displayResults(todo.id, todo.title, TODO_URL);
			    

			  });
		});
	}

	displayResults(id, title, url) {

		let dataDiv = document.createElement('div');
		dataDiv.id=id;
		dataDiv.setAttribute("class", "dataDiv");

	    let dataContainer = document.createElement('div');
	    dataContainer.innerHTML = title;
	    dataContainer.id = "dataContainer-"+dataDiv.id;
	    dataContainer.setAttribute("class", "dataContainer");


		let delBtn = document.createElement("button");
		delBtn.setAttribute("type", "button");
		delBtn.setAttribute("name", "delete");
		delBtn.setAttribute("id",id);
		delBtn.innerHTML = "DELETE"; 
		delBtn.value=id;
		delBtn.onclick = () =>	this.removeData(delBtn.value, url);


	    let updateBtn = document.createElement("button");
	    updateBtn.setAttribute("type", "button");
	    updateBtn.setAttribute("name", "delete");
	    updateBtn.innerHTML = "UPDATE"; 
	    updateBtn.value=id;
	    updateBtn.onclick = () =>	this.updateReady(id, title, url);

	    document.getElementById("mainDiv").appendChild(dataDiv);
	   	document.getElementById(dataDiv.id).appendChild(dataContainer);
	   	document.getElementById(dataDiv.id).appendChild(delBtn);	
	   	document.getElementById(dataDiv.id).appendChild(updateBtn);
	   	document.getElementById(dataDiv.id).appendChild(updateBtn);

	}

	removeData(dataId, url){
		httpUtil.remove(url, dataId).then(response => {
			
			document.getElementById("mainDiv").removeChild(document.getElementById(dataId));
		});



	}

	updateReady(dataId, title, TODO_URL) {
		
		this.value=title;
		this.id=dataId;
		// httpUtil.get(urlId).then(response => {
		// 	this.value = response.data.data.title;
		// 	this.id=response.data.data.id;
		// });
		this.pageForm.title.value=this.value;
		this.updateBtn.style.display="inline";
		this.btn.style.display="none";


		this.updateBtn.onclick = (e) => {

			e.preventDefault();
			this.value = this.pageForm.title.value;
			let data  = {
				"title": this.value
			}

			this.pageForm.title.value="";

			this.updateData(TODO_URL, this.id, data);

			this.btn.style.display="inline";
			this.updateBtn.style.display="none";



		};
		
	}

	updateData(url, id, data) {

		httpUtil.put(url, id, data).then(response => {
			console.log(response.data.data.title);
			console.log(response.data.data.id);
			let temp="dataContainer-"+response.data.data.id;
			document.getElementById(temp).innerHTML = response.data.data.title;
			// this.displayResults(response.data.data.id, response.data.data.title, url)
			
		});
		
	}

	post(TODO_URL, data) {
		httpUtil.post(TODO_URL, data).then(response => {
			
			this.displayResults(response.data.data.id, response.data.data.title, TODO_URL);
			
		});
	}
}

let todo =  new Todo();