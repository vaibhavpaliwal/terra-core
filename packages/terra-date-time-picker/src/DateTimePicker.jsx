import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import DatePicker from 'terra-date-picker/src/DatePicker';
import TimeInput from 'terra-time-input/src/TimeInput';
import styles from './DateTimePicker.scss';
import DateTimeUtil from './DateTimeUtil';
import TimeClarification from './_TimeClarification';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * An array of ISO 8601 string representation of the dates to disable in the picker.
   */
  excludeDates: PropTypes.arrayOf(PropTypes.string),
  /**
   * A function that gets called for each date in the picker to evaluate which date should be disabled. A return value of true will be enabled and false will be disabled.
   */
  filterDate: PropTypes.func,
  /**
   * An array of ISO 8601 string representation of the dates to enable in the picker. All Other dates will be disabled.
   */
  includeDates: PropTypes.arrayOf(PropTypes.string),
  /**
   * Custom input attributes to apply to the date and time inputs. Use the name prop to set the name for the input. Do not set the name in inputAttribute as it will be ignored.
   */
  inputAttributes: PropTypes.object,
  /**
   * An ISO 8601 string representation of the maximum date time.
   */
  maxDateTime: PropTypes.string,
  /**
   * An ISO 8601 string representation of the minimum date time.
   */
  minDateTime: PropTypes.string,
  /**
   * Name of the date input. The name should be unique.
   */
  name: PropTypes.string.isRequired,
  /**
   * A callback function to execute when a valid date is selected or entered. The first parameter is the event. The second parameter is the changed date time value.
   */
  onChange: PropTypes.func,
  /**
   * A callback function to let the containing component (e.g. modal) to regain focus.
   */
  releaseFocus: PropTypes.func,
  /**
   * A callback function to request focus from the containing component (e.g. modal).
   */
  requestFocus: PropTypes.func,
  /**
   * An ISO 8601 string representation of the initial value to show in the date and time inputs.
   */
  value: PropTypes.string,
};

const defaultProps = {
  excludeDates: undefined,
  filterDate: undefined,
  includeDates: undefined,
  inputAttributes: undefined,
  maxDateTime: undefined,
  minDateTime: undefined,
  name: undefined,
  onChange: undefined,
  releaseFocus: undefined,
  requestFocus: undefined,
  value: undefined,
};

const keyCodes = {
  ARROWDOWN: 40,
};

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTime: DateTimeUtil.createSafeDate(props.value),
      isAmbiguousTime: false,
      isTimeClarificationNeeded: false,
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnClickOutside = this.handleOnClickOutside.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);

    this.handleDaylightSavingButtonClick = this.handleDaylightSavingButtonClick.bind(this);
    this.handleStandardTimeButtonClick = this.handleStandardTimeButtonClick.bind(this);
  }

  handleOnSelect(event, selectedDate) {
    this.requestFocus();

    // Our requirement is that ambiguous time should be checked when a date is selected from the picker.
    // If the date was entered manually, it should wait until losing focus to check for ambiguous time.
    // Due to react-datepicker invoking onSelect both when selecting a date from the picker as well as manually entering a valid date,
    // we need to check that the event type is not 'change' to indicate that onSelect was not invoked from a manual change.
    // See https://github.com/Hacker0x01/react-datepicker/issues/990
    if (event.type !== 'change') {
      const previousDateTime = this.state.dateTime.clone();
      const updatedDateTime = DateTimeUtil.updateDate(previousDateTime, selectedDate);
      if (previousDateTime.format() !== updatedDateTime.format()) {
        this.checkAmbiguousTime(updatedDateTime);
      }
    }
  }

  handleOnClickOutside() {
    this.requestFocus();
  }

  requestFocus() {
    // The picker will be dismissed and the focus will be released so that the containing component (e.g. modal) can regain focus.
    if (this.props.releaseFocus) {
      this.props.releaseFocus();
    }
  }

  handleOnBlur() {
    this.checkAmbiguousTime(this.state.dateTime.clone());
  }

  checkAmbiguousTime(dateTime) {
    const isDateTimeAmbiguous = DateTimeUtil.checkAmbiguousTime(dateTime);
    const isOldTimeAmbiguous = this.state.isAmbiguousTime;

    this.setState({
      isAmbiguousTime: isDateTimeAmbiguous,
      isTimeClarificationNeeded: isDateTimeAmbiguous && !isOldTimeAmbiguous,
    });
  }

  handleDateChange(event, date) {
    const previousDateTime = this.state.dateTime.clone();
    let updatedDateTime;

    if (date.length > 0) {
      updatedDateTime = DateTimeUtil.updateDate(previousDateTime, date);
    }

    this.handleChange(event, previousDateTime, updatedDateTime);
  }

  handleTimeChange(event, time) {
    if (time.length !== 5) {
      return;
    }

    const previousDateTime = this.state.dateTime.clone();
    const updatedDateTime = DateTimeUtil.updateTime(previousDateTime, time);

    this.handleChange(event, previousDateTime, updatedDateTime);
  }

  handleChange(event, oldDateTime, newDateTime) {
    if (event.keyCode === keyCodes.ARROWDOWN && oldDateTime.format() === newDateTime.format()) {
      newDateTime.add(-1, 'hours');
    }

    this.setState({
      dateTime: newDateTime,
    });

    if (this.props.onChange) {
      this.props.onChange(event, newDateTime.isValid() ? newDateTime.format() : '');
    }
  }

  handleDaylightSavingButtonClick() {
    this.setState({ isTimeClarificationNeeded: false });
  }

  handleStandardTimeButtonClick(event) {
    this.setState({ isTimeClarificationNeeded: false });
    const newDateTime = this.state.dateTime.clone();
    newDateTime.add(1, 'hour');

    this.handleChange(event, this.state.dateTime, newDateTime);
  }

  render() {
    const {
      inputAttributes,
      excludeDates,
      filterDate,
      includeDates,
      onChange,
      maxDateTime,
      minDateTime,
      name,
      requestFocus,
      releaseFocus,
      value,
      ...customProps
    } = this.props;

    const date = DateTimeUtil.formatMomentDateTime(this.state.dateTime, 'YYYY-MM-DD');
    const time = DateTimeUtil.formatMomentDateTime(this.state.dateTime, 'HH:mm');

    // const offsetButtonClasses = cx([
    //   'offset-facade',
    //   { 'offset-facade-hidden': this.state.isTimeClarificationNeeded },
    // ]);

    // const modalClasses = cx([
    //   'button',
    //   name,
    //   { 'is-time-clarification-opened': this.state.isTimeClarificationNeeded },
    // ]);

    const message = 'The time selected ('.concat(this.state.dateTime.format('HH:mm'), ') occurs during the transition from Daylight Saving Time to Standard Time. Would you like to enter this before or after the time change from Daylight Saving to Standard time?');

    return (
      <div {...customProps} className={cx('date-time-picker')}>
        <input
          // Create a hidden input for storing the name and value attributes to use when submitting the form.
          // The data stored in the value attribute will be the visible date in the date input but in ISO 8601 format.
          data-class="hidden-date-time-input"
          type="hidden"
          name={name}
          value={this.state.dateTime.format()}
        />

        <DatePicker
          onChange={this.handleDateChange}
          onSelect={this.handleOnSelect}
          onClickOutside={this.handleOnClickOutside}
          onBlur={this.handleOnBlur}
          excludeDates={excludeDates}
          filterDate={filterDate}
          includeDates={includeDates}
          inputAttributes={inputAttributes}
          maxDate={maxDateTime}
          minDate={minDateTime}
          selectedDate={date}
          name="hidden-date-input"
        />

        <div className={cx('time-facade')}>
          <TimeInput
            onBlur={this.handleOnBlur}
            onChange={this.handleTimeChange}
            inputAttributes={inputAttributes}
            name="hidden-time-input"
            value={time}
          />

          <TimeClarification
            isOpen={this.state.isTimeClarificationNeeded}
            isOffsetButtonHidden={!this.state.isAmbiguousTime}
            message={message}
            onDaylightSavingButtonClick={this.handleDaylightSavingButtonClick}
            onStandardTimeButtonClick={this.handleStandardTimeButtonClick}
            daylightSavingLabel="CDT"
            standardTimeLabel="CST"
          />
        </div>
      </div>
    );
  }
}

DateTimePicker.propTypes = propTypes;
DateTimePicker.defaultProps = defaultProps;

export default DateTimePicker;
