import React, { createContext, useReducer, useMemo } from 'react';
import { STEP_ORDER } from '../constants/cakeOptions';

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
    useStevia: false, // Applies to selected sponge
    cremeType1: null, // First creme layer
    cremeType2: null, // Second creme layer
    gellyType: null,
    crispType: null,
    decorationFile: null,
    decorationDetails: '',
    customText: '',
    deliveryDate: null,
    deliveryTime: null,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  isLayerView: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_STEP': {
      const stepId = action.payload;

      // Prevent activating locked steps
      if (stepId && state.steps[stepId]?.status === 'locked' && stepId !== state.activeStep) {
        return state;
      }
      
      const newSteps = { ...state.steps };

      // Deactivate current active step if it exists and is not the new active step
      if (state.activeStep && newSteps[state.activeStep]?.status === 'active' && state.activeStep !== stepId) {
        newSteps[state.activeStep] = {
          ...newSteps[state.activeStep],
          status: newSteps[state.activeStep].isCompleted ? 'completed' : 'default', // Revert to completed or default
        }
      };

      if (stepId) {
        newSteps[stepId].status = 'active';
      }

      return {
        ...state,
        activeStep: stepId,
        steps: newSteps,
        isLayerView: !!stepId && ['sponge', 'creme', 'gelly', 'crisp'].includes(stepId), // Layer view for internal components
      };
    }
    case 'COMPLETE_STEP': {
      const { stepId, nextStepId, value, uncomplete } = action.payload;
      const newSteps = { ...state.steps };
      const updatedCake = { ...state.cake, ...value }; // Apply the new value first

      let currentStepIsCompleted = false;

      // Determine if the current step is completed based on its type and new value
      if (stepId === 'delivery') {
        // Delivery step is completed if date, time, name, email, and phone are all provided
        currentStepIsCompleted = updatedCake.deliveryDate && updatedCake.deliveryTime && updatedCake.contactName && updatedCake.contactEmail && updatedCake.contactPhone;
      } else if (stepId === 'creme') {
        // Creme step is completed if both cremeType1 and cremeType2 are selected
        currentStepIsCompleted = updatedCake.cremeType1 && updatedCake.cremeType2;
      } else if (['gelly', 'crisp'].includes(stepId)) {
        // Gelly and Crisp are optional. They are "completed" if an option is selected,
        // or if they are explicitly unselected (uncomplete flag means user made a choice to remove it)
        currentStepIsCompleted = updatedCake[`${stepId}Type`] !== null;
      } else if (stepId === 'decorations') {
        // Decorations step is completed if file or details are provided
        currentStepIsCompleted = updatedCake.decorationFile || updatedCake.decorationDetails.trim() !== '';
      } else if (stepId === 'text') {
        // Text step is completed if custom text is provided
        currentStepIsCompleted = updatedCake.customText.trim() !== '';
      } else {
        // For other required steps (size, sponge), they are completed if a value is set
        // The 'uncomplete' flag is primarily for optional steps where unselecting means 'not completed'
        currentStepIsCompleted = !uncomplete;
      }

      newSteps[stepId] = { ...newSteps[stepId], isCompleted: currentStepIsCompleted };

      // Unlock the next step if it exists and is currently locked
      if (nextStepId && newSteps[nextStepId] && newSteps[nextStepId].status === 'locked' && currentStepIsCompleted) {
        newSteps[nextStepId] = { ...newSteps[nextStepId], status: 'default' };
      }

      // Dynamically determine required and optional steps
      const allSteps = STEP_ORDER;
      const requiredSteps = allSteps.filter(id => !['gelly', 'crisp', 'decorations', 'text'].includes(id));

      // Check if all required steps up to the current one are completed, or if the current step is optional and has been interacted with
      const currentStepIndex = allSteps.indexOf(stepId);
      const allPreviousRequiredCompleted = requiredSteps.every(
        (id) => allSteps.indexOf(id) <= currentStepIndex ? newSteps[id].isCompleted : true
      );

      // If all required steps are completed, unlock all subsequent steps that are currently locked
      if (allPreviousRequiredCompleted) {
        allSteps.slice(currentStepIndex + 1).forEach((id) => {
          if (newSteps[id] && newSteps[id].status === 'locked') {
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