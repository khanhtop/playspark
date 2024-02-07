import QRCode from "react-qr-code";

export default function QR({ value, className }) {
  return (
    <QRCode
      size={256}
      // style={{ height: "auto", maxWidth: "100%" }}
      value={value}
      viewBox={`0 0 256 256`}
      className={className}
    />
  );
}
