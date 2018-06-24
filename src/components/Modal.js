import React from 'react';
import ReactDOM from 'react-dom';


class Modal extends React.Component {
  constructor() {
    super();
    this.el = document.createElement('div');
  }

  componentDidMount() {
    console.log("mount modal!")
    this.el.classList.add('modal');
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    console.log("unmount modal!")
    const modalRoot = document.getElementById('modal');
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default Modal;