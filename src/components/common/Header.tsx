import React from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  title: string;
  rightBtn?: React.ReactNode;
};

const Header = ({ title, rightBtn }: HeaderProps) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <header className="flex justify-between py-3 border-b border-line-200">
      <div className="flex">
        <button onClick={handleBackClick} type="submit" className="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M16.7071 3.29289C17.0976 3.68342 17.0976 4.31658 16.7071 4.70711L9.41421 12L16.7071 19.2929C17.0976 19.6834 17.0976 20.3166 16.7071 20.7071C16.3166 21.0976 15.6834 21.0976 15.2929 20.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289Z"
              fill="#505050"
            />
          </svg>
        </button>
        <p className="text-base">{title}</p>
      </div>
      {rightBtn}
    </header>
  );
};
export default Header;