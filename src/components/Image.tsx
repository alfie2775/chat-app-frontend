const Image = ({
  src,
  className = "",
  style = {},
  alt,
}: {
  src: string;
  className?: string;
  style?: {};
  alt: string;
}) => {
  return (
    <img
      src={src || "/user.png"}
      className={"image " + className}
      style={style}
      alt={alt}
    />
  );
};

export default Image;
