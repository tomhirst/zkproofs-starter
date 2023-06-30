import PageWrapper from '@/components/PageWrapper';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
  useWaitForTransaction,
} from 'wagmi';

const Home = () => {
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [calldataLoading, setCalldataLoading] = useState(false);
  const [calldata, setCalldata] = useState(['', []]);
  const [calldataError, setCalldataError] = useState('');
  const [readText, setReadText] = useState('');
  const [hash, setHash] = useState('');
  const address = process.env.NEXT_PUBLIC_HARDHAT_PROVEN_SOLVERS_ADDRESS!;

  useEffect(() => {
    setCalldata(['', []]);
    setCalldataError('');
    setHash('');
  }, [input1, input2]);

  const getProof = async () => {
    if (!input1 && !input2) return;

    setCalldataError('');
    setCalldata(['', []]);
    setCalldataLoading(true);

    const input = {
      x: input1,
      y: input2,
    };

    const data = await fetch('/api/prove', {
      method: 'POST',
      body: JSON.stringify(input),
    });

    const json = await data.json();

    if (json.error) {
      setCalldataError(json.error);
      setCalldata(['', []]);
    } else {
      if (json.calldata) {
        setCalldata(json.calldata);
      }
    }

    setCalldataLoading(false);
  };

  const abi = [
    {
      inputs: [
        {
          internalType: 'bytes',
          name: 'proof',
          type: 'bytes',
        },
        {
          internalType: 'uint256[]',
          name: 'pubSignals',
          type: 'uint256[]',
        },
      ],
      name: 'prove',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'provenSolvers',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const { config, error } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'prove',
    args: [calldata[0], calldata[1]],
    enabled: calldata[0] && calldata[1].length > 0,
  });
  const {
    data: writeData,
    write,
    error: writeError,
    isLoading: writeLoading,
  } = useContractWrite(config);
  const { address: wallet } = useAccount();

  const { data: tx, isLoading: txLoading } = useWaitForTransaction({
    hash: writeData?.hash,
    enabled: !!writeData?.hash,
    onSuccess(data) {
      setHash(data.transactionHash);
    },
  });

  const {
    data,
    error: readError,
    isLoading: readLoading,
  } = useContractRead(
    {
      address,
      abi,
      functionName: 'provenSolvers',
      args: [wallet],
      enabled: !!wallet,
    },
    [wallet],
  );

  useEffect(() => {
    if (readLoading) {
      setReadText('Loading...');
    } else {
      setReadText(data ? 'Yes' : 'No');
    }
  }, [readLoading, data]);

  return (
    <PageWrapper>
      <div className="divide-y space-y-16">
        <div className="space-y-6">
          <h3 className="text-4xl font-bold">Solve this problem</h3>
          <div className="flex space-x-4 items-center text-xl">
            <div>
              <input
                className="border p-2 w-[100px]"
                type="number"
                value={input1}
                onChange={e => setInput1(parseInt(e.target.value))}
              />
            </div>
            <div>+</div>
            <div>
              <input
                className="border p-2 w-[100px]"
                type="number"
                value={input2}
                onChange={e => setInput2(parseInt(e.target.value))}
              />
            </div>
            <div>=</div>
            <div className="font-bold">3</div>
          </div>
          <div className="flex space-x-4">
            <div className="w-[180px]">
              <Button
                large
                onClick={getProof}
                disabled={(!input1 && !input2) || !!calldata[1].length}
              >
                {calldataLoading ? 'Loading...' : 'Check solution'}
              </Button>
            </div>
            <div className="w-[180px]">
              <Button
                large
                onClick={write}
                disabled={(!calldata[0] && !calldata[1].length) || writeLoading || txLoading}
              >
                {writeLoading || txLoading ? 'Loading...' : 'Prove on-chain'}
              </Button>
            </div>
          </div>
          <div>
            <>
              {calldataError && <div className="text-red-500">{calldataError}</div>}
              {hash && (
                <div className="text-green-600">
                  Transaction successful{' '}
                  <a
                    className="underline"
                    href={`https://goerli.etherscan.io/tx/${hash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Etherscan
                  </a>
                </div>
              )}
            </>
          </div>
        </div>
        <div>
          <h3 className="text-4xl font-bold my-8">Are you a proven solver?</h3>
          {readText}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
