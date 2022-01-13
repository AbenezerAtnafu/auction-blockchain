pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "./SafeMath.sol";

contract Auction {
    using SafeMath for uint256;

    string public name = "Auction";

    mapping(uint256 => Store) public storesById; // Stores by id
    mapping(address => Store) public storesByAddress; // Stores by id
    mapping(address => mapping(uint256 => Product)) public stores; // products by stores
    mapping(uint256 => address) public storesByProductId; // seller address by product id
    mapping(address => uint256) public storesBySellers; // store by seller address, used to prevent more than one store per user
    mapping(address => uint256) public productCountByStore; // product count by store
    mapping(uint256 => mapping(uint256 => Bid)) public bidsByProduct;
    mapping(address => User) public usersByAddress;

    // events
    event NewProductAdded(address storeAddress, address productAddress);
    event NewStoreAdded(
        address storeAddress,
        string storeName,
        string email,
        string storeFrontImage
    );
    event NewBid(uint256 id, Product product, uint256 bidAmount, User bidder);

    modifier OnlyOwner() {
        require(msg.sender == owner, "ONLY ADMIN IS ALLOWED");
        _;
    }

    modifier onlyBefore(uint256 _time) {
        require(block.timestamp < _time);
        _;
    }

    modifier onlyAfter(uint256 _time) {
        require(block.timestamp > _time);
        _;
    }

    // modifier Only_Doctors{
    //     require(DoctorInfo[msg.sender].state == true,"REGISTERED DOCTORS ONLY");
    //     _;
    // }

    // modifier Only_Patients{
    //     require(PatientInfo[msg.sender].state == true,"REGISTERED PATIENTS ONLY");
    //     _;
    // }

    address owner;

    // constructor
    constructor() public {}

    // global states

    uint256 public storesCount;
    uint256 public productCount;
    uint256 public bidCount;

    // structs

    struct User {
        address userAddress;
        string firstName;
        string lastName;
        string email;
        string phoneNumber;
    }

    // store
    struct Store {
        uint256 storeId;
        address userAddress;
        string storeName;
        string storeFrontImage;
        uint256 balance;
        uint256 productCount;
    }

    // product
    enum ProductCondition {
        New,
        Used
    }
    enum ProductState {
        ForSale,
        Sold,
        Shipped,
        Received,
        Deleted
    }
    struct Product {
        uint256 id;
        string productName; //
        string category; //
        string imageLink; //
        uint256 startTime; //
        uint256 endTime; //
        uint256 price; //
        address buyer;
        address sellerAddress;
        ProductCondition productCondition; //
        ProductState productState; //
        bool exists;
    }

    // auction
    struct Bid {
        uint256 id;
        uint256 productId;
        uint256 bidAmount;
        address bidderAddress;
    }

    // create user
    function addUser(
        address userAddress,
        string memory firstName,
        string memory lastName,
        string memory email,
        string memory phoneNumber
    )
        public
        returns (
            address _userAddress,
            string memory _firstName,
            string memory _lastName,
            string memory _email,
            string memory _phoneNumber
        )
    {
        usersByAddress[userAddress] = User(
            userAddress,
            firstName,
            lastName,
            email,
            phoneNumber
        );
        return (userAddress, firstName, lastName, email, phoneNumber);
    }

    // check user
    function getUser(address userAddress)
        public
        view
        returns (
            address _userAddress,
            string memory _firstName,
            string memory _lastName,
            string memory _email,
            string memory _phoneNumber
        )
    {
        User memory user = usersByAddress[userAddress];
        return (
            user.userAddress,
            user.firstName,
            user.lastName,
            user.email,
            user.phoneNumber
        );
    }

    // create bid
    function placeBid(uint256 productId, uint256 bidAmount)
        public
        returns (bool success)
    {
        bidCount = bidCount.add(1);
        bidsByProduct[productId][bidCount] = Bid(
            bidCount,
            productId,
            bidAmount,
            msg.sender
        );
        User memory bidder = usersByAddress[msg.sender];
        address x = storesByProductId[productId];
        Product memory product = stores[x][productId];
        emit NewBid(bidCount, product, bidAmount, bidder);
        return true;
    }

    // get product bids
    function getProductBids(uint256 productId, uint256 bidId)
        public
        returns (Bid memory bids)
    {
        return bidsByProduct[productId][bidId];
    }

    // create store
    modifier notHaveStore(address sellerAddress) {
        require(
            !(sellerAddress ==
                storesById[storesBySellers[sellerAddress]].userAddress),
            "User already has a store"
        );
        _;
    }

    function addStore(
        string memory _name,
        string memory _email,
        string memory _storeFrontImage
    ) public notHaveStore(msg.sender) returns (bool) {
        // require(true);
        storesCount = storesCount.add(1);
        storesById[storesCount] = Store(
            storesCount,
            msg.sender,
            _name,
            _storeFrontImage,
            0,
            0
        );
        storesByAddress[msg.sender] = Store(
            storesCount,
            msg.sender,
            _name,
            _storeFrontImage,
            0,
            0
        );
        storesBySellers[msg.sender] = storesCount;
        emit NewStoreAdded(msg.sender, _name, _email, _storeFrontImage);
        return true;
    }

    // add product
    modifier onlyStoreOwner() {
        require(
            storesById[storesBySellers[msg.sender]].userAddress == msg.sender,
            "You are not the store owner!"
        );
        _;
    }
    modifier productExists(uint256 _id) {
        require(
            stores[storesByProductId[_id]][_id].exists,
            "Product not found."
        );
        _;
    }

    function addProduct(
        string memory _name,
        string memory _category,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _price,
        uint256 _productCondition
    ) public {
        productCount = productCount.add(1);

        Product memory product = Product(
            productCount,
            _name,
            _category,
            "empty",
            _startTime,
            _endTime,
            _price,
            address(0),
            msg.sender,
            ProductCondition(_productCondition),
            ProductState.ForSale,
            true
        );

        stores[msg.sender][productCount] = product;
        storesByProductId[productCount] = msg.sender;

        // update product count by store
        productCountByStore[msg.sender] = productCountByStore[msg.sender].add(
            1
        );
    }

    // get product
    function getProduct(uint256 _id)
        public
        view
        productExists(_id)
        returns (
            uint256 id,
            string memory productName,
            string memory category,
            uint256 startTime,
            uint256 endTime,
            uint256 price,
            address buyer,
            address sellerAddress,
            ProductCondition condition,
            ProductState productState
        )
    {
        address x = storesByProductId[_id];

        Product memory product = stores[x][_id]; // load product from memory
        return (
            product.id,
            product.productName,
            product.category,
            product.startTime,
            product.endTime,
            product.price,
            product.buyer,
            product.sellerAddress,
            product.productCondition,
            product.productState
        );
    }
}
