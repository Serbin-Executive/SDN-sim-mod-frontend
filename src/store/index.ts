import notificationsReducer from "@store/slices/notifications";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        notifications: notificationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export default store;
