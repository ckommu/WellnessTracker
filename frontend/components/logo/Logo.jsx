import LogoImg from '../../src/assets/logo.png';
import styles from './logo-styles.module.css';

const Logo = () => {

    return (
        <div className={styles.logoContainer}>
            <img src={LogoImg} className={styles.logo} />
        </div>
    );
};

export default Logo;