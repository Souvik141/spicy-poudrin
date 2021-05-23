import {useState} from "react"
import logo from '../spicy-poudrin.svg'
import reactLogo from '../react-logo.png'

export default function Header(props) {
    console.log(logo);
  return (
    <div className='header'>
        <div className='container header-container'>
            <div className='logo'>
                <img className='react-logo' src={reactLogo}/>
                <img className='logo' src={logo}/>
            </div>
            <div className='searchbox'>
                <input type='text' placeholder='Search for nothing' />
                <input type='submit' value='Search' />
            </div>
            <div className='unique'>
                <input type='button' value='|||' />
            </div>
        </div>
    </div>
  )
}