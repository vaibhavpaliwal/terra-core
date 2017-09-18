import React from 'react';
import Modal from 'terra-modal';
import Button from 'terra-button';

class ModalIsFullscreen extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div>
        <Modal
          ariaLabel="Fullscreen Modal"
          isOpen={this.state.isOpen}
          isFullscreen
          onRequestClose={this.handleCloseModal}
        >
          <div>
            <h1>Fullscreen Modal</h1>
            <br />
            <p>This modal will always take up the full screen.</p>
            <p />
            <br />
            <Button onClick={this.handleCloseModal} text="Close Modal" size="small" />
          </div>
        </Modal>
        <Button onClick={this.handleOpenModal} text="Open Modal" size="small" />
      </div>
    );
  }
}

export default ModalIsFullscreen;
