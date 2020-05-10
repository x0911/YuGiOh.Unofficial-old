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
    first: "السجلات",
    second: "العسكرية"
  },
  account: {
    login: "تسجيل الدخول",
    register: "التسجيل",
    email: "الإيميل",
    phone: "الهاتف",
    create: "إنشاء",
    account: "حساب",
    my_account: "حسابي",
    password: "كلمة المرور",
    verification: "التحقق",
    code: "رمز",
    verification_code: "رمز التحقق"
  },
  dir: {
    next: "التالي",
    prev: "السابق",
    up: "أعلى",
    down: "أسفل",
    left: "يسار",
    right: "يمين",
    toward: "للأمام",
    backward: "للخلف"
  },
  langs: {
    langs: "اللغات",
    ar: "العربية",
    en: "الإنجليزية"
  },
  themes: {
    themes: "السمات",
    light: "النهار",
    dark: "الليل"
  },
  or: "أو",
  close: "إغلاق",
  dataIterator: {
    pageText: "{0}-{1} من {2}",
    noResultsText: "لا توجد سجلات مطابقة",
    loadingText: "تحميل العناصر ..."
  },
  dataTable: {
    itemsPerPageText: "الصفوف لكل صفحة:",
    ariaLabel: {
      sortDescending: ": ترتيب تنازلي . إضغط لإلغاء الترتيب.",
      sortAscending: ": ترتيب تصاعدي . إضغط للترتيب التنازلي.",
      sortNone: ": غير مرتب . إضغط للترتيب التصاعدي.",
      activateAscending: "تفعيل التصاعدي",
      activateDescending: "تفعيل التنازلي",
      activateNone: "عدم تفعيل شيء"
    },
    sortBy: "ترتيب حسب"
  },
  dataFooter: {
    itemsPerPageText: "العناصر لكل صفحة:",
    itemsPerPageAll: "الكل",
    nextPage: "الصفحة التالية",
    prevPage: "الصفحة السابقة",
    firstPage: "الصفحة الأولى",
    lastPage: "الصفحة الأخيرة",
    pageText: "{0}-{1} من أصل {2}"
  },
  datePicker: {
    itemsSelected: "{0} المحدد"
  },
  noDataText: "لا توجد بيانات متاحة",
  carousel: {
    prev: "الصورة السابقة",
    next: "البصري التالي"
  },
  calendar: {
    moreEvents: "{0} أكثر من"
  },
  fileInput: {
    counter: "{0} ملفات",
    counterSize: "{0} ملفات ({1} في الإجمالي)"
  },
  /*
    Global Sections
  */
  // 1. Top app bar
  topbar: {
    stats: "الإحصائات",
    settings: "الإعدادات"
  },
  // 2. Side app bar
  sidebar: {
    sections: {
      "0": {
        _self: "النظم",
        dashboard: "لوحة التحكم"
      },
      "1": {
        _self: "التسجيل",
        soldier_plus: "الراتب العالي والمجندين",
        monthly_rev: "المراجعة الشهرية",
        promotion: "مشروع الترقي",
        reports: "التقارير",
        too_late: "المتأخرات"
      },
      "2": {
        _self: "الإحتياط",
        e7tyat_files: "دفاتر الإحتياط"
      },
      "3": {
        _self: "الإنهاء"
      },
      "4": {
        _self: "الهروب وخدمة المواطنين"
      }
    },
    language: "اللغة",
    theme: "السمات",
    langs: {
      ar: "العربية",
      en: "الإنجليزية"
    },
    themes: {
      light: "النهار",
      dark: "الليل"
    },
    install_app: "تثبيت التطبيق",
    changelog: "سجل الإصدارات",
    logout: "تسجيل الخروج"
  },
  // 3. Footer
  footer: {},
  /*
    Pages
  */
  // 1. Home
  home: {
    settings: {
      _pending: "الخاصية تحت الإنشاء",
      themes: "السمات",
      themes_desc: "ضبط الألوان للسمات.",
      _themes: {
        primary: "اللون الأساسي",
        secondary: "اللون الثانوي",
        girly: "لون الإناث",
        accent: "لون النبرة",
        error: "لون الخطأ",
        info: "لون المعلومات",
        success: "لون النجاح",
        warning: "لون التحذير",
        white: "لون الخط تحت الخلفية الأساسية"
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
  /**
    Errors
  */
  errors: {
    "1": "فيه مشكلة في الشبكة, اعمل إعادة تحميل للصفحة وجرب تاني.",
    "2": "<b>فيه خطأ ما حصل</b>, من فضلك اعمل إعادة تحميل للصفحة وجرب تاني",
    "3":
      "لو فيه مشكلة بتواجهك, كلمني على الرقم <a href='tel:+201113429944'>+201113429944</a>",
    "4": "<b>الكود غلط</b>, من فضلك تحقق من كتابة الكود صحيح.",
    "5":
      "<b>انتهت صلاحية الكود</b>. انت تقدر تجرب الكود مرتين بس. من فضلك اعمل إعادة تحميل للصفحة وجرب تاني.",
    "6":
      "<b>انتهت صلاحية الريكابتشا</b>. من فضلك اعمل إعادة تحميل للصفحة وجرب تاني.",
    "7": "الإسم مينفعش يكون أقل من 4 حروف",
    "8": "فيه حقول مينفعش تسيبها فاضية.",
    "9": "الكومنت مينفعش يكون فاضي.",
    "10":
      "فيه مشكلة في إضافة المريض ده, من فضلك اعمل إعادة تحميل للصفحة وجرب مرة تاني.",
    "11": "الإسم والنوع مطلوبين.",
    "12": "الحقل المخصص اللي بتحاول تمسحه ده, ممسوح بالفعل.",
    "13": "من فضلك املئ الحقول المطلوبة",
    "14":
      "فيه مشكلة في الإنترنت حصلت أثناء التحقق من المستخدم ده, من فضلك اعمل إعادة تحميل للصفحة وجرب تاني.",
    "15":
      "<b>حضرتك طلبت عدد أكواد كتير في دقائق قليلة</b>: الهوست عمل بلوك للجهاز ده من تسجيل الدخول لمدة بضع ساعات لإن مش مضمون اللي بيحاول يسجل الدخول ده هو صاحب التطبيق ولا حد بيحاول يخترقه . من فضلك المرة الجاية انتظر الكود يوصلك حتى لو تأخر دقائق.",
    "16":
      "<b>خطأ</b>: فيه مشكلة في الإنترنت حصلت, من فضلك اعمل إعادة تحميل وجرب تاني.",
    "17": "<b>الدخول مرفوض:</b> رقم التليفون ده مش مسموح ليه يدخل التطبيق.",
    "18": "<b>رقم التليفون مش مظبوط:</b> غالباً ده مش رقم تليفون مصري.",
    "19":
      "<b>فيه مشكلة في تحميل الريكابتشا</b>, هل حضرتك متصل بالإنترنت؟ من فضلك اعمل إعادة تحميل للصفحة وجرب تاني.",
    "20":
      "<b>الريكابتشا متحلتش صح</b>, من فضلك حل الريكابتشا الأول قبل تسجيل الدخول.",
    "21":
      "<b>فيه مشكلة في الإنترنت</b>, من فضلك اعمل إعادة تحميل للصفحة وجرب تاني, أو تحقق من اتصالك بالإنترنت.",
    "22": "حضرتك حاولت بدون قصد توصل لداتا مش مسموح الوصول ليها.",
    "23":
      "الصورة اللي بتحاول تعرضها التطبيق مش قادر يوصلها. من فضلك تحقق من اتصالك بالإنترنت",
    "24": "حضرتك حاولت بدون قصد توصل لداتا مش مسموح الوصول ليها.",
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
