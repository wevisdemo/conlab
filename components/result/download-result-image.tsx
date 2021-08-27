import { toPng } from 'html-to-image';
import { FunctionComponent, RefObject } from 'react';
import Button from '../button';

type DownloadResultImageProps = {
  node: RefObject<HTMLDivElement>;
};

const DownloadResultImage: FunctionComponent<DownloadResultImageProps> = ({
  node,
}) => (
  <Button
    state="outline"
    className="w-full flex flex-row justify-center items-center"
    onClick={async () => {
      if (node.current) {
        const imageUrl = await toPng(node.current, {
          cacheBust: true,
        });

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'my-dream-constitution.png';
        link.click();
        link.remove();
      }
    }}
  >
    <svg
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <path
        d="M0.5 2C0.5 0.895432 1.39543 0 2.5 0H10.5C10.7652 0 11.0196 0.105357 11.2071 0.292893L16.2071 5.29289C16.3946 5.48043 16.5 5.73478 16.5 6V18C16.5 19.1046 15.6046 20 14.5 20H2.5C1.39543 20 0.5 19.1046 0.5 18V2ZM14.0858 6L10.5 2.41421V6H14.0858ZM8.5 2L2.5 2V18H14.5V8H9.5C8.94772 8 8.5 7.55228 8.5 7V2ZM8.5 9.5C9.05228 9.5 9.5 9.94772 9.5 10.5V13.0858L9.79289 12.7929C10.1834 12.4024 10.8166 12.4024 11.2071 12.7929C11.5976 13.1834 11.5976 13.8166 11.2071 14.2071L9.20711 16.2071C8.81658 16.5976 8.18342 16.5976 7.79289 16.2071L5.79289 14.2071C5.40237 13.8166 5.40237 13.1834 5.79289 12.7929C6.18342 12.4024 6.81658 12.4024 7.20711 12.7929L7.5 13.0858L7.5 10.5C7.5 9.94771 7.94772 9.5 8.5 9.5Z"
        fill="black"
      />
    </svg>
    ดาวน์โหลดภาพข้อเสนอของคุณ
  </Button>
);

export default DownloadResultImage;
