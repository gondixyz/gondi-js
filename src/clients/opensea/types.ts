export type FulfillmentDataResponse = {
  protocol: string;
  fulfillment_data: {
    transaction: {
      function: string;
      chain: number;
      to: string;
      value: number;
      input_data: Record<string, unknown>;
    };
    orders: {
      parameters: {
        offerer: string;
        offer: {
          itemType: number;
          token: string;
          identifierOrCriteria: string;
          startAmount: string;
          endAmount: string;
        }[];
        consideration: {
          itemType: number;
          token: string;
          identifierOrCriteria: string;
          startAmount: string;
          endAmount: string;
          recipient: string;
        }[];
        startTime: string;
        endTime: string;
        orderType: number;
        zone: string;
        zoneHash: string;
        salt: string;
        conduitKey: string;
        totalOriginalConsiderationItems: number;
        counter: number;
      };
      signature: string;
    }[];
  };
};
