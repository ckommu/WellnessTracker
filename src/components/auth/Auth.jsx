import { SignInButton, SignedIn, SignedOut, UserButton, SignIn } from '@clerk/clerk-react';
import logo from '../../assets/logo.png';
import styles from './auth-styles.module.css';

const Auth = () => {

    return (
        <div style={{ margin: '15%' }}>
            <SignedOut>
                <div className={styles.authContainer}>
                    <img src={logo} className={styles.logo}/>
                    <SignIn />
                </div>
                
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
};

export default Auth;