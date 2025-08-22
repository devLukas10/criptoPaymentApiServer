
export interface ATPHookTypes {
    fungible_asset_activities: [{
        amount: string;
        block_height: string;
        is_transaction_success: boolean;
        metadata: {
            decimals: string;
            symbol: string;
            icon_uri: string
        };
        transaction_timestamp: any;
        type: string;
        owner_address: string;
      }
    ];
    account_address: string;
}

export interface ATPHookData {
    amount?: string | number;
    block_height?: string;
    is_sucess?: boolean;
    decimals?: string;
    symbol?: string;
    icon_uri?: string;
    time?: any;
    type?: string;
    fromAddress?: string;
    toAddress?: string
}