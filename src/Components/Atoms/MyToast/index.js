import React, { memo, useRef } from 'react';
import Toast from "react-native-toast-notifications";
global.TOAST_ID = null;
export default memo((props) => {
    const refToast = useRef(<Toast />);
    global.showToast = (message = 'Simple Toast', duration = 1500, type = 'normal', placement = 'bottom') => {
        if (global.TOAST_ID != null) {
            refToast.current.update(global.TOAST_ID, message, { type: 'warning', duration: duration + 3000 })
            global.TOAST_ID = null;
            return false;
        }
        global.TOAST_ID = refToast.current.show(message, {
            type,//"normal | success | warning | danger | custom",
            placement,//"top | bottom",
            duration,
            offset: 30,
            animationType: 'slide-in',//"slide-in | zoom-in",
        });
        setTimeout(() => global.TOAST_ID = null, duration)
    }
    return (<Toast ref={refToast} />);
});
