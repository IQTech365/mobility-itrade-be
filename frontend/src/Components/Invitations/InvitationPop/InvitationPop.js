import React from 'react';
import 'bootstrap';

class InvitationPop extends React.Component{
    render(){
        return(
          <div>
   {/* Button trigger modal */} 
  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
    Event done
  </button>
  {/* Modal */} 
  <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="text-center">
            <img src="assets/images/check-circle.1.png" className="rounded" alt="..." style={{width: 100, height: 100}} />
          </div>
        </div>
        <h3 style={{textAlign: 'center'}}>Your Invitation has been<br />successfully added.</h3>
        <br />
        
      </div>
    </div>
  </div>
</div>

        )
    }
}

export default InvitationPop;