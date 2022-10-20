import { DOMcreateElement, DOMcreateFragment } from '../jsxutils/jsxFactory';
import './index.css';

const MyButton = () => {

  return (
    <>
      <button className="btn" onClick={() => { console.log('123') }}>123</button>
      <p>111</p>
    </>
  );

};

export default MyButton;