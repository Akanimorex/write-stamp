// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 *  Writing Registry
 *  A simple on-chain registry for writers to timestamp and prove authorship of text content
 */
contract WritingRegistry {
    struct Submission {
        address author;
        uint256 timestamp;
    }

    // Mapping from content hash to its submission details
    mapping(bytes32 => Submission) private submissions;

    // Mapping from author address to list of their content hashes
    mapping(address => bytes32[]) private authorSubmissions;

    // Event emitted when a new work is registered
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

    /**
     * @notice Retrieve all content hashes registered by an author
     * @param authorAddress The address of the author
     * @return hashes Array of content hashes registered by the author
     */
    function getSubmissionsByAuthor(address authorAddress)
        external
        view
        returns (bytes32[] memory hashes)
    {
        return authorSubmissions[authorAddress];
    }
}
