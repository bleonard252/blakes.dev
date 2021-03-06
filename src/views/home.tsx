import { Component, Fragment, render } from 'preact';
import { Icon, InlineIcon } from '@iconify/react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import Menubar from '../components/menubar';
import SanitizedHTML from 'react-sanitized-html';
import { attributes, classes, tags } from '../scripts/sanitize';
import ThemeSwitcher from '../components/themeswitcher';
import applyShortcodes from '../scripts/applyshortcodes';
import TimeAgo from 'javascript-time-ago';
import ta_en from 'javascript-time-ago/locale/en.json';
import { Button } from '../components/button';

const fullConfig = resolveConfig(tailwindConfig as any) as any;

const root = document.querySelector("#root");

TimeAgo.addDefaultLocale(ta_en);
const tago = new TimeAgo('en');

class View extends Component {
  async componentDidMount() {
    let accountLookup = fetch("https://fosstodon.org/api/v1/accounts/108341459214885420").then(value => value.json())
    let statusesLookup = Promise.all([
      fetch("https://fosstodon.org/api/v1/accounts/108341459214885420/statuses"),
      fetch("https://indieweb.social/api/v1/accounts/108211420273068716/statuses"),
    ]).then(async (value) => ([...(await value[0].json()), ...(await value[1].json())]));
    let [accountResult, statusesResult] = await Promise.all([accountLookup, statusesLookup]);
    this.setState({ accountResult, statusesResult });
  }


  render({}, { accountResult= {
    header_static: "https://cdn.fosstodon.org/accounts/headers/108/341/459/214/885/420/original/5a3ca4c658a0eec1.png",
    avatar_static: "https://cdn.fosstodon.org/accounts/avatars/108/341/459/214/885/420/original/812fc1236c967e3c.jpg",
    display_name: "Blake Leonard",
    note: "<p>A software developer with a passion for the powers, rights, and freedoms of users. Developer of dahliaOS, LucidLog, Bodacious, and more. Sometimes tries to design and write. 18 M (he/him) from Raleigh, NC. Cool tech enthusiast.</p>",
    fields: [{name: "Loading...", value: "Loading...", verified_at: Date.now()}]
  }, statusesResult=null }) {
    return <Fragment>
      <div class="group bg-scheme-2 text-onscheme-2 absolute z-100 w-0 h-0 top-0 left-0 print:hidden flex flex-col focus-within:w-auto focus-within:h-auto overflow-hidden">
        <span class="p-2">Skip to:</span>
        <a class="focus:bg-primary-3 focus:text-onprimary-3 p-2" href="#profile">Profile</a>
        <a class="focus:bg-primary-3 focus:text-onprimary-3 p-2" href="#projects">Projects</a>
        <a class="focus:bg-primary-3 focus:text-onprimary-3 p-2" href="#updates">Updates</a>
      </div>
      <Menubar />
      <div class="grid m-auto grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 p-6 gap-4">
        <div class="X-Column col-span-1" id="column-about">
          <a name="profile" id="profile" aria-hidden></a>
          <div class="X-Card bg-scheme-2 rounded-md flex flex-col text-onscheme-2" id="about-card">
            {(accountResult?.header_static && !accountResult?.header_static?.endsWith("missing.png")) ? <div style={{backgroundImage: "url('"+accountResult.header_static+"')"}} class="h-[170px] bg-center bg-cover rounded-t-md" id="banner" /> : ``}
            <div class="-mt-[48px] m-4 mb-0 X-Profile-Avatar is-primary">
              {(accountResult?.avatar_static) ? <img src={accountResult.avatar_static} class="rounded-full w-[96px] h-[96px] border-2 border-scheme-3" id="avatar" aria-hidden /> : <div class="rounded-full w-[96px] h-[96px] bg-scheme-2" id="avatar"  aria-hidden />}
              {/* <a href="https://github.com/bleonard252" class="float-right -mt-[36px] mb-0 p-2 bg-primary-3 inline-block hover:bg-primary-5 text-white rounded-md transition-colors">
                <InlineIcon icon="simple-icons:github" className="lg:inline" /><span class="hidden lg:inline"> Follow</span>
              </a> */}
              <Button primary filled href="https://fosstodon.org/users/blake/remote_follow" class="float-right -mt-[36px] mb-0">
                <InlineIcon icon="simple-icons:mastodon" className="inline" aria-hidden /><span class="hidden lg:inline"> Follow</span>
              </Button>
            </div>
            <h1>{accountResult?.display_name ?? `Blake Leonard`}</h1>
            {(accountResult?.note) ? <div class="p-4"><SanitizedHTML html={accountResult.note} /></div> : ``}
            {(accountResult?.fields) ? <div class="X-KVTable last:rounded-b-md overflow-clip">
              {(accountResult?.fields || []).map(field => <div class="row X-Uneven -last:border-b-2 -first:border-t-2 border-b-scheme-3" key={field.name}>
                <span class="bg-scheme-3 font-semibold">{field.name}</span>
                <span class={(field.verified_at ? "is-verified" : "is-not-verified")+" X-Arb"}>
                  {field.verified_at ? <Fragment><Icon icon="feather:check" color={fullConfig.theme.colors.green[500]} className="inline" />&nbsp;</Fragment> : ``}
                  <SanitizedHTML html={field.value} allowedTags={tags} allowedClasses={classes} className="contents" />
                </span>
              </div>)}
            </div> : ``}
          </div>
        </div>
        <div class="X-Column col-span-1 lg:col-span-2 xl:col-span-3" id="column-posts">
          <h1 class="text-2xl text-onscheme-2 p-6 pb-0">Projects</h1>
          <div class="grid m-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:px-6 py-6 gap-4" id="projects">
            <div class="X-Card bg-scheme-2 rounded-md flex flex-col mb-2 col-span-1">
              <img src={new URL('../images/lucidlog.png', import.meta.url)} class=" rounded-t-md" alt="Purple cloud with an inverted pattern on a purple background with a non-inverted pattern"/>
              <h1>LucidLog Dream Journal</h1>
              <p>A dream journal app that grows with you.</p>
              <div class="X-Action-Row text-right mt-auto">
                <Button primary class="m-2" href="https://play.google.com/store/apps/details?id=xyz.u1024256.ldr.journal">Google Play</Button>
                <Button primary class="m-2" href="https://resources.dreamstation.one">Learn more</Button>
              </div>
            </div>
            <div class="X-Card bg-scheme-2 rounded-md flex flex-col mb-2 col-span-1">
              <img src={new URL('../images/bodacious.png', import.meta.url)} class=" rounded-t-md" alt="The guitar pick and play symbol used as the logo, followed by the name, Bodacious!" />
              <h1>Bodacious</h1>
              <p>A pretty mp3 player with some neat features.</p>
              <div class="X-Action-Row text-right mt-auto">
                <Button primary class="m-2" href="https://play.google.com/store/apps/details?id=xyz.u1024256.bodacious">Google Play</Button>
                <Button primary class="m-2" href="https://github.com/bleonard252/bodacious">GitHub</Button>
              </div>
            </div>
            <div class="X-Card bg-scheme-2 rounded-md flex flex-col mb-2 col-span-1">
              <img src={new URL('../images/dahliaos.png', import.meta.url)} class=" rounded-t-md" alt="A screenshot of the dahliaOS desktop, with the calculator, terminal, and notes apps open." />
              <h1>dahliaOS</h1>
              <p>A new OS with a Flutter-based DE and an aim to run on multiple kernels.</p>
              <div class="X-Action-Row text-right mt-auto">
                <Button primary class="m-2" href="https://github.com/dahliaOS">GitHub</Button>
              </div>
            </div>
            <div class="X-Card bg-scheme-2 rounded-md flex flex-wrap items-center mb-2 col-span-full">
              <h1 class="inline">Tesseract</h1>
              <p>An abandoned Flutter-based Matrix client.</p>
              <span class="flex-grow"></span>
              <Button primary class="m-2" href="https://gitlab.com/bleonard252/tesseract">GitLab</Button>
            </div>
            <div class="X-Card bg-scheme-2 rounded-md flex flex-wrap items-center mb-2 col-span-full">
              <h1 class="inline">Vivid</h1>
              <p class="inline">An abandoned Mastodon/Pleroma frontend.</p>
              <span class="flex-grow"></span>
              <Button primary class="m-2" href="https://bleonard252.github.io/vivid-fe">Try</Button>
              <Button primary class="m-2" href="https://github.com/bleonard252/vivid-fe">GitHub</Button>
            </div>
          </div>
          <h1 class="text-2xl text-onscheme-2 p-6 pt-0" id="updates">Updates</h1>
          {statusesResult == null ? <div class="border-red-500 rounded-lg p-6">
            Posts loading...
          </div> : (statusesResult || []).filter((v) => v.visibility == "public").map(status => <div class="bg-scheme-2 rounded-md flex flex-col mb-4"
            role="article">
            {status.reblog ? <div class="flex flex-row items-center p-4 pb-0" id={"s"+status.id}>
              <img src={status.account.avatar_static} class="h-4 rounded-full mr-2" aria-hidden />
              <span>
                <strong>{status.account.display_name ?? status.account.username}</strong> boosted <span aria-hidden>&bull; </span><span 
                title={tago.format(new Date(status.created_at), 'round-minute')+': '+(new Date(status.created_at)).toLocaleString()}
                aria-label={tago.format(new Date(status.created_at), 'twitter-minute-now')}>
                  {tago.format(new Date(status.created_at), 'twitter-minute-now')}
                </span>
              </span>
            </div> : ``}
            <this.Status status={status.reblog ?? status} />
            <div class="X-Action-Row mt-auto flex flex-row">
              <a href={"https://"+this.host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=reply"} aria-label="Reply" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-blue-500 hover:text-blue-500 rounded-full transition-colors has-tooltip">
                <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Reply</div>
                <Icon icon="carbon:reply" />
              </a>
              <a href={"https://"+this.host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=boost"} aria-label="Boost" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-green-500 hover:text-green-500 rounded-full transition-colors has-tooltip">
                <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Boost</div>
                <Icon icon="feather:repeat" />
              </a>
              <a href={"https://"+this.host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=favourite"} aria-label="Favorite" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-red-500 hover:text-red-500 rounded-full transition-colors has-tooltip">
                <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Favorite</div>
                <Icon icon="feather:heart" />
              </a>
              <span class="flex-grow" />
              <a href={status.url} aria-label="Read More" class="p-2 m-2 text-gray-500 inline-block hover:bg-scheme-3 hover:text-onscheme-3 rounded-full transition-colors has-tooltip">
                <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[100%] text-onscheme-3" aria-hidden>Read&nbsp;More</div>
                <Icon icon="carbon:launch" />
              </a>
            </div>
            <dialog id={"sd"+status.id} class="p-4 m-1 rounded-lg shadow-xl max-w-[90vw] lg:max-w-md xl:max-w-lg w-full max-h-[75vh] flex flex-col bg-scheme-2 text-onscheme-2">
              {status.reblog ? <div class="flex flex-row items-center p-4 pb-0">
                <img src={status.account.avatar_static} class="h-4 rounded-full mr-2" />
                <span>
                  <strong>{status.account.display_name ?? status.account.username}</strong> boosted &bull; <span 
                  title={tago.format(new Date(status.created_at), 'round-minute')+': '+(new Date(status.created_at)).toLocaleString()}>
                    {tago.format(new Date(status.created_at), 'twitter-minute-now')}
                  </span>
                </span>
              </div> : ``}
              <this.Status status={status.reblog || status} showFull={true} />
              <div class="X-Action-Row mt-auto flex flex-row">
                <a href={"https://"+this.host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=reply"} aria-label="Reply" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-blue-500 hover:text-blue-500 rounded-full transition-colors has-tooltip">
                  <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Reply</div>
                  <Icon icon="carbon:reply" />
                </a>
                <a href={"https://"+this.host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=boost"} aria-label="Boost" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-green-500 hover:text-green-500 rounded-full transition-colors has-tooltip">
                  <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Boost</div>
                  <Icon icon="feather:repeat" />
                </a>
                <a href={"https://"+this.host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=favourite"} aria-label="Favorite" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-red-500 hover:text-red-500 rounded-full transition-colors has-tooltip">
                  <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Favorite</div>
                  <Icon icon="feather:heart" />
                </a>
                <span class="flex-grow" />
                <a href={status.url} aria-label="Read More" class="p-2 m-2 text-gray-500 inline-block hover:bg-scheme-3 hover:text-onscheme-3 rounded-full transition-colors has-tooltip">
                  <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[100%] text-onscheme-3" aria-hidden>Read&nbsp;More</div>
                  <Icon icon="carbon:launch" />
                </a>
              </div>
            </dialog>
          </div>)}
        </div>
      </div>
      <ThemeSwitcher />
    </Fragment>;
  }

  host(uri) {
    return new URL(uri).hostname;
  }

  Status({status, showFull = false}) {
    function host(uri) {
      return new URL(uri).hostname;
    }
    return <>
      <a class="group" href={status.account.url}>
        <div class="flex flex-row items-center p-4">
          <img src={status.account.avatar_static} class="h-12 rounded-full mr-2" aria-hidden />
          <span>
            <span class="text-primary-3 group-hover:underline">{status.account.display_name ?? status.account.username}<span class="hidden"> says</span></span><br />
            <span class="text-sm opacity-70">
              <span aria-hidden>@{status.account.acct.includes("@") ? status.account.acct : status.account.acct+"@"+host(status.account.url)} &bull; </span><span
              title={tago.format(new Date(status.created_at), 'round-minute')+': '+(new Date(status.created_at)).toLocaleString()}
              aria-label={tago.format(new Date(status.created_at), 'twitter-minute-now')}>
                {tago.format(new Date(status.created_at), 'twitter-minute-now')}
              </span>
            </span>
          </span>
        </div>
      </a>
      {showFull ? <div class="flex-grow text-right absolute top-4 right-4"><form method="dialog">
        <button type="submit" aria-label="Close dialog" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-primary-3 hover:text-primary-3 rounded-full transition-colors has-tooltip">
          <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Close dialog</div>
          <Icon icon="feather:x" />
        </button>
      </form></div> : ``}
      {status.in_reply_to_account_id && status.in_reply_to_id ? <a href={"https://indieweb.social/web/statuses/"+status.in_reply_to_id} class="ml-4 mr-4 mb-2 text-sm italic opacity-70 hover:opacity-100 hover:underline">Replying to a post</a> : `` }
      {status.spoiler_text && showFull ? <div class="ml-4 mr-4 mb-4 X-Arb">{status.spoiler_text}</div> : ``}
      <div class="ml-4 mr-4 X-Arb">
        {(!showFull && status.spoiler_text) || <SanitizedHTML html={applyShortcodes(status.content, status.emojis || [])} allowedTags={tags} allowedAttributes={attributes} allowedClasses={classes} />}
      </div>
      {status.spoiler_text && !showFull ? <div class="ml-4 mr-4 text-primary-3 hover:underline">
        <button onClick={() => {(document.getElementById("sd"+status.id) as any).showModal()}}><strong>Read behind content warning <InlineIcon icon="mdi:chevron-double-right" className="inline w-4 h-4" /></strong></button>
      </div> : ``}
      {status.media_attachments ? <div class="m-4 mt-2 mb-0 flex flex-row">
        {status.media_attachments.map(att => att.type == "image" ? <a href={att.remote_url || att.url}>
          <img class="rounded-md max-h-[50vh]" src={att.preview_url} alt={att.description} title={att.description} />
        </a> : ``)}
      </div> : ``}
    </>
  }
}

render(<View />, root);