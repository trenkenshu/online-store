import React from 'react';
import '../scss/Button.scss'
function Button (props:{name:string}) {
  return (
    <button className="btn">{props.name}</button>
  )
}
export default Button;