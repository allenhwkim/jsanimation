import Prism from 'prismjs'; // for code formatting
import 'html-custom-elements'; // for convenient elements to show code
import {Animation, animate, zoomIn} from '../src';

window.Animation = Animation;
window.animate = animate;
window.zoomIn = zoomIn;
