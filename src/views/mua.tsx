import { InlineIcon } from "@iconify/react";
import { Component, render } from "preact";
import { Button } from "../components/button";

const root = document.querySelector("#root");

class View extends Component {
  render({}, {envelopeOpen = false}) {
    return <>
      <div role="menubar" id="menubar" class="p-2 flex flex-row items-center overflow-x-auto overflow-y-hidden">
        <h1 class="inline-block text-xl ml-4 mr-4 text-primary-3">WINDGUST</h1>
          <Button class="mr-2" primary filled static>Mail</Button>
          <Button class="mr-2">Calendar</Button>
          <Button class="mr-2">Contacts</Button>
          <Button class="mr-2">Tasks</Button>
        <div class="flex-grow"></div>
        <button class="bg-transparent hover:bg-onscheme-1/25 active:bg-onscheme-1/10 active:text-onscheme-1/75 rounded-2xl text-onscheme-1 p-2 mr-2 flex flex-row" aria-label="Account menu"><InlineIcon icon="feather:chevron-down" /><InlineIcon icon="feather:user" /></button>
      </div>
      <div class="flex flex-row flex-wrap md:flex-nowrap w-full">
        <div role="sidebar" id="sidebar" class="m-4 flex flex-col w-48">
          <div role="section" aria-label="All inboxes" class="contents">
            <Button class="mr-2 w-full" primary filled static>
              <InlineIcon icon="carbon:list-boxes" /> Dashboard
            </Button>
            <Button class="mr-2 w-full">
              <InlineIcon icon="feather:inbox" /> All inboxes
            </Button>
            <Button class="mr-2 w-full">
              <InlineIcon icon="carbon:chat" /> Delta Chat
            </Button>
          </div>
          <hr class="mt-2 mb-2 text-onscheme-1" />
          <div role="section" aria-label="Gmail" class="contents">
            <strong aria-hidden class="m-2 my-1">Gmail</strong>
            <Button class="mr-2 w-full">
              <InlineIcon icon="feather:inbox" /> Inbox
            </Button>
            {/* <button class="bg-transparent hover:bg-onscheme-1/25 rounded-md text-onscheme-1 p-2 mr-2 w-full flex flex-row gap-2 items-center active:bg-onscheme-1/10 active:text-onscheme-1/75">
              <InlineIcon icon="feather:folder" /> A Folder
            </button> */}
            <Button class="mr-2 w-full">
              <InlineIcon icon="feather:folder" /> A Folder
            </Button>
            <Button class="mr-2 w-full">
              <InlineIcon icon="icon-park-outline:message-sent" /> Sent
            </Button>
            <Button class="mr-2 w-full">
              <InlineIcon icon="feather:shield" /> Spam
            </Button>
            <Button class="mr-2 w-full">
              <InlineIcon icon="feather:trash-2" /> Trash
            </Button>
          </div>
        </div>
        <div class="max-w-sm last:max-w-none m-4 mr-0 last:mr-4 rounded-l-lg last:rounded-lg flex flex-row flex-grow bg-scheme-2 text-onscheme-2 overflow-clip">
          <div role="list" class="flex flex-col w-full overflow-y-auto overflow-x-hidden" id="threadlist">
            <div class="flex flex-row flex-wrap hover:bg-scheme-3 active:bg-onscheme-1/10 active:text-onscheme-1/75 select-none border-b-[1px] border-solid border-onscheme-2/10" id="emt_1" role="button"
              onClick={() => this.setState({envelopeOpen: !envelopeOpen})}>
              <span class="px-4 py-2 font-bold">Mastodon</span>
              <span class="px-4 py-2 flex-grow">You have been mentioned by Eugen Rochko</span>
              <span class="px-4 py-2 italic text-onscheme-2/25">5 minutes ago</span>
            </div>
          </div>
        </div>
        {envelopeOpen ? <div class="+envelope w-auto m-4 ml-0 rounded-r-lg block flex-grow bg-scheme-2 text-onscheme-2 overflow-clip border-l-[1px] border-solid border-onscheme-2/10">
          <div class="+sender p-4 border-b-[1px] border-solid border-onscheme-2/10">
            <h3 class="+sender-name">Mastodon</h3>
            <div><span class="+sender-email opacity-50 text-sm">notifications@mastodon.social</span> &bull; <span class="+sender-verification is-verified text-sm dark:text-blue-500 text-blue-600">Verified sender</span></div>
            <div class="+timestamp text-sm">January 1, 2020 at 6:00 PM</div>
            <div class="+subject my-2">You have been mentioned by Eugen Rochko</div>
          </div>
          <div class="+content p-4 prose dark:prose-invert">
            <h1>Hello world!</h1>
            <p>This is me testing out how a sanitized HTML response would look.</p>
          </div>
        </div> : ``}
      </div>
    </>
  }
}

render(<View />, root);