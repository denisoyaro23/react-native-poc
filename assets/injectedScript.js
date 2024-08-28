/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
// Note: if testing with joist app locally,
// run 'npx http-server ./src/scripts/enrollment -c-1' to serve this script
// as a static asset
(function () {
  console.log('user script loaded');
  const MEMBER_ID = '{{MEMBER_ID}}';
  const REWARD_PROGRAM_ID = '{{REWARD_PROGRAM_ID}}';
  const OPTIMUS_WEB_URL = '{{OPTIMUS_WEB_URL}}';
  const MAX_TRY_COUNT = 10;
  const IS_NON_PRO_ACCOUNT = 'isNonProAccount';
  const MEMBER_PARTNER_RELATION_EMAIL = 'memberPartnerRelationEmail';
  const DEBUG = '{{DEBUG}}' === 'true';
  const joistLogo = `
    <div>
      <svg width="125" height="37" viewBox="0 0 125 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_22650_1435)">
        <g clip-path="url(#clip1_22650_1435)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.59478 30.7433C3.82289 30.7433 1.99132 29.5227 0.770752 28.0724L3.23822 25.3261C4.25609 26.4442 5.24615 27.1086 6.49233 27.1086C7.96901 27.1086 8.8837 26.2188 8.8837 24.1589V12.6851H12.9025V24.3338C12.9025 28.6563 10.3604 30.7433 6.59478 30.7433Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M26.6012 30.7932C21.1058 30.7932 17.1638 26.6983 17.1638 21.6375V21.5863C17.1638 16.5255 21.1577 12.3809 26.651 12.3809C32.145 12.3809 36.087 16.4757 36.087 21.5358V21.5863C36.087 26.6486 32.093 30.7932 26.6012 30.7932ZM31.9928 21.5865C31.9928 18.5358 29.7536 15.9923 26.6013 15.9923C23.4481 15.9923 21.2602 18.4839 21.2602 21.5368V21.5865C21.2602 24.6387 23.4972 27.1815 26.651 27.1815C29.8056 27.1815 32.0001 24.6906 32.0001 21.6377V21.5865H31.9928Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M40.3176 12.6807L44.2339 12.6924L44.1805 30.4937L40.259 30.4828L40.3176 12.6807Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M56.145 30.7433C53.3636 30.7535 50.6751 29.7393 48.5925 27.8946L50.9056 25.1212C52.5089 26.4442 54.1868 27.2835 56.2211 27.2835C57.8243 27.2835 58.7888 26.6484 58.7888 25.6049V25.5544C58.7888 24.5629 58.1792 24.0529 55.2047 23.2852C51.6176 22.3691 49.3045 21.3768 49.3045 17.8417V17.7986C49.3045 14.5679 51.8979 12.4312 55.5339 12.4312C58.1273 12.4312 60.3416 13.2412 62.1475 14.7003L61.557 15.5565L60.1133 17.6522C59.9091 17.5103 59.7057 17.3763 59.5037 17.2505C58.1353 16.3987 56.7918 15.8967 55.4834 15.8967C53.9841 15.8967 53.1945 16.5817 53.1945 17.4481V17.4978C53.1945 18.6686 53.9585 19.0506 57.0348 19.8394C60.646 20.779 62.681 22.0771 62.681 25.179V25.2302C62.681 28.7653 59.9852 30.7499 56.145 30.7499" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M74.4832 30.4891H70.5719V16.2967H65.1497V12.6855H74.4619L74.4832 30.4891Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M81.2977 12.9241L76.01 16.1657V12.676L81.2977 9.43359V12.9219" fill="#8EC240"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M76.01 6.12646V9.614L78.2053 10.7629L80.852 9.09153L76.01 6.12646Z" fill="black"/>
        </g>
        <path d="M91.8631 12.334L87.5078 16.6893V27.1526H118.391L122.746 22.7974V12.334H91.8631ZM96.8617 17.8729H93.7231V18.97H96.7916V20.4135H93.7231V21.6013H96.8617V23.0366H92.0198V16.4335H96.8617V17.8729ZM101.027 23.0407H98.2434V16.4377H101.015C103.094 16.4377 104.591 17.6832 104.591 19.733C104.591 21.7828 103.098 23.0407 101.027 23.0407ZM111.994 21.8735C111.28 22.6571 110.319 23.1603 109.074 23.1603C107.102 23.1603 105.498 21.8446 105.498 19.7454C105.498 17.6461 107.102 16.3304 109.074 16.3304C110.517 16.3304 111.408 17.0439 111.895 17.8647L110.468 18.6153C110.2 18.1781 109.697 17.8317 109.074 17.8317C107.993 17.8317 107.234 18.6648 107.234 19.7412C107.234 20.8177 107.997 21.6508 109.074 21.6508C109.589 21.6508 110.055 21.4735 110.319 21.2549V20.7022H108.806V19.2876H111.994V21.8735ZM118.23 17.8729H115.091V18.97H118.16V20.4135H115.091V21.6013H118.23V23.0366H113.388V16.4335H118.23V17.8729Z" fill="#008000"/>
        <path d="M101.031 17.9223H99.9508V21.5559H101.019C102.178 21.5559 102.85 20.7145 102.85 19.7329C102.85 18.7513 102.236 17.9223 101.027 17.9223H101.031Z" fill="#008000"/>
        </g>
        <defs>
        <clipPath id="clip0_22650_1435">
        <rect width="124.508" height="37" fill="white"/>
        </clipPath>
        <clipPath id="clip1_22650_1435">
        <rect width="81.7083" height="24.6667" fill="white" transform="translate(0 6.45996)"/>
        </clipPath>
        </defs>
      </svg>
    </div>
  `;

  const onboardingErrorPopUpStr = '<div id="onboarding-error-pop-up" style="position: absolute;display: none;top: 12px;"><div style="opacity: 1; transform: none; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;border-radius: 4px; box-shadow: none;box-shadow: none;border-bottom-right-radius: 8px;border-bottom-left-radius: 8px;font-size: 16px;font-weight: 500;line-height: 1.43;letter-spacing: 0.01071em;background-color: rgb(251, 238, 238);display: flex;padding: 6px 16px;color: rgb(87, 35, 35);width: 100%;"><div style="color: #d32f2f;margin-right: 12px;display: flex;font-size: 22px;opacity: 0.9;"><svg style="width: 1em; height: 1em;display: inline-block;fill: currentColor;flex-shrink: 0;transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg></div><div>Something went wrong, Please try again later</div></div></div>';
  const onboardingSuccessPopUpStr = '<div id="onboarding-success-pop-up" style="position: absolute;display: none;top: 12px;"><div style="opacity: 1; transform: none; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;border-radius: 4px; box-shadow: none;box-shadow: none;border-bottom-right-radius: 8px;border-bottom-left-radius: 8px;font-size: 16px;font-weight: 500;line-height: 1.43;letter-spacing: 0.01071em;background-color: rgb(237, 247, 237);display: flex;padding: 6px 16px;color: rgb(30, 70, 32);width: 100%;"><div style="color: #2e7d32;;margin-right: 12px;display: flex;font-size: 22px;opacity: 0.9;"><svg style="width: 1em; height: 1em;display: inline-block;fill: currentColor;flex-shrink: 0;transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path></svg></div><div>Onboarding done!</div></div></div>';

  // generic error handler
  function defaultErrorHandler(err) {
    console.error(err);
    dispatchOptimusEvent({
      name: 'reward_partner_error',
      detail: {
        error: {
          message: err.message,
          stack: err.stack,
        },
      },
    });
  }

  // helper function for waiting for an HTML element or DOM state
  async function waitForElement(name, provider, max = 20) {
    const error = new Error(`missing ${name}`);

    return new Promise((resolve, reject) => {
      let count = 0;

      const intervalId = setInterval(() => {
        const element = provider();

        if (element) {
          clearInterval(intervalId);
          resolve(element);
        } else {
          count += 1;

          if (count >= max) {
            clearInterval(intervalId);
            reject(error);
          }
        }
      }, 10);
    });
  }

  const spinner = document.createElement('div'); // global spinner element
  // add custom css class definitions
  function addOptimusClassDefinitions() {
    const optimusStyle = document.createElement('style');
    optimusStyle.innerHTML = '.optimus-no-scroll { overflow: hidden; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .spinner { border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 50%; border-top: 2px solid white; width: 24px; height: 24px; animation: spin 1s linear infinite; }';
    if (document.getElementsByTagName('head').length !== 0) {
      document.getElementsByTagName('head')[0].appendChild(optimusStyle);
    }
  }

  // map html string to html
  function strToHtml(htmlstr) {
    const template = document.createElement('template');
    template.innerHTML = htmlstr.trim();
    return template.content.firstElementChild.cloneNode(true);
  }

  // handle optimus app visibility
  function handleOptimusAppVisibility(hideOptimusApp, optimusAppDiv) {
    if (hideOptimusApp === 'true') {
      optimusAppDiv.style.display = 'none';
      document.body.classList.remove('optimus-no-scroll');
    } else {
      optimusAppDiv.style.display = 'block';
      document.body.classList.add('optimus-no-scroll');
    }
  }

  // load optimus app as iframe
  function addOptimusApp() {
    if (!document.getElementById('optimus-app-iframe-div')) {
      const hideOptimusApp = window.localStorage.getItem('hideOptimusApp');
      const optimusAppDiv = document.createElement('div');
      optimusAppDiv.id = 'optimus-app-iframe-div';
      optimusAppDiv.style.cssText =
        'position:fixed;inset: 0;background-color: #ffffff;z-index:999999;height:100%;width:100%;overflow-y: scroll;margin-bottom:16px;';
      handleOptimusAppVisibility(hideOptimusApp, optimusAppDiv);
      // load optimus app. Using dev build as of now
      optimusAppDiv.innerHTML = `<iframe id="optimus-app-iframe" src="${OPTIMUS_WEB_URL}" style="width:100%; height:100%; border:none; margin:0; padding:0; position: static;" ></iframe>`;
      document.body.appendChild(optimusAppDiv);
    }
  }

  // pass content to optimus app
  function passContentToOptimus(messageType, tryCount) {
    if (tryCount >= MAX_TRY_COUNT) return;

    const frame = document.getElementById('optimus-app-iframe');
    if (frame instanceof HTMLIFrameElement) {
      const memberPartnerRelationEmail = window.localStorage.getItem(MEMBER_PARTNER_RELATION_EMAIL);
      const optimusEventBuffer = JSON.parse(window.localStorage.getItem('optimusEventBuffer'));
      if (messageType === 'JOIST_EVENT_BUFFER_RESPONSE' && optimusEventBuffer) {
        frame.contentWindow?.postMessage({ type: messageType, payload: { content: optimusEventBuffer } }, '*');
        window.localStorage.setItem('optimusEventBuffer', null); // clear the buffer
      } else if (
        messageType === 'JOIST_MEMBER_PARTNER_RELATION_EMAIL_RESPONSE' &&
        memberPartnerRelationEmail
      ) {
        frame.contentWindow?.postMessage({ type: messageType, payload: { content: memberPartnerRelationEmail } }, '*');
      } else {
        frame.contentWindow?.postMessage({ type: messageType }, '*');
      }
    } else {
      tryCount += 1;
      console.log(`try ${tryCount}: failed to send ${messageType}`);
      window.setTimeout(() => {
        passContentToOptimus(messageType, tryCount);
      }, 20);
    }
  }

  function addTopMarginToSignInDiv(marginTop, tryCount) {
    if (tryCount >= MAX_TRY_COUNT) return;

    const signinBody = document.getElementById('single-signin__body');
    if (signinBody instanceof HTMLDivElement) {
      signinBody.style.marginTop = marginTop;
    } else {
      tryCount += 1;
      console.log(`try ${tryCount}: top margin not added to sign in div`);
      window.setTimeout(() => {
        addTopMarginToSignInDiv(marginTop, tryCount);
      }, 20);
    }
  }

  // banner to instruct user to sign in or create account
  function addSignInOrCreateAccountDiv() {
    const htmlStr = `
      <div id="optimus-signin-or-create-container-div" style="background-color: #F1F1F5;margin:0px;width:100%;position:fixed;top:0;left:0;border-radius: 0 0 5% 5%;">
        <div style="display:flex;justify-content:center;margin-top:20px;margin-bottom:8px;">${joistLogo}</div>
        <div style="display:flex;align-items:center;margin-left:22px;margin-right:24px;padding-left:20px;padding-right:27px;padding-top:14px;padding-bottom:13px;background: #FFFFFF;border: 1px solid #DADADA;border-radius: 13px;">
          <div id="optimus-signin-or-create-container-div2" style="margin-right:16px;padding-top:6px;">
            <svg width="41" height="43" viewBox="0 0 41 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.8891 18.0927C21.5508 18.0927 25.3337 14.0042 25.3337 8.94129C25.3337 3.99301 21.5508 0 16.8891 0C12.2465 0 8.44455 4.03122 8.44455 8.9795C8.46366 14.0042 12.2274 18.0927 16.8891 18.0927ZM16.8891 14.4627C14.3481 14.4627 12.2083 12.1319 12.2083 8.9604C12.1892 5.90354 14.3481 3.63001 16.8891 3.63001C19.4492 3.63001 21.5699 5.88444 21.5699 8.94129C21.5699 12.1128 19.4492 14.4627 16.8891 14.4627ZM5.04381 35.918H21.5508C21.3789 35.2493 21.3024 34.5233 21.3024 33.7018V32.3071H4.62349C4.20317 32.3071 4.05033 32.1543 4.05033 31.8295C4.05033 29.0592 8.69292 23.8434 16.8891 23.8434C18.8187 23.8434 20.5573 24.1682 22.0666 24.6841C22.4679 23.404 23.3085 22.4105 24.6077 21.7419C22.3723 20.8057 19.774 20.2134 16.8891 20.2134C6.70597 20.2134 0 27.0722 0 32.479C0 34.8099 1.66216 35.918 5.04381 35.918Z" fill="#4D4D4D"/>
              <path d="M24.0918 33.74C24.0918 37.3891 26.2507 38.8602 31.6766 41.8598C32.1542 42.1272 32.842 42.1846 33.4152 41.8598C38.8602 38.8984 41 37.3891 41 33.74V26.843C41 25.5247 40.5606 24.7414 39.2614 24.2065C38.2488 23.7861 34.7526 22.6016 33.8164 22.2577C32.9758 21.9902 32.0587 21.9902 31.1799 22.315C30.3201 22.6016 26.8239 23.7861 25.8304 24.2065C24.5312 24.7414 24.0918 25.5247 24.0918 26.843V33.74ZM31.4856 37.4655C31.0843 37.4655 30.6067 37.3318 30.301 37.007L27.1104 33.549C26.843 33.2433 26.671 32.8421 26.671 32.4791C26.671 31.5429 27.3779 30.9888 28.1803 30.9888C28.6389 30.9888 29.0019 31.1608 29.2693 31.4474L31.39 33.7973L35.7843 27.7027C36.0708 27.3206 36.5103 27.0531 37.0261 27.0531C37.8285 27.0531 38.5163 27.7027 38.5163 28.5243C38.5163 28.7917 38.4208 29.1165 38.2106 29.384L32.7083 36.9306C32.4408 37.2554 31.9823 37.4655 31.4856 37.4655Z" fill="#FE2C55"/>
            </svg>
          </div>
          <div id="optimus-signin-or-create-container-div3">
            <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 1</div>
            <div id="optimus-signin-or-create-div" style="font-weight: 600;font-size: 16px;line-height: 21px;color: #181818;">
              Sign In or Sign Up
            </div>
            <div id="optimus-signin-or-create-div2" style="font-weight: 400;font-size: 14px; color: #8F8F8F;">
              to your Home Depot Pro Xtra Account
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:center;margin-top:7px;margin-bottom:12px;">
          <svg width="50" height="18" viewBox="0 0 50 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="9" cy="9" rx="9" ry="9" transform="rotate(-180 9 9)" fill="#FE2C55"/>
            <ellipse cx="30" cy="9" rx="4" ry="4" transform="rotate(-180 30 9)" fill="#B9B9B9"/>
            <ellipse cx="46" cy="9" rx="4" ry="4" transform="rotate(-180 46 9)" fill="#B9B9B9"/>
            <path d="M8.86572 13H10.4878V5.24951H8.87109L6.86768 6.64062V8.10156L8.76904 6.78027H8.86572V13Z" fill="white"/>
          </svg>    
        </div>
      </div>
    `;

    const divElem = strToHtml(htmlStr);
    document.body.appendChild(divElem);
    addTopMarginToSignInDiv('200px', 0);
  }

  function removeSignInOrCreateAccountDiv() {
    if (document.getElementById('optimus-signin-or-create-container-div')) {
      document.getElementById('optimus-signin-or-create-container-div').style.display = 'none';
    }
  }

  // banner to instruct user to create a pro account
  function addCreateProAccountDiv() {
    const htmlStr = `
      <div id="optimus-create-pro-container-div" style="background-color: #F1F1F5;margin:0px;width:100%;position:fixed;top:0;left:0;margin: 0;border-radius: 0 0 5% 5%;">
        <div style="display:flex;justify-content:center;margin-top:20px;margin-bottom:8px;">${joistLogo}</div>
        <div style="display:flex;align-items:center;margin-left:22px;margin-right:24px;padding-left:20px;padding-right:27px;padding-top:14px;padding-bottom:13px;background: #FFFFFF;border: 1px solid #DADADA;border-radius: 13px;">
          <div id="optimus-create-pro-container-div2" style="margin-right:16px;padding-top:6px;">
            <svg width="41" height="43" viewBox="0 0 41 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.8891 18.0927C21.5508 18.0927 25.3337 14.0042 25.3337 8.94129C25.3337 3.99301 21.5508 0 16.8891 0C12.2465 0 8.44455 4.03122 8.44455 8.9795C8.46366 14.0042 12.2274 18.0927 16.8891 18.0927ZM16.8891 14.4627C14.3481 14.4627 12.2083 12.1319 12.2083 8.9604C12.1892 5.90354 14.3481 3.63001 16.8891 3.63001C19.4492 3.63001 21.5699 5.88444 21.5699 8.94129C21.5699 12.1128 19.4492 14.4627 16.8891 14.4627ZM5.04381 35.918H21.5508C21.3789 35.2493 21.3024 34.5233 21.3024 33.7018V32.3071H4.62349C4.20317 32.3071 4.05033 32.1543 4.05033 31.8295C4.05033 29.0592 8.69292 23.8434 16.8891 23.8434C18.8187 23.8434 20.5573 24.1682 22.0666 24.6841C22.4679 23.404 23.3085 22.4105 24.6077 21.7419C22.3723 20.8057 19.774 20.2134 16.8891 20.2134C6.70597 20.2134 0 27.0722 0 32.479C0 34.8099 1.66216 35.918 5.04381 35.918Z" fill="#4D4D4D"/>
              <path d="M24.0918 33.74C24.0918 37.3891 26.2507 38.8602 31.6766 41.8598C32.1542 42.1272 32.842 42.1846 33.4152 41.8598C38.8602 38.8984 41 37.3891 41 33.74V26.843C41 25.5247 40.5606 24.7414 39.2614 24.2065C38.2488 23.7861 34.7526 22.6016 33.8164 22.2577C32.9758 21.9902 32.0587 21.9902 31.1799 22.315C30.3201 22.6016 26.8239 23.7861 25.8304 24.2065C24.5312 24.7414 24.0918 25.5247 24.0918 26.843V33.74ZM31.4856 37.4655C31.0843 37.4655 30.6067 37.3318 30.301 37.007L27.1104 33.549C26.843 33.2433 26.671 32.8421 26.671 32.4791C26.671 31.5429 27.3779 30.9888 28.1803 30.9888C28.6389 30.9888 29.0019 31.1608 29.2693 31.4474L31.39 33.7973L35.7843 27.7027C36.0708 27.3206 36.5103 27.0531 37.0261 27.0531C37.8285 27.0531 38.5163 27.7027 38.5163 28.5243C38.5163 28.7917 38.4208 29.1165 38.2106 29.384L32.7083 36.9306C32.4408 37.2554 31.9823 37.4655 31.4856 37.4655Z" fill="#FE2C55"/>
            </svg>
          </div>
          <div id="optimus-create-pro-container-div3">
            <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 1</div>
            <div id="optimus-create-pro-div" style="font-weight: 600;font-size: 16px;line-height: 21px;color: #181818;">
              Sign In or Sign Up
            </div>
            <div id="optimus-create-pro-div2" style="font-weight: 400;font-size: 14px; color: #8F8F8F;">
              Create Pro Xtra Account
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:center;margin-top:7px;margin-bottom:12px;">
          <svg width="50" height="18" viewBox="0 0 50 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="9" cy="9" rx="9" ry="9" transform="rotate(-180 9 9)" fill="#FE2C55"/>
            <ellipse cx="30" cy="9" rx="4" ry="4" transform="rotate(-180 30 9)" fill="#B9B9B9"/>
            <ellipse cx="46" cy="9" rx="4" ry="4" transform="rotate(-180 46 9)" fill="#B9B9B9"/>
            <path d="M8.86572 13H10.4878V5.24951H8.87109L6.86768 6.64062V8.10156L8.76904 6.78027H8.86572V13Z" fill="white"/>
          </svg>    
        </div>
      </div>
    `;

    const divElem = strToHtml(htmlStr);
    document.body.appendChild(divElem);
    addTopMarginToSignInDiv('200px', 0);
  }

  function removeCreateProAccountDiv() {
    if (document.getElementById('optimus-create-pro-container-div')) {
      document.getElementById('optimus-create-pro-container-div').style.display = 'none';
    }
  }

  // banner for user to navigate to credit card page
  function addGoToCreditCardDiv() {
    const htmlStr = `
    <div id="optimus-credit-card-container-div" style="position: fixed;z-index: 10000;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);">
      <div id="optimus-credit-card-container-div2" style="background-color: #F1F1F5;margin:0px;width:100%;border-radius: 0 0 5% 5%;">
        <div>
          <div style="display:flex;justify-content:center;padding-top:20px;margin-bottom:10px;">${joistLogo}</div>
          <div style="background: #FFFFFF;border-radius: 13px;padding: 25px 18px;margin-left:25px;margin-right:25px;margin-bottom:20px;">
            <div style="display:flex;align-tems:center;background: #DADADA;border: 1px solid #DADADA;border-radius: 13px;padding:9px 20px;">
              <div style="margin-right:19px;padding-top:10px;">
                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.567 33.8632C26.6733 33.8632 34.2128 26.3073 34.2128 17.2174C34.2128 8.11111 26.6569 0.571531 17.5507 0.571531C8.46076 0.571531 0.92118 8.11111 0.92118 17.2174C0.92118 26.3073 8.47708 33.8632 17.567 33.8632ZM17.567 31.0889C9.86423 31.0889 3.7118 24.9201 3.7118 17.2174C3.7118 9.51459 9.84792 3.34584 17.5507 3.34584C25.2535 3.34584 31.4385 9.51459 31.4385 17.2174C31.4385 24.9201 25.2698 31.0889 17.567 31.0889ZM15.7719 24.9691C16.3104 24.9691 16.7674 24.708 17.0937 24.2021L24.5517 12.4684C24.7312 12.142 24.9434 11.783 24.9434 11.424C24.9434 10.6896 24.2906 10.2163 23.6052 10.2163C23.1972 10.2163 22.7892 10.4774 22.4792 10.9507L15.7066 21.8194L12.4917 17.658C12.1 17.1358 11.741 17.0052 11.284 17.0052C10.5823 17.0052 10.0274 17.5764 10.0274 18.2944C10.0274 18.6535 10.1743 18.9962 10.4028 19.3063L14.3847 24.2021C14.7927 24.7406 15.2333 24.9691 15.7719 24.9691Z" fill="#FE2C55"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 1</div>
                <div style="font-size: 16px;"><span style="font-weight: 600;">Sign In</span> or <span style="font-weight: 600;">Sign Up</span> for a</div>
                <div style="font-weight: 400;font-size: 14px;color: #8F8F8F;">Home Depot Pro Xtra Account</div>
              </div>
            </div>
            <div style="display:flex;align-tems:center;border: 1px solid #DADADA;border-radius: 13px;padding:9px 20px; margin-top:8px;">
              <div style="margin-right:19px;padding-top:10px;">
                <svg width="38" height="28" viewBox="0 0 38 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.32284 27.4307H32.0312C35.5013 27.4307 37.3384 25.5936 37.3384 22.1549V5.27573C37.3384 1.82138 35.5013 0 32.0312 0H5.32284C1.85279 0 0 1.82138 0 5.27573V22.1549C0 25.6093 1.85279 27.4307 5.32284 27.4307ZM3.50146 5.63687C3.50146 4.19233 4.23943 3.48575 5.62117 3.48575H31.7329C33.099 3.48575 33.8526 4.19233 33.8526 5.63687V6.70458H3.50146V5.63687ZM5.62117 23.9292C4.23943 23.9292 3.50146 23.2384 3.50146 21.7938V10.4573H33.8526V21.7938C33.8526 23.2384 33.099 23.9292 31.7329 23.9292H5.62117Z" fill="#4D4D4D"/>
                  <path d="M11.6349 21.1815H7.78802C6.86163 21.1815 6.24927 20.5691 6.24927 19.6741V16.7693C6.24927 15.89 6.86163 15.262 7.78802 15.262H11.6349C12.5613 15.262 13.1737 15.89 13.1737 16.7693V19.6741C13.1737 20.5691 12.5613 21.1815 11.6349 21.1815Z" fill="#FE2C55"/>
                </svg>              
              </div>
              <div>
                <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 2</div>
                <div style="font-size: 16px;"><span style="font-weight: 600;">Confirm</span> the <span style="font-weight: 600;">Credit Card</span></div>
                <div style="font-weight: 400;font-size: 14px;color: #8F8F8F;">you shop with at Home Depot</div>
              </div>
            </div>
            <div style="display:flex;align-tems:center;border: 1px solid #DADADA;border-radius: 13px;padding:9px 20px;margin-top:8px;">
              <div style="margin-right:19px;padding-top:10px;">
                <svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.70501 0H30.6915C33.0572 0 34.3965 1.30176 34.3965 3.66746V9.95045C34.3965 9.95045 33.0051 9.45045 31.5552 9.95045V4.08052C31.5552 3.15427 31.0295 2.60352 30.0782 2.60352H4.30582C3.36705 2.60352 2.82883 3.15427 2.82883 4.08052V14.4571C2.82883 15.4083 3.36705 15.9215 4.30582 15.9215H19.5051C19.0051 16.9505 20.0051 18.5251 20.0051 18.5251H3.70501C1.32679 18.5251 0 17.2358 0 14.8576V3.66746C0 1.30176 1.32679 0 3.70501 0Z" fill="#4D4D4D"/>
                  <path d="M9.36265 9.26252C9.36265 8.2111 8.5115 7.34743 7.44756 7.34743C6.39614 7.34743 5.53247 8.2111 5.53247 9.26252C5.53247 10.3265 6.39614 11.1776 7.44756 11.1776C8.5115 11.1776 9.36265 10.3265 9.36265 9.26252Z" fill="#FE2C55"/>
                  <path d="M14.9953 9.26252C14.9953 8.2111 14.1316 7.34743 13.0802 7.34743C12.0162 7.34743 11.1651 8.2111 11.1651 9.26252C11.1651 10.3265 12.0162 11.1776 13.0802 11.1776C14.1316 11.1776 14.9953 10.3265 14.9953 9.26252Z" fill="#FE2C55"/>
                  <path d="M20.6154 9.26252C20.6154 8.2111 19.7642 7.34743 18.7003 7.34743C17.6489 7.34743 16.7852 8.2111 16.7852 9.26252C16.7852 10.3265 17.6489 11.1776 18.7003 11.1776C19.7642 11.1776 20.6154 10.3265 20.6154 9.26252Z" fill="#FE2C55"/>
                  <path d="M34.1232 26.9127C39.0056 25.7414 41.062 22.0012 39.8165 16.8097L39.2948 14.635C38.8268 12.6842 37.5579 11.6245 36.4066 11.9007C36.1188 11.9698 35.9891 12.1813 36.0582 12.4691L36.2807 13.3965C36.3727 13.7803 36.2295 14.0289 36.0056 14.0826C35.7498 14.1439 35.5225 13.9955 35.4279 13.6011L35.2821 12.9935C34.9957 11.7995 34.0363 11.1842 32.981 11.4374C32.4799 11.5576 32.2884 11.8402 32.3959 12.288L32.6976 13.5459C32.7948 13.951 32.649 14.1889 32.4251 14.2426C32.1693 14.304 31.942 14.1556 31.8448 13.7505L31.5661 12.5885C31.2515 11.2773 30.3309 10.7766 29.2756 11.0298C28.7959 11.1449 28.5856 11.4434 28.6879 11.8698L29.2864 14.3643C29.381 14.7587 29.2377 15.0073 29.0139 15.061C28.7687 15.1198 28.5308 14.974 28.4336 14.5689L26.4669 6.37119C26.2572 5.49705 25.5408 5.04885 24.784 5.23043C23.9738 5.4248 23.5601 6.1441 23.7698 7.01823L26.6138 18.8723C26.6751 19.1282 26.5591 19.3026 26.3886 19.3435C26.2393 19.3793 26.0884 19.3141 25.9255 19.1051L23.5107 15.8063C23.1116 15.2707 22.6247 15.0267 22.0064 15.1751C21.1749 15.3746 20.7455 16.0751 20.9245 16.8213C20.9859 17.0772 21.0955 17.2989 21.2054 17.4754L24.3779 22.4752C27.0028 26.603 30.4135 27.8027 34.1232 26.9127Z" fill="#4D4D4D"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 3</div>
                <div style="font-size: 16px;"><span style="font-weight: 600;">Enter</span> and <span style="font-weight: 600;">Validate the code</span></div>
                <div style="font-weight: 400;font-size: 14px;color: #8F8F8F;">we will provide to you</div>
              </div>
            </div>
          </div>
          <div style="font-weight: 600;font-size: 16px;text-align: center;margin-top:20px;margin-bottom:18px;">You're signed In, continue to the next step</div>
          <div style="display:flex;flex-direction:column;align-items:center;">
            <button style="margin-bottom: 25px;color: #FFFCFC;padding-top: 10px;padding-bottom: 10px;font-size: 14px;font-weight: 600;background: #008000;border-radius: 19px;width: 216px;" id="optimus-credit-card-a">
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
    const divElem = strToHtml(htmlStr);
    divElem.querySelector('#optimus-credit-card-a').addEventListener('click', (event) => {
      window.location.assign('https://www.homedepot.com/myaccount/payments');
    });
    document.body.appendChild(divElem);
  }

  function removeGoToCreditCardDiv() {
    if (document.getElementById('optimus-credit-card-container-div')) {
      document.getElementById('optimus-credit-card-container-div').style.display = 'none';
    }
  }

  // banner to instruct user to create a pro account
  function addSelectProAccountDiv() {
    const htmlStr = `
      <div id="optimus-select-pro-container-div" style="background-color: #F1F1F5;margin:0px;width:100%;position:fixed;top:0;left:0;margin: 0;border-radius: 0 0 5% 5%;">
        <div style="display:flex;justify-content:center;margin-top:20px;margin-bottom:8px;">${joistLogo}</div>
        <div style="display:flex;align-items:center;margin-left:22px;margin-right:24px;padding-left:20px;padding-right:27px;padding-top:14px;padding-bottom:13px;background: #FFFFFF;border: 1px solid #DADADA;border-radius: 13px;">
          <div id="optimus-select-pro-container-div2" style="margin-right:16px;padding-top:6px;">
            <svg width="41" height="43" viewBox="0 0 41 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.8891 18.0927C21.5508 18.0927 25.3337 14.0042 25.3337 8.94129C25.3337 3.99301 21.5508 0 16.8891 0C12.2465 0 8.44455 4.03122 8.44455 8.9795C8.46366 14.0042 12.2274 18.0927 16.8891 18.0927ZM16.8891 14.4627C14.3481 14.4627 12.2083 12.1319 12.2083 8.9604C12.1892 5.90354 14.3481 3.63001 16.8891 3.63001C19.4492 3.63001 21.5699 5.88444 21.5699 8.94129C21.5699 12.1128 19.4492 14.4627 16.8891 14.4627ZM5.04381 35.918H21.5508C21.3789 35.2493 21.3024 34.5233 21.3024 33.7018V32.3071H4.62349C4.20317 32.3071 4.05033 32.1543 4.05033 31.8295C4.05033 29.0592 8.69292 23.8434 16.8891 23.8434C18.8187 23.8434 20.5573 24.1682 22.0666 24.6841C22.4679 23.404 23.3085 22.4105 24.6077 21.7419C22.3723 20.8057 19.774 20.2134 16.8891 20.2134C6.70597 20.2134 0 27.0722 0 32.479C0 34.8099 1.66216 35.918 5.04381 35.918Z" fill="#4D4D4D"/>
              <path d="M24.0918 33.74C24.0918 37.3891 26.2507 38.8602 31.6766 41.8598C32.1542 42.1272 32.842 42.1846 33.4152 41.8598C38.8602 38.8984 41 37.3891 41 33.74V26.843C41 25.5247 40.5606 24.7414 39.2614 24.2065C38.2488 23.7861 34.7526 22.6016 33.8164 22.2577C32.9758 21.9902 32.0587 21.9902 31.1799 22.315C30.3201 22.6016 26.8239 23.7861 25.8304 24.2065C24.5312 24.7414 24.0918 25.5247 24.0918 26.843V33.74ZM31.4856 37.4655C31.0843 37.4655 30.6067 37.3318 30.301 37.007L27.1104 33.549C26.843 33.2433 26.671 32.8421 26.671 32.4791C26.671 31.5429 27.3779 30.9888 28.1803 30.9888C28.6389 30.9888 29.0019 31.1608 29.2693 31.4474L31.39 33.7973L35.7843 27.7027C36.0708 27.3206 36.5103 27.0531 37.0261 27.0531C37.8285 27.0531 38.5163 27.7027 38.5163 28.5243C38.5163 28.7917 38.4208 29.1165 38.2106 29.384L32.7083 36.9306C32.4408 37.2554 31.9823 37.4655 31.4856 37.4655Z" fill="#FE2C55"/>
            </svg>
          </div>
          <div id="optimus-select-pro-container-div3">
            <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 1</div>
            <div id="optimus-select-pro-div" style="font-weight: 600;font-size: 16px;line-height: 21px;color: #181818;">
              Select Pro Xtra Account
            </div>
            <div id="optimus-select-pro-div2" style="font-weight: 400;font-size: 14px; color: #8F8F8F;">
              to continue to the next screen
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:center;margin-top:7px;margin-bottom:12px;">
          <svg width="50" height="18" viewBox="0 0 50 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="9" cy="9" rx="9" ry="9" transform="rotate(-180 9 9)" fill="#FE2C55"/>
            <ellipse cx="30" cy="9" rx="4" ry="4" transform="rotate(-180 30 9)" fill="#B9B9B9"/>
            <ellipse cx="46" cy="9" rx="4" ry="4" transform="rotate(-180 46 9)" fill="#B9B9B9"/>
            <path d="M8.86572 13H10.4878V5.24951H8.87109L6.86768 6.64062V8.10156L8.76904 6.78027H8.86572V13Z" fill="white"/>
          </svg>    
        </div>
      </div>
    `;

    const divElem = strToHtml(htmlStr);
    document.body.appendChild(divElem);
    addTopMarginToSignInDiv('200px', 0);
  }

  function removeSelectProAccountDiv() {
    if (document.getElementById('optimus-select-pro-container-div')) {
      document.getElementById('optimus-select-pro-container-div').style.display = 'none';
    }
  }

  function addNotCompletedCreditCard(onDebugSkip) {
    const htmlStr = `
      <div id="optimus-national-incentive-container-not-completed-div" style="background-color: #F1F1F5;margin:0px;width:100%;position:fixed;top:0;left:0;margin: 0;border-radius: 0 0 5% 5%;z-index:10000;">
        <div id="optimus-national-incentive-container-not-completed-logo" style="display:flex;justify-content:center;margin-top:20px;margin-bottom:8px;">${joistLogo}</div>
        <div style="display:flex;align-items:center;margin-left:22px;margin-right:24px;padding-left:20px;padding-right:27px;padding-top:14px;padding-bottom:13px;background: #FFFFFF;border: 1px solid #DADADA;border-radius: 13px;">
          <div id="optimus-national-incentive-container-not-completed-div2" style="margin-right:16px;padding-top:6px;">
            <svg width="38" height="28" viewBox="0 0 38 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.32284 27.4307H32.0312C35.5013 27.4307 37.3384 25.5936 37.3384 22.1549V5.27573C37.3384 1.82138 35.5013 0 32.0312 0H5.32284C1.85279 0 0 1.82138 0 5.27573V22.1549C0 25.6093 1.85279 27.4307 5.32284 27.4307ZM3.50146 5.63687C3.50146 4.19233 4.23943 3.48575 5.62117 3.48575H31.7329C33.099 3.48575 33.8526 4.19233 33.8526 5.63687V6.70458H3.50146V5.63687ZM5.62117 23.9292C4.23943 23.9292 3.50146 23.2384 3.50146 21.7938V10.4573H33.8526V21.7938C33.8526 23.2384 33.099 23.9292 31.7329 23.9292H5.62117Z" fill="#4D4D4D"/>
              <path d="M11.6349 21.1815H7.78802C6.86163 21.1815 6.24927 20.5691 6.24927 19.6741V16.7693C6.24927 15.89 6.86163 15.262 7.78802 15.262H11.6349C12.5613 15.262 13.1737 15.89 13.1737 16.7693V19.6741C13.1737 20.5691 12.5613 21.1815 11.6349 21.1815Z" fill="#FE2C55"/>
            </svg>
          </div>
          <div id="optimus-national-incentive-container-not-completed-div3">
            <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 2</div>
            <div id="optimus-national-incentive-not-completed-div" style="font-weight: 600;font-size: 16px;line-height: 21px;color: #181818;">
              Confirm the Credit card
            </div>
            <div id="optimus-national-incentive-not-completed-div2" style="font-weight: 400;font-size: 14px; color: #8F8F8F;">
              you shop with at Home Depot
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:center;margin-top:7px;margin-bottom:12px;">
          <div style="display:flex;align-items:center;">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="4" cy="4" rx="4" ry="4" transform="rotate(-180 4 4)" fill="#B9B9B9"/>
            </svg>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left:8px;margin-right:8px">
              <ellipse cx="9" cy="9" rx="9" ry="9" transform="rotate(-180 9 9)" fill="#FE2C55"/>
              <path d="M5.99414 13H12.0938V11.5762H8.36719V11.4414L9.93164 9.98242C11.4727 8.55859 11.9707 7.76172 11.9707 6.80078V6.7832C11.9707 5.32422 10.752 4.32812 9.01172 4.32812C7.16016 4.32812 5.89453 5.44141 5.89453 7.06445L5.90039 7.08789H7.53516V7.05859C7.53516 6.25586 8.10352 5.70508 8.92969 5.70508C9.73828 5.70508 10.2305 6.20898 10.2305 6.92969V6.94727C10.2305 7.53906 9.9082 7.9668 8.71875 9.12109L5.99414 11.8105V13Z" fill="white"/>
            </svg>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="4" cy="4" rx="4" ry="4" transform="rotate(-180 4 4)" fill="#B9B9B9"/>
            </svg>
          </div>   
        </div>
      </div>
    `;

    const divElem = strToHtml(htmlStr);

    if (DEBUG && onDebugSkip) {
      let clickCnt = 0;
      let timer;
      // const debugElement =
      // divElem.querySelector('#optimus-national-incentive-not-completed-div2');
      const logoElem = divElem.querySelector(
        '#optimus-national-incentive-container-not-completed-logo',
      );

      const onClick = () => {
        // debugElement.innerText = clickCnt;
        console.log('click', clickCnt);
        clickCnt += 1;
        if (clickCnt >= 7) {
          clickCnt = -99;
          onDebugSkip();
          // debugElement.innerText = 'completed';
          logoElem.removeListener('click', onClick);
        }
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          console.log('click reset');
          clickCnt = 0;
        }, 500);
      };
      logoElem.addEventListener('click', onClick);
    }

    document.body.appendChild(divElem);
  }

  function addCompletedCreditCard() {
    const htmlStr = `
    <div id="optimus-national-incentive-container-completed-div" style="position: fixed;z-index: 10000;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgba(0,0,0,0.4);">
      <div id="optimus-national-incentive-container-completed-div2" style="background-color: #F1F1F5;margin:0px;width:100%;border-radius: 0 0 5% 5%;">
        <div>
          <div style="display:flex;justify-content:center;padding-top:20px;margin-bottom:10px;">${joistLogo}</div>
          <div style="background: #FFFFFF;border-radius: 13px;padding: 25px 18px;margin-left:25px;margin-right:25px;margin-bottom:20px;">
            <div style="display:flex;align-tems:center;background: #DADADA;border: 1px solid #DADADA;border-radius: 13px;padding:9px 20px;">
              <div style="margin-right:19px;padding-top:10px;">
                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.567 33.8632C26.6733 33.8632 34.2128 26.3073 34.2128 17.2174C34.2128 8.11111 26.6569 0.571531 17.5507 0.571531C8.46076 0.571531 0.92118 8.11111 0.92118 17.2174C0.92118 26.3073 8.47708 33.8632 17.567 33.8632ZM17.567 31.0889C9.86423 31.0889 3.7118 24.9201 3.7118 17.2174C3.7118 9.51459 9.84792 3.34584 17.5507 3.34584C25.2535 3.34584 31.4385 9.51459 31.4385 17.2174C31.4385 24.9201 25.2698 31.0889 17.567 31.0889ZM15.7719 24.9691C16.3104 24.9691 16.7674 24.708 17.0937 24.2021L24.5517 12.4684C24.7312 12.142 24.9434 11.783 24.9434 11.424C24.9434 10.6896 24.2906 10.2163 23.6052 10.2163C23.1972 10.2163 22.7892 10.4774 22.4792 10.9507L15.7066 21.8194L12.4917 17.658C12.1 17.1358 11.741 17.0052 11.284 17.0052C10.5823 17.0052 10.0274 17.5764 10.0274 18.2944C10.0274 18.6535 10.1743 18.9962 10.4028 19.3063L14.3847 24.2021C14.7927 24.7406 15.2333 24.9691 15.7719 24.9691Z" fill="#FE2C55"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 1</div>
                <div style="font-size: 16px;"><span style="font-weight: 600;">Sign In</span> or <span style="font-weight: 600;">Sign Up</span> for a</div>
                <div style="font-weight: 400;font-size: 14px;color: #8F8F8F;">Home Depot Pro Xtra Account</div>
              </div>
            </div>
            <div style="display:flex;align-tems:center;background: #DADADA;border: 1px solid #DADADA;border-radius: 13px;padding:9px 20px; margin-top:8px;">
              <div style="margin-right:19px;padding-top:10px;">
                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.567 33.8632C26.6733 33.8632 34.2128 26.3073 34.2128 17.2174C34.2128 8.11111 26.6569 0.571531 17.5507 0.571531C8.46076 0.571531 0.92118 8.11111 0.92118 17.2174C0.92118 26.3073 8.47708 33.8632 17.567 33.8632ZM17.567 31.0889C9.86423 31.0889 3.7118 24.9201 3.7118 17.2174C3.7118 9.51459 9.84792 3.34584 17.5507 3.34584C25.2535 3.34584 31.4385 9.51459 31.4385 17.2174C31.4385 24.9201 25.2698 31.0889 17.567 31.0889ZM15.7719 24.9691C16.3104 24.9691 16.7674 24.708 17.0937 24.2021L24.5517 12.4684C24.7312 12.142 24.9434 11.783 24.9434 11.424C24.9434 10.6896 24.2906 10.2163 23.6052 10.2163C23.1972 10.2163 22.7892 10.4774 22.4792 10.9507L15.7066 21.8194L12.4917 17.658C12.1 17.1358 11.741 17.0052 11.284 17.0052C10.5823 17.0052 10.0274 17.5764 10.0274 18.2944C10.0274 18.6535 10.1743 18.9962 10.4028 19.3063L14.3847 24.2021C14.7927 24.7406 15.2333 24.9691 15.7719 24.9691Z" fill="#FE2C55"/>
                </svg>              
              </div>
              <div>
                <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 2</div>
                <div style="font-size: 16px;"><span style="font-weight: 600;">Confirm</span> the <span style="font-weight: 600;">Credit Card</span></div>
                <div style="font-weight: 400;font-size: 14px;color: #8F8F8F;">you shop with at Home Depot</div>
              </div>
            </div>
            <div style="display:flex;align-tems:center;border: 1px solid #DADADA;border-radius: 13px;padding:9px 20px;margin-top:8px;">
              <div style="margin-right:19px;padding-top:10px;">
                <svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.70501 0H30.6915C33.0572 0 34.3965 1.30176 34.3965 3.66746V9.95045C34.3965 9.95045 33.0051 9.45045 31.5552 9.95045V4.08052C31.5552 3.15427 31.0295 2.60352 30.0782 2.60352H4.30582C3.36705 2.60352 2.82883 3.15427 2.82883 4.08052V14.4571C2.82883 15.4083 3.36705 15.9215 4.30582 15.9215H19.5051C19.0051 16.9505 20.0051 18.5251 20.0051 18.5251H3.70501C1.32679 18.5251 0 17.2358 0 14.8576V3.66746C0 1.30176 1.32679 0 3.70501 0Z" fill="#4D4D4D"/>
                  <path d="M9.36265 9.26252C9.36265 8.2111 8.5115 7.34743 7.44756 7.34743C6.39614 7.34743 5.53247 8.2111 5.53247 9.26252C5.53247 10.3265 6.39614 11.1776 7.44756 11.1776C8.5115 11.1776 9.36265 10.3265 9.36265 9.26252Z" fill="#FE2C55"/>
                  <path d="M14.9953 9.26252C14.9953 8.2111 14.1316 7.34743 13.0802 7.34743C12.0162 7.34743 11.1651 8.2111 11.1651 9.26252C11.1651 10.3265 12.0162 11.1776 13.0802 11.1776C14.1316 11.1776 14.9953 10.3265 14.9953 9.26252Z" fill="#FE2C55"/>
                  <path d="M20.6154 9.26252C20.6154 8.2111 19.7642 7.34743 18.7003 7.34743C17.6489 7.34743 16.7852 8.2111 16.7852 9.26252C16.7852 10.3265 17.6489 11.1776 18.7003 11.1776C19.7642 11.1776 20.6154 10.3265 20.6154 9.26252Z" fill="#FE2C55"/>
                  <path d="M34.1232 26.9127C39.0056 25.7414 41.062 22.0012 39.8165 16.8097L39.2948 14.635C38.8268 12.6842 37.5579 11.6245 36.4066 11.9007C36.1188 11.9698 35.9891 12.1813 36.0582 12.4691L36.2807 13.3965C36.3727 13.7803 36.2295 14.0289 36.0056 14.0826C35.7498 14.1439 35.5225 13.9955 35.4279 13.6011L35.2821 12.9935C34.9957 11.7995 34.0363 11.1842 32.981 11.4374C32.4799 11.5576 32.2884 11.8402 32.3959 12.288L32.6976 13.5459C32.7948 13.951 32.649 14.1889 32.4251 14.2426C32.1693 14.304 31.942 14.1556 31.8448 13.7505L31.5661 12.5885C31.2515 11.2773 30.3309 10.7766 29.2756 11.0298C28.7959 11.1449 28.5856 11.4434 28.6879 11.8698L29.2864 14.3643C29.381 14.7587 29.2377 15.0073 29.0139 15.061C28.7687 15.1198 28.5308 14.974 28.4336 14.5689L26.4669 6.37119C26.2572 5.49705 25.5408 5.04885 24.784 5.23043C23.9738 5.4248 23.5601 6.1441 23.7698 7.01823L26.6138 18.8723C26.6751 19.1282 26.5591 19.3026 26.3886 19.3435C26.2393 19.3793 26.0884 19.3141 25.9255 19.1051L23.5107 15.8063C23.1116 15.2707 22.6247 15.0267 22.0064 15.1751C21.1749 15.3746 20.7455 16.0751 20.9245 16.8213C20.9859 17.0772 21.0955 17.2989 21.2054 17.4754L24.3779 22.4752C27.0028 26.603 30.4135 27.8027 34.1232 26.9127Z" fill="#4D4D4D"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 3</div>
                <div style="font-size: 16px;"><span style="font-weight: 600;">Enter</span> and <span style="font-weight: 600;">Validate the code</span></div>
                <div style="font-weight: 400;font-size: 14px;color: #8F8F8F;">we will provide to you</div>
              </div>
            </div>
          </div>
          <div style="font-weight: 600;font-size: 16px;text-align: center;margin-top:20px;margin-bottom:18px;">Credit card confirmed, go to the next step</div>
          <div style="display:flex;flex-direction:column;align-items:center;">
            <button style="margin-bottom: 25px;color: #FFFCFC;padding-top: 10px;padding-bottom: 10px;font-size: 14px;font-weight: 600;background: #008000;border-radius: 19px;width: 216px;" id="optimus-national-incentive-container-completed-btn">
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
    const divElem = strToHtml(htmlStr);
    divElem
      .querySelector('#optimus-national-incentive-container-completed-btn')
      .addEventListener('click', (event) => {
        window.location.assign('https://www.homedepot.com/b2b/account/view/proXtraPricing');
      });
    document.body.appendChild(divElem);
  }

  // banner for user to navigate to national incentives pop-up
  function addNationalIncentiveDiv({ complete, cardCount, cardType }) {
    if (window.location.href.includes('https://www.homedepot.com/myaccount/payments')) {
      if (!complete) {
        // TODO review
        // Simulate the result
        const onDebugSkip = () => {
          removeNationalIncentiveDiv();
          addNationalIncentiveDiv({
            complete: true,
            cardType: 'New Card',
            cardCount: 1,
          });
        };
        addNotCompletedCreditCard(onDebugSkip);
      } else {
        addCompletedCreditCard();
        dispatchOptimusEvent({
          name: 'rewards_credit_card_completed',
          detail: {
            cardType,
            cardCount,
          },
        });
        passContentToOptimus('JOIST_READY_FOR_EVENT_BUFFER_REQUEST', 0);
      }
    }
  }

  function removeNationalIncentiveDiv() {
    if (document.getElementById('optimus-national-incentive-container-not-completed-div')) {
      document.getElementById(
        'optimus-national-incentive-container-not-completed-div',
      ).style.display = 'none';
    }
    if (document.getElementById('optimus-national-incentive-container-completed-div')) {
      document.getElementById('optimus-national-incentive-container-completed-div').style.display =
        'none';
    }
  }

  // enrolment completed modal
  function addEnrolmentSuccessfulModal() {
    removeInputJoistCode();
    const htmlStr = `
    <div id="optimus-enrolment-successful-modal" style="position: fixed;z-index: 10000;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);">
      <div id="optimus-enrolment-successful-modal2" style="background-color: #F1F1F5;margin:0px;width:100%;border-radius: 0 0 5% 5%;">
        <div style="position: relative;">
          ${onboardingErrorPopUpStr}
          ${onboardingSuccessPopUpStr}
          <div style="display:flex;justify-content:center;padding-top:20px;margin-bottom:10px;">${joistLogo}</div>
          <div style="background: #FFFFFF;border-radius: 13px;padding: 25px 18px;margin-left:25px;margin-right:25px;margin-bottom:20px;">
            <div style="display:flex;align-tems:center;background: #DADADA;border: 1px solid #DADADA;border-radius: 13px;padding:9px 20px;">
              <div style="margin-right:19px;padding-top:10px;">
                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.567 33.8632C26.6733 33.8632 34.2128 26.3073 34.2128 17.2174C34.2128 8.11111 26.6569 0.571531 17.5507 0.571531C8.46076 0.571531 0.92118 8.11111 0.92118 17.2174C0.92118 26.3073 8.47708 33.8632 17.567 33.8632ZM17.567 31.0889C9.86423 31.0889 3.7118 24.9201 3.7118 17.2174C3.7118 9.51459 9.84792 3.34584 17.5507 3.34584C25.2535 3.34584 31.4385 9.51459 31.4385 17.2174C31.4385 24.9201 25.2698 31.0889 17.567 31.0889ZM15.7719 24.9691C16.3104 24.9691 16.7674 24.708 17.0937 24.2021L24.5517 12.4684C24.7312 12.142 24.9434 11.783 24.9434 11.424C24.9434 10.6896 24.2906 10.2163 23.6052 10.2163C23.1972 10.2163 22.7892 10.4774 22.4792 10.9507L15.7066 21.8194L12.4917 17.658C12.1 17.1358 11.741 17.0052 11.284 17.0052C10.5823 17.0052 10.0274 17.5764 10.0274 18.2944C10.0274 18.6535 10.1743 18.9962 10.4028 19.3063L14.3847 24.2021C14.7927 24.7406 15.2333 24.9691 15.7719 24.9691Z" fill="#FE2C55"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 1</div>
                <div style="font-size: 16px;"><span style="font-weight: 600;">Sign In</span> or <span style="font-weight: 600;">Sign Up</span> for a</div>
                <div style="font-weight: 400;font-size: 14px;color: #8F8F8F;">Home Depot Pro Xtra Account</div>
              </div>
            </div>
            <div style="display:flex;align-tems:center;background: #DADADA;border: 1px solid #DADADA;border-radius: 13px;padding:9px 20px; margin-top:8px;">
              <div style="margin-right:19px;padding-top:10px;">
                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.567 33.8632C26.6733 33.8632 34.2128 26.3073 34.2128 17.2174C34.2128 8.11111 26.6569 0.571531 17.5507 0.571531C8.46076 0.571531 0.92118 8.11111 0.92118 17.2174C0.92118 26.3073 8.47708 33.8632 17.567 33.8632ZM17.567 31.0889C9.86423 31.0889 3.7118 24.9201 3.7118 17.2174C3.7118 9.51459 9.84792 3.34584 17.5507 3.34584C25.2535 3.34584 31.4385 9.51459 31.4385 17.2174C31.4385 24.9201 25.2698 31.0889 17.567 31.0889ZM15.7719 24.9691C16.3104 24.9691 16.7674 24.708 17.0937 24.2021L24.5517 12.4684C24.7312 12.142 24.9434 11.783 24.9434 11.424C24.9434 10.6896 24.2906 10.2163 23.6052 10.2163C23.1972 10.2163 22.7892 10.4774 22.4792 10.9507L15.7066 21.8194L12.4917 17.658C12.1 17.1358 11.741 17.0052 11.284 17.0052C10.5823 17.0052 10.0274 17.5764 10.0274 18.2944C10.0274 18.6535 10.1743 18.9962 10.4028 19.3063L14.3847 24.2021C14.7927 24.7406 15.2333 24.9691 15.7719 24.9691Z" fill="#FE2C55"/>
                </svg>             
              </div>
              <div>
                <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 2</div>
                <div style="font-size: 16px;"><span style="font-weight: 600;">Confirm</span> the <span style="font-weight: 600;">Credit Card</span></div>
                <div style="font-weight: 400;font-size: 14px;color: #8F8F8F;">you shop with at Home Depot</div>
              </div>
            </div>
            <div style="display:flex;align-tems:center;background: #DADADA;border: 1px solid #DADADA;border-radius: 13px;padding:9px 20px;padding-right:14px;margin-top:8px;">
              <div style="margin-right:19px;padding-top:10px;">
                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.567 33.8632C26.6733 33.8632 34.2128 26.3073 34.2128 17.2174C34.2128 8.11111 26.6569 0.571531 17.5507 0.571531C8.46076 0.571531 0.92118 8.11111 0.92118 17.2174C0.92118 26.3073 8.47708 33.8632 17.567 33.8632ZM17.567 31.0889C9.86423 31.0889 3.7118 24.9201 3.7118 17.2174C3.7118 9.51459 9.84792 3.34584 17.5507 3.34584C25.2535 3.34584 31.4385 9.51459 31.4385 17.2174C31.4385 24.9201 25.2698 31.0889 17.567 31.0889ZM15.7719 24.9691C16.3104 24.9691 16.7674 24.708 17.0937 24.2021L24.5517 12.4684C24.7312 12.142 24.9434 11.783 24.9434 11.424C24.9434 10.6896 24.2906 10.2163 23.6052 10.2163C23.1972 10.2163 22.7892 10.4774 22.4792 10.9507L15.7066 21.8194L12.4917 17.658C12.1 17.1358 11.741 17.0052 11.284 17.0052C10.5823 17.0052 10.0274 17.5764 10.0274 18.2944C10.0274 18.6535 10.1743 18.9962 10.4028 19.3063L14.3847 24.2021C14.7927 24.7406 15.2333 24.9691 15.7719 24.9691Z" fill="#FE2C55"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 3</div>
                <div style="font-size: 16px;"><span style="font-weight: 600;">Enter</span> and <span style="font-weight: 600;">Validate the code</span></div>
                <div style="font-weight: 400;font-size: 14px;color: #8F8F8F;">we will provide to you</div>
              </div>
            </div>
          </div>
          <div style="font-weight: 600;font-size: 16px;text-align: center;margin-top:20px;margin-bottom:18px;">You're all set, you'll be taken back to Joist Edge!</div>
          <div style="display:flex;flex-direction:column;align-items:center;">
            <button style="margin-bottom: 25px;color: #FFFCFC;padding-top: 10px;padding-bottom: 10px;font-size: 14px;font-weight: 600;background: #008000;border-radius: 19px;width: 216px;display: flex;justify-content: center;align-items: center;" id="optimus-enrolment-successful-btn">
              Back to Joist Edge
            </button>
          </div>
        </div>
      </div>
    </div>
    `;

    const divElem = strToHtml(htmlStr);

    divElem.querySelector('#optimus-enrolment-successful-btn').addEventListener('click', () => {
      spinner.className = 'spinner';
      document.getElementById('onboarding-error-pop-up').style.display = 'none';
      document.getElementById('onboarding-success-pop-up').style.display = 'none';
      document.getElementById('optimus-enrolment-successful-btn').textContent = '';
      document.getElementById('optimus-enrolment-successful-btn').appendChild(spinner);
      document.getElementById('optimus-enrolment-successful-btn').disabled = true;
      document.getElementById('optimus-enrolment-successful-btn').style.opacity = '0.4';
      passContentToOptimus('JOIST_COMPLETE_REWARDS_EVERPRO_SIGNUP', 0);
    });
    document.body.appendChild(divElem);
  }

  // banner with joist code on national incentive pop-up
  function inputJoistCode() {
    if (!document.getElementById('optimus-code-container-div')) {
      const htmlStr = `
          <div id="optimus-code-container-div" style="background-color: #F1F1F5;margin:0px;width:100%;position:fixed;top:0;left:0;margin: 0;border-radius: 0 0 5% 5%;z-index:10000;">
            <div style="display:flex;justify-content:center;margin-top:20px;margin-bottom:8px;">${joistLogo}</div>
            <div style="display:flex;align-items:center;margin-left:16px;margin-right:16px;padding-left:20px;padding-right:0px;padding-top:14px;padding-bottom:13px;background: #FFFFFF;border: 1px solid #DADADA;border-radius: 13px;">
              <div id="optimus-code-container-div2" style="margin-right:16px;padding-top:6px;">
                <svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.70501 0H30.6915C33.0572 0 34.3965 1.30176 34.3965 3.66746V9.95045C34.3965 9.95045 33.0051 9.45045 31.5552 9.95045V4.08052C31.5552 3.15427 31.0295 2.60352 30.0782 2.60352H4.30582C3.36705 2.60352 2.82883 3.15427 2.82883 4.08052V14.4571C2.82883 15.4083 3.36705 15.9215 4.30582 15.9215H19.5051C19.0051 16.9505 20.0051 18.5251 20.0051 18.5251H3.70501C1.32679 18.5251 0 17.2358 0 14.8576V3.66746C0 1.30176 1.32679 0 3.70501 0Z" fill="#4D4D4D"/>
                  <path d="M9.36265 9.26252C9.36265 8.2111 8.5115 7.34743 7.44756 7.34743C6.39614 7.34743 5.53247 8.2111 5.53247 9.26252C5.53247 10.3265 6.39614 11.1776 7.44756 11.1776C8.5115 11.1776 9.36265 10.3265 9.36265 9.26252Z" fill="#FE2C55"/>
                  <path d="M14.9953 9.26252C14.9953 8.2111 14.1316 7.34743 13.0802 7.34743C12.0162 7.34743 11.1651 8.2111 11.1651 9.26252C11.1651 10.3265 12.0162 11.1776 13.0802 11.1776C14.1316 11.1776 14.9953 10.3265 14.9953 9.26252Z" fill="#FE2C55"/>
                  <path d="M20.6154 9.26252C20.6154 8.2111 19.7642 7.34743 18.7003 7.34743C17.6489 7.34743 16.7852 8.2111 16.7852 9.26252C16.7852 10.3265 17.6489 11.1776 18.7003 11.1776C19.7642 11.1776 20.6154 10.3265 20.6154 9.26252Z" fill="#FE2C55"/>
                  <path d="M34.1232 26.9127C39.0056 25.7414 41.062 22.0012 39.8165 16.8097L39.2948 14.635C38.8268 12.6842 37.5579 11.6245 36.4066 11.9007C36.1188 11.9698 35.9891 12.1813 36.0582 12.4691L36.2807 13.3965C36.3727 13.7803 36.2295 14.0289 36.0056 14.0826C35.7498 14.1439 35.5225 13.9955 35.4279 13.6011L35.2821 12.9935C34.9957 11.7995 34.0363 11.1842 32.981 11.4374C32.4799 11.5576 32.2884 11.8402 32.3959 12.288L32.6976 13.5459C32.7948 13.951 32.649 14.1889 32.4251 14.2426C32.1693 14.304 31.942 14.1556 31.8448 13.7505L31.5661 12.5885C31.2515 11.2773 30.3309 10.7766 29.2756 11.0298C28.7959 11.1449 28.5856 11.4434 28.6879 11.8698L29.2864 14.3643C29.381 14.7587 29.2377 15.0073 29.0139 15.061C28.7687 15.1198 28.5308 14.974 28.4336 14.5689L26.4669 6.37119C26.2572 5.49705 25.5408 5.04885 24.784 5.23043C23.9738 5.4248 23.5601 6.1441 23.7698 7.01823L26.6138 18.8723C26.6751 19.1282 26.5591 19.3026 26.3886 19.3435C26.2393 19.3793 26.0884 19.3141 25.9255 19.1051L23.5107 15.8063C23.1116 15.2707 22.6247 15.0267 22.0064 15.1751C21.1749 15.3746 20.7455 16.0751 20.9245 16.8213C20.9859 17.0772 21.0955 17.2989 21.2054 17.4754L24.3779 22.4752C27.0028 26.603 30.4135 27.8027 34.1232 26.9127Z" fill="#4D4D4D"/>
                </svg>              
              </div>
              <div id="optimus-code-container-div3">
                <div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 3</div>
                <div id="optimus-code-div" style="font-weight: 400;font-size: 16px;line-height: 21px;color: #181818;">
                  <span style="font-weight:bolder;">Enroll</span> to the program
                </div>
                <div id="optimus-code-div2" style="font-weight: 400;font-size: 14px; color: #8F8F8F;">
                  Scroll down and tap "Learn More", enter the code, <span style="font-weight:bolder;">JOIST</span>, Validate and Enroll.
                </div>
              </div>
            </div>
            <div style="display:flex;justify-content:center;margin-top:7px;margin-bottom:12px;">
              <svg width="50" height="18" viewBox="0 0 50 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="41" cy="9" rx="9" ry="9" transform="rotate(-180 41 9)" fill="#FE2C55"/>
                <ellipse cx="20" cy="9" rx="4" ry="4" transform="rotate(-180 20 9)" fill="#B9B9B9"/>
                <ellipse cx="4" cy="9" rx="4" ry="4" transform="rotate(-180 4 9)" fill="#B9B9B9"/>
                <path d="M40.5 13.1875C42.4746 13.1875 43.793 12.1504 43.793 10.6152V10.6035C43.793 9.45508 42.9727 8.72852 41.7129 8.61133V8.57617C42.7031 8.37109 43.4766 7.68555 43.4766 6.63086V6.61914C43.4766 5.27148 42.3047 4.35742 40.4883 4.35742C38.7129 4.35742 37.5234 5.3418 37.4004 6.85352L37.3945 6.92383H39.0234L39.0293 6.87109C39.0996 6.16797 39.6562 5.7168 40.4883 5.7168C41.3203 5.7168 41.8066 6.15039 41.8066 6.85352V6.86523C41.8066 7.55078 41.2324 8.01953 40.3418 8.01953H39.3984V9.2793H40.3652C41.3906 9.2793 41.9941 9.72461 41.9941 10.5332V10.5449C41.9941 11.2598 41.4023 11.7637 40.5 11.7637C39.5859 11.7637 38.9824 11.2949 38.9062 10.6387L38.9004 10.5742H37.207L37.2129 10.6504C37.3301 12.1621 38.5898 13.1875 40.5 13.1875Z" fill="white"/>
              </svg> 
            </div>
          </div>
        `;

      const divElem = strToHtml(htmlStr);
      document.body.appendChild(divElem);
    }
  }

  function removeInputJoistCode() {
    if (document.getElementById('optimus-code-container-div')) {
      document.getElementById('optimus-code-container-div').style.display = 'none';
    }
  }

  // warning banner
  function addWarningBanner(warningText, isEnrolledWarning = false) {
    const htmlStr = `
    <div id="optimus-warning-modal" style="position: fixed;z-index: 10000;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);">
      <div id="optimus-warning-modal2" style="background-color: #F1F1F5;margin:0px;width:100%;position:fixed;top:0;left:0;margin: 0;border-radius: 0 0 5% 5%;">
        <div style="display:flex;justify-content:center;margin-top:20px;margin-bottom:8px;">${joistLogo}</div>
        <div style="display:flex;align-items:center;margin-left:22px;margin-right:24px;padding-left:20px;padding-right:27px;padding-top:14px;padding-bottom:13px;background: #FFFFFF;border: 1px solid #DADADA;border-radius: 13px;">
          ${!isEnrolledWarning ? `<div id="optimus-warning-modal3" style="margin-right:16px;padding-top:6px;">
            <svg width="41" height="43" viewBox="0 0 41 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.8891 18.0927C21.5508 18.0927 25.3337 14.0042 25.3337 8.94129C25.3337 3.99301 21.5508 0 16.8891 0C12.2465 0 8.44455 4.03122 8.44455 8.9795C8.46366 14.0042 12.2274 18.0927 16.8891 18.0927ZM16.8891 14.4627C14.3481 14.4627 12.2083 12.1319 12.2083 8.9604C12.1892 5.90354 14.3481 3.63001 16.8891 3.63001C19.4492 3.63001 21.5699 5.88444 21.5699 8.94129C21.5699 12.1128 19.4492 14.4627 16.8891 14.4627ZM5.04381 35.918H21.5508C21.3789 35.2493 21.3024 34.5233 21.3024 33.7018V32.3071H4.62349C4.20317 32.3071 4.05033 32.1543 4.05033 31.8295C4.05033 29.0592 8.69292 23.8434 16.8891 23.8434C18.8187 23.8434 20.5573 24.1682 22.0666 24.6841C22.4679 23.404 23.3085 22.4105 24.6077 21.7419C22.3723 20.8057 19.774 20.2134 16.8891 20.2134C6.70597 20.2134 0 27.0722 0 32.479C0 34.8099 1.66216 35.918 5.04381 35.918Z" fill="#4D4D4D"/>
              <path d="M24.0918 33.74C24.0918 37.3891 26.2507 38.8602 31.6766 41.8598C32.1542 42.1272 32.842 42.1846 33.4152 41.8598C38.8602 38.8984 41 37.3891 41 33.74V26.843C41 25.5247 40.5606 24.7414 39.2614 24.2065C38.2488 23.7861 34.7526 22.6016 33.8164 22.2577C32.9758 21.9902 32.0587 21.9902 31.1799 22.315C30.3201 22.6016 26.8239 23.7861 25.8304 24.2065C24.5312 24.7414 24.0918 25.5247 24.0918 26.843V33.74ZM31.4856 37.4655C31.0843 37.4655 30.6067 37.3318 30.301 37.007L27.1104 33.549C26.843 33.2433 26.671 32.8421 26.671 32.4791C26.671 31.5429 27.3779 30.9888 28.1803 30.9888C28.6389 30.9888 29.0019 31.1608 29.2693 31.4474L31.39 33.7973L35.7843 27.7027C36.0708 27.3206 36.5103 27.0531 37.0261 27.0531C37.8285 27.0531 38.5163 27.7027 38.5163 28.5243C38.5163 28.7917 38.4208 29.1165 38.2106 29.384L32.7083 36.9306C32.4408 37.2554 31.9823 37.4655 31.4856 37.4655Z" fill="#FE2C55"/>
            </svg>
          </div>` : ''}
          <div id="optimus-warning-modal4">
          ${!isEnrolledWarning ? '<div style="font-weight: 700;font-size: 11px;color: #8F8F8F;">STEP 1</div>' : ''}
            <div id="optimus-warning-modal5" style="font-weight: 600;font-size: 16px;line-height: 21px;color: #181818;">
              ${warningText}
            </div>
            ${
  !isEnrolledWarning ?
    `<div style="margin-top:8px;margin-bottom:4px;">
              <svg width="211" height="14" viewBox="0 0 211 14" fill="none" xmlns="http://www.w3.org/2000/svg" id="optimus-warning-a">
                <path d="M4.3252 11.2529C6.86816 11.2529 8.4541 9.7832 8.4541 7.5957V1.13574H6.38965V7.41113C6.38965 8.68945 5.65137 9.50293 4.3252 9.50293C2.99902 9.50293 2.25391 8.68945 2.25391 7.41113V1.13574H0.189453V7.5957C0.189453 9.79004 1.7959 11.2529 4.3252 11.2529ZM10.3284 13.4951H12.3245V9.79688H12.4476C12.8304 10.6172 13.6712 11.1162 14.7034 11.1162C16.6107 11.1162 17.7591 9.66016 17.7591 7.24023V7.22656C17.7591 4.82715 16.5833 3.35059 14.7034 3.35059C13.637 3.35059 12.8372 3.8291 12.4476 4.63574H12.3245V3.47363H10.3284V13.4951ZM14.0198 9.46191C12.9739 9.46191 12.304 8.62109 12.304 7.24023V7.22656C12.304 5.8457 12.9671 5.00488 14.0198 5.00488C15.0794 5.00488 15.7288 5.8457 15.7288 7.22656V7.24023C15.7288 8.62109 15.0726 9.46191 14.0198 9.46191ZM22.3952 13.6455C24.6715 13.6455 26.1139 12.5312 26.1139 10.7676V3.47363H24.1178V4.7041H24.0221C23.6188 3.85645 22.8121 3.35059 21.7799 3.35059C19.8522 3.35059 18.6832 4.84082 18.6832 7.05566V7.06934C18.6832 9.20898 19.8522 10.6719 21.7457 10.6719C22.7916 10.6719 23.5846 10.2412 24.0016 9.44824H24.1246V10.8496C24.1246 11.7246 23.5026 12.2236 22.4362 12.2236C21.5475 12.2236 21.028 11.9229 20.9186 11.4854L20.9118 11.458H18.9362V11.4922C19.1002 12.7705 20.3102 13.6455 22.3952 13.6455ZM22.4225 9.14062C21.3424 9.14062 20.7272 8.2998 20.7272 7.0625V7.04883C20.7272 5.81152 21.3493 4.9707 22.4225 4.9707C23.4957 4.9707 24.1452 5.81152 24.1452 7.04883V7.0625C24.1452 8.2998 23.5026 9.14062 22.4225 9.14062ZM27.79 11H29.7861V6.78906C29.7861 5.72266 30.5039 5.07324 31.6386 5.07324C31.9463 5.07324 32.2539 5.12109 32.5546 5.18945V3.44629C32.3564 3.3916 32.0761 3.35059 31.8095 3.35059C30.832 3.35059 30.1484 3.8291 29.9091 4.64258H29.7861V3.47363H27.79V11ZM35.4817 11.1162C36.4661 11.1162 37.2591 10.6992 37.6419 10.002H37.7649V11H39.7337V5.85938C39.7337 4.25293 38.6057 3.30957 36.6096 3.30957C34.7161 3.30957 33.472 4.18457 33.3147 5.50391L33.3079 5.56543H35.1536L35.1673 5.53809C35.3245 5.09375 35.7825 4.84082 36.5003 4.84082C37.3206 4.84082 37.7649 5.20996 37.7649 5.85938V6.48145L35.9466 6.59082C34.0735 6.7002 33.0276 7.49316 33.0276 8.84668V8.86035C33.0276 10.2275 34.0462 11.1162 35.4817 11.1162ZM34.9759 8.7373V8.72363C34.9759 8.17676 35.3929 7.85547 36.2473 7.80078L37.7649 7.70508V8.25879C37.7649 9.05176 37.0745 9.66016 36.1516 9.66016C35.4612 9.66016 34.9759 9.31152 34.9759 8.7373ZM44.0553 11.1162C45.1148 11.1162 45.9146 10.6445 46.3043 9.83105H46.4273V11H48.4234V0.595703H46.4273V4.67676H46.3043C45.9283 3.85645 45.0875 3.35059 44.0553 3.35059C42.148 3.35059 40.9996 4.80664 40.9996 7.22656V7.24023C40.9996 9.64648 42.1754 11.1162 44.0553 11.1162ZM44.732 9.46191C43.6793 9.46191 43.0299 8.62793 43.0299 7.24023V7.22656C43.0299 5.85254 43.6793 5.00488 44.732 5.00488C45.7848 5.00488 46.4479 5.85254 46.4479 7.2334V7.24707C46.4479 8.62793 45.7916 9.46191 44.732 9.46191ZM53.4765 11.1572C55.6777 11.1572 56.6484 9.88574 56.8808 8.94238L56.8945 8.87402H55.0351L55.0146 8.91504C54.8779 9.20215 54.3925 9.66699 53.5175 9.66699C52.4579 9.66699 51.7948 8.94922 51.7743 7.71191H56.956V7.08984C56.956 4.81348 55.5888 3.30957 53.3945 3.30957C51.2001 3.30957 49.7988 4.84766 49.7988 7.24023V7.24707C49.7988 9.66016 51.1864 11.1572 53.4765 11.1572ZM53.4286 4.80664C54.2968 4.80664 54.9189 5.36719 55.0419 6.46094H51.7948C51.9179 5.39453 52.5605 4.80664 53.4286 4.80664ZM64.6832 11.0273C65.066 11.0273 65.4351 10.9863 65.6812 10.9385V9.45508C65.4898 9.47559 65.3531 9.48926 65.0933 9.48926C64.4166 9.48926 64.1295 9.18848 64.1295 8.51172V4.97754H65.6812V3.47363H64.1295V1.67578H62.1129V3.47363H60.9507V4.97754H62.1129V8.96973C62.1129 10.4326 62.8511 11.0273 64.6832 11.0273ZM70.3104 11.1572C72.6278 11.1572 74.0223 9.69434 74.0223 7.24023V7.22656C74.0223 4.79297 72.6073 3.30957 70.3104 3.30957C68.0136 3.30957 66.5985 4.7998 66.5985 7.22656V7.24023C66.5985 9.6875 67.993 11.1572 70.3104 11.1572ZM70.3104 9.5918C69.244 9.5918 68.6425 8.72363 68.6425 7.24023V7.22656C68.6425 5.75684 69.2509 4.875 70.3104 4.875C71.3632 4.875 71.9784 5.75684 71.9784 7.22656V7.24023C71.9784 8.72363 71.37 9.5918 70.3104 9.5918ZM78.8169 11H80.8814V7.88965H82.8843C84.9624 7.88965 86.3501 6.5498 86.3501 4.51953V4.50586C86.3501 2.47559 84.9624 1.13574 82.8843 1.13574H78.8169V11ZM82.3784 2.76953C83.5611 2.76953 84.2583 3.3916 84.2583 4.5127V4.52637C84.2583 5.64746 83.5611 6.27637 82.3784 6.27637H80.8814V2.76953H82.3784ZM87.7323 11H89.7284V6.78906C89.7284 5.72266 90.4461 5.07324 91.5809 5.07324C91.8885 5.07324 92.1961 5.12109 92.4969 5.18945V3.44629C92.2987 3.3916 92.0184 3.35059 91.7518 3.35059C90.7743 3.35059 90.0907 3.8291 89.8514 4.64258H89.7284V3.47363H87.7323V11ZM96.675 11.1572C98.9923 11.1572 100.387 9.69434 100.387 7.24023V7.22656C100.387 4.79297 98.9718 3.30957 96.675 3.30957C94.3781 3.30957 92.963 4.7998 92.963 7.22656V7.24023C92.963 9.6875 94.3576 11.1572 96.675 11.1572ZM96.675 9.5918C95.6086 9.5918 95.007 8.72363 95.007 7.24023V7.22656C95.007 5.75684 95.6154 4.875 96.675 4.875C97.7277 4.875 98.3429 5.75684 98.3429 7.22656V7.24023C98.3429 8.72363 97.7345 9.5918 96.675 9.5918ZM104.587 11H106.815L108.969 7.54102H109.037L111.197 11H113.549L110.363 6.07129V6.04395L113.596 1.13574H111.286L109.208 4.69043H109.126L107.034 1.13574H104.6L107.718 6.00977V6.03027L104.587 11ZM117.522 11.0273C117.904 11.0273 118.274 10.9863 118.52 10.9385V9.45508C118.328 9.47559 118.192 9.48926 117.932 9.48926C117.255 9.48926 116.968 9.18848 116.968 8.51172V4.97754H118.52V3.47363H116.968V1.67578H114.951V3.47363H113.789V4.97754H114.951V8.96973C114.951 10.4326 115.69 11.0273 117.522 11.0273ZM119.861 11H121.857V6.78906C121.857 5.72266 122.575 5.07324 123.709 5.07324C124.017 5.07324 124.325 5.12109 124.625 5.18945V3.44629C124.427 3.3916 124.147 3.35059 123.88 3.35059C122.903 3.35059 122.219 3.8291 121.98 4.64258H121.857V3.47363H119.861V11ZM127.552 11.1162C128.537 11.1162 129.33 10.6992 129.713 10.002H129.836V11H131.804V5.85938C131.804 4.25293 130.677 3.30957 128.68 3.30957C126.787 3.30957 125.543 4.18457 125.386 5.50391L125.379 5.56543H127.224L127.238 5.53809C127.395 5.09375 127.853 4.84082 128.571 4.84082C129.391 4.84082 129.836 5.20996 129.836 5.85938V6.48145L128.017 6.59082C126.144 6.7002 125.098 7.49316 125.098 8.84668V8.86035C125.098 10.2275 126.117 11.1162 127.552 11.1162ZM127.047 8.7373V8.72363C127.047 8.17676 127.464 7.85547 128.318 7.80078L129.836 7.70508V8.25879C129.836 9.05176 129.145 9.66016 128.222 9.66016C127.532 9.66016 127.047 9.31152 127.047 8.7373ZM136.223 11H138.39L139.121 8.60742H142.601L143.332 11H145.506L142.075 1.13574H139.648L136.223 11ZM140.803 3.10449H140.926L142.129 7.0625H139.593L140.803 3.10449ZM149.568 11.1572C151.53 11.1572 152.706 10.1045 152.911 8.46387L152.918 8.42285H151.072L151.058 8.4502C150.881 9.20215 150.395 9.5918 149.575 9.5918C148.509 9.5918 147.914 8.75098 147.914 7.22656V7.21289C147.914 5.70898 148.502 4.875 149.575 4.875C150.429 4.875 150.928 5.35352 151.058 6.08496L151.065 6.09863H152.925V6.07812C152.747 4.39648 151.564 3.30957 149.568 3.30957C147.21 3.30957 145.884 4.73828 145.884 7.21289V7.22656C145.884 9.72852 147.217 11.1572 149.568 11.1572ZM157.479 11.1572C159.44 11.1572 160.616 10.1045 160.821 8.46387L160.828 8.42285H158.982L158.969 8.4502C158.791 9.20215 158.306 9.5918 157.485 9.5918C156.419 9.5918 155.824 8.75098 155.824 7.22656V7.21289C155.824 5.70898 156.412 4.875 157.485 4.875C158.34 4.875 158.839 5.35352 158.969 6.08496L158.976 6.09863H160.835V6.07812C160.657 4.39648 159.475 3.30957 157.479 3.30957C155.12 3.30957 153.794 4.73828 153.794 7.21289V7.22656C153.794 9.72852 155.127 11.1572 157.479 11.1572ZM165.416 11.1572C167.734 11.1572 169.128 9.69434 169.128 7.24023V7.22656C169.128 4.79297 167.713 3.30957 165.416 3.30957C163.119 3.30957 161.704 4.7998 161.704 7.22656V7.24023C161.704 9.6875 163.099 11.1572 165.416 11.1572ZM165.416 9.5918C164.35 9.5918 163.748 8.72363 163.748 7.24023V7.22656C163.748 5.75684 164.357 4.875 165.416 4.875C166.469 4.875 167.084 5.75684 167.084 7.22656V7.24023C167.084 8.72363 166.476 9.5918 165.416 9.5918ZM172.924 11.1572C173.997 11.1572 174.762 10.6582 175.104 9.83789H175.227V11H177.223V3.47363H175.227V7.82129C175.227 8.83984 174.694 9.50293 173.71 9.50293C172.766 9.50293 172.363 8.94922 172.363 7.88281V3.47363H170.367V8.34082C170.367 10.1318 171.235 11.1572 172.924 11.1572ZM178.906 11H180.902V6.64551C180.902 5.62695 181.463 4.96387 182.386 4.96387C183.329 4.96387 183.767 5.52441 183.767 6.58398V11H185.763V6.13281C185.763 4.33496 184.86 3.30957 183.186 3.30957C182.112 3.30957 181.367 3.82227 181.025 4.63574H180.902V3.47363H178.906V11ZM190.501 11.0273C190.884 11.0273 191.253 10.9863 191.499 10.9385V9.45508C191.308 9.47559 191.171 9.48926 190.911 9.48926C190.235 9.48926 189.948 9.18848 189.948 8.51172V4.97754H191.499V3.47363H189.948V1.67578H187.931V3.47363H186.769V4.97754H187.931V8.96973C187.931 10.4326 188.669 11.0273 190.501 11.0273ZM210.185 6.04395C210.185 5.77734 210.068 5.49707 209.884 5.3125L205.434 0.869141C205.222 0.657227 204.976 0.554688 204.736 0.554688C204.155 0.554688 203.759 0.958008 203.759 1.49121C203.759 1.79199 203.889 2.02441 204.073 2.20215L205.604 3.74023L207.115 5.13477L205.625 5.05273H197.9C197.285 5.05273 196.875 5.44922 196.875 6.04395C196.875 6.63184 197.285 7.03516 197.9 7.03516H205.625L207.122 6.95312L205.604 8.34766L204.073 9.87891C203.889 10.0566 203.759 10.2959 203.759 10.5898C203.759 11.123 204.155 11.5264 204.736 11.5264C204.976 11.5264 205.222 11.4238 205.427 11.2188L209.884 6.77539C210.068 6.59082 210.185 6.31055 210.185 6.04395Z" fill="#FE2C55"/>
              </svg>
            </div>` : ''
  }
          </div>
        </div>
        ${!isEnrolledWarning ? `<div style="display:flex;justify-content:center;margin-top:7px;margin-bottom:12px;">
          <svg width="50" height="18" viewBox="0 0 50 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="9" cy="9" rx="9" ry="9" transform="rotate(-180 9 9)" fill="#FE2C55"/>
            <ellipse cx="30" cy="9" rx="4" ry="4" transform="rotate(-180 30 9)" fill="#B9B9B9"/>
            <ellipse cx="46" cy="9" rx="4" ry="4" transform="rotate(-180 46 9)" fill="#B9B9B9"/>
            <path d="M8.86572 13H10.4878V5.24951H8.87109L6.86768 6.64062V8.10156L8.76904 6.78027H8.86572V13Z" fill="white"/>
          </svg>    
        </div>` : '<div style="display:flex;justify-content:center;margin-top:7px;margin-bottom:16px;"></div>'}
      </div>
    </div>
    `;

    const divElem = strToHtml(htmlStr);
    if (!isEnrolledWarning) {
      divElem.querySelector('#optimus-warning-a').addEventListener('click', (event) => {
        window.location.assign('https://www.homedepot.com/myaccount/profile?plcc-upgrade-flow=true');
      });
    }
    document.body.appendChild(divElem);
  }

  // close handler for upgrade account dialog reloads page
  function addCloseHandlerForUpgradeAccountDialog(tryCount) {
    if (tryCount >= MAX_TRY_COUNT) return;

    const CloseButton = document.querySelector('[aria-label="Close"]');
    if (CloseButton instanceof HTMLButtonElement) {
      CloseButton.addEventListener('click', (event) => {
        window.location.assign(
          'https://www.homedepot.com/myaccount/profile?plcc-upgrade-flow=true',
        );
      });
    } else {
      tryCount += 1;
      console.log(`try ${tryCount}: close handler for upgrade account dialog not added`);
      window.setTimeout(() => {
        addCloseHandlerForUpgradeAccountDialog(tryCount);
      }, 20);
    }
  }

  function addListenerOnCreateProXtraButton(tryCount) {
    if (tryCount >= MAX_TRY_COUNT) return;

    const proXtraDiv = document.querySelector('[data-automation-id="proxtra-type-button"]');
    let proXtraButton;
    if (proXtraDiv instanceof HTMLDivElement) {
      proXtraButton = [...proXtraDiv.querySelectorAll('button')].find(
        (btn) => btn.textContent === 'Select & Continue',
      );
    }

    if (proXtraButton instanceof HTMLButtonElement) {
      proXtraButton.addEventListener('click', (event) => {
        window.location.assign('https://www.homedepot.com/auth/view/createaccount/proxtra');
      });
    } else {
      tryCount += 1;
      console.log(`try ${tryCount}: listener on create pro xtra button not added`);
      window.setTimeout(() => {
        addListenerOnCreateProXtraButton(tryCount);
      }, 20);
    }
  }

  // click handler for outside upgrade account dialog reloads page
  function addClickHandlerForCancellingUpgradeAccountDialog(tryCount) {
    if (tryCount >= MAX_TRY_COUNT) return;

    const dialogRoot = document.querySelector('.sui-fixed.sui-z-max.sui-inset-0');
    if (dialogRoot instanceof HTMLDivElement) {
      dialogRoot.addEventListener('click', (event) => {
        const targetClasses = [
          'sui-fixed',
          'sui-flex',
          'sui-items-center',
          'sui-justify-center',
          'sui-top-0',
          'sui-right-0',
          'sui-bottom-0',
          'sui-left-0',
          'sui-bg-inverse/50',
        ];
        if (
          targetClasses.every((targetClass) => event?.target?.classList?.contains(targetClass)) ||
          (event.target instanceof HTMLButtonElement && event.target.textContent === 'Cancel')
        ) {
          window.location.assign(
            'https://www.homedepot.com/myaccount/profile?plcc-upgrade-flow=true',
          );
        }
      });
    } else {
      tryCount += 1;
      console.log(`try ${tryCount}: click handler for cancelling upgrade account dialog not added`);
      window.setTimeout(() => {
        addClickHandlerForCancellingUpgradeAccountDialog(tryCount);
      }, 20);
    }
  }

  function addSignOutListener(tryCount) {
    if (tryCount >= MAX_TRY_COUNT) return;

    if (document.getElementById('ma-signout')) {
      document.getElementById('ma-signout').addEventListener('click', () => {
        window.localStorage.setItem(
          IS_NON_PRO_ACCOUNT,
          JSON.stringify({ value: false, nonProEmail: null }),
        );
      });
    } else {
      tryCount += 1;
      console.log(`try ${tryCount}: sign out listener not added`);
      window.setTimeout(() => {
        addSignOutListener(tryCount);
      }, 20);
    }
  }

  // generate a synthetic click event on 'learn more' button on national incentive page
  async function setUpLearnMore() {
    await waitForElement('DOM ReadyState Complete', () => document.readyState === 'complete', 5000)
      .catch((err) => {
        inputJoistCode();
        throw err;
      });

    const unEnrollBtn = [...document.querySelectorAll('button')].find(
      (btn) => btn.textContent === 'Unenroll',
    );
    if (unEnrollBtn instanceof HTMLButtonElement) {
      console.log('Unenroll button exists');
      const pTags = document.querySelector('.alreadyEnrolledSummary')?.getElementsByTagName('p');
      for (const pTag of pTags) {
        if (pTag?.textContent?.includes('JOIST')) {
          addEnrolmentSuccessfulModal();
          return;
        }
      }
      console.log('User already enrolled to another reward program');
      addWarningBanner(
        'You cannot enroll to Joist Rewards Program at the moment. You are already enrolled to another rewards program.',
        true,
      );
      return;
    }

    inputJoistCode();

    const learnMoreElem = await waitForElement('Learn More Element', () => { // When there is no Unenroll button
      const elem = document.querySelector('.preferredPricing-learnmore-desktop') ||
          document.querySelector('.NationalAccount__button') ||
          document.querySelector('[classes="NationalAccount__button"]');

      if (elem instanceof HTMLImageElement ||
          (elem instanceof HTMLButtonElement &&
            elem.textContent?.includes('Learn More'))) {
        return elem;
      }
      return null;
    });

    learnMoreElem.dispatchEvent(new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    }));
    console.log('Learn More button clicked');

    const agreementCodeInput = await waitForElement('Agreement Code Input Element', () => document.querySelector('#agreementCode'));

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(agreementCodeInput, 'JOIST');
    agreementCodeInput.dispatchEvent(new Event('input', { bubbles: true }));

    // Must trigger blur event to invoke CodeInputModal.handleAgreementCode of HW
    agreementCodeInput.dispatchEvent(new Event('blur', { bubbles: true }));

    const validateButton = await waitForElement('Validate Code Button', () => {
      const button = document.querySelector('.NationalAccount__confirmButtonContainer > button');
      if (button && button.disabled === false) {
        return button;
      }
      return null;
    });

    validateButton.dispatchEvent(new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    }));
    console.log('code validation submitted');

    const enrollButton = await waitForElement('Enroll button', () => {
      const btn = document.querySelector('.NationalAccount__confirmButtonContainer > button');
      if (btn && btn.innerText === 'Enroll') {
        return btn;
      }
      return null;
    }, 3000); // 30 seconds timeout

    enrollButton.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }));
    console.log('enrollment submitted');
  }

  function addClickListener(queryStr, clickHandler, tryCount) {
    if (tryCount >= MAX_TRY_COUNT) return;

    if (document.querySelector(queryStr)) {
      document.querySelector(queryStr).addEventListener('click', clickHandler);
    } else {
      tryCount += 1;
      console.log(`try ${tryCount}: ${queryStr} not found`);
      window.setTimeout(() => {
        addClickListener(queryStr, clickHandler, tryCount);
      }, 20);
    }
  }

  // add custom css styles
  addOptimusClassDefinitions();

  // embed optimus app
  addOptimusApp();

  // add listener for events from optimus app
  window.addEventListener('message', (event) => {
    const message = event.data;
    if (message?.type === 'OPTIMUS_HIDE_REQUEST') {
      const hideOptimusAppStatus = message?.payload?.hideOptimusApp;
      window.localStorage.setItem('hideOptimusApp', hideOptimusAppStatus ? 'true' : 'false');
      if (document.getElementById('optimus-app-iframe-div')) {
        handleOptimusAppVisibility(hideOptimusAppStatus ? 'true' : 'false', document.getElementById('optimus-app-iframe-div'));
      }
    } else if (
      message?.type === 'OPTIMUS_MEMBER_PARTNER_RELATION_EMAIL_REQUEST' &&
      window.localStorage.getItem(MEMBER_PARTNER_RELATION_EMAIL)
    ) {
      passContentToOptimus('JOIST_MEMBER_PARTNER_RELATION_EMAIL_RESPONSE', 0);
    } else if (
      (message?.type === 'OPTIMUS_EVENT_BUFFER_REQUEST' ||
        message?.type === 'OPTIMUS_READY_FOR_EVENT_BUFFER_RESPONSE') &&
      JSON.parse(window.localStorage.getItem('optimusEventBuffer'))
    ) {
      passContentToOptimus('JOIST_EVENT_BUFFER_RESPONSE', 0);
    } else if (
      message?.type === 'OPTIMUS_REWARDS_SPLASH_SCREEN_LOADED' ||
      message?.type === 'OPTIMUS_REWARDS_SPLASH_SCREEN_CTA_CLICKED' ||
      message?.type === 'OPTIMUS_REWARDS_EVERPRO_SIGNUP_COMPLETED'
    ) {
      if (message?.type === 'OPTIMUS_REWARDS_EVERPRO_SIGNUP_COMPLETED') {
        if (document.getElementById('onboarding-success-pop-up')) {
          document.getElementById('onboarding-success-pop-up').style.display = 'block';
        }
      }
      dispatchJoistEvent(message?.payload?.event);
    } else if (message?.type === 'OPTIMUS_REWARDS_EVERPRO_SIGNUP_FAILED') {
      if (document.getElementById('optimus-enrolment-successful-btn') && document.getElementById('onboarding-error-pop-up')) {
        document.getElementById('optimus-enrolment-successful-btn').removeChild(spinner);
        document.getElementById('optimus-enrolment-successful-btn').textContent = 'Back to Joist Edge';
        document.getElementById('optimus-enrolment-successful-btn').disabled = false;
        document.getElementById('optimus-enrolment-successful-btn').style.opacity = '1';
        document.getElementById('onboarding-error-pop-up').style.display = 'block';
        // Set a timeout to hide onboarding-error-pop-up after 3 seconds
        setTimeout(() => { document.getElementById('onboarding-error-pop-up').style.display = 'none'; }, 3000);
      }
    }
  });

  // add click listener for create account button on signin page
  addClickListener(
    '[data-automation-id="signInCreateAnAccountButton"]',
    (event) => {
      // go to create pro acccount
      window.location.assign('https://www.homedepot.com/auth/view/createaccount/proxtra');
    },
    0,
  );

  // add 'go to credit card' banner or nonProAccount warning
  if (window.location.href === 'https://www.homedepot.com/') {
    const isNonProAccount = JSON.parse(window.localStorage.getItem(IS_NON_PRO_ACCOUNT));
    if (isNonProAccount?.value) {
      addSignOutListener(0);
      addWarningBanner('This is not a Pro Xtra Account');
    } else {
      addGoToCreditCardDiv();
    }
  } else {
    removeGoToCreditCardDiv();
  }

  // remove 'go to national incentives page' banner
  if (!window.location.href.includes('https://www.homedepot.com/myaccount/payments')) {
    removeNationalIncentiveDiv();
  } else {
    waitForElement('national incentive container div', () => document.getElementById('optimus-national-incentive-container-not-completed-div') || document.getElementById('optimus-national-incentive-container-completed-div'), 100) // 1 second
      .catch((err) => { // national incentive banner was not injected.
        const btns = [...document.querySelectorAll('button')];
        const giftCardsBtn = btns.find((btn) => btn.textContent === 'Gift Cards');
        const creditCardsBtn = btns.find((btn) => btn.textContent === 'Credit Cards');
        if (giftCardsBtn && creditCardsBtn) {
          giftCardsBtn.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }));
          creditCardsBtn.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }));
        } else {
          defaultErrorHandler(err);
        }
      });
  }

  // add 'create pro account' banner
  if (window.location.href.includes('https://www.homedepot.com/auth/view/createaccount/proxtra')) {
    addCreateProAccountDiv();
  } else {
    removeCreateProAccountDiv();
  }

  // add 'select pro account' banner
  if (
    window.location.href.includes('https://www.homedepot.com/auth/view/createaccount') &&
    !window.location.href.includes('proxtra')
  ) {
    addSelectProAccountDiv();
    addListenerOnCreateProXtraButton(0);
  } else {
    removeSelectProAccountDiv();
  }

  // add 'signin or create account' banner
  if (window.location.href.includes('https://www.homedepot.com/auth/view/signin')) {
    addSignInOrCreateAccountDiv();
  } else {
    removeSignInOrCreateAccountDiv();
  }

  // add 'joist code' banner  or 'enrolment completed' modal on national incentive page
  if (
    window.location.href.includes('https://www.homedepot.com/b2b/account/view/proXtraPricing') ||
    window.location.href.includes('https://www.homedepot.com/myaccount/proXtraPricing')
  ) {
    const joistMemberEnrolment = JSON.parse(window.localStorage.getItem('joistMemberEnrolment'));
    // if (joistMemberEnrolment?.enrolled) {
    // TODO: check page for enroll related info
    // addEnrolmentSuccessfulModal();
    // } else {
    setTimeout(() => setUpLearnMore().catch(defaultErrorHandler), 1600);
    // }
  }

  // add upgrade account dialog listeners
  if (
    window.location.href.includes(
      'https://www.homedepot.com/myaccount/profile?plcc-upgrade-flow=true',
    )
  ) {
    window.setTimeout(() => {
      addCloseHandlerForUpgradeAccountDialog(0);
    }, 1500);
    window.setTimeout(() => {
      addClickHandlerForCancellingUpgradeAccountDialog(0);
    }, 1500);
  }

  // process http response
  function processResponse(url, status, body, responseURL, signUpPayload) {
    if (url?.includes('/agreement?action=ENROLL') && status === 204) {
      dispatchOptimusEvent({
        name: 'rewards_partner_code_completed',
      });
      window.localStorage.setItem('joistMemberEnrolment', JSON.stringify({ enrolled: true }));
    }

    if (url?.includes('/agreement?action=UNENROLL') && status === 204) {
      window.localStorage.setItem('joistMemberEnrolment', JSON.stringify({ enrolled: false }));
    }

    if (
      (url?.includes('/customer/auth/v1/twostep/signin') ||
        url?.includes('/customer/auth/v1/verifyOTP')) &&
      status === 200 &&
      body?.customerType
    ) {
      if (body?.customerType === 'B2C') {
        window.localStorage.setItem(
          IS_NON_PRO_ACCOUNT,
          JSON.stringify({
            value: true,
            nonProEmail: body?.email,
          }),
        );
        window.localStorage.setItem(MEMBER_PARTNER_RELATION_EMAIL, null);
      }
      if (body?.customerType === 'B2B') {
        dispatchOptimusEvent({
          name: 'rewards_home_depot_sign_in_completed',
          detail: {
            userType: 'Existing',
          },
        });
        if (body?.email) {
          window.localStorage.setItem(MEMBER_PARTNER_RELATION_EMAIL, body.email);
        } else {
          dispatchOptimusEvent({
            name: 'partner_email_not_captured',
          });
        }
        window.localStorage.setItem(
          IS_NON_PRO_ACCOUNT,
          JSON.stringify({
            value: false,
            nonProEmail: null,
          }),
        );
      }
    }

    if (
      url?.includes('/profile/upgradeToPro') &&
      status === 200 &&
      responseURL?.includes('/b2b/account/view/landingpage/')
    ) {
      dispatchOptimusEvent({
        name: 'rewards_home_depot_sign_in_completed',
        detail: {
          userType: 'Converted',
        },
      });
      // email is now a pro email
      const memberPartnerRelationEmail = JSON.parse(
        window.localStorage.getItem(IS_NON_PRO_ACCOUNT),
      )?.nonProEmail;
      if (memberPartnerRelationEmail) {
        window.localStorage.setItem(MEMBER_PARTNER_RELATION_EMAIL, memberPartnerRelationEmail);
      } else {
        dispatchOptimusEvent({
          name: 'partner_email_not_captured',
        });
      }
      window.localStorage.setItem(
        IS_NON_PRO_ACCOUNT,
        JSON.stringify({
          value: false,
          nonProEmail: null,
        }),
      );
    }

    if (url?.includes('/customer/auth/v1/proRegister') && status === 200) {
      dispatchOptimusEvent({ name: 'rewards_home_depot_sign_in_completed', detail: { userType: 'New' } });

      if (signUpPayload?.origin === 'proXtraRegistration') {
        if (signUpPayload?.email) {
          window.localStorage.setItem(MEMBER_PARTNER_RELATION_EMAIL, signUpPayload.email);
        } else {
          dispatchOptimusEvent({
            name: 'partner_email_not_captured',
          });
        }
      }
    }

    // personal account registration
    if (url?.includes('/customer/auth/v1/register') && status === 200) {
      if (signUpPayload?.origin === 'registration') {
        window.localStorage.setItem(IS_NON_PRO_ACCOUNT, JSON.stringify({
          value: true,
          nonProEmail: signUpPayload?.email,
        }));
        window.localStorage.setItem(MEMBER_PARTNER_RELATION_EMAIL, null);
      }
    }

    if (url?.includes('/payment/retrieve?typecd=cc') && status === 200) {
      removeNationalIncentiveDiv();
      let creditCardCount = 0;
      let retrievedObj = null;
      try { retrievedObj = JSON.parse(body); } catch (err) { console.log(err); }
      const cards = retrievedObj?.paymentCards?.paymentCard;
      if (Array.isArray(cards)) {
        // count number of credit cards
        cards.forEach((card) => { if (card.paymentType === 'cc') { creditCardCount += 1; } });
      }

      if (creditCardCount === 0) {
        addNationalIncentiveDiv({ complete: false });
        window.localStorage.setItem('noExistingCreditcard', JSON.stringify({ value: true }));
      } else {
        const noExistingCreditcard = JSON.parse(
          window.localStorage.getItem('noExistingCreditcard'),
        );
        const cardType = noExistingCreditcard?.value ? 'New Card' : 'Existing Card';
        addNationalIncentiveDiv({ complete: true, cardCount: creditCardCount, cardType });
        window.localStorage.setItem('noExistingCreditcard', JSON.stringify({ value: false }));
      }
    }
  }

  let signUpPayload = null;
  // monkey patch XMLHttpRequest open
  const oldXHROpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    this.addEventListener('load', () => {
      processResponse(url, this.status, this.response, this.responseURL, signUpPayload);
    });
    return oldXHROpen.apply(this, arguments);
  };

  // monkey patch XMLHttpRequest send
  const oldXHRSend = window.XMLHttpRequest.prototype.send;
  window.XMLHttpRequest.prototype.send = function (body) {
    let parsedBody = {};
    try {
      parsedBody = JSON.parse(body);
    } catch (e) {
      // ignore parsing
    }

    // capture payload for proXtra and personal account registration with Homedepot
    if (parsedBody?.origin === 'proXtraRegistration' || parsedBody?.origin === 'registration') {
      signUpPayload = parsedBody;
    }
    return oldXHRSend.apply(this, arguments);
  };

  // monkey patch fetch API
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const [resource, config] = args;
    const response = await originalFetch(resource, config);
    processResponse(resource, response.status, response.body, response.url, signUpPayload);
    return response;
  };

  // Eventing System
  function dispatchOptimusEvent(event) {
    // handle joist specific events
    switch (event.name) {
      case 'rewards_home_depot_sign_in_completed':
      case 'rewards_credit_card_completed':
      case 'rewards_partner_code_completed':
        dispatchJoistEvent(event);
        break;
      default:
    }

    // buffer event
    console.log('buffer set');
    event.detail = event.detail ?? {};
    event.detail.memberId = MEMBER_ID;
    event.detail.rewardProgramId = REWARD_PROGRAM_ID;
    const optimusEventBuffer = JSON.parse(window.localStorage.getItem('optimusEventBuffer')) || [];
    optimusEventBuffer.push(event);
    window.localStorage.setItem('optimusEventBuffer', JSON.stringify(optimusEventBuffer));
  }

  function dispatchJoistEvent(event) {
    if (window.android) window.android.postMessage(JSON.stringify(event));
    if (window.webkit)window.webkit.messageHandlers.optimusEvent.postMessage(JSON.stringify(event));
  }
}());
