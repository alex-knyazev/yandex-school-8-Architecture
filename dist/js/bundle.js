!(function (t) {
  const e = {};
  function s(r) {
    if (e[r]) return e[r].exports;
    const o = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(o.exports, o, o.exports, s), (o.l = !0), o.exports;
  }
  (s.m = t),
  (s.c = e),
  (s.d = function (t, e, r) {
    s.o(t, e) || Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: r });
  }),
  (s.r = function (t) {
    Object.defineProperty(t, '__esModule', { value: !0 });
  }),
  (s.n = function (t) {
    const e =
        t && t.__esModule
          ? function () {
            return t.default;
          }
          : function () {
            return t;
          };
    return s.d(e, 'a', e), e;
  }),
  (s.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }),
  (s.p = ''),
  s((s.s = 2));
}([
  function (t, e, s) {
    s.r(e);
    const r = class {
      constructor() {
        (this.className = 'Dispatcher'),
        (this.stores = []),
        (this.registerStore = this.registerStore.bind(this)),
        (this.dispatch = this.dispatch.bind(this));
      }
      registerStore(t) {
        if (!t) throw new Error('вы должны передать store для регистрации в dispatcher');
        this.stores.push(t);
      }
      dispatch(t) {
        for (let e = 0; e < this.stores.length; e++) this.stores[e].update(t);
      }
    };
    const o = class {
      constructor(t, e) {
        (this.className = 'Store'),
        (this.data = t),
        (this.updateStoreByActions = e),
        (this.subscribers = []),
        (this.updateStoreByActions = this.updateStoreByActions.bind(this)),
        (this.addSubscriber = this.addSubscriber.bind(this));
      }
      update(t) {
        const { subscribers: e } = this,
          s = this.updateStoreByActions(t);
        if (s) for (let t = 0; t < e.length; t++) (0, e[t])(s);
      }
      addSubscriber(t) {
        if (typeof t !== 'function') { throw new Error('подписчик, регистрируемыей в хранилище, должен быть функцией'); }
        this.subscribers.push(t), t(this.data);
      }
    };
    const i = class {
      constructor(t) {
        (this.className = 'View'), (this.element = t);
      }
      static runListeners(t) {
        for (let e = 0; e < t.length; e++) t[e]();
      }
    };
    const n = new class {
      constructor() {
        (this.logs = []),
        (this.subscribers = []),
        (this.saveLog = this.saveLog.bind(this)),
        (this.addSubscriber = this.addSubscriber.bind(this));
      }
      lookFor(t) {
        const { saveLog: e } = this,
          s = Object.keys(t);
        for (let r = 0; r < s.length; r++) {
          const o = t[s[r]];
          typeof o === 'function' &&
            (t[s[r]] = function (...s) {
              return e(t.className, o.name), o(...s);
            });
        }
      }
      saveLog(t, e) {
        let s = e.split(' ');
        s = s[s.length - 1];
        const r = this.logs.length + 1;
        this.logs.push(`${r}. в экземпляре класса ${t} вызван метод ${s}`);
        for (let t = 0; t < this.subscribers.length; t++) (0, this.subscribers[t])(this.logs);
      }
      addSubscriber(t) {
        this.subscribers.push(t), t(this.logs);
      }
    }();
    const a = new r();
    n.lookFor(a);
    const c = a;
    const u = 'SEND_VALUE_TO_SERVER';
    const h = new o({ answerByServer: 'Ответа от сервера еще не было' }, function (t) {
      switch (t.type) {
        case u:
          return { ...this.data, answerByServer: t.payload };
        default:
          return null;
      }
    });
    n.lookFor(h);
    const d = h;
    const l = document.getElementsByClassName('view-stub')[0],
      p = document.getElementsByClassName('view-stub__apply')[0],
      b = document.getElementsByClassName('view-stub__input')[0],
      g = document.getElementsByClassName('view-stub__label')[0],
      y = [
        () => {
          p.addEventListener('click', () => {
            (m = b.value),
            c.dispatch({ type: u, payload: 'Происходит отправка данных' }),
            setTimeout(() => {
              c.dispatch({ type: u, payload: 'Очень долгая отправка данных' });
            }, 2e3),
            setTimeout(() => {
              let t = 'Сервер хотел получить сообщение, но до него дошла лишь пустота.';
              m.length && (t = 'Сервер получил ваше сообщение.'),
              c.dispatch({ type: u, payload: t });
            }, 3500);
          });
        },
      ];
    let m;
    class S extends i {
      constructor() {
        super(l),
        i.runListeners(y),
        (this.dataFromStore = {}),
        (this.connectToStore = this.connectToStore.bind(this)),
        (this.updateByStore = this.updateByStore.bind(this));
      }
      connectToStore(t) {
        (this.dataFromStore = t.data), t.addSubscriber(this.updateByStore);
      }
      updateByStore(t) {
        (this.dataFromStore = { ...this.dataFromStore, newData: t }), S.updateView(t);
      }
      static updateView(t) {
        const { answerByServer: e } = t;
        (g.innerText = '...'),
        setTimeout(() => {
          g.innerText = e;
        }, 100);
      }
    }
    const f = S;
    const w = document.getElementsByClassName('log')[0];
    const v = class extends i {
      constructor() {
        super(w),
        (this.dataFromLogs = {}),
        (this.updateByLogger = this.updateByLogger.bind(this)),
        (this.updateView = this.updateView.bind(this));
      }
      connectToLogger(t) {
        t.addSubscriber(this.updateByLogger);
      }
      updateByLogger(t) {
        (this.dataFromLogs = { ...this.dataFromLogs, newLogs: t }), t && this.updateView(t);
      }
      updateView(t) {
        const e = t;
        this.element.innerText = e.join('\n');
      }
    };
    c.registerStore(d);
    const B = new f();
    n.lookFor(B), B.connectToStore(d), new v().connectToLogger(n);
  },
  function (t, e) {},
  function (t, e, s) {
    s(0), (t.exports = s(1));
  },
]));
// # sourceMappingURL=bundle.js.map
