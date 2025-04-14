import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './challenge-creator-styles.module.css';
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

const ChallengeCreator = () => {
    const [activeToggle, setActiveToggle] = useState(false);

    const handleToggle = () => {
        setActiveToggle(!activeToggle);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted'); // Log to ensure function is called

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());
        payload.active = activeToggle;

        console.log('Payload:', payload); // Log payload data

        try {
            const response = await fetch('http://localhost:5000/challenge', { // Update to localhost:5000
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('SOMETHING WENT WRONG D:');
            }

            const responseData = await response.json();
            console.log('Challenge created: ', responseData);
        } catch (err) {
            console.error('Error creating challenge :(((', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}> {/* Ensure onSubmit is here */}
                    <Form.Group>
                        <Form.Control
                            type='text'
                            name='title'
                            placeholder='Title'
                            className={`${styles.titleBox} ${styles.formGroup}`}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            name='description'
                            placeholder='Description'
                            className={`${styles.descriptionBox} ${styles.formGroup}`}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type='date'
                            name='startDate'
                            className={`${styles.startDateBox} ${styles.formGroup}`}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type='date'
                            name='endDate'
                            className={`${styles.endDateBox} ${styles.formGroup}`}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            name='units'
                            placeholder='Units (e.g. steps, reps, etc.)'
                            className={`${styles.unitsBox} ${styles.formGroup}`}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={styles.formGroup}>Set to Active? </Form.Label>
                        <span onClick={handleToggle} className={`${styles.toggleBtn}`}>
                            {activeToggle ? <BsToggleOn size={40} color='#5BC246'/> : <BsToggleOff size={40} color='#A40000'/>}
                        </span>
                    </Form.Group>
                    <Form.Group>
                        <button type='submit'>Create Challenge</button>
                    </Form.Group>
                </form>
            </div>
        </div>
    );
};

export default ChallengeCreator;
