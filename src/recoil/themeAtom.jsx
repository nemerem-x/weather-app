import { atom } from "recoil";

const appTheme = atom({
    key: 'themeBool',
    default: false,
});

export default appTheme