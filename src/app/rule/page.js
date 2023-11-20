'use client';
import { useState } from "react"
import './index.css'

export default () => {
    const [ruleData, setRuleData] = useState({ fromURL: {value: null, error: null}, toURL: {value: null, error: null}})
    const errorMessages = {
        fromURL: {
            required: 'This field is required',
            validURL: 'Please enter a valid URL'
        },
        toURL: {
            required: 'This field is required',
            validURL: 'Please enter a valid URL'
        },
    }
    const isValidURL = (url = '') => {
        try {
            const obj = new URL(url)
            return true;
        } catch (e) {
            return false;
        }
    }
    const setErrorFocus = (fieldId) => {
        const focusEle = document.querySelector(`#${fieldId}`);
    
        if (focusEle) {
            focusEle.focus();
        }
    }

    const setFieldData = (field, value, error = null) => {
        setRuleData((prevData) => ({...prevData, [field]: {value, error}}))
    }
    const handleChange = (e, field) => {
        const value = e.target.value;
        if (value) {
            if (isValidURL(value)) {
                setFieldData(field, value)
            } else {
                setFieldData(field, value, 'validURL')
            }
        } else {
            setFieldData(field, value, 'required')
        }
    }
    const handleUpdate = () => {
        const { value:fromURLValue } = ruleData.fromURL;
        const { value:toURLValue } = ruleData.toURL;
        if (fromURLValue) {
            if (!isValidURL(fromURLValue)) {
                setFieldData('fromURL', fromURLValue, 'validURL')
                setErrorFocus('fromURL')
                return;
            }
        } else {
            setFieldData('fromURL', fromURLValue, 'required')
            setErrorFocus('fromURL')
            return;
        }

        if (toURLValue) {
            if (!isValidURL(toURLValue)) {
                setFieldData('toURL', toURLValue, 'validURL')
                setErrorFocus('toURL')
                return;
            }
        } else {
            setFieldData('toURL', toURLValue, 'required')
            setErrorFocus('toURL')
            return;
        }

        console.log("Updation successful!");

        
    }
    return (
        <div>
            <div className='rule-section'>
                <div className='field-section'>
                    <label name="from">
                        <input type="text" id="fromURL" className='input' placeholder='From URL' onInput={(e) => handleChange(e, 'fromURL')} required></input>
                    </label> <br />
                    {
                        (ruleData.fromURL.error) && <span className='error-message'>{errorMessages.fromURL[ruleData.fromURL.error]}</span>
                    }
                    
                </div>

                <div className='field-section'>
                    <label name="to">
                        <input type="text" id="toURL" className='input' placeholder='To URL' required onInput={(e) => handleChange(e, 'toURL')}></input>
                    </label> <br />
                    {
                        (ruleData.toURL.error) && <span className='error-message'>{errorMessages.fromURL[ruleData.toURL.error]}</span>
                    }
                </div>
                <button className='update-button' 
                    onClick={handleUpdate}    
                >
                    Create/ Update
                </button>
            </div>

        </div>
    )
}