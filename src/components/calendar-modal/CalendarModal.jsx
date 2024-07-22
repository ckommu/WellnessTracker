import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './calendar-modal-styles.module.css';
import { IoMdClose } from "react-icons/io";

const CalendarModal = ({ show, handleClose }) => { //
    const [selectedDate, setSelectedDate] = useState(null);

    if (!show) {
        return null;
    }
    
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
                    <p>Hello I'm just testing shit</p>
                </div>
            </div>
        </div>
    )
}

export default CalendarModal;