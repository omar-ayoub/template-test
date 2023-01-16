/*
	Responsive Slides
*/
!(function (t, n, e) {
  "use strict";
  t.fn.responsiveSlides = function (a) {
    var s = t.extend(
      {
        auto: !0,
        speed: 500,
        timeout: 4e3,
        pager: !1,
        nav: !1,
        random: !1,
        pause: !1,
        pauseControls: !0,
        prevText: "Previous",
        nextText: "Next",
        maxwidth: "",
        navContainer: "",
        manualControls: "",
        namespace: "rslides",
        before: t.noop,
        after: t.noop,
      },
      a
    );
    return this.each(function () {
      e++;
      var o,
        i,
        r,
        l,
        u,
        c,
        f = t(this),
        d = 0,
        p = f.children(),
        h = p.size(),
        m = parseFloat(s.speed),
        v = parseFloat(s.timeout),
        C = parseFloat(s.maxwidth),
        x = s.namespace,
        y = x + e,
        b = x + "_nav " + y + "_nav",
        g = x + "_here",
        w = y + "_on",
        _ = y + "_s",
        I = t("<ul class='" + x + "_tabs " + y + "_tabs' />"),
        q = { float: "left", position: "relative", opacity: 1, zIndex: 2 },
        z = { float: "none", position: "absolute", opacity: 0, zIndex: 1 },
        T = (function () {
          var t = (document.body || document.documentElement).style,
            n = "transition";
          if ("string" == typeof t[n]) return !0;
          o = ["Moz", "Webkit", "Khtml", "O", "ms"];
          var e,
            n = n.charAt(0).toUpperCase() + n.substr(1);
          for (e = 0; e < o.length; e++)
            if ("string" == typeof t[o[e] + n]) return !0;
          return !1;
        })(),
        k = function (n) {
          s.before(n),
            T
              ? (p.removeClass(w).css(z).eq(n).addClass(w).css(q),
                (d = n),
                setTimeout(function () {
                  s.after(n);
                }, m))
              : p
                  .stop()
                  .fadeOut(m, function () {
                    t(this).removeClass(w).css(z).css("opacity", 1);
                  })
                  .eq(n)
                  .fadeIn(m, function () {
                    t(this).addClass(w).css(q), s.after(n), (d = n);
                  });
        };
      if (
        (s.random &&
          (p.sort(function () {
            return Math.round(Math.random()) - 0.5;
          }),
          f.empty().append(p)),
        p.each(function (t) {
          this.id = _ + t;
        }),
        f.addClass(x + " " + y),
        a && a.maxwidth && f.css("max-width", C),
        p.hide().css(z).eq(0).addClass(w).css(q).show(),
        T &&
          p
            .show()
            .css({
              "-webkit-transition": "opacity " + m + "ms ease-in-out",
              "-moz-transition": "opacity " + m + "ms ease-in-out",
              "-o-transition": "opacity " + m + "ms ease-in-out",
              transition: "opacity " + m + "ms ease-in-out",
            }),
        1 < p.size())
      ) {
        if (m + 100 > v) return;
        if (s.pager && !s.manualControls) {
          var F = [];
          p.each(function (t) {
            (t += 1), (F += "<li><a href='#' class='" + _ + t + "'></a></li>");
          }),
            I.append(F),
            a.navContainer ? t(s.navContainer).append(I) : f.after(I);
        }
        if (
          (s.manualControls &&
            ((I = t(s.manualControls)), I.addClass(x + "_tabs " + y + "_tabs")),
          (s.pager || s.manualControls) &&
            I.find("li").each(function (n) {
              t(this).addClass(_ + (n + 1));
            }),
          (s.pager || s.manualControls) &&
            ((c = I.find("a")),
            (i = function (t) {
              c.closest("li").removeClass(g).eq(t).addClass(g);
            })),
          s.auto &&
            (r = function () {
              u = setInterval(function () {
                p.stop(!0, !0);
                var t = h > d + 1 ? d + 1 : 0;
                (s.pager || s.manualControls) && i(t), k(t);
              }, v);
            })(),
          (l = function () {
            s.auto && (clearInterval(u), r());
          }),
          s.pause &&
            f.hover(
              function () {
                clearInterval(u);
              },
              function () {
                l();
              }
            ),
          (s.pager || s.manualControls) &&
            (c
              .bind("click", function (n) {
                n.preventDefault(),
                  s.pauseControls || l(),
                  (n = c.index(this)),
                  d === n || t("." + w).queue("fx").length || (i(n), k(n));
              })
              .eq(0)
              .closest("li")
              .addClass(g),
            s.pauseControls &&
              c.hover(
                function () {
                  clearInterval(u);
                },
                function () {
                  l();
                }
              )),
          s.nav)
        ) {
          (x =
            "<a href='#' class='" +
            b +
            " prev'>" +
            s.prevText +
            "</a><a href='#' class='" +
            b +
            " next'>" +
            s.nextText +
            "</a>"),
            a.navContainer ? t(s.navContainer).append(x) : f.after(x);
          var y = t("." + y + "_nav"),
            M = y.filter(".prev");
          y.bind("click", function (n) {
            if ((n.preventDefault(), (n = t("." + w)), !n.queue("fx").length)) {
              var e = p.index(n);
              (n = e - 1),
                (e = h > e + 1 ? d + 1 : 0),
                k(t(this)[0] === M[0] ? n : e),
                (s.pager || s.manualControls) && i(t(this)[0] === M[0] ? n : e),
                s.pauseControls || l();
            }
          }),
            s.pauseControls &&
              y.hover(
                function () {
                  clearInterval(u);
                },
                function () {
                  l();
                }
              );
        }
      }
      if ("undefined" == typeof document.body.style.maxWidth && a.maxwidth) {
        var D = function () {
          f.css("width", "100%"), f.width() > C && f.css("width", C);
        };
        D(),
          t(n).bind("resize", function () {
            D();
          });
      }
    });
  };
})(jQuery, this, 0);
