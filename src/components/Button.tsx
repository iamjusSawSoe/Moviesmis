type Props = {
  styles: string;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ styles, text, onClick }: Props) => (
  <button
    type="button"
    className={`${styles} cursor-pointer py-2 px-6 bg-secondary font-poppins font-medium text-[18px] text-white outline-none rounded-[10px] hover:bg-dimBlack shadow-more hover:shadow-3xl shadow-secondary border-2 border-secondary bg-blend-multiply`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
