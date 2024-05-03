import { useEffect, useRef, useState } from "react";

export default function TapHold({
  bgColor,
  textColor,
  onComplete,
  width = 330,
}) {
  const [isHolding, setIsHolding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const resizeDivRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth } = entry.contentRect;
        if (newWidth >= width - 10) {
          setIsComplete(true);
        } else {
          setIsComplete(false);
        }
      }
    });

    resizeObserver.observe(resizeDivRef.current);

    return () => {
      if (resizeDivRef.current) {
        resizeObserver.unobserve(resizeDivRef.current);
      }
    };
  }, [width]);

  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete]);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        width: width,
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onMouseDown={() => setIsHolding(true)}
      onMouseUp={() => setIsHolding(false)}
      onMouseLeave={() => setIsHolding(false)}
      onTouchStart={() => setIsHolding(true)}
      onTouchEnd={() => setIsHolding(false)}
      onTouchCancel={() => setIsHolding(false)}
      className="relative h-16 rounded-3xl overflow-hidden border-4 border-white"
    >
      <div
        ref={resizeDivRef}
        style={{
          width: isComplete ? width : isHolding ? width : 0,
          transition: "4s width",
        }}
        className={`absolute h-full bg-black`}
      ></div>
      <div className="absolute w-full h-full font-octo text-3xl flex items-center justify-center pointer-events-none">
        {isComplete ? (
          <p>Redeemed!</p>
        ) : isHolding ? (
          <p>Redeeming</p>
        ) : (
          <p className="animate-pulse">Tap & Hold To Redeem</p>
        )}
      </div>
    </div>
  );
}
