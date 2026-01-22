function deleteConfirm(id){
     // Close the modal
    const modal = document.getElementById('deleteModal');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();   
    
    // Perform the action here
    
    const url='/dealer/vehicle/delete/'+id;
    //console.log(url);
    window.location.href =url;


  };