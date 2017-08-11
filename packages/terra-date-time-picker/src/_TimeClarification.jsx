import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Modal from 'terra-modal';
import Button from 'terra-button';
import Header from 'terra-clinical-header';
import styles from './_TimeClarification.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * If set to true, the modal will rendered as opened
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * If set to true, the button to open the modal will be hidden.
   */
  isOffsetButtonHidden: PropTypes.bool.isRequired,
  /**
   * The message to show in the dialog.
   */
  message: PropTypes.string.isRequired,
  /**
   * Callback function indicating the before time change option was selected.
   */
  onDaylightSavingButtonClick: PropTypes.func.isRequired,
  /**
   * Callback function indicating the after time change option was selected.
   */
  onStandardTimeButtonClick: PropTypes.func.isRequired,
  /**
   * The daylight savings label to display on the button
   */
  daylightSavingLabel: PropTypes.string.isRequired,
  /**
   * Callback function indicating the after time change option was selected.
   */
  standardTimeLabel: PropTypes.string.isRequired,

};

const defaultProps = {
  isOpen: false,
  isOffsetButtonHidden: false,
  message: null,
  onDaylightSavingButtonClick: undefined,
  onStandardTimeButtonClick: undefined,
  daylightSavingLabel: null,
  standardTimeLabel: null,
};

class TimeClarification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
      offsetDisplay: '',
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDaylightSavingButtonClick = this.handleDaylightSavingButtonClick.bind(this);
    this.handleStandardTimeButtonClick = this.handleStandardTimeButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps === this.props) {
      return;
    }

    this.setState({
      isOpen: nextProps.isOpen,
    });
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleDaylightSavingButtonClick(event) {
    this.handleCloseModal();

    this.setState({ offsetDisplay: this.props.daylightSavingLabel });

    if (this.props.onDaylightSavingButtonClick) {
      this.props.onDaylightSavingButtonClick(event);
    }
  }

  handleStandardTimeButtonClick(event) {
    this.handleCloseModal();

    this.setState({ offsetDisplay: this.props.standardTimeLabel });

    if (this.props.onStandardTimeButtonClick) {
      this.props.onStandardTimeButtonClick(event);
    }
  }

  render() {
    if (this.props.isOffsetButtonHidden) {
      this.state.offsetDisplay = '';
    }

    const offsetButtonClassNames = cx([
      'offset-button',
      // { 'offset-button-hidden': this.props.isOffsetButtonHidden },
      { 'offset-button-hidden': this.props.isOffsetButtonHidden || !this.state.offsetDisplay },
    ]);

    const timeClarificationButtons = cx([
      'time-clarification-buttons',
    ]);

    return (
      <div>
        <Modal
          ariaLabel="Time Clarification"
          isOpen={this.state.isOpen}
          onRequestClose={this.handleCloseModal}
          closeOnEsc={false}
          closeOnOutsideClick={false}
        >
          <div>
            <Header title="Time Clarification" />
            <br />
            <div className={cx(['time-clarification-body'])}>
              <p>{this.props.message}</p>
            </div>
            <br />
            <br />
            <div className={timeClarificationButtons}>
              <Button
                onClick={this.handleDaylightSavingButtonClick}
                variant="primary"
                className={cx(['time-clarification-button'])}
              >
                Before (Daylight Saving)
              </Button>
              <Button
                onClick={this.handleStandardTimeButtonClick}
                variant="primary"
                className={cx(['time-clarification-button'])}
              >
                After (Standard Time)
              </Button>
            </div>
            <br />
            <br />
          </div>
        </Modal>
        <Button
          className={offsetButtonClassNames}
          onClick={this.handleOpenModal}
          type="button"
          text={this.state.offsetDisplay}
          isCompact
        />
      </div>
    );
  }
}

TimeClarification.propTypes = propTypes;
TimeClarification.defaultProps = defaultProps;

export default TimeClarification;
