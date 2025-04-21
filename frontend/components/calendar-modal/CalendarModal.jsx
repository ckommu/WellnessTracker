import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './calendar-modal-styles.module.css';
import { IoMdClose } from "react-icons/io";

const CalendarModal = ({ show, handleClose, handleLogProgress, unit }) => { //
    const [selectedDate, setSelectedDate] = useState(null);
    const [progressValue, setProgressValue] = useState('');

    if (!show) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(selectedDate && progressValue) {
            const dateISO = new Date(selectedDate).toISOString();
            const valueNum = Number(progressValue);

            handleLogProgress({ 
                date: dateISO, 
                value: valueNum 
            });
            setSelectedDate(null);
            setProgressValue(''); 
            handleClose();
        } else {
            alert('Please select a date and enter a progress value.');
        }
    };
    
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={handleClose}>
                    <IoMdClose />
                </button>
                <div className={styles.calendar}>
                    <DatePicker 
                        selected={selectedDate} 
                        onChange={date => setSelectedDate(date)} 
                        inline
                    />
                </div>
                <div className={styles.modalText}>
                    <form onSubmit={handleSubmit} >
                        <label>Enter progress made {unit && `(${unit})`}: 
                            <input
                                type='number'
                                value={progressValue}
                                onChange={(e) => setProgressValue(e.target.value)}
                                required
                            />
                        </label>
                        <button type='submit'>
                            Log Progress
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CalendarModal;