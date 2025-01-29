import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

// Referenced from >>>>> https://playground.cookieconsent.orestbida.com/
const useSetCookieConsent = () => {
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
                ["de", "en", "fr", "it"].includes(navigator.language)
                    ? navigator.language
                    : "en",
            autoDetect: "document",
            translations: {
                de: {
                    consentModal: {
                        title: "DIESE WEBSEITE VERWENDET COOKIES",
                        description:
                            'Diese Website verwendet unbedingt erforderliche Cookies, um ihre ordnungsgemÃ¤ÃŸe Funktion sicherzustellen. Weitere Informationen finden Sie in unserer <a href="https://almig.de/de/datenschutz" class="cc-link">DatenschutzerklÃ¤rung</a>.',
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
                                description:
                                    'Diese Website verwendet unbedingt erforderliche Cookies, um ihre ordnungsgemÃ¤ÃŸe Funktion sicherzustellen. Weitere Informationen finden Sie in unserer <a href="https://almig.de/de/datenschutz" class="cc-link">DatenschutzerklÃ¤rung</a>.'
                            },
                            {
                                title: "Notwendige Cookies",
                                description:
                                    "Notwendige Cookies helfen dabei, eine Webseite nutzbar zu machen, indem sie Grundfunktionen wie Cookie-Einstellungen, Seitennavigation und Zugriff auf sichere Bereiche der Webseite ermÃ¶glichen. Die Webseite kann ohne diese Cookies nicht richtig funktionieren.",
                                linkedCategory: "necessary"
                            },
                            {
                                title: "Recaptcha von Google",
                                description:
                                    "FÃ¼r die Registrierung und zur BestÃ¤tigung Ihrer IdentitÃ¤t setzen wir das Recaptcha von Google ein. Dieses lÃ¤dt unter anderem Skripte von Servern des Unternehmens Google Inc. mit Sitz in Amerika, speichert Cookies und Ã¼bertrÃ¤gt Nutzerdaten an Server des Unternehmens.<br>Ohne ein Akzeptieren dieser Kategorie ist eine Registrierung nicht mÃ¶glich. <br><br>Weitere Informationen erhalten Sie in unserer DatenschutzerklÃ¤rung. <br>FÃ¼r eine manuelle Regestrierung sprechen Sie uns Ã¼ber die allg. Kontaktwege direkt an.",
                                linkedCategory: "google_recaptcha"
                            }
                        ]
                    }
                },
                en: {
                    consentModal: {
                        title: "We use some cookies",
                        description:
                            'This website uses essential cookies to ensure its proper functioning and audience tracking cookies. These cookies comply with the RGPD legislation. More informations are available in our <a href="https://almig.de/en/data-protection" class="cc-link">Privacy Policy</a>.',
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
                                description:
                                    'This website uses essential cookies to ensure its proper functioning and audience tracking cookies. These cookies comply with the RGPD legislation. More informations are available in our <a href="https://almig.de/en/data-protection" class="cc-link">Privacy Policy</a>.'
                            },
                            {
                                title: "Functional Cookies",
                                description:
                                    "These cookies are necessary for the proper functioning of the site: they are used, during your session, to remember the language you have chosen, to remember your connection as a customer, to allow you to filter the display of products, to remember your basket, to record your order. These functional cookies cannot be deactivated as this would make it impossible for you to browse the site. These essential cookies are internal cookies from our website almig.de",
                                linkedCategory: "necessary"
                            },
                            {
                                title: "Recaptcha from Google",
                                description:
                                    "We use Google's Recaptcha to register and confirm your identity. Among other things, this loads scripts from servers of Google Inc. based in America, stores cookies and transfers user data to the company's servers.<br>Registering is not possible without accepting this category. Further information is available in our Privacy Policy. For further information or manual registration, please contact us directly via the general contact channels.",
                                linkedCategory: "google-recaptcha"
                            }
                        ]
                    }
                },
                fr: {
                    consentModal: {
                        title: "Informations sur les cookies",
                        description:
                            'Ce site web utilise des cookies essentiels pour assurer son bon fonctionnement et des cookies de suivi dâ€™audience. Ces cookies sont conformes Ã  la lÃ©gislation RGPD. Plus dinformations dans notre <a href="https://almig.de/fr/protection-des-donnees" class="cc-link">Politique de ConfidentialitÃ©</a>.',
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
                                description:
                                    'Ce site web utilise des cookies essentiels pour assurer son bon fonctionnement et des cookies de suivi dâ€™audience. Ces cookies sont conformes Ã  la lÃ©gislation RGPD. Plus dinformations dans notre <a href="https://almig.de/fr/protection-des-donnees" class="cc-link">Politique de ConfidentialitÃ©</a>.'
                            },
                            {
                                title: "Cookies Fonctionnels",
                                description:
                                    "Ces cookies sont nÃ©cessaires au bon fonctionnement du site: ils servent, durant votre session, Ã  mÃ©moriser la langue choisie, Ã  mÃ©moriser votre connexion en tant que client, Ã  vous permettre de filtrer lâ€™affichage des produits, Ã  mÃ©moriser votre panier, Ã  enregistrer votre commande. Ces cookies fonctionnels ne sont pas dÃ©sactivables car cela rendrait impossible votre navigation sur le site. Ces cookies indispensables sont des cookies internes, provenant de notre site almig.de",
                                linkedCategory: "necessary"
                            },
                            {
                                title: "Recaptcha - Google",
                                description:
                                    "Nous utilisons le Recaptcha de Google pour enregistrer et confirmer votre identitÃ©. Entre autres choses, cela charge des scripts Ã  partir des serveurs de Google Inc. basÃ©s en AmÃ©rique, stocke des cookies et transfÃ¨re les donnÃ©es des utilisateurs vers les serveurs de l'entreprise.<br>L'inscription n'est pas possible sans accepter cette catÃ©gorie. De plus amples informations sont disponibles dans notre Politique de confidentialitÃ©. Pour plus dâ€™informations ou pour une inscription manuelle, veuillez nous contacter directement via les canaux de contact gÃ©nÃ©raux.",
                                linkedCategory: "google-recaptcha"
                            }
                        ]
                    }
                },
                it: {
                    consentModal: {
                        title: "Utilizziamo alcuni cookie",
                        description:
                            'Questo sito Web utilizza cookie essenziali per garantire il corretto funzionamento e cookie di tracciamento del pubblico. Questi cookie sono conformi alla normativa RGPD. Ulteriori informazioni sono disponibili nella nostra <a href="https://www.almig.de/it/protezione-dei-dati" class="cc-link">Informativa sulla privacy</a>.',
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
                                description:
                                    'Questo sito Web utilizza cookie essenziali per garantire il corretto funzionamento e cookie di tracciamento del pubblico. Questi cookie sono conformi alla normativa RGPD. Ulteriori informazioni sono disponibili nella nostra <a href="https://www.almig.de/it/protezione-dei-dati" class="cc-link">Informativa sulla privacy</a>.'
                            },
                            {
                                title: "Cookie funzionali",
                                description:
                                    "Questi cookie sono necessari per il corretto funzionamento del sito: vengono utilizzati, durante la tua sessione, per ricordare la lingua che hai scelto, per ricordare la tua connessione come cliente, per permetterti di filtrare la visualizzazione dei prodotti, per ricordare il tuo carrello , per registrare il tuo ordine. Questi cookie funzionali non possono essere disattivati â€‹â€‹in quanto ciÃ² renderebbe impossibile la navigazione sul sito. Questi cookie essenziali sono cookie interni del nostro sito web almig.de",
                                linkedCategory: "necessary"
                            },
                            {
                                title: "Recaptcha - Google",
                                description:
                                    "Utilizziamo Recaptcha di Google per registrare e confermare la tua identitÃ . Tra le altre cose, carica script dai server di Google Inc. con sede in America, memorizza cookie e trasferisce i dati dell'utente ai server della societÃ .<br>Non Ã¨ possibile registrarsi senza accettare questa categoria. Ulteriori informazioni sono disponibili nella nostra Informativa sulla privacy. Per ulteriori informazioni o per la registrazione manuale vi invitiamo a contattarci direttamente tramite i canali di contatto generali.",
                                linkedCategory: "google-recaptcha"
                            }
                        ]
                    }
                }
            }
        }
    });
};

export default useSetCookieConsent;
