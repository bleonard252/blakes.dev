import { Component, Fragment, render } from 'preact';
import { Icon, InlineIcon } from '@iconify/react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import Menubar from '../components/menubar';
import SanitizedHTML from 'react-sanitized-html';
import { statSync } from 'fs';

const fullConfig = resolveConfig(tailwindConfig as any) as any;

const root = document.querySelector("#root");

class View extends Component {
  async componentDidMount() {
    let accountLookup = fetch("https://indieweb.social/api/v1/accounts/108211420273068716").then(value => value.json())
    let statusesLookup = fetch("https://indieweb.social/api/v1/accounts/108211420273068716/statuses").then(value => value.json());
    let [accountResult, statusesResult] = await Promise.all([accountLookup, statusesLookup]);
    this.setState({ accountResult, statusesResult });
  }


  render({}, { accountResult=null, statusesResult=null }) {
    return <Fragment>
      <Menubar />
      <div class="grid m-auto grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 p-6 gap-4">
        <div class="X-Column col-span-1" id="column-about">
          <div class="X-Card" id="about-card">
            {(accountResult?.header_static && !accountResult?.header_static?.endsWith("missing.png")) ? <img src={accountResult.header_static} class="h-[170px] rounded-t-md" id="banner" /> : ``}
            <div class="-mt-[48px] m-4 mb-0 X-Profile-Avatar is-primary">
              {(accountResult?.avatar_static) ? <img src={accountResult.avatar_static} class="rounded-full w-[96px] h-[96px]" id="avatar" /> : <div class="rounded-full w-[96px] h-[96px] bg-gray-200" id="avatar" />}
              <a href="https://indieweb.social/users/blake/remote_follow" class="float-right -mt-[36px] mb-0 p-2 bg-blue-500 inline-block hover:bg-blue-400 text-white rounded-md transition-colors">
                <InlineIcon icon="simple-icons:mastodon" className="inline" /> Follow
              </a>
            </div>
            <h1>{accountResult?.display_name ?? `Blake Leonard`}</h1>
            {(accountResult?.note) ? <div class="p-4"><SanitizedHTML html={accountResult.note} /></div> : ``}
            {(accountResult?.fields) ? <div class="X-KVTable">
              {(accountResult?.fields || []).map(field => <div class="row" key={field.name}>
                <span>{field.name}</span>
                <span class={(field.verified_at ? "is-verified" : "is-not-verified")}>
                  {field.verified_at ? <Fragment><Icon icon="feather:check" color={fullConfig.theme.colors.green[500]} className="inline" />&nbsp;</Fragment> : ``}
                  <SanitizedHTML html={field.value} />
                </span>
              </div>)}
            </div> : ``}
          </div>
        </div>
        <div class="X-Column col-span-1 lg:col-span-2 xl:col-span-3" id="column-posts">
          <div class="grid m-auto grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-6 gap-4" id="projects">
            <div class="X-Card mb-2 col-span-1">
              <img src={new URL('../images/lucidlog.png', import.meta.url)} class=" rounded-t-md" />
              <h1>LucidLog Dream Journal</h1>
              <p>A dream journal app that grows with you.</p>
              <div class="X-Action-Row text-right mt-auto">
                <a href="#" class="p-2 m-2 text-blue-500 inline-block hover:bg-blue-200 rounded-md transition-colors">Google Play</a>
                <a href="https://resources.dreamstation.one" class="p-2 m-2 text-blue-500 inline-block hover:bg-blue-200 rounded-md transition-colors">Learn more</a>
              </div>
            </div>
            <div class="X-Card mb-2 col-span-1">
              <img src={new URL('../images/bodacious.png', import.meta.url)} class=" rounded-t-md" />
              <h1>Bodacious</h1>
              <p>A pretty mp3 player with some neat features.</p>
              <div class="X-Action-Row text-right mt-auto">
                <a href="#" class="p-2 m-2 text-blue-500 inline-block hover:bg-blue-200 rounded-md transition-colors">Google Play</a>
                <a href="https://github.com/bleonard252/bodacious" class="p-2 m-2 text-blue-500 inline-block hover:bg-blue-200 rounded-md transition-colors">GitHub</a>
              </div>
            </div>
            <div class="X-Card mb-2 col-span-1">
              <img src={new URL('../images/dahliaos.png', import.meta.url)} class=" rounded-t-md" />
              <h1>dahliaOS</h1>
              <p>A new OS with a Flutter-based DE and an aim to run on multiple kernels.</p>
              <div class="X-Action-Row text-right mt-auto">
                <a href="https://github.com/dahliaOS" class="p-2 m-2 text-blue-500 inline-block hover:bg-blue-200 rounded-md transition-colors">GitHub</a>
              </div>
            </div>
            <div class="X-Row-Card mb-2 col-span-full flex flex-row">
              <h1 class="inline">Tesseract</h1>
              <p>An abandoned Flutter-based Matrix client.</p>
              <span class="flex-grow"></span>
              <a href="https://gitlab.com/bleonard252/tesseract" class="p-2 m-2 text-blue-500 inline-block hover:bg-blue-200 rounded-md transition-colors">GitLab</a>
            </div>
            <div class="X-Row-Card mb-2 col-span-full flex flex-row">
              <h1 class="inline">Vivid</h1>
              <p class="inline">An abandoned Mastodon/Pleroma frontend.</p>
              <span class="flex-grow"></span>
              <a href="https://bleonard252.github.io/vivid-fe" class="p-2 m-2 text-blue-500 inline-block hover:bg-blue-200 rounded-md transition-colors">Try</a>
              <a href="https://github.com/bleonard252/vivid-fe" class="p-2 m-2 text-blue-500 inline-block hover:bg-blue-200 rounded-md transition-colors">GitHub</a>
            </div>
          </div>
          {(statusesResult || []).map(status => <div class="X-Card mb-4">
            {status.reblog ? <div class="flex flex-row items-center p-4 pb-0" id={"s"+status.id}>
              <img src={status.account.avatar_static} class="h-4 rounded-full mr-2" />
              <span><strong>{status.account.display_name ?? status.account.username}</strong> boosted</span>
            </div> : ``}
            <this.Status status={status.reblog ?? status} />
            <div class="X-Action-Row mt-auto flex flex-row">
              <a href={"https://indieweb.social/interact/"+(status.reblog ?? status).id+"?type=reply"} target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-blue-200 hover:text-blue-500 rounded-full transition-colors has-tooltip">
                <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[50%] text-gray-700">Reply</span>
                <Icon icon="carbon:reply" />
              </a>
              <a href={"https://indieweb.social/interact/"+(status.reblog ?? status).id+"?type=favourite"} target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-red-200 hover:text-red-500 rounded-full transition-colors has-tooltip">
                <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[50%] text-gray-700">Favorite</span>
                <Icon icon="feather:heart" />
              </a>
              <a href={"https://indieweb.social/interact/"+(status.reblog ?? status).id+"?type=boost"} class="p-2 m-2 text-gray-500 inline-block hover:bg-green-200 hover:text-green-500 rounded-full transition-colors has-tooltip">
                <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[50%] text-gray-700">Boost</span>
                <Icon icon="feather:repeat" />
              </a>
              <span class="flex-grow" />
              <a href={status.url} class="p-2 m-2 text-gray-500 inline-block hover:bg-green-200 hover:text-green-500 rounded-full transition-colors has-tooltip">
                <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[100%] text-gray-700">Read&nbsp;More</span>
                <Icon icon="carbon:launch" />
              </a>
            </div>
          </div>)}
        </div>
      </div>
    </Fragment>;
  }

  Status({status}) {
    return <>
      <a class="group" href={status.account.url}>
        <div class="flex flex-row items-center p-4">
          <img src={status.account.avatar_static} class="h-12 rounded-full mr-2" />
          <span>
            <span class="text-blue-500 group-hover:underline">{status.account.display_name ?? status.account.username}</span><br />
            <span class="text-sm opacity-70">@{status.account.acct.includes("@") ? status.account.acct : status.account.acct+"@indieweb.social"}</span>
          </span>
        </div>
      </a>
      {status.in_reply_to_account_id && status.in_reply_to_id ? <a href={"https://indieweb.social/web/statuses/108107905852000559"+status.in_reply_to_id} class="ml-4 mr-4 mb-2 text-sm italic opacity-70 hover:opacity-100 hover:underline">Replying to a post</a> : `` }
      <div class="ml-4 mr-4 X-Arb">
        <SanitizedHTML html={status.content} />
      </div>
      {status.media_attachments ? <div class="m-4 mt-2 mb-0 flex flex-row">
        {status.media_attachments.map(att => att.type == "image" ? <a href={att.remote_url || att.url}>
          <img class="rounded-md max-h-[50vh]" src={att.preview_url} alt={att.description} title={att.description} />
        </a> : ``)}
      </div> : ``}
    </>
  }
}

render(<View />, root);