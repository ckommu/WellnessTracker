import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Auth = () => {

    return (
        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
};

export default Auth;