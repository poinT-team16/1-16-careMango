import { atom } from 'recoil';

interface Common {
  instructor: string;
  date: string;
  startTime: string;
  endTime: string;
  name: string;
  contact: string;
  memo: string;
}

export const commonState = atom<Common>({
  key: 'commonState',
  default: {
    instructor: '',
    date: '',
    startTime: '',
    endTime: '',
    name: '',
    contact: '',
    memo: ''
  },
});