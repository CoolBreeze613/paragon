import classNames from 'classnames';
import { nonNegativeInteger } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';


export default class ListBox extends React.Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      selectedOptionIndex: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { selectedOptionIndex } = nextProps;

    if (this.shouldUpdateSelectedOptionIndex(selectedOptionIndex)) {
      this.setState({
        selectedOptionIndex,
      });
    }
  }

  onFocus() {
    // if no ListBoxOption is selected, select first ListBoxOption on ListBox focus
    if (!this.state.selectedOptionIndex) {
      this.setState({
        selectedOptionIndex: 0,
      });
    }
  }

  onKeyDown(e) {
    switch (e.key) {
      case 'ArrowDown': {
        // prevent scrolling entire modal body with arrow keys
        e.preventDefault();
        if (this.state.selectedOptionIndex < React.Children.count(this.props.children) - 1) {
          this.setState(state => ({
            selectedOptionIndex: state.selectedOptionIndex + 1,
          }));
        }
        break;
      }
      case 'ArrowUp': {
        // prevent scrolling entire modal body with arrow keys
        e.preventDefault();

        if (this.state.selectedOptionIndex > 0) {
          this.setState(state => ({
            selectedOptionIndex: state.selectedOptionIndex - 1,
          }));
        }
        break;
      }
      default:
    }
  }

  shouldUpdateSelectedOptionIndex(selectedOptionIndex) {
    return selectedOptionIndex !== this.state.selectedOptionIndex
      && selectedOptionIndex !== undefined;
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child, index) =>
      React.cloneElement(child, {
        index,
        isSelected: index === this.state.selectedOptionIndex,
        onSelect: () => { this.setState({ selectedOptionIndex: index }); child.props.onSelect(); },
      }));
  }

  render() {
    const {
      children,
      className,
      selectedOptionIndex,
      tag,
      ...other
    } = this.props;

    return React.createElement(
      this.props.tag,
      {
        'aria-activedescendant': this.state.selectedOptionIndex === null ? null : `list-box-option-${this.state.selectedOptionIndex}`,
        className: classNames(['list-group', this.props.className]),
        onFocus: this.onFocus,
        onKeyDown: this.onKeyDown,
        role: 'listbox',
        tabIndex: 0,
        ...other,
      },
      this.renderChildren(),
    );
  }
}

ListBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  selectedOptionIndex: nonNegativeInteger,
  tag: PropTypes.string,
};

ListBox.defaultProps = {
  className: undefined,
  selectedOptionIndex: undefined,
  tag: 'div',
};
