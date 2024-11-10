import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useSDK } from '@metamask/sdk-react';
import { CONTRACT_ADDRESSES } from '@/lib/contracts/config';
import { UserAuthABI } from '@/lib/contracts/abis/UserAuth';
import { CourseStakingABI } from '@/lib/contracts/abis/CourseStakingABI';
import { switchToEduChain } from '@/lib/utils/switchChain';

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
        // First ensure we're on the correct chain
        await switchToEduChain();

        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();

        // Initialize contracts with signer
        const userAuth = new ethers.Contract(
          CONTRACT_ADDRESSES.UserAuth,
          UserAuthABI,
          signer
        );

        const courseStaking = new ethers.Contract(
          CONTRACT_ADDRESSES.CourseStaking,
          CourseStakingABI,
          signer
        );

        setUserAuthContract(userAuth);
        setCourseStakingContract(courseStaking);
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
      // Ensure we're on the correct chain
      await switchToEduChain();

      const tx = await userAuthContract.createUser(
        account,
        name,
        referralId,
        {
          gasLimit: 500000
        }
      );

      const receipt = await tx.wait();
      return receipt;
    } catch (err: any) {
      console.error('Create user error:', err);
      if (err.data?.message) {
        throw new Error(err.data.message);
      }
      throw err;
    }
  };

  const checkUserExists = async () => {
    if (!userAuthContract || !account) return false;
    try {
      await switchToEduChain();
      return await userAuthContract.userExists(account);
    } catch (err) {
      console.error('Failed to check user existence:', err);
      return false;
    }
  };

  const loginUser = async () => {
    if (!userAuthContract || !account) return null;
    try {
      await switchToEduChain();
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