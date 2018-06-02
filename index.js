(() => {
  "use strict";
  const now = "now";
  const T = (t = []) => (t.wrapF || t.identity)
    ? t
    : (() => {
      const t0 = t1 => (t1.identity) //T
        ? t0
        : (() => {
          const t01 = T((timeline) => { //construct binded TL event
            const t0units = (t0.units)
              ? t0.units : [t0];
            const t1units = (t1.units)
              ? t1.units : [t1];
            timeline.units = t0units.concat(t1units);
            const reset = () => timeline.units
              .map((t, i) => updates[i][now] = 0);
            const update = () => timeline[now] = timeline.units
              .map((t) => t[now]);
            const check = () => (timeline.units
              .map((t, i) => updates[i][now])
              .reduce((a, b) => (a * b)) === 1) //all updated
              ? update()
              : true;
            const updates = timeline.units
              .map((t) => T().wrap(check));
            const dummy0 = timeline.units
              .map((t, i) => t.wrap(() => updates[i][now] = 1));
            const dummy1 = timeline.wrap(reset);
            timeline[now] = null; //initial reset
          });
          return t01; //  T(t0)(t1)
        })();
      Object.defineProperties(t0, //detect TL update
        {
          now: { //a[now]
            get() {
              return t0.val;
            },
            set(tUpdate) {
              return (() => {
                t0.val = tUpdate;
                t0.wrapF.map(f => f(tUpdate));
              })();
            }
          }
        });
      t0.wrapF = [];
      t0.wrap = f => {
        t0.wrapF[t0.wrapF.length] = f;
        return t0;
      };
      t0.sync = f => T(t => t0.wrap(a => t[now] = f(a)));
      t0.and = t1 => T(t0)(t1); //  === t0(t1)
      t0.or = t1 => T(
        t01 => {
          t0.wrap(t => t01[now] = t);
          t1.wrap(t => t01[now] = t);
        });
      //------------------
      (typeof t === "function") //wrapped eventF
        ? t(t0)
        : true;
      return t0;
    })();
  T.identity = true;
  //------------------
  const timeline = {
    now: now,
    T: T
  };
  //------------------

  (() => { //live demo
    //--------
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const draw = ([x0, y0], [x1, y1]) => {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.closePath();
      ctx.stroke();
    };

    const btnTimeline = T((timeline) => {
      canvas.onmousedown = (e) => timeline[now] = 1;
      canvas.onmouseup = (e) => timeline[now] = 0;
    });

    const pointTimeline = T((timeline) => {
      canvas.onmousemove = (e) => timeline[now] = [e.clientX, e.clientY];
    })
      .wrap((point) => (btnTimeline[now] === 1)
        ? draw(lastPointTimeline[now], point)
        : true);

    const lastPointTimeline = T((timeline) => {
      pointTimeline.wrap(point => {
        timeline[now] = point;
      });
    });








  //---------
  })()

//============================
})();
