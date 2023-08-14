import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { schedulesState } from '@/atoms/counseling/counselingScheduleAtom';
import { axiosInstance } from '@/utils/apiInstance';
import { getTime } from '@/utils/date';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import GetInputMemo from '@pages/counseling/components/GetInputMemo';
import { UpdateStateType } from '@/types/counseling/counseling';
import SubHeader from '@components/common/SubHeader';

const initialState: UpdateStateType = {
  userId: 0,
  memberId: 0,
  clientName: '',
  clientPhone: '',
  memo: '',
  startAt: '',
  endAt: '',
  counselingRecordContent: '',
};

const UpdateCounseling = () => {
  const [state, setState] = useState<UpdateStateType>(initialState);
  const { userId, startAt, endAt, clientName, clientPhone } = state;
  const { scheduleId } = useParams<{ scheduleId: string | undefined }>();
  const date = startAt.split('T')[0];
  const setSchedules = useSetRecoilState(schedulesState);
  const navigate = useNavigate();

  // 기존 데이터 불러오기
  const fetchCounselingData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`schedules/counseling/${scheduleId}`);
      setState({
        userId: res.data.counselor.id,
        memberId: res.data.client?.memberId || null,
        clientName: res.data.client.name,
        clientPhone: res.data.client.phone,
        memo: res.data.memo,
        startAt: res.data.startAt,
        endAt: res.data.endAt,
        counselingRecordContent: res.data.counselingRecord || '',
      });
    } catch (err) {
      console.error(err);
    }
  }, [scheduleId]);

  useEffect(() => {
    fetchCounselingData();
  }, [fetchCounselingData]);

  // 변경 api 연결
  const updateCounseling = async (counselingData: UpdateStateType): Promise<UpdateStateType | undefined> => {
    try {
      const res = await axiosInstance.put(`schedules/counseling/${scheduleId}`, counselingData);
      navigate('/schedules/counseling', { state: { refetch: true } });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  // 날짜 변경 시 시간도 같이 변경
  const onDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setState((prev) => ({
      ...prev,
      startAt: `${newDate}T${getTime(prev.startAt)}`,
      endAt: `${newDate}T${getTime(prev.endAt)}`,
    }));
  }, []);

  const handleChange = useCallback(
    (eventOrValue: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement> | string) => {
      let name: string, value: string;

      if (typeof eventOrValue === 'string') {
        name = 'memo';
        value = eventOrValue;
      } else {
        name = eventOrValue.target.name;
        value = eventOrValue.target.value;
      }

      if (name === 'startAt' || name === 'endAt') {
        const combinedDateTime = `${date}T${value}`;
        setState((prev) => ({ ...prev, [name]: combinedDateTime }));
      } else {
        setState((prev) => ({ ...prev, [name]: value }));
      }
    },
    [date],
  );

  // 전화번호 입력 시 자동 하이픈
  const numberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: rawValue } = event.target;
    let value = rawValue.replace(/\D/g, '');

    if (value.length > 11) return;

    if (value.length <= 7) {
      value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
    }

    setState((prev) => ({ ...prev, clientPhone: value }));
  };

  // 완료
  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      // 시작 시간이 끝나는 시간보다 늦은지 확인
      if (new Date(state.startAt) >= new Date(state.endAt)) {
        alert('시작 시간이 끝나는 시간보다 늦습니다. 다시 입력해주세요.');
        return;
      }
      updateCounseling(state).then((updatedCounseling) => {
        if (updatedCounseling) {
          setSchedules((prevSchedules) => [...prevSchedules, updatedCounseling]);
          navigate('/schedules');
        }
      });
    },
    [state, updateCounseling, setSchedules, navigate],
  );

  const allFieldsCompleted = userId && startAt && endAt && clientName && clientPhone;
  console.log(state);

  return (
    <>
      <SubHeader title="일정 생성" />
      <div className="flex flex-col">
        <h1 className="main-title">상담</h1>
        <form onSubmit={handleSubmit}>
          <Select
            name="userId"
            options={[
              { label: '선택해주세요', value: 0 },
              { label: '박강사', value: 1 },
              { label: '김강사', value: 2 },
            ]}
            value={state.userId}
            onChange={handleChange}
            label="담당 강사 선택"
            width="w-2/12"
            required
          />
          <Input type="date" label="날짜 선택" value={date} onChange={onDateChange} required />
          <label htmlFor="startAt" className="block mt-10 mb-2">
            시간 선택 <span className="text-primary-300">*</span>
          </label>
          <div className="flex items-center">
            <Input name="startAt" type="time" value={getTime(state.startAt)} onChange={handleChange} required /> ~
            <Input name="endAt" type="time" value={getTime(state.endAt)} onChange={handleChange} required />
          </div>
          <Input
            type="text"
            name="clientName"
            value={state.clientName}
            onChange={handleChange}
            label="이름"
            placeholder="이름을 입력해주세요."
            width="w-4/12"
            required
          />
          <Input
            type="text"
            name="clientPhone"
            value={state.clientPhone}
            onChange={numberChange}
            label="연락처"
            placeholder="연락처를 입력해주세요."
            width="w-4/12"
            required
          />
          <div className="relative">
            <GetInputMemo
              label="일정 메모"
              name="memo"
              value={state.memo}
              width="w-4/12"
              height="h-32"
              onChange={handleChange}
            />
            <p className="w-4/12 mt-4 text-right text-gray-400">{state.memo.length}/500자</p>
          </div>
          <button
            className={`my-5 py-3 w-full rounded ${
              allFieldsCompleted ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
            }`}
            type="submit"
            onClick={handleSubmit}>
            완료
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCounseling;
