---
title: История строки user-agent в браузерах
draft: false
meta_desc: "Статья о том, как изменялась строка user-agent в браузерах ещё с давних времён."
date: 2013-12-27T00:00:00+00:00
meta_img: https://s3-eu-west-1.amazonaws.com/radiantwind/meta/user_agent_meta.jpg
---

<p><i>Данная статья является переводом поста <a target="_blank" href="http://webaim.org/blog/user-agent-string-history/">"History of the browser user-agent string"</a> с сайта WebAIM. Некоторые ссылки, указанные в статье, на данный момент уже недоступны, поэтому мне пришлось их изменить (в частности, ссылаться на архив Интернета). В некоторых местах я даю перевод английских слов и дополнения в скобках.</i></p>

<div class="image_container right_aligned">
<a class="js-show-image" href="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/mosaic.jpg">
<img src="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/mosaic.jpg" alt="Mosaic">
</a>
<p>Mosaic</p>
</div>

<p>В начале времён был <a href="https://web.archive.org/web/20090619062939/http://www.ncsa.illinois.edu/Projects/mosaic.html" target="_blank">NCSA Mosaic</a>, и Mosaic гордо именовал себя <i>NCSA_Mosaic/2.0 (Windows 3.1)</i>. Являл он изображения, равно как и текст, и люди возрадовались.</p>

<div class="image_container left_aligned">
<a class="js-show-image" href="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/netscape.jpg">
<img src="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/netscape.jpg" alt="Netscape">
</a>
<p>Netscape</p>
</div>

<p>Но вот явился новый браузер, известный как <a href="https://en.wikipedia.org/wiki/Mozilla" target="_blank">Mozilla</a> - сие означало "Mosaic Killer". Однако не был Mosaic доволен сим именем, и изменено было оно на Netscape, и поименовал Netscape себя <i>Mozilla/1.0 (Win3.1)</i>, и ещё более возрадовались люди. Netscape поддерживал <a class="tooltip" title="Это действительно очень далёкие времена по меркам web. Фреймы уже давным-давно не используются (последний раз я встречался с ними лет 10 назад), но раньше разработчики использовали их для решения самых разных задач - например, разделяли окно на два фрейма, помещая в один меню, а в другой - сам контент.">фреймы</a>, и популярны стали фреймы среди людей. Но - увы! - не поддерживал Mosaic фреймы, и так зародился "анализ строки user agent", и слали вебмастеры фреймы для Mozilla, однако ж не слали браузерам опричным.</p>

<div class="image_container right_aligned">
<a class="js-show-image" href="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/ie.png">
<img src="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/ie.png" alt="Internet Explorer">
</a>
<p>Internet Explorer</p>
</div>

<p>И возвестил Netscape: будем же насмехаться над Microsoft, именуя Windows "плохо отлаженными драйверами для устройств", и злобу великую затаил Microsoft. Сотворил Microsoft собственный браузер, окрестив его Internet Explorer, лелея надежду, что станет он "Netscape Killer". И поддерживал Internet Explorer фреймы, но не был он Mozilla и посему фреймов не получал. И не утерпел Microsoft, не желая ждать, пока все вебмастеры королевства прознают об IE и станут слать фреймы и для него. И тогда объявил себя Internet Explorer "Mozilla compatible" (<i>совместимый с Mozilla</i>) и стал выдавать себя за Netscape, поименовавшись <i>Mozilla/1.22 (compatible; MSIE 2.0; Windows 95)</i>. И стал Internet Explorer получать фреймы во множестве, и счастлив был весь Microsoft, но смятение зародилось среди вебмастеров.</p>

<div class="image_container right_aligned">
<a class="js-show-image" href="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/mozilla.png">
<img src="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/mozilla.png" alt="Mozilla">
</a>
<p>Mozilla</p>
</div>

<div class="image_container left_aligned">
<a class="js-show-image" href="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/firefox.jpg">
<img src="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/firefox.jpg" alt="Firefox">
</a>
<p>Firefox</p>
</div>

<p>И продавал Microsoft свой IE вместе с Windows, и сделал его более могучим, чем Netscape, и так разразилась на земле первая браузерная война. И, узрите, повержен был Netscape, и великая радость воцарилась в Microsoft. Но возродился Netscape под именем Mozilla аки Феникс из пепла, и создал Mozilla Gecko, поименовав его <i>Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.1) Gecko/20020826</i>, и был Gecko движком для рендеринга, и был он диво как хорош. И стал Mozilla Firefox, назвавшись <i>Mozilla/5.0 (Windows; U; Windows NT 5.1; sv-SE; rv:1.7.5) Gecko/20041108 Firefox/1.0</i>, и был Firefox хорош на загляденье. И стал Gecko плодиться и размножаться, народились из кода его браузеры иньшие, и именовали они себя по батюшке <i>Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.7.2) Gecko/20040825 Camino/0.8.1</i> и <i>Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.8.1.8) Gecko/20071008 SeaMonkey/1.0</i>, притворяясь Mozilla, и все они использовали Gecko.</p>

<div class="image_container left_aligned">
<a class="js-show-image" href="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/konqueror.jpg">
<img src="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/konqueror.jpg" alt="Konquerer">
</a>
<p>Konquerer</p>
</div>

<p>И был Gecko хорош, а IE хорош не был, и вновь возвернулся анализ user agent, и подавали Gecko хороший код, а иньшим браузерам нет. И безмерно опечалены были последователи Linux, ибо породили они Konqueror, движком коего был KHTML, и мыслили они, что он также хорош, как Gecko, но не был он Gecko и посему хороших веб-страниц не получал. И от того порешил Konquerer сделаться "like Gecko" (<i>как Gecko</i>), дабы получать хорошие веб-страницы, и поименовался он <i>Mozilla/5.0 (compatible; Konqueror/3.2; FreeBSD) (KHTML, like Gecko)</i>, и породило это замешательство великое.</p>

<div class="image_container left_aligned">
<a class="js-show-image" href="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/opera.jpg">
<img src="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/opera.jpg" alt="Opera">
</a>
<p>Opera</p>
</div>

<p>Следом явилась Opera и возвестила: "желаем мы, чтобы пользователи наши были вольны выбирать, какой браузер будем мы имитировать", и создала Opera особый пункт меню, и именовала себя <i>Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 9.51</i>, <i>Mozilla/5.0 (Windows NT 6.0; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.51</i>, альбо <i>Opera/9.51 (Windows NT 5.1; U; en)</i>, согласно воле пользователя. <i>(А с версии 10 не стала более Opera притворяться Mozilla, однако ж стала притворяться Opera 9.8: Opera/9.80 (Macintosh; Intel Mac OS X; U; en) Presto/2.2.15 Version/10.00)</i></p>.

<div class="image_container right_aligned">
<a class="js-show-image" href="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/safari.jpg">
<img src="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/safari.jpg" alt="Safari">
</a>
<p>Safari</p>
</div>

<p>И выковал Apple свой Safari, и использовал он KHTML, но великое множество иноземных функций было в него заложено. И посему народилось ответвление сего проекта, именем WebKit, но алкал сей браузер страницы для KHTML, потому и назвался он <i>Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5</i>, и тучи начали сгущаться над королевством.</p>

<p>И устрашился Microsoft ворога своего Firefox, и потому вернулся Internet Explorer, и поименовал он себя <i>Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)</i>, и обладал он умением рендерить хороший код, но лишь когда приказывали ему вебмастеры.</p>

<div class="image_container right_aligned">
<a class="js-show-image" href="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/chrome.jpg">
<img src="https://s3-eu-west-1.amazonaws.com/radiantwind/browsers/chrome.jpg" alt="Chrome">
</a>
<p>Chrome</p>
</div>

<p>Затем же Google породил <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank">Chrome</a>, и использовал Chrome WebKit, и был он аки Safari, и желал такие же страницы, как и Safari, посему выдавал себя за Safari. И от того, что Chrome использовал WebKit, и выдавал себя за Safari, а WebKit выдавал себя за KHTML, а KHTML притворялся Gecko, а все браузеры притворялись Mozilla, взял себе Chrome витиеватое имя <i>Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13</i>. И обернулась строка user agent полнейшей неразберихой, и стала почти бесполезною, и все лицедействовали, выдавая себя за других, и великое замешательство осталось.</p>