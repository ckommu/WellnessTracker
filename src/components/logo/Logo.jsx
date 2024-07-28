import LogoImg from '../../assets/logo.png';
import styles from './logo-styles.module.css';

const Logo = () => {

    return (
        <div className={styles.logoContainer}>
            <img src={LogoImg} style={{ width: '50%' }} />
        </div>
    );
};

export default Logo;