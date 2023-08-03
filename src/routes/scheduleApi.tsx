import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/apiInstance';
import { SchedulApiData } from '../types/scheduleApi';

const ScheduleApi = () => {
  const [scheduleList, setScheduleList] = useState<SchedulApiData[] | null>(null);

  const getScheduleApi = async () => {
    const from = '2023-01-21';
    const to = '2023-12-31';
    const res = await axiosInstance.get(`schedules?from=${from}&to=${to}`);
    setScheduleList(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getScheduleApi();
  }, []);

  const navigate = useNavigate();
  const goCreateCounseling = () => {
    navigate('counseling');
  };

  const goCheckSchedule = () => {
    navigate('/schedule/personal/1');
  };

  const goCreateSchedule = () => {
    navigate('/schedule/personal/new');
  };

  const goCheckCounseling = () => {
    navigate('/schedules/counseling/174');
  };

  // console.log(scheduleList.counselingSchedules);

  return (
    <div className="flex flex-col">
      <button type="button" className="w-20 m-3 border-8" onClick={goCreateSchedule}>
        개인 수업 일정 생성
      </button>
      <button type="button" className="w-20 m-3 border-8" onClick={goCheckSchedule}>
        개인 수업 일정 조회(mock 데이터)
      </button>
      <button type="button" className="w-20 m-3 border-8" onClick={goCreateCounseling}>
        상담 일정 생성
      </button>
      <button type="button" className="w-20 m-3 border-8" onClick={goCheckCounseling}>
        상담 일정 조회
      </button>

      <p>개인 수업 일정</p>
      <button type="button">
        <div className="flex">
          <p>09:00~10:00</p>
          <p>mango(1)</p>
          <p>0회</p>
        </div>
      </button>

      <p>상담 일정</p>
      <button type="button">
        <div className="flex">
          <p>09:00~10:00</p>
          <p>mango(1)</p>
          <p>0회</p>
        </div>
      </button>

      {scheduleList?.counselingSchedules.map((counseling) => (
        <button key={counseling.id} type="button">
          <div className="flex">
            <p>
              {counseling.startAt.split('T')[1]}~{counseling.endAt.split('T')[1]}
            </p>
            <p>{counseling.client.name}</p>
            <p>{counseling.memo}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ScheduleApi;