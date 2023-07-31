import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../index.css';

interface ApiResponse {
  center: {
    memberCount: number;
    myMemberCount: number;
    staffCount: number;
  };
  mySchedule: {
    counselingCount: number;
    lessonCount: number;
  };
  message: string;
}

function Main() {
  const planStatus: string = '플랜 이용중';
  const accessToken = localStorage.getItem('accessToken');
  const [data, setData] = useState<ApiResponse | null>(null);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/me/summary`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      });
  }, [accessToken]);

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => {
  //       axios
  //         .post(
  //           `${import.meta.env.VITE_API_URL}/tokens`,
  //           {},
  //           {
  //             headers: {
  //               accept: 'application/json',
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           },
  //         )
  //         .then((response) => {
  //           localStorage.setItem('accessToken', response.data.accessToken);
  //           localStorage.setItem('refreshToken', response.data.refreshToken);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     },
  //     15 * 60 * 1000,
  //   );

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [accessToken]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(`search for "${inputValue}"`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  return (
    <div>
      {data && (
        <>
          <header className="flex">
            <h1>
              <svg width="54" height="18" viewBox="0 0 54 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M36.0146 0C35.8691 0 35.751 0.118297 35.751 0.264224V4.83547L37.6006 2.9859V0.264224C37.6006 0.118297 37.4814 0 37.3359 0H36.0146Z"
                  fill="#2D62EA"
                />
                <path
                  d="M44.168 4.82837H53.8535C53.9346 4.82837 54 4.89389 54 4.97471V6.62941C54 6.71023 53.9346 6.77575 53.8535 6.77575H50.0811V17.361C50.0811 17.4418 50.0156 17.5073 49.9346 17.5073H48.0713C47.9902 17.5073 47.9238 17.4418 47.9238 17.361V6.77575H44.1699C44.0879 6.77575 44.0225 6.71032 44.0225 6.62955L44.0205 4.97485C44.0205 4.89398 44.0859 4.82837 44.168 4.82837Z"
                  fill="#2D62EA"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 4.97734C0 4.89652 0.0664062 4.831 0.147461 4.831H5.43848C6.3125 4.831 7.02734 4.95976 7.5791 5.21338C8.13184 5.46894 8.55664 5.78889 8.85645 6.17126C9.15625 6.55364 9.35938 6.97308 9.46973 7.42569C9.57812 7.87829 9.63379 8.29578 9.63379 8.68011C9.63379 9.06444 9.58008 9.47802 9.46973 9.92673C9.35938 10.3735 9.15625 10.789 8.85645 11.1733C8.55664 11.5557 8.13184 11.8737 7.5791 12.1234C7.02539 12.3731 6.3125 12.498 5.43848 12.498H2.15723V17.3631C2.15723 17.4439 2.0918 17.5095 2.01074 17.5095H0.147461C0.0664062 17.5095 0 17.4439 0 17.3631V4.97734ZM2.15723 10.7207H5.31836C5.56055 10.7207 5.80762 10.6856 6.06152 10.6154C6.31445 10.5452 6.5459 10.432 6.76074 10.2759C6.97363 10.1199 7.14551 9.90917 7.2793 9.6497C7.41016 9.38828 7.47852 9.06053 7.47852 8.6645C7.47852 8.26847 7.41992 7.92121 7.30664 7.65394C7.19043 7.38667 7.03516 7.17402 6.83984 7.01795C6.64453 6.86188 6.4209 6.75458 6.16699 6.69605C5.91406 6.63753 5.64355 6.60826 5.35547 6.60826H2.15723V10.7207Z"
                  fill="#2D62EA"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.75 17.511C13.0498 17.511 12.4258 17.401 11.8779 17.1809C11.3291 16.9608 10.8662 16.6577 10.4893 16.2698C10.1094 15.8838 9.82324 15.4219 9.62598 14.8843C9.42871 14.3467 9.33008 13.7568 9.33008 13.1127C9.33008 12.4687 9.42871 11.8932 9.62598 11.3574C9.82324 10.8198 10.1113 10.3579 10.4893 9.97186C10.8662 9.58579 11.3291 9.2827 11.8779 9.06081C12.4258 8.84071 13.0498 8.73066 13.75 8.73066C14.4492 8.73066 15.0732 8.84071 15.6221 9.06081C16.1699 9.2809 16.6328 9.58398 17.0098 9.97186C17.3877 10.3579 17.6758 10.8198 17.873 11.3574C18.0703 11.895 18.1689 12.4795 18.1689 13.1127C18.1689 13.7459 18.0703 14.3485 17.873 14.8843C17.6758 15.4219 17.3877 15.8838 17.0098 16.2698C16.6309 16.6559 16.168 16.9608 15.6221 17.1809C15.0752 17.401 14.4492 17.511 13.75 17.511ZM13.75 16.0606C14.1787 16.0606 14.5518 15.974 14.8672 15.8026C15.1836 15.6312 15.4434 15.4057 15.6465 15.1261C15.8496 14.8464 15.999 14.5325 16.0957 14.1843C16.1904 13.8362 16.2402 13.4789 16.2402 13.1127C16.2402 12.7465 16.1924 12.4037 16.0957 12.0501C15.999 11.6965 15.8516 11.3808 15.6465 11.1084C15.4434 10.8342 15.1836 10.6123 14.8672 10.4391C14.5498 10.2677 14.1787 10.1811 13.75 10.1811C13.3213 10.1811 12.9473 10.2677 12.6328 10.4391C12.3154 10.6105 12.0557 10.8342 11.8525 11.1084C11.6494 11.3826 11.5 11.6965 11.4033 12.0501C11.3066 12.4037 11.2588 12.7591 11.2588 13.1127C11.2588 13.4663 11.3066 13.8343 11.4033 14.1843C11.498 14.5343 11.6484 14.8482 11.8525 15.1261C12.0557 15.4057 12.3154 15.6312 12.6328 15.8026C12.9492 15.974 13.3213 16.0606 13.75 16.0606Z"
                  fill="#2D62EA"
                />
                <path
                  d="M19.2988 8.73066C19.2178 8.73066 19.1514 8.79618 19.1514 8.877V17.3647C19.1514 17.4455 19.2178 17.511 19.2988 17.511H20.9688C21.0498 17.511 21.1152 17.4455 21.1152 17.3647V8.877C21.1152 8.79618 21.0498 8.73066 20.9688 8.73066H19.2988Z"
                  fill="#2D62EA"
                />
                <path
                  d="M24.4521 9.82693V8.64862C24.4521 8.56779 24.3857 8.50228 24.3047 8.50228H22.7393C22.6582 8.50228 22.5918 8.56779 22.5918 8.64862V17.3632C22.5918 17.444 22.6582 17.5095 22.7393 17.5095H24.4131C24.4941 17.5095 24.5596 17.444 24.5596 17.3632V12.1953C24.5596 11.8715 24.6104 11.5632 24.7148 11.2725C24.8174 10.9838 24.9619 10.7302 25.1455 10.5156C25.3291 10.301 25.5537 10.1313 25.8184 10.0103C26.0811 9.88741 26.3809 9.82693 26.7158 9.82693C27.3037 9.82693 27.7344 9.9869 28.0107 10.3069C28.2871 10.6248 28.4365 11.1399 28.46 11.8481V17.3632C28.46 17.444 28.5254 17.5095 28.6064 17.5095H30.2803C30.3613 17.5095 30.4277 17.444 30.4277 17.3632V11.3252C30.4277 10.3029 30.1455 9.53625 29.5811 9.02512C29.0166 8.51398 28.2451 8.25842 27.2666 8.25842C26.6787 8.25842 26.1436 8.40083 25.6602 8.68566C25.1768 8.97049 24.7861 9.36262 24.4863 9.86205L24.4521 9.82693Z"
                  fill="#2D62EA"
                />
                <path
                  d="M21.1143 5.80462C21.1143 6.34343 20.6748 6.78022 20.1328 6.78022C19.5898 6.78022 19.1504 6.34343 19.1504 5.80462C19.1504 5.26582 19.5898 4.82903 20.1328 4.82903C20.6748 4.82903 21.1143 5.26582 21.1143 5.80462Z"
                  fill="#2D62EA"
                />
                <path
                  d="M42.1709 6.68513C42.3164 6.68513 42.4355 6.56684 42.4355 6.42091V5.09979C42.4355 4.95386 42.3164 4.83557 42.1709 4.83557L39.4492 4.83557L37.5996 6.68513H42.1709Z"
                  fill="#2D62EA"
                />
                <path
                  d="M37.3359 11.5207C37.4814 11.5207 37.6006 11.4024 37.6006 11.2565L37.5996 6.68513L35.751 8.53484V11.2565C35.751 11.4024 35.8691 11.5207 36.0146 11.5207H37.3359Z"
                  fill="#2D62EA"
                />
                <path
                  d="M31.1797 4.83561C31.0332 4.83561 30.915 4.9539 30.915 5.09983V6.42095C30.915 6.56687 31.0332 6.68517 31.1797 6.68517H33.9014L35.751 4.83547L31.1797 4.83561Z"
                  fill="#2D62EA"
                />
                <path
                  d="M36.1094 4.96781C35.9844 4.96781 35.8828 5.06921 35.8828 5.19429V6.32667C35.8828 6.45175 35.9844 6.55315 36.1094 6.55315H37.2422C37.3672 6.55315 37.4678 6.45175 37.4678 6.32667V5.19429C37.4678 5.06921 37.3672 4.96781 37.2422 4.96781H36.1094Z"
                  fill="#2D62EA"
                />
              </svg>
            </h1>
            <div className="flex">
              <p>박관리자</p>
              <div>{planStatus}</div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.0001 2.5C12.2762 2.5 12.5001 2.72386 12.5001 3V4.25042C13.5767 4.2616 14.836 4.55325 15.9359 5.42061C17.2476 6.45495 18.2199 8.21849 18.4615 10.9803C18.4634 11.002 18.4644 11.0238 18.4644 11.0456V15.9906C18.4644 16.3365 18.4814 16.4596 18.5849 16.5885C18.7093 16.7434 19.0746 17.0287 20.1611 17.2675C20.535 17.3497 20.787 17.7003 20.7457 18.081C20.7044 18.4616 20.3829 18.75 20.0001 18.75H14.985C14.9161 19.3212 14.6128 19.8582 14.1213 20.2678C13.5587 20.7366 12.7956 21 12 21C11.2044 21 10.4413 20.7366 9.87868 20.2678C9.38723 19.8582 9.0839 19.3212 9.01503 18.75H4.00007C3.64529 18.75 3.33904 18.5014 3.2661 18.1542C3.19316 17.807 3.37348 17.4562 3.69827 17.3134C4.04191 17.1624 4.55892 16.8884 4.97634 16.5729C5.18558 16.4147 5.34357 16.2655 5.44275 16.1374C5.51805 16.0402 5.53323 15.9894 5.53577 15.9809L5.53579 11.0456C5.53579 10.0375 5.584 8.34376 6.44026 6.89615C7.29017 5.45928 8.84944 4.39634 11.5001 4.27831V3C11.5001 2.72386 11.7239 2.5 12.0001 2.5ZM10.5423 18.75C10.6006 18.9857 10.7404 19.2042 10.9477 19.3769C11.2268 19.6095 11.6053 19.7402 12 19.7402C12.3947 19.7402 12.7732 19.6095 13.0523 19.3769C13.2596 19.2042 13.3994 18.9857 13.4577 18.75H10.5423ZM15.0071 6.59846C14.0853 5.87153 12.9755 5.69182 12.0598 5.765C12.0399 5.76659 12.02 5.76739 12.0001 5.76739C9.4711 5.76739 8.315 6.67302 7.73132 7.65981C7.10186 8.72398 7.03579 10.0443 7.03579 11.0456V15.9906C7.03579 16.4266 6.83311 16.7918 6.62883 17.0557C6.57718 17.1224 6.52191 17.1872 6.46395 17.25H17.2282C16.9631 16.7732 16.9639 16.3018 16.9643 16.0236L16.9644 15.9906V11.0789C16.7444 8.63667 15.9105 7.31087 15.0071 6.59846Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </header>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="search"
                placeholder="회원/멤버 이름, 연락처로 검색하세요"
                value={searchInputValue}
                onChange={handleChange}
              />
              <button type="submit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.4765 14.8907C12.4957 15.5892 11.2958 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 11.2958 15.5892 12.4957 14.8907 13.4765L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L13.4765 14.8907ZM14.5 10C14.5 7.51472 12.4853 5.5 10 5.5C7.51472 5.5 5.5 7.51472 5.5 10C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 10Z"
                    fill="#505050"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div>
            <ul className="flex">
              <li>
                <a href="https://github.com/pie-sfac/1-16-careMango">
                  <img src="./images/Banners.png" alt="광고 배너" />
                </a>
              </li>
              <li>
                <a href="https://github.com/pie-sfac/1-16-careMango">
                  <img src="./images/Banners.png" alt="광고 배너" />
                </a>
              </li>
              <li>
                <a href="https://github.com/pie-sfac/1-16-careMango">
                  <img src="./images/Banners.png" alt="광고 배너" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex">
              <li>
                <span>나의 오늘 일정</span>
                <div className="card_wrapper">
                  <div className="card">
                    <div className="card_upper">
                      <span>총 {data.mySchedule.lessonCount + data.mySchedule.counselingCount}건의 일정</span>
                      <br />
                      <span>
                        수업 {data.mySchedule.lessonCount}건, 상담 {data.mySchedule.counselingCount}건
                      </span>
                      <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                            fill="#CFCFCF"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="card_down">
                      <span>{data.mySchedule.lessonCount + data.mySchedule.counselingCount}</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>나의 회원</span>
                <div className="card_wrapper">
                  <div className="card">
                    <div className="card_upper">
                      <span>{data.center.memberCount}</span>
                      <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                            fill="#CFCFCF"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="card_down">
                      <span>{data.center.memberCount}</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>전체 직원</span>
                <div className="card_wrapper">
                  <div className="card">
                    <div className="card_upper">
                      <span>{data.center.staffCount}</span>
                      <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                            fill="#CFCFCF"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="card_down">
                      <span>{data.center.staffCount}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="bottom_wrapper">
            <ul className="flex bottom_bar">
              <li>
                <Link to="/main" className="group">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-text-400 group-hover:text-primary-500">
                    <path
                      d="M8.99805 20.9981H6.09669C5.82054 20.9981 5.59669 20.7742 5.59669 20.4981V12.0002H2.39943C1.92954 12.0002 1.71914 11.4108 2.08281 11.1132L11.6821 3.25926C11.8663 3.10857 12.1312 3.10857 12.3153 3.25926L21.9146 11.1132C22.2783 11.4108 22.0679 12.0002 21.598 12.0002H18.4017V20.4981C18.4017 20.7742 18.1778 20.9981 17.9017 20.9981H14.998V21H8.99805V20.9981ZM7.09669 10.5002V19.4981H8.99805V15C8.99805 13.8954 10.3412 13 11.998 13C13.6549 13 14.998 13.8954 14.998 15V19.4981H16.9017V10.5002H18.7966L11.9987 4.9383L5.20084 10.5002H7.09669ZM13.498 19.4981V15.0293C13.4821 14.9996 13.4311 14.9297 13.2873 14.8339C13.0231 14.6577 12.5716 14.5 11.998 14.5C11.4245 14.5 10.973 14.6577 10.7088 14.8339C10.565 14.9297 10.514 14.9996 10.498 15.0293V19.4981H13.498ZM13.5044 15.0452C13.5044 15.0452 13.5026 15.0422 13.5012 15.0356C13.5041 15.0418 13.5044 15.0452 13.5044 15.0452ZM10.4917 15.0452C10.4917 15.0452 10.492 15.0418 10.4949 15.0356C10.4935 15.0422 10.4917 15.0452 10.4917 15.0452Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p>홈</p>
                </Link>
              </li>
              <li>
                <Link to="/main" className="group">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-text-400 group-hover:text-primary-500">
                    <path
                      d="M6 3C6 2.44772 6.44772 2 7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4H20C20.5523 4 21 4.44772 21 5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V5C3 4.44772 3.44772 4 4 4H6V3ZM4.5 5.5V8H19.5V5.5H4.5ZM4.5 19.5H19.5V9.5H4.5V19.5ZM16.5 18C17.3284 18 18 17.3284 18 16.5C18 15.6716 17.3284 15 16.5 15C15.6716 15 15 15.6716 15 16.5C15 17.3284 15.6716 18 16.5 18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p>일정관리</p>
                </Link>
              </li>
              <li>
                <Link to="/main" className="group">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-text-400 group-hover:text-primary-500">
                    <path
                      d="M11 6C11 7.65685 9.65686 9 8 9C6.34315 9 5 7.65685 5 6C5 4.34315 6.34315 3 8 3C9.65686 3 11 4.34315 11 6ZM9.5 6C9.5 5.17157 8.82843 4.5 8 4.5C7.17158 4.5 6.5 5.17157 6.5 6C6.5 6.82843 7.17158 7.5 8 7.5C8.82843 7.5 9.5 6.82843 9.5 6Z"
                      fill="currentColor"
                    />
                    <path
                      d="M18 8C18 9.65685 16.6569 11 15 11C13.3432 11 12 9.65685 12 8C12 6.34315 13.3432 5 15 5C16.6569 5 18 6.34315 18 8ZM16.5 8C16.5 7.17157 15.8284 6.5 15 6.5C14.1716 6.5 13.5 7.17157 13.5 8C13.5 8.82843 14.1716 9.5 15 9.5C15.8284 9.5 16.5 8.82843 16.5 8Z"
                      fill="currentColor"
                    />
                    <path
                      d="M7.47808 16.5C7.16938 17.2933 7 18.1563 7 19.0588C7 19.5786 7.42138 20 7.94118 20H21.0588C21.5786 20 22 19.5786 22 19.0588C22 15.1603 18.8397 12 14.9412 12H14.0588C13.5152 12 12.9859 12.0615 12.4776 12.1778C12.4365 11.9429 12.3395 11.718 12.1904 11.5235C11.2792 10.3351 9.89475 9.5 8.27382 9.5H7.68583C4.76329 9.5 2.73637 12.0951 2.50516 14.8757C2.47041 15.2937 2.61225 15.7071 2.89627 16.0158C3.1803 16.3244 3.58057 16.5 4 16.5H7.47808ZM14.9412 13.5C17.8226 13.5 20.192 15.6924 20.4723 18.5H8.52774C8.62196 17.5561 8.95227 16.6818 9.45877 15.937C9.49661 15.8896 9.53178 15.8398 9.56397 15.7876C10.5748 14.401 12.2116 13.5 14.0588 13.5H14.9412ZM8.29732 14.9796C8.2925 14.9864 8.2877 14.9932 8.2829 15H4C4.04436 14.4666 4.16721 13.961 4.35451 13.5C4.95591 12.0198 6.22167 11 7.68583 11H8.27382C8.79331 11 9.28783 11.1284 9.73656 11.3602C10.2194 11.6095 10.6491 11.9786 11 12.4362C10.5251 12.6068 10.0817 12.865 9.68289 13.1953C9.12009 13.6613 8.64603 14.2707 8.29732 14.9796Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p>회원관리</p>
                </Link>
              </li>
              <li>
                <Link to="/main" className="group">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-text-400 group-hover:text-primary-500">
                    <path
                      d="M2.39943 11.0002C1.92954 11.0002 1.71914 10.4108 2.08281 10.1132L11.6821 2.25926C11.8663 2.10857 12.1312 2.10857 12.3153 2.25926L21.9146 10.1132C22.2783 10.4108 22.0679 11.0002 21.598 11.0002H2.39943ZM18.7966 9.50021L11.9987 3.9383L5.20084 9.50021H18.7966Z"
                      fill="currentColor"
                    />
                    <path
                      d="M1.99873 20.75C1.99873 20.3358 2.33451 20 2.74873 20H21.2487C21.6629 20 21.9987 20.3358 21.9987 20.75C21.9987 21.1642 21.6629 21.5 21.2487 21.5H2.74873C2.33451 21.5 1.99873 21.1642 1.99873 20.75Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.99873 13C5.44644 13 4.99873 13.4477 4.99873 14V17C4.99873 17.5522 5.44644 18 5.99873 18C6.55101 18 6.99873 17.5522 6.99873 17V14C6.99873 13.4477 6.55101 13 5.99873 13Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10.9987 14C10.9987 13.4477 11.4464 13 11.9987 13C12.551 13 12.9987 13.4477 12.9987 14V17C12.9987 17.5522 12.551 18 11.9987 18C11.4464 18 10.9987 17.5522 10.9987 17V14Z"
                      fill="currentColor"
                    />
                    <path
                      d="M17.9987 13C17.4464 13 16.9987 13.4477 16.9987 14V17C16.9987 17.5522 17.4464 18 17.9987 18C18.551 18 18.9987 17.5522 18.9987 17V14C18.9987 13.4477 18.551 13 17.9987 13Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p>센터관리</p>
                </Link>
              </li>
              <li>
                <Link to="/main" className="group">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-text-400 group-hover:text-primary-500">
                    <path
                      d="M16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6ZM14.5 6C14.5 4.61929 13.3807 3.5 12 3.5C10.6193 3.5 9.5 4.61929 9.5 6C9.5 7.38071 10.6193 8.5 12 8.5C13.3807 8.5 14.5 7.38071 14.5 6Z"
                      fill="currentColor"
                    />
                    <path
                      d="M2 20.7059C2 15.3455 6.34547 11 11.7059 11H12.2941C17.6545 11 22 15.3455 22 20.7059C22 21.4206 21.4206 22 20.7059 22H3.29412C2.5794 22 2 21.4206 2 20.7059ZM3.50253 20.5H20.4975C20.3882 16.0632 16.7573 12.5 12.2941 12.5H11.7059C7.24273 12.5 3.61179 16.0632 3.50253 20.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p>마이페이지</p>
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
