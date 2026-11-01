/**
 * GrandStay PMS & Booking Engine - Core Application Logic
 * Supports: Arabic (RTL) / English (LTR), Dual Currency (IQD / USD),
 * Interactive SVG Charts, Room Status Board, and Modals.
 */

// Global App State
const state = {
  lang: 'ar', // 'ar' or 'en'
  currency: 'USD', // 'USD' or 'IQD'
  exchangeRate: 1310, // 1 USD = 1,310 IQD
  manager: {
    name: 'سارة المنصور',
    role: 'مدير العمليات',
    email: 'sarah.mansoor@grandstay.com'
  },
  rooms: [
    { number: '101', type: 'single', status: 'clean', typeName: { ar: 'فردية كلاسيك', en: 'Classic Single' } },
    { number: '102', type: 'double', status: 'occupied', typeName: { ar: 'مزدوجة ديلوكس', en: 'Deluxe Double' } },
    { number: '103', type: 'suite', status: 'clean', typeName: { ar: 'جناح تنفيذي', en: 'Executive Suite' } },
    { number: '201', type: 'double', status: 'dirty', typeName: { ar: 'مزدوجة ديلوكس', en: 'Deluxe Double' } },
    { number: '202', type: 'single', status: 'occupied', typeName: { ar: 'فردية كلاسيك', en: 'Classic Single' } },
    { number: '203', type: 'suite', status: 'maint', typeName: { ar: 'جناح عائلي', en: 'Family Suite' } },
    { number: '108', type: 'single', status: 'occupied', typeName: { ar: 'فردية كلاسيك', en: 'Classic Single' } },
    { number: '204', type: 'double', status: 'clean', typeName: { ar: 'مزدوجة ديلوكس', en: 'Deluxe Double' } },
    { number: '301', type: 'suite', status: 'occupied', typeName: { ar: 'جناح رويال', en: 'Royal Suite' } },
    { number: '302', type: 'double', status: 'clean', typeName: { ar: 'مزدوجة بريميوم', en: 'Premium Double' } },
    { number: '402', type: 'suite', status: 'clean', typeName: { ar: 'جناح الرويال الفاخر', en: 'Luxury Royal Suite' } }
  ],
  vipStatus: {
    prepared: false,
    checkedIn: false
  },
  feedStatus: {
    mohammedCheckedIn: false,
    samirCheckedOut: false
  },
  calendarState: {
    year: 2026,
    month: 11, // 11 = December (0-indexed)
    selectedDay: 1
  },
  staffFilter: 'all',
  currentStaffProfileId: null,
  staffManagement: {
    activeDept: 'all',
    activeDutyFilter: 'all',
    searchQuery: '',
    viewMode: 'cards',
    payrollEditMode: false
  },
  staffList: [
    { id: 'ST-01', name: 'سارة المنصور', role: 'مدير العمليات الفندقية', dept: 'إدارة عامة', shift: 'management', shiftNameAr: 'إدارة عامة', shiftNameEn: 'Management', checkInTime: '08:00 ص', status: 'duty', statusTextAr: 'على رأس العمل', statusTextEn: 'On Duty', salaryUSD: 1400, phone: '+964 770 111 2233', email: 'sarah.mansoor@grandstay.com', hireDate: '2023-01-10', contractType: 'دوام كامل' },
    { id: 'ST-02', name: 'فهد القحطاني', role: 'مشرف الاستقبال', dept: 'قسم الاستقبال', shift: 'morning', shiftNameAr: 'مناوبة الصباح', shiftNameEn: 'Morning Shift', checkInTime: '06:55 ص', status: 'duty', statusTextAr: 'على رأس العمل', statusTextEn: 'On Duty', salaryUSD: 850, phone: '+964 770 222 3344', email: 'fahad@grandstay.com', hireDate: '2023-06-15', contractType: 'دوام كامل' },
    { id: 'ST-03', name: 'منى العلي', role: 'موظفة استقبال', dept: 'قسم الاستقبال', shift: 'morning', shiftNameAr: 'مناوبة الصباح', shiftNameEn: 'Morning Shift', checkInTime: '07:05 ص', status: 'duty', statusTextAr: 'على رأس العمل', statusTextEn: 'On Duty', salaryUSD: 720, phone: '+964 770 333 4455', email: 'mona.ali@grandstay.com', hireDate: '2024-02-01', contractType: 'دوام كامل' },
    { id: 'ST-04', name: 'حيدر كمال', role: 'مشرف التدبير الفندقي', dept: 'التدبير الفندقي', shift: 'morning', shiftNameAr: 'مناوبة الصباح', shiftNameEn: 'Morning Shift', checkInTime: '06:50 ص', status: 'duty', statusTextAr: 'على رأس العمل', statusTextEn: 'On Duty', salaryUSD: 880, phone: '+964 770 444 5566', email: 'haidar@grandstay.com', hireDate: '2023-04-12', contractType: 'دوام كامل' },
    { id: 'ST-05', name: 'ليلى ناصر', role: 'مسؤولة نظافة الطوابق', dept: 'التدبير الفندقي', shift: 'morning', shiftNameAr: 'مناوبة الصباح', shiftNameEn: 'Morning Shift', checkInTime: '07:00 ص', status: 'break', statusTextAr: 'استراحة وجبة', statusTextEn: 'Meal Break', salaryUSD: 600, phone: '+964 770 555 6677', email: 'layla@grandstay.com', hireDate: '2024-01-20', contractType: 'دوام كامل' },
    { id: 'ST-06', name: 'أحمد سالم', role: 'فني صيانة عامة', dept: 'قسم الصيانة', shift: 'morning', shiftNameAr: 'مناوبة الصباح', shiftNameEn: 'Morning Shift', checkInTime: '07:15 ص', status: 'maint', statusTextAr: 'مهمة صيانة', statusTextEn: 'Maintenance Task', salaryUSD: 780, phone: '+964 770 666 7788', email: 'ahmed.salem@grandstay.com', hireDate: '2023-08-01', contractType: 'دوام كامل' },
    { id: 'ST-07', name: 'عمر التميمي', role: 'موظف استقبال مسائي', dept: 'قسم الاستقبال', shift: 'evening', shiftNameAr: 'مناوبة المساء', shiftNameEn: 'Evening Shift', checkInTime: '03:00 م', status: 'duty', statusTextAr: 'على رأس العمل', statusTextEn: 'On Duty', salaryUSD: 720, phone: '+964 770 777 8899', email: 'omar.t@grandstay.com', hireDate: '2024-03-10', contractType: 'دوام كامل' },
    { id: 'ST-08', name: 'زينب جواد', role: 'مشرفة تدبير مسائي', dept: 'التدبير الفندقي', shift: 'evening', shiftNameAr: 'مناوبة المساء', shiftNameEn: 'Evening Shift', checkInTime: '02:55 م', status: 'duty', statusTextAr: 'على رأس العمل', statusTextEn: 'On Duty', salaryUSD: 700, phone: '+964 770 888 9900', email: 'zainab@grandstay.com', hireDate: '2023-11-05', contractType: 'دوام كامل' },
    { id: 'ST-09', name: 'كرار الدليمي', role: 'مدقق ليلي (Night Auditor)', dept: 'المحاسبة والاستقبال', shift: 'night', shiftNameAr: 'مناوبة الليل', shiftNameEn: 'Night Audit', checkInTime: '11:00 م', status: 'duty', statusTextAr: 'على رأس العمل', statusTextEn: 'On Duty', salaryUSD: 900, phone: '+964 770 999 0011', email: 'karrar@grandstay.com', hireDate: '2023-03-01', contractType: 'دوام كامل' }
  ],
  handoverNotes: [
    { text: 'جناح 402 طلب باقة ورود ترحيبية إضافية الساعة 03:00 م', author: 'سارة المنصور', time: '09:30 ص' },
    { text: 'غرفة 203 بانتظار استبدال فلتر التكييف قبل الساعة 02:00 م', author: 'فهد القحطاني', time: '11:15 ص' }
  ],
  metrics: {
    adrUSD: 145,
    revparUSD: 115,
    occupancyRate: 79.2,
    totalRooms: 48,
    occupiedRooms: 38,
    availableRooms: 8,
    maintRooms: 2
  },
  tapeWeekOffset: 0,
  tapeCurrentFilter: 'all',
  bookings: [
    {
      id: 'BK-9104',
      guestName: 'د. طارق الحكيم',
      guestNameEn: 'Dr. Tariq Al-Hakim',
      room: 'جناح رويال 301',
      roomEn: 'Royal Suite 301',
      roomNumber: '301',
      checkIn: '2026-10-24',
      checkOut: '2026-10-28',
      checkInFormatted: '24 أكتوبر 2026',
      checkOutFormatted: '28 أكتوبر 2026',
      nights: 4,
      totalUSD: 1800,
      status: 'paid',
      statusText: 'مدفوع بالكامل',
      statusTextEn: 'Paid in Full'
    },
    {
      id: 'BK-9105',
      guestName: 'أحمد عبد الله الهاشمي',
      guestNameEn: 'Ahmed Al-Hashimi',
      room: 'غرفة 101 فردية',
      roomEn: 'Classic Single 101',
      roomNumber: '101',
      checkIn: '2026-10-24',
      checkOut: '2026-10-27',
      checkInFormatted: '24 أكتوبر 2026',
      checkOutFormatted: '27 أكتوبر 2026',
      nights: 3,
      totalUSD: 270,
      status: 'deposit',
      statusText: 'عربون 50%',
      statusTextEn: 'Deposit 50%'
    },
    {
      id: 'BK-9106',
      guestName: 'سارة فيصل التميمي',
      guestNameEn: 'Sarah Al-Tamimi',
      room: 'جناح تنفيذي 103',
      roomEn: 'Executive Suite 103',
      roomNumber: '103',
      checkIn: '2026-10-26',
      checkOut: '2026-10-30',
      checkInFormatted: '26 أكتوبر 2026',
      checkOutFormatted: '30 أكتوبر 2026',
      nights: 4,
      totalUSD: 960,
      status: 'pending',
      statusText: 'بانتظار التأكيد',
      statusTextEn: 'Pending Confirmation'
    },
    {
      id: 'BK-9107',
      guestName: 'عمر الراوي',
      guestNameEn: 'Omar Al-Rawi',
      room: 'غرفة 202 مزدوجة',
      roomEn: 'Deluxe Double 202',
      roomNumber: '202',
      checkIn: '2026-10-24',
      checkOut: '2026-10-29',
      checkInFormatted: '24 أكتوبر 2026',
      checkOutFormatted: '29 أكتوبر 2026',
      nights: 5,
      totalUSD: 725,
      status: 'paid',
      statusText: 'مدفوع بالكامل',
      statusTextEn: 'Paid in Full'
    }
  ],
  notifications: [
    {
      id: 1,
      title: 'وصول VIP خلال 30 دقيقة',
      titleEn: 'VIP Arrival in 30 Minutes',
      desc: 'د. طارق الحكيم - جناح الرويال 301 جاهز للاستقبال',
      descEn: 'Dr. Tariq Al-Hakim - Royal Suite 301 ready for arrival',
      time: 'منذ 10 دقائق',
      timeEn: '10m ago',
      type: 'vip',
      unread: true,
      actionBtnAr: 'تجهيز الجناح',
      actionBtnEn: 'Prepare Suite'
    },
    {
      id: 2,
      title: 'طلب مغادرة وتسوية حساب',
      titleEn: 'Check-out & Invoice Settlement',
      desc: 'غرفة 101 - أحمد الهاشمي يرغب بإتمام المغادرة',
      descEn: 'Room 101 - Ahmed Al-Hashimi requests checkout',
      time: 'منذ 25 دقيقة',
      timeEn: '25m ago',
      type: 'checkout',
      unread: true,
      actionBtnAr: 'تسوية الفاتورة',
      actionBtnEn: 'Settle Folio'
    },
    {
      id: 3,
      title: 'اكتمال إصلاح عطل التكييف',
      titleEn: 'AC Maintenance Completed',
      desc: 'غرفة 203 - أصبحت جاهزة للتسكين الآن',
      descEn: 'Room 203 - Ready for check-in after AC repair',
      time: 'منذ 45 دقيقة',
      timeEn: '45m ago',
      type: 'maintenance',
      unread: true,
      actionBtnAr: 'تأكيد الجاهزية',
      actionBtnEn: 'Verify Clean'
    }
  ]
};

// Comprehensive Localization Dictionary
const translations = {
  ar: {
    appName: 'جراند ستاي PMS',
    appSubtitle: 'نظام إدارة الفنادق الذكي',
    navDashboard: 'لوحة التحكم',
    navAttendance: 'سجل الحضور',
    navEmployees: 'إدارة الموظفين',
    staffManagementTitle: 'إدارة شؤون الموظفين وفريق العمل (Staff & HR)',
    staffManagementSubtitle: 'دليل الموظفين الشامل، عقود العمل، الرواتب وتوزيع الأقسام التشغيلية',
    navAnalytics: 'التقارير والتحليلات',
    navHousekeeping: 'التدبير والصيانة',
    navSettings: 'إعدادات النظام',
    navBookings: 'الحجوزات والتقويم',
    searchPlaceholder: 'ابحث عن نزيل، رقم غرفة، أو كود حجز...',
    welcomeTitle: 'مرحباً، سارة المنصور',
    welcomeSubtitle: 'إليك نظرة شاملة على إشغال الفندق والإيرادات لهذا اليوم.',
    btnNewBooking: 'حجز جديد',
    btnQuickCheckin: 'تسجيل وصول',
    totalRoomsTitle: 'حالة وإشغال الغرف',
    legendOccupied: 'غرف مسكونة',
    legendAvailable: 'غرف متوفرة',
    legendMaint: 'صيانة وتنظيف',
    roomOccupiedRatio: 'إشغال 79%',
    topSkillsTitle: 'مؤشرات الأداء الفندقي (KPIs)',
    adrLabel: 'متوسط سعر الغرفة (ADR)',
    revparLabel: 'العائد لكل غرفة متاحة (RevPAR)',
    occupancyLabel: 'نسبة الإشغال العام',
    weeklyActivityTitle: 'نشاط الإشغال والإيرادات الأسبوعي',
    chartLegendOccupancy: 'نسبة الإشغال %',
    chartLegendADR: 'متوسط السعر (ADR)',
    chartLegendRevPAR: 'العائد (RevPAR)',
    shiftStaffTitle: 'فريق العمل بالمناوبة',
    staffOnDuty: 'على رأس العمل',
    staffLate: 'متأخرون',
    staffAbsent: 'إجازات',
    vipTitle: 'النزيل المميز اليوم',
    vipGuestName: 'د. طارق الحكيم',
    vipStayDetails: 'جناح الرويال الفاخر 402 • وصول اليوم',
    btnWishVip: 'استقبال وتجهيز الجناح',
    recentGuestsTitle: 'حركة الاستقبال والمغادرة اليوم',
    viewAll: 'عرض الكل',
    statusArriving: 'وصول متوقع',
    statusDeparting: 'مغادرة اليوم',
    statusCheckedIn: 'مقيم حالياً',
    roomStatusBoardTitle: 'لوحة التدبير الفندقي السريعة (انقر لتعديل الحالة)',
    statusClean: 'نظيفة',
    statusDirty: 'متسخة',
    statusOccupied: 'مسكونة',
    statusMaint: 'صيانة',
    currencyToggle: 'د.ع الدينار',
    langToggle: 'English',
    nightAuditBoxTitle: 'الإقفال اليومي (Night Audit)',
    nightAuditBoxDesc: 'تم بنجاح الساعة 03:00 ص',
    // Days
    daySun: 'أحد',
    dayMon: 'إثنين',
    dayTue: 'ثلاثاء',
    dayWed: 'أربعاء',
    dayThu: 'خميس',
    dayFri: 'جمعة',
    daySat: 'سبت',
    monthDec: 'ديسمبر 2026',
    // Modal
    modalBookingTitle: 'إنشاء حجز جديد للنزيل',
    labelGuestName: 'اسم النزيل الكامل',
    labelGuestPhone: 'رقم الهاتف / الواتساب',
    labelRoomType: 'فئة الغرفة',
    labelNights: 'عدد الليالي',
    labelCheckInDate: 'تاريخ الوصول',
    labelEstimatedTotal: 'إجمالي التكلفة المقدرة',
    btnSaveBooking: 'تأكيد الحجز وطباعة الإيصال',
    btnCancel: 'إلغاء',
    toastBookingSuccess: 'تم تسجيل الحجز بنجاح وإرسال التأكيد عبر الواتساب!',
    toastRoomStatusChanged: 'تم تحديث حالة الغرفة رقم ',
    toastLangChanged: 'تم تحويل لغة النظام إلى العربية',
    toastCurrencyChanged: 'تم تبديل العملة المعروضة',
    btnNextWeek: 'الأسبوع التالي',
    btnPrevWeek: 'الأسبوع السابق',
    btnCurrentWeek: 'الأسبوع الحالي',
    btnExportExcel: 'تصدير الكشف (Excel)',
    tapeChartTitle: 'مخطط إشغال الغرف التفاعلي',
    tapeAvailableSlot: 'متوفرة للحجز'
  },
  en: {
    appName: 'GrandStay PMS',
    appSubtitle: 'Smart Hotel Management',
    navDashboard: 'Dashboard',
    navAttendance: 'Attendance',
    navEmployees: 'Staff Management',
    staffManagementTitle: 'Staff & HR Directory Management',
    staffManagementSubtitle: 'Comprehensive employee directory, contracts, payroll and operational teams',
    navAnalytics: 'Analytics & Reports',
    navHousekeeping: 'Housekeeping',
    navSettings: 'Settings',
    navBookings: 'Bookings & Calendar',
    searchPlaceholder: 'Search guest, room number, or reservation ID...',
    welcomeTitle: 'Welcome, Sarah Al-Mansoor',
    welcomeSubtitle: "Here is your hotel occupancy and revenue overview for today.",
    btnNewBooking: 'New Booking',
    btnQuickCheckin: 'Quick Check-in',
    totalRoomsTitle: 'Room Inventory & Occupancy',
    legendOccupied: 'Occupied',
    legendAvailable: 'Available',
    legendMaint: 'Maintenance',
    roomOccupiedRatio: '79% Occupied',
    topSkillsTitle: 'Hotel Performance (KPIs)',
    adrLabel: 'Average Daily Rate (ADR)',
    revparLabel: 'RevPAR',
    occupancyLabel: 'Overall Occupancy',
    weeklyActivityTitle: 'Weekly Activity & Revenue Trend',
    chartLegendOccupancy: 'Occupancy %',
    chartLegendADR: 'ADR Rate',
    chartLegendRevPAR: 'RevPAR',
    shiftStaffTitle: 'Shift Staff Attendance',
    staffOnDuty: 'On Duty',
    staffLate: 'Late',
    staffAbsent: 'Absent',
    vipTitle: 'VIP Guest of the Day',
    vipGuestName: 'Dr. Tariq Al-Hakim',
    vipStayDetails: 'Royal Suite 402 • Arriving Today',
    btnWishVip: 'Prepare VIP Arrival',
    recentGuestsTitle: 'Today Arrivals & Departures',
    viewAll: 'View All',
    statusArriving: 'Expected Arrival',
    statusDeparting: 'Check-out Today',
    statusCheckedIn: 'In-House',
    roomStatusBoardTitle: 'Live Housekeeping Board (Click to switch status)',
    statusClean: 'Clean',
    statusDirty: 'Dirty',
    statusOccupied: 'Occupied',
    statusMaint: 'Maintenance',
    currencyToggle: '$ USD',
    langToggle: 'العربية',
    nightAuditBoxTitle: 'Night Audit System',
    nightAuditBoxDesc: 'Completed at 03:00 AM',
    // Days
    daySun: 'Sun',
    dayMon: 'Mon',
    dayTue: 'Tue',
    dayWed: 'Wed',
    dayThu: 'Thu',
    dayFri: 'Fri',
    daySat: 'Sat',
    monthDec: 'December 2026',
    // Modal
    modalBookingTitle: 'Create New Reservation',
    labelGuestName: 'Guest Full Name',
    labelGuestPhone: 'Phone / WhatsApp',
    labelRoomType: 'Room Category',
    labelNights: 'Nights Count',
    labelCheckInDate: 'Check-in Date',
    labelEstimatedTotal: 'Estimated Total Cost',
    btnSaveBooking: 'Confirm & Send Confirmation',
    btnCancel: 'Cancel',
    toastBookingSuccess: 'Booking created successfully! WhatsApp confirmation sent.',
    toastRoomStatusChanged: 'Room status updated for room #',
    toastLangChanged: 'System language switched to English',
    toastCurrencyChanged: 'Currency switched successfully',
    btnNextWeek: 'Next Week',
    btnPrevWeek: 'Previous Week',
    btnCurrentWeek: 'Current Week',
    btnExportExcel: 'Export Statement (Excel)',
    tapeChartTitle: 'Room Occupancy Timeline (Tape Chart)',
    tapeAvailableSlot: 'Available for Booking'
  }
};

// Format Currency
function formatMoney(amountUSD) {
  if (state.currency === 'USD') {
    return `$${Math.round(amountUSD).toLocaleString()}`;
  } else {
    const iqd = Math.round(amountUSD * state.exchangeRate);
    return state.lang === 'ar' ? `${iqd.toLocaleString()} د.ع` : `${iqd.toLocaleString()} IQD`;
  }
}

// Switch Language
function toggleLanguage() {
  state.lang = state.lang === 'ar' ? 'en' : 'ar';
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';

  applyTranslations();
  updateManagerDisplay();
  renderDonutChart();
  renderLineChart();
  renderHousekeepingChips();
  renderCalendar();
  renderTapeChart();
  renderBookingsTable();
  renderNotifications();
  showToast(translations[state.lang].toastLangChanged);
}

// Switch Currency
function toggleCurrency() {
  state.currency = state.currency === 'USD' ? 'IQD' : 'USD';
  document.getElementById('currencyToggleBtn').innerText = state.currency === 'USD' ? '$ USD' : (state.lang === 'ar' ? 'د.ع دينار' : 'IQD');
  updateFinancialMetrics();
  renderLineChart();
  renderBookingsTable();
  showToast(translations[state.lang].toastCurrencyChanged);
}

// Apply Translations to DOM
function applyTranslations() {
  const t = translations[state.lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerText = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  // Update button texts
  document.getElementById('langToggleBtn').innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
    <span>${t.langToggle}</span>
  `;

  document.getElementById('currencyToggleBtn').innerText = state.currency === 'USD' ? '$ USD' : (state.lang === 'ar' ? 'د.ع دينار' : 'IQD');
  updateFinancialMetrics();
  updateVipButtonDisplay();
  updateTodayFeedDisplay();
  renderCalendar();
  renderStaffTable();
  renderHandoverNotes();
  renderStaffManagementCards();
  renderStaffManagementTable();
  updateStaffManagementKPIs();

  const sInput = document.getElementById('globalSearchInput');
  const sDrop = document.getElementById('searchResultsDropdown');
  if (sInput && sDrop && sDrop.style.display !== 'none') {
    renderSearchResults(sInput.value.trim());
  }
}

// Update Rates and Totals
function updateFinancialMetrics() {
  const adrEl = document.getElementById('adrValue');
  if (adrEl) adrEl.innerText = formatMoney(state.metrics.adrUSD);

  const revparEl = document.getElementById('revparValue');
  if (revparEl) revparEl.innerText = formatMoney(state.metrics.revparUSD);

  const occEl = document.getElementById('occupancyValue');
  if (occEl) occEl.innerText = `${state.metrics.occupancyRate}%`;

  // Update Analytics Page KPIs if present
  const anAdr = document.getElementById('analyticsAdrVal');
  if (anAdr) anAdr.innerText = formatMoney(state.metrics.adrUSD);

  const anRevpar = document.getElementById('analyticsRevparVal');
  if (anRevpar) anRevpar.innerText = formatMoney(state.metrics.revparUSD);

  const anTotal = document.getElementById('analyticsTotalRev');
  if (anTotal) anTotal.innerText = formatMoney(84200);

  // Update all .currency-display across tables and views
  document.querySelectorAll('.currency-display').forEach(el => {
    const usd = parseFloat(el.getAttribute('data-usd')) || 0;
    el.innerText = formatMoney(usd);
  });
}

// Render SVG Donut Chart (Inspired by reference image)
function renderDonutChart() {
  const container = document.getElementById('donutChartContainer');
  const size = 120;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Percentages: Occupied 79%, Available 16%, Maintenance 5%
  const p1 = 0.79 * circumference;
  const p2 = 0.16 * circumference;
  const p3 = 0.05 * circumference;

  container.innerHTML = `
    <svg viewBox="0 0 ${size} ${size}">
      <!-- Background track -->
      <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="rgba(240, 235, 250, 0.6)" stroke-width="${strokeWidth}" />
      <!-- Occupied (Pastel Sky) -->
      <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="#38BDF8" stroke-width="${strokeWidth}"
        stroke-dasharray="${p1} ${circumference}" stroke-dashoffset="0" stroke-linecap="round" />
      <!-- Available (Pastel Mint) -->
      <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="#34D399" stroke-width="${strokeWidth}"
        stroke-dasharray="${p2} ${circumference}" stroke-dashoffset="-${p1}" stroke-linecap="round" />
      <!-- Maintenance (Pastel Coral) -->
      <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="#FB923C" stroke-width="${strokeWidth}"
        stroke-dasharray="${p3} ${circumference}" stroke-dashoffset="-${p1 + p2}" stroke-linecap="round" />
    </svg>
    <div class="donut-center-text">
      <span class="number">${state.metrics.totalRooms}</span>
      <span class="label">${state.lang === 'ar' ? 'غرفة' : 'Rooms'}</span>
    </div>
  `;
}

// Render SVG Weekly Activity Line Chart (Matching exact curve style from reference image)
function renderLineChart() {
  const svg = document.getElementById('activityChartSvg');
  const t = translations[state.lang];
  const days = [t.daySun, t.dayMon, t.dayTue, t.dayWed, t.dayThu, t.dayFri, t.daySat];
  
  // Points for 3 curves (0-100 scale mapped into 300x160 area)
  // Curve 1: Occupancy (Cyan Blue)
  const line1 = [35, 30, 88, 89, 55, 30, 15];
  // Curve 2: ADR / Sales (Coral Orange)
  const line2 = [22, 60, 20, 70, 75, 82, 65];
  // Curve 3: RevPAR (Lilac Purple)
  const line3 = [45, 25, 42, 60, 85, 50, 68];

  const width = 600;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;
  const stepX = (width - paddingX * 2) / (days.length - 1);

  // Helper to generate smooth Catmull-Rom or cubic bezier path
  function makePath(points) {
    let d = '';
    points.forEach((val, i) => {
      const x = paddingX + i * stepX;
      const y = height - paddingY - (val / 100) * (height - paddingY * 2);
      if (i === 0) {
        d += `M ${x} ${y}`;
      } else {
        const prevX = paddingX + (i - 1) * stepX;
        const prevY = height - paddingY - (points[i - 1] / 100) * (height - paddingY * 2);
        const cX1 = prevX + stepX / 2;
        const cY1 = prevY;
        const cX2 = prevX + stepX / 2;
        const cY2 = y;
        d += ` C ${cX1} ${cY1}, ${cX2} ${cY2}, ${x} ${y}`;
      }
    });
    return d;
  }

  // Generate day labels
  let labelsSvg = '';
  days.forEach((day, i) => {
    const x = paddingX + i * stepX;
    labelsSvg += `<text x="${x}" y="${height - 2}" text-anchor="middle" font-size="11" fill="#94A3B8" font-family="inherit" font-weight="600">${day}</text>`;
  });

  // Grid lines
  let gridSvg = '';
  [25, 50, 75, 100].forEach(level => {
    const y = height - paddingY - (level / 100) * (height - paddingY * 2);
    gridSvg += `<line x1="${paddingX}" y1="${y}" x2="${width - paddingX}" y2="${y}" stroke="rgba(226, 232, 240, 0.7)" stroke-dasharray="4 4" />`;
    gridSvg += `<text x="${paddingX - 10}" y="${y + 3}" text-anchor="end" font-size="9" fill="#94A3B8" font-weight="600">${level}</text>`;
  });

  svg.innerHTML = `
    <defs>
      <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#38BDF8" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="coralGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FB923C" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#FB923C" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0" />
      </linearGradient>
    </defs>
    ${gridSvg}
    ${labelsSvg}
    <!-- Cyan Line -->
    <path d="${makePath(line1)}" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
    <!-- Coral Line -->
    <path d="${makePath(line2)}" fill="none" stroke="#FB923C" stroke-width="3" stroke-linecap="round" />
    <!-- Purple Line -->
    <path d="${makePath(line3)}" fill="none" stroke="#8B5CF6" stroke-width="3" stroke-linecap="round" />
  `;
}

// Render Housekeeping Room Chips
function renderHousekeepingChips() {
  const container = document.getElementById('roomStatusGrid');
  const t = translations[state.lang];
  container.innerHTML = '';

  state.rooms.forEach(room => {
    const chip = document.createElement('div');
    chip.className = 'room-chip';
    
    let statusText = t.statusClean;
    let statusClass = 'status-clean';
    if (room.status === 'dirty') { statusText = t.statusDirty; statusClass = 'status-dirty'; }
    if (room.status === 'occupied') { statusText = t.statusOccupied; statusClass = 'status-occupied'; }
    if (room.status === 'maint') { statusText = t.statusMaint; statusClass = 'status-maint'; }

    chip.innerHTML = `
      <div class="room-chip-top">
        <span class="room-number">${room.number}</span>
        <span class="room-type-tag">${room.typeName[state.lang]}</span>
      </div>
      <div class="room-status-pill ${statusClass}">${statusText}</div>
    `;

    // Interactive Status Toggle
    chip.addEventListener('click', () => {
      const cycle = ['clean', 'occupied', 'dirty', 'maint'];
      const nextIndex = (cycle.indexOf(room.status) + 1) % cycle.length;
      room.status = cycle[nextIndex];
      renderHousekeepingChips();
      showToast(`${t.toastRoomStatusChanged} ${room.number}`);
    });

    container.appendChild(chip);
  });
}

// ==========================================================================
// Interactive Mini Calendar & Monthly Navigation
// ==========================================================================
const arabicMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const englishMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const calendarEventsData = {
  '1': { arrivals: 3, departures: 1, occupancy: 82, note: { ar: 'وصول وفد استثماري • مؤتمر الأعمال السنوي', en: 'Investment delegation arrival • Business Summit' } },
  '8': { arrivals: 4, departures: 2, occupancy: 88, note: { ar: 'مؤتمر الاستثمار والطاقة • صالة رجال الأعمال', en: 'Energy conference • Executive Lounge' } },
  '14': { arrivals: 5, departures: 3, occupancy: 91, note: { ar: 'حجوزات مجموعات ووفود دبلوماسية', en: 'Diplomatic delegation bookings' } },
  '21': { arrivals: 2, departures: 4, occupancy: 79, note: { ar: 'حركة استقبال منتظمة • تسوية إقامات', en: 'Regular arrivals & departures' } },
  '28': { arrivals: 6, departures: 1, occupancy: 96, note: { ar: 'موسم العطلات ورأس السنة الميلادية', en: 'Holiday & New Year peak season' } }
};

function renderCalendar() {
  const container = document.getElementById('calendarDaysGrid');
  const titleEl = document.getElementById('calendarMonthTitle');
  const weekdaysEl = document.getElementById('calendarWeekdaysGrid');
  if (!container) return;

  const { year, month, selectedDay } = state.calendarState;
  const monthName = state.lang === 'ar' ? arabicMonths[month] : englishMonths[month];
  if (titleEl) {
    titleEl.innerText = `${monthName} ${year}`;
  }

  if (weekdaysEl) {
    const daysAr = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];
    const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = state.lang === 'ar' ? daysAr : daysEn;
    weekdaysEl.innerHTML = days.map(d => `<span>${d}</span>`).join('');
  }

  container.innerHTML = '';

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Overflow from previous month
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell other-month';
    cell.innerText = d;
    container.appendChild(cell);
  }

  // Days of current month
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell';
    cell.innerText = d;

    if (d === selectedDay) {
      cell.classList.add('selected-today');
    }

    if ([1, 8, 14, 21, 28].includes(d)) {
      cell.classList.add('has-arrival');
    }

    cell.addEventListener('click', () => {
      selectCalendarDay(d);
    });

    container.appendChild(cell);
  }

  // Trailing days for grid completeness
  const totalRendered = firstDayIndex + daysInCurrentMonth;
  const remaining = 35 - totalRendered > 0 ? 35 - totalRendered : (42 - totalRendered > 0 ? 42 - totalRendered : 0);
  for (let d = 1; d <= remaining; d++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell other-month';
    cell.innerText = d;
    container.appendChild(cell);
  }

  updateCalendarDrawer();
}

function selectCalendarDay(dayNum) {
  state.calendarState.selectedDay = dayNum;
  document.querySelectorAll('#calendarDaysGrid .cal-day-cell').forEach(cell => {
    cell.classList.remove('selected-today');
    if (cell.innerText == dayNum && !cell.classList.contains('other-month')) {
      cell.classList.add('selected-today');
    }
  });

  updateCalendarDrawer();

  const { year, month } = state.calendarState;
  const monthName = state.lang === 'ar' ? arabicMonths[month] : englishMonths[month];
  showToast(state.lang === 'ar' ? `تم تحديد يوم ${dayNum} ${monthName} ${year}` : `Selected ${monthName} ${dayNum}, ${year}`);
}

function prevCalendarMonth() {
  state.calendarState.month -= 1;
  if (state.calendarState.month < 0) {
    state.calendarState.month = 11;
    state.calendarState.year -= 1;
  }
  state.calendarState.selectedDay = 1;
  renderCalendar();
  const monthName = state.lang === 'ar' ? arabicMonths[state.calendarState.month] : englishMonths[state.calendarState.month];
  showToast(state.lang === 'ar' ? `الانتقال إلى ${monthName} ${state.calendarState.year}` : `Switched to ${monthName} ${state.calendarState.year}`);
}

function nextCalendarMonth() {
  state.calendarState.month += 1;
  if (state.calendarState.month > 11) {
    state.calendarState.month = 0;
    state.calendarState.year += 1;
  }
  state.calendarState.selectedDay = 1;
  renderCalendar();
  const monthName = state.lang === 'ar' ? arabicMonths[state.calendarState.month] : englishMonths[state.calendarState.month];
  showToast(state.lang === 'ar' ? `الانتقال إلى ${monthName} ${state.calendarState.year}` : `Switched to ${monthName} ${state.calendarState.year}`);
}

function updateCalendarDrawer() {
  const dateEl = document.getElementById('calDrawerDate');
  const occEl = document.getElementById('calDrawerOccupancy');
  const bodyEl = document.getElementById('calDrawerBody');
  const btnText = document.getElementById('calDrawerBtnText');
  if (!dateEl) return;

  const { year, month, selectedDay } = state.calendarState;
  const monthName = state.lang === 'ar' ? arabicMonths[month] : englishMonths[month];
  dateEl.innerText = `${selectedDay} ${monthName} ${year}`;

  const ev = calendarEventsData[selectedDay.toString()] || {
    arrivals: (selectedDay % 3) + 1,
    departures: (selectedDay % 2) + 1,
    occupancy: 70 + (selectedDay % 25),
    note: { ar: 'حركة فندقية اعتيادية وحجوزات متوفرة', en: 'Standard hotel activity & rooms available' }
  };

  if (occEl) {
    occEl.innerText = state.lang === 'ar' ? `إشغال ${ev.occupancy}%` : `Occ ${ev.occupancy}%`;
  }
  if (bodyEl) {
    const arrivalsTxt = state.lang === 'ar' ? `${ev.arrivals} وصول متوقع` : `${ev.arrivals} Arrivals`;
    const depTxt = state.lang === 'ar' ? `${ev.departures} مغادرة` : `${ev.departures} Departures`;
    const noteTxt = ev.note[state.lang] || ev.note['ar'];
    bodyEl.innerText = `${arrivalsTxt} • ${depTxt} • ${noteTxt}`;
  }
  if (btnText) {
    btnText.innerText = state.lang === 'ar' ? 'عرض تفاصيل هذا اليوم' : 'View Day Details';
  }
}

function viewCalendarDayDetails() {
  const { year, month, selectedDay } = state.calendarState;
  const monthName = state.lang === 'ar' ? arabicMonths[month] : englishMonths[month];
  showToast(state.lang === 'ar' ? `الانتقال لمخطط الحجوزات ليوم ${selectedDay} ${monthName} ${year}` : `Navigating to timeline for ${selectedDay} ${monthName}`);
  switchView('bookings');
}

// ==========================================================================
// Today's Arrivals & Departures Feed Handlers
// ==========================================================================
function openArrivalsDeparturesModal() {
  updateTodayFeedDisplay();
  openModal('arrivalsDeparturesModal');
}

function openGuestArrivalModal(guestId) {
  openModal('guestArrivalModal');
}

function openGuestCheckoutModal(guestId) {
  openModal('guestCheckoutModal');
}

function confirmGuestArrivalCheckIn() {
  state.feedStatus.mohammedCheckedIn = true;
  const room204 = state.rooms.find(r => r.number === '204');
  if (room204) room204.status = 'occupied';

  if (state.metrics.availableRooms > 0) {
    state.metrics.availableRooms -= 1;
    state.metrics.occupiedRooms += 1;
    state.metrics.occupancyRate = Math.round((state.metrics.occupiedRooms / state.metrics.totalRooms) * 1000) / 10;
    updateFinancialMetrics();
  }

  renderHousekeepingChips();
  renderKanbanBoard();
  updateTodayFeedDisplay();
  closeModal('guestArrivalModal');

  if (typeof addNotification === 'function') {
    addNotification(
      'تسجيل وصول نزيل',
      'Guest Check-In',
      'تم تسجيل وصول النزيل محمد العبيدي إلى غرفة 204 (مزدوجة ديلوكس) بنجاح.',
      'Mohammed Al-Obeidi checked in to Room 204 successfully.',
      'checkin',
      'عرض الغرفة',
      'View Room'
    );
  }

  showToast(state.lang === 'ar' ? 'تم تسجيل وصول النزيل محمد العبيدي وتسكينه في غرفة 204 بنجاح ✓' : 'Guest Mohammed Al-Obeidi checked in to Room 204 ✓');
}

function confirmGuestCheckOut() {
  state.feedStatus.samirCheckedOut = true;
  const room108 = state.rooms.find(r => r.number === '108');
  if (room108) room108.status = 'dirty'; // Needs cleaning

  renderHousekeepingChips();
  renderKanbanBoard();
  updateTodayFeedDisplay();
  closeModal('guestCheckoutModal');

  if (typeof addNotification === 'function') {
    addNotification(
      'تسوية ومغادرة نزيل',
      'Guest Check-Out & Settlement',
      'تمت تسوية حساب ومغادرة النزيل سمير خليل من غرفة 108، وتم تحويل الغرفة لقسم التدبير الفندقي للتنظيف.',
      'Samir Khalil checked out from Room 108. Housekeeping notified.',
      'checkout',
      'عرض الفاتورة',
      'View Folio'
    );
  }

  showToast(state.lang === 'ar' ? 'تم إتمام مغادرة النزيل سمير خليل وتسوية حسابه وتحويل غرفة 108 للتنظيف ✓' : 'Guest Samir Khalil checked out and Room 108 sent to housekeeping ✓');
}

function updateTodayFeedDisplay() {
  const mohStatus = document.getElementById('guestStatusMohammed');
  if (mohStatus) {
    if (state.feedStatus.mohammedCheckedIn) {
      mohStatus.innerText = state.lang === 'ar' ? 'مقيم حالياً ✓' : 'In-House ✓';
      mohStatus.className = 'guest-feed-status status-clean';
      mohStatus.style.background = 'rgba(16, 185, 129, 0.15)';
      mohStatus.style.color = '#059669';
    } else {
      mohStatus.innerText = state.lang === 'ar' ? 'وصول متوقع' : 'Expected Arrival';
      mohStatus.className = 'guest-feed-status status-clean';
      mohStatus.style.background = '';
      mohStatus.style.color = '';
    }
  }

  const samStatus = document.getElementById('guestStatusSamir');
  if (samStatus) {
    if (state.feedStatus.samirCheckedOut) {
      samStatus.innerText = state.lang === 'ar' ? 'تمت المغادرة ✓' : 'Checked-Out ✓';
      samStatus.className = 'guest-feed-status';
      samStatus.style.background = '#F1F5F9';
      samStatus.style.color = '#64748B';
    } else {
      samStatus.innerText = state.lang === 'ar' ? 'مغادرة اليوم' : 'Check-out Today';
      samStatus.className = 'guest-feed-status status-dirty';
      samStatus.style.background = '';
      samStatus.style.color = '';
    }
  }

  const modalMoh = document.getElementById('modalMohStatusText');
  if (modalMoh) {
    modalMoh.innerText = state.feedStatus.mohammedCheckedIn ? (state.lang === 'ar' ? 'مقيم حالياً' : 'In-House') : (state.lang === 'ar' ? 'وصول متوقع' : 'Expected');
  }
  const modalSam = document.getElementById('modalSamStatusText');
  if (modalSam) {
    modalSam.innerText = state.feedStatus.samirCheckedOut ? (state.lang === 'ar' ? 'تمت المغادرة' : 'Checked-Out') : (state.lang === 'ar' ? 'مغادرة اليوم' : 'Check-Out Today');
  }
}


// Toast Notifications Engine
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// Generic Modal Controllers
// ==========================================================================
function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('active');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('active');
}

// Booking Modal
function openBookingModal() {
  openModal('bookingModal');
  updateEstimatedPrice();
}

function closeBookingModal() {
  closeModal('bookingModal');
}

function updateEstimatedPrice() {
  const nights = parseInt(document.getElementById('bookingNights').value) || 1;
  const roomType = document.getElementById('bookingRoomType') ? document.getElementById('bookingRoomType').value : 'double';
  let rateUSD = 145;
  if (roomType === 'single') rateUSD = 90;
  if (roomType === 'suite') rateUSD = 240;
  if (roomType === 'royal') rateUSD = 450;
  
  const totalUSD = nights * rateUSD;
  document.getElementById('bookingTotalCost').value = formatMoney(totalUSD);
}

function openBookingModalForRoom(roomNum, cat) {
  openBookingModal();
  const select = document.getElementById('bookingRoomType');
  if (select && cat) select.value = cat;
  updateEstimatedPrice();
}

function submitBookingForm(e) {
  e.preventDefault();
  const form = document.getElementById('bookingForm');
  const nameInput = form ? form.querySelector('input[type="text"]') : null;
  const guestName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : (state.lang === 'ar' ? 'نزيل جديد' : 'New Guest');
  const nights = parseInt(document.getElementById('bookingNights').value) || 1;
  const roomType = document.getElementById('bookingRoomType') ? document.getElementById('bookingRoomType').value : 'double';
  const checkInInput = form ? form.querySelector('input[type="date"]') : null;
  const checkInDate = (checkInInput && checkInInput.value) ? checkInInput.value : '2026-10-24';
  
  let rateUSD = 145;
  let roomNameAr = 'غرفة مزدوجة ديلوكس';
  let roomNameEn = 'Deluxe Double Room';
  let roomNum = '204';
  if (roomType === 'single') { rateUSD = 90; roomNameAr = 'غرفة فردية كلاسيك'; roomNameEn = 'Classic Single Room'; roomNum = '104'; }
  if (roomType === 'suite') { rateUSD = 240; roomNameAr = 'جناح تنفيذي فاخر'; roomNameEn = 'Executive Suite'; roomNum = '105'; }
  if (roomType === 'royal') { rateUSD = 450; roomNameAr = 'جناح رويال VIP'; roomNameEn = 'Royal VIP Suite'; roomNum = '303'; }

  const totalUSD = nights * rateUSD;
  const newId = `BK-${9104 + state.bookings.length}`;

  const dIn = new Date(checkInDate);
  const dOut = new Date(dIn.getFullYear(), dIn.getMonth(), dIn.getDate() + nights);
  const arMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const inStr = `${dIn.getDate()} ${arMonths[dIn.getMonth()]} ${dIn.getFullYear()}`;
  const outStr = `${dOut.getDate()} ${arMonths[dOut.getMonth()]} ${dOut.getFullYear()}`;

  const newBooking = {
    id: newId,
    guestName: guestName,
    guestNameEn: guestName,
    room: `${roomNameAr} ${roomNum}`,
    roomEn: `${roomNameEn} ${roomNum}`,
    roomNumber: roomNum,
    checkIn: checkInDate,
    checkOut: dOut.toISOString().slice(0, 10),
    checkInFormatted: inStr,
    checkOutFormatted: outStr,
    nights: nights,
    totalUSD: totalUSD,
    status: 'paid',
    statusText: state.lang === 'ar' ? 'مدفوع بالكامل' : 'Paid in Full',
    statusTextEn: 'Paid in Full'
  };

  state.bookings.unshift(newBooking);
  renderBookingsTable();
  addNotification(
    `حجز جديد مؤكد #${newId}`,
    `New Booking #${newId}`,
    `النزيل: ${guestName} • ${roomNameAr}`,
    `Guest: ${guestName} • ${roomNameEn}`,
    'booking',
    'عرض الفاتورة',
    'View Folio'
  );
  if (form) form.reset();
  closeBookingModal();
  showToast(state.lang === 'ar' ? `تم تأكيد حجز النزيل ${guestName} برقم #${newId} وإضافته لسجل الحجوزات` : `Booking #${newId} confirmed for ${guestName}`);
}

// Guest Folio & Invoice Controllers
function openGuestFolio(guestName, roomDates, amountUSD, folioId) {
  const nameEl = document.getElementById('folioGuestName');
  if (nameEl && guestName) nameEl.innerText = guestName;
  const roomEl = document.getElementById('folioRoomDates');
  if (roomEl && roomDates) roomEl.innerText = roomDates;
  openModal('folioModal');
}

function printGuestInvoice() {
  showToast(state.lang === 'ar' ? 'جارٍ إرسال الفاتورة للطابعة وتوليد ملف PDF...' : 'Sending tax invoice to printer & generating PDF...');
  setTimeout(() => {
    window.print();
  }, 400);
}

// Key Card RFID Encoder
function openKeyCardEncoder(roomNum) {
  const display = document.getElementById('keyCardRoomDisplay');
  const input = document.getElementById('keyCardRoomInput');
  if (display) display.innerText = roomNum || '202';
  if (input) input.value = roomNum || '202';
  openModal('keyCardModal');
}

function encodeRfidKey() {
  const roomNum = document.getElementById('keyCardRoomInput').value || '202';
  closeModal('keyCardModal');
  showToast(state.lang === 'ar' ? `تم تشفير وبرمجة بطاقة المفتاح الذكية بنجاح للغرفة #${roomNum}` : `RFID Smart Key Card successfully encoded for Room #${roomNum}`);
}

// ==========================================================================
// VIP Guest Operations & Pre-arrival Preparation
// ==========================================================================
function initVipGuest() {
  const saved = localStorage.getItem('grandstay_vip_status');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.vipStatus = { ...state.vipStatus, ...parsed };
      if (state.vipStatus.checkedIn) {
        const room402 = state.rooms.find(r => r.number === '402');
        if (room402) room402.status = 'occupied';
      }
    } catch (e) {
      console.error('Failed to parse VIP status', e);
    }
  }
  updateVipButtonDisplay();
}

function saveVipGuestStatus() {
  try {
    localStorage.setItem('grandstay_vip_status', JSON.stringify(state.vipStatus));
  } catch (e) {
    console.error('Failed to save VIP status', e);
  }
}

function updateVipButtonDisplay() {
  const vipBtn = document.getElementById('btnVipAction');
  if (!vipBtn) return;

  if (state.vipStatus.checkedIn) {
    vipBtn.className = 'btn-vip-action inhouse';
    vipBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      <span>${state.lang === 'ar' ? 'النزيل مقيم بالجناح (In-House)' : 'Guest In-House (Checked-In)'}</span>
    `;
  } else if (state.vipStatus.prepared) {
    vipBtn.className = 'btn-vip-action prepared';
    vipBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${state.lang === 'ar' ? 'تم الاستقبال والتجهيز ✓' : 'VIP Suite Prepared ✓'}</span>
    `;
  } else {
    vipBtn.className = 'btn-vip-action';
    vipBtn.innerHTML = `
      <span>${state.lang === 'ar' ? 'استقبال وتجهيز الجناح' : 'Prepare VIP Arrival'}</span>
    `;
  }
}

function openVipModal() {
  const statusBadge = document.getElementById('vipSuiteStatusBadge');
  const resetBtn = document.getElementById('vipResetBtn');
  const confirmBtn = document.getElementById('btnVipConfirmPrepare');
  const checkInBtn = document.getElementById('btnVipCheckInNow');

  if (statusBadge) {
    if (state.vipStatus.checkedIn) {
      statusBadge.textContent = state.lang === 'ar' ? 'مقيم بالجناح 402' : 'In-House Suite 402';
      statusBadge.className = 'vip-status-badge status-inhouse';
    } else if (state.vipStatus.prepared) {
      statusBadge.textContent = state.lang === 'ar' ? 'الجناح جاهز ومجهز' : 'Suite Prepared & Ready';
      statusBadge.className = 'vip-status-badge status-ready';
    } else {
      statusBadge.textContent = state.lang === 'ar' ? 'وصول اليوم 14:00' : 'Arriving Today 14:00';
      statusBadge.className = 'vip-status-badge status-pending';
    }
  }

  if (resetBtn) {
    resetBtn.style.display = (state.vipStatus.prepared || state.vipStatus.checkedIn) ? 'inline-flex' : 'none';
  }

  if (confirmBtn) {
    if (state.vipStatus.prepared && !state.vipStatus.checkedIn) {
      confirmBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${state.lang === 'ar' ? 'تم اعتماد التجهيز مسبقاً ✓' : 'Preparation Confirmed ✓'}</span>
      `;
    } else {
      confirmBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${state.lang === 'ar' ? 'تأكيد التجهيز وإشعار الكونسيرج' : 'Confirm & Notify Concierge'}</span>
      `;
    }
  }

  if (checkInBtn) {
    if (state.vipStatus.checkedIn) {
      checkInBtn.innerHTML = `
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${state.lang === 'ar' ? 'تم تسجيل الوصول' : 'Already Checked-In'}</span>
      `;
      checkInBtn.disabled = true;
      checkInBtn.style.opacity = '0.65';
    } else {
      checkInBtn.innerHTML = `
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>${state.lang === 'ar' ? 'تسجيل وصول النزيل الآن' : 'Check-In Guest Now'}</span>
      `;
      checkInBtn.disabled = false;
      checkInBtn.style.opacity = '1';
    }
  }

  updateVipChecklistProgress();
  openModal('vipModal');
}

function updateVipChecklistProgress() {
  const checkboxes = document.querySelectorAll('#vipChecklistItems .vip-checkbox');
  const countEl = document.getElementById('vipChecklistCount');
  const barEl = document.getElementById('vipProgressBar');
  if (!checkboxes.length) return;

  let checkedCount = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) checkedCount++;
  });

  const total = checkboxes.length;
  const pct = Math.round((checkedCount / total) * 100);

  if (countEl) {
    countEl.textContent = state.lang === 'ar' ? `${checkedCount} / ${total} جاهزة (${pct}%)` : `${checkedCount} / ${total} Ready (${pct}%)`;
  }
  if (barEl) {
    barEl.style.width = `${pct}%`;
  }
}

function confirmVipAmenities() {
  state.vipStatus.prepared = true;
  saveVipGuestStatus();
  updateVipButtonDisplay();

  // Make sure suite 402 is clean and ready
  const room402 = state.rooms.find(r => r.number === '402');
  if (room402 && !state.vipStatus.checkedIn) {
    room402.status = 'clean';
    renderHousekeepingChips();
    renderKanbanBoard();
  }

  // Push actual notification to system notification dropdown
  if (typeof addNotification === 'function') {
    addNotification(
      'تجهيز استقبال VIP',
      'VIP Reception Prepared',
      'تم اعتماد وتجهيز جناح الرويال 402 بالكامل لاستقبال د. طارق الحكيم وإشعار فريق الكونسيرج وسائق المطار.',
      'Royal Suite 402 fully prepared for Dr. Tariq Al-Hakim. Concierge and chauffeur notified.',
      'vip',
      'عرض الجناح',
      'View Suite'
    );
  }

  closeModal('vipModal');
  showToast(state.lang === 'ar' ? 'تم اعتماد خدمات كبار الشخصيات وتجهيز جناح الرويال 402 بنجاح ✓' : 'VIP arrival checklist confirmed and Suite 402 is ready ✓');
}

function checkInVipGuest() {
  state.vipStatus.prepared = true;
  state.vipStatus.checkedIn = true;
  saveVipGuestStatus();
  updateVipButtonDisplay();

  // Update room 402 status to occupied
  const room402 = state.rooms.find(r => r.number === '402');
  if (room402) {
    room402.status = 'occupied';
  }
  // Also sync room 301 if present
  const room301 = state.rooms.find(r => r.number === '301');
  if (room301) {
    room301.status = 'occupied';
  }

  // Update metrics
  if (state.metrics.availableRooms > 0) {
    state.metrics.availableRooms -= 1;
    state.metrics.occupiedRooms += 1;
    state.metrics.occupancyRate = Math.round((state.metrics.occupiedRooms / state.metrics.totalRooms) * 1000) / 10;
    updateFinancialMetrics();
  }

  renderHousekeepingChips();
  renderKanbanBoard();

  if (typeof addNotification === 'function') {
    addNotification(
      'تسجيل وصول VIP',
      'VIP Check-In Completed',
      'تم تسكين د. طارق الحكيم في جناح الرويال 402 بنجاح وتم تسليم بطاقة المفتاح الذكية.',
      'Dr. Tariq Al-Hakim checked in to Royal Suite 402. Key card issued.',
      'vip',
      'عرض الفاتورة',
      'View Folio'
    );
  }

  closeModal('vipModal');
  showToast(state.lang === 'ar' ? 'تم تسجيل وصول د. طارق الحكيم إلى جناح الرويال 402 بنجاح!' : 'Dr. Tariq Al-Hakim checked in to Royal Suite 402 successfully!');
}

function resetVipStatus() {
  state.vipStatus.prepared = false;
  state.vipStatus.checkedIn = false;
  saveVipGuestStatus();
  updateVipButtonDisplay();

  const room402 = state.rooms.find(r => r.number === '402');
  if (room402) {
    room402.status = 'clean';
    renderHousekeepingChips();
    renderKanbanBoard();
  }

  closeModal('vipModal');
  showToast(state.lang === 'ar' ? 'تمت إعادة ضبط حالة استقبال النزيل المميز' : 'VIP guest status reset');
}

// Maintenance Tickets
function openMaintenanceModal() {
  openModal('maintenanceModal');
}

function submitMaintenanceRequest(e) {
  e.preventDefault();
  const select = document.getElementById('maintRoomSelect');
  const roomNum = select ? select.value : '203';
  closeModal('maintenanceModal');

  // Update room status in state if room exists
  const targetRoom = state.rooms.find(r => r.number === roomNum);
  if (targetRoom) {
    targetRoom.status = 'maint';
    renderKanbanBoard();
    renderHousekeepingChips();
  }

  addNotification(
    `بلاغ صيانة طارئ - غرفة #${roomNum}`,
    `Maintenance Ticket - Room #${roomNum}`,
    `تم تسجيل بلاغ صيانة وبانتظار المشرف الفني`,
    `Maintenance dispatched for inspection`,
    'maintenance',
    'لوحة الصيانة',
    'Housekeeping'
  );

  showToast(state.lang === 'ar' ? `تم تسجيل تذكرة صيانة طارئة للغرفة #${roomNum} وإشعار الفني المسؤول` : `Emergency maintenance ticket dispatched for Room #${roomNum}`);
}

function resolveMaintenanceTicket(btn, roomNum) {
  if (btn) {
    btn.innerText = state.lang === 'ar' ? 'تم الإصلاح' : 'Resolved';
    btn.style.background = 'var(--accent-mint-bg)';
    btn.style.color = '#059669';
    btn.disabled = true;
  }
  const room = state.rooms.find(r => r.number === roomNum);
  if (room) {
    room.status = 'clean';
    renderKanbanBoard();
    renderHousekeepingChips();
  }
  showToast(state.lang === 'ar' ? `تم إنهاء صيانة الغرفة #${roomNum} وإعادتها للخدمة بنجاح` : `Maintenance resolved for Room #${roomNum}. Ready for check-in.`);
}

function logLostAndFound() {
  showToast(state.lang === 'ar' ? 'تم توثيق الغرض المفقود في خزينة الأمانات الرسمية' : 'New item logged in Lost & Found register');
}

// Staff Attendance & Shifts Interactive Engine
function openAttendanceModal(empId) {
  if (empId) {
    const empSelect = document.getElementById('attendEmployeeSelect');
    if (empSelect) empSelect.value = empId;
    const staff = state.staffList.find(s => s.id === empId);
    if (staff) {
      const shiftSelect = document.getElementById('attendShiftTypeSelect');
      if (shiftSelect && staff.shift) shiftSelect.value = staff.shift;
      const actionSelect = document.getElementById('attendActionTypeSelect');
      if (actionSelect) {
        if (staff.status === 'break') actionSelect.value = 'resume';
        else if (staff.status === 'duty') actionSelect.value = 'break';
        else actionSelect.value = 'checkin';
      }
    }
  }
  openModal('attendanceModal');
}

function quickToggleDutyFromModal() {
  const empSelect = document.getElementById('attendEmployeeSelect');
  const empId = empSelect ? empSelect.value : (state.staffList[0] ? state.staffList[0].id : null);
  if (empId) {
    closeModal('attendanceModal');
    toggleEmployeeDutyStatus(empId);
  }
}

function submitAttendanceRecord(e) {
  if (e) e.preventDefault();
  const empSelect = document.getElementById('attendEmployeeSelect');
  const actionSelect = document.getElementById('attendActionTypeSelect');
  const shiftSelect = document.getElementById('attendShiftTypeSelect');

  const empId = empSelect ? empSelect.value : 'ST-02';
  const action = actionSelect ? actionSelect.value : 'checkin';
  const shift = shiftSelect ? shiftSelect.value : 'morning';

  const staff = state.staffList.find(s => s.id === empId);
  const now = new Date();
  const timeStr = `${String(now.getHours() % 12 || 12).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'م' : 'ص'}`;

  if (staff) {
    staff.shift = shift;
    if (shift === 'morning') {
      staff.shiftNameAr = 'مناوبة الصباح';
      staff.shiftNameEn = 'Morning Shift';
    } else if (shift === 'evening') {
      staff.shiftNameAr = 'مناوبة المساء';
      staff.shiftNameEn = 'Evening Shift';
    } else {
      staff.shiftNameAr = 'مناوبة الليل';
      staff.shiftNameEn = 'Night Audit';
    }

    if (action === 'checkin') {
      staff.status = 'duty';
      staff.statusTextAr = 'على رأس العمل';
      staff.statusTextEn = 'On Duty';
      staff.checkInTime = timeStr;
    } else if (action === 'break') {
      staff.status = 'break';
      staff.statusTextAr = 'استراحة وجبة';
      staff.statusTextEn = 'Meal Break';
    } else if (action === 'resume') {
      staff.status = 'duty';
      staff.statusTextAr = 'على رأس العمل';
      staff.statusTextEn = 'On Duty';
    } else if (action === 'checkout') {
      staff.status = 'duty';
      staff.statusTextAr = 'انصراف منتهي';
      staff.statusTextEn = 'Shift Ended';
      staff.checkInTime = `انصراف ${timeStr}`;
    }
  }

  closeModal('attendanceModal');
  renderStaffTable();
  renderStaffManagementCards();
  renderStaffManagementTable();
  updateStaffManagementKPIs();

  showToast(state.lang === 'ar' ? 'تم تسجيل وتوثيق حركة الدوام بنجاح في سجل الحضور المعتمد' : 'Attendance movement timestamped and verified successfully');

  if (staff) {
    addNotification(
      `حركة دوام مسجلة - ${staff.name}`,
      `Attendance Logged - ${staff.name}`,
      `تم توثيق حركة (${staff.statusTextAr}) في تمام ${timeStr}`,
      `Movement (${staff.statusTextEn}) logged at ${timeStr}`,
      'staff',
      'سجل الحضور',
      'Staff Attendance'
    );
  }
}

function renderStaffTable() {
  const tbody = document.getElementById('staffTableBody');
  if (!tbody) return;

  const filtered = state.staffFilter === 'all'
    ? state.staffList
    : state.staffList.filter(s => s.shift === state.staffFilter);

  // Update shift summary badge counts
  const morningCount = state.staffList.filter(s => s.shift === 'morning').length;
  const eveningCount = state.staffList.filter(s => s.shift === 'evening').length;
  const nightCount = state.staffList.filter(s => s.shift === 'night').length;

  const mEl = document.getElementById('shiftMorningCount');
  if (mEl) mEl.innerText = morningCount;
  const eEl = document.getElementById('shiftEveningCount');
  if (eEl) eEl.innerText = eveningCount;
  const nEl = document.getElementById('shiftNightCount');
  if (nEl) nEl.innerText = nightCount;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:#64748B;">${state.lang === 'ar' ? 'لا يوجد موظفون في هذه المناوبة المحددة' : 'No staff found for selected shift'}</td></tr>`;
    return;
  }

  let html = '';
  filtered.forEach(s => {
    let badgeClass = 'badge-paid';
    let statusText = state.lang === 'ar' ? s.statusTextAr : s.statusTextEn;

    if (s.status === 'break') {
      badgeClass = 'badge-cancel';
    } else if (s.status === 'maint') {
      badgeClass = 'badge-deposit';
    }

    let actionBtn = '';
    if (s.id === 'ST-01') {
      actionBtn = `<button type="button" class="pill-button" onclick="openEmployeeProfileModal('${s.id}')">${state.lang === 'ar' ? 'الملف' : 'Profile'}</button>`;
    } else if (s.id === 'ST-04') {
      actionBtn = `<button type="button" class="pill-button" onclick="openAssignTasksModal()">${state.lang === 'ar' ? 'توزيع المهام' : 'Assign Tasks'}</button>`;
    } else if (s.id === 'ST-06') {
      actionBtn = `<button type="button" class="pill-button" onclick="openMaintenanceModal()">${state.lang === 'ar' ? 'متابعة' : 'Follow up'}</button>`;
    } else {
      const isBreak = s.status === 'break';
      const btnText = isBreak ? (state.lang === 'ar' ? 'عودة للعمل' : 'Resume') : (state.lang === 'ar' ? 'استراحة' : 'Break');
      const activeClass = isBreak ? ' break-active' : '';
      actionBtn = `<button type="button" class="pill-button${activeClass}" onclick="toggleStaffBreakStatus('${s.id}')">${btnText}</button>`;
    }

    const shiftText = state.lang === 'ar' ? s.shiftNameAr : s.shiftNameEn;

    html += `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.role}</td>
        <td>${shiftText}</td>
        <td>${s.checkInTime}</td>
        <td><span class="table-badge ${badgeClass}" id="staffBadge-${s.id}">${statusText}</span></td>
        <td>${actionBtn}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function filterStaffShift(shiftType, cardEl) {
  const cards = document.querySelectorAll('.shift-card');
  const badge = document.getElementById('staffFilterBadge');
  const resetBtn = document.getElementById('btnResetStaffFilter');

  if (state.staffFilter === shiftType) {
    resetStaffFilter();
    return;
  }

  state.staffFilter = shiftType;
  cards.forEach(c => c.classList.remove('active'));
  if (cardEl) {
    cardEl.classList.add('active');
  }

  if (badge) {
    badge.style.display = 'inline-block';
    const names = {
      morning: state.lang === 'ar' ? 'مناوبة الصباح' : 'Morning Shift',
      evening: state.lang === 'ar' ? 'مناوبة المساء' : 'Evening Shift',
      night: state.lang === 'ar' ? 'مناوبة الليل' : 'Night Audit'
    };
    badge.innerText = names[shiftType] || shiftType;
  }
  if (resetBtn) resetBtn.style.display = 'inline-block';

  renderStaffTable();
  const shiftTitles = {
    morning: state.lang === 'ar' ? 'طاقم مناوبة الصباح' : 'Morning Shift Staff',
    evening: state.lang === 'ar' ? 'طاقم مناوبة المساء' : 'Evening Shift Staff',
    night: state.lang === 'ar' ? 'طاقم مناوبة الليل' : 'Night Shift Staff'
  };
  showToast(`${state.lang === 'ar' ? 'تمت تصفية القائمة لعرض' : 'Filtered to'}: ${shiftTitles[shiftType]}`);
}

function resetStaffFilter() {
  state.staffFilter = 'all';
  document.querySelectorAll('.shift-card').forEach(c => c.classList.remove('active'));
  const badge = document.getElementById('staffFilterBadge');
  const resetBtn = document.getElementById('btnResetStaffFilter');
  if (badge) badge.style.display = 'none';
  if (resetBtn) resetBtn.style.display = 'none';
  renderStaffTable();
  showToast(state.lang === 'ar' ? 'تم عرض كافة أفراد الطاقم المناوب' : 'Showing all shifts staff');
}

function toggleStaffBreakStatus(staffId) {
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  if (staff.status === 'break') {
    staff.status = 'duty';
    staff.statusTextAr = 'على رأس العمل';
    staff.statusTextEn = 'On Duty';
    showToast(state.lang === 'ar' ? `تم تسجيل عودة ${staff.name} على رأس العمل بنجاح` : `${staff.name} resumed duty successfully`);
    addNotification(
      `عودة للعمل - ${staff.name}`,
      `Resumed Duty - ${staff.name}`,
      `أنهى الموظف استراحته وعاد لمزاولة مهامه الميدانية`,
      `Staff member completed break and resumed duty`,
      'staff',
      'سجل الحضور',
      'Staff Attendance'
    );
  } else {
    staff.status = 'break';
    staff.statusTextAr = 'استراحة وجبة';
    staff.statusTextEn = 'Meal Break';
    showToast(state.lang === 'ar' ? `تم تسجيل خروج ${staff.name} للاستراحة المؤقتة` : `${staff.name} went on break`);
    addNotification(
      `خروج للاستراحة - ${staff.name}`,
      `Break Started - ${staff.name}`,
      `سجل الموظف خروج استراحة مؤقتة لتناول الوجبة`,
      `Staff member recorded a temporary meal break`,
      'staff',
      'سجل الحضور',
      'Staff Attendance'
    );
  }

  renderStaffTable();
  renderStaffManagementCards();
  renderStaffManagementTable();
  updateStaffManagementKPIs();
}

// openEmployeeProfileModal is implemented with full interactive controls in the Staff & HR Management Module below

function openAssignTasksModal() {
  openModal('assignTasksModal');
}

function confirmAssignTasks() {
  closeModal('assignTasksModal');
  showToast(state.lang === 'ar' ? 'تم اعتماد توزيع مهام التدبير الفندقي وإشعار المشرف حيدر كمال وطاقم النظافة بنجاح!' : 'Housekeeping floor tasks approved and staff notified successfully!');
  addNotification(
    'اعتماد توزيع مهام النظافة والتفتيش',
    'Housekeeping Tasks Assigned',
    'تم توزيع مهام الطوابق على حيدر كمال وليلى ناصر وزينب جواد',
    'Housekeeping tasks assigned across shifts and floors',
    'housekeeping',
    'التدبير الفندقي',
    'Housekeeping'
  );
}

function openPreviousMonthAttendanceModal() {
  openModal('previousMonthAttendanceModal');
}

function downloadCSV(csvContent, filename) {
  const content = csvContent.startsWith('\uFEFF') ? csvContent : '\uFEFF' + csvContent;
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function openPrintWindow(title, contentHtml, extraStyles = '', width = 900, height = 700) {
  const isAr = state.lang === 'ar';
  const printWin = window.open('', '_blank', `width=${width},height=${height}`);
  if (!printWin) {
    alert(isAr ? 'يرجى السماح بالنوافذ المنبثقة للطباعة' : 'Please allow popups to print');
    return;
  }
  const baseCss = `
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; color: #1E293B; background: #FFF; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #7C3AED; padding-bottom: 12px; margin-bottom: 20px; }
    h1 { margin: 0; font-size: 1.5rem; color: #1E293B; }
    .meta { font-size: 0.85rem; color: #64748B; }
    table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 0.82rem; }
    th, td { border: 1px solid #CBD5E1; padding: 8px 10px; text-align: ${isAr ? 'right' : 'left'}; }
    th { background: #F1F5F9; font-weight: 700; color: #334155; }
    tr:nth-child(even) { background: #F8FAFC; }
    .summary { margin-top: 20px; display: flex; justify-content: space-between; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; font-weight: 700; }
    @media print { body { padding: 10px; } }
  `;
  const html = `<!DOCTYPE html><html dir="${isAr ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><title>${title}</title><style>${baseCss}${extraStyles}</style></head><body>${contentHtml}<script>window.onload=function(){window.print();};<\/script></body></html>`;
  printWin.document.open();
  printWin.document.write(html);
  printWin.document.close();
}

function exportAttendanceCSV() {
  const csvContent = "الموظف,القسم / المنصب,أيام الحضور,ساعات الدوام,التأخيرات,التقييم الشهري\n"
    + "سارة المنصور,مدير العمليات,30,240,0 دقيقة,100% ممتاز\n"
    + "فهد القحطاني,مشرف الاستقبال,29,232,15 دقيقة,99% ممتاز\n"
    + "منى العلي,موظفة استقبال,28,224,20 دقيقة,98% جيد جداً\n"
    + "حيدر كمال,مشرف التدبير الفندقي,30,248,0 دقيقة,100% ممتاز\n"
    + "ليلى ناصر,تدبير فندقي,28,224,10 دقائق,98% جيد جداً\n"
    + "أحمد سالم,صيانة عامة,29,236,30 دقيقة,96% جيد\n";
  downloadCSV(csvContent, 'GrandStay_Staff_Attendance_Nov_2026.csv');
  showToast(state.lang === 'ar' ? 'تم تصدير كشف الدوام لشهر نوفمبر بنجاح بصيغة CSV / Excel' : 'Attendance record exported to CSV successfully');
}

function renderHandoverNotes() {
  const container = document.getElementById('handoverNotesContainer');
  if (!container) return;

  if (!state.handoverNotes || state.handoverNotes.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:14px; color:#64748B; font-size:0.85rem;">${state.lang === 'ar' ? 'لا توجد ملاحظات تسليم مسجلة حالياً' : 'No handover notes recorded yet'}</div>`;
    return;
  }

  let html = '';
  state.handoverNotes.forEach(note => {
    html += `
      <div class="handover-note-item">
        <div class="handover-note-content">
          <span class="note-bullet">📌</span>
          <p>${note.text}</p>
        </div>
        <div class="handover-note-meta">
          <span class="note-author">${note.author}</span>
          <span class="note-time">${note.time}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function saveHandoverNote() {
  const input = document.getElementById('handoverNoteInput');
  if (!input || !input.value.trim()) {
    showToast(state.lang === 'ar' ? 'يرجى كتابة الملاحظة أولاً' : 'Please type a note first');
    return;
  }

  const noteText = input.value.trim();
  const now = new Date();
  const timeStr = `${String(now.getHours() % 12 || 12).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'م' : 'ص'}`;
  const authorName = (state.manager && state.manager.name) ? state.manager.name : 'آيات حربي';

  state.handoverNotes.unshift({
    text: noteText,
    author: authorName,
    time: timeStr
  });

  input.value = '';
  renderHandoverNotes();
  showToast(state.lang === 'ar' ? 'تم تسجيل وتوثيق ملاحظة تسليم المناوبة بنجاح' : 'Handover note logged successfully');

  addNotification(
    'ملاحظة تسليم مناوبة جديدة',
    'New Handover Note Logged',
    noteText.length > 50 ? noteText.substring(0, 50) + '...' : noteText,
    'A new handover note was added to the shift logbook',
    'handover',
    'تسليم المناوبة',
    'Handover Log'
  );
}

// Night Audit Modal
function openNightAuditModal() {
  openModal('nightAuditModal');
}

function executeNightAudit() {
  closeModal('nightAuditModal');
  showToast(state.lang === 'ar' ? 'جارٍ تدقيق وترحيل رسوم الغرف وتجميد اليوم المالي...' : 'Running Night Audit & posting daily room charges...');
  setTimeout(() => {
    showToast(state.lang === 'ar' ? 'اكتمل التدقيق اليومي بنجاح وتوليد ميزان المراجعة!' : 'Night Audit verified, finalized and audit balance sheet generated!');
    addNotification(
      'اكتمال الإقفال اليومي (Night Audit)',
      'Daily Night Audit Finalized',
      'تم تجميد اليوم المالي وتوليد ميزان المراجعة بنجاح',
      'Night audit completed and financial day closed',
      'audit',
      'التقارير المالية',
      'Financial Reports'
    );
  }, 1200);
}

// ====================================================================
// Staff & HR Management Module (إدارة شؤون الموظفين وفريق العمل)
// ====================================================================

function updateStaffManagementKPIs() {
  const totalStaff = state.staffList.length;
  const onDutyCount = state.staffList.filter(s => s.status === 'duty').length;
  const totalPayroll = state.staffList.reduce((acc, s) => acc + (s.salaryUSD || 750) + (s.bonusUSD || 0), 0);
  const onDutyPercent = totalStaff > 0 ? Math.round((onDutyCount / totalStaff) * 100) : 0;

  const kpiTotal = document.getElementById('kpiTotalStaff');
  if (kpiTotal) kpiTotal.innerText = `${totalStaff} ${state.lang === 'ar' ? 'موظفين' : 'Staff'}`;

  const navBadge = document.getElementById('navStaffCountBadge');
  if (navBadge) navBadge.innerText = totalStaff;

  const kpiOnDuty = document.getElementById('kpiOnDutyStaff');
  if (kpiOnDuty) kpiOnDuty.innerText = `${onDutyCount} ${state.lang === 'ar' ? 'موظفين' : 'Staff'}`;

  const kpiOnDutySubtext = document.getElementById('kpiOnDutySubtext');
  if (kpiOnDutySubtext) {
    kpiOnDutySubtext.innerText = state.lang === 'ar' 
      ? `جاهزية تشغيلية بنسبة ${onDutyPercent}% • تصفية فورية`
      : `Operational readiness ${onDutyPercent}% • Filter`;
  }

  const kpiPayroll = document.getElementById('kpiPayrollTotal');
  if (kpiPayroll) kpiPayroll.innerText = formatMoney(totalPayroll);

  const kpiRating = document.getElementById('kpiStaffRating');
  if (kpiRating) kpiRating.innerText = '98.8%';

  renderStaffDeptFilterButtons();
}

function renderStaffDeptFilterButtons() {
  const isAr = state.lang === 'ar';
  const total = state.staffList.length;
  
  const receptionCount = state.staffList.filter(s => 
    s.dept && (s.dept.includes('استقبال') || s.dept.toLowerCase().includes('reception') || s.dept.toLowerCase().includes('front'))
  ).length;

  const housekeepingCount = state.staffList.filter(s => 
    s.dept && (s.dept.includes('تدبير') || s.dept.toLowerCase().includes('housekeeping'))
  ).length;

  const maintCount = state.staffList.filter(s => 
    s.dept && (s.dept.includes('صيانة') || s.dept.toLowerCase().includes('engineering') || s.dept.toLowerCase().includes('maint'))
  ).length;

  const managementCount = state.staffList.filter(s => 
    s.dept && (s.dept.includes('إدارة') || s.dept.includes('المحاسبة') || s.dept.toLowerCase().includes('admin') || s.dept.toLowerCase().includes('finance') || s.dept.toLowerCase().includes('management'))
  ).length;

  const btnAll = document.getElementById('deptFilterAll');
  if (btnAll) btnAll.innerText = isAr ? `الكل (${total})` : `All (${total})`;

  const btnRec = document.getElementById('deptFilterReception');
  if (btnRec) btnRec.innerText = isAr ? `الاستقبال (${receptionCount})` : `Reception (${receptionCount})`;

  const btnHk = document.getElementById('deptFilterHousekeeping');
  if (btnHk) btnHk.innerText = isAr ? `التدبير الفندقي (${housekeepingCount})` : `Housekeeping (${housekeepingCount})`;

  const btnMaint = document.getElementById('deptFilterMaint');
  if (btnMaint) btnMaint.innerText = isAr ? `الصيانة (${maintCount})` : `Maintenance (${maintCount})`;

  const btnMgmt = document.getElementById('deptFilterManagement');
  if (btnMgmt) btnMgmt.innerText = isAr ? `الإدارة والمحاسبة (${managementCount})` : `Management (${managementCount})`;

  // Manage Reset button visibility
  const btnReset = document.getElementById('btnResetStaffManagementFilter');
  const isFiltered = (state.staffManagement.activeDept && state.staffManagement.activeDept !== 'all') ||
                     (state.staffManagement.activeDutyFilter && state.staffManagement.activeDutyFilter !== 'all') ||
                     (state.staffManagement.searchQuery && state.staffManagement.searchQuery.trim() !== '');

  if (btnReset) {
    btnReset.style.display = isFiltered ? 'inline-flex' : 'none';
  }

  // Manage clear search icon
  const btnClearSearch = document.getElementById('btnClearStaffSearch');
  if (btnClearSearch) {
    btnClearSearch.style.display = (state.staffManagement.searchQuery && state.staffManagement.searchQuery.trim() !== '') ? 'block' : 'none';
  }
}

function matchStaffDept(deptVal, filterTarget) {
  if (!filterTarget || filterTarget === 'all') return true;
  if (!deptVal) return false;
  const d = deptVal.toLowerCase();
  const f = filterTarget.toLowerCase();

  if (f.includes('إدارة') || f.includes('management') || f.includes('المحاسبة')) {
    return d.includes('إدارة') || d.includes('المحاسبة') || d.includes('management') || d.includes('finance') || d.includes('admin');
  }
  if (f.includes('استقبال') || f.includes('reception') || f.includes('front')) {
    return d.includes('استقبال') || d.includes('reception') || d.includes('front');
  }
  if (f.includes('تدبير') || f.includes('housekeeping')) {
    return d.includes('تدبير') || d.includes('housekeeping');
  }
  if (f.includes('صيانة') || f.includes('maintenance') || f.includes('engineering')) {
    return d.includes('صيانة') || d.includes('maintenance') || d.includes('engineering');
  }
  return d.includes(f);
}

function renderStaffManagementCards() {
  const grid = document.getElementById('staffCardsGrid');
  if (!grid) return;

  const isAr = state.lang === 'ar';
  const activeDept = state.staffManagement.activeDept || 'all';
  const dutyFilter = state.staffManagement.activeDutyFilter || 'all';
  const query = (state.staffManagement.searchQuery || '').toLowerCase().trim();

  const filtered = state.staffList.filter(s => {
    const matchesDept = matchStaffDept(s.dept, activeDept);
    const matchesDuty = (dutyFilter === 'all') || (s.status === dutyFilter);
    const matchesQuery = !query ||
      (s.name && s.name.toLowerCase().includes(query)) ||
      (s.role && s.role.toLowerCase().includes(query)) ||
      (s.dept && s.dept.toLowerCase().includes(query)) ||
      (s.phone && s.phone.includes(query)) ||
      (s.email && s.email.toLowerCase().includes(query)) ||
      (s.contractType && s.contractType.toLowerCase().includes(query)) ||
      (s.id && s.id.toLowerCase().includes(query));
    return matchesDept && matchesDuty && matchesQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: rgba(255,255,255,0.7); border-radius: 18px; border: 1px dashed #CBD5E1;">
        <div style="font-size: 2.2rem; margin-bottom: 10px;">👥</div>
        <h4 style="color:#1E293B; margin-bottom: 6px; font-size:1.05rem;">${isAr ? 'لم يتم العثور على موظفين مطابقين لخيارات البحث أو التصفية' : 'No staff members match the selected filter'}</h4>
        <p style="font-size:0.85rem; color:#64748B; margin-bottom:14px;">${isAr ? 'يمكنك إعادة ضبط الفلاتر أو مسح نص البحث لعرض كافة الكادر الفندقي' : 'Try clearing filters or search term to see all staff'}</p>
        <button type="button" class="btn-primary" onclick="resetStaffManagementFilters()" style="margin: 0 auto;">
          <span>${isAr ? 'عرض كافة الموظفين (إلغاء التصفية)' : 'Show All Staff (Reset Filter)'}</span>
        </button>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(s => {
    let statusClass = 'duty';
    let statusLabel = isAr ? s.statusTextAr : s.statusTextEn;
    if (s.status === 'break') statusClass = 'break';
    else if (s.status === 'maint') statusClass = 'maint';

    const empCode = `EMP-2024-${s.id.replace('ST-', '')}`;
    const initials = s.name.split(' ').map(n => n[0]).slice(0, 2).join('');
    const salaryFormatted = formatMoney(s.salaryUSD || 750);
    const shiftLabel = isAr ? s.shiftNameAr : s.shiftNameEn;
    const isBreak = s.status === 'break';
    const toggleStatusTitle = isBreak 
      ? (isAr ? 'إنهاء الاستراحة والعودة لرأس العمل' : 'Resume duty') 
      : (isAr ? 'تسجيل خروج لاستراحة وجبة' : 'Send to break');

    html += `
      <div class="employee-card" id="empCard-${s.id}">
        <div class="employee-card-header">
          <div class="emp-avatar-box">
            ${initials}
            <span class="emp-status-dot ${statusClass}" title="${statusLabel}"></span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="table-badge badge-deposit" style="font-size:0.72rem;">${empCode}</span>
            <span class="table-badge ${s.status === 'duty' ? 'badge-paid' : 'badge-cancel'}" style="font-size:0.72rem;">${statusLabel}</span>
          </div>
        </div>

        <div class="emp-card-info">
          <h4 class="emp-card-name">${s.name}</h4>
          <p class="emp-card-role">${s.role} • <span style="color:#7C3AED;">${s.dept}</span></p>
        </div>

        <div class="emp-details-list">
          <div class="emp-detail-row">
            <span class="emp-detail-label">🕒 ${isAr ? 'المناوبة المخصصة:' : 'Shift:'}</span>
            <span class="emp-detail-val">${shiftLabel}</span>
          </div>
          <div class="emp-detail-row">
            <span class="emp-detail-label">💵 ${isAr ? 'الراتب الشهري:' : 'Salary:'}</span>
            <span class="emp-detail-val" style="color:#059669; font-weight:700;">${salaryFormatted} / ${isAr ? 'شهر' : 'mo'}</span>
          </div>
          <div class="emp-detail-row">
            <span class="emp-detail-label">📞 ${isAr ? 'الهاتف:' : 'Phone:'}</span>
            <span class="emp-detail-val" dir="ltr" style="font-size:0.78rem;">
              <a href="tel:${s.phone || '+9647701234567'}" style="color:inherit; text-decoration:none;">${s.phone || '+964 770 123 4567'}</a>
            </span>
          </div>
          <div class="emp-detail-row">
            <span class="emp-detail-label">📅 ${isAr ? 'تاريخ التعيين:' : 'Hire Date:'}</span>
            <span class="emp-detail-val">${s.hireDate || '2023-05-10'}</span>
          </div>
          <div class="emp-detail-row">
            <span class="emp-detail-label">📄 ${isAr ? 'نوع العقد:' : 'Contract:'}</span>
            <span class="emp-detail-val">${s.contractType || (isAr ? 'دوام كامل' : 'Full-Time')}</span>
          </div>
        </div>

        <div class="employee-card-actions">
          <button type="button" class="pill-button" onclick="openEmployeeProfileModal('${s.id}')" title="${isAr ? 'عرض الملف الشامل' : 'View full profile'}">
            ${isAr ? 'الملف الشخصي' : 'Profile'}
          </button>
          <button type="button" class="emp-action-icon-btn" onclick="openEditEmployeeModal('${s.id}')" title="${isAr ? 'تعديل البيانات' : 'Edit Staff'}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button type="button" class="emp-action-icon-btn warning" onclick="openBonusModal('${s.id}')" title="${isAr ? 'صرف مكافأة تقديرية' : 'Award Bonus'}" style="color:#D97706;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          </button>
          <button type="button" class="emp-action-icon-btn ${isBreak ? 'success' : ''}" onclick="openAttendanceModal('${s.id}')" title="${isAr ? 'حركة وسجل الدوام والمناوبات' : 'Log Attendance & Movement'}" style="color:${isBreak ? '#059669' : '#0284C7'};">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </button>
          <button type="button" class="emp-action-icon-btn danger" onclick="deleteEmployee('${s.id}')" title="${isAr ? 'إنهاء الخدمة / حذف' : 'Terminate / Delete'}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

function renderStaffManagementTable() {
  const tbody = document.getElementById('staffDirectoryTableBody');
  if (!tbody) return;

  const isAr = state.lang === 'ar';
  const activeDept = state.staffManagement.activeDept || 'all';
  const dutyFilter = state.staffManagement.activeDutyFilter || 'all';
  const query = (state.staffManagement.searchQuery || '').toLowerCase().trim();

  const filtered = state.staffList.filter(s => {
    const matchesDept = matchStaffDept(s.dept, activeDept);
    const matchesDuty = (dutyFilter === 'all') || (s.status === dutyFilter);
    const matchesQuery = !query ||
      (s.name && s.name.toLowerCase().includes(query)) ||
      (s.role && s.role.toLowerCase().includes(query)) ||
      (s.dept && s.dept.toLowerCase().includes(query)) ||
      (s.phone && s.phone.includes(query)) ||
      (s.id && s.id.toLowerCase().includes(query));
    return matchesDept && matchesDuty && matchesQuery;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding:32px; color:#64748B;">
          <div style="font-size:1.6rem; margin-bottom:6px;">👥</div>
          <div>${isAr ? 'لا توجد سجلات موظفين مطابقة' : 'No staff records found'}</div>
          <button type="button" class="pill-button" onclick="resetStaffManagementFilters()" style="margin-top:10px;">
            ${isAr ? 'عرض الكل' : 'Show All'}
          </button>
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  filtered.forEach(s => {
    const empCode = `EMP-2024-${s.id.replace('ST-', '')}`;
    const badgeClass = s.status === 'duty' ? 'badge-paid' : (s.status === 'break' ? 'badge-cancel' : 'badge-deposit');
    const salaryFormatted = formatMoney(s.salaryUSD || 750);
    const statusText = isAr ? s.statusTextAr : s.statusTextEn;
    const shiftText = isAr ? s.shiftNameAr : s.shiftNameEn;
    const isBreak = s.status === 'break';

    html += `
      <tr>
        <td><strong>${empCode}</strong></td>
        <td>
          <div style="font-weight:700; color:#1E293B;">${s.name}</div>
          <span style="font-size:0.75rem; color:#64748B;">${s.email || 'emp@grandstay.com'}</span>
        </td>
        <td>
          <div>${s.role}</div>
          <span class="table-badge badge-deposit" style="font-size:0.7rem;">${s.dept}</span>
        </td>
        <td>${shiftText}</td>
        <td><strong style="color:#059669;">${salaryFormatted}</strong></td>
        <td><span class="table-badge ${badgeClass}">${statusText}</span></td>
        <td>
          <div style="display:flex; align-items:center; gap:6px;">
            <button type="button" class="pill-button" onclick="openEmployeeProfileModal('${s.id}')" title="${isAr ? 'الملف' : 'Profile'}">${isAr ? 'ملف' : 'Profile'}</button>
            <button type="button" class="emp-action-icon-btn" onclick="openEditEmployeeModal('${s.id}')" title="${isAr ? 'تعديل' : 'Edit'}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button type="button" class="emp-action-icon-btn warning" onclick="openBonusModal('${s.id}')" title="${isAr ? 'مكافأة' : 'Bonus'}" style="color:#D97706;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
            </button>
            <button type="button" class="emp-action-icon-btn ${isBreak ? 'success' : ''}" onclick="openAttendanceModal('${s.id}')" title="${isAr ? 'سجل وحركة الدوام (حضور / انصراف / استراحة / مناوبة)' : 'Log Attendance & Shift'}" style="color:${isBreak ? '#059669' : '#0284C7'};">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </button>
            <button type="button" class="emp-action-icon-btn danger" onclick="deleteEmployee('${s.id}')" title="${isAr ? 'حذف' : 'Delete'}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function filterStaffDepartment(dept, btnEl) {
  state.staffManagement.activeDept = dept;
  state.staffManagement.activeDutyFilter = 'all';

  document.querySelectorAll('#staffDeptFilters .staff-dept-btn').forEach(btn => btn.classList.remove('active'));
  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const idMap = {
      'all': 'deptFilterAll',
      'قسم الاستقبال': 'deptFilterReception',
      'التدبير الفندقي': 'deptFilterHousekeeping',
      'قسم الصيانة': 'deptFilterMaint',
      'إدارة': 'deptFilterManagement'
    };
    const targetId = idMap[dept] || 'deptFilterAll';
    const targetBtn = document.getElementById(targetId);
    if (targetBtn) targetBtn.classList.add('active');
  }

  renderStaffManagementCards();
  renderStaffManagementTable();
  renderStaffDeptFilterButtons();

  if (dept !== 'all') {
    showToast(state.lang === 'ar' ? `تصفية الكادر: ${dept}` : `Filtered by: ${dept}`);
  }
}

function filterStaffByDutyStatus(status) {
  state.staffManagement.activeDutyFilter = status;
  document.querySelectorAll('#staffDeptFilters .staff-dept-btn').forEach(btn => btn.classList.remove('active'));
  const btnAll = document.getElementById('deptFilterAll');
  if (btnAll) btnAll.classList.add('active');

  renderStaffManagementCards();
  renderStaffManagementTable();
  renderStaffDeptFilterButtons();

  showToast(state.lang === 'ar' ? 'تمت تصفية العرض: الموظفون المتواجدون على رأس العمل حالياً' : 'Filtered to on-duty staff');
}

function resetStaffManagementFilters() {
  state.staffManagement.activeDept = 'all';
  state.staffManagement.activeDutyFilter = 'all';
  state.staffManagement.searchQuery = '';

  const searchInp = document.getElementById('staffDirSearchInput');
  if (searchInp) searchInp.value = '';

  document.querySelectorAll('#staffDeptFilters .staff-dept-btn').forEach(btn => btn.classList.remove('active'));
  const btnAll = document.getElementById('deptFilterAll');
  if (btnAll) btnAll.classList.add('active');

  renderStaffManagementCards();
  renderStaffManagementTable();
  updateStaffManagementKPIs();

  showToast(state.lang === 'ar' ? 'تم إلغاء التصفية وإعادة عرض كافة موظفي الفندق' : 'Filters cleared - showing all staff');
}

function clearStaffSearch() {
  const searchInp = document.getElementById('staffDirSearchInput');
  if (searchInp) searchInp.value = '';
  searchStaffDirectory('');
}

function searchStaffDirectory(val) {
  state.staffManagement.searchQuery = val;
  renderStaffManagementCards();
  renderStaffManagementTable();
  renderStaffDeptFilterButtons();
}

function toggleStaffViewMode() {
  const cardsGrid = document.getElementById('staffCardsGrid');
  const tableView = document.getElementById('staffTableViewCard');
  const modeText = document.getElementById('staffViewModeText');

  if (state.staffManagement.viewMode === 'cards') {
    state.staffManagement.viewMode = 'table';
    if (cardsGrid) cardsGrid.style.display = 'none';
    if (tableView) tableView.style.display = 'block';
    if (modeText) modeText.innerText = state.lang === 'ar' ? '⊞ عرض البطاقات' : '⊞ Cards View';
    renderStaffManagementTable();
  } else {
    state.staffManagement.viewMode = 'cards';
    if (cardsGrid) cardsGrid.style.display = 'grid';
    if (tableView) tableView.style.display = 'none';
    if (modeText) modeText.innerText = state.lang === 'ar' ? '☰ جدول تفصيلي' : '☰ Table View';
    renderStaffManagementCards();
  }
}

function toggleEmployeeDutyStatus(staffId) {
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  const isBreak = staff.status === 'break';
  if (isBreak) {
    staff.status = 'duty';
    staff.statusTextAr = 'على رأس العمل';
    staff.statusTextEn = 'On Duty';
    showToast(state.lang === 'ar' ? `تم استئناف دوام الموظف (${staff.name}) وعودته للخدمة النشطة` : `${staff.name} resumed duty`);
    addNotification(
      `استئناف دوام - ${staff.name}`,
      `Duty Resumed - ${staff.name}`,
      `أنهى الموظف الاستراحة واستأنف مهامه في قسم (${staff.dept})`,
      `Staff member resumed active duty in ${staff.dept}`,
      'staff',
      'إدارة الموظفين',
      'Staff Management'
    );
  } else {
    staff.status = 'break';
    staff.statusTextAr = 'استراحة وجبة';
    staff.statusTextEn = 'Meal Break';
    showToast(state.lang === 'ar' ? `تم تسجيل خروج الموظف (${staff.name}) للاستراحة المؤقتة` : `${staff.name} went on break`);
    addNotification(
      `خروج للاستراحة - ${staff.name}`,
      `Break Started - ${staff.name}`,
      `سجل الموظف خروج استراحة مؤقتة مع اعتماد التغطية`,
      `Staff member recorded a temporary meal break`,
      'staff',
      'إدارة الموظفين',
      'Staff Management'
    );
  }

  renderStaffManagementCards();
  renderStaffManagementTable();
  renderStaffTable();
  updateStaffManagementKPIs();

  // If profile modal is open for this employee, update it live
  if (state.currentStaffProfileId === staffId) {
    openEmployeeProfileModal(staffId);
  }
}

function openEmployeeProfileModal(staffId) {
  const staff = state.staffList.find(s => s.id === staffId) || state.staffList[0];
  if (!staff) return;

  state.currentStaffProfileId = staff.id;
  const isAr = state.lang === 'ar';

  const nameEl = document.getElementById('empModalName');
  const roleEl = document.getElementById('empModalRole');
  const deptBadge = document.getElementById('empModalDeptBadge');
  const idEl = document.getElementById('empModalId');
  const shiftEl = document.getElementById('empModalShift');
  const statusBadge = document.getElementById('empModalStatusBadge');
  const checkInEl = document.getElementById('empModalCheckInTime');
  const salaryEl = document.getElementById('empModalSalary');
  const phoneLink = document.getElementById('empModalPhoneLink');
  const emailEl = document.getElementById('empModalEmail');
  const contractEl = document.getElementById('empModalContract');
  const ratingEl = document.getElementById('empModalRating');
  const bonusesEl = document.getElementById('empModalBonuses');
  const avatarEl = document.getElementById('empModalAvatar');
  const toggleBtnText = document.getElementById('btnToggleDutyText');

  const initials = staff.name.split(' ').map(n => n[0]).slice(0, 2).join('');

  if (avatarEl) {
    avatarEl.innerHTML = `${initials}<span class="emp-status-dot ${staff.status === 'break' ? 'break' : 'duty'}" id="empModalStatusDot"></span>`;
  }
  if (nameEl) nameEl.innerText = staff.name;
  if (roleEl) roleEl.innerText = `${staff.role} • ${staff.dept}`;
  if (deptBadge) deptBadge.innerText = staff.dept;
  if (idEl) idEl.innerText = `EMP-2024-${staff.id.replace('ST-', '')}`;
  if (shiftEl) shiftEl.innerText = `${staff.shiftNameAr || 'مناوبة الصباح'}`;

  const isBreak = staff.status === 'break';
  if (statusBadge) {
    statusBadge.innerText = isAr ? staff.statusTextAr : staff.statusTextEn;
    statusBadge.className = `table-badge ${isBreak ? 'badge-cancel' : 'badge-paid'}`;
  }
  if (checkInEl) {
    checkInEl.innerText = `${isAr ? 'تسجيل الدخول:' : 'Check-in:'} ${staff.checkInTime || '08:00 ص'}`;
  }
  if (salaryEl) {
    salaryEl.innerText = `${formatMoney(staff.salaryUSD || 750)} / ${isAr ? 'شهر' : 'mo'}`;
  }
  if (phoneLink) {
    phoneLink.innerText = staff.phone || '+964 770 123 4567';
    phoneLink.href = `tel:${staff.phone || '+9647701234567'}`;
  }
  if (emailEl) {
    emailEl.innerText = staff.email || `${staff.name.toLowerCase().replace(/\s+/g, '.')}@grandstay.com`;
  }
  if (contractEl) {
    contractEl.innerText = `${staff.contractType || (isAr ? 'دوام كامل' : 'Full-Time')} • ${isAr ? 'تاريخ التعيين' : 'Since'} ${staff.hireDate || '2023-05-10'}`;
  }
  if (ratingEl) {
    ratingEl.innerText = '99.2% (ممتاز - 0 غياب)';
  }

  const bonusSum = (staff.bonuses && staff.bonuses.length > 0)
    ? staff.bonuses.reduce((acc, b) => acc + (b.amount || 0), 0)
    : (staff.bonusUSD || 0);
  const bonusCount = (staff.bonuses && staff.bonuses.length > 0) ? staff.bonuses.length : (bonusSum > 0 ? 1 : 0);

  if (bonusesEl) {
    bonusesEl.innerText = `${formatMoney(bonusSum)} (${bonusCount} ${isAr ? 'مكافآت' : 'bonuses'})`;
  }

  if (toggleBtnText) {
    toggleBtnText.innerText = isBreak
      ? (isAr ? 'استئناف الدوام الفعلي' : 'Resume Duty')
      : (isAr ? 'تسجيل استراحة مؤقتة' : 'Set to Break');
  }

  openModal('employeeProfileModal');
}

function openEditFromProfile() {
  const staffId = state.currentStaffProfileId;
  closeModal('employeeProfileModal');
  if (staffId) openEditEmployeeModal(staffId);
}

function openBonusFromProfile() {
  const staffId = state.currentStaffProfileId;
  closeModal('employeeProfileModal');
  if (staffId) openBonusModal(staffId);
}

function toggleDutyStatusFromProfile() {
  if (state.currentStaffProfileId) {
    toggleEmployeeDutyStatus(state.currentStaffProfileId);
  }
}

function sendDirectInstructionFromProfile() {
  const staffId = state.currentStaffProfileId;
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  const defaultMsg = state.lang === 'ar'
    ? 'يرجى مراجعة إدارة العمليات بخصوص جدول الأسبوع القادم'
    : 'Please check with Operations regarding next week schedule';
  const instruction = prompt(state.lang === 'ar'
    ? `أدخل التوجيه أو الإشعار المباشر للموظف (${staff.name}):`
    : `Enter direct instruction for (${staff.name}):`, defaultMsg);

  if (!instruction || !instruction.trim()) return;

  closeModal('employeeProfileModal');
  showToast(state.lang === 'ar'
    ? `تم إرسال التوجيه الإداري إلى (${staff.name}) بنجاح!`
    : `Direct instruction sent to (${staff.name}) successfully!`);

  addNotification(
    `توجيه إداري مباشر - ${staff.name}`,
    `Direct Instruction - ${staff.name}`,
    `نص التوجيه: "${instruction.trim()}"`,
    `Directive text: "${instruction.trim()}"`,
    'staff',
    'إدارة الموظفين',
    'Staff Management'
  );
}

function deleteEmployeeFromProfile() {
  const staffId = state.currentStaffProfileId;
  if (!staffId) return;
  closeModal('employeeProfileModal');
  deleteEmployee(staffId);
}

function printActiveEmployeeCard() {
  if (state.currentStaffProfileId) {
    printEmployeeCard(state.currentStaffProfileId);
  }
}

function printEmployeeCard(staffId) {
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;
  const isAr = state.lang === 'ar';
  const empCode = `EMP-2024-${staff.id.replace('ST-', '')}`;
  const customCss = `
    body { background: #F1F5F9; padding: 30px; display: flex; justify-content: center; align-items: center; }
    .id-card { width: 340px; background: white; border-radius: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.12); overflow: hidden; border: 1px solid #E2E8F0; text-align: center; }
    .card-header { background: linear-gradient(135deg, #7C3AED, #4F46E5); color: white; padding: 22px 16px; }
    .card-header h2 { margin: 0; font-size: 1.15rem; font-weight: 800; }
    .card-header p { margin: 4px 0 0; font-size: 0.75rem; opacity: 0.9; }
    .avatar-wrap { width: 84px; height: 84px; border-radius: 50%; background: #F8FAFC; border: 4px solid white; margin: -42px auto 12px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; color: #7C3AED; box-shadow: 0 4px 14px rgba(0,0,0,0.1); }
    .body-wrap { padding: 0 20px 22px; }
    .name { font-size: 1.25rem; font-weight: 800; color: #1E293B; margin: 0 0 4px; }
    .role { font-size: 0.85rem; color: #7C3AED; font-weight: 700; margin: 0 0 16px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #F8FAFC; padding: 12px; border-radius: 12px; text-align: ${isAr ? 'right' : 'left'}; font-size: 0.78rem; border: 1px solid #E2E8F0; }
    .info-item span { display: block; color: #64748B; font-size: 0.7rem; }
    .info-item strong { color: #1E293B; }
    .barcode { margin-top: 18px; font-family: monospace; letter-spacing: 4px; font-size: 1.2rem; color: #334155; padding: 6px; background: #F1F5F9; border-radius: 6px; }
    .footer { font-size: 0.68rem; color: #94A3B8; margin-top: 12px; }
  `;
  const content = `
    <div class="id-card">
      <div class="card-header">
        <h2>GRAND STAY HOTEL & SUITES</h2>
        <p>${isAr ? 'بطاقة الهوية والاعتماد الوظيفي الرسمية' : 'Official Staff Identification Card'}</p>
      </div>
      <div class="avatar-wrap">${staff.name.slice(0, 2)}</div>
      <div class="body-wrap">
        <div class="name">${staff.name}</div>
        <div class="role">${staff.role}</div>
        <div class="info-grid">
          <div class="info-item"><span>${isAr ? 'الرقم الوظيفي:' : 'ID:'}</span><strong>${empCode}</strong></div>
          <div class="info-item"><span>${isAr ? 'القسم:' : 'Dept:'}</span><strong>${staff.dept}</strong></div>
          <div class="info-item"><span>${isAr ? 'المناوبة:' : 'Shift:'}</span><strong>${staff.shiftNameAr}</strong></div>
          <div class="info-item"><span>${isAr ? 'سريان الهوية:' : 'Valid:'}</span><strong>2026 - 2027</strong></div>
        </div>
        <div class="barcode">||| | | |||| | ||||| | |||</div>
        <div class="footer">${isAr ? 'هذه البطاقة وثيقة رسمية صادرة عن إدارة الموارد البشرية' : 'Official document issued by HR Department'}</div>
      </div>
    </div>
  `;
  openPrintWindow(`${isAr ? 'بطاقة هوية موظف' : 'Staff ID Card'} - ${staff.name}`, content, customCss, 600, 700);
}

function printStaffDirectory() {
  const isAr = state.lang === 'ar';
  const rows = state.staffList.map((s, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>EMP-2024-${s.id.replace('ST-', '')}</strong></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.role}</td>
      <td>${s.dept}</td>
      <td>${s.shiftNameAr}</td>
      <td>${formatMoney(s.salaryUSD || 750)}</td>
      <td dir="ltr">${s.phone || ''}</td>
      <td>${s.contractType || 'دوام كامل'}</td>
      <td>${s.statusTextAr}</td>
    </tr>
  `).join('');

  const content = `
    <div class="header">
      <div>
        <h1>GRAND STAY HOTEL & SUITES</h1>
        <div class="meta">${isAr ? 'دليل الكادر الفندقي المعتمد والشامل' : 'Official Staff Directory & Operational Deployment'}</div>
      </div>
      <div class="meta" style="text-align: ${isAr ? 'left' : 'right'};">
        <div>${isAr ? 'تاريخ التقرير:' : 'Date:'} ${new Date().toLocaleDateString('ar-EG')}</div>
        <div>${isAr ? 'إجمالي الكادر:' : 'Total Staff:'} ${state.staffList.length} ${isAr ? 'موظفاً' : 'employees'}</div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th><th>${isAr ? 'كود الموظف' : 'ID'}</th><th>${isAr ? 'الاسم الكامل' : 'Name'}</th><th>${isAr ? 'المسمى الوظيفي' : 'Role'}</th><th>${isAr ? 'القسم' : 'Dept'}</th><th>${isAr ? 'المناوبة' : 'Shift'}</th><th>${isAr ? 'الراتب' : 'Salary'}</th><th>${isAr ? 'رقم الهاتف' : 'Phone'}</th><th>${isAr ? 'نوع العقد' : 'Contract'}</th><th>${isAr ? 'الحالة' : 'Status'}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="summary">
      <div>${isAr ? 'اعتماد إدارة الموارد البشرية والعمليات الفندقية' : 'HR & Operations Management Approval'}</div>
      <div>${isAr ? 'الختم الإداري: [ معتمد رسمياً ✓ ]' : 'Official Seal: Approved ✓'}</div>
    </div>
  `;
  openPrintWindow(isAr ? 'كشف دليل الموظفين والكادر الفندقي - Grand Stay' : 'Hotel Staff Directory - Grand Stay', content);
}

function openAddEmployeeModal() {
  const nameInp = document.getElementById('addEmpName');
  const roleInp = document.getElementById('addEmpRole');
  const phoneInp = document.getElementById('addEmpPhone');
  const emailInp = document.getElementById('addEmpEmail');
  const salaryInp = document.getElementById('addEmpSalary');

  if (nameInp) nameInp.value = '';
  if (roleInp) roleInp.value = '';
  if (phoneInp) phoneInp.value = '';
  if (emailInp) emailInp.value = '';
  if (salaryInp) salaryInp.value = '750';

  openModal('addEmployeeModal');
}

function saveNewEmployee(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('addEmpName').value.trim();
  const role = document.getElementById('addEmpRole').value.trim();
  const dept = document.getElementById('addEmpDept').value;
  const shift = document.getElementById('addEmpShift').value;
  const salary = parseFloat(document.getElementById('addEmpSalary').value) || 750;
  const phone = document.getElementById('addEmpPhone').value.trim();
  const email = document.getElementById('addEmpEmail').value.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@grandstay.com`;
  const contract = document.getElementById('addEmpContract').value;

  if (!name || !role) {
    showToast(state.lang === 'ar' ? 'يرجى إدخال اسم الموظف والمسمى الوظيفي' : 'Please provide staff name and role');
    return;
  }

  // Calculate highest numeric ID to prevent collisions
  let maxNum = 0;
  state.staffList.forEach(s => {
    const num = parseInt(s.id.replace('ST-', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  const newId = `ST-${String(maxNum + 1).padStart(2, '0')}`;
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  let shiftNameAr = 'مناوبة الصباح';
  let shiftNameEn = 'Morning Shift';
  if (shift === 'evening') { shiftNameAr = 'مناوبة المساء'; shiftNameEn = 'Evening Shift'; }
  else if (shift === 'night') { shiftNameAr = 'مناوبة الليل'; shiftNameEn = 'Night Audit'; }
  else if (shift === 'management') { shiftNameAr = 'إدارة عامة'; shiftNameEn = 'Management'; }

  const newStaffObj = {
    id: newId,
    name: name,
    role: role,
    dept: dept,
    shift: shift,
    shiftNameAr: shiftNameAr,
    shiftNameEn: shiftNameEn,
    checkInTime: '08:00 ص',
    status: 'duty',
    statusTextAr: 'على رأس العمل',
    statusTextEn: 'On Duty',
    salaryUSD: salary,
    phone: phone,
    email: email,
    hireDate: todayStr,
    contractType: contract,
    bonusUSD: 0,
    bonuses: []
  };

  state.staffList.unshift(newStaffObj);

  closeModal('addEmployeeModal');
  populateAttendanceEmployeeSelect();
  renderStaffManagementCards();
  renderStaffManagementTable();
  renderStaffTable();
  updateStaffManagementKPIs();

  showToast(state.lang === 'ar' ? `تم اعتماد تعيين الموظف (${name}) وإضافته للكادر الفندقي بنجاح!` : `Employee (${name}) hired and added successfully!`);

  addNotification(
    `تعيين موظف جديد - ${name}`,
    `New Staff Hired - ${name}`,
    `تم تسجيل الموظف في قسم (${dept}) بمسمى (${role}) وراتب ${formatMoney(salary)}`,
    `Employee enrolled in ${dept} as ${role} with salary ${formatMoney(salary)}`,
    'staff',
    'إدارة الموظفين',
    'Staff Management'
  );
}

function openEditEmployeeModal(staffId) {
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  const idInp = document.getElementById('editEmpId');
  const nameInp = document.getElementById('editEmpName');
  const roleInp = document.getElementById('editEmpRole');
  const deptInp = document.getElementById('editEmpDept');
  const shiftInp = document.getElementById('editEmpShift');
  const salaryInp = document.getElementById('editEmpSalary');
  const phoneInp = document.getElementById('editEmpPhone');
  const emailInp = document.getElementById('editEmpEmail');
  const contractInp = document.getElementById('editEmpContract');
  const statusInp = document.getElementById('editEmpStatus');

  if (idInp) idInp.value = staff.id;
  if (nameInp) nameInp.value = staff.name;
  if (roleInp) roleInp.value = staff.role;
  if (deptInp) deptInp.value = staff.dept;
  if (shiftInp) shiftInp.value = staff.shift || 'morning';
  if (salaryInp) salaryInp.value = staff.salaryUSD || 750;
  if (phoneInp) phoneInp.value = staff.phone || '+964 770 123 4567';
  if (emailInp) emailInp.value = staff.email || `${staff.name.toLowerCase().replace(/\s+/g, '.')}@grandstay.com`;
  if (contractInp) contractInp.value = staff.contractType || 'دوام كامل';
  if (statusInp) statusInp.value = staff.status || 'duty';

  openModal('editEmployeeModal');
}

function saveEditedEmployee(e) {
  if (e) e.preventDefault();
  const staffId = document.getElementById('editEmpId').value;
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  const name = document.getElementById('editEmpName').value.trim();
  const role = document.getElementById('editEmpRole').value.trim();
  const dept = document.getElementById('editEmpDept').value;
  const shift = document.getElementById('editEmpShift').value;
  const salary = parseFloat(document.getElementById('editEmpSalary').value) || 750;
  const phone = document.getElementById('editEmpPhone').value.trim();
  const email = document.getElementById('editEmpEmail') ? document.getElementById('editEmpEmail').value.trim() : staff.email;
  const contract = document.getElementById('editEmpContract') ? document.getElementById('editEmpContract').value : staff.contractType;
  const status = document.getElementById('editEmpStatus') ? document.getElementById('editEmpStatus').value : staff.status;

  staff.name = name;
  staff.role = role;
  staff.dept = dept;
  staff.shift = shift;
  staff.salaryUSD = salary;
  staff.phone = phone;
  staff.email = email;
  staff.contractType = contract;
  staff.status = status;

  if (status === 'duty') {
    staff.statusTextAr = 'على رأس العمل';
    staff.statusTextEn = 'On Duty';
  } else if (status === 'break') {
    staff.statusTextAr = 'استراحة وجبة';
    staff.statusTextEn = 'Meal Break';
  } else {
    staff.statusTextAr = 'مهمة صيانة';
    staff.statusTextEn = 'Maintenance Task';
  }

  if (staff.shift === 'morning') { staff.shiftNameAr = 'مناوبة الصباح'; staff.shiftNameEn = 'Morning Shift'; }
  else if (staff.shift === 'evening') { staff.shiftNameAr = 'مناوبة المساء'; staff.shiftNameEn = 'Evening Shift'; }
  else if (staff.shift === 'night') { staff.shiftNameAr = 'مناوبة الليل'; staff.shiftNameEn = 'Night Audit'; }
  else { staff.shiftNameAr = 'إدارة عامة'; staff.shiftNameEn = 'Management'; }

  closeModal('editEmployeeModal');
  populateAttendanceEmployeeSelect();
  renderStaffManagementCards();
  renderStaffManagementTable();
  renderStaffTable();
  updateStaffManagementKPIs();

  showToast(state.lang === 'ar' ? `تم تحديث وحفظ بيانات الموظف (${staff.name}) بنجاح` : `Staff (${staff.name}) profile updated successfully`);

  addNotification(
    `تعديل ملف موظف - ${staff.name}`,
    `Staff Profile Updated - ${staff.name}`,
    `تم تعديل المسمى إلى (${role}) في قسم (${dept})`,
    `Role updated to ${role} in ${dept}`,
    'staff',
    'إدارة الموظفين',
    'Staff Management'
  );
}

function openBonusModal(staffId) {
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  const idInp = document.getElementById('bonusEmpId');
  const nameInp = document.getElementById('bonusEmpName');
  const amountInp = document.getElementById('bonusAmount');

  if (idInp) idInp.value = staff.id;
  if (nameInp) nameInp.value = `${staff.name} (${staff.role})`;
  if (amountInp) amountInp.value = '100';

  openModal('bonusModal');
}

function confirmEmployeeBonus(e) {
  if (e) e.preventDefault();
  const staffId = document.getElementById('bonusEmpId').value;
  const staff = state.staffList.find(s => s.id === staffId);
  const amount = parseFloat(document.getElementById('bonusAmount').value) || 100;
  const reason = document.getElementById('bonusReason') ? document.getElementById('bonusReason').value : 'جهود متميزة في خدمة الضيوف';
  const type = document.getElementById('bonusType') ? document.getElementById('bonusType').value : 'انضباط وتميز';

  if (staff) {
    staff.bonuses = staff.bonuses || [];
    staff.bonuses.push({
      date: new Date().toISOString().split('T')[0],
      amount: amount,
      type: type,
      reason: reason
    });
    staff.bonusUSD = (staff.bonusUSD || 0) + amount;
  }

  closeModal('bonusModal');
  updateStaffManagementKPIs();
  renderStaffManagementCards();
  renderStaffManagementTable();

  // If payroll modal is open, refresh it
  const payrollModal = document.getElementById('payrollModal');
  if (payrollModal && payrollModal.classList.contains('active')) {
    openPayrollModal();
  }

  showToast(state.lang === 'ar' 
    ? `تم اعتماد وصرف مكافأة بقيمة ${formatMoney(amount)} للموظف (${staff ? staff.name : ''})` 
    : `Bonus of ${formatMoney(amount)} approved for (${staff ? staff.name : ''})!`);

  if (staff) {
    addNotification(
      `صرف مكافأة تقديرية - ${staff.name}`,
      `Bonus Awarded - ${staff.name}`,
      `تم اعتماد مكافأة بقيمة ${formatMoney(amount)}: ${reason}`,
      `Bonus of ${formatMoney(amount)} awarded for: ${reason}`,
      'staff',
      'إدارة الموظفين',
      'Staff Management'
    );
  }
}

function deleteEmployee(staffId) {
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  const isConfirmed = confirm(state.lang === 'ar'
    ? `هل أنت متأكد تماماً من إنهاء خدمة الموظف (${staff.name}) وحذفه من الكادر الفندقي؟`
    : `Are you sure you want to terminate/remove staff member (${staff.name})?`);

  if (!isConfirmed) return;

  state.staffList = state.staffList.filter(s => s.id !== staffId);

  populateAttendanceEmployeeSelect();
  renderStaffManagementCards();
  renderStaffManagementTable();
  renderStaffTable();
  updateStaffManagementKPIs();

  showToast(state.lang === 'ar' ? `تم إنهاء خدمة الموظف (${staff.name}) وحذفه من السجلات` : `Staff member (${staff.name}) removed`);

  addNotification(
    `إنهاء خدمة موظف - ${staff.name}`,
    `Staff Terminated - ${staff.name}`,
    `تم إنهاء خدمة الموظف وأرشفة ملفه الإداري رسمياً`,
    `Staff member file archived upon termination`,
    'staff',
    'إدارة الموظفين',
    'Staff Management'
  );
}

function openPayrollModal() {
  const tbody = document.getElementById('payrollTableBody');
  if (!tbody) return;

  const isAr = state.lang === 'ar';
  let baseSum = 0;
  let bonusSum = 0;
  let html = '';
  const isEditMode = state.staffManagement && state.staffManagement.payrollEditMode === true;

  state.staffList.forEach((s, idx) => {
    const base = s.salaryUSD || 750;
    // Calculate total bonuses for employee
    const staffBonusTotal = (s.bonuses && s.bonuses.length > 0)
      ? s.bonuses.reduce((acc, b) => acc + (b.amount || 0), 0)
      : ((idx % 2 === 0) ? 60 : 40);

    const net = base + staffBonusTotal;
    baseSum += base;
    bonusSum += staffBonusTotal;

    const isPaid = s.salaryPaid === true;
    const badgeText = isPaid
      ? (isAr ? 'تم الصرف ✓' : 'Disbursed ✓')
      : (isAr ? 'جاهز للصرف ✓' : 'Payable ✓');
    const badgeClass = isPaid ? 'badge-paid' : 'badge-deposit';

    let salaryCellHtml = '';
    if (isEditMode) {
      salaryCellHtml = `
        <div style="display:flex; align-items:center; gap:4px;">
          <input type="number" class="payroll-inline-input" value="${base}" min="100" step="10" 
            onchange="updateSalaryDirect('${s.id}', this.value)" 
            title="${isAr ? 'عدّل القيمة واضغط Enter أو انقر خارج الحقل للحفظ' : 'Change and press Enter to save'}">
          <button type="button" class="emp-action-icon-btn" onclick="openSalaryAdjustModal('${s.id}')" title="${isAr ? 'تعديل تفصيلي للراتب والبدلات' : 'Detailed Adjustment'}" style="width:26px; height:26px; font-size:0.75rem; color:#7C3AED;">
            ⚙️
          </button>
        </div>
      `;
    } else {
      salaryCellHtml = `
        <div class="payroll-salary-badge-btn" onclick="openSalaryAdjustModal('${s.id}')" title="${isAr ? `انقر لتعديل راتب الموظف (${s.name})` : `Click to edit ${s.name}'s salary`}">
          <span>${formatMoney(base)}</span>
          <span style="font-size:0.75rem; color:#7C3AED;">✏️</span>
        </div>
      `;
    }

    html += `
      <tr>
        <td>
          <div style="font-weight:700; color:#1E293B;">${s.name}</div>
          <span style="font-size:0.75rem; color:#64748B;">EMP-2024-${s.id.replace('ST-', '')}</span>
        </td>
        <td><span class="table-badge badge-deposit" style="font-size:0.7rem;">${s.dept}</span></td>
        <td>${salaryCellHtml}</td>
        <td style="color:#059669; font-weight:700;">+${formatMoney(staffBonusTotal)}</td>
        <td><strong style="color:#1E40AF; font-size:0.95rem;">${formatMoney(net)}</strong></td>
        <td><span class="table-badge ${badgeClass}" id="payrollBadge-${s.id}">${badgeText}</span></td>
        <td>
          <div style="display:flex; align-items:center; gap:6px;">
            <button type="button" class="emp-action-icon-btn" onclick="openSalaryAdjustModal('${s.id}')" title="${isAr ? 'تعديل الراتب والمستحقات' : 'Adjust Salary'}" style="color:#7C3AED;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </button>
            <button type="button" class="pill-button" onclick="disburseIndividualSalary('${s.id}')" title="${isAr ? 'صرف المستحقات' : 'Disburse'}" style="${isPaid ? 'opacity:0.6;' : ''}">
              ${isPaid ? (isAr ? 'تم الصرف' : 'Paid') : (isAr ? 'صرف فردي' : 'Pay')}
            </button>
            <button type="button" class="emp-action-icon-btn warning" onclick="openBonusModal('${s.id}')" title="${isAr ? 'إضافة مكافأة' : 'Add bonus'}" style="color:#D97706;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
            </button>
            <button type="button" class="emp-action-icon-btn" onclick="printEmployeePayslip('${s.id}')" title="${isAr ? 'إيصال الراتب' : 'Payslip'}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;

  const baseEl = document.getElementById('payrollBaseTotal');
  if (baseEl) baseEl.innerText = formatMoney(baseSum);

  const bonusEl = document.getElementById('payrollBonusTotal');
  if (bonusEl) bonusEl.innerText = `+${formatMoney(bonusSum)}`;

  const netEl = document.getElementById('payrollNetTotal');
  if (netEl) netEl.innerText = formatMoney(baseSum + bonusSum);

  // Update batch edit toggle button state in header
  const btnText = document.getElementById('payrollEditBtnText');
  const btn = document.getElementById('btnTogglePayrollEditMode');
  if (btnText) {
    btnText.innerText = isEditMode
      ? (isAr ? '✓ حفظ وإنهاء التعديل' : '✓ Done Editing')
      : (isAr ? '✏️ تعديل الرواتب' : '✏️ Edit Salaries');
  }
  if (btn) {
    if (isEditMode) {
      btn.style.background = '#7C3AED';
      btn.style.color = '#FFFFFF';
    } else {
      btn.style.background = '';
      btn.style.color = '#7C3AED';
    }
  }

  openModal('payrollModal');
}

function togglePayrollSalaryEditMode() {
  state.staffManagement.payrollEditMode = !state.staffManagement.payrollEditMode;
  const isAr = state.lang === 'ar';

  if (state.staffManagement.payrollEditMode) {
    showToast(isAr ? 'تم تفعيل وضع تعديل الرواتب السريع: يمكنك تعديل قيم الرواتب مباشرة في الجدول!' : 'Inline salary editing mode active');
  } else {
    showToast(isAr ? 'تم حفظ التعديلات وإغلاق وضع التعديل السريع' : 'Salary edits saved successfully');
  }

  openPayrollModal();
}

function updateSalaryDirect(staffId, newSalaryVal) {
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  const val = parseFloat(newSalaryVal);
  if (isNaN(val) || val <= 0) {
    showToast(state.lang === 'ar' ? 'يرجى إدخال قيمة راتب صالحة' : 'Please enter a valid salary amount');
    return;
  }

  staff.salaryUSD = val;
  updateStaffManagementKPIs();
  renderStaffManagementCards();
  renderStaffManagementTable();
  renderStaffTable();

  // Re-calculate totals without closing the modal
  openPayrollModal();

  showToast(state.lang === 'ar' 
    ? `تم تحديث الراتب الأساسي للموظف (${staff.name}) إلى ${formatMoney(val)} بنجاح!` 
    : `Updated salary for (${staff.name}) to ${formatMoney(val)}`);

  addNotification(
    `تعديل راتب موظف - ${staff.name}`,
    `Salary Adjusted - ${staff.name}`,
    `تم تعديل الراتب الأساسي إلى ${formatMoney(val)} في مسير ديسمبر`,
    `Base salary updated to ${formatMoney(val)} in December payroll`,
    'staff',
    'إدارة الرواتب',
    'Payroll'
  );
}

function openSalaryAdjustModal(staffId) {
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  const idInp = document.getElementById('salAdjEmpId');
  const nameEl = document.getElementById('salAdjEmpName');
  const roleEl = document.getElementById('salAdjEmpRole');
  const codeEl = document.getElementById('salAdjEmpCode');
  const deptBadge = document.getElementById('salAdjDeptBadge');
  const salaryInp = document.getElementById('salAdjBaseSalary');
  const bonusInp = document.getElementById('salAdjBonus');

  if (idInp) idInp.value = staff.id;
  if (nameEl) nameEl.innerText = staff.name;
  if (roleEl) roleEl.innerText = staff.role;
  if (codeEl) codeEl.innerText = `EMP-2024-${staff.id.replace('ST-', '')}`;
  if (deptBadge) deptBadge.innerText = staff.dept;
  if (salaryInp) salaryInp.value = staff.salaryUSD || 750;

  const currentBonusTotal = (staff.bonuses && staff.bonuses.length > 0)
    ? staff.bonuses.reduce((acc, b) => acc + (b.amount || 0), 0)
    : (staff.bonusUSD || 50);

  if (bonusInp) bonusInp.value = currentBonusTotal;

  updateSalaryAdjustPreview();
  openModal('salaryAdjustModal');
}

function updateSalaryAdjustPreview() {
  const baseInp = document.getElementById('salAdjBaseSalary');
  const bonusInp = document.getElementById('salAdjBonus');
  const previewEl = document.getElementById('salAdjNetPreview');

  const base = parseFloat(baseInp ? baseInp.value : 0) || 0;
  const bonus = parseFloat(bonusInp ? bonusInp.value : 0) || 0;
  const net = base + bonus;

  if (previewEl) {
    previewEl.innerText = formatMoney(net);
  }
}

function saveSalaryAdjustment(e) {
  if (e) e.preventDefault();
  const staffId = document.getElementById('salAdjEmpId').value;
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  const baseSalary = parseFloat(document.getElementById('salAdjBaseSalary').value) || staff.salaryUSD;
  const bonusVal = parseFloat(document.getElementById('salAdjBonus').value) || 0;
  const reason = document.getElementById('salAdjReason') ? document.getElementById('salAdjReason').value : 'تعديل سنوي دوري';

  staff.salaryUSD = baseSalary;

  if (bonusVal >= 0) {
    staff.bonuses = [{
      amount: bonusVal,
      type: reason,
      reason: reason,
      date: new Date().toISOString().split('T')[0]
    }];
  }

  closeModal('salaryAdjustModal');

  // Sync all parts of the application
  openPayrollModal();
  updateStaffManagementKPIs();
  renderStaffManagementCards();
  renderStaffManagementTable();
  renderStaffTable();

  // If profile modal was open, refresh it too
  if (state.currentStaffProfileId === staffId) {
    openEmployeeProfileModal(staffId);
  }

  showToast(state.lang === 'ar'
    ? `تم اعتماد وتوثيق الراتب الجديد للموظف (${staff.name}) بصافي ${formatMoney(baseSalary + bonusVal)} بنجاح!`
    : `New salary approved for (${staff.name}) at ${formatMoney(baseSalary + bonusVal)}!`);

  addNotification(
    `اعتماد تعديل مالي - ${staff.name}`,
    `Salary Package Approved - ${staff.name}`,
    `تم تحديث الراتب إلى ${formatMoney(baseSalary)} مع بدلات ${formatMoney(bonusVal)} (${reason})`,
    `Salary updated to ${formatMoney(baseSalary)} plus allowances ${formatMoney(bonusVal)} (${reason})`,
    'staff',
    'إدارة الرواتب',
    'Payroll'
  );
}

function disburseIndividualSalary(staffId) {
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;

  staff.salaryPaid = true;
  const isAr = state.lang === 'ar';

  const badgeEl = document.getElementById(`payrollBadge-${staff.id}`);
  if (badgeEl) {
    badgeEl.innerText = isAr ? 'تم الصرف ✓' : 'Disbursed ✓';
    badgeEl.className = 'table-badge badge-paid';
  }

  const base = staff.salaryUSD || 750;
  const bonuses = (staff.bonuses && staff.bonuses.length > 0)
    ? staff.bonuses.reduce((acc, b) => acc + (b.amount || 0), 0)
    : 50;
  const net = base + bonuses;

  showToast(isAr 
    ? `تم اعتماد وتحويل راتب الموظف (${staff.name}) بصافي ${formatMoney(net)} بنجاح!` 
    : `Salary for (${staff.name}) of ${formatMoney(net)} disbursed successfully!`);

  addNotification(
    `صرف راتب موظف - ${staff.name}`,
    `Salary Disbursed - ${staff.name}`,
    `تم تحويل مستحقات شهر ديسمبر بصافي ${formatMoney(net)}`,
    `December salary of ${formatMoney(net)} transferred`,
    'staff',
    'إدارة الرواتب',
    'Payroll'
  );

  openPayrollModal();
}

function disbursePayroll() {
  state.staffList.forEach(s => {
    s.salaryPaid = true;
  });

  closeModal('payrollModal');
  showToast(state.lang === 'ar' ? 'تم اعتماد وصرف مسير رواتب الكادر الفندقي لشهر ديسمبر 2026 بالكامل بنجاح!' : 'December 2026 staff payroll fully approved & disbursed successfully!');
  addNotification(
    'اعتماد وصرف رواتب الكادر الفندقي',
    'Monthly Staff Payroll Disbursed',
    'تم تحويل رواتب ومستحقات جميع موظفي الفندق المعتمدة لشهر ديسمبر 2026',
    'December staff salaries and bonuses transferred successfully',
    'staff',
    'إدارة الرواتب',
    'Payroll'
  );
}

function exportPayrollCSV() {
  const isAr = state.lang === 'ar';
  let csv = "كود الموظف,الاسم الكامل,القسم,الراتب الأساسي ($),المكافآت والإضافي ($),الصافي المستحق ($),حالة الصرف\n";
  state.staffList.forEach((s, idx) => {
    const empCode = `EMP-2024-${s.id.replace('ST-', '')}`;
    const base = s.salaryUSD || 750;
    const bonus = (s.bonuses && s.bonuses.length > 0)
      ? s.bonuses.reduce((acc, b) => acc + (b.amount || 0), 0)
      : ((idx % 2 === 0) ? 60 : 40);
    const net = base + bonus;
    const status = s.salaryPaid ? 'تم الصرف' : 'جاهز للصرف';
    csv += `"${empCode}","${s.name}","${s.dept}",${base},${bonus},${net},"${status}"\n`;
  });

  downloadCSV(csv, 'GrandStay_Payroll_Sheet_Dec_2026.csv');
  showToast(isAr ? 'تم تصدير مسير الرواتب بصيغة Excel / CSV بنجاح' : 'Payroll sheet exported to CSV successfully');
}

function printPayrollSheet() {
  const isAr = state.lang === 'ar';
  let totalBase = 0, totalBonus = 0, totalNet = 0;
  const rows = state.staffList.map((s, idx) => {
    const base = s.salaryUSD || 750;
    const bonus = (s.bonuses && s.bonuses.length > 0)
      ? s.bonuses.reduce((acc, b) => acc + (b.amount || 0), 0)
      : ((idx % 2 === 0) ? 60 : 40);
    const net = base + bonus;
    totalBase += base; totalBonus += bonus; totalNet += net;
    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>EMP-2024-${s.id.replace('ST-', '')}</strong></td>
        <td><strong>${s.name}</strong></td>
        <td>${s.dept}</td>
        <td>${formatMoney(base)}</td>
        <td>+${formatMoney(bonus)}</td>
        <td><strong>${formatMoney(net)}</strong></td>
        <td>${s.salaryPaid ? 'معتمد ومصروف ✓' : 'جاهز للصرف'}</td>
      </tr>
    `;
  }).join('');

  const customCss = `
    .header { border-bottom: 2px solid #059669; }
    th { background: #ECFDF5; color: #065F46; }
    .totals-row td { background: #F1F5F9; font-weight: 800; font-size: 0.9rem; }
    .signature-box { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; text-align: center; }
    .signature-item { border-top: 1px dashed #94A3B8; padding-top: 10px; font-size: 0.82rem; color: #475569; }
  `;
  const content = `
    <div class="header">
      <div>
        <h1>GRAND STAY HOTEL & SUITES</h1>
        <div class="meta">${isAr ? 'مسير الرواتب والبدلات والمستحقات المعتمد - ديسمبر 2026' : 'Staff Monthly Payroll & Disbursement Statement - December 2026'}</div>
      </div>
      <div class="meta" style="text-align: ${isAr ? 'left' : 'right'};">
        <div>${isAr ? 'التاريخ:' : 'Date:'} ${new Date().toLocaleDateString('ar-EG')}</div>
        <div>${isAr ? 'العملة:' : 'Currency:'} دولار أمريكي (USD)</div>
      </div>
    </div>
    <table>
      <thead>
        <tr><th>#</th><th>${isAr ? 'كود الموظف' : 'ID'}</th><th>${isAr ? 'الاسم الكامل' : 'Staff Name'}</th><th>${isAr ? 'القسم' : 'Dept'}</th><th>${isAr ? 'الأساسي' : 'Base'}</th><th>${isAr ? 'مكافآت / إضافي' : 'Bonus/OT'}</th><th>${isAr ? 'صافي الراتب' : 'Net Total'}</th><th>${isAr ? 'الحالة' : 'Status'}</th></tr>
      </thead>
      <tbody>
        ${rows}
        <tr class="totals-row">
          <td colspan="4" style="text-align:center;">${isAr ? 'الإجمالي العام' : 'Grand Total'}</td>
          <td>${formatMoney(totalBase)}</td>
          <td>+${formatMoney(totalBonus)}</td>
          <td>${formatMoney(totalNet)}</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
    <div class="signature-box">
      <div class="signature-item">${isAr ? 'إعداد قسم المحاسبة' : 'Prepared by Finance'}</div>
      <div class="signature-item">${isAr ? 'مدير الموارد البشرية' : 'HR Director Approval'}</div>
      <div class="signature-item">${isAr ? 'المدير العام للفندق' : 'General Manager Approval'}</div>
    </div>
  `;
  openPrintWindow(isAr ? 'مسير الرواتب المعتمد - ديسمبر 2026' : 'Payroll Sheet - December 2026', content, customCss);
}

function printEmployeePayslip(staffId) {
  const staff = state.staffList.find(s => s.id === staffId);
  if (!staff) return;
  const isAr = state.lang === 'ar';
  const base = staff.salaryUSD || 750;
  const bonus = (staff.bonuses && staff.bonuses.length > 0)
    ? staff.bonuses.reduce((acc, b) => acc + (b.amount || 0), 0)
    : 50;
  const net = base + bonus;
  const empCode = `EMP-2024-${staff.id.replace('ST-', '')}`;

  const customCss = `
    body { background: #F8FAFC; }
    .payslip-card { background: white; border: 1px solid #CBD5E1; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .grid-info { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 18px; font-size: 0.85rem; }
    .net-box { background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 14px; text-align: center; margin: 18px 0; }
    .net-val { font-size: 1.6rem; font-weight: 800; color: #1D4ED8; margin-top: 4px; }
    .signs { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px; text-align: center; font-size: 0.85rem; }
    .sign-line { border-top: 1px dashed #94A3B8; padding-top: 8px; margin-top: 40px; }
  `;
  const content = `
    <div class="payslip-card">
      <div class="header">
        <div>
          <div style="font-size:1.3rem; font-weight:800;">GRAND STAY HOTEL & SUITES</div>
          <div style="font-size:0.85rem; color:#64748B;">${isAr ? 'إيصال صرف الراتب الشهري والمستحقات - ديسمبر 2026' : 'Salary Payslip - December 2026'}</div>
        </div>
        <div style="font-size:0.82rem; color:#64748B; text-align:${isAr ? 'left' : 'right'};">
          <div>${isAr ? 'كود الموظف:' : 'Staff ID:'} <strong>${empCode}</strong></div>
          <div>${isAr ? 'التاريخ:' : 'Date:'} ${new Date().toLocaleDateString('ar-EG')}</div>
        </div>
      </div>
      <div class="grid-info">
        <div><span>${isAr ? 'اسم الموظف:' : 'Employee Name:'}</span> <strong>${staff.name}</strong></div>
        <div><span>${isAr ? 'القسم التشغيلي:' : 'Department:'}</span> <strong>${staff.dept}</strong></div>
        <div><span>${isAr ? 'المسمى الوظيفي:' : 'Job Title:'}</span> <strong>${staff.role}</strong></div>
        <div><span>${isAr ? 'المناوبة المخصصة:' : 'Shift:'}</span> <strong>${staff.shiftNameAr}</strong></div>
      </div>
      <table>
        <thead>
          <tr><th>${isAr ? 'بيان الاستحقاق المالي' : 'Earning Description'}</th><th>${isAr ? 'النوع' : 'Type'}</th><th>${isAr ? 'المبلغ' : 'Amount'}</th></tr>
        </thead>
        <tbody>
          <tr><td>${isAr ? 'الراتب الأساسي الشهري' : 'Basic Monthly Salary'}</td><td>${isAr ? 'أساسي' : 'Basic'}</td><td>${formatMoney(base)}</td></tr>
          <tr><td>${isAr ? 'بدل ساعات إضافية ومكافأة تميز' : 'Overtime & Performance Bonus'}</td><td>${isAr ? 'مكافأة' : 'Bonus'}</td><td style="color:#059669;">+${formatMoney(bonus)}</td></tr>
        </tbody>
      </table>
      <div class="net-box">
        <div style="font-size:0.85rem; color:#1E40AF; font-weight:700;">${isAr ? 'صافي المبلغ المحول والمستلم' : 'Net Disbursed Amount'}</div>
        <div class="net-val">${formatMoney(net)}</div>
      </div>
      <div class="signs">
        <div><div>${isAr ? 'توقيع المحاسب المالي' : 'Finance Officer'}</div><div class="sign-line">[ معتمد إلكترونياً ✓ ]</div></div>
        <div><div>${isAr ? 'توقيع المستلم (الموظف)' : 'Employee Signature'}</div><div class="sign-line">${staff.name}</div></div>
      </div>
    </div>
  `;
  openPrintWindow(`${isAr ? 'إيصال استلام راتب' : 'Salary Payslip'} - ${staff.name}`, content, customCss, 650, 750);
}

function exportStaffDirectoryCSV() {
  const isAr = state.lang === 'ar';
  let csv = "كود الموظف,الاسم الكامل,المسمى الوظيفي,القسم,المناوبة,الراتب الشهري ($),المكافآت التراكمية ($),الهاتف,البريد الإلكتروني,تاريخ التعيين,نوع العقد,الحالة\n";
  state.staffList.forEach(s => {
    const empCode = `EMP-2024-${s.id.replace('ST-', '')}`;
    const bonus = s.bonusUSD || 0;
    csv += `"${empCode}","${s.name}","${s.role}","${s.dept}","${s.shiftNameAr}",${s.salaryUSD || 750},${bonus},"${s.phone || ''}","${s.email || ''}","${s.hireDate || ''}","${s.contractType || 'دوام كامل'}","${s.statusTextAr}"\n`;
  });
  downloadCSV(csv, 'GrandStay_Staff_Directory_2026.csv');
  showToast(isAr ? 'تم تصدير دليل الموظفين بصيغة Excel / CSV بنجاح' : 'Staff directory exported to CSV successfully');
}

function populateAttendanceEmployeeSelect() {
  const sel = document.getElementById('attendEmployeeSelect');
  if (!sel) return;

  const currentVal = sel.value;
  let html = '';
  state.staffList.forEach(s => {
    html += `<option value="${s.id}">${s.name} (${s.role})</option>`;
  });
  sel.innerHTML = html;
  if (currentVal && state.staffList.some(s => s.id === currentVal)) {
    sel.value = currentVal;
  }
}


// Dropdown Panels Controllers
function toggleNotificationsDropdown(event) {
  if (event) {
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  const dd = document.getElementById('notificationDropdown');
  if (!dd) return;

  const willBeActive = !dd.classList.contains('active');
  if (willBeActive) {
    dd.classList.add('active');
    renderNotifications();
  } else {
    dd.classList.remove('active');
  }

  const prof = document.getElementById('profileDropdown');
  if (prof) prof.classList.remove('active');
}

function toggleProfileDropdown(event) {
  if (event) {
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  const prof = document.getElementById('profileDropdown');
  if (!prof) return;

  const willBeActive = !prof.classList.contains('active');
  if (willBeActive) {
    prof.classList.add('active');
  } else {
    prof.classList.remove('active');
  }

  const dd = document.getElementById('notificationDropdown');
  if (dd) dd.classList.remove('active');
}

// Manager Profile Controllers & Real-time Update
function initManagerProfile() {
  const saved = localStorage.getItem('grandstay_manager_profile');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.name) state.manager.name = parsed.name;
      if (parsed.role) state.manager.role = parsed.role;
      if (parsed.email) state.manager.email = parsed.email;
    } catch (e) {
      console.error(e);
    }
  }
  updateManagerDisplay();
}

function updateManagerDisplay() {
  const isAr = state.lang === 'ar';
  const name = state.manager.name;
  const role = state.manager.role;
  const email = state.manager.email;

  // Keep translations synchronized
  if (translations.ar) translations.ar.welcomeTitle = `مرحباً، ${name}`;
  if (translations.en) translations.en.welcomeTitle = `Welcome, ${name}`;

  // Top Bar Manager Display
  const topName = document.getElementById('topBarManagerName');
  if (topName) topName.innerText = name;
  const topRole = document.getElementById('topBarManagerRole');
  if (topRole) topRole.innerText = role;

  // Profile Dropdown Display
  const ddName = document.getElementById('dropdownManagerName');
  if (ddName) ddName.innerText = name;
  const ddRole = document.getElementById('dropdownManagerRole');
  if (ddRole) ddRole.innerText = role;
  const ddEmail = document.getElementById('dropdownManagerEmail');
  if (ddEmail) ddEmail.innerText = email;

  // Dashboard Welcome Banner Title
  const welcomeTitle = document.getElementById('welcomeBannerTitle');
  if (welcomeTitle) {
    welcomeTitle.innerText = isAr ? `مرحباً، ${name}` : `Welcome, ${name}`;
  }

  // System Settings View Inputs
  const setInputName = document.getElementById('settingManagerNameInput');
  if (setInputName) setInputName.value = name;
  const setInputRole = document.getElementById('settingManagerRoleInput');
  if (setInputRole) setInputRole.value = role;
  const setInputEmail = document.getElementById('settingManagerEmailInput');
  if (setInputEmail) setInputEmail.value = email;
}

function openEditManagerModal() {
  const profDD = document.getElementById('profileDropdown');
  if (profDD) profDD.classList.remove('active');

  const inputName = document.getElementById('inputManagerName');
  if (inputName) inputName.value = state.manager.name;
  const inputRole = document.getElementById('inputManagerRole');
  if (inputRole) inputRole.value = state.manager.role;
  const inputEmail = document.getElementById('inputManagerEmail');
  if (inputEmail) inputEmail.value = state.manager.email;

  openModal('editManagerModal');
}

function saveManagerProfile(event) {
  if (event) event.preventDefault();

  const inputName = document.getElementById('inputManagerName');
  const inputRole = document.getElementById('inputManagerRole');
  const inputEmail = document.getElementById('inputManagerEmail');

  const newName = inputName ? inputName.value.trim() : '';
  const newRole = inputRole ? inputRole.value.trim() : '';
  const newEmail = inputEmail ? inputEmail.value.trim() : '';

  if (!newName) {
    showToast(state.lang === 'ar' ? 'يرجى كتابة اسم المدير' : 'Please provide a manager name');
    return;
  }

  state.manager.name = newName;
  if (newRole) state.manager.role = newRole;
  if (newEmail) state.manager.email = newEmail;

  // Save to localStorage for permanence
  try {
    localStorage.setItem('grandstay_manager_profile', JSON.stringify(state.manager));
  } catch (e) {
    console.error(e);
  }

  updateManagerDisplay();
  closeModal('editManagerModal');

  // Push audit notification
  addNotification(
    'تعديل بيانات مدير النظام',
    'Manager Profile Updated',
    `تم اعتماد اسم المدير الجديد: ${newName} بنجاح`,
    `System manager updated to: ${newName}`,
    'audit',
    'الملف الشخصي',
    'Profile'
  );

  showToast(state.lang === 'ar' ? `تم تغيير اسم المدير بنجاح إلى: ${newName}` : `Manager name updated to: ${newName}`);
}

// Render Notifications in Dropdown
function renderNotifications() {
  const container = document.getElementById('notifListContainer');
  if (!container) return;

  const isAr = state.lang === 'ar';
  const unreadCount = state.notifications ? state.notifications.filter(n => n.unread).length : 0;

  // Update badge counter on the bell icon
  const badge = document.getElementById('notifBadgeCount');
  if (badge) {
    if (unreadCount > 0) {
      badge.style.display = 'flex';
      badge.innerText = unreadCount;
    } else {
      badge.style.display = 'none';
    }
  }

  // Update dropdown header title
  const titleEl = document.getElementById('notifHeaderTitle');
  if (titleEl) {
    if (isAr) {
      titleEl.innerHTML = unreadCount > 0 
        ? `التنبيهات اللحظية (<span style="color: #7C3AED;">${unreadCount} جديدة</span>)`
        : `التنبيهات اللحظية (لا توجد تنبيهات جديدة)`;
    } else {
      titleEl.innerHTML = unreadCount > 0 
        ? `Live Notifications (<span style="color: #7C3AED;">${unreadCount} New</span>)`
        : `Live Notifications (All Read)`;
    }
  }

  const markBtn = document.getElementById('markAllReadLink');
  if (markBtn) {
    markBtn.innerText = isAr ? 'تحديد كمقروء' : 'Mark all read';
    markBtn.style.opacity = unreadCount > 0 ? '1' : '0.4';
    markBtn.style.pointerEvents = unreadCount > 0 ? 'auto' : 'none';
  }

  const clearBtn = document.getElementById('clearAllNotifsLink');
  if (clearBtn) {
    clearBtn.innerText = isAr ? 'مسح الكل' : 'Clear all';
  }

  if (!state.notifications || state.notifications.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 36px 14px; color: #94A3B8;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 8px; opacity: 0.6;">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <p style="font-size: 0.85rem; font-weight: 600;">${isAr ? 'لا توجد تنبيهات حالياً' : 'No notifications available'}</p>
        <span style="font-size: 0.72rem; color: #CBD5E1;">${isAr ? 'جميع العمليات التشغيلية مستقرة' : 'All hotel operations running smoothly'}</span>
      </div>
    `;
    return;
  }

  const NOTIF_CONFIG = {
    vip: { accent: 'accent-purple', bg: '#EDE9FE', color: '#8B5CF6', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>' },
    checkout: { accent: 'accent-purple', bg: '#FFEDD5', color: '#EA580C', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>' },
    maintenance: { accent: 'accent-green', bg: '#D1FAE5', color: '#059669', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' },
    booking: { accent: 'accent-purple', bg: 'rgba(56, 189, 248, 0.15)', color: '#0284C7', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>' },
    audit: { accent: 'accent-purple', bg: 'rgba(168, 85, 247, 0.15)', color: '#9333EA', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>' }
  };

  const defaultIcon = { accent: '', bg: '#EDE9FE', color: '#8B5CF6', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' };

  container.innerHTML = state.notifications.map(n => {
    const title = isAr ? n.title : (n.titleEn || n.title);
    const desc = isAr ? n.desc : (n.descEn || n.desc);
    const time = isAr ? n.time : (n.timeEn || n.time);
    const actionTxt = isAr ? n.actionBtnAr : (n.actionBtnEn || n.actionBtnAr || (isAr ? 'إجراء' : 'Action'));
    const conf = NOTIF_CONFIG[n.type] || defaultIcon;
    const accentClass = n.unread ? conf.accent : '';
    const unreadClass = n.unread ? 'unread' : '';

    return `
      <div class="notif-item ${unreadClass} ${accentClass}" onclick="handleNotifClick(${n.id})" title="${isAr ? 'انقر للانتقال المباشر وتفعيل الإجراء' : 'Click to execute action'}">
        <div class="notif-icon" style="background: ${conf.bg}; color: ${conf.color};">
          ${conf.svg}
        </div>
        <div class="notif-body">
          <div class="notif-body-top">
            <h5>${title}</h5>
            <span class="notif-time">${time}</span>
          </div>
          <p>${desc}</p>
          <div class="notif-footer-actions">
            ${actionTxt ? `<button class="notif-action-btn" onclick="event.stopPropagation(); handleNotifAction(${n.id})">${actionTxt}</button>` : '<span></span>'}
            <button class="notif-dismiss-btn" onclick="event.stopPropagation(); dismissNotification(${n.id})" title="${isAr ? 'حذف الإشعار' : 'Dismiss'}">&times;</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Notification Click & Action Handlers
function handleNotifClick(id) {
  handleNotifAction(id);
}

function handleNotifAction(id) {
  const n = state.notifications ? state.notifications.find(item => item.id === id) : null;
  if (!n) return;

  // Mark as read
  n.unread = false;
  renderNotifications();

  // Close dropdown panel smoothly
  const dd = document.getElementById('notificationDropdown');
  if (dd) dd.classList.remove('active');

  if (n.type === 'vip') {
    openVipModal();
    showToast(state.lang === 'ar' ? 'جارٍ متابعة قائمة تجهيز واستقبال النزيل المميز د. طارق الحكيم' : 'VIP arrival checklist opened');
  } else if (n.type === 'checkout') {
    openGuestFolio('أحمد عبد الله الهاشمي', 'غرفة 101 فردية (24 - 27 أكتوبر)', 270, 'BK-9105');
    showToast(state.lang === 'ar' ? 'فتح فاتورة النزيل أحمد الهاشمي لإتمام تسوية الحساب وتسجيل المغادرة' : 'Opened folio for checkout settlement');
  } else if (n.type === 'maintenance') {
    const room = state.rooms.find(r => r.number === '203');
    if (room) {
      room.status = 'clean';
      renderKanbanBoard();
      renderHousekeepingChips();
      renderDonutChart();
    }
    switchView('housekeeping');
    showToast(state.lang === 'ar' ? 'تم تأكيد جاهزية الغرفة 203 ونقلها إلى قائمة الغرف النظيفة' : 'Room 203 verified and moved to Clean');
  } else if (n.type === 'booking') {
    switchView('bookings');
    showToast(state.lang === 'ar' ? 'عرض سجل الحجوزات النشطة' : 'Switched to Bookings View');
  } else if (n.type === 'audit') {
    switchView('analytics');
    showToast(state.lang === 'ar' ? 'عرض تقارير الإقفال المالي والتدقيق اليومي' : 'Viewing financial reports');
  } else {
    showToast(n.title);
  }
}

function dismissNotification(id) {
  if (!state.notifications) return;
  const idx = state.notifications.findIndex(n => n.id === id);
  if (idx !== -1) {
    state.notifications.splice(idx, 1);
    renderNotifications();
    showToast(state.lang === 'ar' ? 'تم حذف التنبيه' : 'Notification dismissed');
  }
}

function clearAllNotifications() {
  if (!state.notifications) return;
  state.notifications.forEach(n => { n.unread = false; });
  renderNotifications();
  showToast(state.lang === 'ar' ? 'تم تحديد جميع التنبيهات كمقروءة' : 'All notifications marked as read');
}

function deleteAllNotifications() {
  state.notifications = [];
  renderNotifications();
  showToast(state.lang === 'ar' ? 'تم مسح سجل التنبيهات بالكامل' : 'All notifications cleared');
}

function addNotification(titleAr, titleEn, descAr, descEn, type, actionBtnAr, actionBtnEn) {
  if (!state.notifications) state.notifications = [];
  const newNotif = {
    id: Date.now(),
    title: titleAr,
    titleEn: titleEn || titleAr,
    desc: descAr,
    descEn: descEn || descAr,
    time: state.lang === 'ar' ? 'الآن' : 'Just now',
    timeEn: 'Just now',
    type: type || 'general',
    unread: true,
    actionBtnAr: actionBtnAr || (state.lang === 'ar' ? 'عرض' : 'View'),
    actionBtnEn: actionBtnEn || 'View'
  };

  state.notifications.unshift(newNotif);
  renderNotifications();
}

// Export Bookings to CSV / Excel (with UTF-8 BOM for Microsoft Excel Arabic Support)
function exportBookingsExcel() {
  const isAr = state.lang === 'ar';
  
  // Headers in selected language
  const headers = isAr ? [
    "رقم الحجز",
    "اسم النزيل",
    "فئة الغرفة",
    "تاريخ الوصول",
    "تاريخ المغادرة",
    "عدد الليالي",
    "المبلغ الإجمالي ($)",
    "المبلغ بالدينار العراقي (IQD)",
    "حالة السداد",
    "تاريخ التصدير"
  ] : [
    "Booking ID",
    "Guest Name",
    "Room Category",
    "Check-in Date",
    "Check-out Date",
    "Nights",
    "Total (USD)",
    "Total (IQD)",
    "Payment Status",
    "Export Timestamp"
  ];

  const nowFormatted = new Date().toLocaleString(isAr ? 'ar-EG' : 'en-US');

  // Rows from state.bookings
  const rows = state.bookings.map(b => {
    const iqdAmount = Math.round(b.totalUSD * state.exchangeRate);
    const guest = isAr ? b.guestName : (b.guestNameEn || b.guestName);
    const room = isAr ? b.room : (b.roomEn || b.room);
    const checkIn = isAr ? b.checkInFormatted : b.checkIn;
    const checkOut = isAr ? b.checkOutFormatted : b.checkOut;
    const status = isAr ? b.statusText : (b.statusTextEn || b.statusText);

    return [
      b.id,
      guest,
      room,
      checkIn,
      checkOut,
      b.nights,
      `$${b.totalUSD}`,
      `${iqdAmount.toLocaleString()} IQD`,
      status,
      nowFormatted
    ];
  });

  // Safe CSV construction with quotes escaping
  const csvRows = [
    headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(","),
    ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
  ];

  const csvString = csvRows.join("\r\n");

  const fileName = isAr 
    ? `كشف_حجوزات_فندق_جراند_ستاي_${new Date().toISOString().slice(0, 10)}.csv` 
    : `GrandStay_Bookings_Report_${new Date().toISOString().slice(0, 10)}.csv`;
  downloadCSV(csvString, fileName);

  showToast(isAr 
    ? `تم تصدير وتحميل كشف الحجوزات بنجاح بصيغة Excel (${state.bookings.length} حجوزات مسجلة)`
    : `Bookings Excel report downloaded successfully (${state.bookings.length} bookings)`
  );
}

function exportAnalyticsPDF() {
  showToast(state.lang === 'ar' ? 'جارٍ تحضير وتصدير تقرير المؤشرات الفندقية...' : 'Preparing Hotel BI Analytics Report...');
  setTimeout(() => {
    window.print();
  }, 400);
}

// Booking Table Fast Actions
function checkoutBooking(roomNum, guestName, btn) {
  if (btn) {
    btn.innerText = state.lang === 'ar' ? 'تمت المغادرة' : 'Checked Out';
    btn.disabled = true;
    btn.style.opacity = '0.6';
  }

  // Update in state.bookings if matching
  const b = state.bookings.find(bk => bk.roomNumber === roomNum || bk.guestName === guestName);
  if (b) {
    b.status = 'checkout';
    b.statusText = state.lang === 'ar' ? 'تمت المغادرة' : 'Checked Out';
    b.statusTextEn = 'Checked Out';
  }

  // Update room to dirty
  const room = state.rooms.find(r => r.number === roomNum);
  if (room) {
    room.status = 'dirty';
    renderKanbanBoard();
    renderHousekeepingChips();
  }

  // Push live notification
  addNotification(
    `مغادرة النزيل ${guestName}`,
    `Guest Check-out - ${guestName}`,
    `غرفة #${roomNum} - تم تسليم المفتاح وبانتظار التنظيف والفحص`,
    `Room #${roomNum} ready for housekeeping inspection`,
    'checkout',
    'لوحة التدبير',
    'Housekeeping'
  );

  showToast(state.lang === 'ar' ? `تم إتمام مغادرة النزيل ${guestName} وتحويل الغرفة #${roomNum} للتنظيف` : `Guest ${guestName} checked out. Room #${roomNum} flagged for housekeeping.`);
}

function confirmBooking(bookingId, btn) {
  if (btn) {
    btn.innerText = state.lang === 'ar' ? 'مؤكد ومسدد' : 'Confirmed';
    btn.classList.remove('active-toggle');
    btn.style.background = 'var(--accent-mint-bg)';
    btn.style.color = '#059669';
    btn.disabled = true;
  }
  const cleanId = bookingId.replace('#', '');
  const b = state.bookings.find(bk => bk.id === cleanId || bk.id === bookingId);
  if (b) {
    b.status = 'paid';
    b.statusText = state.lang === 'ar' ? 'مدفوع بالكامل' : 'Paid in Full';
    b.statusTextEn = 'Paid in Full';
  }
  renderBookingsTable();
  showToast(state.lang === 'ar' ? `تم تأكيد الحجز ${bookingId} وإرسال إشعار الدخول للنزيل` : `Booking ${bookingId} confirmed and access details sent`);
}

// Navigation & Views Switcher
function switchView(viewName) {
  // Update sidebar active state
  document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
    if (item.getAttribute('data-nav') === viewName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Switch active section
  document.querySelectorAll('.app-view').forEach(view => {
    if (view.id === `view-${viewName}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Trigger view-specific renderers
  if (viewName === 'housekeeping') {
    renderKanbanBoard();
  } else if (viewName === 'analytics') {
    updateFinancialMetrics();
  } else if (viewName === 'bookings') {
    updateFinancialMetrics();
    renderTapeChart();
    renderBookingsTable();
  } else if (viewName === 'staff') {
    renderStaffManagementCards();
    renderStaffManagementTable();
    updateStaffManagementKPIs();
  } else if (viewName === 'attendance') {
    renderStaffTable();
    renderHandoverNotes();
  }

  // Smooth scroll
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const t = translations[state.lang];
  const viewTitles = {
    dashboard: t.navDashboard,
    bookings: t.navBookings,
    attendance: t.navAttendance,
    staff: state.lang === 'ar' ? 'إدارة شؤون الموظفين' : 'Staff & HR Management',
    housekeeping: t.navHousekeeping,
    analytics: t.navAnalytics,
    settings: t.navSettings
  };
  showToast(`${state.lang === 'ar' ? 'عرض قسم' : 'Switched to'}: ${viewTitles[viewName] || viewName}`);
}

// Render Kanban Board for Housekeeping Module
function renderKanbanBoard() {
  const container = document.getElementById('kanbanBoard');
  if (!container) return;

  const t = translations[state.lang];
  const columns = [
    { id: 'clean', title: state.lang === 'ar' ? 'نظيفة ومفحوصة (جاهزة)' : 'Clean & Inspected', color: '#059669', bg: 'var(--accent-mint-bg)' },
    { id: 'occupied', title: state.lang === 'ar' ? 'مسكونة حالياً' : 'Occupied', color: '#0284C7', bg: 'var(--accent-sky-bg)' },
    { id: 'dirty', title: state.lang === 'ar' ? 'بانتظار التنظيف (مغادرة)' : 'Dirty / Needs Cleaning', color: '#E11D48', bg: 'var(--accent-rose-bg)' },
    { id: 'maint', title: state.lang === 'ar' ? 'صيانة وخارج الخدمة' : 'Under Maintenance', color: '#D97706', bg: 'var(--accent-coral-bg)' }
  ];

  let html = '';

  columns.forEach(col => {
    const colRooms = state.rooms.filter(r => r.status === col.id);
    html += `
      <div class="kanban-col">
        <div class="kanban-col-header">
          <div class="kanban-col-title">
            <span class="legend-dot" style="background: ${col.color};"></span>
            <span>${col.title}</span>
          </div>
          <span class="kanban-col-count">${colRooms.length}</span>
        </div>
        <div class="kanban-cards-list">
    `;

    if (colRooms.length === 0) {
      html += `<div style="text-align: center; padding: 30px 10px; color: #94A3B8; font-size: 0.8rem;">${state.lang === 'ar' ? 'لا توجد غرف في هذه الحالة' : 'No rooms in this status'}</div>`;
    } else {
      colRooms.forEach(room => {
        let actionBtnText = state.lang === 'ar' ? 'نقل إلى مسكونة' : 'Set Occupied';
        if (room.status === 'occupied') actionBtnText = state.lang === 'ar' ? 'تسجيل مغادرة وتنظيف' : 'Check-out & Dirty';
        if (room.status === 'dirty') actionBtnText = state.lang === 'ar' ? 'إتمام التنظيف والفحص' : 'Mark Clean';
        if (room.status === 'maint') actionBtnText = state.lang === 'ar' ? 'إنهاء الصيانة وإعادة للخدمة' : 'Resolve Maintenance';

        html += `
          <div class="kanban-room-card" onclick="advanceRoomStatus('${room.number}')">
            <div class="kanban-card-top">
              <span class="kanban-room-num">${room.number}</span>
              <span class="kanban-room-type">${room.typeName[state.lang]}</span>
            </div>
            <div class="kanban-card-meta">
              <span>${state.lang === 'ar' ? 'الطابق' : 'Floor'} ${room.number[0]}</span>
              <span style="font-weight: 700; color: ${col.color};">${col.title}</span>
            </div>
            <button class="kanban-action-btn" onclick="event.stopPropagation(); advanceRoomStatus('${room.number}')">
              ${actionBtnText} &rarr;
            </button>
          </div>
        `;
      });
    }

    html += `
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Advance Room Status in Kanban / Housekeeping
function advanceRoomStatus(roomNumber) {
  const room = state.rooms.find(r => r.number === roomNumber);
  if (!room) return;

  const cycle = ['clean', 'occupied', 'dirty', 'maint'];
  const nextIdx = (cycle.indexOf(room.status) + 1) % cycle.length;
  room.status = cycle[nextIdx];

  renderKanbanBoard();
  renderHousekeepingChips();
  renderDonutChart();
  showToast(`${translations[state.lang].toastRoomStatusChanged} ${roomNumber}`);
}

// Filter Tape Chart by Room Category
function filterTapeChart(cat, btn) {
  state.tapeCurrentFilter = cat || 'all';
  if (btn) {
    btn.parentElement.querySelectorAll('.tab-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  document.querySelectorAll('.tape-row').forEach(row => {
    if (state.tapeCurrentFilter === 'all' || row.getAttribute('data-room-cat') === state.tapeCurrentFilter) {
      row.style.display = 'grid';
    } else {
      row.style.display = 'none';
    }
  });
}

// Tape Chart Multi-Week Schedule Provider
function getTapeSchedule(roomNumber, offset, isAr) {
  if (offset === 0) {
    // Current Week: 24 - 30 Oct 2026
    if (roomNumber === '101') {
      return [
        { span: 3, type: 'booked', barClass: 'bar-inhouse', title: isAr ? 'أحمد عبد الله (مقيم)' : 'Ahmed Al-Hashimi (In-House)', guest: isAr ? 'أحمد عبد الله الهاشمي' : 'Ahmed Al-Hashimi', amount: 270, todayCol: true },
        { span: 4, type: 'available' }
      ];
    }
    if (roomNumber === '102') {
      return [
        { span: 4, type: 'booked', barClass: 'bar-confirmed', title: isAr ? 'د. طارق الحكيم (VIP)' : 'Dr. Tariq Al-Hakim (VIP)', guest: isAr ? 'د. طارق الحكيم' : 'Dr. Tariq Al-Hakim', amount: 580, todayCol: true },
        { span: 3, type: 'available' }
      ];
    }
    if (roomNumber === '103') {
      return [
        { span: 2, type: 'available', todayCol: true },
        { span: 5, type: 'booked', barClass: 'bar-confirmed', title: isAr ? 'سارة فيصل التميمي (مؤكد)' : 'Sarah Al-Tamimi (Confirmed)', guest: isAr ? 'سارة فيصل التميمي' : 'Sarah Al-Tamimi', amount: 1200 }
      ];
    }
    if (roomNumber === '201') {
      return [
        { span: 1, type: 'booked', barClass: 'bar-checkout', title: isAr ? 'مغادرة وتنظيف' : 'Check-out & Clean', guest: isAr ? 'زياد الخفاجي' : 'Ziad Al-Khafaji', amount: 145, todayCol: true },
        { span: 3, type: 'available' },
        { span: 3, type: 'booked', barClass: 'bar-confirmed', title: isAr ? 'شركة الرافدين (مؤكد)' : 'Al-Rafidain Corp (Confirmed)', guest: isAr ? 'شركة الرافدين' : 'Al-Rafidain Corp', amount: 435 }
      ];
    }
    if (roomNumber === '301') {
      return [
        { span: 7, type: 'booked', barClass: 'bar-inhouse', title: isAr ? 'الشيخ ماجد العلي (إقامة كاملة)' : 'Sheikh Majid Al-Ali (Full Stay)', guest: isAr ? 'الشيخ ماجد العلي' : 'Sheikh Majid Al-Ali', amount: 3150, todayCol: true }
      ];
    }
  } else if (offset === 1) {
    // Next Week: 31 Oct - 6 Nov 2026
    if (roomNumber === '101') {
      return [
        { span: 3, type: 'booked', barClass: 'bar-confirmed', title: isAr ? 'م. زياد الخالدي (مؤكد)' : 'Eng. Ziyad Al-Khalidi (Confirmed)', guest: isAr ? 'المهندس زياد الخالدي' : 'Eng. Ziyad Al-Khalidi', amount: 270 },
        { span: 4, type: 'available' }
      ];
    }
    if (roomNumber === '102') {
      return [
        { span: 3, type: 'available' },
        { span: 4, type: 'booked', barClass: 'bar-confirmed', title: isAr ? 'وفد غرفة التجارة (VIP)' : 'Chamber of Commerce (VIP)', guest: isAr ? 'وفد غرفة التجارة الدولية' : 'International Chamber Delegation', amount: 580 }
      ];
    }
    if (roomNumber === '103') {
      return [
        { span: 2, type: 'booked', barClass: 'bar-inhouse', title: isAr ? 'سارة التميمي (تمديد إقامة)' : 'Sarah Al-Tamimi (Extended)', guest: isAr ? 'سارة فيصل التميمي' : 'Sarah Al-Tamimi', amount: 480 },
        { span: 1, type: 'booked', barClass: 'bar-checkout', title: isAr ? 'صيانة وفحص دوري' : 'Maintenance Inspection', guest: isAr ? 'إدارة الصيانة' : 'Maintenance Team', amount: 0 },
        { span: 4, type: 'available' }
      ];
    }
    if (roomNumber === '201') {
      return [
        { span: 3, type: 'booked', barClass: 'bar-confirmed', title: isAr ? 'شركة الرافدين (مؤكد)' : 'Al-Rafidain Corp (Confirmed)', guest: isAr ? 'شركة الرافدين' : 'Al-Rafidain Corp', amount: 435 },
        { span: 1, type: 'booked', barClass: 'bar-checkout', title: isAr ? 'مغادرة وتنظيف سريع' : 'Check-out & Clean', guest: isAr ? 'شركة الرافدين' : 'Al-Rafidain Corp', amount: 0 },
        { span: 3, type: 'booked', barClass: 'bar-inhouse', title: isAr ? 'الدكتور عادل الجبوري' : 'Dr. Adil Al-Jubouri', guest: isAr ? 'الدكتور عادل الجبوري' : 'Dr. Adil Al-Jubouri', amount: 435 }
      ];
    }
    if (roomNumber === '301') {
      return [
        { span: 7, type: 'booked', barClass: 'bar-inhouse', title: isAr ? 'الوفد الدبلوماسي السويدي (VIP)' : 'Swedish Diplomatic Delegation (VIP)', guest: isAr ? 'الوفد الدبلوماسي السويدي' : 'Swedish Diplomatic Delegation', amount: 3150 }
      ];
    }
  } else if (offset === 2) {
    if (roomNumber === '101') {
      return [
        { span: 5, type: 'booked', barClass: 'bar-confirmed', title: isAr ? 'كريم البستاني (مؤكد)' : 'Karim Al-Bustani (Confirmed)', guest: isAr ? 'كريم البستاني' : 'Karim Al-Bustani', amount: 450 },
        { span: 2, type: 'available' }
      ];
    }
    if (roomNumber === '102') {
      return [
        { span: 2, type: 'booked', barClass: 'bar-checkout', title: isAr ? 'مغادرة وتنظيف' : 'Check-out Cleaning', guest: isAr ? 'وفد غرفة التجارة' : 'Chamber Delegation', amount: 290 },
        { span: 5, type: 'available' }
      ];
    }
    if (roomNumber === '103') {
      return [
        { span: 7, type: 'booked', barClass: 'bar-inhouse', title: isAr ? 'عائلة الشيخ حميد (إقامة 7 ليالٍ)' : 'Sheikh Humaid Family (7 Nights)', guest: isAr ? 'الشيخ حميد الشمري' : 'Sheikh Humaid Al-Shammari', amount: 1680 }
      ];
    }
    if (roomNumber === '201') {
      return [
        { span: 4, type: 'available' },
        { span: 3, type: 'booked', barClass: 'bar-confirmed', title: isAr ? 'مؤتمر الطاقة الدولي' : 'Global Energy Summit', guest: isAr ? 'وزارة النفط والطاقة' : 'Ministry of Oil & Energy', amount: 435 }
      ];
    }
    if (roomNumber === '301') {
      return [
        { span: 3, type: 'booked', barClass: 'bar-confirmed', title: isAr ? 'القمة المصرفية العربية' : 'Arab Banking Summit', guest: isAr ? 'اتحاد المصارف العربية' : 'Arab Banking Union', amount: 1350 },
        { span: 4, type: 'available' }
      ];
    }
  } else if (offset === -1) {
    if (roomNumber === '101') {
      return [
        { span: 4, type: 'booked', barClass: 'bar-inhouse', title: isAr ? 'نواف السبيعي' : 'Nawaf Al-Subaie', guest: isAr ? 'نواف السبيعي' : 'Nawaf Al-Subaie', amount: 360 },
        { span: 3, type: 'available' }
      ];
    }
    if (roomNumber === '102') {
      return [
        { span: 7, type: 'booked', barClass: 'bar-confirmed', title: isAr ? 'شركة نفط الشمال' : 'North Oil Company', guest: isAr ? 'شركة نفط الشمال' : 'North Oil Company', amount: 1015 }
      ];
    }
    if (roomNumber === '103') {
      return [
        { span: 2, type: 'booked', barClass: 'bar-checkout', title: isAr ? 'صيانة دورية وتجهيز' : 'Maintenance & Prep', guest: isAr ? 'إدارة الصيانة' : 'Maintenance Dept', amount: 0 },
        { span: 5, type: 'booked', barClass: 'bar-inhouse', title: isAr ? 'د. ليلى المنصور' : 'Dr. Layla Al-Mansoor', guest: isAr ? 'د. ليلى المنصور' : 'Dr. Layla Al-Mansoor', amount: 1200 }
      ];
    }
    if (roomNumber === '201') {
      return [
        { span: 5, type: 'booked', barClass: 'bar-inhouse', title: isAr ? 'حسين قاسم' : 'Hussein Qasim', guest: isAr ? 'حسين قاسم' : 'Hussein Qasim', amount: 725 },
        { span: 2, type: 'available' }
      ];
    }
    if (roomNumber === '301') {
      return [
        { span: 7, type: 'booked', barClass: 'bar-inhouse', title: isAr ? 'سعادة السفير التركي (VIP)' : 'Turkish Ambassador (VIP)', guest: isAr ? 'السفارة التركية' : 'Turkish Embassy', amount: 3150 }
      ];
    }
  }

  // Fallback procedural generator for other weeks
  const seed = (parseInt(roomNumber) + Math.abs(offset)) % 3;
  if (seed === 0) {
    return [
      { span: 4, type: 'booked', barClass: 'bar-confirmed', title: isAr ? `حجز مسبق #${Math.abs(offset) * 12 + 101}` : `Advance Booking #${Math.abs(offset) * 12 + 101}`, guest: isAr ? 'نزيل مسبق الحجز' : 'Reserved Guest', amount: 550 },
      { span: 3, type: 'available' }
    ];
  } else if (seed === 1) {
    return [
      { span: 2, type: 'available' },
      { span: 5, type: 'booked', barClass: 'bar-inhouse', title: isAr ? `وفد تجاري #${Math.abs(offset) * 7 + 201}` : `Trade Delegation #${Math.abs(offset) * 7 + 201}`, guest: isAr ? 'وفد تجاري' : 'Business Delegation', amount: 800 }
    ];
  } else {
    return [
      { span: 7, type: 'booked', barClass: 'bar-confirmed', title: isAr ? `حجز مؤسسي #${Math.abs(offset) * 9 + 301}` : `Corporate Stay #${Math.abs(offset) * 9 + 301}`, guest: isAr ? 'شركة استثمارية' : 'Investment Corp', amount: 1200 }
    ];
  }
}

// Render Tape Chart (Gantt Room Timeline)
function renderTapeChart() {
  const container = document.getElementById('tapeChartContainer');
  if (!container) return;

  const isAr = state.lang === 'ar';
  const arMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const arDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const enDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Start date of active week
  const startDate = new Date(2026, 9, 24 + (state.tapeWeekOffset * 7));
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);

  // Update badge and title
  const weekBadge = document.getElementById('tapeWeekBadge');
  if (weekBadge) {
    if (isAr) {
      let offsetTxt = '';
      if (state.tapeWeekOffset === 0) offsetTxt = '(الأسبوع الحالي)';
      else if (state.tapeWeekOffset === 1) offsetTxt = '(الأسبوع القادم)';
      else if (state.tapeWeekOffset === -1) offsetTxt = '(الأسبوع الماضي)';
      else if (state.tapeWeekOffset > 1) offsetTxt = `(بعد ${state.tapeWeekOffset} أسابيع)`;
      else if (state.tapeWeekOffset < -1) offsetTxt = `(قبل ${Math.abs(state.tapeWeekOffset)} أسابيع)`;

      weekBadge.innerText = `${startDate.getDate()} ${arMonths[startDate.getMonth()]} - ${endDate.getDate()} ${arMonths[endDate.getMonth()]} ${endDate.getFullYear()} ${offsetTxt}`;
    } else {
      let offsetTxtEn = '';
      if (state.tapeWeekOffset === 0) offsetTxtEn = '(Current Week)';
      else if (state.tapeWeekOffset === 1) offsetTxtEn = '(Next Week)';
      else if (state.tapeWeekOffset === -1) offsetTxtEn = '(Previous Week)';
      else if (state.tapeWeekOffset > 1) offsetTxtEn = `(+${state.tapeWeekOffset} Weeks)`;
      else if (state.tapeWeekOffset < -1) offsetTxtEn = `(${state.tapeWeekOffset} Weeks)`;

      weekBadge.innerText = `${enMonths[startDate.getMonth()]} ${startDate.getDate()} - ${enMonths[endDate.getMonth()]} ${endDate.getDate()}, ${endDate.getFullYear()} ${offsetTxtEn}`;
    }
  }

  // Toggle "Current Week" button visibility and arrows direction
  const currBtn = document.getElementById('tapeCurrentWeekBtn');
  if (currBtn) {
    currBtn.style.display = state.tapeWeekOffset !== 0 ? 'inline-flex' : 'none';
  }
  const prevBtn = document.getElementById('tapePrevWeekBtn');
  const nextBtn = document.getElementById('tapeNextWeekBtn');
  if (prevBtn) {
    prevBtn.innerHTML = isAr 
      ? `&rarr; <span>${translations[state.lang].btnPrevWeek}</span>`
      : `&larr; <span>${translations[state.lang].btnPrevWeek}</span>`;
  }
  if (nextBtn) {
    nextBtn.innerHTML = isAr 
      ? `<span>${translations[state.lang].btnNextWeek}</span> &larr;`
      : `<span>${translations[state.lang].btnNextWeek}</span> &rarr;`;
  }

  // Build the 7 days array
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    const dayName = isAr ? arDays[d.getDay()] : enDays[d.getDay()];
    const isToday = (state.tapeWeekOffset === 0 && i === 0);
    const label = isToday ? `${dayName} ${d.getDate()} (${isAr ? 'اليوم' : 'Today'})` : `${dayName} ${d.getDate()}`;
    days.push({ date: d, label, isToday });
  }

  // Header Grid
  let html = `<div class="tape-header-grid">`;
  html += `<div class="tape-header-cell">${isAr ? 'الغرفة والفئة' : 'Room & Category'}</div>`;
  days.forEach(d => {
    html += `<div class="tape-header-cell ${d.isToday ? 'today-col' : ''}">${d.label}</div>`;
  });
  html += `</div>`;

  // Room Rows
  const tapeRooms = [
    { number: '101', cat: 'single', nameAr: '101 - فردية كلاسيك', nameEn: '101 - Classic Single', price: 90, floor: 1 },
    { number: '102', cat: 'double', nameAr: '102 - مزدوجة ديلوكس', nameEn: '102 - Deluxe Double', price: 145, floor: 1 },
    { number: '103', cat: 'suite',  nameAr: '103 - جناح تنفيذي', nameEn: '103 - Executive Suite', price: 240, floor: 1 },
    { number: '201', cat: 'double', nameAr: '201 - مزدوجة ديلوكس', nameEn: '201 - Deluxe Double', price: 145, floor: 2 },
    { number: '301', cat: 'suite',  nameAr: '301 - جناح رويال VIP', nameEn: '301 - Royal Suite VIP', price: 450, floor: 3 }
  ];

  tapeRooms.forEach(room => {
    const isVisible = (state.tapeCurrentFilter === 'all' || state.tapeCurrentFilter === room.cat);
    const roomTitle = isAr ? room.nameAr : room.nameEn;
    const roomSub = `${formatMoney(room.price)} / ${isAr ? 'ليلة' : 'night'} • ${isAr ? 'طابق' : 'Floor'} ${room.floor}`;

    html += `
      <div class="tape-row" data-room-cat="${room.cat}" style="display: ${isVisible ? 'grid' : 'none'};">
        <div class="tape-room-info">
          <div class="tape-room-number">${roomTitle}</div>
          <div class="tape-room-sub">${roomSub}</div>
        </div>
    `;

    const segments = getTapeSchedule(room.number, state.tapeWeekOffset, isAr);
    segments.forEach(seg => {
      if (seg.type === 'booked') {
        const todayClass = (seg.todayCol && state.tapeWeekOffset === 0) ? 'today-col' : '';
        html += `
          <div class="tape-day-cell ${todayClass}" style="grid-column: span ${seg.span};">
            <div class="tape-booking-bar ${seg.barClass}" onclick="openGuestFolio('${seg.guest.replace(/'/g, "\\'")}', '${roomTitle}', ${seg.amount}, 'BK-TAPE')" title="${isAr ? 'انقر لعرض تفاصيل الحجز والفاتورة' : 'Click to view reservation folio'}">
              ${seg.title}
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="tape-day-cell" style="grid-column: span ${seg.span};">
            <span class="tape-available-slot" onclick="openBookingModalForRoom('${room.number}', '${room.cat}')" title="${isAr ? 'انقر لحجز هذه الغرفة' : 'Click to book this room'}">
              ${isAr ? 'متوفرة للحجز' : 'Available for Booking'}
            </span>
          </div>
        `;
      }
    });

    html += `</div>`;
  });

  container.innerHTML = html;
}

// Tape Chart Week Navigation Handlers
function nextTapeChartWeek() {
  state.tapeWeekOffset++;
  renderTapeChart();
  const dStart = new Date(2026, 9, 24 + (state.tapeWeekOffset * 7));
  const arMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = state.lang === 'ar' ? arMonths[dStart.getMonth()] : enMonths[dStart.getMonth()];
  showToast(state.lang === 'ar' 
    ? `تم الانتقال إلى تواريخ: ${dStart.getDate()} ${monthName}` 
    : `Switched to week of ${monthName} ${dStart.getDate()}`
  );
}

function prevTapeChartWeek() {
  state.tapeWeekOffset--;
  renderTapeChart();
  const dStart = new Date(2026, 9, 24 + (state.tapeWeekOffset * 7));
  const arMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = state.lang === 'ar' ? arMonths[dStart.getMonth()] : enMonths[dStart.getMonth()];
  showToast(state.lang === 'ar' 
    ? `تم الانتقال إلى تواريخ: ${dStart.getDate()} ${monthName}` 
    : `Switched to week of ${monthName} ${dStart.getDate()}`
  );
}

function resetTapeChartWeek() {
  state.tapeWeekOffset = 0;
  renderTapeChart();
  showToast(state.lang === 'ar' ? 'تمت العودة إلى الأسبوع الحالي (24 - 30 أكتوبر)' : 'Returned to Current Week (Oct 24 - 30)');
}

// Render Bookings Table
function renderBookingsTable() {
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;

  const isAr = state.lang === 'ar';
  const badgeCount = document.getElementById('bookingsCountBadge');
  if (badgeCount) {
    badgeCount.innerText = isAr ? `${state.bookings.length} حجوزات` : `${state.bookings.length} Bookings`;
  }

  let html = '';
  state.bookings.forEach((b) => {
    const guest = isAr ? b.guestName : (b.guestNameEn || b.guestName);
    const room = isAr ? b.room : (b.roomEn || b.room);
    const checkIn = isAr ? b.checkInFormatted : b.checkIn;
    const checkOut = isAr ? b.checkOutFormatted : b.checkOut;
    const statusText = isAr ? b.statusText : (b.statusTextEn || b.statusText);
    
    let badgeClass = 'badge-paid';
    if (b.status === 'deposit') badgeClass = 'badge-deposit';
    if (b.status === 'pending') badgeClass = 'badge-pending';

    let actionBtn = '';
    if (b.status === 'paid') {
      actionBtn = `<button class="pill-button" onclick="openGuestFolio('${guest.replace(/'/g, "\\'")}', '${room.replace(/'/g, "\\'")}', ${b.totalUSD}, '${b.id}')">${isAr ? 'عرض الفاتورة' : 'View Folio'}</button>`;
    } else if (b.status === 'deposit') {
      actionBtn = `<button class="pill-button" onclick="checkoutBooking('${b.roomNumber || '101'}', '${guest.replace(/'/g, "\\'")}', this)">${isAr ? 'تسجيل مغادرة' : 'Check-out'}</button>`;
    } else if (b.status === 'pending') {
      actionBtn = `<button class="pill-button active-toggle" onclick="confirmBooking('${b.id}', this)">${isAr ? 'تأكيد الحجز' : 'Confirm'}</button>`;
    } else {
      actionBtn = `<button class="pill-button" onclick="openKeyCardEncoder('${b.roomNumber || '202'}')">${isAr ? 'بطاقة المفتاح' : 'Key Card'}</button>`;
    }

    html += `
      <tr>
        <td><strong>#${b.id}</strong></td>
        <td>${guest}</td>
        <td>${room}</td>
        <td>${checkIn}</td>
        <td>${checkOut}</td>
        <td><span class="currency-display" data-usd="${b.totalUSD}">${formatMoney(b.totalUSD)}</span></td>
        <td><span class="table-badge ${badgeClass}">${statusText}</span></td>
        <td>${actionBtn}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// Save System Settings
function saveSystemSettings() {
  const rateInput = document.getElementById('settingExchangeRate');
  if (rateInput) {
    const newRate = parseFloat(rateInput.value) || 1310;
    state.exchangeRate = newRate;
    updateFinancialMetrics();
    renderLineChart();
  }

  // Update manager profile if edited in Settings view
  const setInputName = document.getElementById('settingManagerNameInput');
  const setInputRole = document.getElementById('settingManagerRoleInput');
  const setInputEmail = document.getElementById('settingManagerEmailInput');

  if (setInputName && setInputName.value.trim()) {
    state.manager.name = setInputName.value.trim();
    if (setInputRole && setInputRole.value.trim()) state.manager.role = setInputRole.value.trim();
    if (setInputEmail && setInputEmail.value.trim()) state.manager.email = setInputEmail.value.trim();

    try {
      localStorage.setItem('grandstay_manager_profile', JSON.stringify(state.manager));
    } catch (e) {
      console.error(e);
    }
    updateManagerDisplay();
  }

  showToast(state.lang === 'ar' ? 'تم حفظ وتطبيق إعدادات المنظومة وبيانات المدير بنجاح!' : 'System settings & manager profile updated successfully!');
}

// Initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Apply initial translations
  applyTranslations();
  initManagerProfile();
  initVipGuest();
  renderDonutChart();
  renderLineChart();
  renderHousekeepingChips();
  renderCalendar();
  renderKanbanBoard();
  renderTapeChart();
  renderBookingsTable();
  renderNotifications();
  renderStaffTable();
  renderHandoverNotes();
  renderStaffManagementCards();
  renderStaffManagementTable();
  updateStaffManagementKPIs();
  populateAttendanceEmployeeSelect();

  // Attach navigation switcher to all sidebar items
  document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const navTarget = item.getAttribute('data-nav');
      if (navTarget) {
        switchView(navTarget);
      }
    });
  });

  // Attach event listeners
  document.getElementById('langToggleBtn').addEventListener('click', toggleLanguage);
  document.getElementById('currencyToggleBtn').addEventListener('click', toggleCurrency);

  const profBtn = document.getElementById('userProfileBtn');
  if (profBtn) profBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleProfileDropdown(); });

  const newBookingBtn = document.getElementById('newBookingBtn');
  if (newBookingBtn) newBookingBtn.addEventListener('click', openBookingModal);

  const closeModalBtn = document.getElementById('closeModalBtn');
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeBookingModal);

  const cancelModalBtn = document.getElementById('cancelModalBtn');
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeBookingModal);

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) bookingForm.addEventListener('submit', submitBookingForm);

  const bookingNights = document.getElementById('bookingNights');
  if (bookingNights) bookingNights.addEventListener('input', updateEstimatedPrice);

  const bookingRoomType = document.getElementById('bookingRoomType');
  if (bookingRoomType) bookingRoomType.addEventListener('change', updateEstimatedPrice);

  const nightAuditTrigger = document.getElementById('nightAuditTrigger');
  if (nightAuditTrigger) nightAuditTrigger.addEventListener('click', openNightAuditModal);

  // Close dropdowns and modals when clicking backdrop
  document.addEventListener('click', (e) => {
    const notifDD = document.getElementById('notificationDropdown');
    const notifBtn = document.getElementById('notifBellBtn');
    if (notifDD && notifDD.classList.contains('active')) {
      if (!notifDD.contains(e.target) && !notifBtn?.contains(e.target) && e.target !== notifBtn) {
        notifDD.classList.remove('active');
      }
    }
    const profDD = document.getElementById('profileDropdown');
    if (profDD && profDD.classList.contains('active')) {
      if (!profDD.contains(e.target) && !profBtn?.contains(e.target) && e.target !== profBtn) {
        profDD.classList.remove('active');
      }
    }
  });

  // Modal backdrop click to close
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Initialize Advanced Global Omnisearch Engine
  initGlobalSearch();
});

// ====================================================================
// Global Omnisearch & Instant Intelligence Engine
// ====================================================================
let selectedSearchIndex = -1;

function escapeRegex(str) {
  return str.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

function highlightQuery(text, query) {
  if (!query || !text) return text;
  try {
    const escaped = escapeRegex(query);
    const regex = new RegExp(`(${escaped})`, 'gi');
    return String(text).replace(regex, '<mark class="search-highlight">$1</mark>');
  } catch (e) {
    return text;
  }
}

function highlightBookingRow(bookingId) {
  setTimeout(() => {
    const rows = document.querySelectorAll('#bookingsTableBody tr');
    let targetRow = null;
    rows.forEach(r => {
      if (r.innerText.includes(bookingId)) {
        targetRow = r;
      }
    });
    if (targetRow) {
      targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetRow.classList.remove('search-row-highlight');
      void targetRow.offsetWidth;
      targetRow.classList.add('search-row-highlight');
    }
  }, 120);
}

function highlightStaffRow(staffId) {
  setTimeout(() => {
    const rows = document.querySelectorAll('#staffTableBody tr');
    let targetRow = null;
    const staff = state.staffList.find(s => s.id === staffId);
    if (!staff) return;
    rows.forEach(r => {
      if (r.innerText.includes(staff.name)) {
        targetRow = r;
      }
    });
    if (targetRow) {
      targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetRow.classList.remove('search-row-highlight');
      void targetRow.offsetWidth;
      targetRow.classList.add('search-row-highlight');
    }
  }, 120);
}

function initGlobalSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  const clearBtn = document.getElementById('globalSearchClearBtn');
  const dropdown = document.getElementById('searchResultsDropdown');
  const container = document.getElementById('globalSearchContainer');

  if (!searchInput || !dropdown) return;

  // Global Keyboard Shortcut: Ctrl + K or /
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
      renderSearchResults(searchInput.value.trim());
    } else if (e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
      renderSearchResults(searchInput.value.trim());
    }
  });

  // Focus event: Open suggestions or search results
  searchInput.addEventListener('focus', () => {
    renderSearchResults(searchInput.value.trim());
  });

  // Input event: Filter active table and render dropdown
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (clearBtn) {
      clearBtn.style.display = q ? 'flex' : 'none';
    }
    filterCurrentActiveView(q);
    renderSearchResults(q);
  });

  // Key navigation in dropdown
  searchInput.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.search-result-item');
    if (e.key === 'Escape') {
      closeSearchDropdown();
      searchInput.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length > 0) {
        selectedSearchIndex = (selectedSearchIndex + 1) % items.length;
        updateSelectedSearchItem(items);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length > 0) {
        selectedSearchIndex = (selectedSearchIndex - 1 + items.length) % items.length;
        updateSelectedSearchItem(items);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items.length > 0) {
        const itemToClick = (selectedSearchIndex >= 0 && selectedSearchIndex < items.length)
          ? items[selectedSearchIndex]
          : items[0];
        if (itemToClick) itemToClick.click();
      }
    }
  });

  // Clear button click
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchInput.value = '';
      clearBtn.style.display = 'none';
      filterCurrentActiveView('');
      closeSearchDropdown();
      searchInput.focus();
    });
  }

  // Click outside closes dropdown
  document.addEventListener('click', (e) => {
    if (container && !container.contains(e.target)) {
      closeSearchDropdown();
    }
  });
}

function updateSelectedSearchItem(items) {
  items.forEach((item, idx) => {
    if (idx === selectedSearchIndex) {
      item.classList.add('selected');
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      item.classList.remove('selected');
    }
  });
}

function closeSearchDropdown() {
  const dropdown = document.getElementById('searchResultsDropdown');
  if (dropdown) {
    dropdown.style.display = 'none';
    dropdown.innerHTML = '';
  }
  selectedSearchIndex = -1;
}

function filterCurrentActiveView(query) {
  const q = query.toLowerCase();

  // If on bookings view, filter table
  const bookingRows = document.querySelectorAll('#bookingsTableBody tr');
  if (bookingRows.length > 0) {
    bookingRows.forEach(row => {
      if (!q) {
        row.style.display = '';
      } else {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      }
    });
  }

  // If on attendance view, filter table
  const staffRows = document.querySelectorAll('#staffTableBody tr');
  if (staffRows.length > 0) {
    staffRows.forEach(row => {
      if (!q) {
        row.style.display = '';
      } else {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      }
    });
  }

  // If on staff management view, filter directory table and cards
  const staffDirRows = document.querySelectorAll('#staffDirectoryTableBody tr');
  if (staffDirRows.length > 0) {
    staffDirRows.forEach(row => {
      if (!q) {
        row.style.display = '';
      } else {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      }
    });
  }
  const empCards = document.querySelectorAll('.employee-card');
  if (empCards.length > 0) {
    empCards.forEach(card => {
      if (!q) {
        card.style.display = 'flex';
      } else {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(q) ? 'flex' : 'none';
      }
    });
  }
}

function makeSearchItem(onclickStr, icon, bg, color, titleHtml, subHtml, badgeText, badgeClass) {
  return `
    <div class="search-result-item" onclick="${onclickStr}">
      <div class="search-item-left">
        <div class="search-item-icon" style="background:${bg};color:${color};">${icon}</div>
        <div class="search-item-text">
          <div class="search-item-title">${titleHtml}</div>
          <div class="search-item-subtitle">${subHtml}</div>
        </div>
      </div>
      <span class="search-item-tag table-badge ${badgeClass}">${badgeText}</span>
    </div>
  `;
}

function renderSearchResults(query) {
  const dropdown = document.getElementById('searchResultsDropdown');
  if (!dropdown) return;

  selectedSearchIndex = -1;
  const isAr = state.lang === 'ar';
  const q = query.toLowerCase().trim();

  if (!q) {
    const quickActions = [
      { fn: 'openBookingModal()', icon: '➕', bg: 'rgba(139, 92, 246, 0.15)', col: '#7C3AED', titleAr: 'إنشاء حجز فندقي جديد', titleEn: 'New Reservation Booking', subAr: 'فتح استمارة حجز غرفة أو جناح مع احتساب التكلفة', subEn: 'Open booking dialog with live price calculation', tagAr: 'حجز +', tagEn: 'New +', tagClass: 'badge-paid' },
      { fn: 'openAttendanceModal()', icon: '⏱️', bg: 'rgba(56, 189, 248, 0.15)', col: '#0284C7', titleAr: 'تسجيل حركة حضور / انصراف', titleEn: 'Staff Check-in / Out', subAr: 'توثيق دوام موظفي الاستقبال والتدبير الفندقي', subEn: 'Log staff attendance, break, or checkout', tagAr: 'دوام', tagEn: 'Shift', tagClass: 'badge-deposit' },
      { fn: 'openVipModal()', icon: '👑', bg: 'rgba(251, 146, 60, 0.15)', col: '#D97706', titleAr: 'استقبال النزيل المميز VIP (د. طارق الحكيم)', titleEn: 'VIP Guest Arrival (Dr. Tariq)', subAr: 'جناح الرويال الفاخر 402 • باقة الضيافة الفاخرة', subEn: 'Royal Luxury Suite 402 • VIP amenities', tagAr: 'VIP', tagEn: 'VIP', tagClass: 'badge-paid' },
      { fn: 'openNightAuditModal()', icon: '🌙', bg: 'rgba(109, 40, 217, 0.15)', col: '#6D28D9', titleAr: 'الإقفال اليومي وتدقيق الحسابات (Night Audit)', titleEn: 'Daily Night Audit & Settlement', subAr: 'ترحيل الإيرادات اليومية وتجميد اليوم المالي', subEn: 'Post daily room charges & freeze audit day', tagAr: 'تدقيق', tagEn: 'Audit', tagClass: 'badge-paid' },
      { fn: 'openMaintenanceModal()', icon: '🔧', bg: 'rgba(239, 68, 68, 0.15)', col: '#DC2626', titleAr: 'تسجيل بلاغ صيانة طارئ', titleEn: 'Emergency Maintenance Request', subAr: 'إبلاغ الفريق الهندسي فورا عبر النظام', subEn: 'Notify engineering team of room maintenance', tagAr: 'صيانة', tagEn: 'Maint', tagClass: 'badge-cancel' }
    ];

    dropdown.innerHTML = `
      <div class="search-section-header">
        <span>⚡ ${isAr ? 'إجراءات سريعة واختصارات شائعة' : 'Quick Actions & Shortcuts'}</span>
        <span style="font-weight: normal; font-size: 0.68rem; color: #94A3B8;">${isAr ? 'انقر للبدء الفوري' : 'Click to launch'}</span>
      </div>
      ${quickActions.map(a => makeSearchItem(`closeSearchDropdown(); ${a.fn}`, a.icon, a.bg, a.col, isAr ? a.titleAr : a.titleEn, isAr ? a.subAr : a.subEn, isAr ? a.tagAr : a.tagEn, a.tagClass)).join('')}
    `;
    dropdown.style.display = 'block';
    return;
  }

  // 1. Bookings & Guests
  const matchedBookings = state.bookings.filter(b => {
    return b.guestName.toLowerCase().includes(q) ||
      (b.guestNameEn && b.guestNameEn.toLowerCase().includes(q)) ||
      b.id.toLowerCase().includes(q) ||
      b.room.toLowerCase().includes(q) ||
      (b.roomEn && b.roomEn.toLowerCase().includes(q)) ||
      (b.roomNumber && b.roomNumber.toLowerCase().includes(q));
  });

  // 2. Rooms
  const matchedRooms = state.rooms.filter(r => {
    return r.number.toLowerCase().includes(q) ||
      (r.typeName && r.typeName.ar && r.typeName.ar.toLowerCase().includes(q)) ||
      (r.typeName && r.typeName.en && r.typeName.en.toLowerCase().includes(q)) ||
      (r.status && r.status.toLowerCase().includes(q));
  });

  // 3. Staff & Team
  const matchedStaff = state.staffList.filter(s => {
    return s.name.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q) ||
      s.dept.toLowerCase().includes(q) ||
      s.shiftNameAr.toLowerCase().includes(q) ||
      (s.shiftNameEn && s.shiftNameEn.toLowerCase().includes(q));
  });

  // 4. Quick Actions Matching
  const systemActions = [
    { titleAr: 'إنشاء حجز جديد +', titleEn: 'New Reservation +', descAr: 'فتح نافذة حجز غرفة جديدة', descEn: 'Open new booking modal', icon: '➕', action: openBookingModal, badge: 'حجز', badgeClass: 'badge-paid', keywords: ['حجز', 'booking', 'new', 'reserve'] },
    { titleAr: 'تسجيل حركة حضور وانصراف', titleEn: 'Record Staff Attendance', descAr: 'توثيق دوام موظفي الفندق والمناوبات', descEn: 'Log staff attendance movement', icon: '⏱️', action: openAttendanceModal, badge: 'دوام', badgeClass: 'badge-deposit', keywords: ['حضور', 'انصراف', 'دوام', 'attendance', 'shift'] },
    { titleAr: 'استقبال وتجهيز جناح VIP', titleEn: 'VIP Guest Arrival & Setup', descAr: 'استقبال الدكتور طارق وتأكيد جاهزية الجناح', descEn: 'VIP suite preparation and guest welcome', icon: '👑', action: openVipModal, badge: 'VIP', badgeClass: 'badge-paid', keywords: ['vip', 'نزيل', 'طارق', 'جناح'] },
    { titleAr: 'الإقفال اليومي (Night Audit)', titleEn: 'Night Audit & Financial Close', descAr: 'تجميد اليوم المالي وتوليد كشف الإيرادات', descEn: 'Run daily audit and revenue posting', icon: '🌙', action: openNightAuditModal, badge: 'تدقيق', badgeClass: 'badge-paid', keywords: ['اقفال', 'إقفال', 'تدقيق', 'audit', 'night'] },
    { titleAr: 'سجل حضور الشهر السابق', titleEn: 'Previous Month Attendance Log', descAr: 'أرشيف ساعات الدوام وتصدير كشف Excel', descEn: 'Historical staff log and CSV export', icon: '📊', action: openPreviousMonthAttendanceModal, badge: 'أرشيف', badgeClass: 'badge-paid', keywords: ['شهر', 'سابق', 'ارشيف', 'أرشيف', 'تصدير', 'excel', 'csv'] },
    { titleAr: 'توزيع مهام التدبير الفندقي', titleEn: 'Assign Housekeeping Tasks', descAr: 'توزيع تفتيش ونظافة الطوابق على الطاقم', descEn: 'Distribute floor cleaning tasks', icon: '🧹', action: openAssignTasksModal, badge: 'مهام', badgeClass: 'badge-paid', keywords: ['مهام', 'توزيع', 'نظافة', 'تنظيف', 'housekeeping', 'clean'] },
    { titleAr: 'تسجيل بلاغ صيانة طارئ', titleEn: 'Log Maintenance Ticket', descAr: 'إخطار الفنيين بإصلاح عطل غرفة', descEn: 'Report emergency room repair', icon: '🔧', action: openMaintenanceModal, badge: 'صيانة', badgeClass: 'badge-cancel', keywords: ['صيانة', 'عطل', 'repair', 'maintenance'] },
    { titleAr: 'لوحة التحكم الرئيسية', titleEn: 'Overview Dashboard', descAr: 'الانتقال إلى مؤشرات الأداء والإشغال الفوري', descEn: 'Navigate to PMS Dashboard overview', icon: '🏠', action: () => switchView('overview'), badge: 'قسم', badgeClass: 'badge-paid', keywords: ['لوحة', 'تحكم', 'رئيسية', 'dashboard', 'overview'] },
    { titleAr: 'الحجوزات والتقويم', titleEn: 'Bookings & Calendar', descAr: 'الانتقال إلى جدول الحجوزات والـ Tape Chart', descEn: 'Navigate to Bookings & Tape Chart', icon: '📅', action: () => switchView('bookings'), badge: 'قسم', badgeClass: 'badge-paid', keywords: ['حجوزات', 'تقويم', 'جدول', 'calendar', 'tape'] },
    { titleAr: 'إدارة شؤون الموظفين (Staff & HR)', titleEn: 'Staff & HR Directory', descAr: 'دليل الكادر الفندقي، مسير الرواتب والعقود', descEn: 'Employee directory, payroll and contracts', icon: '👥', action: () => switchView('staff'), badge: 'قسم', badgeClass: 'badge-paid', keywords: ['موظف', 'موظفين', 'كادر', 'فريق', 'رواتب', 'راتب', 'عقود', 'hr', 'staff', 'employee'] },
    { titleAr: 'إضافة موظف جديد +', titleEn: 'Hire New Employee +', descAr: 'تسجيل موظف جديد وتحديد الراتب والمناوبة', descEn: 'Onboard new staff member and set salary', icon: '👤', action: openAddEmployeeModal, badge: 'موظف', badgeClass: 'badge-paid', keywords: ['اضافة موظف', 'تعيين', 'hire', 'onboard'] },
    { titleAr: 'سجل الحضور وإدارة المناوبات', titleEn: 'Staff & Shifts View', descAr: 'الانتقال إلى سجل دوام طاقم الفندق', descEn: 'Navigate to Staff Attendance & Shifts', icon: '⏱️', action: () => switchView('attendance'), badge: 'قسم', badgeClass: 'badge-paid', keywords: ['طاقم', 'مناوبات', 'shifts', 'attendance'] },
    { titleAr: 'لوحة التدبير الفندقي (Kanban)', titleEn: 'Housekeeping Kanban Board', descAr: 'الانتقال إلى بطاقات نظافة الغرف والصيانة', descEn: 'Navigate to Housekeeping Kanban', icon: '🧼', action: () => switchView('housekeeping'), badge: 'قسم', badgeClass: 'badge-paid', keywords: ['تدبير', 'نظافة', 'كانبان', 'kanban'] },
    { titleAr: 'التقارير والتحليلات المالية', titleEn: 'Financial Reports & Analytics', descAr: 'الانتقال إلى الرسوم البيانية ومؤشرات RevPAR', descEn: 'Navigate to Financial Analytics', icon: '📈', action: () => switchView('analytics'), badge: 'قسم', badgeClass: 'badge-paid', keywords: ['تقارير', 'تحليلات', 'مالية', 'ارباح', 'analytics', 'reports'] },
    { titleAr: 'إعدادات المنظومة', titleEn: 'System Settings', descAr: 'تعديل سعر الصرف وبيانات المدير العام', descEn: 'Navigate to System Settings', icon: '⚙️', action: () => switchView('settings'), badge: 'قسم', badgeClass: 'badge-paid', keywords: ['إعدادات', 'اعدادات', 'مدير', 'صرف', 'settings'] }
  ];

  const matchedActions = systemActions.filter(act => {
    return act.titleAr.toLowerCase().includes(q) ||
      act.titleEn.toLowerCase().includes(q) ||
      act.keywords.some(k => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()));
  });

  const totalMatches = matchedBookings.length + matchedRooms.length + matchedStaff.length + matchedActions.length;

  if (totalMatches === 0) {
    dropdown.innerHTML = `
      <div class="search-empty-state">
        <div class="search-empty-icon">🔍</div>
        <strong style="color:#1E293B; display:block; margin-bottom:4px;">${isAr ? 'لم يتم العثور على نتائج تطابق:' : 'No matches found for:'} "${query}"</strong>
        <p style="font-size:0.8rem; color:#64748B;">${isAr ? 'جرب البحث باسم النزيل، رقم الغرفة (مثل 101)، كود الحجز (مثل BK-9104)، أو اسم الموظف.' : 'Try searching for guest name, room number, booking ID, or staff.'}</p>
      </div>
    `;
    dropdown.style.display = 'block';
    return;
  }

  let html = '';

  // Render Bookings
  if (matchedBookings.length > 0) {
    html += `<div class="search-section-header"><span>🏨 ${isAr ? 'الحجوزات والنزلاء' : 'Bookings & Guests'} (${matchedBookings.length})</span></div>`;
    html += matchedBookings.slice(0, 4).map(b => {
      const gName = isAr ? b.guestName : (b.guestNameEn || b.guestName);
      const rName = isAr ? b.room : (b.roomEn || b.room);
      const bClass = b.status === 'deposit' ? 'badge-deposit' : (b.status === 'pending' ? 'badge-cancel' : 'badge-paid');
      return makeSearchItem(
        `selectSearchBooking('${b.id}')`, '🏨', 'rgba(139, 92, 246, 0.15)', '#7C3AED',
        `${highlightQuery(gName, query)} <span style="color:#7C3AED; font-weight:800;">[${highlightQuery(b.id, query)}]</span>`,
        `${highlightQuery(rName, query)} • ${b.checkInFormatted} - ${b.checkOutFormatted} • <strong style="color:#059669;">${formatMoney(b.totalUSD)}</strong>`,
        isAr ? b.statusText : (b.statusTextEn || b.statusText), bClass
      );
    }).join('');
  }

  // Render Rooms
  if (matchedRooms.length > 0) {
    html += `<div class="search-section-header"><span>🚪 ${isAr ? 'الغرف والأجنحة' : 'Rooms & Suites'} (${matchedRooms.length})</span></div>`;
    html += matchedRooms.slice(0, 4).map(r => {
      const typeText = r.typeName[state.lang] || r.typeName.ar;
      let statusBadge = 'badge-paid', statusLabel = isAr ? 'نظيفة وجاهزة' : 'Clean & Ready';
      if (r.status === 'dirty') { statusBadge = 'badge-deposit'; statusLabel = isAr ? 'متسخة بحاجة لتنظيف' : 'Dirty'; }
      else if (r.status === 'maint') { statusBadge = 'badge-cancel'; statusLabel = isAr ? 'تحت الصيانة' : 'Maintenance'; }
      else if (r.status === 'occupied') { statusBadge = 'badge-paid'; statusLabel = isAr ? 'مشغولة حالياً' : 'Occupied'; }
      return makeSearchItem(
        `selectSearchRoom('${r.number}')`, '🚪', 'rgba(56, 189, 248, 0.15)', '#0284C7',
        `${isAr ? 'غرفة رقم' : 'Room #'} ${highlightQuery(r.number, query)} • ${highlightQuery(typeText, query)}`,
        `${isAr ? 'الحالة الحالية:' : 'Current Status:'} ${statusLabel}`,
        statusLabel, statusBadge
      );
    }).join('');
  }

  // Render Staff
  if (matchedStaff.length > 0) {
    html += `<div class="search-section-header"><span>👤 ${isAr ? 'طاقم العمل والمناوبات' : 'Staff & Shifts'} (${matchedStaff.length})</span></div>`;
    html += matchedStaff.slice(0, 3).map(s => {
      const bClass = s.status === 'duty' ? 'badge-paid' : (s.status === 'break' ? 'badge-cancel' : 'badge-deposit');
      return makeSearchItem(
        `selectSearchStaff('${s.id}')`, '👤', 'rgba(16, 185, 129, 0.15)', '#059669',
        highlightQuery(s.name, query),
        `${highlightQuery(s.role, query)} • ${s.dept} (${isAr ? s.shiftNameAr : s.shiftNameEn})`,
        isAr ? s.statusTextAr : s.statusTextEn, bClass
      );
    }).join('');
  }

  // Render Quick Actions
  if (matchedActions.length > 0) {
    html += `<div class="search-section-header"><span>⚡ ${isAr ? 'إجراءات وأقسام مقترحة' : 'Suggested Actions & Views'} (${matchedActions.length})</span></div>`;
    html += matchedActions.slice(0, 4).map((act, idx) => makeSearchItem(
      `selectSearchAction(${idx})`, act.icon, 'rgba(139, 92, 246, 0.15)', '#7C3AED',
      highlightQuery(isAr ? act.titleAr : act.titleEn, query),
      isAr ? act.descAr : act.descEn,
      act.badge, act.badgeClass
    )).join('');
  }

  dropdown.innerHTML = html;
  dropdown.style.display = 'block';

  window._currentMatchedActions = matchedActions;
}

function selectSearchAction(actionIdx) {
  closeSearchDropdown();
  if (window._currentMatchedActions && window._currentMatchedActions[actionIdx]) {
    const act = window._currentMatchedActions[actionIdx];
    if (typeof act.action === 'function') {
      act.action();
    }
  }
}

function selectSearchBooking(bookingId) {
  closeSearchDropdown();
  switchView('bookings');
  highlightBookingRow(bookingId);
  const b = state.bookings.find(item => item.id === bookingId);
  if (b) {
    showToast(state.lang === 'ar' ? `تم تحديد حجز النزيل: ${b.guestName} (${b.id})` : `Selected reservation: ${b.guestName} (${b.id})`);
  }
}

function selectSearchRoom(roomNumber) {
  closeSearchDropdown();
  const room = state.rooms.find(r => r.number === roomNumber);
  if (!room) return;

  if (room.status === 'dirty' || room.status === 'maint') {
    switchView('housekeeping');
    showToast(state.lang === 'ar' ? `الانتقال للتدبير الفندقي لمتابعة غرفة #${roomNumber}` : `Navigated to housekeeping for room #${roomNumber}`);
  } else {
    switchView('overview');
    showToast(state.lang === 'ar' ? `غرفة #${roomNumber} (${room.typeName.ar}) - ${room.status === 'clean' ? 'شاغرة نظيفة' : 'مشغولة'}` : `Room #${roomNumber} (${room.typeName.en})`);
  }
}

function selectSearchStaff(staffId) {
  closeSearchDropdown();
  switchView('staff');
  openEmployeeProfileModal(staffId);
  setTimeout(() => {
    const card = document.getElementById(`empCard-${staffId}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.remove('search-row-highlight');
      void card.offsetWidth;
      card.classList.add('search-row-highlight');
    }
  }, 100);
}
