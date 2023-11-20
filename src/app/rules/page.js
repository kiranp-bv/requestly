'use client';
import Switch from '../components/Switch'
import './index.css'
import 'material-icons/iconfont/material-icons.css'
import { useState } from 'react'
export default () => {
    const [blockEdit, setBlockEdit] = useState(true) 
    const [redirectEdit, setRedirectEdit] = useState(false) 

    const handleEditHover = (type, hover) => {
        switch(type) {
            case 'block':
                setBlockEdit(hover)
                break;
            case 'redirect':
                setRedirectEdit(hover)
                break;
        }
    }
    return (
        <div>
            <div className='main-section'>
                <div className='switch-section'>
                    <Switch/>
                </div>
                <div className='rules-section'>
                    <div className='redirect rule-section' onMouseEnter={() => handleEditHover('redirect', true)} onMouseLeave={() => handleEditHover('redirect', false)}>
                        <span className='rule-label'>
                            Redirect
                        </span>
                        {
                            redirectEdit &&
                            <span className="material-icons edit-icon">edit</span>

                        }
                    </div>
                    <div className='block rule-section' onMouseEnter={() => handleEditHover('block', true)} onMouseLeave={() => handleEditHover('block', false)}>
                        <span className='rule-label'>
                            Block
                        </span>
                        {
                            blockEdit &&
                            <span className="material-icons edit-icon">edit</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}