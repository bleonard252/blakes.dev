import { render } from 'htm/preact';
import { h } from 'preact';
import { ThemeSwitcherButton } from '../components/menubar';

render(ThemeSwitcherButton(), document.getElementById('theme-switcher-button'));