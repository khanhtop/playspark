export default function Text({ className, style, children, theme }) {
  if (theme === "pixel") {
    console.log("PIXEL");
    return (
      <p
        style={{
          ...style,

          //   fontSize: style?.fontSize ? style.fontSize + 16 : 32,
        }}
        className={`${className} font-pixel scale-[1.8] uppercase`}
      >
        {children}
      </p>
    );
  }

  return (
    <p style={style} className={`${className} font-titan`}>
      {children}
    </p>
  );
}
