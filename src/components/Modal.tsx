import ReactModal, { Props } from "react-modal";

export const Modal = (props: Props) => {
  return <ReactModal {...props}>{props.children}</ReactModal>;
};
