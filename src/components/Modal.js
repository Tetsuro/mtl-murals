import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  constructor() {
    super();
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.el.classList.add('modal');
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    const modalRoot = document.getElementById('modal');
    modalRoot.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(
      children,
      this.el,
    );
  }
}

export default Modal;
