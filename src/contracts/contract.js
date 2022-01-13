export const ADDRESS = "0x9020eE9872cf944521Cf88D69C82CDC40D007E3A";
export const ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "productName", type: "string" },
          { internalType: "string", name: "category", type: "string" },
          { internalType: "string", name: "imageLink", type: "string" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "address", name: "buyer", type: "address" },
          { internalType: "address", name: "sellerAddress", type: "address" },
          {
            internalType: "enum Auction.ProductCondition",
            name: "productCondition",
            type: "uint8",
          },
          {
            internalType: "enum Auction.ProductState",
            name: "productState",
            type: "uint8",
          },
          { internalType: "bool", name: "exists", type: "bool" },
        ],
        indexed: false,
        internalType: "struct Auction.Product",
        name: "product",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bidAmount",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "userAddress", type: "address" },
          { internalType: "string", name: "firstName", type: "string" },
          { internalType: "string", name: "lastName", type: "string" },
          { internalType: "string", name: "email", type: "string" },
          { internalType: "string", name: "phoneNumber", type: "string" },
        ],
        indexed: false,
        internalType: "struct Auction.User",
        name: "bidder",
        type: "tuple",
      },
    ],
    name: "NewBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "storeAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "productAddress",
        type: "address",
      },
    ],
    name: "NewProductAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "storeAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "storeName",
        type: "string",
      },
      { indexed: false, internalType: "string", name: "email", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "storeFrontImage",
        type: "string",
      },
    ],
    name: "NewStoreAdded",
    type: "event",
  },
  {
    inputs: [],
    name: "bidCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "bidsByProduct",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "productId", type: "uint256" },
      { internalType: "uint256", name: "bidAmount", type: "uint256" },
      { internalType: "address", name: "bidderAddress", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "productCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "productCountByStore",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "stores",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "productName", type: "string" },
      { internalType: "string", name: "category", type: "string" },
      { internalType: "string", name: "imageLink", type: "string" },
      { internalType: "uint256", name: "startTime", type: "uint256" },
      { internalType: "uint256", name: "endTime", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "address", name: "buyer", type: "address" },
      { internalType: "address", name: "sellerAddress", type: "address" },
      {
        internalType: "enum Auction.ProductCondition",
        name: "productCondition",
        type: "uint8",
      },
      {
        internalType: "enum Auction.ProductState",
        name: "productState",
        type: "uint8",
      },
      { internalType: "bool", name: "exists", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "storesByAddress",
    outputs: [
      { internalType: "uint256", name: "storeId", type: "uint256" },
      { internalType: "address", name: "userAddress", type: "address" },
      { internalType: "string", name: "storeName", type: "string" },
      { internalType: "string", name: "storeFrontImage", type: "string" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "productCount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "storesById",
    outputs: [
      { internalType: "uint256", name: "storeId", type: "uint256" },
      { internalType: "address", name: "userAddress", type: "address" },
      { internalType: "string", name: "storeName", type: "string" },
      { internalType: "string", name: "storeFrontImage", type: "string" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "productCount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "storesByProductId",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "storesBySellers",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "storesCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "usersByAddress",
    outputs: [
      { internalType: "address", name: "userAddress", type: "address" },
      { internalType: "string", name: "firstName", type: "string" },
      { internalType: "string", name: "lastName", type: "string" },
      { internalType: "string", name: "email", type: "string" },
      { internalType: "string", name: "phoneNumber", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      { internalType: "address", name: "userAddress", type: "address" },
      { internalType: "string", name: "firstName", type: "string" },
      { internalType: "string", name: "lastName", type: "string" },
      { internalType: "string", name: "email", type: "string" },
      { internalType: "string", name: "phoneNumber", type: "string" },
    ],
    name: "addUser",
    outputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
      { internalType: "string", name: "_firstName", type: "string" },
      { internalType: "string", name: "_lastName", type: "string" },
      { internalType: "string", name: "_email", type: "string" },
      { internalType: "string", name: "_phoneNumber", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "userAddress", type: "address" }],
    name: "getUser",
    outputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
      { internalType: "string", name: "_firstName", type: "string" },
      { internalType: "string", name: "_lastName", type: "string" },
      { internalType: "string", name: "_email", type: "string" },
      { internalType: "string", name: "_phoneNumber", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      { internalType: "uint256", name: "productId", type: "uint256" },
      { internalType: "uint256", name: "bidAmount", type: "uint256" },
    ],
    name: "placeBid",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "productId", type: "uint256" },
      { internalType: "uint256", name: "bidId", type: "uint256" },
    ],
    name: "getProductBids",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "productId", type: "uint256" },
          { internalType: "uint256", name: "bidAmount", type: "uint256" },
          { internalType: "address", name: "bidderAddress", type: "address" },
        ],
        internalType: "struct Auction.Bid",
        name: "bids",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_email", type: "string" },
      { internalType: "string", name: "_storeFrontImage", type: "string" },
    ],
    name: "addStore",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_category", type: "string" },
      { internalType: "uint256", name: "_startTime", type: "uint256" },
      { internalType: "uint256", name: "_endTime", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "uint256", name: "_productCondition", type: "uint256" },
    ],
    name: "addProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "getProduct",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "productName", type: "string" },
      { internalType: "string", name: "category", type: "string" },
      { internalType: "uint256", name: "startTime", type: "uint256" },
      { internalType: "uint256", name: "endTime", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "address", name: "buyer", type: "address" },
      { internalType: "address", name: "sellerAddress", type: "address" },
      {
        internalType: "enum Auction.ProductCondition",
        name: "condition",
        type: "uint8",
      },
      {
        internalType: "enum Auction.ProductState",
        name: "productState",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
