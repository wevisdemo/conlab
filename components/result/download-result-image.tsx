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
    className="w-full"
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
    ดาวน์โหลดภาพผลลัพธ์
  </Button>
);

export default DownloadResultImage;
