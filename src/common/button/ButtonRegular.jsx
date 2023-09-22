import ButtonCustom from "./ButtonCustom";

export default function ButtonRegular({ onClick, title, variant }) {
  return (
    <ButtonCustom
      variant={variant}
      color='primary'
      onClick={onClick}
      title={title}
      textVariant='h4'
    ></ButtonCustom>
  );
}
