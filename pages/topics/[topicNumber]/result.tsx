import { useState } from 'react';
import Dropdown from '../../../components/result/dropdown';
import topics from '../../../data/topics';

const Result = () => {
  const [selectedOption, setSelectedOption] = useState(
    topics[0].results[0].options[0]
  );

  return (
    <div>
      <h1 className="text-large-2">ผลการออกแบบรัฐธรรมนูญในฝันของคุณ</h1>
      <Dropdown
        options={topics[0].results[0].options}
        selectedOption={selectedOption}
        onChange={(option) => setSelectedOption(option)}
      />
    </div>
  );
};

export default Result;
