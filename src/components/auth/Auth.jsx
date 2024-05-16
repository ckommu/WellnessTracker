import { SignInButton, SignedIn, SignedOut, UserButton, SignIn } from '@clerk/clerk-react';
import styles from './auth-styles.module.css';

const Auth = () => {

    return (
        <div style={{ margin: '15%' }}>
            <SignedOut>
                <SignIn />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
};

export default Auth;