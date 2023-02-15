interface ErrorProps {
  title: string;
}

export default function Error(props: ErrorProps) {
  const { title } = props;

  return (
    <div className="main-screen__toast animate__animated animate__bounceInUp animate__faster">
      <div className="toast-text">{title}</div>
    </div>
  );
}
