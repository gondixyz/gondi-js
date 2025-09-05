export type Order = {
  parameters: {
    offerer: string;
    zone: string;
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
    orderType: number;
    startTime: string;
    endTime: string;
    zoneHash: string;
    salt: string;
    conduitKey: string;
    totalOriginalConsiderationItems: string;
  };
  numerator: number;
  denominator: number;
  signature: string;
  extraData: string;
};

export type CriteriaResolver = {
  orderIndex: string;
  side: number;
  index: string;
  identifier: string;
  criteriaProof: string[];
};

export type InputDataMatchAdvancedOrders = {
  orders: Order[];
  criteriaResolvers: CriteriaResolver[];
  fulfillments: {
    offerComponents: {
      orderIndex: string;
      itemIndex: string;
    }[];
    considerationComponents: {
      orderIndex: string;
      itemIndex: string;
    }[];
  }[];
  recipient: string;
};

export type InputDataFulfillAdvancedOrder = {
  advancedOrder: Order;
  criteriaResolvers: CriteriaResolver[];
  fulfillerConduitKey: string;
  recipient: string;
};

export type FulfillmentDataResponse = {
  protocol: string;
  fulfillment_data: {
    transaction:
      | {
          function: 'matchAdvancedOrders(((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),uint120,uint120,bytes,bytes)[],(uint256,uint8,uint256,uint256,bytes32[])[],((uint256,uint256)[],(uint256,uint256)[])[],address)';
          chain: number;
          to: string;
          value: string | number;
          input_data: InputDataMatchAdvancedOrders;
        }
      | {
          function: `fulfillAdvancedOrder(${string})`;
          chain: number;
          to: string;
          value: number;
          input_data: InputDataFulfillAdvancedOrder;
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
