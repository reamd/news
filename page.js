(() => {
  const items = [
    {
      name: '微博热搜',
      url: 'https://reamd.github.io/wb-top-feed'
    },
    {
      name: '新浪财经',
      url: 'https://ruanyf.github.io/sina-news'
    },
    {
      name: 'lvv2',
      url: 'https://ruanyf.github.io/lvv2-feed'
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