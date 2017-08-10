'use strict'

import react from 'react';
import reactDOM from 'react-dom';

function fileManagerBuilder() {

function reqImages(){
	$.ajax({
		url:'/admin/images',
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

function ModalHeader(){
	return (
	    <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">Image manager</h4>
        </div>
	)
}

function ModalFooter(){
	return(
	    <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
        </div>
	)
}

function GetImages(props){
	let images = props.images || [],
	    list = [],
	    currentList = [];

	while(images.length > 0){
	    currentList.push(images.splice(0, 3))
	}

    currentList.forEach(function(arrImages){
      	list.push(<GetImage image={arrImages} />);
    })

    return (
    <div className="modal-root">
        <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" onClick={reqImages}>File manager</button>
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <ModalHeader />
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
                                    <form id="my-form" action="/admin/images/upload" target="form_target" method="post" encType="multipart/form-data">
                                           <input id="image-upload" name="image" type="file" className="btn" />
                                           <input type="submit" className="btn btn-primary" value="Save" />
                                     </form>
                                </div> 
                        </div>
                    </div>
                    <ModalFooter />
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
rend
}

}

let fileManager = fileManagerBuilder()

export default fileManager 
