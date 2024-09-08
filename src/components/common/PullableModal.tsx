import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

export const PullableModal = ({ isOpen, onClose }: Props) => {
  const [{ y }, api] = useSpring(() => ({ y: -100 }));

  const openModal = () => {
    api.start({ y: 0 });
  };

  const closeModal = () => {
    api.start({ y: -100 });
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  const bind = useDrag(({ down, movement: [, my], cancel }) => {
    if (my > 300) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      cancel(closeModal());
    }
    api.start({ y: down ? Math.max(my, 0) : 0, immediate: down });
  });

  useEffect(() => {
    if (isOpen) {
      openModal();
    }
  }, [isOpen]);

  return (
    <animated.div
      {...bind()}
      style={{
        transform: y.to((y) => `translateY(${y}%)`),
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        touchAction: "none",
        zIndex: 1000,
      }}
    >
      <div style={{ padding: 20 }}>
        <h1>Pull down to close</h1>
      </div>
    </animated.div>
  );
};
