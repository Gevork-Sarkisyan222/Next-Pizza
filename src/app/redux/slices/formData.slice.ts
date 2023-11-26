import { createSlice } from '@reduxjs/toolkit';

const isBrowser = typeof window !== 'undefined';

const savedFormData = isBrowser ? localStorage.getItem('formData') : null;
const initialFormData = savedFormData
  ? JSON.parse(savedFormData)
  : {
      formData: {
        name: '',
        surname: '',
        phone: '',
        country: '',
        email: '',
        password: '',
        repeat_password: '',
      },
    };

const formDataSlice = createSlice({
  name: 'formData',
  initialState: initialFormData,
  reducers: {
    setFormData: (state, action) => {
      const updatedFormData = {
        ...state.formData,
        ...action.payload,
      };
      if (isBrowser) {
        localStorage.setItem('formData', JSON.stringify({ formData: updatedFormData }));
      }

      return {
        ...state,
        formData: updatedFormData,
      };
    },
    clearFormData: (state) => {
      if (isBrowser) {
        localStorage.removeItem('formData');
      }
      return {
        formData: {
          name: '',
          surname: '',
          phone: '',
          country: '',
          email: '',
          password: '',
          repeat_password: '',
        },
      };
    },
  },
});

export const { setFormData, clearFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
