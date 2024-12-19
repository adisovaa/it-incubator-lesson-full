import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import AppWithRedux from "./app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./app/store";

const root = createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    </StrictMode>
);



