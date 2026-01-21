import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 active:scale-95 relative overflow-hidden disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-peach-text text-white hover:bg-peach-accent hover:shadow-xl hover:shadow-peach-accent/20 border border-transparent",
    outline: "border border-peach-text/20 text-peach-text bg-transparent hover:border-peach-text hover:bg-peach-text hover:text-white",
    white: "bg-white text-peach-text hover:bg-gray-50 shadow-md border border-gray-100",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Advanced Shine effect for Primary buttons */}
      {variant === 'primary' && (
        <span className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:animate-shine z-0 pointer-events-none">
          <span className="relative h-full w-12 bg-white/20 blur-sm" />
        </span>
      )}
      <span className="relative z-10 flex items-center justify-center w-full">{children}</span>
    </button>
  );
};