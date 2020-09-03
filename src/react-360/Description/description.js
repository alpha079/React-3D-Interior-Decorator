import React, {useState} from 'react';
import styled, { css} from 'styled-components'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './description.css'
import $ from 'jquery';

// const ToggleModal = () =>{
//   $("#myModal").modal('show');
// }

// $(".btn").click(function(){
//   $("#myModal").modal('show');
// });

export const DescriptionButton = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

    return (
        <React.Fragment>
        <UpperRight>
            <button type="button" className="btn bg-transparent"  onClick={toggle}  ><img src="/assests/about.png" alt="about" width="50" /></button>
            <Modal isOpen={modal} toggle={toggle} >
              <ModalHeader toggle={toggle}><b>About</b></ModalHeader>
              <ModalBody>
              <p>
              This is an interior visualization demo. It aims to illustrate how <strong>WebGL</strong> and <strong>WebVR</strong> offer new ways to showcase and customize products on the Web.
            </p>
            <p>
              This demo features physically-based materials to accurately represent surfaces and objects. Since it's running in real-time 3D, you are able to inspect objects from every angle, and even customize their appearance. For the most immersive experience, you can view it in VR in your browser.
            </p>
            <p>
              We created this project from the ground up. All of the following was done by our studio: UX/UI design, 3D modeling and texturing, WebGL and web development.
            </p>
            <p>
              Interested in hiring us to build something awesome? <a href="/cdn-cgi/l/email-protection#0c64696060634c6065787860697b637e677f64637c226a7e"><strong>Get in touch</strong></a>.
            </p>
            </ModalBody>
              
          </Modal>
            
        </UpperRight>
        {/* <div className="modal right fade" id="myModal" tabIndex="-1"  role="dialog" aria-labelledby="myModalLabel2">
        <div className="modal-dialog" role="document">
            <div className="modal-content">

                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel2">ABOUT</h4>
                </div>

                <div className="modal-body">
                <p>
              This is an interior visualization demo. It aims to illustrate how <strong>WebGL</strong> and <strong>WebVR</strong> offer new ways to showcase and customize products on the Web.
            </p>
            <p>
              This demo features physically-based materials to accurately represent surfaces and objects. Since it's running in real-time 3D, you are able to inspect objects from every angle, and even customize their appearance. For the most immersive experience, you can view it in VR in your browser.
            </p>
            <p>
              We created this project from the ground up. All of the following was done by our studio: UX/UI design, 3D modeling and texturing, WebGL and web development.
            </p>
            <p>
              Interested in hiring us to build something awesome? <a href="/cdn-cgi/l/email-protection#0c64696060634c6065787860697b637e677f64637c226a7e"><strong>Get in touch</strong></a>.
            </p>
                </div>

            </div>
        </div>
    </div> */}
    </React.Fragment>
    )
}

const base = css`
  font-family: 'Teko', sans-serif;
  position: absolute;
  text-transform: uppercase;
  font-weight: 900;
  font-variant-numeric: slashed-zero tabular-nums;
  line-height: 1em;
  pointer-events: none;
  color: white;
`

const UpperRight = styled.div`
  ${base}
  text-align: right;
  top: 40px;
  right: 50px;
  font-size: 2em;

  pointer-events: all;
  cursor: pointer;
  & > a {
    color: indianred;
    text-decoration: none;
  }
  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`