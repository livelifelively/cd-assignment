type ReduxAction = {
  type: string;
  payload?: any;
  meta?: any;
};

type ApplicationEnvironment = 'DEV' | 'TESTING' | 'UAT' | 'PROD';

type ErrorBoundaryErrorScope = 'COMPONENT' | 'ROOT' | 'SCREEN';

type PromptCTA = {
  logId: string;
  type?: 'PROMPT';
  title: string;
  ctaType: 'CONFIRM_REJECT';
  body?: string;
  ctas: {
    confirm: {
      label: string;
      action: () => void;
    };
    reject: {
      label: string;
      action: () => void;
    };
  };
};

type AlertCTA = {
  logId: string;
  type?: 'ALERT';
  title: string;
  body?: string;
  ctas: {
    acknowledge: {
      label: string;
      action: () => void;
    };
  };
};

type Toast = {
  logId: string;
  type?: 'TOAST';
  title: string;
};
