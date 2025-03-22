type Props = {
  className?: string;
};

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#1E1B2C] p-4 text-white">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-10 h-10 rounded-full bg-[#2D2A3E] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 9L13.9558 13.5662C13.5299 14.2051 12.5728 14.1455 12.2294 13.4587L11.7706 12.5413C11.4272 11.8545 10.4701 11.7949 10.0442 12.4338L7 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold">CrossPay</h1>
      </div>
      <div className="text-center text-white/60 text-sm">
        <p>Powered by Celo MiniPay</p>
        <p className="mt-1">Secure, fast cross-border payments across Africa</p>
      </div>
    </div>
  );
}
