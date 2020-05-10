"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  /*
    General
  */
  title: {
    first: "Military",
    second: "Records"
  },
  account: {
    login: "Login",
    register: "Register",
    email: "Email",
    phone: "Phone",
    create: "Create",
    account: "Account",
    my_account: "My account",
    password: "Password",
    verification: "Verification",
    code: "Code",
    verification_code: "Verification Code"
  },
  dir: {
    next: "Next",
    prev: "Previous",
    up: "Up",
    down: "Down",
    left: "Left",
    right: "Right",
    toward: "Toward",
    backward: "Backward"
  },
  langs: {
    langs: "Languages",
    ar: "Arabic",
    en: "English"
  },
  themes: {
    themes: "Themes",
    light: "Light",
    dark: "Dark"
  },
  or: "or",
  close: "Close",
  dataIterator: {
    pageText: "{0}-{1} of {2}",
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: ": Sorted descending. Activate to remove sorting.",
      sortAscending: ": Sorted ascending. Activate to sort descending.",
      sortNone: ": Not sorted. Activate to sort ascending.",
      activateAscending: "Activate Ascending"
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  datePicker: {
    itemsSelected: "{0} selected"
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual"
  },
  calendar: {
    moreEvents: "{0} more"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  /*
    Global Sections
  */
  // 1. Top app bar
  topbar: {
    stats: "Statistics",
    settings: "Settings"
  },
  // 2. Side app bar
  sidebar: {
    dashboard: "Dashboard",
    patients: "Patients",
    language: "Language",
    theme: "Themes",
    add_patient: "Add Patient",
    gallery: "Gallery",
    langs: {
      ar: "Arabic",
      en: "English"
    },
    themes: {
      light: "Light",
      dark: "Dark"
    },
    install_app: "Install App",
    changelog: "Changelog",
    why: "Why Diabetes Clinic?",
    logout: "Logout"
  },
  // 3. Footer
  footer: {},
  /*
    Pages
  */
  // 1. Home
  home: {
    settings: {
      _pending: "Feature is under construction",
      themes: "Themes",
      themes_desc: "Adjust colors for each theme.",
      _themes: {
        primary: "Primary",
        secondary: "Secondary",
        girly: "Females Color",
        accent: "Accent",
        error: "Error",
        info: "Info",
        success: "Success",
        warning: "Warning",
        white: "Font Color Under a Primary Background"
      },
      admins: "Admins",
      admins_desc: "Configure allowed people to access Diabates Clinic.",
      patients: "Patients",
      patients_desc: "Customize patients activity on Diabates Clinic."
    }
  },
  // 2. Gallery
  gallery: {
    "1": "Select Label",
    "2": "No labels found",
    "3": "Images Selected", // 3 Images Selected
    "4":
      "Select label and images to upload ( Only JPG and PNG files are supported ).",
    "5": "Select Images",
    "6": "Upload Images",
    "7":
      "<span class='font-weight-simibold'>Diabetes </span> <span class='font-weight-light'> Gallery</span>",
    "8": "Add Label",
    "9": "No label selected",
    "10": "Please select a label to view images.",
    "11": "Edit Label",
    "12": "Images",
    "13": "Delete Image",
    "14": "View Image",
    "15": "No images in this label",
    "16": "Please add images to show",
    "17": "No labels yet",
    "18": "Click on",
    "19": "Add Label",
    "20": "icon to create a new label",
    "21": "Delete",
    "22": "Image",
    "23": "Close",
    "24": "Are you sure to delete image?",
    "25": "Cancel",
    "26": "Delete Image",
    "27": "Label",
    "28": "Close",
    "29": "",
    "30": ""
  },
  about: {
    "0": "#welcome",
    "1": "#dashboard",
    "2": "Custom Fields",
    "3": "Settings",
    "4": "Themes",
    "5": "Admins",
    "6": "Patients",
    "7": "Statistics",
    "8": "What's the difference?",
    "9": "#patients",
    "10": "Add",
    "11": "Search",
    "12": "Profile",
    "13": "Personal Info",
    "14": "Latest Checkup",
    "15": "Checkups Table",
    "16": "Chronic Diseases",
    "17": "Statistics",
    "18": "#gallery",
    "19": "Diabetes Gallery",
    "20": "#security",
    "21": "Rules",
    "22": "#more",
    "23": "Drug Databse",
    "24": "Changelog",
    "25": "Community",
    "26": "",
    "27": "",
    "28": "",
    "29": "",
    "30": "",
    pricing: {
      m: "Monthly",
      y: "Annualy",
      "15y": "Per 15 Years",
      egp: "EGP"
    }
  },
  /*
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "",
    "8": "",
    "9": "",
    "10": "",
    "11": "",
    "12": "",
    "13": "",
    "14": "",
    "15": "",
    "16": "",
    "17": "",
    "18": "",
    "19": "",
    "20": "",
    "21": "",
    "22": "",
    "23": "",
    "24": "",
    "25": "",
    "26": "",
    "27": "",
    "28": "",
    "29": "",
    "30": ""
  */
  /**
    Errors
  */
  errors: {
    "1": "A network error occured. Please refresh page and try again.",
    "2":
      "<b>There was an error</b>, Please refresh page and try again in a minute.",
    "3":
      "If you are having trouble, Call me on <a href='tel:+201113429944'>+201113429944</a>",
    "4": "<b>Code is invalid</b>, Please double check your code and try again.",
    "5":
      "<b>Code Expired</b>. You can try a code twice. Please refresh page and try again.",
    "6": "<b>reCaptcha Expired</b>. Please refresh page and try again.",
    "7": "Your name can't be less than 4 characters.",
    "8": "You have to fill required fields.",
    "9": "A Comment can't be empty.",
    "10": "There was an error adding new patient, Please try again later.",
    "11": "Name and gender are required!",
    "12": "Custom field you are trying to delete is not exist.",
    "13": "Please fill required fields",
    "14": "There was an error checking user existance.",
    "15":
      "<b>Too Many Requests</b>: We have blocked all requests from this device due to unusual activity. Try again later or Login with email and password instead.",
    "16":
      "<b>ERROR</b>: An unknown error occured, Please refresh page and try again in a minute.",
    "17":
      "<b>Access Denied:</b> This phone number is not autherized to access the app.",
    "18": "<b>Invalid:</b> This is not Egyptian phone number.",
    "19":
      "<b>reCAPTCHA Error</b>, are you connected to the internet? We are unable to load external reCAPTCHA dependencies. Please reload page and try again in a minute.",
    "20":
      "<b>reCAPTCHA Error</b>, Please complete the reCAPTCHA correctly to continue.",
    "21":
      "<b>A network error</b>, Please double check your internet connection and try again.",
    "22": "You are not authorized to access this data.",
    "23":
      "Image you are trying to view can't be reached. Please double check your internet connection",
    "24":
      "You are trying to access some data that you are not authorized to. <b>If you think</b> this error was appeared by mistake, please contact me.",
    "25": "",
    "26": "",
    "27": "",
    "28": "",
    "29": "",
    "30": "",
    "31": "",
    "32": "",
    "33": "",
    "34": "",
    "35": ""
  }
};
exports.default = _default;
// export default _default;
