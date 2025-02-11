import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import { KcContext } from "../kc.gen";
import { I18n } from "./i18n";

// Referenced from >>>>> https://playground.cookieconsent.orestbida.com/
const useSetCookieConsent = (kcContext: KcContext, i18n: I18n) => {
    const showGoogleCaptcha =
        kcContext.properties[
            "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT_GOOGLE_CAPTCHA"
        ] === "TRUE";

    window.CookieConsent = CookieConsent;
    CookieConsent.run({
        mode: "opt-in",
        autoShow: true,
        revision: 0,
        manageScriptTags: true,
        autoClearCookies: true,
        hideFromBots: true,
        disablePageInteraction: true,
        guiOptions: {
            consentModal: {
                layout: "cloud", // box/cloud/bar
                position: "bottom right", // bottom/middle/top + left/right/center
                flipButtons: true,
                equalWeightButtons: true
                // transition: "slide", // zoom/slide ----> https://github.com/orestbida/cookieconsent/discussions/462#discussioncomment-4778665
            },
            preferencesModal: {
                layout: "bar", // box/bar
                position: "right", // left/right
                flipButtons: true,
                equalWeightButtons: true
                // transition: "slide", // zoom/slide
            }
        },
        categories: {
            necessary: {
                enabled: true, // this category is enabled by default
                readOnly: true // this category cannot be disabled
            },
            google_recaptcha: {
                autoClear: {
                    cookies: [
                        {
                            name: new RegExp(/.*/), // all
                            domain: ".google.com"
                        },
                        {
                            name: new RegExp(/.*/), // all
                            domain: "www.google.com"
                        }
                    ],
                    reloadPage: true
                }
            }
        },
        language: {
            default:
                navigator &&
                navigator.language &&
                ["de", "en", "fr", "it", "es", "cs", "nl", "pl", "ru"].includes(
                    navigator.language
                )
                    ? navigator.language
                    : "en",
            autoDetect: "document",
            translations: {
                de: {
                    consentModal: {
                        title: "DIESE WEBSEITE VERWENDET COOKIES",
                        description: `Diese Website verwendet unbedingt erforderliche Cookies, um ihre ordnungsgemäße Funktion sicherzustellen. Weitere Informationen finden Sie in unserer <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Datenschutzerklärung</a>.`,
                        acceptAllBtn: "Alle Akzeptieren",
                        showPreferencesBtn: "Einstellungen anpassen"
                    },
                    preferencesModal: {
                        title: "Cookie Einstellungen",
                        acceptAllBtn: "Alle Akzeptieren",
                        savePreferencesBtn: "Speichern",
                        closeIconLabel: "SchlieÃŸen",
                        sections: [
                            {
                                title: "Wozu verwenden wir Cookies?",
                                description: `Diese Website verwendet unbedingt erforderliche Cookies, um ihre ordnungsgemäße Funktion sicherzustellen. Weitere Informationen finden Sie in unserer <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Datenschutzerklärung</a>.`
                            },
                            {
                                title: "Notwendige Cookies",
                                description:
                                    "Notwendige Cookies helfen dabei, eine Webseite nutzbar zu machen, indem sie Grundfunktionen wie Cookie-Einstellungen, Seitennavigation und Zugriff auf sichere Bereiche der Webseite ermöglichen. Die Webseite kann ohne diese Cookies nicht richtig funktionieren.",
                                linkedCategory: "necessary"
                            },
                            ...(showGoogleCaptcha
                                ? [
                                      {
                                          title: "Recaptcha von Google",
                                          description:
                                              "Für die Registrierung und zur Bestätigung Ihrer Identität setzen wir das Recaptcha von Google ein. Dieses lädt unter anderem Skripte von Servern des Unternehmens Google Inc. mit Sitz in Amerika, speichert Cookies und überträgt Nutzerdaten an Server des Unternehmens.<br>Ohne ein Akzeptieren dieser Kategorie ist eine Registrierung nicht möglich. <br><br>Weitere Informationen erhalten Sie in unserer Datenschutzerklärung. <br>Für eine manuelle Regestrierung sprechen Sie uns über die allg. Kontaktwege direkt an.",
                                          linkedCategory: "google_recaptcha"
                                      }
                                  ]
                                : [])
                        ]
                    }
                },
                en: {
                    consentModal: {
                        title: "We use some cookies",
                        description: `This website uses essential cookies to ensure its proper functioning and audience tracking cookies. These cookies comply with the GDPR legislation. More information is available in our <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Privacy Policy</a>.`,
                        acceptAllBtn: "Accept All",
                        showPreferencesBtn: "Settings"
                    },
                    preferencesModal: {
                        title: "Cookie Settings",
                        acceptAllBtn: "Accept All",
                        savePreferencesBtn: "Save",
                        closeIconLabel: "Close",
                        sections: [
                            {
                                title: "What are Cookies used for?",
                                description: `This website uses essential cookies to ensure its proper functioning and audience tracking cookies. These cookies comply with the GDPR legislation. More information is available in our <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Privacy Policy</a>.`
                            },
                            {
                                title: "Functional Cookies",
                                description:
                                    "These cookies are necessary for the proper functioning of the site: they are used, during your session, to remember the language you have chosen, to remember your connection as a customer, to allow you to filter the display of products, to remember your basket, to record your order. These functional cookies cannot be deactivated as this would make it impossible for you to browse the site. These essential cookies are internal cookies from our website.",
                                linkedCategory: "necessary"
                            },
                            ...(showGoogleCaptcha
                                ? [
                                      {
                                          title: "Recaptcha from Google",
                                          description:
                                              "We use Google's Recaptcha to register and confirm your identity. Among other things, this loads scripts from servers of Google Inc. based in America, stores cookies and transfers user data to the company's servers.<br>Registering is not possible without accepting this category. Further information is available in our Privacy Policy. For further information or manual registration, please contact us directly via the general contact channels.",
                                          linkedCategory: "google-recaptcha"
                                      }
                                  ]
                                : [])
                        ]
                    }
                },
                fr: {
                    consentModal: {
                        title: "Informations sur les cookies",
                        description: `Ce site web utilise des cookies essentiels pour assurer son bon fonctionnement et des cookies de suivi dâ€™audience. Ces cookies sont conformes Ã  la lÃ©gislation GDPR. Plus dinformations dans notre <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Politique de ConfidentialitÃ©</a>.`,
                        acceptAllBtn: "Acceptez tout",
                        showPreferencesBtn: "Ajuster les paramÃ¨tres"
                    },
                    preferencesModal: {
                        title: "ParamÃ¨tres des cookies",
                        acceptAllBtn: "Acceptez tout",
                        savePreferencesBtn: "Sauvegarder",
                        closeIconLabel: "Fermer",
                        sections: [
                            {
                                title: "Pourquoi utilisons-nous les cookies?",
                                description: `Ce site web utilise des cookies essentiels pour assurer son bon fonctionnement et des cookies de suivi dâ€™audience. Ces cookies sont conformes Ã  la lÃ©gislation GDPR. Plus dinformations dans notre <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Politique de ConfidentialitÃ©</a>`
                            },
                            {
                                title: "Cookies Fonctionnels",
                                description:
                                    "Ces cookies sont nÃ©cessaires au bon fonctionnement du site: ils servent, durant votre session, Ã  mÃ©moriser la langue choisie, Ã  mÃ©moriser votre connexion en tant que client, Ã  vous permettre de filtrer lâ€™affichage des produits, Ã  mÃ©moriser votre panier, Ã  enregistrer votre commande. Ces cookies fonctionnels ne sont pas dÃ©sactivables car cela rendrait impossible votre navigation sur le site. Ces cookies indispensables sont des cookies internes, provenant de notre site.",
                                linkedCategory: "necessary"
                            },
                            ...(showGoogleCaptcha
                                ? [
                                      {
                                          title: "Recaptcha - Google",
                                          description:
                                              "Nous utilisons le Recaptcha de Google pour enregistrer et confirmer votre identitÃ©. Entre autres choses, cela charge des scripts Ã  partir des serveurs de Google Inc. basÃ©s en AmÃ©rique, stocke des cookies et transfÃ¨re les donnÃ©es des utilisateurs vers les serveurs de l'entreprise.<br>L'inscription n'est pas possible sans accepter cette catÃ©gorie. De plus amples informations sont disponibles dans notre Politique de confidentialitÃ©. Pour plus dâ€™informations ou pour une inscription manuelle, veuillez nous contacter directement via les canaux de contact gÃ©nÃ©raux.",
                                          linkedCategory: "google-recaptcha"
                                      }
                                  ]
                                : [])
                        ]
                    }
                },
                it: {
                    consentModal: {
                        title: "Utilizziamo alcuni cookie",
                        description: `Questo sito Web utilizza cookie essenziali per garantire il corretto funzionamento e cookie di tracciamento del pubblico. Questi cookie sono conformi alla normativa GDPR. Ulteriori informazioni sono disponibili nella nostra <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Informativa sulla privacy</a>.`,
                        acceptAllBtn: "Accettare Tutti",
                        showPreferencesBtn: "Maggiori informazioni"
                    },
                    preferencesModal: {
                        title: "Utilizziamo alcuni cookie",
                        acceptAllBtn: "Accettare Tutti",
                        savePreferencesBtn: "Salva",
                        closeIconLabel: "Vicino",
                        sections: [
                            {
                                title: "Per cosa utilizziamo i cookie?",
                                description: `Questo sito Web utilizza cookie essenziali per garantire il corretto funzionamento e cookie di tracciamento del pubblico. Questi cookie sono conformi alla normativa GDPR. Ulteriori informazioni sono disponibili nella nostra <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Informativa sulla privacy</a>.`
                            },
                            {
                                title: "Cookie funzionali",
                                description:
                                    "Questi cookie sono necessari per il corretto funzionamento del sito: vengono utilizzati, durante la tua sessione, per ricordare la lingua che hai scelto, per ricordare la tua connessione come cliente, per permetterti di filtrare la visualizzazione dei prodotti, per ricordare il tuo carrello , per registrare il tuo ordine. Questi cookie funzionali non possono essere disattivati â€‹â€‹in quanto ciÃ² renderebbe impossibile la navigazione sul sito. Questi cookie essenziali sono cookie interni del nostro sito web.",
                                linkedCategory: "necessary"
                            },
                            ...(showGoogleCaptcha
                                ? [
                                      {
                                          title: "Recaptcha - Google",
                                          description:
                                              "Utilizziamo Recaptcha di Google per registrare e confermare la tua identitÃ . Tra le altre cose, carica script dai server di Google Inc. con sede in America, memorizza cookie e trasferisce i dati dell'utente ai server della societÃ .<br>Non Ã¨ possibile registrarsi senza accettare questa categoria. Ulteriori informazioni sono disponibili nella nostra Informativa sulla privacy. Per ulteriori informazioni o per la registrazione manuale vi invitiamo a contattarci direttamente tramite i canali di contatto generali.",
                                          linkedCategory: "google-recaptcha"
                                      }
                                  ]
                                : [])
                        ]
                    }
                },
                es: {
                    consentModal: {
                        title: "ESTE SITIO WEB UTILIZA COOKIES",
                        description: `Este sitio web utiliza cookies estrictamente necesarias para garantizar su correcto funcionamiento. Para más información, consulte nuestra <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Política de Privacidad</a>.`,
                        acceptAllBtn: "Aceptar Todo",
                        showPreferencesBtn: "Ajustar Preferencias"
                    },
                    preferencesModal: {
                        title: "Configuración de Cookies",
                        acceptAllBtn: "Aceptar Todo",
                        savePreferencesBtn: "Guardar",
                        closeIconLabel: "Cerrar",
                        sections: [
                            {
                                title: "¿Para qué usamos las cookies?",
                                description: `Este sitio web utiliza cookies estrictamente necesarias para garantizar su correcto funcionamiento. Para más información, consulte nuestra <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Política de Privacidad</a>.`
                            },
                            {
                                title: "Cookies Necesarias",
                                description:
                                    "Las cookies necesarias ayudan a hacer que un sitio web sea utilizable al habilitar funciones básicas como la configuración de cookies, la navegación por la página y el acceso a áreas seguras del sitio web. El sitio web no puede funcionar correctamente sin estas cookies.",
                                linkedCategory: "necessary"
                            },
                            ...(showGoogleCaptcha
                                ? [
                                      {
                                          title: "Recaptcha de Google",
                                          description:
                                              "Para el registro y la confirmación de su identidad, utilizamos Recaptcha de Google. Esto, entre otras cosas, carga scripts desde servidores de Google Inc. con sede en Estados Unidos, almacena cookies y transfiere datos de usuarios a los servidores de la empresa.<br>No es posible registrarse sin aceptar esta categoría. Para más información, consulte nuestra Política de Privacidad. Para un registro manual, contáctenos directamente a través de los canales de contacto generales.",
                                          linkedCategory: "google_recaptcha"
                                      }
                                  ]
                                : [])
                        ]
                    }
                },
                cs: {
                    consentModal: {
                        title: "TATO WEBOVÁ STRÁNKA POUŽÍVÁ COOKIES",
                        description: `Tato webová stránka používá nezbytně nutné cookies, aby zajistila svou správnou funkci. Více informací naleznete v naší <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Zásadách ochrany osobních údajů</a>.`,
                        acceptAllBtn: "Přijmout Vše",
                        showPreferencesBtn: "Upravit Nastavení"
                    },
                    preferencesModal: {
                        title: "Nastavení Cookies",
                        acceptAllBtn: "Přijmout Vše",
                        savePreferencesBtn: "Uložit",
                        closeIconLabel: "Zavřít",
                        sections: [
                            {
                                title: "K čemu používáme cookies?",
                                description: `Tato webová stránka používá nezbytně nutné cookies, aby zajistila svou správnou funkci. Více informací naleznete v naší <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Zásadách ochrany osobních údajů</a>.`
                            },
                            {
                                title: "Nezbytné Cookies",
                                description:
                                    "Nezbytné cookies pomáhají zpřístupnit webové stránky tím, že umožňují základní funkce, jako je nastavení cookies, navigace na stránce a přístup do zabezpečených oblastí webových stránek. Bez těchto cookies by webové stránky nemohly správně fungovat.",
                                linkedCategory: "necessary"
                            },
                            ...(showGoogleCaptcha
                                ? [
                                      {
                                          title: "Recaptcha od Google",
                                          description:
                                              "Pro registraci a potvrzení vaší identity používáme Recaptcha od Google. To mimo jiné načítá skripty ze serverů společnosti Google Inc. se sídlem v Americe, ukládá cookies a přenáší uživatelská data na servery společnosti.<br>Bez přijetí této kategorie není registrace možná. Více informací naleznete v našich Zásadách ochrany osobních údajů. Pro manuální registraci nás prosím kontaktujte prostřednictvím obecných kontaktních kanálů.",
                                          linkedCategory: "google_recaptcha"
                                      }
                                  ]
                                : [])
                        ]
                    }
                },
                nl: {
                    consentModal: {
                        title: "DEZE WEBSITE GEBRUIKT COOKIES",
                        description: `Deze website gebruikt strikt noodzakelijke cookies om de goede werking te garanderen. Voor meer informatie, zie onze <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Privacyverklaring</a>.`,
                        acceptAllBtn: "Alles Accepteren",
                        showPreferencesBtn: "Voorkeuren Aanpassen"
                    },
                    preferencesModal: {
                        title: "Cookievoorkeuren",
                        acceptAllBtn: "Alles Accepteren",
                        savePreferencesBtn: "Opslaan",
                        closeIconLabel: "Sluiten",
                        sections: [
                            {
                                title: "Waarom gebruiken we cookies?",
                                description: `Deze website gebruikt strikt noodzakelijke cookies om de goede werking te garanderen. Voor meer informatie, zie onze <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Privacyverklaring</a>.`
                            },
                            {
                                title: "Noodzakelijke Cookies",
                                description:
                                    "Noodzakelijke cookies helpen een website bruikbaar te maken door basisfuncties zoals cookie-instellingen, paginanavigatie en toegang tot beveiligde delen van de website mogelijk te maken. Zonder deze cookies kan de website niet goed functioneren.",
                                linkedCategory: "necessary"
                            },
                            ...(showGoogleCaptcha
                                ? [
                                      {
                                          title: "Recaptcha van Google",
                                          description:
                                              "Voor registratie en bevestiging van uw identiteit gebruiken we Recaptcha van Google. Dit laadt onder andere scripts van servers van Google Inc. in Amerika, slaat cookies op en stuurt gebruikersgegevens naar de servers van het bedrijf.<br>Registratie is niet mogelijk zonder deze categorie te accepteren. Voor meer informatie, zie onze Privacyverklaring. Neem voor een handmatige registratie contact met ons op via de algemene contactkanalen.",
                                          linkedCategory: "google_recaptcha"
                                      }
                                  ]
                                : [])
                        ]
                    }
                },
                pl: {
                    consentModal: {
                        title: "TA STRONA INTERNETOWA UŻYWA CIASTECZEK",
                        description: `Ta strona internetowa używa niezbędnych plików cookie, aby zapewnić prawidłowe działanie. Więcej informacji można znaleźć w naszej <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Polityce Prywatności</a>.`,
                        acceptAllBtn: "Zaakceptuj Wszystko",
                        showPreferencesBtn: "Dostosuj Ustawienia"
                    },
                    preferencesModal: {
                        title: "Ustawienia Plików Cookie",
                        acceptAllBtn: "Zaakceptuj Wszystko",
                        savePreferencesBtn: "Zapisz",
                        closeIconLabel: "Zamknij",
                        sections: [
                            {
                                title: "Do czego używamy plików cookie?",
                                description: `Ta strona internetowa używa niezbędnych plików cookie, aby zapewnić prawidłowe działanie. Więcej informacji można znaleźć w naszej <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Polityce Prywatności</a>.`
                            },
                            {
                                title: "Niezbędne Pliki Cookie",
                                description:
                                    "Niezbędne pliki cookie pomagają uczynić stronę internetową użyteczną poprzez umożliwienie podstawowych funkcji, takich jak ustawienia plików cookie, nawigacja po stronie i dostęp do bezpiecznych obszarów strony. Strona internetowa nie może działać poprawnie bez tych plików cookie.",
                                linkedCategory: "necessary"
                            },
                            ...(showGoogleCaptcha
                                ? [
                                      {
                                          title: "Recaptcha od Google",
                                          description:
                                              "Do rejestracji i potwierdzenia tożsamości używamy Recaptcha od Google. Wśród innych rzeczy, ładuje to skrypty z serwerów Google Inc. z siedzibą w Ameryce, przechowuje pliki cookie i przekazuje dane użytkowników na serwery firmy.<br>Rejestracja nie jest możliwa bez zaakceptowania tej kategorii. Więcej informacji można znaleźć w naszej Polityce Prywatności. W przypadku rejestracji ręcznej skontaktuj się z nami bezpośrednio poprzez ogólne kanały kontaktowe.",
                                          linkedCategory: "google_recaptcha"
                                      }
                                  ]
                                : [])
                        ]
                    }
                },
                ru: {
                    consentModal: {
                        title: "ЭТОТ САЙТ ИСПОЛЬЗУЕТ COOKIES",
                        description: `Этот сайт использует строго необходимые файлы cookie для обеспечения своей корректной работы. Подробнее см. в нашей <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Политике Конфиденциальности</a>.`,
                        acceptAllBtn: "Принять Все",
                        showPreferencesBtn: "Настроить Параметры"
                    },
                    preferencesModal: {
                        title: "Настройки Cookies",
                        acceptAllBtn: "Принять Все",
                        savePreferencesBtn: "Сохранить",
                        closeIconLabel: "Закрыть",
                        sections: [
                            {
                                title: "Для чего мы используем cookies?",
                                description: `Этот сайт использует строго необходимые файлы cookie для обеспечения своей корректной работы. Подробнее см. в нашей <a href="${i18n.advancedMsgStr("footerDataprotectionUrl")}" class="cc-link">Политике Конфиденциальности</a>.`
                            },
                            {
                                title: "Необходимые Cookies",
                                description:
                                    "Необходимые cookies помогают сделать сайт пригодным для использования, обеспечивая основные функции, такие как настройки cookies, навигация по странице и доступ к защищенным областям сайта. Без этих cookies сайт не сможет работать корректно.",
                                linkedCategory: "necessary"
                            },
                            ...(showGoogleCaptcha
                                ? [
                                      {
                                          title: "Recaptcha от Google",
                                          description:
                                              "Для регистрации и подтверждения вашей личности мы используем Recaptcha от Google. Это, среди прочего, загружает скрипты с серверов Google Inc., расположенных в Америке, сохраняет cookies и передает пользовательские данные на серверы компании.<br>Регистрация невозможна без принятия этой категории. Подробнее см. в нашей Политике Конфиденциальности. Для ручной регистрации свяжитесь с нами напрямую через общие каналы связи.",
                                          linkedCategory: "google_recaptcha"
                                      }
                                  ]
                                : [])
                        ]
                    }
                }
            }
        }
    });
};

export default useSetCookieConsent;
