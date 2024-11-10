export const switchToEduChain = async () => {
  if (!window.ethereum) throw new Error('MetaMask is not installed');

  const chainId = "0xa045c"; // Your EduChain chainId
  
  try {
    // Try to switch to the chain
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId,
            chainName: 'EduChain',
            nativeCurrency: {
              name: 'EDU',
              symbol: 'EDU',
              decimals: 18
            },
            rpcUrls: ['https://open-campus-codex-sepolia.drpc.org'],
            blockExplorerUrls: ['https://edu-chain-testnet.blockscout.com/']
          }],
        });
      } catch (addError) {
        console.error('Failed to add EduChain:', addError);
      }
    }
    console.error('Failed to switch to EduChain:', switchError);
  }
}; 