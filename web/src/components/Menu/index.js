import { useState, useRef } from 'react'
import { useClickOutside } from '../../utils/hooks'

import styles from './Menu.module.scss'

export default (props) => {
    const [state, setState] = useState(true)
    const menuRef = useRef(null)

    const onClickOutside = () => state && setState(false)
    useClickOutside(menuRef, onClickOutside)

    return <div className={styles.container}></div>
}
