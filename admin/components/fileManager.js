'use strict'

import react from 'react';
import reactDOM from 'react-dom';

function fileManagerBuilder() {


function init (){
	reqImages()
}

function reqImages(){
	$.ajax({
		url:'/admin/upload',
	}).done(function(data){
		rend(data)
	})
}

function insertImage (url){
	$('#summernote').summernote('insertImage', url, function ($image) {
        $image.css('width', $image.width() / 3);
        $image.attr('data-filename', 'retriever');
    });
    $('#myModal').modal('hide');
}

function GetSingleImage(props){
	return (
		<div className="col-sm-6 col-md-4">
		    <img src={props.image.src} className="img-responsive" onClick={function(){insertImage(props.image.src)}} />
		 </div>
		)
}

function GetImage(props){
	let images = props.image,
	    list = [];
	images.forEach(function(image){
         list.push(<GetSingleImage image={image} />)
	})
	return (
		<div className="row">
             {list}
	    </div>               
	)
}


function GetImages(props){
	let listImages = [],
	    list = [],
	    length = listImages.length,
	    currentList = [];
		
        listImages.push(props.images)
	listImages.forEach(function(image, index){
        if(currentList.length !== 3){
		    currentList.push(image)
		} 
		if(currentList.length == 3){
			list.push(<GetImage image ={currentList} />);
			currentList = [];
		}	
    })
    return (
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">Image manager</h4>
                    </div>
                    <div className="modal-body">
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active"><a href="#images" aria-controls="images" role="tab" data-toggle="tab">Images</a></li>
                            <li role="presentation"><a href="#upload" aria-controls="upload" role="tab" data-toggle="tab">Upload image</a></li>
                        </ul>
                        <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="images">
                                    {list}                                
                                </div>
                                <div role="tabpanel" className="tab-pane" id="upload">
                                    <form id="my-form" action="/admin/upload-image" target="form_target" method="post" encType="multipart/form-data">
                                           <input id="image-upload" name="image" type="file" className="btn" />
                                           <input type="submit" className="btn btn-primary" value="Save" />
                                     </form>
                                </div> 
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function rend(data){
	reactDOM.render(
	 <GetImages images={data}/>,
	  document.getElementById('file-manager')
	)
}

return {
	init,
	rend
}

}

let fileManager = fileManagerBuilder()


export default fileManager
