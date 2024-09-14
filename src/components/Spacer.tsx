import clsx from "clsx";

interface Props {
  tag?: "span" | "div";
  size?: "xsmall" | "small" | "medium" | "large";
}

export const Spacer = ({ tag: Tag = "span", size = "medium" }: Props) => {
  const isVertical = Tag === "div";

  const getMargin = () => {
    switch (size) {
      case "xsmall":
        return isVertical ? "my-1" : "mx-1";
      case "small":
        return isVertical ? "my-2" : "mx-2";
      case "medium":
        return isVertical ? "my-4" : "mx-4";
      case "large":
        return isVertical ? "my-6" : "mx-6";
    }
  };

  return <Tag className={clsx(getMargin())} />;
};
