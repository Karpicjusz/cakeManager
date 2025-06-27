import React, { createContext, useReducer, useMemo } from 'react';

const initialState = {
  activeStep: 'size',
  steps: {
    size: { status: 'active', isCompleted: false },
    sponge: { status: 'locked', isCompleted: false },
    creme: { status: 'locked', isCompleted: false },
    gelly: { status: 'locked', isCompleted: false },
    crisp: { status: 'locked', isCompleted: false },
    decorations: { status: 'locked', isCompleted: false },
    text: { status: 'locked', isCompleted: false },
    delivery: { status: 'locked', isCompleted: false },
  },
  cake: {
    persons: 10,
    tiers: 1,
    spongeType: null,
    useStevia: false,
    cremeType: null,
    gellyType: null,
    crispType: null,
    decorationFile: null,
    decorationDetails: '',
    customText: '',
    deliveryDate: null,
  },
  isLayerView: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_STEP': {
      const stepId = action.payload;

      if (stepId && state.steps[stepId]?.status === 'locked') {
        return state;
      }
      
      const newSteps = { ...state.steps };
      Object.keys(newSteps).forEach(key => {
        if (newSteps[key].status === 'active') {
          newSteps[key].status = 'default';
        }
      });

      if (stepId) {
        newSteps[stepId].status = 'active';
      }

      return {
        ...state,
        activeStep: stepId,
        steps: newSteps,
        isLayerView: !!stepId && ['sponge', 'creme', 'gelly', 'crisp'].includes(stepId),
      };
    }
    case 'COMPLETE_STEP': {
      const { stepId, nextStepId, value, uncomplete } = action.payload;
      const newSteps = { ...state.steps };
      if (uncomplete || (['gelly', 'crisp'].includes(stepId) && (value[`${stepId}Type`] == null))) {
        newSteps[stepId] = { ...newSteps[stepId], isCompleted: false };
      } else {
        newSteps[stepId] = { ...newSteps[stepId], isCompleted: true };
      }
      if (nextStepId && newSteps[nextStepId]?.status === 'locked') {
        newSteps[nextStepId].status = 'default';
      }
      const requiredSteps = ['size', 'sponge', 'creme'];
      const optionalSteps = ['gelly', 'crisp', 'decorations', 'text'];
      const allRequiredCompleted = requiredSteps.every(
        (id) => (id === stepId ? true : newSteps[id].isCompleted)
      );
      if (allRequiredCompleted) {
        optionalSteps.forEach((id) => {
          if (newSteps[id].status === 'locked') {
            newSteps[id].status = 'default';
          }
        });
      }
      return { ...state, cake: { ...state.cake, ...value }, steps: newSteps };
    }
    case 'SET_PERSONS': {
      const persons = action.payload;
      const tiers = persons <= 20 ? 1 : persons <= 70 ? 2 : 3;
      return { ...state, cake: { ...state.cake, persons, tiers } };
    }
    default:
      return state;
  }
};

export const ConfiguratorContext = createContext();

export const ConfiguratorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ConfiguratorContext.Provider value={contextValue}>
      {children}
    </ConfiguratorContext.Provider>
  );
};