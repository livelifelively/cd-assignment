import { R_UI_STORY_CREATED } from './ui-screens.actions';

const initialState = {
  createStory: {
    created: false,
    saved: false,
  },
};

export const uiScreensReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case R_UI_STORY_CREATED:
      return {
        ...state,
        createStory: {
          ...state.createStory,
          created: true,
        },
      };
    default:
      return state;
  }
};
