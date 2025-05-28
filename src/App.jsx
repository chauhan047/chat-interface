import { ChatProvider } from './context/ChatContext';
import ChatLayout from './components/ChatLayout/ChatLayout';
import './styles/main.scss';

function App() {
  return (
    <ChatProvider>
      <ChatLayout />
    </ChatProvider>
  );
}

export default App;