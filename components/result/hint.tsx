const Hint = () => {
  return (
    <div className="z-10 -mb-5">
      <div className={'flex flex-col rounded-xl bg-blue-300 text-black'}>
        <div
          className={
            'flex flex-inline items-center text-center pl-[14px] pt-[14px]'
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
              fill="black"
            />
            <path
              d="M10 8C10.5523 8 11 8.44771 11 9V15C11 15.5523 10.5523 16 10 16C9.44771 16 9 15.5523 9 15V9C9 8.44771 9.44771 8 10 8Z"
              fill="black"
            />
            <path
              d="M11.5 5.5C11.5 6.32843 10.8284 7 10 7C9.17157 7 8.5 6.32843 8.5 5.5C8.5 4.67157 9.17157 4 10 4C10.8284 4 11.5 4.67157 11.5 5.5Z"
              fill="black"
            />
          </svg>
          <div className={'text-body-2 pl-[6px]'}>
            เราแค่แนะนำ สุดท้ายคนเลือกคือคุณ
          </div>
        </div>
        <div className={'text-small-1 px-[12px] py-[14px]'}>
          ลองศึกษารายละเอียดของตัวเลือกว่าเป็นอย่างที่คุณต้องการหรือไม่
          ถ้าดูแล้วไม่ถูกใจ ก็ลองเปลี่ยนเป็นตัวเลือกอื่นได้นะ
        </div>
      </div>
      <div className="mt-[-14px] grid justify-items-stretch">
        <svg
          className=" justify-self-end mr-[34px]"
          width="24"
          height="27"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 14L13.5185 26.2284C12.7203 27.1596 11.2797 27.1596 10.4815 26.2284L0 14L12 0L24 14Z"
            fill="#5CCCC5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hint;
