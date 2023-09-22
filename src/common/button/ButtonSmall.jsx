import ButtonCustom from "./ButtonCustom";

export default function ButtonSmall({ onClick, title, variant }) {
  return (
    <ButtonCustom
      size='small'
      variant={variant}
      color='primary'
      onClick={onClick}
      title={title}
      textVariant='h4'
      textColor='white.main'
    ></ButtonCustom>
  );
}
