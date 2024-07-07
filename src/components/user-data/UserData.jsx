import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const UserData = () => {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            fetch('https://02cc-2600-1702-17b0-a230-7e9b-d403-e3e2-d237.ngrok-free.app/api/saveUserData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user.id,
                    username: user.username,
                    profileImageUrl: user.profileImageUrl,
                    email: user.primaryEmailAddress.emailAddress,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    createdAt: user.createdAt,
                }),
            }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error: ', error));
        }
    }, [user]);

    return (
        <div>
            <h1>Welcome, {user?.firstName}!</h1>
        </div>
    );
};

export default UserData;