
import { useEffect, useState } from "react";
import { getUserProfile, getI18nMessages, type I18nMessages, type UserProfile } from "./client";

export function useUserProfile(){

    const [userProfile, setUserProfile] = useState<UserProfile | undefined>(undefined);

    useEffect(() => {

        getUserProfile().then(setUserProfile);

    }, []);

    return { userProfile };


}

export function useI18nMessages() {

    const [i18nMessages, setI18nMessages] = useState<I18nMessages | undefined>(undefined);

    useEffect(() => {

        getI18nMessages().then(setI18nMessages);

    }, []);

    return { i18nMessages };

}
