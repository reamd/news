(() => {
  const items = [
    {
      name: '微博热搜',
      url: 'https://reamd.github.io/wb-top-feed'
    },
    {
      name: '新浪财经',
      url: 'https://reamd.github.io/sina-news'
    },
    {
      name: 'lvv2',
      url: 'https://reamd.github.io/lvv2-feed'
    },
  ];

  const iframe = document.getElementById('container');

  function renderTpl(items) {
    const ul = document.querySelector('.tab-container');
    const fragment = document.createDocumentFragment();

    items.forEach((i, idx) => {
      const li = document.createElement('li');
      li.setAttribute('data-src', i.url);
      if (idx === 0) {
        li.setAttribute('class', 'is-active');
        iframe.setAttribute('src', i.url);
      }

      li.innerHTML = `<a>${i.name}</a>`;
      fragment.appendChild(li);
    });

    ul.appendChild(fragment);
  }
  
  function bindEvt() {
    document.querySelector('.tab-container').addEventListener('click', function(e) {
      e.stopPropagation();
      const tDom = e.target;
      const pDom = tDom.parentNode;
      const oSrc = pDom.dataset['src'];
      if (pDom.classList.contains('is-active')) {
        return;
      } else {
        document.querySelector('.tab-container .is-active').classList.remove('is-active');
        pDom.classList.add('is-active');
        iframe.setAttribute('src', oSrc);
      }
    });
  }

  renderTpl(items);
  
  setTimeout(() => {
    bindEvt();
  });

})();

(() => {
  // 分享朋友圈
  function shareFriendCircle(data) {
      window.WeixinJSBridge.on('menu:share:timeline', function () {
          window.WeixinJSBridge.invoke('shareTimeline', {
              'appid': '',
              'img_url': `assets/share.jpg`,
              'img_width': '108',
              'img_height': '108',
              'link': location.href,
              'desc': data.desc,
              'title': data.title
          }, function (res) {
              lib.report('h5_refund_share_circles')
          })
      })
  }

  // 分享好友
  function shareFriend(data) {
      window.WeixinJSBridge.on('menu:share:appmessage', function () {
          window.WeixinJSBridge.invoke('sendAppMessage', {
              'appid': '',
              'img_url': `assets/share.jpg`, // 分享图标
              'img_width': '108',
              'img_height': '108',
              'link': location.href,
              'desc': data.desc,
              'title': data.title
          }, function (res) {
              lib.report('h5_refund_share_friend')
          })
      })
  }

  // jsonp 回调函数
  function renderTplData(data) {
      // 初始化微信js桥
      if (typeof WeixinJSBridge === 'undefined') {
          document.addEventListener('WeixinJSBridgeReady', function() {
              shareFriendCircle(data)
              shareFriend(data)
          }, false)
      } else {
          shareFriendCircle(data)
          shareFriend(data)
      }
  }

  renderTplData({
    title: '消息汇',
    desc: '免广告定制版信息获取平台'
  });
})();
