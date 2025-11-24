export type WSCallback<T = unknown> = (message: T) => void;

export type WSSubscription = {
  unsubscribe: () => void;
};

export type WSChannel = string;

export type WSPublication<T = unknown> = {
  data: T;
};
