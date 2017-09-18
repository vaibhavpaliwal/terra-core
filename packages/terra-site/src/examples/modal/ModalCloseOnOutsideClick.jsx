import React from 'react';
import Modal from 'terra-modal';
import Button from 'terra-button';

class ModalCloseOnOutsideClick extends React.Component {
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
          ariaLabel="Modal disable close on outside click"
          isOpen={this.state.isOpen}
          closeOnOutsideClick={false}
          onRequestClose={this.handleCloseModal}
        >
          <div>
            <h1>Modal disable close on outside click</h1>
            <br />
            <p>You can close the modal by:</p>
            <ul>
              <li>- Pressing the ESC key</li>
              <li>- Clicking on the close button</li>
            </ul>
            <br />
            <Button onClick={this.handleCloseModal} text="Close Modal" size="small" />
          </div>
        </Modal>
        <Button onClick={this.handleOpenModal} text="Open Modal" size="small" />
      </div>
    );
  }
}

export default ModalCloseOnOutsideClick;
