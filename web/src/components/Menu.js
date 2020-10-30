import { useState, useRef } from 'react'
import { useClickOutside } from '../utils/hooks'
import Link from 'next/link'
export default (props) => {

    const [state, setState] = useState(true)
    const menuRef = useRef(null)

    const onClickOutside = () => {
        if(state){
            setState(false)
        }
    }

    useClickOutside(menuRef, onClickOutside)


    return (
      <div className='menu-container' ref={menuRef}>
        <span className='menu-title' onClick={() => setState(!state)} >{props.title}</span>
        { state &&
        <ul className='menu-items'>
          {props.items.map(item => {
            return (
              <li className='menu-item'>
                <Link href={item.href}>
                <a href={item.href}>{item.label}</a>
                </Link>
              </li>
            )
          })}
        </ul>
        }
      </div>
    )
  }