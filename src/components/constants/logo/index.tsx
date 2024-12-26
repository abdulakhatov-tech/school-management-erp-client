import logo from '@/assets/icons/logo.svg';

interface LogoProps {
  size?: 'small' | 'medium' | 'large'; 
}

const Logo: React.FC<LogoProps> = ({
  size = 'large', 
}) => {
  const sizeClasses = {
    small: 'w-[36px] sm:w-[40px] md:w-[44px]',   // Small size
    medium: 'w-[70px] sm:w-[80px] md:w-[90px]',  // Medium size
    large: 'w-[80px] sm:w-[90px] sm:w-[100px] md:w-[110px]', // Large size
  };

  return <img src={logo} className={sizeClasses[size]} alt="Logo" />;
};

export default Logo;
