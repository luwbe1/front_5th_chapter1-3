import React, { useState } from "react";
import { generateItems } from "./utils";
import { ComplexForm } from "./components/ComplexForm";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { NotificationSystem } from "./components/NotificationSystem";
import {
  LoginProvider,
  NotificationProvider,
  ThemeProvider,
} from "./providers";
import { useThemeContext } from "./context/useThemeContext";
import { Item } from "./types";
import { memo } from "./@lib";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <NotificationProvider>
      <LoginProvider>
        <ThemeProvider>
          <AppContainer />
        </ThemeProvider>
      </LoginProvider>
    </NotificationProvider>
  );
};

const AppContainer: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return <AppLayout items={items} addItems={addItems} />;
};

const AppLayout = memo(
  ({ items, addItems }: { items: Item[]; addItems: () => void }) => {
    const { theme } = useThemeContext();

    return (
      <div
        className={`min-h-screen ${
          theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
        }`}
      >
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList items={items} onAddItemsClick={addItems} />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </div>
    );
  }
);

// App 컴포넌트 내보내기

export default App;
