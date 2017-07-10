import react from 'react';
import reactDOM from 'react-dom';



function Test (){
       Fetch()
		return(
         <h1>'asdsadsadsa'</h1>
	)
	
}

function Fetch(){
	fetch(`/admin/test-page`, {
		method:'GET'
	})
	.then(function(res){
		return res.json
	})
	.then(function(r){
		console.log(r)
	})
}


function rend(){
	reactDOM.render(
	 <Test/>,
	 document.getElementById('root')
	)
}

$(document).ready(function () {
  rend()
});

