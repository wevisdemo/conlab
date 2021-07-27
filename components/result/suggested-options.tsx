import { FunctionComponent } from 'react';
import { ResultOption } from '../../data/topics';
import Card from '../card';

type SuggestedOptionsType = {
  options: ResultOption[];
};

const SuggestedOptions: FunctionComponent<SuggestedOptionsType> = ({
  options,
}) => (
  <Card className="text-body-2 space-y-4 bg-blue-50">
    <h3 className="font-black text-center">ผลการออกแบบเบื้องต้น</h3>
    <ol className="list-decimal ml-4">
      {options.map(({ title }) => (
        <li key={title}>{title}</li>
      ))}
    </ol>
  </Card>
);

export default SuggestedOptions;
