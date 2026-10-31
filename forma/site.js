'use strict';

(() => {
  const preview = location.protocol === 'file:' || ['127.0.0.1', 'localhost'].includes(location.hostname);
  // App Store Connect US price change was saved and reloaded on 2026-10-30.
  const priceVerified = true;
  const referencePriceVerified = true;
  const showOffer = preview || (priceVerified && referencePriceVerified);
  const strings = {
    zh: {
      pageTitle: 'Forma Video Converter · 一次买断',
      description: 'Forma 视频转换：通用 MP4、HEVC、音频提取与视频瘦身。本机处理，一次买断，无订阅。',
      offerLabel: '一次买断', oldLabel: '原价 5.99 美元', iconAlt: 'Forma 应用图标',
      scenes: ['导入与视频预览', '通用 MP4 转换', 'HEVC 小体积转换', '音频提取', '视频瘦身', '保存视频提示', '转换完成结果', '语言设置'],
      text: {
        draftNote: 'Forma 1.1 更新准备中 · 以下为新版说明 · 可下载版本以 App Store 为准',
        badge: '升级特惠', title: '好用的格式，\n一次解锁。',
        lead: 'MP4、HEVC、音频提取与视频瘦身。\n在你的设备上，完成每一次转换。',
        access: 'FORMA 终身买断', saving: '立省 US$2.00',
        lifetime: '一次买断 · 解锁全部四种转换模式', rule: '不订阅，不自动续费。',
        f1: '通用 MP4', f2: 'HEVC 小体积', f3: '提取音频', f4: '视频瘦身',
        buyLabel: '前往 App Store · App 内买断',
        paymentNote: '美国区定价，实际金额及各地区可用性以 Apple 购买页为准；不订阅',
        trialSummary: '通过 Apple 免费领取三天通用 MP4 试用，不自动扣费。到期后需买断；重装不重置试用。',
        privacy: '隐私政策', terms: '服务条款', support: '技术支持'
      }
    },
    en: {
      pageTitle: 'Forma Video Converter · Lifetime Unlock',
      description: 'Convert videos to MP4, HEVC, audio or smaller files, right on your device. One lifetime purchase. No subscription.',
      offerLabel: 'Lifetime purchase', oldLabel: 'Previous price: 5.99 US dollars', iconAlt: 'Forma app icon',
      scenes: ['Import and video preview', 'Universal MP4 conversion', 'Small HEVC conversion', 'Audio extraction', 'Slim Video', 'Save video prompt', 'Completed conversion', 'Language settings'],
      text: {
        draftNote: 'Forma 1.1 update in preparation · New-version details · Check the App Store for availability',
        badge: 'Upgrade offer', title: 'Better formats.\nOne purchase.',
        lead: 'MP4, HEVC, audio extraction and smaller videos.\nConverted right on your device.',
        access: 'FORMA LIFETIME', saving: 'Save US$2.00',
        lifetime: 'One purchase. All four conversion modes.', rule: 'No subscription. No recurring fees.',
        f1: 'Universal MP4', f2: 'Small HEVC', f3: 'Audio extraction', f4: 'Slim Video',
        buyLabel: 'Get Forma on the App Store',
        paymentNote: 'US pricing. Final price and regional availability are shown by Apple. No subscription.',
        trialSummary: 'Claim a free three-day Universal MP4 trial through Apple. No automatic charge. Purchase required after expiry; reinstalling does not restart the trial.',
        privacy: 'Privacy', terms: 'Terms', support: 'Support'
      }
    }
  };
  let language = 'zh';
  try { language = localStorage.getItem('forma-site-language') === 'en' ? 'en' : 'zh'; } catch {}
  const requested = new URL(location.href).searchParams.get('lang');
  if (requested === 'en' || requested === 'zh') language = requested;

  function render() {
    const copy = strings[language];
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = copy.pageTitle;
    document.querySelector('meta[name="description"]').content = copy.description;
    document.body.classList.toggle('english', language === 'en');
    for (const [id, text] of Object.entries(copy.text)) {
      const element = document.getElementById(id);
      element.textContent = text;
      if (id === 'title' || id === 'lead') element.style.whiteSpace = 'pre-line';
    }
    const toggle = document.getElementById('language');
    toggle.textContent = language === 'en' ? '中文' : 'EN';
    toggle.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
    toggle.hidden = false;
    document.querySelector('.offer').setAttribute('aria-label', copy.offerLabel);
    document.querySelector('.old').setAttribute('aria-label', copy.oldLabel);
    document.querySelector('.wordmark img').alt = copy.iconAlt;
    document.getElementById('draftNote').hidden = false;
    for (const selector of ['.price', '#saving', '#badge']) document.querySelector(selector).hidden = !showOffer;
    if (showOffer) {
      document.querySelector('.old').textContent = '$5.99';
      const currency = document.createElement('span');
      currency.className = 'currency';
      currency.textContent = 'US';
      document.querySelector('.amount').replaceChildren(currency, '$3.99');
    }
    for (const image of document.querySelectorAll('[data-scene]')) {
      image.src = `assets/screens/${language === 'en' ? 'EN' : 'ZH-Hans'}/${image.dataset.scene}.jpg`;
      image.alt = copy.scenes[Number(image.dataset.scene) - 1];
    }
    try { localStorage.setItem('forma-site-language', language); } catch {}
  }
  document.getElementById('language').addEventListener('click', () => {
    language = language === 'en' ? 'zh' : 'en';
    render();
  });
  render();
})();
