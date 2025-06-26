import { createSlice } from '@reduxjs/toolkit';


export interface AppState {
  isEdit: boolean;
  questionId: string | null;
}

const initialState: AppState = {
  isEdit: false,
  questionId: null,
};

const appSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setQuestionId: (state, action) => {
      state.questionId = action.payload;
    }
  },
  
});

export const {setIsEdit, setQuestionId} = appSlice.actions;
export default appSlice.reducer;