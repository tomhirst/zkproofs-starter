import PageWrapper from '@/components/PageWrapper';
import Button from '@/components/Button';
import { useState } from 'react';

const Home = () => {
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
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
          <div className="w-[180px]">
            <Button large>Prove solution</Button>
          </div>
        </div>
        <div>
          <h3 className="text-4xl font-bold my-8">Proven solvers</h3>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
