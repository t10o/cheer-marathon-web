import { ReactNode, useContext } from "react";

import { TabContext, TabKey, TabLabel } from "./Tab.tsx";

export interface TabItemProps {
  tabKey: TabKey;
  label: TabLabel;
  children: ReactNode;
  className?: string;
}

export const TabItem = ({ tabKey, children }: TabItemProps) => {
  const { activeKey } = useContext(TabContext);

  return activeKey === tabKey ? children : null;
};
