import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useSDK } from '@metamask/sdk-react';

// Temporary mock data until config and ABIs are set up
const CONTRACT_ADDRESSES = {
  UserAuth: '0xdc51df92de1daa558a781b10b8511e1d8511fe97', // Replace with actual RSK testnet address
  AuraPoints: '0xc15aae404a20f104c8b3edb1b28dc8d9cc66945f',     // Replace with actual RSK testnet address
  CourseStaking: '0xeDa12Eb1CBDb6663306b4BCa09Ce52Da31aED5F2' // Replace with actual RSK testnet address
};

// Add the actual ABI from your compiled contract
const UserAuthABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "referralId",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "auraTokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			}
		],
		"name": "updateScore",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "referralId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			}
		],
		"name": "updateUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "referralId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			}
		],
		"name": "UserCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "referralId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			}
		],
		"name": "UserLoggedIn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "referralId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			}
		],
		"name": "UserUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "login",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "referralId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "userExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const CourseStakingABI = [
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
		"inputs": [],
		"name": "reEnroll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
];  

// RSK testnet chain details
const RSK_TESTNET = {
  chainId: '0x1F',  // 31 in decimal
  chainName: 'RSK Testnet',
  nativeCurrency: {
    name: 'RSK Bitcoin',
    symbol: 'tRBTC',
    decimals: 18
  },
  rpcUrls: ['https://public-node.testnet.rsk.co'],
  blockExplorerUrls: ['https://explorer.testnet.rsk.co']
};

// Temporary chain switching function
const switchToRSKTestnet = async () => {
  if (!window.ethereum) return;
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: RSK_TESTNET.chainId }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [RSK_TESTNET],
        });
      } catch (addError) {
        console.error('Failed to add RSK Testnet:', addError);
      }
    }
  }
};

export const useContracts = () => {
  const { connected, account } = useSDK();
  const [userAuthContract, setUserAuthContract] = useState<ethers.Contract | null>(null);
  const [courseStakingContract, setCourseStakingContract] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeContracts = async () => {
      if (!window.ethereum || !connected || !account) {
        setLoading(false);
        return;
      }

      try {
        await switchToRSKTestnet();

        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();

        const userAuth = new ethers.Contract(
          CONTRACT_ADDRESSES.UserAuth,
          UserAuthABI,
          signer
        );

        setUserAuthContract(userAuth);
        setError(null);
      } catch (err: any) {
        console.error('Failed to initialize contracts:', err);
        setError(err.message || 'Failed to initialize contracts');
      } finally {
        setLoading(false);
      }
    };

    initializeContracts();
  }, [connected, account]);

  const createUser = async (name: string, referralId: string = '') => {
    if (!userAuthContract || !account) {
      throw new Error('Contract or account not available');
    }

    try {
      console.log('Creating user with params:', {
        name,
        referralId
      });

      const provider = userAuthContract.provider;
      const gasPrice = (await provider.getGasPrice()).mul(120).div(100);

      // Wait for the transaction to be mined
      const tx = await userAuthContract.createUser(
        name,
        referralId || '',
        {
          gasLimit: ethers.BigNumber.from(200000),
          gasPrice
        }
      );

      console.log('Waiting for transaction to be mined:', tx.hash);
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      // Verify user was created
      const exists = await userAuthContract.userExists(account);
      if (!exists) {
        throw new Error('User creation failed verification');
      }

      return receipt;
    } catch (err: any) {
      console.error('Create user error:', err);
      throw err;
    }
  };

  const checkUserExists = async () => {
    if (!userAuthContract || !account) return false;
    try {
      await switchToRSKTestnet();
      return await userAuthContract.userExists(account);
    } catch (err) {
      console.error('Failed to check user existence:', err);
      return false;
    }
  };

  const loginUser = async () => {
    if (!userAuthContract || !account) return null;
    try {
      await switchToRSKTestnet();
      const [name, referralId, score] = await userAuthContract.login(account);
      return { name, referralId, score: score.toString() };
    } catch (err) {
      console.error('Failed to login:', err);
      return null;
    }
  };

  return {
    userAuthContract,
    courseStakingContract,
    loading,
    error,
    checkUserExists,
    loginUser,
    createUser,
  };
};