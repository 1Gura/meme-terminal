import axios from "axios";

export interface TokenListRequest {
    page: number;
    version: string;
}

export interface TokenItem {
    buys: number;
    configAddress: string | null;
    createdAt: string;
    creator: string;
    creatorSharePercentage: number;
    decimals: number;
    description: string;
    hardcap: number;
    holders: number;
    isCurrentlyLive: boolean;
    isDraft: boolean;
    isMigrated: boolean;
    lastTradeExecutionPositionKey: string | null;
    lastTradeId: string;
    last_tx_time: number;
    list_time: number;
    liveStartTime: string | null;
    marketCapUsd: number;
    metadataUri: string;
    migrationPool: string | null;
    mint_time: number;
    name: string;
    numLivestreamParticipants: number | null;
    photo: string;
    pool: string;
    price: number;
    priceSol: number;
    priceUsd: number;
    progress: number;
    progressSol: number;
    sells: number;
    supply: number;
    symbol: string;
    telegram: string;
    token: string;
    tokenType: string;
    topHoldersList: unknown[]; // неизвестно
    topHoldersPercentage: number;
    txCount: number;
    updatedAt: string;
    version: number;
    volumeSol: number;
    volumeUsd: number;
    website: string;
    x: string;
    _balanceSol: number;
    _balanceTokens: number;
    _id: string;
}


export interface TokenListResponse {
    tokens: TokenItem[];
}

export const tokenService = {
    async getTokens({ page, version }: { page: string; version: string }) {
        const response = await axios.post("https://launch.meme/api/tokens", {
            page,
            version
        });

        return response.data;
    }
};

