export const CourseStakingABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "auraTokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "userAuthAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "refundAmount",
          "type": "uint256"
        }
      ],
      "name": "CourseCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "stakedAmount",
          "type": "uint256"
        }
      ],
      "name": "CourseEnrolled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "currentMilestone",
          "type": "uint256"
        }
      ],
      "name": "MilestoneUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "ReEnrolled",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_STAKE_AMOUNT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "GRACE_PERIOD",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "auraToken",
      "outputs": [
        {
          "internalType": "contract AuraPoints",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "enrollments",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "stakedAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "currentMilestone",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalMilestones",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastMilestoneTimestamp",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "completed",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getEnrollment",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "stakedAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "currentMilestone",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalMilestones",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastMilestoneTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "completed",
              "type": "bool"
            }
          ],
          "internalType": "struct CourseStaking.CourseEnrollment",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "reEnroll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "stakeForCourse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "currentMilestone",
          "type": "uint256"
        }
      ],
      "name": "updateMilestone",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "userAuth",
      "outputs": [
        {
          "internalType": "contract UserAuth",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
] as const; 