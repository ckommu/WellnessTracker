import { SignInButton, SignedIn, SignedOut, UserButton, SignIn, UserProfile, SignOutButton } from '@clerk/clerk-react';
import logo from '../../assets/logo.png';
import styles from './auth-styles.module.css';

const Auth = () => {

    return (
        <div style={{marginTop: '5%'}}>
            <SignedOut>
                <div className={styles.authContainer}>
                    <img src={logo} className={styles.logo}/>
                    <SignIn />
                </div>
                
            </SignedOut>
            <SignedIn>
                <SignOutButton className={styles.signOutBtn}/>
                <UserProfile />
            </SignedIn>
        </div>
    );
};

export default Auth;