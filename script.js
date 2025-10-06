// === Scroll Progress Bar ===
window.addEventListener("scroll", () => {
    const progressBar = document.getElementById("progress-bar");
    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    ) - window.innerHeight;

    const scrollY = window.scrollY;
    const scrollPercentage = documentHeight > 0 ? (scrollY / documentHeight) * 100 : 0;

    progressBar.style.width = `${scrollPercentage}%`;
});


// 1. تعريف بيانات الكواكب والمسافات
// 1. تعريف بيانات الكواكب والمسافات
// تم تحويل السنوات الضوئية التي زودتنا بها إلى ساعات ضوئية (القيمة الأصلية × 8766)
const planetsLightYear = [
    // عطارد: 0.00000612 * 8766 ≈ 0.0537
    { name: "عطارد (Mercury)", lightHours: 0.05370432, scrollPosition: 200 },
    // الزهرة: 0.00001143 * 8766 ≈ 0.1002
    { name: "الزهرة (Venus)", lightHours: 0.10020198, scrollPosition: 500 },
    // الأرض: 0.00001581 * 8766 ≈ 0.1386
    { name: "الأرض (Earth)", lightHours: 0.13867626, scrollPosition: 800 },
    // المريخ: 0.00002411 * 8766 ≈ 0.2114
    { name: "المريخ (Mars)", lightHours: 0.21142206, scrollPosition: 1200 },
    // المشتري: 0.00008233 * 8766 ≈ 0.7214
    { name: "المشتري (Jupiter)", lightHours: 0.72145378, scrollPosition: 1600 },
    // زحل: 0.00015167 * 8766 ≈ 1.3308
    { name: "زحل (Saturn)", lightHours: 1.33077702, scrollPosition: 2000 },
    // أورانوس: 0.0003037 * 8766 ≈ 2.6616
    { name: "أورانوس (Uranus)", lightHours: 2.6616462, scrollPosition: 2400 },
    // نبتون: 0.0004744 * 8766 ≈ 4.1578
    { name: "نبتون (Neptune)", lightHours: 4.1578944, scrollPosition: 2800 },
];

// 2. العناصر التي سيتم تحديثها
const lightTimeElement = document.getElementById('lightTime');
const currentLocationElement = document.getElementById('currentLocation');

// 3. دالة معالجة حدث التمرير
function updateStatusOnScroll() {
    const scrollY = window.scrollY;

    // تم تغيير اسم المتغير إلى lightHours
    let currentPlanet = { name: "الشمس", lightHours: 0 };
    let maxScrollForLightTime = 0;

    for (let i = planetsLightYear.length - 1; i >= 0; i--) {
        const planet = planetsLightYear[i];
        if (scrollY >= planet.scrollPosition) {
            currentPlanet = planet;

            // حساب النسبة المئوية بين موقع الكوكب السابق والحالي
            const prevScroll = (i > 0) ? planetsLightYear[i - 1].scrollPosition : 0;
            const prevLightHours = (i > 0) ? planetsLightYear[i - 1].lightHours : 0; // استخدام lightHours

            const scrollRange = planet.scrollPosition - prevScroll;
            const lightHoursRange = planet.lightHours - prevLightHours; // استخدام lightHours

            // حساب الزمن الضوئي كقيمة متدرجة
            if (scrollRange > 0) {
                const progress = (scrollY - prevScroll) / scrollRange;
                const interpolatedLightTime = prevLightHours + (lightHoursRange * progress);
                maxScrollForLightTime = interpolatedLightTime;
            } else {
                maxScrollForLightTime = planet.lightHours;
            }

            // تحديث اسم الكوكب
            currentLocationElement.textContent = currentPlanet.name;
            break;
        }
    }

    // إذا كان موقع التمرير أقل من أول كوكب
    if (scrollY < planetsLightYear[0].scrollPosition) {
        currentLocationElement.textContent = "الشمس";
        const firstPlanet = planetsLightYear[0];
        const progress = scrollY / firstPlanet.scrollPosition;
        maxScrollForLightTime = firstPlanet.lightHours * progress;
    }

    // تنسيق الزمن الضوئي وعرضه
    // نستخدم toFixed لتحديد عدد المنازل العشرية (يمكنك تقليلها إذا أردت رؤية أرقام أقل)
    let unit = ' ساعة ضوئية';

    // يمكننا تحويل القيمة إلى دقائق ضوئية إذا كانت صغيرة جداً (< 1 ساعة) لتبدو طبيعية أكثر
    let displayTime = maxScrollForLightTime;
    if (displayTime < 1) {
        displayTime = maxScrollForLightTime * 60; // التحويل إلى دقائق
        unit = ' دقيقة ضوئية';
    }

    // عرض الزمن الضوئي (إما بالساعات أو الدقائق)
    lightTimeElement.textContent = displayTime.toFixed(2) + unit;

}

// 4. ربط الدالة بحدث التمرير
window.addEventListener('scroll', updateStatusOnScroll);

// تشغيل الدالة عند تحميل الصفحة للتأكد من الحالة الأولية
updateStatusOnScroll();

// بيانات الكواكب
const planetsData = {
    venus: {
        name: "الزهرة",
        englishName: "Venus",
        lightTime: "٥ دقائق",
        mainFact: "أسخن كوكب في النظام الشمسي",
        diameter: "١٢,١٠٤ كم",
        distance: "١٠٨.٢ مليون كم",
        day: "٢٤٣ يوم أرضي",
        year: "٢٢٥ يوم أرضي",
        fact: "يدور في الاتجاه المعاكس",
        color: "bg-yellow-500",
        shadow: "rgba(255,200,150,0.3)",
        quizQuestion: "لماذا تُسمّى الزهرة بـ 'توأم الأرض'؟",
        quizOptions: [
            "أ. بسبب تشابه الحجم والكتلة",
            "ب. لأنها أقرب كوكب للأرض",
            "ج. لأنها تظهر في السماء كنجم ساطع",
            "د. لأنها تحتوي على غلاف جوي مشابه",
        ],
        correctAnswer: 0,
    },
    earth: {
        name: "الأرض",
        englishName: "Earth",
        lightTime: "٨ دقائق",
        mainFact: "الكوكب الوحيد المعروف بوجود الحياة",
        diameter: "١٢,٧٤٢ كم",
        distance: "١٤٩.٦ مليون كم",
        day: "٢٤ ساعة",
        year: "٣٦٥.٢٥ يوم",
        fact: "٧١٪ من سطحها محيطات",
        color: "bg-blue-500",
        shadow: "rgba(59,130,246,0.3)",
        quizQuestion: "ما نسبة المياه على سطح الأرض؟",
        quizOptions: [
            "أ. ٧١٪",
            "ب. ٦٥٪",
            "ج. ٨٠٪",
            "د. ٥٥٪",
        ],
        correctAnswer: 0,
    },
    mars: {
        name: "المريخ",
        englishName: "Mars",
        lightTime: "١٣ دقيقة",
        mainFact: "الكوكب الأحمر",
        diameter: "٦,٧٩٢ كم",
        distance: "٢٢٧.٩ مليون كم",
        day: "٢٤.٦ ساعة",
        year: "٦٨٧ يوم أرضي",
        fact: "يحتوي على أعلى جبل في النظام الشمسي",
        color: "bg-red-500",
        shadow: "rgba(239,68,68,0.3)",
        quizQuestion: "لماذا يُسمّى المريخ بالكوكب الأحمر؟",
        quizOptions: [
            "أ. بسبب أكسيد الحديد (الصدأ)",
            "ب. بسبب درجة الحرارة العالية",
            "ج. بسبب الغلاف الجوي",
            "د. بسبب البراكين",
        ],
        correctAnswer: 0,
    },
    jupiter: {
        name: "المشتري",
        englishName: "Jupiter",
        lightTime: "٤٣ دقيقة",
        mainFact: "أكبر كوكب في النظام الشمسي",
        diameter: "١٣٩,٨٢٠ كم",
        distance: "٧٧٨.٥ مليون كم",
        day: "٩.٩ ساعة",
        year: "١١.٩ سنة أرضية",
        fact: "له أكثر من ٧٩ قمراً",
        color: "bg-orange-500",
        shadow: "rgba(249,115,22,0.3)",
        quizQuestion: "ما اسم أكبر قمر للمشتري؟",
        quizOptions: [
            "أ. غانيميد",
            "ب. يوروبا",
            "ج. إيو",
            "د. كاليستو",
        ],
        correctAnswer: 0,
    },
    saturn: {
        name: "زحل",
        englishName: "Saturn",
        lightTime: "٧٩ دقيقة",
        mainFact: "سيد الحلقات",
        diameter: "١١٦,٤٦٠ كم",
        distance: "١.٤ مليار كم",
        day: "١٠.٧ ساعة",
        year: "٢٩.٥ سنة أرضية",
        fact: "له أكثر من ٨٢ قمراً وحلقات رائعة",
        color: "bg-yellow-500",
        shadow: "rgba(234,179,8,0.3)",
        quizQuestion: "ما الذي يجعل زحل مميزاً عن باقي الكواكب؟",
        quizOptions: [
            "أ. حلقاته الرائعة المرئية",
            "ب. لونه الأزرق",
            "ج. صغر حجمه",
            "د. قربه من الشمس",
        ],
        correctAnswer: 0,
    },
    uranus: {
        name: "أورانوس",
        englishName: "Uranus",
        lightTime: "٢.٧ ساعة",
        mainFact: "الكوكب الجليدي",
        diameter: "٥١,١١٨ كم",
        distance: "٢.٩ مليار كم",
        day: "١٧.٢ ساعة",
        year: "٨٤ سنة أرضية",
        fact: "يدور على جانبه ويحتوي على جليد مائي",
        color: "bg-cyan-500",
        shadow: "rgba(34,197,94,0.3)",
        quizQuestion: "ما الذي يميز كوكب أورانوس عن باقي الكواكب؟",
        quizOptions: [
            "أ. يدور على جانبه",
            "ب. له حلقات ذهبية",
            "ج. الأقرب للشمس",
            "د. لونه أحمر",
        ],
        correctAnswer: 0,
    },
    neptune: {
        name: "نبتون",
        englishName: "Neptune",
        lightTime: "٤.٢ ساعة",
        mainFact: "عملاق المحيطات",
        diameter: "٤٩,٥٢٨ كم",
        distance: "٤.٥ مليار كم",
        day: "١٦.١ ساعة",
        year: "١٦٥ سنة أرضية",
        fact: "أقوى رياح في النظام الشمسي تصل ٢١٠٠ كم/س",
        color: "bg-blue-500",
        shadow: "rgba(59,130,246,0.3)",
        quizQuestion: "ما الذي يميز كوكب نبتون؟",
        quizOptions: [
            "أ. أقوى رياح في النظام الشمسي",
            "ب. الأقرب للشمس",
            "ج. له حلقات ذهبية",
            "د. صغر حجمه",
        ],
        correctAnswer: 0,
    },
};

let score = 0;

// عناصر DOM
const startJourneyBtn = document.getElementById("start-journey-btn");
const planetSections = document.querySelectorAll(".planet-section");
const quizPopup = document.getElementById("quiz-popup");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizNextBtn = document.getElementById("quiz-next-btn");
const currentLocation = document.getElementById("currentLocation");
const scoreElement = document.getElementById("score-value");
const confettiContainer = document.getElementById("confetti-container");

// تهيئة التطبيق
function init() {
    // إضافة الأحداث
    startJourneyBtn.addEventListener("click", startJourney);

    // إضافة أحداث لأزرار الاختبار
    document.querySelectorAll(".quiz-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            const planet = this.getAttribute("data-planet");
            showQuiz(planet);
        });
    });

    // إضافة حدث لإغلاق النافذة المنبثقة
    quizPopup.addEventListener("click", function (e) {
        if (e.target === quizPopup) {
            hideQuiz();
        }
    });

    // إضافة حدث للتمرير
    window.addEventListener("scroll", handleScroll);

    // تحديث النقاط
    updateScore();

    // تهيئة أول قسم كوكب
    if (planetSections.length > 0) {
        planetSections[0].classList.add("active");
    }
}

// بدء الرحلة
function startJourney() {
    console.log('Starting journey - going to Mercury first');
    document.querySelector("main").classList.add("hidden-section");
    document
        .getElementById("planets-container")
        .classList.remove("hidden-section");

    // التأكد من إعادة تعيين كل الكواكب للحالة الأصلية
    setTimeout(() => {
        resetMercuryToCenter();
        resetVenusToCenter();
        resetEarthToCenter();
        resetMarsToCenter();
        resetJupiterToCenter();
        resetSaturnToCenter();
        resetUranusToCenter();
        resetNeptuneToCenter();
    }, 100);

    // الذهاب لعطارد أولاً
    setTimeout(() => {
        scrollToPlanet("mercury-section");
    }, 300);
}

// التمرير إلى كوكب معين
function scrollToPlanet(planetId) {
    const planetSection = document.getElementById(planetId);
    if (planetSection) {
        planetSection.scrollIntoView({ behavior: "smooth" });

        // تحديث الموقع الحالي
        const planetName = planetSection.querySelector("h2").textContent;
        currentLocation.textContent = planetName;
    }
}

// التعامل مع التمرير
function handleScroll() {
    planetSections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;

        // إذا كان القسم مرئياً في الشاشة
        if (
            sectionTop < windowHeight * 0.75 &&
            sectionTop > -sectionHeight * 0.25
        ) {
            section.classList.add("active");

            // تحديث الموقع الحالي
            const planetName = section.querySelector("h2").textContent;
            currentLocation.textContent = planetName;
        }
    });
}

// عرض الاختبار
function showQuiz(planetKey) {
    const planet = planetsData[planetKey];

    // تحديث سؤال الاختبار
    quizQuestion.textContent = planet.quizQuestion;

    // تحديث خيارات الاختبار
    quizOptions.innerHTML = "";
    planet.quizOptions.forEach((option, index) => {
        const button = document.createElement("button");
        button.className =
            "w-full text-right bg-gray-800/80 border border-transparent text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-700/60 transition duration-300 shadow-md quiz-option";
        button.textContent = option;
        button.dataset.index = index;
        button.dataset.correct = index === planet.correctAnswer;
        button.addEventListener("click", selectAnswer);
        quizOptions.appendChild(button);
    });

    // إعادة تعيين زر التالي
    quizNextBtn.textContent = "التالي";
    quizNextBtn.onclick = function () {
        hideQuiz();
    };

    // عرض النافذة المنبثقة
    quizPopup.classList.add("active");
}

// إخفاء الاختبار
function hideQuiz() {
    quizPopup.classList.remove("active");
}

// اختيار إجابة
function selectAnswer(event) {
    const isCorrect = event.target.dataset.correct === "true";
    const options = document.querySelectorAll(".quiz-option");

    // إزالة التحديد من جميع الخيارات
    options.forEach((option) => {
        option.classList.remove(
            "bg-purple-700",
            "border-purple-400",
            "bg-green-600",
            "bg-red-600"
        );
        option.classList.add("bg-gray-800/80", "border-transparent");
    });

    // تحديد الخيار المختار
    if (isCorrect) {
        event.target.classList.remove("bg-gray-800/80", "border-transparent");
        event.target.classList.add("bg-green-600", "border-green-400");

        // زيادة النقاط
        score += 10;
        updateScore();

        // عرض المفرقعات
        showConfetti();

        // تحديث زر التالي
        quizNextBtn.textContent = "ممتاز! التالي";
    } else {
        event.target.classList.remove("bg-gray-800/80", "border-transparent");
        event.target.classList.add("bg-red-600", "border-red-400");

        // إظهار الإجابة الصحيحة
        options.forEach((option) => {
            if (option.dataset.correct === "true") {
                option.classList.remove("bg-gray-800/80", "border-transparent");
                option.classList.add("bg-green-600", "border-green-400");
            }
        });

        // تحديث زر التالي
        quizNextBtn.textContent = "حاول مرة أخرى! التالي";
    }
}

// عرض المفرقعات
function showConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e38a23", "#8b1c85", "#ffffff", "#ffd700"],
    });
}

// وظيفة إظهار معلومات كوكب عطارد
function showMercuryInfo() {
    const mercuryContainer = document.getElementById('mercury-container');
    const mercuryVisual = document.getElementById('mercury-visual');
    const mercuryInfo = document.getElementById('mercury-info');
    const mercuryTitle = document.getElementById('mercury-title');

    // إخفاء اسم الكوكب
    mercuryTitle.style.opacity = '0';

    // تحريك الكوكب لليسار وتصغيره
    setTimeout(() => {
        mercuryContainer.style.left = '20%';
        mercuryContainer.style.transform = 'translate(-50%, -50%)';
        mercuryVisual.style.width = '300px';
        mercuryVisual.style.height = '300px';
    }, 300);

    // إظهار البطاقة من اليمين
    setTimeout(() => {
        mercuryInfo.style.transform = 'translate(0%, -50%)';
        mercuryInfo.style.opacity = '1';
    }, 800);
}

// وظيفة منفصلة للانتقال من عطارد للزهرة
function continueFromMercury() {
    console.log('Continue from Mercury button clicked');
    const mercuryContainer = document.getElementById('mercury-container');
    const mercuryVisual = document.getElementById('mercury-visual');
    const mercuryInfo = document.getElementById('mercury-info');
    const mercuryTitle = document.getElementById('mercury-title');

    // إخفاء البطاقة أولاً
    mercuryInfo.style.transition = 'all 0.5s ease-in-out';
    mercuryInfo.style.transform = 'translate(100%, -50%)';
    mercuryInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    setTimeout(() => {
        mercuryContainer.style.transition = 'all 1s ease-in-out';
        mercuryContainer.style.left = '50%';
        mercuryContainer.style.top = '50%';
        mercuryContainer.style.transform = 'translate(-50%, -50%)';

        mercuryVisual.style.transition = 'all 1s ease-in-out';
        mercuryVisual.style.width = '400px';
        mercuryVisual.style.height = '400px';

        // إظهار اسم الكوكب
        mercuryTitle.style.opacity = '1';
    }, 200);

    // الانتقال للزهرة
    setTimeout(() => {
        scrollToPlanet('venus-section');
    }, 1500);
}

// وظيفة إعادة تعيين كوكب عطارد للحالة الأصلية
function resetMercuryToCenter() {
    const mercuryContainer = document.getElementById('mercury-container');
    const mercuryVisual = document.getElementById('mercury-visual');
    const mercuryInfo = document.getElementById('mercury-info');
    const mercuryTitle = document.getElementById('mercury-title');

    // إخفاء البطاقة تماماً
    mercuryInfo.style.transform = 'translate(100%, -50%)';
    mercuryInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    mercuryContainer.style.left = '50%';
    mercuryContainer.style.top = '50%';
    mercuryContainer.style.transform = 'translate(-50%, -50%)';

    // إرجاع حجم الكوكب للأصلي
    mercuryVisual.style.width = '400px';
    mercuryVisual.style.height = '400px';

    // إظهار اسم الكوكب
    mercuryTitle.style.opacity = '1';
}

// وظيفة إظهار معلومات كوكب الزهرة
function showVenusInfo() {
    const venusContainer = document.getElementById('venus-container');
    const venusVisual = document.getElementById('venus-visual');
    const venusInfo = document.getElementById('venus-info');
    const venusTitle = document.getElementById('venus-title');

    // إخفاء اسم الكوكب
    venusTitle.style.opacity = '0';

    // تحريك الكوكب لليسار وتصغيره
    setTimeout(() => {
        venusContainer.style.left = '20%';
        venusContainer.style.transform = 'translate(-50%, -50%)';
        venusVisual.style.width = '300px';
        venusVisual.style.height = '300px';
    }, 300);

    // إظهار البطاقة من اليمين
    setTimeout(() => {
        venusInfo.style.transform = 'translate(0%, -50%)';
        venusInfo.style.opacity = '1';
    }, 800);
}

// وظيفة الانتقال من الزهرة للأرض
function continueFromVenus() {
    console.log('Continue from Venus button clicked');
    const venusContainer = document.getElementById('venus-container');
    const venusVisual = document.getElementById('venus-visual');
    const venusInfo = document.getElementById('venus-info');
    const venusTitle = document.getElementById('venus-title');

    // إخفاء البطاقة أولاً
    venusInfo.style.transition = 'all 0.5s ease-in-out';
    venusInfo.style.transform = 'translate(100%, -50%)';
    venusInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    setTimeout(() => {
        venusContainer.style.transition = 'all 1s ease-in-out';
        venusContainer.style.left = '50%';
        venusContainer.style.top = '50%';
        venusContainer.style.transform = 'translate(-50%, -50%)';

        venusVisual.style.transition = 'all 1s ease-in-out';
        venusVisual.style.width = '400px';
        venusVisual.style.height = '400px';

        // إظهار اسم الكوكب
        venusTitle.style.opacity = '1';
    }, 200);

    // الانتقال للأرض
    setTimeout(() => {
        scrollToPlanet('earth-section');
    }, 1500);
}

// وظيفة إعادة تعيين كوكب الزهرة للحالة الأصلية
function resetVenusToCenter() {
    const venusContainer = document.getElementById('venus-container');
    const venusVisual = document.getElementById('venus-visual');
    const venusInfo = document.getElementById('venus-info');
    const venusTitle = document.getElementById('venus-title');

    // إخفاء البطاقة تماماً
    venusInfo.style.transform = 'translate(100%, -50%)';
    venusInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    venusContainer.style.left = '50%';
    venusContainer.style.top = '50%';
    venusContainer.style.transform = 'translate(-50%, -50%)';

    // إرجاع حجم الكوكب للأصلي
    venusVisual.style.width = '400px';
    venusVisual.style.height = '400px';

    // إظهار اسم الكوكب
    venusTitle.style.opacity = '1';
}

// وظيفة إظهار معلومات كوكب الأرض
function showEarthInfo() {
    const earthContainer = document.getElementById('earth-container');
    const earthVisual = document.getElementById('earth-visual');
    const earthInfo = document.getElementById('earth-info');
    const earthTitle = document.getElementById('earth-title');

    // إخفاء اسم الكوكب
    earthTitle.style.opacity = '0';

    // تحريك الكوكب لليسار وتصغيره
    setTimeout(() => {
        earthContainer.style.left = '20%';
        earthContainer.style.transform = 'translate(-50%, -50%)';
        earthVisual.style.width = '300px';
        earthVisual.style.height = '300px';
    }, 300);

    // إظهار البطاقة من اليمين
    setTimeout(() => {
        earthInfo.style.transform = 'translate(0%, -50%)';
        earthInfo.style.opacity = '1';
    }, 800);
}

// وظيفة الانتقال من الأرض للمريخ
function continueFromEarth() {
    console.log('Continue from Earth button clicked');
    const earthContainer = document.getElementById('earth-container');
    const earthVisual = document.getElementById('earth-visual');
    const earthInfo = document.getElementById('earth-info');
    const earthTitle = document.getElementById('earth-title');

    // إخفاء البطاقة أولاً
    earthInfo.style.transition = 'all 0.5s ease-in-out';
    earthInfo.style.transform = 'translate(100%, -50%)';
    earthInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    setTimeout(() => {
        earthContainer.style.transition = 'all 1s ease-in-out';
        earthContainer.style.left = '50%';
        earthContainer.style.top = '50%';
        earthContainer.style.transform = 'translate(-50%, -50%)';

        earthVisual.style.transition = 'all 1s ease-in-out';
        earthVisual.style.width = '400px';
        earthVisual.style.height = '400px';

        // إظهار اسم الكوكب
        earthTitle.style.opacity = '1';
    }, 200);

    // الانتقال للمريخ
    setTimeout(() => {
        scrollToPlanet('mars-section');
    }, 1500);
}

// وظيفة إعادة تعيين كوكب الأرض للحالة الأصلية
function resetEarthToCenter() {
    const earthContainer = document.getElementById('earth-container');
    const earthVisual = document.getElementById('earth-visual');
    const earthInfo = document.getElementById('earth-info');
    const earthTitle = document.getElementById('earth-title');

    // إخفاء البطاقة تماماً
    earthInfo.style.transform = 'translate(100%, -50%)';
    earthInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    earthContainer.style.left = '50%';
    earthContainer.style.top = '50%';
    earthContainer.style.transform = 'translate(-50%, -50%)';

    // إرجاع حجم الكوكب للأصلي
    earthVisual.style.width = '400px';
    earthVisual.style.height = '400px';

    // إظهار اسم الكوكب
    earthTitle.style.opacity = '1';
}

// وظيفة إظهار معلومات كوكب المريخ
function showMarsInfo() {
    const marsContainer = document.getElementById('mars-container');
    const marsVisual = document.getElementById('mars-visual');
    const marsInfo = document.getElementById('mars-info');
    const marsTitle = document.getElementById('mars-title');

    // إخفاء اسم الكوكب
    marsTitle.style.opacity = '0';

    // تحريك الكوكب لليسار وتصغيره
    setTimeout(() => {
        marsContainer.style.left = '20%';
        marsContainer.style.transform = 'translate(-50%, -50%)';
        marsVisual.style.width = '300px';
        marsVisual.style.height = '300px';
    }, 300);

    // إظهار البطاقة من اليمين
    setTimeout(() => {
        marsInfo.style.transform = 'translate(0%, -50%)';
        marsInfo.style.opacity = '1';
    }, 800);
}

// وظيفة الانتقال من المريخ للمشتري
function continueFromMars() {
    console.log('Continue from Mars button clicked');
    const marsContainer = document.getElementById('mars-container');
    const marsVisual = document.getElementById('mars-visual');
    const marsInfo = document.getElementById('mars-info');
    const marsTitle = document.getElementById('mars-title');

    // إخفاء البطاقة أولاً
    marsInfo.style.transition = 'all 0.5s ease-in-out';
    marsInfo.style.transform = 'translate(100%, -50%)';
    marsInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    setTimeout(() => {
        marsContainer.style.transition = 'all 1s ease-in-out';
        marsContainer.style.left = '50%';
        marsContainer.style.top = '50%';
        marsContainer.style.transform = 'translate(-50%, -50%)';

        marsVisual.style.transition = 'all 1s ease-in-out';
        marsVisual.style.width = '400px';
        marsVisual.style.height = '400px';

        // إظهار اسم الكوكب
        marsTitle.style.opacity = '1';
    }, 200);

    // الانتقال للمشتري
    setTimeout(() => {
        scrollToPlanet('jupiter-section');
    }, 1500);
}

// وظيفة إعادة تعيين كوكب المريخ للحالة الأصلية
function resetMarsToCenter() {
    const marsContainer = document.getElementById('mars-container');
    const marsVisual = document.getElementById('mars-visual');
    const marsInfo = document.getElementById('mars-info');
    const marsTitle = document.getElementById('mars-title');

    // إخفاء البطاقة تماماً
    marsInfo.style.transform = 'translate(100%, -50%)';
    marsInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    marsContainer.style.left = '50%';
    marsContainer.style.top = '50%';
    marsContainer.style.transform = 'translate(-50%, -50%)';

    // إرجاع حجم الكوكب للأصلي
    marsVisual.style.width = '400px';
    marsVisual.style.height = '400px';

    // إظهار اسم الكوكب
    marsTitle.style.opacity = '1';
}

// وظيفة إظهار معلومات كوكب المشتري
function showJupiterInfo() {
    const jupiterContainer = document.getElementById('jupiter-container');
    const jupiterVisual = document.getElementById('jupiter-visual');
    const jupiterInfo = document.getElementById('jupiter-info');
    const jupiterTitle = document.getElementById('jupiter-title');

    // إخفاء اسم الكوكب
    jupiterTitle.style.opacity = '0';

    // تحريك الكوكب لليسار وتصغيره
    setTimeout(() => {
        jupiterContainer.style.left = '20%';
        jupiterContainer.style.transform = 'translate(-50%, -50%)';
        jupiterVisual.style.width = '300px';
        jupiterVisual.style.height = '300px';
    }, 300);

    // إظهار البطاقة من اليمين
    setTimeout(() => {
        jupiterInfo.style.transform = 'translate(0%, -50%)';
        jupiterInfo.style.opacity = '1';
    }, 800);
}

// وظيفة الانتقال من المشتري للنهاية
function continueFromJupiter() {
    console.log('Continue from Jupiter button clicked');
    const jupiterContainer = document.getElementById('jupiter-container');
    const jupiterVisual = document.getElementById('jupiter-visual');
    const jupiterInfo = document.getElementById('jupiter-info');
    const jupiterTitle = document.getElementById('jupiter-title');

    // إخفاء البطاقة أولاً
    jupiterInfo.style.transition = 'all 0.5s ease-in-out';
    jupiterInfo.style.transform = 'translate(100%, -50%)';
    jupiterInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    setTimeout(() => {
        jupiterContainer.style.transition = 'all 1s ease-in-out';
        jupiterContainer.style.left = '50%';
        jupiterContainer.style.top = '50%';
        jupiterContainer.style.transform = 'translate(-50%, -50%)';

        jupiterVisual.style.transition = 'all 1s ease-in-out';
        jupiterVisual.style.width = '400px';
        jupiterVisual.style.height = '400px';

        // إظهار اسم الكوكب
        jupiterTitle.style.opacity = '1';
    }, 200);

    // الانتقال لكوكب زحل
    setTimeout(() => {
        const saturnSection = document.getElementById('saturn-section');
        saturnSection.scrollIntoView({
            behavior: 'smooth'
        });
    }, 1500);
}

// وظيفة إعادة تعيين كوكب المشتري للحالة الأصلية
function resetJupiterToCenter() {
    const jupiterContainer = document.getElementById('jupiter-container');
    const jupiterVisual = document.getElementById('jupiter-visual');
    const jupiterInfo = document.getElementById('jupiter-info');
    const jupiterTitle = document.getElementById('jupiter-title');

    // إخفاء البطاقة تماماً
    jupiterInfo.style.transform = 'translate(100%, -50%)';
    jupiterInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    jupiterContainer.style.left = '50%';
    jupiterContainer.style.top = '50%';
    jupiterContainer.style.transform = 'translate(-50%, -50%)';

    // إرجاع حجم الكوكب للأصلي
    jupiterVisual.style.width = '400px';
    jupiterVisual.style.height = '400px';

    // إظهار اسم الكوكب
    jupiterTitle.style.opacity = '1';
}

// ======================
// وظائف كوكب زحل
// ======================

function showSaturnInfo() {
    const saturnContainer = document.getElementById('saturn-container');
    const saturnVisual = document.getElementById('saturn-visual');
    const saturnInfo = document.getElementById('saturn-info');
    const saturnTitle = document.getElementById('saturn-title');

    // إخفاء اسم الكوكب
    saturnTitle.style.opacity = '0';

    // تحريك الكوكب لليسار وتصغيره
    setTimeout(() => {
        saturnContainer.style.left = '20%';
        saturnContainer.style.transform = 'translate(-50%, -50%)';
        saturnVisual.style.width = '380px';
        saturnVisual.style.height = '280px';
    }, 300);

    // إظهار البطاقة من اليمين
    setTimeout(() => {
        saturnInfo.style.transform = 'translate(0%, -50%)';
        saturnInfo.style.opacity = '1';
    }, 800);
}

// وظيفة الانتقال من زحل للنهاية
function continueFromSaturn() {
    console.log('Continue from Saturn button clicked');
    const saturnContainer = document.getElementById('saturn-container');
    const saturnVisual = document.getElementById('saturn-visual');
    const saturnInfo = document.getElementById('saturn-info');
    const saturnTitle = document.getElementById('saturn-title');

    // إخفاء البطاقة أولاً
    saturnInfo.style.transition = 'all 0.5s ease-in-out';
    saturnInfo.style.transform = 'translate(100%, -50%)';
    saturnInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    setTimeout(() => {
        saturnContainer.style.transition = 'all 1s ease-in-out';
        saturnContainer.style.left = '50%';
        saturnContainer.style.top = '50%';
        saturnContainer.style.transform = 'translate(-50%, -50%)';

        saturnVisual.style.transition = 'all 1s ease-in-out';
        saturnVisual.style.width = '500px';
        saturnVisual.style.height = '400px';

        // إظهار اسم الكوكب
        saturnTitle.style.opacity = '1';
    }, 200);

    // الانتقال لأورانوس
    setTimeout(() => {
        scrollToPlanet('uranus-section');
    }, 1500);
}

// وظيفة إعادة تعيين كوكب زحل للحالة الأصلية
function resetSaturnToCenter() {
    const saturnContainer = document.getElementById('saturn-container');
    const saturnVisual = document.getElementById('saturn-visual');
    const saturnInfo = document.getElementById('saturn-info');
    const saturnTitle = document.getElementById('saturn-title');

    // إخفاء البطاقة تماماً
    saturnInfo.style.transform = 'translate(100%, -50%)';
    saturnInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    saturnContainer.style.left = '50%';
    saturnContainer.style.top = '50%';
    saturnContainer.style.transform = 'translate(-50%, -50%)';

    // إرجاع حجم الكوكب للأصلي
    saturnVisual.style.width = '500px';
    saturnVisual.style.height = '400px';

    // إظهار اسم الكوكب
    saturnTitle.style.opacity = '1';
}

// ======================
// وظائف كوكب أورانوس
// ======================

function showUranusInfo() {
    const uranusContainer = document.getElementById('uranus-container');
    const uranusVisual = document.getElementById('uranus-visual');
    const uranusInfo = document.getElementById('uranus-info');
    const uranusTitle = document.getElementById('uranus-title');

    // إخفاء اسم الكوكب
    uranusTitle.style.opacity = '0';

    // تحريك الكوكب لليسار وتصغيره
    setTimeout(() => {
        uranusContainer.style.left = '20%';
        uranusContainer.style.transform = 'translate(-50%, -50%)';
        uranusVisual.style.width = '380px';
        uranusVisual.style.height = '380px';
    }, 300);

    // إظهار البطاقة من اليمين
    setTimeout(() => {
        uranusInfo.style.transform = 'translate(0%, -50%)';
        uranusInfo.style.opacity = '1';
    }, 800);
}

// وظيفة الانتقال من أورانوس للنهاية
function continueFromUranus() {
    console.log('Continue from Uranus button clicked');
    const uranusContainer = document.getElementById('uranus-container');
    const uranusVisual = document.getElementById('uranus-visual');
    const uranusInfo = document.getElementById('uranus-info');
    const uranusTitle = document.getElementById('uranus-title');

    // إخفاء البطاقة أولاً
    uranusInfo.style.transition = 'all 0.5s ease-in-out';
    uranusInfo.style.transform = 'translate(100%, -50%)';
    uranusInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    setTimeout(() => {
        uranusContainer.style.transition = 'all 1s ease-in-out';
        uranusContainer.style.left = '50%';
        uranusContainer.style.top = '50%';
        uranusContainer.style.transform = 'translate(-50%, -50%)';

        uranusVisual.style.transition = 'all 1s ease-in-out';
        uranusVisual.style.width = '500px';
        uranusVisual.style.height = '500px';

        // إظهار اسم الكوكب
        uranusTitle.style.opacity = '1';
    }, 200);

    // الانتقال لنبتون
    setTimeout(() => {
        scrollToPlanet('neptune-section');
    }, 1500);
}

// وظيفة إعادة تعيين كوكب أورانوس للحالة الأصلية
function resetUranusToCenter() {
    const uranusContainer = document.getElementById('uranus-container');
    const uranusVisual = document.getElementById('uranus-visual');
    const uranusInfo = document.getElementById('uranus-info');
    const uranusTitle = document.getElementById('uranus-title');

    // إخفاء البطاقة تماماً
    uranusInfo.style.transform = 'translate(100%, -50%)';
    uranusInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    uranusContainer.style.left = '50%';
    uranusContainer.style.top = '50%';
    uranusContainer.style.transform = 'translate(-50%, -50%)';

    // إرجاع حجم الكوكب للأصلي
    uranusVisual.style.width = '500px';
    uranusVisual.style.height = '500px';

    // إظهار اسم الكوكب
    uranusTitle.style.opacity = '1';
}

// ======================
// وظائف كوكب نبتون
// ======================

function showNeptuneInfo() {
    const neptuneContainer = document.getElementById('neptune-container');
    const neptuneVisual = document.getElementById('neptune-visual');
    const neptuneInfo = document.getElementById('neptune-info');
    const neptuneTitle = document.getElementById('neptune-title');

    // إخفاء اسم الكوكب
    neptuneTitle.style.opacity = '0';

    // تحريك الكوكب لليسار وتصغيره
    setTimeout(() => {
        neptuneContainer.style.left = '20%';
        neptuneContainer.style.transform = 'translate(-50%, -50%)';
        neptuneVisual.style.width = '300px';
        neptuneVisual.style.height = '300px';
    }, 300);

    // إظهار البطاقة من اليمين
    setTimeout(() => {
        neptuneInfo.style.transform = 'translate(0%, -50%)';
        neptuneInfo.style.opacity = '1';
    }, 800);
}

// وظيفة الانتقال من نبتون للنهاية
function continueFromNeptune() {
    console.log('Continue from Neptune button clicked');
    const neptuneContainer = document.getElementById('neptune-container');
    const neptuneVisual = document.getElementById('neptune-visual');
    const neptuneInfo = document.getElementById('neptune-info');
    const neptuneTitle = document.getElementById('neptune-title');

    // إخفاء البطاقة أولاً
    neptuneInfo.style.transition = 'all 0.5s ease-in-out';
    neptuneInfo.style.transform = 'translate(100%, -50%)';
    neptuneInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    setTimeout(() => {
        neptuneContainer.style.transition = 'all 1s ease-in-out';
        neptuneContainer.style.left = '50%';
        neptuneContainer.style.top = '50%';
        neptuneContainer.style.transform = 'translate(-50%, -50%)';

        neptuneVisual.style.transition = 'all 1s ease-in-out';
        neptuneVisual.style.width = '400px';
        neptuneVisual.style.height = '400px';

        // إظهار اسم الكوكب
        neptuneTitle.style.opacity = '1';
    }, 200);

    // انتهاء الرحلة النهائية
    setTimeout(() => {
        alert('مبروك! انتهيت من رحلة النظام الشمسي الكاملة! 🎉🌌🪐');
    }, 1500);
}

// وظيفة إعادة تعيين كوكب نبتون للحالة الأصلية
function resetNeptuneToCenter() {
    const neptuneContainer = document.getElementById('neptune-container');
    const neptuneVisual = document.getElementById('neptune-visual');
    const neptuneInfo = document.getElementById('neptune-info');
    const neptuneTitle = document.getElementById('neptune-title');

    // إخفاء البطاقة تماماً
    neptuneInfo.style.transform = 'translate(100%, -50%)';
    neptuneInfo.style.opacity = '0';

    // إرجاع الكوكب للوسط
    neptuneContainer.style.left = '50%';
    neptuneContainer.style.top = '50%';
    neptuneContainer.style.transform = 'translate(-50%, -50%)';

    // إرجاع حجم الكوكب للأصلي
    neptuneVisual.style.width = '400px';
    neptuneVisual.style.height = '400px';

    // إظهار اسم الكوكب
    neptuneTitle.style.opacity = '1';
}

// تحديث النقاط
function updateScore() {
    scoreElement.textContent = score;
}

// تشغيل التطبيق عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", init);

// دالة الزمن الضوئي (كما هي)
(function () {
    const yearSeconds = 31557600;

    let hours = 4;
    let minutes = 5;

    function toLightYears(h, m) {
        const seconds = h * 3600 + m * 60;
        const years = seconds / yearSeconds;
        return years < 1 ? years.toFixed(6) : years.toFixed(3);
    }

    function updateLightTime(h, m) {
        const el = document.getElementById("lightTime");
        if (!el) return;
        el.textContent = `${toLightYears(h, m)} سنة ضوئية`;
    }

    updateLightTime(hours, minutes);

    // إعادة تعيين الكواكب عند تحميل الصفحة
    setTimeout(() => {
        resetMercuryToCenter();
        resetVenusToCenter();
        resetEarthToCenter();
        resetMarsToCenter();
    }, 500);
})();



// Initialize Lucide Icons
lucide.createIcons();

// Global chat state
let chatHistory = [];
let isChatOpen = false;
let isSending = false;

// API Configuration (Leave API key empty)
const apiKey = "";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

// Elements
const chatWindow = document.getElementById('chat-window');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const loadingIndicator = document.getElementById('loading-indicator');

// --- UI Functions ---

function toggleChat() {
    isChatOpen = !isChatOpen;
    chatWindow.classList.toggle('hidden', !isChatOpen);
    // Scroll to bottom when opening
    if (isChatOpen) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function displayMessage(role, text) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('max-w-[80%]', 'p-3', 'rounded-xl', 'text-white');

    if (role === 'user') {
        messageContainer.classList.add('user-message', 'self-end', 'rounded-br-none');
    } else {
        messageContainer.classList.add('model-message', 'self-start', 'rounded-bl-none');
    }

    const paragraph = document.createElement('p');
    paragraph.classList.add('text-sm');
    paragraph.textContent = text;
    messageContainer.appendChild(paragraph);
    chatMessages.appendChild(messageContainer);

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setLoading(loading) {
    isSending = loading;
    sendBtn.disabled = loading;
    loadingIndicator.classList.toggle('hidden', !loading);
    // Change button icon when loading
    const icon = lucide.createIcons()['send'].toSvg();
    sendBtn.innerHTML = loading ? `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i>` : icon;
    if (loading) {
        lucide.createIcons(); // Re-render icon if needed
    }
}

// --- Gemini API Logic ---

async function fetchWithRetry(url, options, maxRetries = 5) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (error) {
            if (i < maxRetries - 1) {
                const delay = Math.pow(2, i) * 1000;
                console.log(`Retrying after ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
}

async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage || isSending) return;

    // 1. Update UI and State
    chatInput.value = '';
    setLoading(true);
    displayMessage('user', userMessage);

    const systemPrompt = "أنت مرشد ودود وخبير في النظام الشظامسي. أجب على أسئلة المستخدمين بإيجاز ووضوح، مع التركيز على علم الفلك والكواكب وحقائق الفضاء. يجب أن تكون جميع الردود باللغة العربية.";

    // Add user message to history
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

    const payload = {
        contents: chatHistory,
        // Use Google Search for grounding current facts
        tools: [{ "google_search": {} }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    try {
        const response = await fetchWithRetry(apiUrl, options);
        const result = await response.json();

        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            const modelResponse = candidate.content.parts[0].text;

            // Add model response to history
            chatHistory.push({ role: "model", parts: [{ text: modelResponse }] });

            // Display model message
            displayMessage('model', modelResponse);
        } else {
            displayMessage('model', "عذراً، واجهت مشكلة في الحصول على الرد. يرجى المحاولة مرة أخرى.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        displayMessage('model', "حدث خطأ في الاتصال بالخدمة. يرجى التحقق من اتصالك بالإنترنت.");
        // Remove the last user message from history to allow retry
        chatHistory.pop();
    } finally {
        setLoading(false);
    }
}

// Initialize button icon correctly
window.onload = () => {
    // Create initial send icon
    sendBtn.innerHTML = lucide.createIcons()['send'].toSvg();
};