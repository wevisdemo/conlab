import { FunctionComponent, MouseEventHandler } from 'react';
import Button from './button';
import Pill from './pill';

type TopicCardProps = {
  topicNumber: number;
  shortTitle: string;
  title: string;
  iconUrl: string;
  className?: string;
  showButton?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
};

const TopicCard: FunctionComponent<TopicCardProps> = ({
  className,
  topicNumber,
  shortTitle,
  title,
  iconUrl,
  onClick,
  showButton = true,
}) => (
  <div
    className={`${className} ${
      !showButton ? 'cursor-pointer' : null
    } border-black border-[3px] rounded-xl oblique-shadow flex flex-col items-center p-5 space-y-4 w-full`}
    onClick={(e) => (!showButton && onClick ? onClick(e) : null)}
  >
    <Pill className="text-center">
      หมวดที่ {topicNumber}: {shortTitle}
    </Pill>
    <div className="text-headline-2 text-center">{title}</div>
    <img src={iconUrl} alt="" width={120} height={120} />
    {showButton ? (
      <Button className="self-stretch" state="solid" onClick={onClick}>
        เริ่มกันเลย
      </Button>
    ) : null}
  </div>
);

export default TopicCard;
