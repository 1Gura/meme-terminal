export type WSCallback<T = unknown> = (message: T) => void;

export type WSSubscription = {
  unsubscribe: () => void;
};

export type WSChannel = string;

export type WSPublication<T = unknown> = {
  data: T;
};

// Тип данных, приходящих в pub.data
export interface PumpfunToken {
  token: string;
  tokenType: string;
  supply: number;
  decimals: number;
  name: string;
  symbol: string;
  metadataUri: string | null;
  mint_time: number;
  creator: string;
  pool: string;
  hardcap: number;
  marketCapUsd: number;
  txCount: number;
  isMigrated: boolean;
  migrationPool: string | null;
  photo: string;
  description: string | null;
  website: string | null;
  x: string | null;
  telegram: string | null;
  lastTradeExecutionPositionKey: string | null;
  lastTradeId: string | null;
  priceSol: number;
  priceUsd: number;
  holders: number;
  buys: number;
  sells: number;
  volumeSol: number;
  volumeUsd: number;
  version: number;
  list_time: number;
  last_tx_time: number;
  progress: number;
  progressSol: number;
  _balanceSol: number;
  _balanceTokens: number;
  configAddress: string | null;
}

export interface PushMessage {
  push: {
    channel: string;
    pub: {
      data: PumpfunToken;
    };
  };
}

interface ConnectOptions {
  channels: string[];
  onPush: (channel: string, data: PumpfunToken) => void;
}
