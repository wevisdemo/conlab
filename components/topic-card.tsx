import { FunctionComponent, MouseEventHandler } from 'react';
import { ImageLoaderProps } from 'next/image';
import Image from 'next/image';
import Button from './button';
import Pill from './pill';

type TopicCardProps = {
  topicNumber: number;
  shortTitle: string;
  title: string;
  iconUrl: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const TopicCard: FunctionComponent<TopicCardProps> = ({
  className,
  topicNumber,
  shortTitle,
  title,
  iconUrl,
  onClick,
}) => (
  <div
    className={`${className} border-black border-[3px] rounded-xl oblique-shadow flex flex-col items-center`}
  >
    <Pill className={'text-center mt-[20px] mx-[20px]'}>
      หมวดที่ {topicNumber}: {shortTitle}
    </Pill>
    <div className={'text-headline-2 mx-[20px] my-[16px] text-center'}>
      {title}
    </div>
    <Image loader={imgLoader} src={iconUrl} alt="" width={120} height={120} />
    <Button
      className="self-stretch mx-[20px] mb-[20px] mt-[16px]"
      state="solid"
      onClick={onClick}
    >
      เริ่มกันเลย
    </Button>
  </div>
);

const imgLoader = ({ src }: ImageLoaderProps) => {
  return `${src}`;
};

export default TopicCard;
