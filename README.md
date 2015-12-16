Brumobile
=========

A javascript framework for building mobile web applications.

* MVC framework
* Plugin architecture
* Compatible with Zepto
* Compatible with <a href="http://phonegap.com/" target="_blank">PhoneGap</a> (using the phonegap.js plugin provided).
* Framework components (Router, Template Engine, Model, Animator, etc..) can be easily extended/replaced.

_This is not a fully-featured framework, it provides a clean project structure with basic components. 
Components and plugins can be managed and extended easily._

_It is designed mainly for PhoneGap applications, though it works also in the browser (but the lazy loading of all the modules
at runtime should be avoided in a producion browser-based environment by bundling the code in an unique file)._

__Contributors__

* [bfil](https://github.com/bfil)

_Contributors for plugins are welcome._


Dependencies
------------

The core framework dependencies are:

* Zepto or jQuery (default is Zepto)
* Mustache
* jQTouch (a modified version that contains only the touch event handling)


Samples
-------

You can download and try the sample apps:

__Browser App__

You just need to host the app (I use Dropbox for simplicity) and navigate to the index.html file in the root folder

__Android App__

Create a new Android project, the app uses some of the device features provided by PhoneGap 1.1.0

Feeback
-------

If you find any issue use the appropriate section.
Use pull requests if you would like to contribute by building new plugins.


License
-------

(The MIT License)

Copyright (c) 2011 Bruno Filippone

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
