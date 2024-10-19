import clsx from "clsx";
import { createContext, ReactElement, useMemo, useState } from "react";

import { TabItem, TabItemProps } from "@/components/Tab/TabItem";

export type TabKey = string | number;
export type TabLabel = string | number | ReactElement;

interface TabProps {
  defaultKey: TabKey;
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  className?: string;
}

interface TabHeader {
  tabKey: TabKey;
  label: TabLabel;
}

interface TabContextState {
  activeKey: TabKey;
}

export const TabContext = createContext<TabContextState>({
  activeKey: "",
});

export const Tab = ({ defaultKey, children, className }: TabProps) => {
  const [activeKey, setActiveKey] = useState(defaultKey);

  const headers = useMemo<TabHeader[]>(() => {
    const headerArray: TabHeader[] = [];
    if (Array.isArray(children)) {
      children.forEach((c) => {
        if (c.type !== TabItem) {
          throw Error("TabItemを利用してください");
        }

        headerArray.push({
          tabKey: c.props.tabKey,
          label: c.props.label,
        });
      });
    } else if (children.type === TabItem) {
      headerArray.push({
        tabKey: children.props.tabKey,
        label: children.props.label,
      });
    } else {
      throw Error("TabItemを利用してください");
    }
    return headerArray;
  }, [children]);

  return (
    <TabContext.Provider value={{ activeKey }}>
      <ul
        className={clsx("flex", "w-full", "p-0", "m-0", "list-none", className)}
      >
        {headers.map(({ tabKey, label }) => {
          return (
            <li className={clsx("w-full")} key={tabKey}>
              <button
                className={clsx(
                  "w-full",
                  "py-2",
                  "px-6",
                  "font-bold",
                  "text-gray-500",
                  "cursor-pointer",
                  "bg-transparent",
                  "border-b-2",
                  "mb-4",
                  tabKey === activeKey && [
                    "!text-amber-500",
                    "!border-b-2",
                    "!border-b-amber-500",
                  ],
                )}
                onClick={() => setActiveKey(tabKey)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
      {children}
    </TabContext.Provider>
  );
};
