/* Gummy's Home Cooking — site behaviour (vanilla, no dependencies) */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      toggle.querySelector('.label').textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) setOpen(false);
    });
  }

  /* ---------- reveal, deal-in cards, hand underlines ---------- */
  var targets = document.querySelectorAll('.reveal, .deal, .scribble-group');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }
  // stagger index for dealt cards
  document.querySelectorAll('.deal').forEach(function (deck) {
    Array.prototype.forEach.call(deck.children, function (card, i) {
      card.style.setProperty('--i', i % 4);
    });
  });

  /* ---------- steam intensifies as the hero scrolls ---------- */
  var stage = document.querySelector('.plate-stage');
  if (stage && !reduce) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var r = stage.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      // 0 when the plate sits low in the viewport, 1 as it rises toward the top
      var p = 1 - Math.min(Math.max((r.top + r.height * 0.5) / vh, 0), 1);
      stage.style.setProperty('--steam', p.toFixed(3));
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- open / closed now (America/New_York) ---------- */
  // day index: 0 = Sunday ... 6 = Saturday. [openHour, closeHour] in 24h.
  var HOURS = { 0: [12, 17], 5: [12, 18], 6: [12, 18] };
  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function fmt(h) { var s = h % 12 === 0 ? 12 : h % 12; return s + (h < 12 ? ' AM' : ' PM'); }
  function nyNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
      }).formatToParts(new Date());
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var hour = parseInt(o.hour, 10) % 24;
      return { day: map[o.weekday], mins: hour * 60 + parseInt(o.minute, 10) };
    } catch (e) { return null; }
  }
  function status() {
    var now = nyNow();
    if (!now) return null;
    var today = HOURS[now.day];
    if (today) {
      if (now.mins >= today[0] * 60 && now.mins < today[1] * 60) {
        return { state: 'open', day: now.day, text: 'Open now · until ' + fmt(today[1]) };
      }
      if (now.mins < today[0] * 60) {
        return { state: 'soon', day: now.day, text: 'Opens today at ' + fmt(today[0]) };
      }
    }
    for (var i = 1; i <= 7; i++) {
      var d = (now.day + i) % 7;
      if (HOURS[d]) {
        var when = i === 1 ? 'tomorrow' : DAY_NAMES[d];
        return { state: 'closed', day: now.day, text: 'Closed now · opens ' + when + ' at ' + fmt(HOURS[d][0]) };
      }
    }
    return null;
  }
  var st = status();
  if (st) {
    document.querySelectorAll('[data-open-status]').forEach(function (el) {
      el.setAttribute('data-state', st.state);
      var t = el.querySelector('.status-text');
      if (t) t.textContent = st.text;
    });
    document.querySelectorAll('[data-day="' + st.day + '"]').forEach(function (row) {
      row.classList.add('today');
    });
  }

  /* ---------- printed menu lightbox ---------- */
  var dlg = document.getElementById('menu-dialog');
  var opener = document.querySelector('[data-open-menu]');
  if (dlg && opener && typeof dlg.showModal === 'function') {
    opener.addEventListener('click', function (e) {
      e.preventDefault();
      dlg.showModal();
    });
    dlg.querySelector('.lightbox-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  }

  /* ---------- menu page: highlight the section in view ---------- */
  var jumpLinks = document.querySelectorAll('.menu-jump a');
  if (jumpLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    jumpLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          jumpLinks.forEach(function (a) { a.classList.remove('is-active'); });
          var link = byId[entry.target.id];
          if (link) {
            link.classList.add('is-active');
            var bar = link.parentNode.parentNode;
            if (bar.scrollWidth > bar.clientWidth) {
              bar.scrollTo({ left: link.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' });
            }
          }
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    Object.keys(byId).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
