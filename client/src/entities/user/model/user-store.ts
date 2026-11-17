import {User} from "@/entities/user/model/types";
import {create} from "zustand";

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    changeLogo: (logoUrl: string) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => {
        set({user});
    },
    changeLogo: (logoUrl) => {
        set(state => {
            if(!state.user) return state

            return {user: {...state.user, logoUrl}}
        })
    }
}))