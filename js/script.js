//  // Off-canvas (مقتبس ومعدّل)
//       (function () {
//         const toggle = document.getElementById("navToggle");
//         const off = document.getElementById("mobileNav");
//         const overlay = document.getElementById("overlay");
//         let lastFocusedElement = null;

//         function getFocusableElements(container) {
//           const selectors =
//             'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
//           return Array.from(container.querySelectorAll(selectors)).filter(
//             (el) => el.offsetParent !== null
//           );
//         }

//         function closeMenu() {
//           off.classList.remove("open");
//           off.setAttribute("aria-hidden", "true");
//           toggle.setAttribute("aria-expanded", "false");

//           overlay.classList.remove("show");
//           overlay.setAttribute("aria-hidden", "true");
//           document.body.style.overflow = "";
//           if (lastFocusedElement) lastFocusedElement.focus();
//         }

//         toggle.addEventListener("click", function () {
//           const isOpen = off.classList.toggle("open");
//           off.setAttribute("aria-hidden", String(!isOpen));
//           toggle.setAttribute("aria-expanded", String(isOpen));
//           overlay.classList.toggle("show", isOpen);
//           overlay.setAttribute("aria-hidden", String(!isOpen));
//           if (isOpen) {
//             lastFocusedElement = document.activeElement;
//             document.body.style.overflow = "hidden";
//             const focusables = getFocusableElements(off);
//             if (focusables.length) focusables[0].focus();
//           } else {
//             document.body.style.overflow = "";
//             if (lastFocusedElement) lastFocusedElement.focus();
//           }
//         });

//         overlay.addEventListener("click", closeMenu);
//         off.addEventListener("click", function (e) {
//           if (e.target.tagName.toLowerCase() === "a") {
//             closeMenu();
//           }
//         });
//         document.addEventListener("keydown", function (e) {
//           if (e.key === "Escape" && off.classList.contains("open")) closeMenu();
//         });
//         window.addEventListener("resize", function () {
//           if (window.innerWidth > 767 && off.classList.contains("open"))
//             closeMenu();
//         });
//       })();

document.addEventListener('DOMContentLoaded', function () {

  // Video modal
  (function () {
    const play = document.getElementById("playDemo");
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("demoVideo");
    const close = document.getElementById("closeVideo");
    const demoUrl = "https://www.youtube.com/embed/0lM7IfSafLM?autoplay=1";

    console.log('video elements:', { play, modal, iframe, close });

    function openVideo() {
      if (!iframe || !modal) return;
      iframe.src = demoUrl;
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeVideo() {
      if (!iframe || !modal) return;
      iframe.src = "";
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    if (play) {
      play.addEventListener("click", openVideo);
    } else {
      console.warn('playDemo not found');
    }
    if (close) {
      close.addEventListener("click", closeVideo);
    } else {
      console.warn('closeVideo not found');
    }
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeVideo();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal && modal.style.display === "flex")
        closeVideo();
    });
  })();

  // year
  (function () {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    } else {
      console.warn('year element not found');
    }
  })();

  // Off-canvas mobile nav
  (function () {
    const toggle = document.getElementById("navToggle");
    const off = document.getElementById("mobileNav");
    const overlay = document.getElementById("overlay");
    let lastFocusedElement = null;

    console.log('offcanvas elements:', { toggle, off, overlay });

    function getFocusableElements(container) {
      if (!container) return [];
      const selectors =
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
      return Array.from(container.querySelectorAll(selectors)).filter(
        (el) => el.offsetParent !== null
      );
    }

    function closeMenu() {
      if (!off || !toggle || !overlay) return;
      off.classList.remove("open");
      off.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      overlay.classList.remove("show");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocusedElement) lastFocusedElement.focus();
    }

    if (toggle && off && overlay) {
      toggle.addEventListener("click", function () {
        const isOpen = off.classList.toggle("open");
        off.setAttribute("aria-hidden", String(!isOpen));
        toggle.setAttribute("aria-expanded", String(isOpen));
        overlay.classList.toggle("show", isOpen);
        overlay.setAttribute("aria-hidden", String(!isOpen));
        if (isOpen) {
          lastFocusedElement = document.activeElement;
          document.body.style.overflow = "hidden";
          const focusables = getFocusableElements(off);
          if (focusables.length) focusables[0].focus();
        } else {
          document.body.style.overflow = "";
          if (lastFocusedElement) lastFocusedElement.focus();
        }
      });

      overlay.addEventListener("click", closeMenu);
      off.addEventListener("click", function (e) {
        if (e.target.tagName && e.target.tagName.toLowerCase() === "a") {
          closeMenu();
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && off.classList.contains("open")) closeMenu();
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 767 && off.classList.contains("open"))
          closeMenu();
      });
    } else {
      if (!toggle) console.warn('navToggle not found');
      if (!off) console.warn('mobileNav not found');
      if (!overlay) console.warn('overlay not found');
    }
  })();

  // Filters and Modal for services
  (function () {
    const filterBtns = document.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll(".service-card");
    console.log('service elements:', { filterBtnsLength: filterBtns.length, cardsLength: cards.length });

    if (filterBtns.length) {
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const f = btn.getAttribute("data-filter");
          filterBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          if (f === "all") {
            cards.forEach((c) => (c.style.display = ""));
            return;
          }
          cards.forEach((c) => {
            c.style.display =
              c.getAttribute("data-category") === f ? "" : "none";
          });
        });
      });
    } else {
      console.warn('no [data-filter] buttons found');
    }

    const details = {
      create_site: {
        title: "إنشاء وبرمجة موقع إلكتروني",
        desc: "نصمم ونطوّر موقع كامل متجاوب وسهل الإدارة.",
        list: ["تصميم UX/UI", "لوحة تحكم", "تهيئة أساسية SEO"],
      },
      email: {
        title: "إنشاء إيميل باسم الشركة",
        desc: "إعداد بريد رسمي على الدومين وربط الأجهزة.",
        list: ["SPF/DKIM", "إعداد الهواتف", "حماية البريد"],
      },
      social_design: {
        title: "تصاميم للسوشيال",
        desc: "قوالب منشورات وقصص متناسقة.",
        list: ["قوالب منشورات", "صور مصغرة", "قوالب فيديو قصيرة"],
      },
      social_manage: {
        title: "إدارة صفحات التواصل الاجتماعي",
        desc: "إنشاء ومتابعة المحتوى وجدولة الو منشورات وتحليل الأداء.",
        list: ["جدولة", "تقرير شهري", "تخطيط مضمون"],
      },
      full_marketing: {
        title: "تسويق إلكتروني شامل",
        desc: "استراتيجيات متكاملة لرفع الوعي والتحويل.",
        list: ["SEO", "إعلانات", "تحليلات"],
      },
      weekly_ads: {
        title: "إعلان أسبوعي مموّل",
        desc: "حملات أسبوعية تستهدف شرائح محددة.",
        list: ["تحليل الجمهور", "تصميم الإعلان", "تقارير"],
      },
      video_ad: {
        title: "إعلان فيديو مع تعليق صوتي",
        desc: "إنتاج فيديو ترويجي ومونتاج مع تعليق صوتي احترافي.",
        list: ["سيناريو", "تصوير", "مونتاج"],
      },
      ai_solutions: {
        title: "حلول الذكاء الاصطناعي",
        desc: "أتمتة وتحليل بيانات لتحسين تجربة العميل.",
        list: ["chatbots", "تحليل بيانات", "توصية ذكية"],
      },
      bugs: {
        title: "الوقوف على الثغرات ومعالجتها",
        desc: "رصد الأداء وتطبيق إصلاحات أمان واستقرار سريعة.",
        list: ["اختبارات أمنية", "مراقبة", "تصليح عاجل"],
      },
      support: {
        title: "إتاحة خدمة العملاء",
        desc: "قنوات دعم متعددة ومستوى خدمة قابل للتخصيص.",
        list: ["شات مباشر", "نظام تذاكر", "SLA"],
      },
      strategic: {
        title: "إعداد خطط تسويقية طويلة المدى",
        desc: "خطة سنوية متكاملة لرفع الوعي وزيادة العائد.",
        list: ["تحليل منافس", "خطة محتوى", "قياس أداء"],
      },
      compete: {
        title: "تطوير القدرة التنافسية",
        desc: "تدريبات واستشارات لتحسين المنتج والعمليات.",
        list: ["ورش", "تحليل منافس", "خطة تنفيذ"],
      },
      commitment: {
        title: "الالتزام والمسؤولية",
        desc: "نلتزم بمواعيد التسليم وجودة العمل.",
        list: ["ضمان جودة", "دعم فني", "تقارير متابعة"],
      },
      web: {
        title: "تصميم وبرمجة مواقع إلكترونية",
        desc: "حلول ويب متكاملة تناسب المؤسسات والمتاجر والمدارس.",
        list: ["تصميم متجاوب", "لوحة تحكم", "تهيئة SEO"],
      },
      marketing: {
        title: "تسويق إلكتروني شامل",
        desc: "استراتيجيات تسويق متعددة القنوات.",
        list: ["إعلانات", "تحليل", "تحسين"],
      },
      video: {
        title: "إنتاج فيديو ترويجي",
        desc: "فيديو يظهر مشروعك بأفضل شكل.",
        list: ["كتابة", "تصوير", "مونتاج"],
      },
    };

    const modal = document.getElementById("serviceModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalList = document.getElementById("modalList");
    const modalClose = document.getElementById("modalClose");
    const closeBtn = document.getElementById("closeService");

    console.log('service modal elements:', { modal, modalTitle, modalDesc, modalList, modalClose, closeBtn });

    const detailBtns = document.querySelectorAll('[data-action="details"]');
    if (detailBtns.length) {
      detailBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const key = btn.getAttribute("data-service");
          const data = details[key] || {
            title: "تفاصيل الخدمة",
            desc: "نحن نقدم هذه الخدمة.",
            list: [],
          };
          if (modalTitle) modalTitle.textContent = data.title;
          if (modalDesc) modalDesc.textContent = data.desc;
          if (modalList) {
            modalList.innerHTML = "";
            (data.list || []).forEach((it) => {
              const li = document.createElement("li");
              li.textContent = "• " + it;
              modalList.appendChild(li);
            });
          }
          if (modal) {
            modal.style.display = "flex";
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
          } else {
            console.warn('serviceModal not found when opening details');
          }
        });
      });
    } else {
      console.warn('no [data-action="details"] buttons found');
    }

    function closeModal() {
      if (!modal) return;
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    if (modalClose) modalClose.addEventListener("click", closeModal); else console.warn('modalClose not found');
    if (closeBtn) closeBtn.addEventListener("click", closeModal); else console.warn('closeService not found');
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal && modal.style.display === "flex")
        closeModal();
    });

  })();

});
// contact.js
// واجهة بسيطة لمعالجة الإرسال عبر AJAX إن كان endpoint يدعم CORS (مثل Formspree)
// إذا لم تعمل الـAJAX بسبب CORS فالـform سيُرسل بالطريقة التقليدية (fallback).
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const notice = document.getElementById("form-notice");
  const resetBtn = document.getElementById("resetBtn");

  // helper: وضع رسالة
  function setNotice(msg, type = "info") {
    notice.textContent = msg;
    notice.style.color = (type === "error") ? "#fb7185" : (type === "success" ? "#34D399" : "#9CA3AF");
  }

  // reset handler
  resetBtn && resetBtn.addEventListener("click", () => {
    form.reset();
    setNotice("");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // تحقق سريع جانب العميل
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const phone = form.elements["phone"].value.trim();
    const message = form.elements["message"].value.trim();
    const consent = form.elements["consent"].checked;

    if (!name || !email || !phone || !message || !consent) {
      setNotice("الرجاء تعبئة الحقول المطلوبة والموافقة على سياسة الخصوصية.", "error");
      return;
    }

    // honeypot check
    const hp = form.elements["website"].value;
    if (hp) {
      // BOT likely
      setNotice("تم اكتشاف نشاط غير مرغوب. الإرسال ملغى.", "error");
      return;
    }

    setNotice("جار إرسال الطلب... الرجاء الانتظار.");

    // إرسال عبر fetch (AJAX) — Formspree يدعم ذلك عادة
    const endpoint = form.action;
    const data = new FormData(form);

    fetch(endpoint, {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) return response.json().catch(()=>({ok:true}));
      return response.json().then(errData => Promise.reject(errData));
    })
    .then(data => {
      // عرض نجاح
      setNotice("تم استلام طلبك بنجاح. سنعاود التواصل خلال 24–48 ساعة.", "success");
      form.reset();
      // لو تريد إعادة توجيه بدل الرسالة، فتح رابط _next:
      const next = form.querySelector('input[name="_next"]');
      if (next && next.value) {
        // تأخير بسيط ثم إعادة توجيه (اختياري)
        setTimeout(()=>{ window.location.href = next.value; }, 1200);
      }
    })
    .catch(err => {
      console.error("Form submit error:", err);
      setNotice("حصل خطأ أثناء إرسال الطلب. جرّب مرة أخرى أو تواصل عبر البريد/واتساب.", "error");
      // fallback: submit the form normally (يمكن تفعيل إذا أردت)
      // form.submit();
    });
  });
});




// backtotop.js
// زر العودة للأعلى — يظهر بعد تمرير معين، يدعم smooth scroll ويحترم prefers-reduced-motion

(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  // كم بكسل تحتاج للنزول حتى يظهر الزر
  const SHOW_AFTER = 300;

  // تحقق من تفضيل المستخدم لتقليل الحركة
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // إظهار/إخفاء الزر حسب Scroll
  function checkScroll() {
    if (window.scrollY > SHOW_AFTER) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }

  // عند الضغط — تفعيل السحب للأعلى بسلاسة أو فوري إذا رُفضت الحركة
  function scrollToTop() {
    if (reduceMotion) {
      window.scrollTo(0, 0);
    } else {
      // تحقق من دعم السلوك السلس
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    }
  }

  // حدث الضغط (دعم النقرة + Enter/Space للوحة المفاتيح)
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    scrollToTop();
    // اعادة الفوكس لمنزل لاسيما للمستخدمين لوحة المفاتيح
    // اختياري: اضبط فوكاس على أول عنصر تريده بعد الصعود
    document.documentElement.focus && document.documentElement.focus();
  });

  // دعم تشغيل عن طريق لوحة المفاتيح عندما يكون الزر مركّز
  btn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });

  // استمع لحدث scroll (ضع throttle بسيط إن رغبت لتحسين الأداء)
  window.addEventListener('scroll', checkScroll, { passive: true });

  // افتح الحالة الابتدائية
  checkScroll();

  // خيار: لو تستخدم SPA وتريد إخفاء الزر بعد التنقّل، استدعي checkScroll بعد تغيير المسار
})();

