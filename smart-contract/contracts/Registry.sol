// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


contract WritingRegistry {
    struct Submission {
        address author;
        uint256 timestamp;
    }

    mapping(bytes32 => Submission) private submissions;   
    mapping(address => bytes32[]) private authorSubmissions;

    event WorkRegistered(address indexed author, bytes32 indexed contentHash, uint256 timestamp);

  
    function registerWork(bytes32 contentHash) external {
        require(contentHash != bytes32(0), "Invalid content hash");
        require(submissions[contentHash].author == address(0), "Content already registered");

        submissions[contentHash] = Submission({
            author: msg.sender,
            timestamp: block.timestamp
        });

        authorSubmissions[msg.sender].push(contentHash);

        emit WorkRegistered(msg.sender, contentHash, block.timestamp);
    }

    /**
      Check if a given content hash is registered
      contentHash The hash to check
    registered True if registered, false otherwise
      author Address of the registrant (zero address if not registered)
      timestamp Unix timestamp of registration (0 if not registered)
     */
    function checkIfRegistered(bytes32 contentHash)
        external
        view
        returns (
            bool registered,
            address author,
            uint256 timestamp
        )
    {
        Submission memory entry = submissions[contentHash];
        if (entry.author == address(0)) {
            return (false, address(0), 0);
        }
        return (true, entry.author, entry.timestamp);
    }

    
    function getSubmissionsByAuthor(address authorAddress)
    external
    view
    returns (bytes32[] memory hashes, address[] memory authors, uint256[] memory timestamps)
{
    uint256 count = authorSubmissions[authorAddress].length;
    hashes = new bytes32[](count);
    authors = new address[](count);
    timestamps = new uint256[](count);

    for (uint256 i = 0; i < count; i++) {
        bytes32 hash = authorSubmissions[authorAddress][i];
        Submission memory sub = submissions[hash];
        hashes[i] = hash;
        authors[i] = sub.author;
        timestamps[i] = sub.timestamp;
    }
}
}
