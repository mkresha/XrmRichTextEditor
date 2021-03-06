﻿if (typeof (BackToTheCrm) == "undefined") {
    BackToTheCrm = { __namespace: true };
}

BackToTheCrm.Tools = (function ($) {

    var getURLParameter = function (name) {
        /// <summary>
        /// Get a parameter set in the URL
        /// </summary>
        /// <param name="name">Name of the parameter to get</param>
        /// <returns type="String">Value of the parameter, null if the parameter didn't exist</returns>
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    };

    var isEmptyGuid = function (guid) {
        /// <summary>
        /// Check if the guid is empty 
        /// </summary>
        /// <param name="guid" type="String">Guid to check</param>
        /// <returns type="Boolean">True if the guid is empty else False</returns>
        var emptyGuid = "00000000-0000-0000-0000-000000000000";
        return (!guid || emptyGuid === guid.replace(/[}{]/g, ""));
    };

    var getParentId = function (defaultId) {
        /// <summary>
        /// Retrieve the Id of the entity from the form.
        /// Use this function from a embedded HTML webresource
        /// </summary>
        /// <param name="defaultId" type="String">Default id if no id has been found</param>
        /// <returns type="String">Id retrieved</returns>
        var id = null;
        if (!isEmptyGuid(getURLParameter("id"))) {
            id = getURLParameter("id");
        }
        else {
            try {
                id = window.parent.Xrm.Page.data.entity.getId();
            } catch (e) { }
        }
        if (!id && !!defaultId) {
            id = defaultId;
        }
        return id;
    };

    var toHex = function (dec) {
        /// <summary>
        /// Convert a decimal number to hex string
        /// </summary>
        /// <param name="dec">Decimal number to convert</param>
        /// <returns type="String">Hexadecimal representation of the number</returns>
        return parseInt(dec, 10).toString(16);
    };

    var localization = (function () {
        // Mapping between LCID and locale code
        var lcidLocaleMapping = {
            "1025": "ar",
            "1026": "bg",
            "1027": "ca",
            "1028": "zh",
            "1029": "cs",
            "1030": "da",
            "1031": "de",
            "1032": "el",
            "1033": "en",
            "1034": "es",
            "1035": "fi",
            "1036": "fr",
            "1037": "he",
            "1038": "hu",
            "1039": "is",
            "1040": "it",
            "1041": "ja",
            "1042": "ko",
            "1043": "nl",
            "1044": "nb",
            "1045": "pl",
            "1046": "pt",
            "1047": "rm",
            "1048": "ro",
            "1049": "ru",
            "1050": "hr",
            "1051": "sk",
            "1052": "sq",
            "1053": "sv",
            "1054": "th",
            "1055": "tr",
            "1056": "ur",
            "1057": "id",
            "1058": "uk",
            "1059": "be",
            "1060": "sl",
            "1061": "et",
            "1062": "lv",
            "1063": "lt",
            "1064": "tg",
            "1065": "fa",
            "1066": "vi",
            "1067": "hy",
            "1068": "az",
            "1069": "eu",
            "1070": "sb",
            "1071": "mk",
            "1073": "ts",
            "1074": "tn",
            "1076": "xh",
            "1077": "zu",
            "1078": "af",
            "1079": "ka",
            "1080": "fo",
            "1081": "hi",
            "1082": "mt",
            "1084": "gd",
            "1085": "yi",
            "1086": "ms",
            "1087": "kk",
            "1089": "sw",
            "1090": "tk",
            "1091": "uz",
            "1092": "tt",
            "1093": "bn",
            "1094": "pa",
            "1095": "gu",
            "1096": "or",
            "1097": "ta",
            "1098": "te",
            "1099": "kn",
            "1100": "ml",
            "1101": "as",
            "1102": "mr",
            "1103": "sa",
            "1104": "mn",
            "1105": "bo",
            "1106": "cy",
            "1107": "km",
            "1108": "lo",
            "1109": "my",
            "1110": "gl",
            "1113": "sd",
            "1115": "si",
            "1118": "am",
            "1120": "ks",
            "1121": "ne",
            "1125": "dv",
            "1140": "gn",
            "1142": "la",
            "1143": "so",
            "1153": "mi",
            "2049": "ar",
            "2052": "zh",
            "2055": "de",
            "2057": "en",
            "2058": "es",
            "2060": "fr",
            "2064": "it",
            "2067": "nl",
            "2068": "nn",
            "2070": "pt",
            "2072": "ro",
            "2073": "ru",
            "2074": "sr",
            "2077": "sv",
            "2092": "az",
            "2108": "gd",
            "2110": "ms",
            "2115": "uz",
            "2117": "bn",
            "2128": "mn",
            "3073": "ar",
            "3076": "zh",
            "3079": "de",
            "3081": "en",
            "3084": "fr",
            "3098": "sr",
            "4097": "ar",
            "4100": "zh",
            "4103": "de",
            "4105": "en",
            "4106": "es",
            "4108": "fr",
            "5121": "ar",
            "5124": "zh",
            "5127": "de",
            "5129": "en",
            "5130": "es",
            "5132": "fr",
            "5146": "bs",
            "6145": "ar",
            "6153": "en",
            "6154": "es",
            "6156": "fr",
            "7169": "ar",
            "7177": "en",
            "7178": "es",
            "7180": "fr",
            "8193": "ar",
            "8201": "en",
            "8202": "es",
            "9217": "ar",
            "9225": "en",
            "9226": "es",
            "9228": "fr",
            "10241": "ar",
            "10249": "en",
            "10250": "es",
            "10252": "fr",
            "11265": "ar",
            "11273": "en",
            "11274": "es",
            "11276": "fr",
            "12289": "ar",
            "12297": "en",
            "12298": "es",
            "12300": "fr",
            "13313": "ar",
            "13321": "en",
            "13322": "es",
            "13324": "fr",
            "14337": "ar",
            "14346": "es",
            "14348": "fr",
            "15361": "ar",
            "15370": "es",
            "16385": "ar",
            "16393": "en",
            "16394": "es",
            "17418": "es",
            "18442": "es",
            "19466": "es",
            "20490": "es"
        };

        var getUserLocale = function (defaultLocale) {
            /// <summary>
            /// Get the language code of the current user
            /// </summary>
            /// <param name="defaultLocale" type="String">Default language code</param>
            /// <returns type="String">Language code of the current user</returns>
            var userLcid = BackToTheCrm.Tools.getURLParameter("UserLCID");
            return lcidLocaleMapping[userLcid] || defaultLocale || "en";
        };

        var loadMessages = function (scriptName, callback) {
            /// <summary>
            /// Load the localized messages of a script
            /// </summary>
            /// <param name="scriptName" type="String">Name of the script</param>
            /// <param name="callback" type="function">Callback called after the messages load</param>
            var locale = getUserLocale();
            $.ajaxSetup({
                cache: true
            });

            $.getScript("scripts/lang/" + scriptName + "." + locale + ".js", callback)
                .fail(function () {
                    locale = "en";
                    callback();
                });
        };

        return {
            "getUserLocale": getUserLocale,
            "loadMessages": loadMessages
        };
    })();

    return {
        "getURLParameter": getURLParameter,
        "isEmptyGuid": isEmptyGuid,
        "getParentId": getParentId,
        "toHex": toHex,
        "Localization": localization
    };
})(jQuery);