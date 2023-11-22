import './App.css'
import { useEffect } from 'react'
import { useAccount, useConnect, useEnsName, useWalletClient, usePublicClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { HypercertClient  } from "@hypercerts-org/sdk";

function App() {
	const { address, isConnected } = useAccount()
	const { data: ensName } = useEnsName({ address })
	const { connect } = useConnect({
		connector: new InjectedConnector(),
	})
	const publicClient = usePublicClient()

	const { data: walletClient, isError, isLoading  } = useWalletClient()



	useEffect(() => {
		if (walletClient && publicClient && isConnected) {
			const hypercertClient = new HypercertClient({
				chain: {
					id: 10,
				}, // optimism
        easContractAddress: '0x4200000000000000000000000000000000000021',
				walletClient,
				publicClient,
				nftStorageToken: '...please paste an nft storage token here...',
			})
		}

	}, [address, walletClient, publicClient, isConnected])

	return (
		<>
			{isConnected ? (<div>Connected to {ensName ?? address}</div>):
				(<button onClick={() => connect()}>Connect Wallet</button>)
			}


			</>
	)
}

export default App
