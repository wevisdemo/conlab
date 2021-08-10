import { FunctionComponent, MouseEventHandler } from 'react';
import Button from './button';
import Card from './card';
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
  <Card
    className={`${className} ${
      !showButton ? 'cursor-pointer' : null
    } flex flex-col items-center p-5 space-y-4 w-full`}
    onClick={(e) => (!showButton && onClick ? onClick(e) : null)}
  >
    <Pill>
      เรื่องที่ {topicNumber}: {shortTitle}
    </Pill>
    <div className="text-headline-2 text-center">{title}</div>
    <img src={iconUrl} alt="" width={120} height={120} />
    {showButton ? (
      <Button className="self-stretch" state="solid" onClick={onClick}>
        เริ่มกันเลย
      </Button>
    ) : null}
  </Card>
);

export default TopicCard;
